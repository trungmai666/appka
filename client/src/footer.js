import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Your Recipe App. All rights reserved.</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  textAlign: 'center',
  borderTop: '1px solid #ccc'
};

export default Footer;
