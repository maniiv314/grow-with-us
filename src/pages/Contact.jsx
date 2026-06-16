import React, { useState } from 'react';
import { CheckCircle, HelpCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: 'MVP',
    description: ''
  });
  const [status, setStatus] = useState('');

  const projectGoals = [
    { id: 'MVP', label: 'Build an MVP', desc: 'Convert an idea into a working product' },
    { id: 'Optimization', label: 'Fix Page Speed & UX', desc: 'Optimize conversions and lower bounce rates' },
    { id: 'Automation', label: 'Automate Internal Operations', desc: 'Build custom dashboards and schedulers' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectGoal = (goalId) => {
    setFormData({
      ...formData,
      goal: goalId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      setStatus(`Thank you, ${formData.name}! Your strategy outline has been formatted. Click the opened WhatsApp window to send it.`);
      setFormData({ name: '', email: '', goal: 'MVP', description: '' });
    }, 1000);
  };

  return (
    <section className="section" id="contact" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          
          {/* Left Column: Context */}
          <div>
            <span className="section-tag" style={{ marginBottom: '16px' }}>Project Discovery</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '20px' }}>
              Get a custom product recommendation
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Submit your project context to receive a custom design and engineering strategy outline. We focus on defining scope and outcomes before kickstarting development.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Focus on clear, minimal feature scoping</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Transparent timelines without hidden phases</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div style={{ padding: '36px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-premium)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" id="name" name="name" className="form-input" placeholder="Your name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)' }} />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Email</label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="you@work.in" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>Primary Goal</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {projectGoals.map(g => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelectGoal(g.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--border-radius-sm)',
                        border: formData.goal === g.id ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                        background: formData.goal === g.id ? 'var(--primary-light)' : 'var(--bg-primary)',
                        color: 'var(--text-dark)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.85rem' }}>{g.label}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{g.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="description" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Project Context (Optional)</label>
                <textarea id="description" name="description" className="form-input" rows="3" placeholder="Briefly describe your business challenge or MVP requirements..." value={formData.description} onChange={handleChange} style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)', resize: 'vertical' }} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '14px', justifyContent: 'center', gap: '8px', fontSize: '0.95rem' }}>
                <span>Send Strategy Request</span>
              </button>

              {status && <div className="form-status success" style={{ display: 'block', fontSize: '0.85rem', padding: '10px', textAlign: 'center' }}>{status}</div>}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
