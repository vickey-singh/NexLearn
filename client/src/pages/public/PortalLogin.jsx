
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../services/api'
import '../../styles/PortalLogin.css'

// ======================================
// PORTAL OPTIONS
// ======================================

const portals = [
  {
    id: 'admin',
    name: 'Admin',
    sub: 'Manage institute',
    icon: '◈',
    description: 'Manage your institute, teams, and operations.',
  },
  {
    id: 'teacher',
    name: 'Teacher',
    sub: 'Manage classes',
    icon: '▤',
    description: 'Manage classes, attendance, and student progress.',
  },
  {
    id: 'student',
    name: 'Student',
    sub: 'Access learning',
    icon: '⌂',
    description: 'Access your courses, results, and learning journey.',
  },
]

// ======================================
// PORTAL LOGIN
// ======================================

export default function PortalLogin() {
  const { theme, toggleTheme } = useTheme()
  const { refreshUser } = useAuth()
  const navigate = useNavigate()

  const [portal, setPortal] = useState('admin')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const selected = portals.find((item) => item.id === portal)
  const isDark = theme === 'dark'

  // ======================================
  // HANDLE LOGIN
  // ======================================

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (isLoading) return

    setIsLoading(true)

    try {
      // Authenticate credentials with the backend.
      const data = await loginUser({
        email: identifier.trim(),
        password,
        role: portal,
      })

      if (!data.success || !data.user) {
        setMessage(
          'Login failed. Please check your credentials.'
        )
        return
      }

      // Verify that the selected portal matches the account.
      if (data.user.role !== portal) {
        setMessage(
          'Your account does not have access to this portal.'
        )
        return
      }

      // Refresh the shared authentication state.
      // The backend session cookie is sent automatically.
      const authenticatedUser = await refreshUser()

      if (!authenticatedUser) {
        setMessage(
          'Login could not be verified. Please try again.'
        )
        return
      }

      // Verify the authenticated role before navigation.
      if (authenticatedUser.role !== portal) {
        setMessage(
          'Your account does not have access to this portal.'
        )
        return
      }

      setPassword('')

      // Redirect to the correct portal.
      if (authenticatedUser.role === 'admin') {
        navigate('/admin', { replace: true })
      } else if (authenticatedUser.role === 'teacher') {
        navigate('/teacher', { replace: true })
      } else if (authenticatedUser.role === 'student') {
        navigate('/student', { replace: true })
      }
    } catch (error) {
      if (error.status === 401) {
        setMessage(
          'Invalid email or password, or this account is inactive.'
        )
      } else if (error.status === 429) {
        setMessage(
          'Too many login attempts. Please try again later.'
        )
      } else {
        setMessage(
          error.message || 'Unable to sign in. Please try again.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  // ======================================
  // UI
  // ======================================

  return (
    <main
      className={`portal-login ${
        isDark ? 'theme-dark' : 'theme-light'
      }`}
    >
      <div
        className="login-orb login-orb-one"
        aria-hidden="true"
      />

      <div
        className="login-orb login-orb-two"
        aria-hidden="true"
      />

      {/* TOP NAVIGATION */}

      <header className="login-topbar">
        <Link
          to="/"
          className="login-brand"
          aria-label="NexLearn home"
        >
          <span className="login-brand-mark">N</span>

          <span className="login-brand-copy">
            <strong>NexLearn</strong>
            <small>LEARN. GROW. ACHIEVE.</small>
          </span>
        </Link>

        <div className="login-topbar-actions">
          <Link
            to="/"
            className="login-back-home"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Homepage</span>
          </Link>

          <button
            className="login-theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              isDark ? 'light' : 'dark'
            } mode`}
          >
            <span aria-hidden="true">
              {isDark ? '☀' : '☾'}
            </span>

            <span>
              {isDark ? 'Dark mode' : 'Light mode'}
            </span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}

      <div className="login-layout">

        {/* LEFT INTRO SECTION */}

        <section className="login-intro">
          <div className="login-eyebrow">
            <span />
            INSTITUTE PORTAL
          </div>

          <h1>
            One Portal.
            <br />
            <span>Many Possibilities.</span>
          </h1>

          <p className="login-intro-copy">
            Your institute, connected. Access the tools you need
            to teach, learn, and manage — all in one secure place.
          </p>

          {/* BENEFITS */}

          <div className="login-benefits">
            <article className="login-benefit">
              <span
                className="login-benefit-icon"
                aria-hidden="true"
              >
                ◎
              </span>

              <div>
                <h3>Role-based access</h3>
                <p>
                  A focused experience for every member of your
                  institute.
                </p>
              </div>
            </article>

            <article className="login-benefit">
              <span
                className="login-benefit-icon"
                aria-hidden="true"
              >
                ⌑
              </span>

              <div>
                <h3>Secure &amp; reliable</h3>
                <p>
                  Your learning and institute information, in one
                  place.
                </p>
              </div>
            </article>

            <article className="login-benefit">
              <span
                className="login-benefit-icon"
                aria-hidden="true"
              >
                ▥
              </span>

              <div>
                <h3>Simple &amp; focused</h3>
                <p>
                  Less searching. More progress every day.
                </p>
              </div>
            </article>
          </div>

          {/* PORTAL ILLUSTRATION */}

          <div
            className="login-visual"
            aria-label="NexLearn portal illustration"
          >
            <div className="visual-ring visual-ring-one" />
            <div className="visual-ring visual-ring-two" />

            <div className="visual-window">
              <div className="visual-window-top">
                <span />
                <span />
                <span />
                <small>NEXLEARN / YOUR SPACE</small>
              </div>

              <div className="visual-window-content">
                <div className="visual-logo">N</div>

                <strong>Make room for growth.</strong>

                <span>Learn • Teach • Lead</span>

                <div className="visual-progress">
                  <i />
                </div>
              </div>
            </div>

            <div className="floating-role floating-role-student">
              <span className="floating-role-icon">⌂</span>

              <span>
                <strong>Students</strong>
                <small>Learn at your pace</small>
              </span>

              <b>↗</b>
            </div>

            <div className="floating-role floating-role-teacher">
              <span className="floating-role-icon">▤</span>

              <span>
                <strong>Teachers</strong>
                <small>Inspire progress</small>
              </span>

              <b>↗</b>
            </div>

            <div className="floating-role floating-role-admin">
              <span className="floating-role-icon">◈</span>

              <span>
                <strong>Admins</strong>
                <small>Keep it connected</small>
              </span>

              <b>↗</b>
            </div>

            <div
              className="visual-plant"
              aria-hidden="true"
            >
              ✳
            </div>
          </div>

          {/* QUOTE */}

          <blockquote className="login-quote">
            <span>“</span>
            <p>
              Learning today, for a brighter tomorrow.
            </p>
            <cite>— The NexLearn promise</cite>
          </blockquote>
        </section>

        {/* RIGHT LOGIN SECTION */}

        <section
          className="login-panel-wrap"
          aria-label="Portal sign in"
        >
          <div className="login-card">

            {/* LOGIN HEADING */}

            <div className="login-card-heading">
              <div className="login-eyebrow">
                <span />
                WELCOME BACK
              </div>

              <h2>Login to NexLearn</h2>

              <p>
                Select your portal and enter your credentials
                to continue.
              </p>
            </div>

            {/* PORTAL SELECTOR */}

            <div
              className="portal-options"
              role="group"
              aria-label="Choose your portal"
            >
              {portals.map((item) => (
                <button
                  className={`portal-option ${
                    portal === item.id ? 'selected' : ''
                  }`}
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setPortal(item.id)
                    setMessage('')
                  }}
                  aria-pressed={portal === item.id}
                  disabled={isLoading}
                >
                  <span
                    className="portal-option-icon"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>

                  <strong>{item.name}</strong>
                  <small>{item.sub}</small>
                </button>
              ))}
            </div>

            {/* SELECTED PORTAL DESCRIPTION */}

            <div
              className="selected-portal-note"
              key={portal}
            >
              <span className="selected-dot" />
              {selected.description}
            </div>

            {/* LOGIN FORM */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >
              <label htmlFor="login-identifier">
                Email address
              </label>

              <div className="login-input-wrap">
                <span aria-hidden="true">✉</span>

                <input
                  id="login-identifier"
                  type="email"
                  autoComplete="username"
                  placeholder="Enter your email address"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value)
                    setMessage('')
                  }}
                  required
                  maxLength={254}
                  disabled={isLoading}
                />
              </div>

              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-input-wrap">
                <span aria-hidden="true">⌑</span>

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setMessage('')
                  }}
                  required
                  maxLength={128}
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  disabled={isLoading}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* REMEMBER ME AND FORGOT PASSWORD */}

              <div className="login-form-meta">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    disabled={isLoading}
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="forgot-link"
                >
                  Forgot password?
                </Link>
              </div>

              {/* SUBMIT BUTTON */}

              <button
                className="login-submit"
                type="submit"
                disabled={isLoading}
              >
                <span>
                  {isLoading
                    ? 'Signing in...'
                    : `Sign In as ${selected.name}`}
                </span>

                <span
                  className="submit-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>

              {/* ERROR / STATUS MESSAGE */}

              {message && (
                <p
                  className="login-feedback"
                  role="alert"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </form>

            {/* SECURITY FOOTER */}

            <div className="login-divider">
              <span>YOUR LEARNING, CONNECTED</span>
            </div>

            <div className="login-secure-note">
              <span aria-hidden="true">⬡</span>

              <p>
                Secure access for the NexLearn community
              </p>
            </div>
          </div>

          {/* PAGE FOOTER */}

          <p className="login-footer-note">
            © {new Date().getFullYear()} NexLearn. Learn. Grow.
            Achieve.
          </p>
        </section>
      </div>
    </main>
  )
}
