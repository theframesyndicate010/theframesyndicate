import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import useScrollReveal from '../hooks/useScrollReveal'

const serviceDetails = [
  {
    id: 'cloud', num: '01', title: 'Cloud Solutions', alt: false,
    text: 'Transform your infrastructure with our enterprise-grade cloud solutions. We help you migrate, optimize, and manage cloud environments that scale with your business needs.',
    features: ['Cloud Migration & Strategy', 'AWS, Azure & Google Cloud', 'Hybrid Cloud Architecture', 'Cloud Security & Compliance', '24/7 Monitoring & Support', 'Cost Optimization'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
  },
  {
    id: 'software', num: '02', title: 'Software Development', alt: true,
    text: 'Custom software solutions built with modern technologies and best practices. We create applications that are scalable, secure, and designed to solve your unique business challenges.',
    features: ['Custom Web Applications', 'Mobile App Development', 'API Development & Integration', 'Enterprise Software', 'DevOps & CI/CD', 'Quality Assurance'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
  },
  {
    id: 'security', num: '03', title: 'Cybersecurity', alt: false,
    text: 'Protect your digital assets with our comprehensive cybersecurity solutions. We provide end-to-end security services that safeguard your business from evolving threats.',
    features: ['Security Assessments', 'Penetration Testing', 'Security Operations Center', 'Incident Response', 'Compliance Management', 'Employee Training'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
  },
  {
    id: 'ai', num: '04', title: 'AI & Machine Learning', alt: true,
    text: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent solutions that give you a competitive edge.',
    features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Chatbots & Virtual Assistants', 'AI Strategy Consulting'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600',
  },
  {
    id: 'consulting', num: '05', title: 'IT Consulting', alt: false,
    text: 'Strategic technology consulting that aligns your IT investments with business objectives. We help you make informed decisions and create roadmaps for digital success.',
    features: ['Digital Transformation', 'Technology Assessment', 'IT Strategy & Roadmap', 'Vendor Selection', 'Process Optimization', 'Change Management'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
  },
  {
    id: 'data', num: '06', title: 'Data Analytics', alt: true,
    text: 'Turn your data into actionable insights with our comprehensive analytics solutions. We help you collect, process, and visualize data to make better business decisions.',
    features: ['Business Intelligence', 'Data Warehousing', 'Real-time Analytics', 'Data Visualization', 'Big Data Solutions', 'Data Governance'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  },
  {
    id: 'seo', num: '07', title: 'SEO Services', alt: false,
    text: 'Boost your online visibility and drive organic traffic with our expert SEO services. We help you rank higher on search engines and reach your target audience effectively.',
    features: ['Keyword Research & Strategy', 'On-Page SEO Optimization', 'Technical SEO Audits', 'Link Building', 'Content Strategy', 'Analytics & Reporting'],
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600',
  },
]

const techStack = [
  { icon: 'fab fa-node-js', name: 'Node.js' },
  { icon: 'fab fa-node-js', name: 'Express.js' },
  { icon: 'fab fa-js-square', name: 'JavaScript' },
  { icon: 'fab fa-vuejs', name: 'Vue.js' },
  { icon: 'fab fa-angular', name: 'Angular' },
  { icon: 'fab fa-google', name: 'Google Cloud' },
  { icon: 'fab fa-python', name: 'Python' },
  { icon: 'fas fa-database', name: 'PostgreSQL' },
  { icon: 'fas fa-wind', name: 'Tailwind' },
  { icon: 'fab fa-html5', name: 'HTML' },
  { icon: 'fab fa-css3-alt', name: 'CSS' },
]

const processSteps = [
  { num: '1', title: 'Discovery', desc: 'We dive deep into understanding your business, goals, and challenges.' },
  { num: '2', title: 'Strategy', desc: 'We create a comprehensive roadmap tailored to your specific needs.' },
  { num: '3', title: 'Development', desc: 'Our expert team builds your solution using agile methodologies.' },
  { num: '4', title: 'Launch', desc: 'We deploy, test, and ensure everything runs smoothly.' },
  { num: '5', title: 'Support', desc: 'Ongoing maintenance and optimization to keep you ahead.' },
]

export default function Services() {
  const overviewRef = useScrollReveal()
  const techRef = useScrollReveal()
  const processRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <>
      <PageHeader breadcrumbLabel="Services" subtitle="Comprehensive IT solutions tailored to transform your business and drive growth.">
        Our <span className="highlight">Services</span>
      </PageHeader>

      {/* Overview */}
      <section className="services-overview" ref={overviewRef}>
        <div className="container">
          <div className="overview-content">
            <span className="section-tag"><span className="tag-dot"></span> What We Offer</span>
            <h2 className="section-title">End-to-End Technology <span className="highlight">Solutions</span></h2>
            <p className="overview-text">
              From strategy to implementation, we provide comprehensive IT services that help businesses
              innovate, scale, and succeed in the digital age. Our expert team combines cutting-edge
              technology with deep industry expertise to deliver solutions that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      {serviceDetails.map((service) => (
        <section key={service.id} className={`service-detail${service.alt ? ' alt' : ''}`} id={service.id}>
          <div className="container">
            <div className={`service-detail-grid${service.alt ? ' reverse' : ''}`}>
              <div className="service-detail-content">
                <div className="service-number">{service.num}</div>
                <h3 className="service-detail-title">{service.title}</h3>
                <p className="service-detail-text">{service.text}</p>
                <ul className="service-features">
                  {service.features.map((f, i) => (
                    <li key={i}><i className="fas fa-check"></i> {f}</li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-primary">Get Started</Link>
              </div>
              <div className="service-detail-image">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Technologies */}
      <section className="tech-section" ref={techRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Our Stack</span>
            <h2 className="section-title-large">Technologies We Use</h2>
          </div>
          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div key={i} className="tech-item">
                <i className={tech.icon}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section" ref={processRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> How We Work</span>
            <h2 className="section-title-large">Our Process</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <Fragment key={i}>
                <div className="process-step">
                  <div className="process-icon"><span>{step.num}</span></div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && <div className="process-connector"></div>}
              </Fragment>
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
            <h2 className="cta-title">Ready to Transform<br />Your Business?</h2>
            <p className="cta-text">Let&apos;s discuss how we can help you achieve your goals.</p>
            <Link to="/contact" className="btn btn-light">Start Your Project</Link>
          </div>
        </div>
      </section>
    </>
  )
}
