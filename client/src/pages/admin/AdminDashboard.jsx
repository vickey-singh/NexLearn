import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useTheme from '../../hooks/useTheme'
import '../../styles/AdminDashboard.css'


const navigationItems = [
  { id: 'overview', label: 'Overview', icon: '◫' },
  { id: 'students', label: 'Students', icon: '♙' },
  { id: 'teachers', label: 'Teachers', icon: '♧' },
  { id: 'courses', label: 'Courses', icon: '▤' },
  { id: 'attendance', label: 'Attendance', icon: '◷' },
  { id: 'fees', label: 'Fee Management', icon: '₹' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

export default function AdminDashboard() {
  const { user, isLoading, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [activeItem, setActiveItem] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  useEffect(() => {
    document.title = 'Admin Dashboard | NexLearn'
  }, [])

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
      <main className={`admin-loading ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <div className="admin-loading-spinner" />
        <p>Verifying your session...</p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  return (
    <div className={`admin-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      {sidebarOpen && (
        <button
          className="admin-sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <a href="/admin" className="admin-brand">
          <span className="admin-brand-mark">N</span>
          <span>
            <strong>NexLearn</strong>
            <small>ADMINISTRATION</small>
          </span>
        </a>

        <div className="admin-sidebar-label">WORKSPACE</div>

        <nav className="admin-navigation" aria-label="Admin navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(item.id)
                setSidebarOpen(false)
              }}
            >
              <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'overview' && <span className="admin-nav-indicator" />}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <div className="admin-avatar">{initials || 'A'}</div>
            <div className="admin-sidebar-user-info">
              <strong>{user.name}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            className="admin-logout-button"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span aria-hidden="true">↪</span>
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>

          {logoutError && (
            <p className="admin-error" role="alert">{logoutError}</p>
          )}
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>

          <div className="admin-breadcrumb">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>{navigationItems.find((item) => item.id === activeItem)?.label}</strong>
          </div>

          <div className="admin-topbar-actions">
            <button
              className="admin-theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            <div className="admin-topbar-profile">
              <div className="admin-avatar">{initials || 'A'}</div>
              <div>
                <strong>{user.name}</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <section className="admin-welcome">
            <div>
              <span className="admin-eyebrow">NEXLEARN CONTROL CENTER</span>
              <h1>
                Welcome back, {user.name.split(' ')[0]}.
              </h1>
              <p>Manage your institute and keep everything moving forward.</p>
            </div>

            <div className="admin-date-chip">
              <span aria-hidden="true">◷</span>
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </section>

          {activeItem === 'overview' ? (
            <>
              <section className="admin-overview-banner">
                <div>
                  <span className="admin-banner-label">YOUR INSTITUTE AT A GLANCE</span>
                  <h2>A smarter way to manage learning.</h2>
                  <p>
                    Your administration workspace is ready. Start by setting up
                    your institute's courses, team, and student records.
                  </p>
                </div>

                <div className="admin-banner-art" aria-hidden="true">
                  <span className="admin-art-ring admin-art-ring-one" />
                  <span className="admin-art-ring admin-art-ring-two" />
                  <span className="admin-art-mark">N</span>
                </div>
              </section>

              <section className="admin-stats-grid" aria-label="Dashboard statistics">
                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-icon">♙</span>
                    <span className="admin-stat-label">STUDENTS</span>
                  </div>
                  <h3>—</h3>
                  <p>Connect student data to see totals</p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-icon">♧</span>
                    <span className="admin-stat-label">TEACHERS</span>
                  </div>
                  <h3>—</h3>
                  <p>Connect teacher data to see totals</p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-icon">▤</span>
                    <span className="admin-stat-label">COURSES</span>
                  </div>
                  <h3>—</h3>
                  <p>Connect course data to see totals</p>
                </article>

                <article className="admin-stat-card">
                  <div className="admin-stat-top">
                    <span className="admin-stat-icon">₹</span>
                    <span className="admin-stat-label">FEE COLLECTION</span>
                  </div>
                  <h3>—</h3>
                  <p>Connect fee data to see totals</p>
                </article>
              </section>

              <section className="admin-bottom-grid">
                <article className="admin-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <span className="admin-eyebrow">GETTING STARTED</span>
                      <h2>Set up your workspace</h2>
                    </div>
                    <span className="admin-panel-heading-icon">✳</span>
                  </div>

                  <div className="admin-setup-list">
                    <div className="admin-setup-item">
                      <span className="admin-setup-number">01</span>
                      <div>
                        <strong>Configure your institute</strong>
                        <p>Set your institute details and preferences.</p>
                      </div>
                      <span className="admin-setup-status">Next</span>
                    </div>

                    <div className="admin-setup-item">
                      <span className="admin-setup-number">02</span>
                      <div>
                        <strong>Set up courses</strong>
                        <p>Organize programs, batches, and subjects.</p>
                      </div>
                      <span className="admin-setup-status">Pending</span>
                    </div>

                    <div className="admin-setup-item">
                      <span className="admin-setup-number">03</span>
                      <div>
                        <strong>Manage your team</strong>
                        <p>Prepare the workspace for teachers and students.</p>
                      </div>
                      <span className="admin-setup-status">Pending</span>
                    </div>
                  </div>
                </article>

                <article className="admin-panel admin-account-panel">
                  <span className="admin-eyebrow">ACCOUNT OVERVIEW</span>
                  <h2>Your administrator profile</h2>

                  <div className="admin-profile-large">
                    <div className="admin-avatar admin-avatar-large">{initials || 'A'}</div>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="admin-account-detail">
                    <span>Account role</span>
                    <strong>Administrator</strong>
                  </div>

                  <div className="admin-account-detail">
                    <span>Account status</span>
                    <strong className="admin-status-active">
                      <i /> Active
                    </strong>
                  </div>

                  <div className="admin-account-detail">
                    <span>Authentication</span>
                    <strong>Session verified</strong>
                  </div>
                </article>
              </section>
            </>
          ) : (
            <section className="admin-panel admin-module-placeholder">
              <span className="admin-eyebrow">WORKSPACE MODULE</span>
              <h2>{navigationItems.find((item) => item.id === activeItem)?.label}</h2>
              <p>
                This module has not been connected yet. Its functionality will
                be added after the dashboard foundation is complete.
              </p>
              <button
                className="admin-primary-button"
                type="button"
                onClick={() => setActiveItem('overview')}
              >
                Back to overview
              </button>
            </section>
          )}

          <footer className="admin-footer">
            <span>© {new Date().getFullYear()} NexLearn</span>
            <span>Learn. Grow. Achieve.</span>
          </footer>
        </div>
      </main>
    </div>
  )
}
