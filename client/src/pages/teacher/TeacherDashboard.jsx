
import { useEffect, useState } from 'react'
import {
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import useTheme from '../../hooks/useTheme'

import '../../styles/TeacherDashboard.css'

// ======================================
// TEACHER NAVIGATION
// ======================================

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂', path: '/teacher' },
  { id: 'classes', label: 'My Classes', icon: '▤', path: '/teacher/classes' },
  { id: 'timetable', label: 'Timetable', icon: '▦', path: '/teacher/timetable' },
  { id: 'attendance', label: 'Attendance', icon: '◷', path: '/teacher/attendance' },
  { id: 'students', label: 'My Students', icon: '♙', path: '/teacher/students' },
  { id: 'assignments', label: 'Assignments', icon: '▧', path: '/teacher/assignments' },
  { id: 'exams', label: 'Exams & Results', icon: '▣', path: '/teacher/exams' },
  { id: 'notices', label: 'Notices', icon: '♧', path: '/teacher/notices' },
]

// ======================================
// EMPTY OVERVIEW DATA
// Actual values will come from backend APIs.
// ======================================

const overviewStats = [
  {
    id: 'classes',
    label: 'MY CLASSES',
    value: '—',
    detail: 'Your assigned batches',
    icon: '▤',
  },
  {
    id: 'students',
    label: 'TOTAL STUDENTS',
    value: '—',
    detail: 'Students across your batches',
    icon: '♙',
  },
  {
    id: 'attendance',
    label: 'ATTENDANCE',
    value: '—',
    detail: 'Your attendance overview',
    icon: '◷',
  },
  {
    id: 'assignments',
    label: 'PENDING WORK',
    value: '—',
    detail: 'Assignments to review',
    icon: '▧',
  },
]

// No dummy records
const todayClasses = []
const batchList = []
const activities = []

// ======================================
// QUICK ACTIONS
// ======================================

const quickActions = [
  {
    icon: '◷',
    title: 'Mark attendance',
    description: 'Record class attendance',
    path: '/teacher/attendance',
    color: 'green',
  },
  {
    icon: '▧',
    title: 'Assignments',
    description: 'Manage student assignments',
    path: '/teacher/assignments',
    color: 'blue',
  },
  {
    icon: '▣',
    title: 'Manage exams',
    description: 'Exams and assessments',
    path: '/teacher/exams',
    color: 'purple',
  },
  {
    icon: '♙',
    title: 'View students',
    description: 'Explore your student list',
    path: '/teacher/students',
    color: 'orange',
  },
]

// ======================================
// COMPONENT
// ======================================

export default function TeacherDashboard() {
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

  const isDashboard = location.pathname === '/teacher'

  useEffect(() => {
    document.title = `${activeItem.label} | NexLearn Teacher`
  }, [activeItem.label])

  // ======================================
  // LOGOUT
  // ======================================

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

  // ======================================
  // AUTHENTICATION
  // ======================================

  if (isLoading) {
    return (
      <main
        className={`teacher-loading ${
          theme === 'dark' ? 'theme-dark' : 'theme-light'
        }`}
      >
        <div className="teacher-loading-spinner" />
        <p>Preparing your academic workspace...</p>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'teacher') {
    return <Navigate to="/" replace />
  }

  const initials = (user.name || 'Teacher')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  const firstName = (user.name || 'Teacher').split(' ')[0]

  return (
    <div
      className={`teacher-shell ${
        theme === 'dark' ? 'theme-dark' : 'theme-light'
      }`}
    >
      {/* MOBILE BACKDROP */}

      {sidebarOpen && (
        <button
          className="teacher-sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`teacher-sidebar ${
          sidebarOpen ? 'sidebar-open' : ''
        }`}
      >
        <NavLink
          to="/teacher"
          className="teacher-brand"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="teacher-brand-mark">N</span>

          <span className="teacher-brand-text">
            <strong>NexLearn</strong>
            <small>FACULTY WORKSPACE</small>
          </span>
        </NavLink>

        <div className="teacher-sidebar-heading">
          TEACHING SPACE
        </div>

        <nav
          className="teacher-navigation"
          aria-label="Teacher navigation"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.id === 'dashboard'}
              className={({ isActive }) =>
                `teacher-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="teacher-nav-icon" aria-hidden="true">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="teacher-sidebar-bottom">
          <div className="teacher-sidebar-profile">
            <div className="teacher-avatar">
              {initials || 'T'}
            </div>

            <div className="teacher-profile-info">
              <strong>{user.name}</strong>
              <span>Faculty Member</span>
            </div>
          </div>

          {logoutError && (
            <p className="teacher-error" role="alert">
              {logoutError}
            </p>
          )}

          <button
            type="button"
            className="teacher-logout-button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span>↪</span>
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </aside>

      {/* ======================================
          MAIN WORKSPACE
      ====================================== */}

      <main className="teacher-main">

        {/* TOPBAR */}

        <header className="teacher-topbar">
          <div className="teacher-topbar-left">
            <button
              type="button"
              className="teacher-menu-toggle"
              aria-label="Toggle navigation"
              onClick={() => setSidebarOpen((open) => !open)}
            >
              ☰
            </button>

            <div className="teacher-breadcrumb">
              <span>Academic Workspace</span>
              <span>/</span>
              <strong>{activeItem.label}</strong>
            </div>
          </div>

          <div className="teacher-topbar-right">
            <div className="teacher-role-chip">
              <span />
              Faculty Portal
            </div>

            <button
              type="button"
              className="teacher-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            <div className="teacher-topbar-user">
              <div className="teacher-avatar">
                {initials || 'T'}
              </div>

              <div>
                <strong>{user.name}</strong>
                <span>Teacher</span>
              </div>
            </div>
          </div>
        </header>

        <div className="teacher-content">

          {isDashboard ? (
            <>

              {/* WELCOME SECTION */}

              <section className="teacher-welcome">
                <div>
                  <span className="teacher-eyebrow">
                    NEXLEARN · ACADEMIC WORKSPACE
                  </span>

                  <h1>Good day, {firstName}.</h1>

                  <p>
                    Your teaching workspace is ready.
                    Let's make today productive.
                  </p>
                </div>

                <div className="teacher-date-card">
                  <span className="teacher-date-icon">◷</span>

                  <div>
                    <small>TODAY</small>

                    <strong>
                      {new Date().toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </strong>
                  </div>
                </div>
              </section>

              {/* ACADEMIC HERO */}

              <section className="teacher-hero">
                <div className="teacher-hero-content">
                  <span className="teacher-hero-tag">
                    YOUR CLASSROOM. YOUR IMPACT.
                  </span>

                  <h2>
                    Inspire learning.
                    <br />
                    Shape the future.
                  </h2>

                  <p>
                    Manage your classes, guide your students
                    and stay on top of your academic activities.
                  </p>

                  <NavLink
                    to="/teacher/timetable"
                    className="teacher-hero-button"
                  >
                    View today's schedule <span>→</span>
                  </NavLink>
                </div>

                <div className="teacher-hero-visual" aria-hidden="true">
                  <div className="teacher-visual-circle circle-one" />
                  <div className="teacher-visual-circle circle-two" />

                  <div className="teacher-visual-card">
                    <span>✦</span>
                    <strong>TEACH</strong>
                    <small>INSPIRE · EMPOWER</small>
                  </div>

                  <div className="teacher-visual-dot dot-one" />
                  <div className="teacher-visual-dot dot-two" />
                </div>
              </section>

              {/* ACADEMIC OVERVIEW */}

              <section className="teacher-overview-section">
                <div className="teacher-section-heading">
                  <div>
                    <span className="teacher-eyebrow">
                      AT A GLANCE
                    </span>

                    <h2>Academic overview</h2>
                  </div>
                </div>

                <div className="teacher-stats-grid">
                  {overviewStats.map((stat) => (
                    <article
                      className="teacher-stat-card"
                      key={stat.id}
                    >
                      <div className="teacher-stat-top">
                        <span className={`teacher-stat-icon ${stat.id}`}>
                          {stat.icon}
                        </span>

                        <span className="teacher-stat-label">
                          {stat.label}
                        </span>
                      </div>

                      <h3>{stat.value}</h3>
                      <p>{stat.detail}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* TODAY'S CLASSES + RECENT ACTIVITY */}

              <section className="teacher-primary-grid">

                {/* TODAY'S CLASSES */}

                <article className="teacher-panel teacher-schedule-panel">
                  <div className="teacher-panel-heading">
                    <div>
                      <span className="teacher-eyebrow">
                        CLASSROOM SCHEDULE
                      </span>

                      <h2>Today's classes</h2>
                    </div>

                    <NavLink
                      to="/teacher/timetable"
                      className="teacher-text-link"
                    >
                      Full timetable →
                    </NavLink>
                  </div>

                  <div className="teacher-class-list">
                    {todayClasses.length > 0 ? (
                      todayClasses.map((classItem) => (
                        <div
                          className="teacher-class-item"
                          key={classItem.id}
                        >
                          <div className="teacher-class-time">
                            <strong>{classItem.time}</strong>
                            <span>{classItem.endTime}</span>
                          </div>

                          <div
                            className={`teacher-class-marker ${classItem.color}`}
                          />

                          <div className="teacher-class-details">
                            <strong>{classItem.subject}</strong>
                            <span>{classItem.batch}</span>
                            <small>{classItem.room}</small>
                          </div>

                          <span
                            className={`teacher-class-status ${classItem.status
                              .toLowerCase()
                              .replace(' ', '-')}`}
                          >
                            {classItem.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="teacher-empty-state">
                        <span>▦</span>
                        <strong>No classes scheduled</strong>
                        <p>
                          Your upcoming classes will appear here.
                        </p>
                      </div>
                    )}
                  </div>
                </article>

                {/* RECENT ACTIVITY */}

                <article className="teacher-panel teacher-activity-panel">
                  <div className="teacher-panel-heading">
                    <div>
                      <span className="teacher-eyebrow">
                        WORKSPACE UPDATES
                      </span>

                      <h2>Recent activity</h2>
                    </div>

                    <span className="teacher-heading-symbol">✳</span>
                  </div>

                  <div className="teacher-activity-list">
                    {activities.length > 0 ? (
                      activities.map((activity) => (
                        <div
                          className="teacher-activity-item"
                          key={activity.id}
                        >
                          <div className="teacher-activity-icon">
                            {activity.icon}
                          </div>

                          <div className="teacher-activity-details">
                            <strong>{activity.title}</strong>
                            <span>{activity.description}</span>
                            <small>{activity.time}</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="teacher-empty-state">
                        <span>✳</span>
                        <strong>No recent activity</strong>
                        <p>
                          Your academic updates will appear here.
                        </p>
                      </div>
                    )}
                  </div>

                  <NavLink
                    to="/teacher/assignments"
                    className="teacher-activity-link"
                  >
                    Manage academic work →
                  </NavLink>
                </article>
              </section>

              {/* MY CLASSES & BATCHES */}

              <section className="teacher-panel teacher-batches-panel">
                <div className="teacher-panel-heading">
                  <div>
                    <span className="teacher-eyebrow">
                      YOUR TEACHING GROUPS
                    </span>

                    <h2>My classes & batches</h2>
                  </div>

                  <NavLink
                    to="/teacher/classes"
                    className="teacher-text-link"
                  >
                    View all batches →
                  </NavLink>
                </div>

                <div className="teacher-batch-grid">
                  {batchList.length > 0 ? (
                    batchList.map((batch) => (
                      <article
                        className={`teacher-batch-card ${batch.color}`}
                        key={batch.id}
                      >
                        <div className="teacher-batch-card-top">
                          <span className="teacher-batch-icon">▤</span>
                          <span className="teacher-batch-tag">
                            ASSIGNED
                          </span>
                        </div>

                        <h3>{batch.name}</h3>
                        <p>{batch.subject}</p>

                        <div className="teacher-batch-meta">
                          <span>♙ {batch.students} students</span>
                          <strong>{batch.progress}%</strong>
                        </div>

                        <div className="teacher-progress-track">
                          <span
                            style={{ width: `${batch.progress}%` }}
                          />
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="teacher-empty-state teacher-batch-empty">
                      <span>▤</span>
                      <strong>No batches assigned yet</strong>
                      <p>
                        Your assigned classes and batches will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* QUICK ACTIONS */}

              <section className="teacher-panel teacher-quick-panel">
                <div className="teacher-panel-heading">
                  <div>
                    <span className="teacher-eyebrow">
                      GET THINGS DONE
                    </span>

                    <h2>Quick actions</h2>
                  </div>
                </div>

                <div className="teacher-quick-grid">
                  {quickActions.map((action) => (
                    <NavLink
                      to={action.path}
                      className="teacher-quick-action"
                      key={action.path}
                    >
                      <span
                        className={`teacher-quick-action-icon ${action.color}`}
                      >
                        {action.icon}
                      </span>

                      <span className="teacher-quick-action-info">
                        <strong>{action.title}</strong>
                        <small>{action.description}</small>
                      </span>

                      <span className="teacher-quick-arrow">↗</span>
                    </NavLink>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="teacher-panel teacher-placeholder">
              <span className="teacher-eyebrow">
                ACADEMIC WORKSPACE
              </span>

              <h2>{activeItem.label}</h2>

              <p>
                This module is not connected yet. Its functionality
                will be developed in the next steps.
              </p>

              <button
                type="button"
                className="teacher-primary-button"
                onClick={() => navigate('/teacher')}
              >
                Back to dashboard
              </button>
            </section>
          )}

          <footer className="teacher-footer">
            <span>© {new Date().getFullYear()} NexLearn</span>
            <span>Teach. Inspire. Empower.</span>
          </footer>
        </div>
      </main>
    </div>
  )
}
