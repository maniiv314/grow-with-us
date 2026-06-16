import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [mobileActive, setMobileActive] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const location = useLocation();

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isHashActive = (hash) => {
    return location.pathname === '/' && location.hash === hash;
  };

  const isHomeActive = () => {
    return location.pathname === '/' && !location.hash;
  };

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header" id="header">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => setMobileActive(false)}>
          <img src="/assets/logo.png" alt="Grow With Us Logo" />
        </Link>
        
        <nav>
          <ul className={`nav-links ${mobileActive ? 'active' : ''}`} id="nav-menu">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isHomeActive() ? 'active' : ''}`}
                onClick={() => setMobileActive(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/#services" 
                className={`nav-link ${isHashActive('#services') ? 'active' : ''}`}
                onClick={() => setMobileActive(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/#why-choose-us" 
                className={`nav-link ${isHashActive('#why-choose-us') ? 'active' : ''}`}
                onClick={() => setMobileActive(false)}
              >
                Why Us
              </Link>
            </li>
            <li>
              <Link 
                to="/#portfolio" 
                className={`nav-link ${isHashActive('#portfolio') ? 'active' : ''}`}
                onClick={() => setMobileActive(false)}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                to="/#faq" 
                className={`nav-link ${isHashActive('#faq') ? 'active' : ''}`}
                onClick={() => setMobileActive(false)}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link 
                to="/tools" 
                className={`nav-link ${isPathActive('/tools') ? 'active' : ''}`}
                style={{ color: 'var(--primary)', fontWeight: 700 }}
                onClick={() => setMobileActive(false)}
              >
                Tools
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${isPathActive('/contact') ? 'active' : ''}`}
                onClick={() => setMobileActive(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="nav-actions">
          {/* Light/Dark Mode Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-dark)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginRight: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="https://wa.me/918630170462?text=Hi%20Grow%20With%20Us,%20I'd%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2zm0 1.644c2.227 0 4.322.868 5.898 2.448 1.577 1.579 2.445 3.678 2.445 5.908 0 4.597-3.738 8.337-8.337 8.337a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.138.82.835-3.06-.197-.314a8.27 8.27 0 0 1-1.265-4.456c.002-4.599 3.744-8.34 8.34-8.34zm-3.6 5.48c-.198-.44-.407-.449-.595-.458l-.508-.007c-.176 0-.462.066-.704.33-.243.264-.926.903-.926 2.201 0 1.297.945 2.55 1.077 2.726.133.176 1.861 2.84 4.507 3.985 2.203.953 2.651.764 3.125.72.473-.044 1.528-.624 1.74-.1.22-.524.22-.973.154-1.077-.066-.105-.242-.167-.508-.3-.264-.132-1.562-.771-1.804-.859-.242-.088-.418-.132-.594.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.264-.132-1.117-.412-2.128-1.314-.787-.7-1.317-1.564-1.472-1.828-.154-.264-.016-.407.116-.539.118-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.587-1.44-.814-1.94z"/></svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
        
        <button className={`mobile-toggle ${mobileActive ? 'active' : ''}`} id="mobile-toggle" aria-label="Toggle Menu" onClick={() => setMobileActive(!mobileActive)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
