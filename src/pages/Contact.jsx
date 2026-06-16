import React, { useState } from 'react';
import { CheckCircle, Laptop, Code, Smartphone, Compass } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web App Development',
    budget: '₹2L - ₹5L',
    message: ''
  });
  const [status, setStatus] = useState('');

  const services = [
    { id: 'Website Development', label: 'Website', icon: Laptop },
    { id: 'Web App Development', label: 'Web App', icon: Code },
    { id: 'Mobile App Development', label: 'Mobile App', icon: Smartphone },
    { id: 'UI/UX Strategy', label: 'UI/UX Strategy', icon: Compass }
  ];

  const budgets = ['Under ₹2L', '₹2L - ₹5L', '₹5L - ₹10L', '₹10L+'];

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

  const handleSelectBudget = (budgetValue) => {
    setFormData({
      ...formData,
      budget: budgetValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Redirecting to WhatsApp to send your inquiry...');

    const textMsg = `Hi Grow With Us, I want to submit a project inquiry!
- Name: ${formData.name}
- Email: ${formData.email}
- Service Required: ${formData.service}
- Budget Estimate: ${formData.budget}
- Project Details: ${formData.message || 'Not specified'}`;

    const encodedMsg = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/918630170462?text=${encodedMsg}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus(`Thank you, ${formData.name}! Your inquiry has been formatted. Please send the message in the opened WhatsApp window.`);
      setFormData({ name: '', email: '', service: 'Web App Development', budget: '₹2L - ₹5L', message: '' });
    }, 1000);
  };

  return (
    <section className="section section-dark" id="contact" style={{ paddingTop: '110px', paddingBottom: '60px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Let's Build India's Next Digital Success Story
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px' }}>
              <CheckCircle size={14} style={{ color: 'var(--primary)' }} />
              <span>Direct to Tech Lead</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px' }}>
              <CheckCircle size={14} style={{ color: 'var(--primary)' }} />
              <span>Concept in 24 Hrs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '100px' }}>
              <CheckCircle size={14} style={{ color: 'var(--primary)' }} />
              <span>10-Min Fast Response</span>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper" style={{ padding: '36px', borderRadius: 'var(--border-radius-md)', background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <form id="contact-form" onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" name="name" className="form-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="email" className="form-label">Work Email</label>
                <input type="email" id="email" name="email" className="form-input" placeholder="you@company.in" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ marginBottom: '12px' }}>What service do you need?</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
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
                        padding: '12px 16px',
                        borderRadius: 'var(--border-radius-sm)',
                        background: isSelected ? 'rgba(118, 192, 0, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isSelected ? 'var(--primary)' : 'var(--text-light)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: '500',
                        fontSize: '0.88rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <IconComponent size={16} style={{ color: isSelected ? 'var(--primary)' : 'var(--text-light)' }} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ marginBottom: '12px' }}>Project Budget (Estimated)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {budgets.map((value) => {
                  const isSelected = formData.budget === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSelectBudget(value)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--border-radius-sm)',
                        background: isSelected ? 'rgba(118, 192, 0, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isSelected ? 'var(--primary)' : 'var(--text-light)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label htmlFor="message" className="form-label">Project Description (Optional)</label>
              <textarea id="message" name="message" className="form-input" rows="3" placeholder="Briefly explain your project goals..." value={formData.message} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn btn-whatsapp form-submit" style={{ width: '100%', justifyContent: 'center', gap: '8px', padding: '16px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2zm0 1.644c2.227 0 4.322.868 5.898 2.448 1.577 1.579 2.445 3.678 2.445 5.908 0 4.597-3.738 8.337-8.337 8.337a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.138.82.835-3.06-.197-.314a8.27 8.27 0 0 1-1.265-4.456c.002-4.599 3.744-8.34 8.34-8.34zm-3.6 5.48c-.198-.44-.407-.449-.595-.458l-.508-.007c-.176 0-.462.066-.704.33-.243.264-.926.903-.926 2.201 0 1.297.945 2.55 1.077 2.726.133.176 1.861 2.84 4.507 3.985 2.203.953 2.651.764 3.125.72.473-.044 1.528-.624 1.74-.1.22-.524.22-.973.154-1.077-.066-.105-.242-.167-.508-.3-.264-.132-1.562-.771-1.804-.859-.242-.088-.418-.132-.594.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.264-.132-1.117-.412-2.128-1.314-.787-.7-1.317-1.564-1.472-1.828-.154-.264-.016-.407.116-.539.118-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.587-1.44-.814-1.94z"/></svg>
              <span>Send Inquiry via WhatsApp</span>
            </button>

            {status && <div className={`form-status ${status.includes('Thank you') ? 'success' : ''}`} style={{ display: 'block' }}>{status}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
