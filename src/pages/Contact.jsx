import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import useScrollReveal from '../hooks/useScrollReveal'

const infoCards = [
  { icon: 'fas fa-map-marker-alt', title: 'Visit Us', content: <>Birtamode, Jhapa<br />Dhulabari, Jhapa<br />Nepal</> },
  { icon: 'fas fa-envelope', title: 'Email Us', content: <>theframesyndicate@gmail.com<br />surajmechesuraj@gmail.com</> },
  { icon: 'fas fa-phone', title: 'Call Us', content: '+977 9815959883' },
  { icon: 'fas fa-clock', title: 'Business Hours', content: <>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: Closed</> },
]

const faqData = [
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. A simple MVP might take 8-12 weeks, while enterprise solutions can take 6-12 months. We\'ll provide a detailed timeline during our discovery phase.' },
  { q: 'What is your development process?', a: 'We follow an agile methodology with regular sprints and client check-ins. This includes discovery, design, development, testing, deployment, and ongoing support phases.' },
  { q: 'Do you offer ongoing support?', a: 'Yes! We offer various support packages including 24/7 monitoring, maintenance, updates, and priority support. Our team is always here to help even after project completion.' },
  { q: 'How do you ensure project security?', a: 'Security is built into every project from day one. We follow industry best practices, conduct regular security audits, and maintain SOC 2 and ISO 27001 certifications.' },
  { q: 'Can you work with our existing tech stack?', a: 'Absolutely! Our team has experience with a wide range of technologies and can seamlessly integrate with your existing infrastructure or help modernize legacy systems.' },
  { q: 'What industries do you work with?', a: 'We work across various industries including finance, healthcare, retail, manufacturing, technology, and more. Our diverse experience allows us to bring unique insights to every project.' },
]

export default function Contact() {
  const formRef = useScrollReveal()
  const mapRef = useScrollReveal()
  const faqRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', service: '', budget: '', message: '', newsletter: false,
  })
  const [formStatus, setFormStatus] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('sent')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', budget: '', message: '', newsletter: false })
      setTimeout(() => setFormStatus(null), 2000)
    }, 1500)
  }

  return (
    <>
      <PageHeader breadcrumbLabel="Contact" subtitle="Have a project in mind? Let's talk about how we can help." short>
        Get In <span className="highlight">Touch</span>
      </PageHeader>

      {/* Contact Section */}
      <section className="contact-page-section" ref={formRef}>
        <div className="container">
          <div className="contact-page-grid">
            {/* Info Cards */}
            <div className="contact-info-block">
              {infoCards.map((card, i) => (
                <div key={i} className="info-card">
                  <div className="info-icon"><i className={card.icon}></i></div>
                  <div className="info-content">
                    <h4>{card.title}</h4>
                    <p>{card.content}</p>
                  </div>
                </div>
              ))}
              <div className="social-block">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-block">
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="john@company.com" required value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="+977 98XXXXXXXX" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Interested In *</label>
                  <select id="service" name="service" required value={formData.service} onChange={handleChange}>
                    <option value="" disabled>Select a service</option>
                    <option value="cloud">Cloud Solutions</option>
                    <option value="software">Software Development</option>
                    <option value="security">Cybersecurity</option>
                    <option value="ai">AI &amp; Machine Learning</option>
                    <option value="seo">SEO Services</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="data">Data Analytics</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Project Budget</label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="" disabled>Select budget range</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea id="message" name="message" placeholder="Tell us about your project, goals, and timeline..." rows="6" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className="form-group checkbox-group">
                  <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
                  <label htmlFor="newsletter">Subscribe to our newsletter for industry insights and company updates.</label>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={formStatus === 'sending'}>
                  <span>{formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Sent!' : 'Send Message'}</span>
                  {!formStatus && <i className="fas fa-paper-plane"></i>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section" ref={mapRef}>
        <div className="container">
          <div className="map-wrapper">
            <div className="map-overlay">
              <h3>Our Office</h3>
              <p>Located in Birtamode and Dhulabari, Jhapa, Nepal. We&apos;re always ready to meet.</p>
              <a href="https://maps.google.com/maps?q=Birtamode,+Jhapa,+Nepal" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Get Directions</a>
            </div>
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57097.04181766166!2d87.9473!3d26.6297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5b107f8b517c1%3A0x8b8b8d8b8b8b8b8b!2sBirtamode%2C%20Jhapa%2C%20Nepal!5e0!3m2!1sen!2snp!4v1645567890123!5m2!1sen!2snp"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="locations-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Global Presence</span>
            <h2 className="section-title">Our Offices</h2>
          </div>
          <div className="locations-grid">
            <div className="location-card">
              <div className="location-icon"><i className="fas fa-building"></i></div>
              <h4>Birtamode <span className="hq">HQ</span></h4>
              <p>Birtamode<br />Jhapa, Nepal</p>
            </div>
            <div className="location-card">
              <div className="location-icon"><i className="fas fa-building"></i></div>
              <h4>Dhulabari</h4>
              <p>Dhulabari<br />Jhapa, Nepal</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" ref={faqRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            {faqData.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <i className={`fas fa-${openFaq === i ? 'minus' : 'plus'}`}></i>
                </button>
                <div className="faq-answer" style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-background">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start<br />Your Project?</h2>
            <p className="cta-text">Schedule a free consultation with our experts.</p>
            <a href="mailto:theframesyndicate@gmail.com" className="btn btn-light">
              <i className="fas fa-calendar-alt"></i>
              <span>Schedule a Call</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
