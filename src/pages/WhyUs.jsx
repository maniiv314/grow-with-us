import React from 'react';
import { Link } from 'react-router-dom';

export default function WhyUs() {
  return (
    <>
      {/* WHY CHOOSE US */}
      <section className="section section-dark" id="why-choose-us" style={{ paddingTop: '160px' }}>
        <div className="container">
          <div className="section-header text-center reveal active">
            <span className="section-tag">Value Proposition</span>
            <h2 className="section-title">Why Businesses Partner With Us</h2>
            <p className="section-subtitle">We merge speed, cost-efficiency, and premium aesthetics to give your brand a decisive advantage.</p>
          </div>
          
          <div className="why-grid">
            <div className="why-card reveal active">
              <div className="why-icon">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="why-title">Affordable Pricing</h3>
              <p className="why-desc">High-end engineering and custom designs structured to deliver exceptional quality without bloated digital agency price tags.</p>
            </div>
            
            <div className="why-card reveal active">
              <div className="why-icon">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              </div>
              <h3 className="why-title">Premium Design Quality</h3>
              <p className="why-desc">We steer clear of basic templates. Every component is custom-designed, pixel-perfect, and fully matches your brand persona.</p>
            </div>
            
            <div className="why-card reveal active">
              <div className="why-icon">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="why-title">Rapid Indian Execution</h3>
              <p className="why-desc">We combine localized AI development tools with top-tier Indian engineering talent to launch projects in half the time.</p>
            </div>
            
            <div className="why-card reveal active">
              <div className="why-icon">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <h3 className="why-title">Fully Custom Solutions</h3>
              <p className="why-desc">Tailor-made software tailored to your specific workflows. We write maintainable, clean code that integrates with your tech stack.</p>
            </div>

            <div className="why-card reveal active">
              <div className="why-icon">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <h3 className="why-title">SEO-Friendly Code</h3>
              <p className="why-desc">We structure clean, semantic HTML5, implement microdata/schema tags, and optimize Core Web Vitals to maximize search visibility.</p>
            </div>

            <div className="why-card reveal active">
              <div className="why-icon">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h3 className="why-title">End-to-End Service</h3>
              <p className="why-desc">We manage every stage of your project lifecycle: from planning and wireframing, to staging development, cloud launch, and support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP / PROCESS */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-header text-center reveal active">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our Development Roadmap</h2>
            <p className="section-subtitle">A simple, transparent 6-step workflow structured to deliver premium results on schedule.</p>
          </div>
          
          <div className="process-timeline">
            <div className="process-step reveal active">
              <div className="step-num-circle">01</div>
              <h3 className="step-title">Discovery</h3>
              <p className="step-desc">Identifying goals, analyzing target audiences, and building project requirements.</p>
            </div>
            
            <div className="process-step reveal active reveal-delay-1">
              <div className="step-num-circle">02</div>
              <h3 className="step-title">UX/UI Planning</h3>
              <p className="step-desc">Designing wireframes and modern interfaces tailored to brand design systems.</p>
            </div>
            
            <div className="process-step reveal active reveal-delay-2">
              <div className="step-num-circle">03</div>
              <h3 className="step-title">Development</h3>
              <p className="step-desc">Engineering with clean CSS, modern markup, and optimized backend frameworks.</p>
            </div>
            
            <div className="process-step reveal active reveal-delay-3">
              <div className="step-num-circle">04</div>
              <h3 className="step-title">QA & Review</h3>
              <p className="step-desc">Extensive performance testing, mobile-responsive validations, and device checks.</p>
            </div>
            
            <div className="process-step reveal active reveal-delay-4">
              <div className="step-num-circle">05</div>
              <h3 className="step-title">Launch</h3>
              <p className="step-desc">Configuring servers, domain mappings, and performance optimization integrations.</p>
            </div>
            
            <div className="process-step reveal active reveal-delay-5">
              <div className="step-num-circle">06</div>
              <h3 className="step-title">Support</h3>
              <p className="step-desc">On-demand optimization cycles, regular backups, and feature expansions.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
