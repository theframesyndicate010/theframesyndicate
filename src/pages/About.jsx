import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { pageData } from '../content/pageData'
import useScrollReveal from '../hooks/useScrollReveal'

const team = [
  {
    name: 'Shantiram Meche',
    role: 'CEO & Founder',
    image: '/ceo.jpeg',
    socials: []
  },
  {
    name: 'Sailesh Shahi',
    role: 'Managing Director/ Board Member',
    image: '',
    socials: []
  },
]

const aboutPoints = [
  'Strategy-led delivery with clear milestones',
  'Full-stack engineering and design expertise',
  'Security-first, performance-focused builds',
]

const aboutHighlights = [
  { icon: 'fas fa-briefcase', title: '3+ Years', text: 'Proven experience in product delivery.' },
  { icon: 'fas fa-users', title: '10+ Clients', text: 'Trusted by growing companies.' },
  { icon: 'fas fa-globe', title: '2+ Countries', text: 'Serving teams across regions.' },
  { icon: 'fas fa-rocket', title: 'Growth Ready', text: 'Systems designed to scale.' },
]

const valuePillars = [
  {
    icon: 'fas fa-bullseye',
    title: 'Our Mission',
    text: 'Empower businesses with technology that drives measurable growth and efficiency.'
  },
  {
    icon: 'fas fa-eye',
    title: 'Our Vision',
    text: 'Be the most trusted technology partner for ambitious companies worldwide.'
  },
  {
    icon: 'fas fa-heart',
    title: 'Our Values',
    text: 'Innovation, integrity, and collaboration guide every engagement.'
  },
]
const timeline = [
  { year: '2020', title: 'The Beginning', desc: 'Frame Syndicate was founded with a vision to revolutionize IT solutions.' },
  { year: '2021', title: 'First Major Client', desc: 'Secured our first major client, marking a significant milestone.' },
  { year: '2022', title: 'Team Expansion', desc: 'Expanded our team with talented developers and designers.' },
  { year: '2023', title: 'Service Growth', desc: 'Launched SEO services and expanded our technology stack.' },
  { year: '2024', title: 'Industry Recognition', desc: 'Recognized for delivering quality software solutions in Nepal.' },
  { year: '2025', title: 'Regional Expansion', desc: 'Opened second office in Dhulabari, Jhapa to serve more clients.' },
  { year: '2026', title: 'The Future', desc: 'Continuing to innovate and transform businesses across Nepal and beyond.' },
]

const awardsData = [
  { icon: 'fas fa-trophy', title: 'Best IT Solutions Provider', sub: 'Tech Excellence Awards 2025' },
  { icon: 'fas fa-certificate', title: 'ISO 27001 Certified', sub: 'Information Security' },
  { icon: 'fas fa-award', title: 'Quality Excellence', sub: 'Customer Satisfaction 2024' },
  { icon: 'fas fa-shield-alt', title: 'SOC 2 Type II', sub: 'Security Compliance' },
  { icon: 'fas fa-star', title: '5-Star Clutch Rating', sub: 'Client Reviews' },
  { icon: 'fab fa-aws', title: 'AWS Premier Partner', sub: 'Cloud Excellence' },
]

export default function About() {
  const page = pageData['/about']
  const introRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const missionRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const teamRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const timelineRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const awardsRef = useScrollReveal({ reveal: 'fade-up', stagger: true })
  const ctaRef = useScrollReveal({ reveal: 'fade-up' })

  return (
    <>
      <PageHeader
        breadcrumbLabel="About Us"
        subtitle="Discover the story behind Frame Syndicate and our mission to transform businesses through technology."
        author={page.author}
        updatedAt={page.updatedAt}
      >
        About <span className="highlight">Us</span>
      </PageHeader>

      {/* About Showcase */}
      <section className="about-showcase about-showcase-alt" ref={introRef}>
        <div className="container">
          <div className="about-showcase-shell">
            <div className="about-showcase-grid">
              <div className="about-showcase-content" data-reveal-item>
                <span className="about-showcase-tag">Who We Are</span>
                <h2 className="about-showcase-title">A Team of Passionate Innovators</h2>
                <p className="about-showcase-text">
                  Founded in 2020, Frame Syndicate has grown from a small startup to a global IT solutions
                  powerhouse. We are engineers, designers, and strategists who believe technology should
                  empower businesses, not complicate them.
                </p>
                <p className="about-showcase-text">
                  Our journey began with a simple idea: create technology solutions that truly make a difference.
                  Since 2020, we have helped businesses transform their digital presence and achieve steady growth.
                </p>
                <ul className="about-showcase-list">
                  {aboutPoints.map((point) => (
                    <li key={point}>
                      <i className="fas fa-circle" aria-hidden="true"></i>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="about-showcase-badges">
                  {aboutHighlights.map((item) => (
                    <div key={item.title} className="about-showcase-badge" data-reveal-item>
                      <span className="about-showcase-badge-icon" aria-hidden="true">
                        <i className={item.icon}></i>
                      </span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-showcase-media" data-reveal="scale-blur" data-reveal-item>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900" alt="Our Team" />
                <div className="about-showcase-stat">
                  <span className="about-showcase-stat-value">2020</span>
                  <span className="about-showcase-stat-label">Founded In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-pillars" ref={missionRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Our Purpose</span>
            <h2 className="section-title-large">Mission, Vision, Values</h2>
          </div>
          <div className="about-pillars-grid">
            {valuePillars.map((pillar) => (
              <div key={pillar.title} className="about-pillar-card" data-reveal-item>
                <div className="about-pillar-icon" aria-hidden="true">
                  <i className={pillar.icon}></i>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="about-leadership" ref={teamRef}>
        <div className="container">
          <div className="about-leadership-grid">
            <div className="about-leadership-content" data-reveal-item>
              <span className="section-tag"><span className="tag-dot"></span> Leadership</span>
              <h2 className="section-title">Guided by Builders and Strategists</h2>
              <p className="about-leadership-text">
                Our leadership team blends technical depth with business clarity. We prioritize transparent
                delivery, measurable impact, and long-term partnerships.
              </p>
              <Link to="/contact" className="btn btn-outline-dark">Connect with Us</Link>
            </div>
            <div className="about-leadership-cards">
              {team.map((member, i) => {
                const imageSrc = member.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600'
                return (
                  <div key={i} className="about-leadership-card" data-reveal-item>
                    <div className="about-leadership-media">
                      <img src={imageSrc} alt={member.name} loading="lazy" />
                    </div>
                    <div className="about-leadership-body">
                      <h4>{member.name}</h4>
                      <span className="about-leadership-role">{member.role}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="about-journey" ref={timelineRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Our Journey</span>
            <h2 className="section-title-large">Company Timeline</h2>
          </div>
          <div className="about-journey-grid">
            {timeline.map((item) => (
              <div key={item.year} className="about-journey-card" data-reveal-item>
                <span className="about-journey-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="about-awards" ref={awardsRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Recognition</span>
            <h2 className="section-title-large">Awards &amp; Certifications</h2>
          </div>
          <div className="about-awards-grid">
            {awardsData.map((award) => (
              <div key={award.title} className="about-award-card" data-reveal-item>
                <span className="about-award-icon" aria-hidden="true">
                  <i className={award.icon}></i>
                </span>
                <div>
                  <h4>{award.title}</h4>
                  <p>{award.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-background">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="container">
          <div className="cta-content" data-reveal="scale-blur">
            <h2 className="cta-title">Ready to Work<br />With Us?</h2>
            <p className="cta-text">Let&apos;s build something amazing together.</p>
            <Link to="/contact" className="btn btn-light">Get In Touch</Link>
          </div>
        </div>
      </section>

    </>
  )
}
