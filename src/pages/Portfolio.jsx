import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    category: 'ecommerce',
    title: 'Kavya Fabrics',
    image: '/assets/ecommerce_platform.png',
    tag: 'E-Commerce',
    desc: 'A premium online store built for a Jaipur-based ethnic wear brand. Integrated with local payment gateways (UPI, NetBanking) and optimized for high-volume Indian festive sales.',
    speed: '+120% page speed',
    metric: '45% higher conversion',
    waText: 'Discuss E-Com Project'
  },
  {
    id: 2,
    category: 'webapp',
    title: 'Arogya Care Dashboard',
    image: '/assets/saas_dashboard.png',
    tag: 'SaaS / Web App',
    desc: 'A custom patient management and scheduling web app for a multi-specialty clinic chain in Bengaluru. Built to automate appointments and simplify reporting workflows.',
    speed: '15+ hours/week',
    metric: '5,00,000+ total bookings',
    waText: 'Discuss Web App Project'
  },
  {
    id: 3,
    category: 'mobile',
    title: 'DabbaExpress',
    image: '/assets/mobile_app_preview.png',
    tag: 'Mobile App',
    desc: 'A cross-platform food delivery mobile app tailored for corporate workers in Mumbai. Designed with real-time GPS tracking and instant UPI payment integrations.',
    speed: 'iOS & Android',
    metric: '200k+ downloads',
    waText: 'Discuss Mobile App Project'
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="section" id="portfolio" style={{ paddingTop: '160px' }}>
      <div className="container">
        <div className="section-header text-center reveal active">
          <span className="section-tag">Our Showcase</span>
          <h2 className="section-title">Featured Success Stories</h2>
          <p className="section-subtitle">Explore a selection of recent projects built to deliver high conversions and sleek user experiences.</p>
        </div>
        
        <div className="portfolio-filters reveal active">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Projects</button>
          <button className={`filter-btn ${filter === 'ecommerce' ? 'active' : ''}`} onClick={() => setFilter('ecommerce')}>E-Commerce</button>
          <button className={`filter-btn ${filter === 'webapp' ? 'active' : ''}`} onClick={() => setFilter('webapp')}>Web Apps</button>
          <button className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`} onClick={() => setFilter('mobile')}>Mobile Apps</button>
        </div>
        
        <div className="portfolio-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="portfolio-item reveal active" data-category={project.category} style={{ display: 'grid', opacity: 1, transform: 'translateY(0)' }}>
              <div className="portfolio-visual">
                <img src={project.image} alt={`${project.title} Mockup`} />
              </div>
              <div className="portfolio-info">
                <span className="portfolio-tag">{project.tag}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc">{project.desc}</p>
                <div className="portfolio-meta">
                  <div>
                    <strong>Speed Boost</strong>
                    <span>{project.speed}</span>
                  </div>
                  <div>
                    <strong>Growth Metric</strong>
                    <span>{project.metric}</span>
                  </div>
                </div>
                <a href={`https://wa.me/918630170462?text=Hi%20Grow%20With%20Us!%20I'd%20like%20to%20know%20more%20about%20your%20${project.tag}%20solutions.`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  {project.waText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
