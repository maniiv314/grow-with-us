import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo footer-logo">
            <img src="/assets/logo.png" alt="Grow With Us Logo" />
          </Link>
          <p className="footer-desc">
            Building bespoke, premium, high-converting digital products for startups, local businesses, and modern enterprises.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="LinkedIn">LN</a>
            <a href="#" className="social-btn" aria-label="Twitter">TW</a>
            <a href="#" className="social-btn" aria-label="Github">GH</a>
          </div>
        </div>
        
        <div>
          <h4 className="footer-title">Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Website Development</Link></li>
            <li><Link to="/services">Web App Development</Link></li>
            <li><Link to="/services">Mobile App Development</Link></li>
            <li><Link to="/services">UI/UX Strategy</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/why-us">Why Us</Link></li>
            <li><Link to="/portfolio">Featured Work</Link></li>
            <li><Link to="/why-us">Roadmap</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/tools">Tools</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-title">Contact</h4>
          <div className="footer-contact-item">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span>hello@growwithus.agency</span>
          </div>
          <div className="footer-contact-item">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2z"/></svg>
            <span>WhatsApp Quick Chat available 24/7</span>
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; 2026 Grow With Us. All rights reserved.</p>
        <p>Custom Built via AI-Powered Agent Stack.</p>
      </div>
    </footer>
  );
}
