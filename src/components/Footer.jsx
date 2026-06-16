import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'var(--bg-dark)', padding: '60px 0 30px 0', color: 'var(--text-muted)' }}>
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <Link to="/" className="logo footer-logo" style={{ display: 'inline-block', marginBottom: '16px' }}>
            <img src="/assets/logo.png" alt="Grow With Us Logo" style={{ height: '36px', width: 'auto' }} />
          </Link>
          <p className="footer-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px' }}>
            Building bespoke, premium, high-converting digital products for startups, local businesses, and modern enterprises.
          </p>
          <div className="footer-socials" style={{ display: 'flex', gap: '12px' }}>
            <a href="#" className="social-btn" aria-label="LinkedIn" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: '600' }}>LN</a>
            <a href="#" className="social-btn" aria-label="Twitter" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: '600' }}>TW</a>
            <a href="#" className="social-btn" aria-label="Github" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: '600' }}>GH</a>
          </div>
        </div>
        
        <div>
          <h4 className="footer-title" style={{ fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-dark)' }}>Services</h4>
          <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link to="/#services" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Website Development</Link></li>
            <li><Link to="/#services" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Web App Development</Link></li>
            <li><Link to="/#services" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Mobile App Development</Link></li>
            <li><Link to="/#services" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>UI/UX Strategy</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-title" style={{ fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-dark)' }}>Quick Links</h4>
          <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Home</Link></li>
            <li><Link to="/#why-choose-us" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Why Us</Link></li>
            <li><Link to="/#portfolio" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Featured Work</Link></li>
            <li><Link to="/#process" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Roadmap</Link></li>
            <li><Link to="/#faq" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>FAQs</Link></li>
            <li><Link to="/tools" style={{ color: 'var(--text-light)' }} onMouseEnter={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>Tools</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="footer-title" style={{ fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: 'var(--text-dark)' }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
            <div className="footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>hello@growwithus.agency</span>
            </div>
            <div className="footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2z"/></svg>
              <span>WhatsApp Chat Active 24/7</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        <p>&copy; 2026 Grow With Us. All rights reserved.</p>
        <p>Custom Built via AI-Powered Agent Stack.</p>
      </div>
    </footer>
  );
}
