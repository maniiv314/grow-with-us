import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      <section className="section" id="services" style={{ paddingTop: '160px' }}>
        <div className="container">
          <div className="section-header text-center reveal active">
            <span className="section-tag">High-Impact Services</span>
            <h2 className="section-title">Digital Solutions Built to Convert</h2>
            <p className="section-subtitle">We don't just write code. We build robust digital sales channels, optimize conversion metrics, and engineer automated systems that scale your operations.</p>
          </div>
          
          <div className="services-grid">
            {/* Service 1 */}
            <div className="service-card reveal active">
              <div className="service-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="service-title">Website Development</h3>
              <p className="service-desc">Stunning agency-grade marketing websites and conversion-focused landing pages built with lightning-fast load times and seamless responsiveness.</p>
              <ul className="service-features">
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Fully Responsive Layouts</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Built-in SEO Optimizations</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Conversion-Optimized Flow</span>
                </li>
              </ul>
              <Link to="/contact" className="service-link">
                <span>Get Started</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="service-card reveal active">
              <div className="service-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="service-title">Web App Development</h3>
              <p className="service-desc">Robust SaaS applications, custom customer portals, internal CRM systems, and database integrations tailored to your technical workflow demands.</p>
              <ul className="service-features">
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Scalable Application Architecture</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Secure Authentication & Database Setup</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Custom Dashboard Development</span>
                </li>
              </ul>
              <Link to="/contact" className="service-link">
                <span>Get Started</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="service-card reveal active">
              <div className="service-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="service-title">Mobile App Development</h3>
              <p className="service-desc">Cross-platform iOS and Android mobile applications utilizing single-codebase architectures (Flutter / React Native) for rapid time-to-market.</p>
              <ul className="service-features">
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Cross-Platform Fluid Operations</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Native Core API Integration</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>App Store & Google Play Launch Setup</span>
                </li>
              </ul>
              <Link to="/contact" className="service-link">
                <span>Get Started</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            
            {/* Service 4 */}
            <div className="service-card reveal active">
              <div className="service-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              </div>
              <h3 className="service-title">UI/UX Design</h3>
              <p className="service-desc">Strategic user research, low-fidelity wireframing, high-fidelity layouts, interactive prototyping, and seamless handoff to engineering teams.</p>
              <ul className="service-features">
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Figma Prototypes & Clean Component Systems</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>User Journey Mapping & Design Research</span>
                </li>
                <li className="service-feature-li">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>Interactive Animations Mockups</span>
                </li>
              </ul>
              <Link to="/contact" className="service-link">
                <span>Get Started</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
