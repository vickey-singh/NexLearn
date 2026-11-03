import { useEffect, useState } from 'react'
import {
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import useTheme from '../../hooks/useTheme'

import '../../styles/StudentDashboard.css'

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '◫', path: '/student' },
  { id: 'profile', label: 'My Profile', icon: '♙', path: '/student/profile' },
  { id: 'courses', label: 'My Courses', icon: '▤', path: '/student/courses' },
  { id: 'attendance', label: 'Attendance', icon: '◷', path: '/student/attendance' },
  { id: 'fees', label: 'Fees & Payments', icon: '₹', path: '/student/fees' },
  { id: 'results', label: 'Results', icon: '▧', path: '/student/results' },
  { id: 'notices', label: 'Notices', icon: '♧', path: '/student/notices' },
]

const dashboardStats = [
  {
    id: 'courses',
    label: 'MY COURSES',
    value: '—',
    description: 'Your enrolled courses',
    icon: '▤',
  },
  {
    id: 'attendance',
    label: 'ATTENDANCE',
    value: '—',
    description: 'Your attendance percentage',
    icon: '◷',
  },
  {
    id: 'fees',
    label: 'FEE STATUS',
    value: '—',
    description: 'Your pending fee details',
    icon: '₹',
  },
  {
    id: 'results',
    label: 'MY RESULTS',
    value: '—',
    description: 'Your academic performance',
    icon: '▧',
  },
]

export default function StudentDashboard() {
  const { user, isLoading, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const navigate = useNavigate()
  const location = useLocation()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  const activeItem =
    navigationItems.find((item) => item.path === location.pathname) ||
    navigationItems[0]

  useEffect(() => {
    document.title = `${activeItem.label} | NexLearn Student`
  }, [activeItem.label])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setLogoutError('')

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      setLogoutError('Logout failed. Please try again.')
      setIsLoggingOut(false)
    }
  }

  if (isLoading) {
    return (
      <main
        className={`student-loading ${
          theme === 'dark' ? 'theme-dark' : 'theme-light'
        }`}
      >
        <div className="student-loading-spinner" />
        <p>Verifying your session...</p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'student') {
    return <Navigate to="/" replace />
  }

  const initials = (user.name || 'Student')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  const isDashboard = location.pathname === '/student'

  return (
    <div
      className={`student-shell ${
        theme === 'dark' ? 'theme-dark' : 'theme-light'
      }`}
    >
      {sidebarOpen && (
        <button
          className="student-sidebar-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`student-sidebar ${
          sidebarOpen ? 'sidebar-open' : ''
        }`}
      >
        <NavLink to="/student" className="student-brand">
          <span className="student-brand-mark">N</span>
        
          <span>
            <strong>NexLearn</strong>
            <small>STUDENT PORTAL</small>
          </span>
        </NavLink>

        <div className="student-sidebar-label">
          MY WORKSPACE
        </div>

        <nav
          className="student-navigation"
          aria-label="Student navigation"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.id === 'dashboard'}
              className={({ isActive }) =>
                `student-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="student-nav-icon" aria-hidden="true">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="student-sidebar-bottom">
          <div className="student-sidebar-user">
            <div className="student-avatar">
              {initials || 'S'}
            </div>

            <div className="student-sidebar-user-info">
              <strong>{user.name}</strong>
              <span>Student</span>
            </div>
          </div>

          <button
            className="student-logout-button"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span aria-hidden="true">↪</span>
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>

          {logoutError && (
            <p className="student-error" role="alert">
              {logoutError}
            </p>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="student-main">
        <header className="student-topbar">
          <button
            className="student-menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>

          <div className="student-breadcrumb">
            <span>My Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>{activeItem.label}</strong>
          </div>

          <div className="student-topbar-actions">
            <button
              className="student-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            <div className="student-topbar-profile">
              <div className="student-avatar">
                {initials || 'S'}
              </div>

              <div>
                <strong>{user.name}</strong>
                <span>Student</span>
              </div>
            </div>
          </div>
        </header>

        <div className="student-content">
          {isDashboard ? (
            <>
              {/* WELCOME */}

              <section className="student-welcome">
                <div>
                  <span className="student-eyebrow">
                    NEXLEARN STUDENT SPACE
                  </span>

                  <h1>
                    Welcome back, {(user.name || 'Student').split(' ')[0]}.
                  </h1>

                  <p>
                    Keep track of your learning journey and stay
                    connected with your institute.
                  </p>
                </div>

                <div className="student-date-chip">
                  <span>◷</span>

                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </section>

              {/* HERO */}

              <section className="student-hero">
                <div className="student-hero-content">
                  <span className="student-hero-label">
                    YOUR LEARNING JOURNEY
                  </span>

                  <h2>
                    Every step forward
                    <br />
                    brings you closer to success.
                  </h2>

                  <p>
                    Your personal learning workspace is ready.
                    Explore your courses, monitor your progress
                    and stay updated.
                  </p>

                  <NavLink
                    to="/student/courses"
                    className="student-hero-link"
                  >
                    Explore my courses <span>→</span>
                  </NavLink>
                </div>

                <div className="student-hero-art" aria-hidden="true">
                  <span className="student-art-ring ring-one" />
                  <span className="student-art-ring ring-two" />
                  <span className="student-art-mark">N</span>
                </div>
              </section>

              {/* STATISTICS */}

              <section
                className="student-stats-grid"
                aria-label="Student overview"
              >
                {dashboardStats.map((stat) => (
                  <article
                    className="student-stat-card"
                    key={stat.id}
                  >
                    <div className="student-stat-top">
                      <span className="student-stat-icon">
                        {stat.icon}
                      </span>

                      <span className="student-stat-label">
                        {stat.label}
                      </span>
                    </div>

                    <h3>{stat.value}</h3>

                    <p>{stat.description}</p>
                  </article>
                ))}
              </section>

              {/* BOTTOM PANELS */}

              <section className="student-bottom-grid">
                <article className="student-panel">
                  <div className="student-panel-heading">
                    <div>
                      <span className="student-eyebrow">
                        QUICK ACCESS
                      </span>

                      <h2>Explore your workspace</h2>
                    </div>

                    <span className="student-panel-heading-icon">
                      ✳
                    </span>
                  </div>

                  <div className="student-quick-list">
                    {[
                      {
                        icon: '◷',
                        title: 'Check attendance',
                        description: 'View your attendance record',
                        path: '/student/attendance',
                      },
                      {
                        icon: '₹',
                        title: 'Fee details',
                        description: 'Review your fee information',
                        path: '/student/fees',
                      },
                      {
                        icon: '▧',
                        title: 'View results',
                        description: 'Check your examination results',
                        path: '/student/results',
                      },
                    ].map((item) => (
                      <NavLink
                        to={item.path}
                        className="student-quick-item"
                        key={item.path}
                      >
                        <span className="student-quick-icon">
                          {item.icon}
                        </span>

                        <span className="student-quick-info">
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>

                        <span className="student-quick-arrow">
                          →
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </article>

                <article className="student-panel student-account-panel">
                  <span className="student-eyebrow">
                    ACCOUNT OVERVIEW
                  </span>

                  <h2>Your student profile</h2>

                  <div className="student-profile-large">
                    <div className="student-avatar student-avatar-large">
                      {initials || 'S'}
                    </div>

                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="student-account-detail">
                    <span>Account role</span>
                    <strong>Student</strong>
                  </div>

                  <div className="student-account-detail">
                    <span>Account status</span>

                    <strong className="student-status-active">
                      <i /> Active
                    </strong>
                  </div>

                  <div className="student-account-detail">
                    <span>Authentication</span>
                    <strong>Session verified</strong>
                  </div>
                </article>
              </section>
            </>
          ) : (
            <section className="student-panel student-module-placeholder">
              <span className="student-eyebrow">
                STUDENT WORKSPACE
              </span>

              <h2>{activeItem.label}</h2>

              <p>
                This module is not connected yet. Its functionality
                will be added in the next development steps.
              </p>

              <button
                className="student-primary-button"
                type="button"
                onClick={() => navigate('/student')}
              >
                Back to dashboard
              </button>
            </section>
          )}

          <footer className="student-footer">
            <span>© {new Date().getFullYear()} NexLearn</span>
            <span>Learn. Grow. Achieve.</span>
          </footer>
        </div>
      </main>
    </div>
  )
}