import React, { useState } from 'react';

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

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (
    <section className="section" id="faq" style={{ paddingTop: '160px' }}>
      <div className="container">
        <div className="section-header text-center reveal active">
          <span className="section-tag">Common Inquiries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Have questions about process, timelines, or pricing? Find rapid answers below.</p>
        </div>
        
        <div className="faq-container reveal active">
          {faqs.map(faq => (
            <div key={faq.id} className={`faq-item ${activeId === faq.id ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFAQ(faq.id)}>
                <span className="faq-question">{faq.question}</span>
                <span className="faq-icon">{activeId === faq.id ? '▲' : '▼'}</span>
              </div>
              <div className="faq-content" style={{ display: activeId === faq.id ? 'block' : 'none' }}>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
