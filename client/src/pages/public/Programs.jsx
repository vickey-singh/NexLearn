import { BookOpen, BriefcaseBusiness, Code2, Palette, ArrowRight, CheckCircle2, Clock3, GraduationCap, Lightbulb, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useTheme from '../../hooks/useTheme'
import '../../styles/Programs.css'

const programs = [
  {
    icon: Code2,
    number: '01',
    title: 'Computer & IT Skills',
    description: 'Build confidence with essential computer skills and explore the digital tools used in study and work.',
    tags: ['Computer Basics', 'Office Tools', 'Digital Skills'],
    duration: 'Flexible learning path',
    tone: 'sage',
  },
  {
    icon: BriefcaseBusiness,
    number: '02',
    title: 'Professional Skills',
    description: 'Develop practical knowledge and workplace skills that help you prepare for new opportunities.',
    tags: ['Business Skills', 'Productivity', 'Communication'],
    duration: 'Program dependent',
    tone: 'blue',
  },
  {
    icon: Palette,
    number: '03',
    title: 'Design & Creativity',
    description: 'Explore creative thinking, visual communication, and the process of turning ideas into designs.',
    tags: ['Design Basics', 'Visual Thinking', 'Creative Tools'],
    duration: 'Program dependent',
    tone: 'rose',
  },
  {
    icon: BookOpen,
    number: '04',
    title: 'Academic Learning',
    description: 'Strengthen core concepts with structured learning, guided practice, and a focus on steady progress.',
    tags: ['Core Concepts', 'Practice', 'Guidance'],
    duration: 'Based on learning goals',
    tone: 'gold',
  },
]

const learningSteps = [
  {
    icon: Target,
    title: 'Choose your direction',
    description: 'Start with the subject or skill you want to explore.',
  },
  {
    icon: BookOpen,
    title: 'Learn and practice',
    description: 'Build understanding through guided learning and practical activities.',
  },
  {
    icon: GraduationCap,
    title: 'Keep moving forward',
    description: 'Review your progress and decide on your next learning goal.',
  },
]

function Programs() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`programs-page${isDark ? ' theme-dark' : ' theme-light'}`}>
      <Navbar />

      <main>
        <section className="programs-hero">
          <div className="programs-container programs-hero-grid">
            <div className="programs-hero-copy">
              <span className="programs-eyebrow"><span /> EXPLORE NEXLEARN</span>
              <h1>
                Find a path that
                <span> moves you forward.</span>
              </h1>
              <p>
                Every learning journey starts somewhere. Explore areas of learning,
                discover what interests you, and take your next step with confidence.
              </p>
              <div className="programs-hero-actions">
                <a href="#program-list" className="programs-button programs-button-primary">
                  Explore learning areas <ArrowRight size={17} />
                </a>
                <Link to="/contact" className="programs-button programs-button-secondary">
                  Get guidance
                </Link>
              </div>
              <div className="programs-hero-note">
                <CheckCircle2 size={17} />
                <span>A clearer path to learning and growth</span>
              </div>
            </div>

            <div className="programs-hero-visual" aria-label="Illustration of a learning journey">
              <div className="programs-hero-orbit programs-hero-orbit-one" />
              <div className="programs-hero-orbit programs-hero-orbit-two" />
              <div className="programs-hero-panel">
                <div className="programs-hero-panel-top">
                  <span className="programs-hero-cap"><GraduationCap size={34} /></span>
                  <span className="programs-hero-status"><i /> YOUR LEARNING JOURNEY</span>
                </div>
                <h2>Learn with purpose.</h2>
                <p>Grow your knowledge, one step at a time.</p>
                <div className="programs-journey-list">
                  <div className="programs-journey-item">
                    <span className="programs-journey-icon"><Lightbulb size={19} /></span>
                    <span><strong>Discover</strong><small>Explore new interests</small></span>
                    <CheckCircle2 size={18} className="programs-journey-check" />
                  </div>
                  <div className="programs-journey-item">
                    <span className="programs-journey-icon"><BookOpen size={19} /></span>
                    <span><strong>Practice</strong><small>Build useful skills</small></span>
                    <span className="programs-journey-step">02</span>
                  </div>
                  <div className="programs-journey-item">
                    <span className="programs-journey-icon"><Target size={19} /></span>
                    <span><strong>Progress</strong><small>Move towards your goals</small></span>
                    <span className="programs-journey-step">03</span>
                  </div>
                </div>
                <div className="programs-hero-panel-footer">
                  <span><CheckCircle2 size={16} /></span>
                  LEARN · GROW · ACHIEVE
                </div>
              </div>
              <div className="programs-floating-note programs-floating-note-top">
                <span><BookOpen size={19} /></span>
                <div><strong>Practical learning</strong><small>Connect ideas with action</small></div>
              </div>
              <div className="programs-floating-note programs-floating-note-bottom">
                <span><Target size={19} /></span>
                <div><strong>Purposeful growth</strong><small>Progress at your pace</small></div>
              </div>
              <span className="programs-hero-spark programs-hero-spark-one">✦</span>
              <span className="programs-hero-spark programs-hero-spark-two">✧</span>
            </div>
          </div>
        </section>

        <section className="programs-list-section" id="program-list">
          <div className="programs-container">
            <div className="programs-section-heading">
              <div>
                <span className="programs-eyebrow"><span /> LEARNING AREAS</span>
                <h2>Explore what <em>interests you.</em></h2>
              </div>
              <p>
                Start with a broad learning area. Reach out to us to learn more
                about current courses, schedules, and eligibility.
              </p>
            </div>

            <div className="programs-cards">
              {programs.map(({ icon: Icon, number, title, description, tags, duration, tone }) => (
                <article className="programs-card" key={number}>
                  <div className={`programs-card-icon programs-card-icon-${tone}`}>
                    <Icon size={25} strokeWidth={1.8} />
                  </div>
                  <span className="programs-card-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="programs-card-tags">
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="programs-card-footer">
                    <span><Clock3 size={15} /> {duration}</span>
                    <Link to="/contact" aria-label={`Ask about ${title}`}>Learn more <ArrowRight size={16} /></Link>
                  </div>
                </article>
              ))}
            </div>
            <p className="programs-disclaimer">
              Learning areas shown are a general overview. Please contact NexLearn to confirm available programs and details.
            </p>
          </div>
        </section>

        <section className="programs-approach-section">
          <div className="programs-container programs-approach-grid">
            <div className="programs-approach-copy">
              <span className="programs-eyebrow"><span /> THE NEXLEARN APPROACH</span>
              <h2>Small steps.<br /><em>Lasting progress.</em></h2>
              <p>
                Learning feels more achievable when you know where to begin.
                Keep your goals clear, make time to practice, and build on what you learn.
              </p>
              <Link to="/about" className="programs-text-link">Get to know NexLearn <ArrowRight size={17} /></Link>
            </div>
            <div className="programs-steps">
              {learningSteps.map(({ icon: Icon, title, description }, index) => (
                <article className="programs-step" key={title}>
                  <span className="programs-step-icon"><Icon size={21} /></span>
                  <span className="programs-step-number">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="programs-cta-section">
          <div className="programs-container">
            <div className="programs-cta">
              <div className="programs-cta-decoration programs-cta-decoration-one" />
              <div className="programs-cta-decoration programs-cta-decoration-two" />
              <div className="programs-cta-copy">
                <span className="programs-eyebrow">READY FOR YOUR NEXT STEP?</span>
                <h2>Let’s find your learning path.</h2>
                <p>Have a goal in mind, or not sure where to start? Talk to our team and explore your options.</p>
              </div>
              <div className="programs-cta-actions">
                <Link to="/contact" className="programs-button programs-button-cta-light">Talk to our team <ArrowRight size={17} /></Link>
                <Link to="/about" className="programs-button programs-button-cta-outline">About NexLearn</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Programs
