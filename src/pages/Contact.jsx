import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Redirecting to WhatsApp to send your inquiry...');

    const textMsg = `Hi Grow With Us, I want to submit a project inquiry!
- Name: ${formData.name}
- Email: ${formData.email}
- Budget Estimate: ${formData.budget}
- Project Details: ${formData.message}`;

    const encodedMsg = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/918630170462?text=${encodedMsg}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus(`Thank you, ${formData.name}! Your inquiry has been formatted. Please send the message in the opened WhatsApp window.`);
      setFormData({ name: '', email: '', budget: '', message: '' });
    }, 1000);
  };

  return (
    <section className="section section-dark" id="contact" style={{ paddingTop: '160px' }}>
      <div className="container cta-grid">
        <div className="cta-content reveal active">
          <span className="section-tag">Start Growing Today</span>
          <h2>Let's Build India's Next Digital Success Story</h2>
          <p>Partner with us to build high-performance software that elevates your brand, streamlines operations, and helps your business grow in India's booming digital economy.</p>
          
          <div className="cta-whatsapp-box">
            <h3>Prefer an Instant Conversation?</h3>
            <p>Skip the forms and chat directly with our product engineers on WhatsApp to receive a preliminary project estimate.</p>
            <a href="https://wa.me/918630170462?text=Hi%20Grow%20With%20Us!%20I'd%20like%20to%20get%20a%20project%20estimate." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.807 1.246h.003c5.507 0 9.99-4.478 9.99-9.987 0-2.67-1.037-5.178-2.92-7.062C17.198 3.05 14.685 2 12.011 2zm0 1.644c2.227 0 4.322.868 5.898 2.448 1.577 1.579 2.445 3.678 2.445 5.908 0 4.597-3.738 8.337-8.337 8.337a8.27 8.27 0 0 1-4.223-1.155l-.303-.18-3.138.82.835-3.06-.197-.314a8.27 8.27 0 0 1-1.265-4.456c.002-4.599 3.744-8.34 8.34-8.34zm-3.6 5.48c-.198-.44-.407-.449-.595-.458l-.508-.007c-.176 0-.462.066-.704.33-.243.264-.926.903-.926 2.201 0 1.297.945 2.55 1.077 2.726.133.176 1.861 2.84 4.507 3.985 2.203.953 2.651.764 3.125.72.473-.044 1.528-.624 1.74-.1.22-.524.22-.973.154-1.077-.066-.105-.242-.167-.508-.3-.264-.132-1.562-.771-1.804-.859-.242-.088-.418-.132-.594.132-.176.264-.683.859-.837 1.035-.154.176-.308.198-.573.066-.264-.132-1.117-.412-2.128-1.314-.787-.7-1.317-1.564-1.472-1.828-.154-.264-.016-.407.116-.539.118-.118.264-.308.396-.462.132-.154.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.587-1.44-.814-1.94z"/></svg>
              <span>Start WhatsApp Chat</span>
            </a>
          </div>
        </div>
        
        <div className="contact-form-wrapper reveal active reveal-delay-1">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Work Email</label>
              <input type="email" id="email" name="email" className="form-input" placeholder="you@company.in" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="budget" className="form-label">Project Budget (Estimated)</label>
              <input type="text" id="budget" name="budget" className="form-input" placeholder="e.g. ₹2,00,000 - ₹5,00,000" value={formData.budget} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Project Description</label>
              <textarea id="message" name="message" className="form-input" rows="4" placeholder="Briefly explain your project goals..." value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary form-submit">Send Inquiry</button>
            
            {status && <div className={`form-status ${status.includes('Thank you') ? 'success' : ''}`} style={{ display: 'block' }}>{status}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
