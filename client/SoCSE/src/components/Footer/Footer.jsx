import React from 'react';
import './Footer.css'; // Import your Footer CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Our Newsletter</h2>
          <p>
            Stay updated with the latest happenings, events, and news from KLE Technological University through our
            newsletter. Get insights, stories, and more right in your inbox.
          </p>
        </div>
       
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            KLE Technological University,<br />
            Hubballi, Karnataka, India<br />
            Email: newsletter@kletech.ac.in
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} KLE Technological University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
