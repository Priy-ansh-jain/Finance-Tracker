// src/components/layout/Footer.js
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} FinanceTracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;