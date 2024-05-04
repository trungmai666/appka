// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import('node-fetch').then(fetch => {
  // Your code that uses fetch goes here
}).catch(err => {
  console.error('Error while importing node-fetch:', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/calorie_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Routes

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Recipe Search
app.get('/recipes', async (req, res) => {
  try {
    // Fetch recipes from the internet (example)
    const response = await fetch('https://api.example.com/recipes');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

const fs = require('fs');

// Function to read database file
function readDatabase() {
    try {
        const database = fs.readFileSync('database.json');
        return JSON.parse(database);
    } catch (error) {
        console.error('Error reading database:', error);
        return {};
    }
}

// Function to write to database file
function writeDatabase(data) {
    try {
        fs.writeFileSync('database.json', JSON.stringify(data));
    } catch (error) {
        console.error('Error writing to database:', error);
    }
}

// Middleware function to save recipe to user's favorites
app.use('/favorites', authenticateUser, async (req, res, next) => {
    try {
        // Read the database file
        let database = readDatabase();

        // Logic to save recipe to user's favorites goes here
        console.log('Saving recipe to user favorites:', req.body);

        // Assuming each user has a 'favorites' array in the database
        const userId = req.userId;
        const recipe = req.body;

        if (!database[userId]) {
            database[userId] = { favorites: [] };
        }
        database[userId].favorites.push(recipe);

        // Write back to the database file
        writeDatabase(database);

        next();
    } catch (error) {
        console.error('Error saving recipe to favorites:', error);
        res.status(500).json({ message: 'Failed to save recipe to favorites' });
            }
});

// Middleware function to track calorie intake
app.use('/track', authenticateUser, async (req, res, next) => {
    try {
        // Read the database file
        let database = readDatabase();

        // Logic to track calorie intake goes here
        console.log('Tracking calorie intake:', req.body);

        // Assuming each user has a 'calories' field in the database
        const userId = req.userId;
        const calories = req.body.calories;

        if (!database[userId]) {
            database[userId] = { calories: 0 };
        }
        database[userId].calories += calories;

        // Write back to the database file
        writeDatabase(database);

        next();
    } catch (error) {
        console.error('Error tracking calorie intake:', error);
        res.status(500).json({ message: 'Failed to track calorie intake' });
    }
});

// Middleware function to authenticate user using JWT token
function authenticateUser(req, res, next) {
  // Extract token from header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  // Verify token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

app.use((err, req, res, next) => {
  console.error('Error Stack Trace:', err.stack);
  next(err);
});

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
      console.log('Response Data:', data);
      originalSend.call(this, data);
  };
  next();
});
