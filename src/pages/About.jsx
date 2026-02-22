import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import useScrollReveal from '../hooks/useScrollReveal'

const team = [
  { name: 'Alexander Mitchell', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', socials: [{ icon: 'fab fa-linkedin-in' }, { icon: 'fab fa-twitter' }] },
  { name: 'Sarah Chen', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', socials: [{ icon: 'fab fa-linkedin-in' }, { icon: 'fab fa-twitter' }] },
  { name: 'Michael Rodriguez', role: 'Chief Operations Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', socials: [{ icon: 'fab fa-linkedin-in' }, { icon: 'fab fa-twitter' }] },
  { name: 'Emily Davidson', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', socials: [{ icon: 'fab fa-linkedin-in' }, { icon: 'fab fa-dribbble' }] },
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
  const introRef = useScrollReveal()
  const missionRef = useScrollReveal()
  const teamRef = useScrollReveal()
  const timelineRef = useScrollReveal()
  const awardsRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <>
      <PageHeader breadcrumbLabel="About Us" subtitle="Discover the story behind Frame Syndicate and our mission to transform businesses through technology.">
        About <span className="highlight">Us</span>
      </PageHeader>

      {/* About Intro */}
      <section className="about-intro" ref={introRef}>
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <span className="section-tag"><span className="tag-dot"></span> Who We Are</span>
              <h2 className="section-title">A Team of Passionate <span className="highlight">Innovators</span></h2>
              <p className="intro-text">
                Founded in 2014, Frame Syndicate has grown from a small startup to a global IT solutions
                powerhouse. We&apos;re a team of engineers, designers, strategists, and dreamers who believe
                technology should empower businesses, not complicate them.
              </p>
              <p className="intro-text">
                Our journey began with a simple idea: create technology solutions that truly make a difference.
                Since 2020, we&apos;ve helped numerous businesses transform their digital presence
                and achieve remarkable growth.
              </p>
              <div className="intro-stats">
                <div className="intro-stat">
                  <span className="stat-num">3+</span>
                  <span className="stat-text">Years Experience</span>
                </div>
                <div className="intro-stat">
                  <span className="stat-num">50+</span>
                  <span className="stat-text">Clients Served</span>
                </div>
                <div className="intro-stat">
                  <span className="stat-num">2+</span>
                  <span className="stat-text">Countries</span>
                </div>
              </div>
            </div>
            <div className="intro-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" alt="Our Team" />
              <div className="image-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section" ref={missionRef}>
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon"><i className="fas fa-bullseye"></i></div>
              <h3>Our Mission</h3>
              <p>To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon"><i className="fas fa-eye"></i></div>
              <h3>Our Vision</h3>
              <p>To be the world&apos;s most trusted technology partner, known for transforming complex challenges into elegant, impactful solutions.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon"><i className="fas fa-heart"></i></div>
              <h3>Our Values</h3>
              <p>Innovation, integrity, collaboration, and excellence guide everything we do. We believe in building lasting partnerships, not just projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" ref={teamRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Meet The Experts</span>
            <h2 className="section-title-large">Our Leadership Team</h2>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.role} loading="lazy" />
                  <div className="team-social">
                    {member.socials.map((s, j) => (
                      <a key={j} href="#"><i className={s.icon}></i></a>
                    ))}
                  </div>
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Our Journey</span>
            <h2 className="section-title-large">Company Timeline</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section" ref={awardsRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag"><span className="tag-dot"></span> Recognition</span>
            <h2 className="section-title-large">Awards &amp; Certifications</h2>
          </div>
          <div className="awards-grid">
            {awardsData.map((award, i) => (
              <div key={i} className="award-card">
                <i className={award.icon}></i>
                <h4>{award.title}</h4>
                <span>{award.sub}</span>
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
          <div className="cta-content">
            <h2 className="cta-title">Ready to Work<br />With Us?</h2>
            <p className="cta-text">Let&apos;s build something amazing together.</p>
            <Link to="/contact" className="btn btn-light">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
