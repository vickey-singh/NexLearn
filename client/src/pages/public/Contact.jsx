import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useTheme from '../../hooks/useTheme'
import '../../styles/Contact.css'

const contactDetails = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@nexlearn.example',
    href: 'mailto:hello@nexlearn.example',
    note: 'For general enquiries',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+91 XXXXX XXXXX',
    href: 'tel:+91',
    note: 'Replace with your contact number',
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: 'Your institute address',
    href: null,
    note: 'Add your campus address here',
  },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function Contact() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const root = pageRef.current
    if (!root) return

    const elements = root.querySelectorAll('[data-reveal]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
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

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
    setSubmitted(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Please complete all required fields.')
      return
    }

    // UI-only form: no email/API delivery is configured in this component.
    setSending(true)
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    setSending(false)
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <div
      ref={pageRef}
      className={`contact-page ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}
    >
      <Navbar />

      <main>
        <section className="contact-hero">
          <div className="contact-hero-glow contact-hero-glow-one" />
          <div className="contact-hero-glow contact-hero-glow-two" />

          <div className="contact-container contact-hero-grid">
            <div className="contact-hero-copy" data-reveal>
              <span className="contact-eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                LET'S CONNECT
              </span>
              <h1>
                Have a question?
                <span> We're here to help.</span>
              </h1>
              <p>
                Whether you’re exploring our programs or need a little guidance,
                we’d love to hear from you. Send us a message and let’s start a conversation.
              </p>
              <div className="contact-hero-actions">
                <a href="#contact-form" className="contact-button contact-button-primary">
                  Send a message <ArrowRight size={17} />
                </a>
                <Link to="/programs" className="contact-text-link">
                  Explore programs <ArrowRight size={16} />
                </Link>
              </div>
              <div className="contact-trust-line">
                <span className="contact-trust-icon"><MessageCircle size={17} /></span>
                <span>Every great journey starts with a conversation.</span>
              </div>
            </div>

            <div className="contact-hero-visual" data-reveal>
              <div className="contact-orbit contact-orbit-outer" />
              <div className="contact-orbit contact-orbit-inner" />
              <div className="contact-floating-card">
                <div className="contact-floating-top">
                  <span className="contact-floating-icon"><MessageCircle size={22} /></span>
                  <span className="contact-online-dot" />
                </div>
                <span className="contact-floating-kicker">YOUR NEXT STEP</span>
                <h2>Let’s figure it out together.</h2>
                <p>Questions, ideas, or a little direction — there’s room for all of it here.</p>
                <div className="contact-floating-divider" />
                <div className="contact-floating-footer">
                  <span className="contact-mini-avatars" aria-hidden="true">
                    <i>N</i><i>L</i><i>+</i>
                  </span>
                  <span>We’re glad you’re here</span>
                </div>
              </div>
              <div className="contact-float-chip contact-float-chip-top">
                <CheckCircle2 size={16} /> Friendly guidance
              </div>
              <div className="contact-float-chip contact-float-chip-bottom">
                <Clock3 size={16} /> One step at a time
              </div>
            </div>
          </div>
          <div className="contact-hero-bottom-line" />
        </section>

        <section className="contact-details-section">
          <div className="contact-container">
            <div className="contact-section-heading" data-reveal>
              <span className="contact-eyebrow">GET IN TOUCH</span>
              <h2>We’d love to <span>hear from you.</span></h2>
              <p>Choose the way that works best for you.</p>
            </div>

            <div className="contact-detail-grid">
              {contactDetails.map(({ icon: Icon, label, value, href, note }) => (
                <article className="contact-detail-card" key={label} data-reveal>
                  <span className="contact-detail-icon"><Icon size={21} /></span>
                  <h3>{label}</h3>
                  {href ? <a href={href}>{value}</a> : <p className="contact-detail-value">{value}</p>}
                  <p className="contact-detail-note">{note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-form-section" id="contact-form">
          <div className="contact-container contact-form-layout">
            <div className="contact-form-aside" data-reveal>
              <span className="contact-eyebrow">CONTACT NEXLEARN</span>
              <h2>Tell us what’s on your <span>mind.</span></h2>
              <p>
                Fill in the form and share a little about what you need. We’ll make
                it easier to find the right next step.
              </p>
              <div className="contact-aside-note">
                <span><Clock3 size={19} /></span>
                <div>
                  <strong>Take your time</strong>
                  <p>Give us enough detail to understand how we can help.</p>
                </div>
              </div>
              <div className="contact-aside-decoration" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </div>
            </div>

            <div className="contact-form-card" data-reveal>
              {submitted ? (
                <div className="contact-success-state" role="status">
                  <span className="contact-success-icon"><CheckCircle2 size={32} /></span>
                  <h3>Thanks for reaching out!</h3>
                  <p>Your form passed the front-end validation. This demo form does not send or store your enquiry yet.</p>
                  <button
                    type="button"
                    className="contact-button contact-button-primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-heading">
                    <span className="contact-form-step">A LITTLE ABOUT YOU</span>
                    <h3>Send us a message</h3>
                    <p>Fields marked with * are required.</p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="contact-input-grid">
                      <label className="contact-field">
                        <span>Full name <b>*</b></span>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          autoComplete="name"
                          required
                        />
                      </label>
                      <label className="contact-field">
                        <span>Email address <b>*</b></span>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                        />
                      </label>
                      <label className="contact-field">
                        <span>Phone number</span>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91"
                          autoComplete="tel"
                        />
                      </label>
                      <label className="contact-field">
                        <span>Subject <b>*</b></span>
                        <select name="subject" value={form.subject} onChange={handleChange} required>
                          <option value="">Choose a subject</option>
                          <option value="programs">Programs & courses</option>
                          <option value="admissions">Admissions</option>
                          <option value="fees">Fees & payments</option>
                          <option value="support">Student support</option>
                          <option value="other">Something else</option>
                        </select>
                      </label>
                    </div>

                    <label className="contact-field contact-message-field">
                      <span>Your message <b>*</b></span>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        rows={5}
                        required
                      />
                    </label>

                    {error && <p className="contact-form-error" role="alert">{error}</p>}

                    <button type="submit" className="contact-button contact-button-primary contact-submit-button" disabled={sending}>
                      {sending ? 'Please wait...' : 'Send enquiry'}
                      {!sending && <Send size={16} />}
                    </button>
                    <p className="contact-form-disclaimer">
                      Demo form only — submissions are not emailed or saved yet.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="contact-bottom-cta" data-reveal>
          <div className="contact-container contact-bottom-cta-inner">
            <div>
              <span className="contact-eyebrow">READY TO BEGIN?</span>
              <h2>Your next chapter can start <span>right here.</span></h2>
              <p>Explore the programs and find a path that fits your goals.</p>
            </div>
            <Link to="/programs" className="contact-button contact-button-primary">
              Explore programs <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
