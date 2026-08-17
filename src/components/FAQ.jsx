import React, { useState } from 'react';

const faqData = [
  {
    question: 'What are the clinic timings of Dr. Saranya?',
    answer: 'Dr. Saranya is available from Monday to Saturday during 09:30 AM to 01:30 PM (Morning session) and 04:30 PM to 08:30 PM (Evening session). The clinic remains closed on Sundays.',
  },
  {
    question: 'How do I schedule an appointment online?',
    answer: 'You can easily book a slot using the booking form right above on this page. Just fill in your details and select a treatment. Our staff will call/SMS you back within a few hours to confirm the slot.',
  },
  {
    question: 'Is root canal treatment painful?',
    answer: 'Not at all. With local anesthesia and modern rotary endodontic systems used by Dr. Saranya at SDC, root canal treatments are virtually pain-free. It feels similar to getting a standard dental filling.',
  },
  {
    question: 'Do you offer clear orthodontic aligners?',
    answer: 'Yes, we offer clear teeth aligners, which are invisible, comfortable, and removable alternatives to conventional metallic braces. We will design a custom digital teeth alignment simulation for you.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section" id="faq">
      <div className="container">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Common Queries</span>
          <h2 className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="section-desc">
            Get answers to the most common questions about clinic treatments and appointments.
          </p>
        </div>

        <div className="faq-container">
          <div className="faq-list">
            {faqData.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <div className="faq-header" onClick={() => toggleFAQ(idx)}>
                    <span className="faq-question">{item.question}</span>
                    <div className="faq-icon">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="faq-body"
                    style={{ maxHeight: isActive ? '300px' : '0px', transition: 'max-height 0.4s ease' }}
                  >
                    <div className="faq-answer">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
