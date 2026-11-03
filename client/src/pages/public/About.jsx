import { useEffect, useRef } from 'react'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Target,
  UsersRound,
  Waypoints,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useTheme from '../../hooks/useTheme'
import '../../styles/About.css'

const values = [
  {
    icon: Lightbulb,
    title: 'Practical Learning',
    description:
      'Build understanding through hands-on practice, guided activities, and meaningful projects.',
  },
  {
    icon: HeartHandshake,
    title: 'Supportive Guidance',
    description:
      'Learn with clear direction, helpful feedback, and an environment that encourages questions.',
  },
  {
    icon: Compass,
    title: 'Purposeful Growth',
    description:
      'Develop useful skills step by step and keep moving towards your personal learning goals.',
  },
]

const approach = [
  {
    number: '01',
    title: 'Learn the fundamentals',
    description:
      'Understand the core concepts with a clear, structured learning path.',
  },
  {
    number: '02',
    title: 'Practice with purpose',
    description:
      'Apply new knowledge through exercises, practical tasks, and projects.',
  },
  {
    number: '03',
    title: 'Build confidence',
    description:
      'Review your progress, strengthen your skills, and prepare for your next step.',
  },
]

function About() {
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
      className={`about-page${isDark ? ' theme-dark' : ' theme-light'}`}
      ref={pageRef}
    >
      <Navbar />

      <main>
        {/* Hero */}
        <section className="about-hero">
          <div className="about-container about-hero-grid">
            <div className="about-hero-copy">
              <span className="about-eyebrow about-hero-eyebrow">
                <span className="about-eyebrow-dot" />
                GET TO KNOW NEXLEARN
              </span>

              <h1>
                Learning today.
                <span> Growing for tomorrow.</span>
              </h1>

              <p className="about-hero-description">
                We believe learning should be clear, practical, and full of
                possibility. NexLearn is built around helping learners grow
                their knowledge, develop useful skills, and take their next
                step with confidence.
              </p>

              <div className="about-hero-actions">
                <Link to="/programs" className="about-button about-button-primary">
                  Explore programs <ArrowRight size={17} />
                </Link>
                <Link to="/contact" className="about-button about-button-secondary">
                  Get in touch
                </Link>
              </div>

              <div className="about-hero-note">
                <CheckCircle2 size={17} />
                <span>A learning journey built around progress</span>
              </div>
            </div>

            <div className="about-hero-visual" aria-label="NexLearn learning illustration">
              <div className="about-orbit about-orbit-one" />
              <div className="about-orbit about-orbit-two" />
              <div className="about-floating-spark about-spark-one">✦</div>
              <div className="about-floating-spark about-spark-two">✧</div>

              <div className="about-float-card">
                <div className="about-visual-topline">
                  <span className="about-visual-icon">
                    <GraduationCap size={24} />
                  </span>
                  <span className="about-status">
                    <span /> LEARN & GROW
                  </span>
                </div>

                <div className="about-visual-heading">
                  <span>Your journey</span>
                  <strong>Starts with curiosity.</strong>
                </div>

                <div className="about-visual-path">
                  <div className="about-path-step">
                    <span className="about-path-icon"><BookOpen size={18} /></span>
                    <span>
                      <strong>Discover</strong>
                      <small>Explore new ideas</small>
                    </span>
                    <CheckCircle2 size={18} className="about-path-check" />
                  </div>
                  <div className="about-path-connector" />
                  <div className="about-path-step">
                    <span className="about-path-icon"><Waypoints size={18} /></span>
                    <span>
                      <strong>Practice</strong>
                      <small>Put learning into action</small>
                    </span>
                    <span className="about-path-number">02</span>
                  </div>
                  <div className="about-path-connector" />
                  <div className="about-path-step">
                    <span className="about-path-icon"><Target size={18} /></span>
                    <span>
                      <strong>Progress</strong>
                      <small>Move towards your goals</small>
                    </span>
                    <span className="about-path-number">03</span>
                  </div>
                </div>

                <div className="about-visual-footer">
                  <span className="about-visual-footer-mark"><GraduationCap size={17} /></span>
                  <span>LEARN. GROW. ACHIEVE.</span>
                </div>
              </div>

              <div className="about-float-chip about-float-chip-top">
                <Lightbulb size={17} />
                <span>Stay curious</span>
              </div>
              <div className="about-float-chip about-float-chip-bottom">
                <Target size={17} />
                <span>Keep progressing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Intro / Story */}
        <section className="about-story-section">
          <div className="about-container about-story-grid">
            <div className="about-section-heading" data-reveal>
              <span className="about-eyebrow">OUR STORY</span>
              <h2>
                Education with a focus on
                <span> real-world growth.</span>
              </h2>
            </div>

            <div className="about-story-copy" data-reveal>
              <p>
                Every learning journey begins with a question and grows through
                practice, encouragement, and persistence. NexLearn is designed
                to make that journey feel more structured, accessible, and
                rewarding.
              </p>
              <p>
                Our approach brings learning goals, skill development, and
                practical application together—so learners can focus on
                understanding concepts and using what they learn.
              </p>
              <Link to="/programs" className="about-text-link">
                Find your learning path <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* Mission and vision */}
        <section className="about-purpose-section">
          <div className="about-container">
            <div className="about-section-heading about-centered-heading" data-reveal>
              <span className="about-eyebrow">WHAT GUIDES US</span>
              <h2>
                Learning with <span>purpose.</span>
              </h2>
              <p>
                Clear goals, meaningful practice, and progress that learners
                can build on.
              </p>
            </div>

            <div className="about-purpose-grid">
              <article className="about-purpose-card" data-reveal>
                <span className="about-purpose-icon"><Target size={23} /></span>
                <span className="about-card-kicker">OUR MISSION</span>
                <h3>Make learning meaningful.</h3>
                <p>
                  Help learners build a strong foundation, practice with
                  intention, and develop skills they can use beyond the
                  classroom.
                </p>
                <span className="about-card-decoration">01</span>
              </article>

              <article className="about-purpose-card about-purpose-card-accent" data-reveal>
                <span className="about-purpose-icon"><Compass size={23} /></span>
                <span className="about-card-kicker">OUR VISION</span>
                <h3>Make growth a habit.</h3>
                <p>
                  Encourage a culture of curiosity, confidence, and continuous
                  improvement—one step and one achievement at a time.
                </p>
                <span className="about-card-decoration">02</span>
              </article>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values-section">
          <div className="about-container">
            <div className="about-section-heading about-centered-heading" data-reveal>
              <span className="about-eyebrow">THE NEXLEARN APPROACH</span>
              <h2>
                More than lessons. <span>A way to grow.</span>
              </h2>
              <p>
                A thoughtful learning experience built around the things that
                help learners move forward.
              </p>
            </div>

            <div className="about-values-grid">
              {values.map(({ icon: Icon, title, description }, index) => (
                <article
                  className="about-value-card"
                  data-reveal
                  key={title}
                  style={{ '--reveal-delay': `${index * 100}ms` }}
                >
                  <span className="about-value-icon"><Icon size={22} /></span>
                  <span className="about-value-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="about-value-line" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Learning journey */}
        <section className="about-journey-section">
          <div className="about-container about-journey-grid">
            <div className="about-journey-intro" data-reveal>
              <span className="about-eyebrow">YOUR LEARNING JOURNEY</span>
              <h2>
                Small steps.
                <span> Lasting progress.</span>
              </h2>
              <p>
                Growth takes time. A clear path can make the next step easier
                to see—and easier to take.
              </p>
              <Link to="/programs" className="about-button about-button-primary">
                Browse programs <ArrowRight size={17} />
              </Link>
            </div>

            <div className="about-journey-steps">
              {approach.map((step, index) => (
                <article
                  className="about-journey-step"
                  data-reveal
                  key={step.number}
                  style={{ '--reveal-delay': `${index * 110}ms` }}
                >
                  <span className="about-journey-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta-section">
          <div className="about-container">
            <div className="about-cta-card" data-reveal>
              <div className="about-cta-decoration about-cta-decoration-one" />
              <div className="about-cta-decoration about-cta-decoration-two" />
              <div className="about-cta-content">
                <span className="about-eyebrow">YOUR NEXT CHAPTER</span>
                <h2>Ready to take the next step?</h2>
                <p>
                  Explore learning opportunities or reach out to find the
                  information you need to get started.
                </p>
                <div className="about-hero-actions">
                  <Link to="/programs" className="about-button about-button-primary">
                    Explore programs <ArrowRight size={17} />
                  </Link>
                  <Link to="/contact" className="about-button about-button-secondary">
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="about-cta-icon" aria-hidden="true">
                <UsersRound size={48} strokeWidth={1.4} />
                <GraduationCap size={28} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
