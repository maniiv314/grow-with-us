import React, { useState } from 'react';
import { CheckCircle, HelpCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: 'MVP',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const projectGoals = [
    { id: 'MVP', label: 'Build an MVP', desc: 'Accelerate the path from concept to working software' },
    { id: 'Optimization', label: 'Speed & Conversion Tune', desc: 'Optimize user flows and load speeds' },
    { id: 'Automation', label: 'Automate Workflows', desc: 'Build custom dashboards and eliminate manual scheduling' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectGoal = (goalId) => {
    if (isLoading) return;
    setFormData({
      ...formData,
      goal: goalId
    });
    setStep(2); // Auto-advance on goal selection to minimize friction
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      return !!formData.goal;
    }
    if (currentStep === 2) {
      return true; // Optional context can be empty
    }
    if (currentStep === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return formData.name.trim().length >= 2 && emailRegex.test(formData.email);
    }
    return false;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsLoading(true);
    setStatus('Formatting your project strategy outline...');

    const textMsg = `Hi Grow With Us, I'd like a custom product recommendation strategy!
- Name: ${formData.name}
- Email: ${formData.email}
- Primary Project Goal: ${formData.goal}
- Project Context: ${formData.description || 'Not specified'}`;

    const encodedMsg = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/918630170462?text=${encodedMsg}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus(`Success! Your recommendation strategy outline is ready. Click Send in WhatsApp.`);
      setFormData({ name: '', email: '', goal: 'MVP', description: '' });
      setIsLoading(false);
      setStep(1);
    }, 1000);
  };

  return (
    <section className="section" id="contact" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          
          {/* Left Column: Context */}
          <div>
            <span className="section-tag" style={{ marginBottom: '16px' }}>Project Scoper</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-1.5px', lineHeight: 1.15, marginBottom: '20px' }}>
              Accelerate your development cycle.
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '32px' }}>
              Evaluate your software goals in 3 steps. We will formulate a precise scope recommendation and deployment timeline based on your immediate operational bottlenecks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}><strong>Zero filler scope</strong> — we design only the features necessary to solve your bottleneck.</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}><strong>No locked-in contracts</strong> — you own 100% of the repository, assets, and design files.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-step Form */}
          <div style={{ padding: '36px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-premium)' }}>
            
            {/* Step Progress Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3].map(s => (
                <div 
                  key={s} 
                  style={{ 
                    flex: 1, 
                    height: '4px', 
                    borderRadius: '2px', 
                    background: step >= s ? 'var(--primary)' : 'var(--border-light)',
                    transition: 'background-color 0.3s ease'
                  }} 
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* STEP 1: Select Goal */}
              {step === 1 && (
                <div>
                  <label id="contact-goal-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '14px' }}>Step 1: What is your primary project goal?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} role="radiogroup" aria-labelledby="contact-goal-label">
                    {projectGoals.map(g => (
                      <button
                        key={g.id}
                        type="button"
                        role="radio"
                        aria-checked={formData.goal === g.id}
                        disabled={isLoading}
                        onClick={() => handleSelectGoal(g.id)}
                        style={{
                          padding: '16px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: formData.goal === g.id ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                          background: formData.goal === g.id ? 'var(--primary-light)' : 'var(--bg-primary)',
                          color: 'var(--text-dark)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          width: '100%',
                          display: 'block'
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-dark)' }}>{g.label}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Optional Context */}
              {step === 2 && (
                <div>
                  <label htmlFor="description" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Step 2: Tell us about your business context (Optional)</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    className="form-input" 
                    rows="4" 
                    placeholder="E.g., Our checkout drop-off rate is 60% on mobile, or we want to launch a basic MVP in 5 weeks..." 
                    value={formData.description} 
                    onChange={handleChange} 
                    disabled={isLoading} 
                    style={{ width: '100%', padding: '14px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)', resize: 'vertical' }} 
                  />
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button type="button" onClick={handlePrevStep} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>Back</button>
                    <button type="button" onClick={handleNextStep} className="btn btn-primary" style={{ flex: 2, padding: '12px' }}>Next Step</button>
                  </div>
                </div>
              )}

              {/* STEP 3: Scoping User Identity */}
              {step === 3 && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '14px' }}>Step 3: Where should we send your strategy recommendation?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
                      <input type="text" id="name" name="name" className="form-input" placeholder="Your name" value={formData.name} onChange={handleChange} required disabled={isLoading} style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)' }} />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Work Email</label>
                      <input type="email" id="email" name="email" className="form-input" placeholder="you@company.in" value={formData.email} onChange={handleChange} required disabled={isLoading} style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <button type="button" onClick={handlePrevStep} disabled={isLoading} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>Back</button>
                    <button type="submit" disabled={isLoading || !validateStep(3)} className="btn btn-primary" style={{ flex: 2, padding: '12px', justifyContent: 'center' }}>
                      <span>{isLoading ? 'Formatting...' : 'Generate Scoping Strategy'}</span>
                    </button>
                  </div>
                </div>
              )}

              <div aria-live="polite" aria-atomic="true">
                {status && <div className="form-status success" style={{ display: 'block', fontSize: '0.85rem', padding: '10px', textAlign: 'center', marginTop: '10px' }}>{status}</div>}
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '12px' }}>
                🔒 Zero server logging. Your scoping inputs remain private and are routed directly to WhatsApp securely.
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
