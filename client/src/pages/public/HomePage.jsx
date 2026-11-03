import { useEffect, useRef } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Code2,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useTheme from '../../hooks/useTheme'
import '../../styles/Home.css'

const programs = [
  {
    number: '01',
    title: 'Computer Applications',
    description:
      'Build practical digital skills and develop confidence with modern computer applications.',
    icon: Laptop,
    tags: ['Digital Skills', 'Practical Learning'],
  },
  {
    number: '02',
    title: 'Professional Courses',
    description:
      'Develop career-focused skills through structured learning and practical assignments.',
    icon: Code2,
    tags: ['Career Ready', 'Skill Development'],
  },
  {
    number: '03',
    title: 'Academic Learning',
    description:
      'Strengthen your foundation with guided learning, regular practice and clear goals.',
    icon: BookOpen,
    tags: ['Core Concepts', 'Guided Learning'],
  },
]

const benefits = [
  {
    icon: GraduationCap,
    title: 'Learn with purpose',
    description:
      'Follow a structured learning path designed to help you make meaningful progress.',
  },
  {
    icon: Users,
    title: 'Supportive environment',
    description:
      'Learn in an environment that values guidance, consistency and individual growth.',
  },
  {
    icon: ShieldCheck,
    title: 'Progress you can track',
    description:
      'Keep your learning journey organized with a clear view of important academic information.',
  },
]

function SectionLabel({ children }) {
  return (
    <span className="home-eyebrow">
      <span className="home-eyebrow-dot" />
      {children}
    </span>
  )
}

function HomePage() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    const root = pageRef.current
    if (!root) return undefined

    const elements = root.querySelectorAll('[data-reveal]')
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={pageRef}
      className={`home-page${isDark ? ' theme-dark' : ' theme-light'}`}
    >
      <Navbar />

      <main>
        <section className="home-hero">
          <div className="home-container home-hero-grid">
            <div className="home-hero-copy" data-reveal>
              <SectionLabel>YOUR NEXT CHAPTER STARTS HERE</SectionLabel>
              <h1>
                Your future.
                <span>Your skills.</span>
                <em>Your next chapter.</em>
              </h1>
              <p className="home-hero-description">
                Discover your potential, develop practical skills and take the next
                step toward your goals with a learning experience built around your growth.
              </p>
              <div className="home-hero-actions">
                <Link to="/programs" className="home-button home-button-primary">
                  Explore programs <ArrowRight size={17} />
                </Link>
                <Link to="/about" className="home-button home-button-secondary">
                  Discover NexLearn
                </Link>
              </div>
              <div className="home-hero-note">
                <CheckCircle2 size={17} />
                <span>Structured learning. Meaningful progress.</span>
              </div>
            </div>

            <div className="home-hero-visual" data-reveal>
              <div className="home-orbit home-orbit-one" />
              <div className="home-orbit home-orbit-two" />
              <div className="home-hero-card">
                <div className="home-card-top">
                  <span>THE LEARNING SPACE</span>
                  <span className="home-card-spark"><Sparkles size={19} /></span>
                </div>
                <div className="home-emblem">
                  <div><GraduationCap size={68} strokeWidth={1.3} /></div>
                </div>
                <div className="home-card-bottom">
                  <div>
                    <span>EVERY STEP COUNTS</span>
                    <h3>Learn beyond limits.</h3>
                  </div>
                  <ArrowUpRight size={23} />
                </div>
              </div>
              <div className="home-float-chip home-float-chip-top">
                <span className="home-chip-icon"><BookOpen size={18} /></span>
                <span><strong>Keep learning</strong><small>One step at a time</small></span>
              </div>
              <div className="home-float-chip home-float-chip-bottom">
                <span className="home-chip-icon"><CheckCircle2 size={18} /></span>
                <span><strong>Make progress</strong><small>Build skills with purpose</small></span>
              </div>
              <span className="home-decoration home-decoration-one" />
              <span className="home-decoration home-decoration-two" />
            </div>
          </div>
          <a className="home-scroll-link" href="#home-introduction">
            SCROLL TO EXPLORE <ArrowDown size={15} />
          </a>
        </section>

        <section className="home-intro" id="home-introduction">
          <div className="home-container home-intro-grid">
            <div data-reveal>
              <SectionLabel>A BETTER WAY TO LEARN</SectionLabel>
              <h2>Make learning <span>work for you.</span></h2>
            </div>
            <div className="home-intro-copy" data-reveal>
              <p>
                Education is more than completing a course. It is about building
                confidence, discovering opportunities and gaining the skills to move forward.
              </p>
              <Link to="/about" className="home-text-link">
                Get to know NexLearn <ArrowRight size={17} />
              </Link>
            </div>
            <div className="home-intro-stamp" aria-hidden="true">
              <Sparkles size={23} /><strong>GROW</strong><strong>WITH</strong><strong>PURPOSE</strong>
            </div>
          </div>
        </section>

        <section className="home-programs-section">
          <div className="home-container">
            <div className="home-section-heading" data-reveal>
              <div>
                <SectionLabel>FIND YOUR DIRECTION</SectionLabel>
                <h2>Learning paths for <span>what comes next.</span></h2>
              </div>
              <Link to="/programs" className="home-text-link">
                Explore all programs <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="home-programs-grid">
              {programs.map(({ number, title, description, icon: Icon, tags }, index) => (
                <article
                  className="home-program-card"
                  key={number}
                  data-reveal
                  style={{ '--home-delay': `${index * 100}ms` }}
                >
                  <div className="home-program-card-top">
                    <span className="home-program-number">{number}</span>
                    <span className="home-program-icon"><Icon size={24} /></span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="home-program-tags">
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <Link to="/programs" className="home-program-link">
                    Explore program <ArrowUpRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
            <p className="home-disclaimer">
              Program categories shown for demonstration. Final course offerings can be configured for your institute.
            </p>
          </div>
        </section>

        <section className="home-benefits-section">
          <div className="home-container home-benefits-grid">
            <div className="home-benefits-intro" data-reveal>
              <SectionLabel>THE NEXLEARN APPROACH</SectionLabel>
              <h2>Built around <span>your growth.</span></h2>
              <p>
                A more organized, focused learning experience helps make every step
                of your journey count.
              </p>
              <Link to="/about" className="home-button home-button-secondary">
                Why NexLearn <ArrowRight size={17} />
              </Link>
            </div>
            <div className="home-benefits-list">
              {benefits.map(({ icon: Icon, title, description }, index) => (
                <article
                  className="home-benefit-card"
                  key={title}
                  data-reveal
                  style={{ '--home-delay': `${index * 100}ms` }}
                >
                  <span className="home-benefit-number">0{index + 1}</span>
                  <span className="home-benefit-icon"><Icon size={23} /></span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <ArrowUpRight className="home-benefit-arrow" size={20} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta-section">
          <div className="home-container">
            <div className="home-cta-card" data-reveal>
              <div className="home-cta-decoration" aria-hidden="true"><GraduationCap size={112} /></div>
              <div className="home-cta-content">
                <SectionLabel>YOUR JOURNEY STARTS HERE</SectionLabel>
                <h2>Ready to take <span>the next step?</span></h2>
                <p>Explore your options and find a learning path that fits your goals.</p>
                <div className="home-hero-actions">
                  <Link to="/programs" className="home-button home-button-primary">
                    Explore programs <ArrowRight size={17} />
                  </Link>
                  <Link to="/contact" className="home-button home-button-secondary">
                    Make an enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
