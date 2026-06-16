import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, HelpCircle, Sparkles, AlertCircle, PlayCircle, ShieldCheck } from 'lucide-react';

const qualificationPaths = [
  {
    id: 'founder',
    title: 'Startup Founder',
    sub: 'Build MVPs & Scalable Products',
    desc: 'You need an experienced engineering partner to build a product that attracts early investors, without the overhead of hiring an in-house team.'
  },
  {
    id: 'd2c',
    title: 'D2C Storefront',
    sub: 'Increase Checkouts & Page Speed',
    desc: 'You want to optimize user flows, reduce page load times to under 1 second, and fix high drop-off rates on checkout steps.'
  },
  {
    id: 'local',
    title: 'Local Service Enterprise',
    sub: 'Automate Bookings & Schedules',
    desc: 'You want to automate appointment scheduling, manage databases, and eliminate manual Excel/WhatsApp coordination.'
  }
];

const businessProblems = [
  {
    title: 'Losing customers due to slow load times?',
    outcome: 'Convert More Visitors',
    solution: 'We build static-first, lightweight web engines with optimized core web vitals. Pages load in under 500ms, immediately lowering bounce rates.'
  },
  {
    title: 'Managing customer bookings manually?',
    outcome: 'Automate Internal Operations',
    solution: 'We design custom patient, client, and order scheduling systems that sync with calendar systems automatically.'
  },
  {
    title: 'Over-engineering simple workflows?',
    outcome: 'Simplify Before You Build',
    solution: 'We identify features to remove, prioritizing clear layouts and clean conversion paths before writing a single line of backend code.'
  }
];

export default function Home() {
  const [activePath, setActivePath] = useState('founder');
  const [selectedGoal, setSelectedGoal] = useState('launch');
  const [budgetRange, setBudgetRange] = useState('mid');
  const [recommendationResult, setRecommendationResult] = useState('');
  const navigate = useNavigate();

  const handleGetRecommendation = (e) => {
    e.preventDefault();
    let solution = '';
    if (selectedGoal === 'launch') {
      solution = 'We recommend a scoping sprint to design a lightweight React MVP. Focus on core user actions first, with a target launch window of 6 weeks.';
    } else if (selectedGoal === 'convert') {
      solution = 'We recommend a conversion rate audit and page-speed optimization program. We will refactor frontend layouts to static-first React structures to lower bounce rates.';
    } else {
      solution = 'We recommend building a bespoke internal workspace dashboard. This will automate database updates and sync schedules to reduce manual operations.';
    }
    setRecommendationResult(solution);
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero" id="hero" style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <span className="section-tag" style={{ marginBottom: '24px' }}>Certainty Over Complexity</span>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1.5px', color: 'var(--text-dark)', marginBottom: '24px' }}>
            We build web products that solve clear business problems.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '750px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            Launch MVPs without over-engineering, optimize slow checkouts to lower bounce rates, and automate booking pipelines—built with clean code that scales.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              <span>Get Scope Recommendation</span>
              <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/918630170462?text=Hi%20Grow%20With%20Us,%20I'd%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              <span>Quick WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHO WE HELP SECTION */}
      <section className="section" id="how-we-help" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-tag">Self-Qualify</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.8px', color: 'var(--text-dark)', marginTop: '8px' }}>Are we the right partner for your project?</h2>
            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>Select your path below to see how we align with your specific challenges.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} role="tablist" aria-label="Customer self-qualification paths">
            {qualificationPaths.map(path => (
              <button 
                key={path.id}
                role="tab"
                aria-selected={activePath === path.id}
                tabIndex={0}
                onClick={() => setActivePath(path.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePath(path.id); } }}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '30px',
                  borderRadius: 'var(--border-radius-md)',
                  border: activePath === path.id ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activePath === path.id ? 'var(--shadow-lg)' : 'none',
                  textAlign: 'left',
                  display: 'block',
                  width: '100%',
                  fontFamily: 'inherit'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-dark)' }}>{path.title}</h3>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activePath === path.id ? 'var(--primary)' : 'transparent', border: '1px solid var(--border-light)' }} />
                </div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '16px' }}>{path.sub}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{path.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE SOLVE SECTION */}
      <section className="section" style={{ background: 'var(--bg-primary)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-tag">Focus on Outcomes</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.8px', color: 'var(--text-dark)', marginTop: '8px' }}>Problems we solve regularly</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {businessProblems.map((prob, i) => (
              <div 
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                  padding: '32px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--border-light)',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>{prob.outcome}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '8px 0 0 0', color: 'var(--text-dark)' }}>{prob.title}</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {prob.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REAL PROOF & DESIGN THINKING */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-tag">How We Work</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.8px', color: 'var(--text-dark)', marginTop: '8px' }}>Our design & product philosophy</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-dark)' }}>Business Goals First</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>We align engineering scope with business outcomes. We do not write code for features that do not drive conversions or automate manual work.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-dark)' }}>Simplify Before We Build</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>We identify features to remove before writing code. Simplifying user flows reduces development time and prevents complex bugs.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-dark)' }}>Maintainable Architectures</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>We build with standard, lightweight web frameworks. Your system remains easy to scale, modify, or hand over to an in-house team later.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE RECOMMENDATION ENGINE */}
      <section className="section" id="recommendation-engine" style={{ background: 'var(--bg-primary)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-premium)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-tag">Interactive Scoper</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '8px' }}>Get a tailored product recommendation</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '6px' }}>Select your goals below to receive a strategic recommendations summary before you contact us.</p>
            </div>

            <form onSubmit={handleGetRecommendation} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label id="project-goal-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-muted)' }}>What is your primary project goal?</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }} role="radiogroup" aria-labelledby="project-goal-label">
                  <button type="button" role="radio" aria-checked={selectedGoal === 'launch'} onClick={() => setSelectedGoal('launch')} style={{ padding: '14px', borderRadius: 'var(--border-radius-sm)', border: selectedGoal === 'launch' ? '2px solid var(--primary)' : '1px solid var(--border-light)', background: selectedGoal === 'launch' ? 'var(--primary-light)' : 'var(--bg-primary)', color: 'var(--text-dark)', fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                    Launch an MVP
                  </button>
                  <button type="button" role="radio" aria-checked={selectedGoal === 'convert'} onClick={() => setSelectedGoal('convert')} style={{ padding: '14px', borderRadius: 'var(--border-radius-sm)', border: selectedGoal === 'convert' ? '2px solid var(--primary)' : '1px solid var(--border-light)', background: selectedGoal === 'convert' ? 'var(--primary-light)' : 'var(--bg-primary)', color: 'var(--text-dark)', fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                    Improve Conversion & Speed
                  </button>
                  <button type="button" role="radio" aria-checked={selectedGoal === 'automate'} onClick={() => setSelectedGoal('automate')} style={{ padding: '14px', borderRadius: 'var(--border-radius-sm)', border: selectedGoal === 'automate' ? '2px solid var(--primary)' : '1px solid var(--border-light)', background: selectedGoal === 'automate' ? 'var(--primary-light)' : 'var(--bg-primary)', color: 'var(--text-dark)', fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                    Automate Operations
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '14px', width: '100%' }}>Get Strategy recommendation</button>
            </form>

            <div aria-live="polite" aria-atomic="true">
              {recommendationResult && (
                <div style={{ marginTop: '24px', padding: '24px', background: 'var(--primary-light)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--primary)' }}>
                  <h4 style={{ color: 'var(--primary)', fontWeight: 700, margin: '0 0 8px 0', fontSize: '0.95rem' }}>Our Recommendation:</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{recommendationResult}</p>
                  <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Apply Strategy to Inquiry</Link>
                    <a href={`https://wa.me/918630170462?text=${encodeURIComponent('Hi, my primary goal is: ' + selectedGoal + '. Recommendation: ' + recommendationResult)}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Discuss on WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOOLS DIRECTORY LINK */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '60px 0' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '12px' }}>Free Startup Utilities Registry</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.5 }}>
            We build and maintain a suite of client-side web utility tools for startups and developers. Explore our live calculators, estimators, and conversion tools.
          </p>
          <Link to="/tools" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>Explore Free Utilities Suite</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
