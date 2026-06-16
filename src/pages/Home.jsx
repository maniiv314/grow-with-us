import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const faqs = [
  {
    id: 1,
    question: 'What is your agency pricing model?',
    answer: 'We operate on a project-based pricing model starting from customized packages. Since we build fully custom solutions, we provide transparent project quotes detailing all features, deliverables, and milestone schedules during our Discovery phase.'
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer: 'A standard marketing website typically takes 3 to 5 weeks. Complex web applications or native mobile apps take between 8 to 12 weeks, depending on database requirements, integration points, and overall scope complexity.'
  },
  {
    id: 3,
    question: 'Do you offer post-launch support & revisions?',
    answer: 'Yes, we include a 30-day post-launch support warranty covering bug fixes and minor adjustments. We also offer ongoing monthly maintenance plans that include security patches, regular backups, cloud infrastructure monitoring, and feature updates.'
  },
  {
    id: 4,
    question: 'Which technologies do you build with?',
    answer: 'For frontend websites, we use HTML5, CSS3, modern JavaScript, Next.js, and React. For mobile apps, we utilize Flutter or React Native. Backends are constructed using Node.js, Express, or Firebase, depending on scaling needs.'
  },
  {
    id: 5,
    question: 'How does the AI-powered development workflow help me?',
    answer: 'We leverage advanced AI coding agents (like Antigravity) to automate standard backend boilerplate setups, component structures, and initial test coverage. This reduces development time, meaning you get a premium product launched faster and at a lower cost.'
  }
];

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [activeFaqId, setActiveFaqId] = useState(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const toggleFAQ = (id) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="container hero-grid">
          <div className="hero-content reveal active">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              <span>Empowering India's Digital Revolution 🇮🇳</span>
            </div>
            <h1 className="hero-title">
              Websites & Apps Engineered for <span>Business Growth</span>
            </h1>
            <p className="hero-desc">
              We build high-converting websites, custom web applications, and mobile apps engineered to scale Indian startups, MSMEs, D2C brands, and local retailers.
            </p>
            <div className="hero-actions">
              <a href="https://wa.me/918630170462?text=Hi%20Grow%20With%20Us!%20I%20want%20to%20discuss%20a%20new%20project." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2zm0 1.644c2.227 0 4.322.868 5.898 2.448 1.577 1.579 2.445 3.678 2.445 5.908 0 4.597-3.738 8.337-8.337 8.337a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.138.82.835-3.06-.197-.314a8.27 8.27 0 0 1-1.265-4.456c.002-4.599 3.744-8.34 8.34-8.34zm-3.6 5.48c-.198-.44-.407-.449-.595-.458l-.508-.007c-.176 0-.462.066-.704.33-.243.264-.926.903-.926 2.201 0 1.297.945 2.55 1.077 2.726.133.176 1.861 2.84 4.507 3.985 2.203.953 2.651.764 3.125.72.473-.044 1.528-.624 1.74-.1.22-.524.22-.973.154-1.077-.066-.105-.242-.167-.508-.3-.264-.132-1.562-.771-1.804-.859-.242-.088-.418-.132-.594.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.264-.132-1.117-.412-2.128-1.314-.787-.7-1.317-1.564-1.472-1.828-.154-.264-.016-.407.116-.539.118-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.587-1.44-.814-1.94z"/></svg>
                <span>Chat on WhatsApp</span>
              </a>
              <a href="#portfolio" className="btn btn-secondary">View Our Work</a>
            </div>
            <div className="hero-features">
              <div className="hero-feature-item">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>Affordable Pricing</span>
              </div>
              <div className="hero-feature-item">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>Premium Design Quality</span>
              </div>
              <div className="hero-feature-item">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                <span>AI-Driven Rapid Execution</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual reveal active reveal-delay-2">
            <div className="hero-mockup-wrapper">
              <div className="hero-mockup">
                <div className="mockup-header">
                  <span className="mockup-dot"></span>
                  <span className="mockup-dot"></span>
                  <span className="mockup-dot"></span>
                </div>
                <div className="mockup-content">
                  <h3 className="mockup-title">Conversion Dashboard</h3>
                  <div className="mockup-chart">
                    <span className="chart-bar" style={{ height: '35%', animationDelay: '0.1s' }}></span>
                    <span className="chart-bar" style={{ height: '55%', animationDelay: '0.3s' }}></span>
                    <span className="chart-bar" style={{ height: '40%', animationDelay: '0.2s' }}></span>
                    <span className="chart-bar" style={{ height: '75%', animationDelay: '0.5s' }}></span>
                    <span className="chart-bar" style={{ height: '60%', animationDelay: '0.4s' }}></span>
                    <span className="chart-bar" style={{ height: '90%', animationDelay: '0.7s' }}></span>
                    <span className="chart-bar" style={{ height: '98%', animationDelay: '0.6s' }}></span>
                  </div>
                  <div className="mockup-stats">
                    <div className="mockup-stat-card">
                      <div className="mockup-stat-label">Conversions</div>
                      <div className="mockup-stat-val">+142%</div>
                    </div>
                    <div className="mockup-stat-card">
                      <div className="mockup-stat-label">Load Velocity</div>
                      <div className="mockup-stat-val">0.4s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="float-card float-card-1">
              <div className="float-icon">★</div>
              <div className="float-info">
                <h4>Premium Design</h4>
                <p>Tailored HSL theme</p>
              </div>
            </div>
            
            <div className="float-card float-card-2">
              <div className="float-icon">💻</div>
              <div className="float-info">
                <h4>Active Leads</h4>
                <p>18 Inquiries today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="metrics" id="metrics">
        <div className="container metrics-grid">
          <div className="metric-card">
            <div className="metric-num">150+</div>
            <div className="metric-label">Projects Delivered</div>
          </div>
          <div className="metric-card">
            <div className="metric-num">12+</div>
            <div className="metric-label">Industries Served</div>
          </div>
          <div className="metric-card">
            <div className="metric-num">99.4%</div>
            <div className="metric-label">Client Satisfaction</div>
          </div>
          <div className="metric-card">
            <div className="metric-num">15+</div>
            <div className="metric-label">Years Combined Exp.</div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section" id="services">
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
              <h3 className="service-title">UI/UX Strategy</h3>
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

      {/* WHY CHOOSE US SECTION */}
      <section className="section section-dark" id="why-choose-us">
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

      {/* PORTFOLIO SECTION */}
      <section className="section section-dark" id="portfolio">
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

      {/* TESTIMONIALS SECTION */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header text-center reveal active">
            <span className="section-tag">Client Feedback</span>
            <h2 className="section-title">Partner Endorsements</h2>
            <p className="section-subtitle">Don't take our word for it. Read how we've helped startups and established brands grow.</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card reveal active">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-text">"Grow With Us rebuilt our ethnic wear platform. Our load speed went from 4.8s to 0.5s, and our conversion rate in festive sales shot up by 45%. Highly recommended for any D2C brand!"</p>
              <div className="testimonial-author">
                <div className="author-img">PS</div>
                <div className="author-info">
                  <h4>Priya Sharma</h4>
                  <p>Founder, Kavya Fabrics (Jaipur)</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card reveal active">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-text">"The mobile app they built using Flutter is smooth and handles high concurrent user requests without any lag. Their UPI integration is robust and secure. Launching was seamless."</p>
              <div className="testimonial-author">
                <div className="author-img">RM</div>
                <div className="author-info">
                  <h4>Rohan Mehta</h4>
                  <p>Co-Founder, DabbaExpress (Mumbai)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section section-dark" id="faq">
        <div className="container">
          <div className="section-header text-center reveal active">
            <span className="section-tag">Common Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Have questions about process, timelines, or pricing? Find rapid answers below.</p>
          </div>
          
          <div className="faq-container reveal active">
            {faqs.map(faq => (
              <div key={faq.id} className={`faq-item ${activeFaqId === faq.id ? 'active' : ''}`}>
                <div className="faq-header" onClick={() => toggleFAQ(faq.id)}>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-icon">{activeFaqId === faq.id ? '▲' : '▼'}</span>
                </div>
                <div className="faq-content" style={{ display: activeFaqId === faq.id ? 'block' : 'none' }}>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" id="contact-cta">
        <div className="container text-center">
          <div className="section-header text-center reveal active">
            <span className="section-tag">Start Growing Today</span>
            <h2>Let's Build India's Next Digital Success Story</h2>
            <p className="section-subtitle">Partner with us to build high-performance software that elevates your brand, streamlines operations, and helps your business grow in India's booming digital economy.</p>
          </div>
          <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/918630170462?text=Hi%20Grow%20With%20Us!%20I'd%20like%20to%20get%20a%20project%20estimate." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2zm0 1.644c2.227 0 4.322.868 5.898 2.448 1.577 1.579 2.445 3.678 2.445 5.908 0 4.597-3.738 8.337-8.337 8.337a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.138.82.835-3.06-.197-.314a8.27 8.27 0 0 1-1.265-4.456c.002-4.599 3.744-8.34 8.34-8.34zm-3.6 5.48c-.198-.44-.407-.449-.595-.458l-.508-.007c-.176 0-.462.066-.704.33-.243.264-.926.903-.926 2.201 0 1.297.945 2.55 1.077 2.726.133.176 1.861 2.84 4.507 3.985 2.203.953 2.651.764 3.125.72.473-.044 1.528-.624 1.74-.1.22-.524.22-.973.154-1.077-.066-.105-.242-.167-.508-.3-.264-.132-1.562-.771-1.804-.859-.242-.088-.418-.132-.594.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.264-.132-1.117-.412-2.128-1.314-.787-.7-1.317-1.564-1.472-1.828-.154-.264-.016-.407.116-.539.118-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.587-1.44-.814-1.94z"/></svg>
              <span>Chat on WhatsApp</span>
            </a>
            <Link to="/contact" className="btn btn-secondary">Fill Enquiry Form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
