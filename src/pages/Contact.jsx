import React, { useState } from 'react';
import { CheckCircle, Laptop, Code, Smartphone, Compass } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web App Development',
    message: ''
  });
  const [status, setStatus] = useState('');

  const services = [
    { id: 'Website Development', label: 'Website', icon: Laptop },
    { id: 'Web App Development', label: 'Web App', icon: Code },
    { id: 'Mobile App Development', label: 'Mobile App', icon: Smartphone },
    { id: 'UI/UX Strategy', label: 'UI/UX Strategy', icon: Compass }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectService = (serviceId) => {
    setFormData({
      ...formData,
      service: serviceId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Redirecting to WhatsApp to send your inquiry...');

    const textMsg = `Hi Grow With Us, I want to submit a project inquiry!
- Name: ${formData.name}
- Email: ${formData.email}
- Service Required: ${formData.service}
- Project Details: ${formData.message || 'Not specified'}`;

    const encodedMsg = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/918630170462?text=${encodedMsg}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus(`Thank you, ${formData.name}! Your inquiry has been formatted. Please send the message in the opened WhatsApp window.`);
      setFormData({ name: '', email: '', service: 'Web App Development', message: '' });
    }, 1000);
  };

  return (
    <section className="section section-dark" id="contact" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'stretch' }}>
          
          {/* Left Column: Heading and Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-tag" style={{ alignSelf: 'flex-start' }}>Collaborate</span>
            <h2 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.8px', lineHeight: '1.2', color: 'var(--text-dark)' }}>
              Let's Build India's Next Digital Success Story
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '32px', lineHeight: '1.6' }}>
              We build custom software, web apps, D2C portals, and native mobile apps engineered to scale your brand and simplify operational workflows.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '12px 18px', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255,255,255,0.04)', boxShadow: 'var(--shadow-sm)' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>Direct communication with Tech Lead</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '12px 18px', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255,255,255,0.04)', boxShadow: 'var(--shadow-sm)' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>Custom architecture & layout concepts in 24 hrs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '12px 18px', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255,255,255,0.04)', boxShadow: 'var(--shadow-sm)' }}>
                <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>Fast 10-Min response time on active inquiries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Wrapper */}
          <div style={{ padding: '36px', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-glass-dark)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: 'var(--shadow-premium)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name" className="form-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>Full Name</label>
                  <input type="text" id="name" name="name" className="form-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-dark)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)', transition: 'border-color 0.2s, box-shadow 0.2s' }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="email" className="form-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>Work Email</label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="you@company.in" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-dark)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)', transition: 'border-color 0.2s, box-shadow 0.2s' }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '10px', color: 'var(--text-muted)' }}>What service do you need?</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {services.map((item) => {
                    const IconComponent = item.icon;
                    const isSelected = formData.service === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectService(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          borderRadius: 'var(--border-radius-sm)',
                          background: isSelected ? 'var(--primary-light)' : 'rgba(255, 255, 255, 0.02)',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontWeight: '500',
                          fontSize: '0.85rem',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 12px var(--glow-color)' : 'none'
                        }}
                      >
                        <IconComponent size={15} style={{ color: isSelected ? 'var(--primary)' : 'var(--text-light)' }} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="message" className="form-label" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>Project Description (Optional)</label>
                <textarea id="message" name="message" className="form-input" rows="3" placeholder="Briefly explain your project goals..." value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-dark)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-dark)', transition: 'border-color 0.2s, box-shadow 0.2s', resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '8px', padding: '14px', fontSize: '0.95rem', fontWeight: '600' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2zm0 1.644c2.227 0 4.322.868 5.898 2.448 1.577 1.579 2.445 3.678 2.445 5.908 0 4.597-3.738 8.337-8.337 8.337a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.138.82.835-3.06-.197-.314a8.27 8.27 0 0 1-1.265-4.456c.002-4.599 3.744-8.34 8.34-8.34zm-3.6 5.48c-.198-.44-.407-.449-.595-.458l-.508-.007c-.176 0-.462.066-.704.33-.243.264-.926.903-.926 2.201 0 1.297.945 2.55 1.077 2.726.133.176 1.861 2.84 4.507 3.985 2.203.953 2.651.764 3.125.72.473-.044 1.528-.624 1.74-.1.22-.524.22-.973.154-1.077-.066-.105-.242-.167-.508-.3-.264-.132-1.562-.771-1.804-.859-.242-.088-.418-.132-.594.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.264-.132-1.117-.412-2.128-1.314-.787-.7-1.317-1.564-1.472-1.828-.154-.264-.016-.407.116-.539.118-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.587-1.44-.814-1.94z"/></svg>
                <span>Send Inquiry via WhatsApp</span>
              </button>

              {status && <div className={`form-status ${status.includes('Thank you') ? 'success' : ''}`} style={{ display: 'block', fontSize: '0.85rem', margin: 0, padding: '12px' }}>{status}</div>}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
