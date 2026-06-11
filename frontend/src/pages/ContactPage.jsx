import React from 'react';
import '../css/contact.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>MobiPlanet, Kirari, Delhi</p>

      <div className="contact-details">
        {/* Phone number click karne par call lagega */}
        <a href="tel:+918527847832" className="contact-item">
          <span className="icon">📞</span>
          <span>+91 8527847832</span>
        </a>

        {/* Email click karne par default email app khulega */}
        <a href="mailto:harshyadav0798@gmail.com" className="contact-item">
          <span className="icon">✉️</span>
          <span>harshyadav0798@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default ContactPage;