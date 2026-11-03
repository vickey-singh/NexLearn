
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  ArrowUpRight,
  GraduationCap,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react'

import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom'

import useTheme from '../hooks/useTheme'
import './Navbar.css'

const MOBILE_BREAKPOINT = 800

const NAV_LINKS = [
  {
    label: 'Home',
    to: '/',
    end: true,
  },
  {
    label: 'About us',
    to: '/about',
  },
  {
    label: 'Programs',
    to: '/programs',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_BREAKPOINT
  )

  const navbarRef = useRef(null)
  const menuButtonRef = useRef(null)

  const isDark = theme === 'dark'

  // Close the mobile menu.
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // Toggle the mobile menu.
  const toggleMenu = useCallback((event) => {
    event.stopPropagation()

    setMenuOpen((previous) => !previous)
  }, [])

  // Close menu whenever the route changes.
  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  // Track mobile and desktop layouts.
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT

      setIsMobile(mobile)

      if (!mobile) {
        closeMenu()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [closeMenu])

  // Close menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    const handleOutsidePointer = (event) => {
      if (!navbarRef.current?.contains(event.target)) {
        closeMenu()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener(
      'pointerdown',
      handleOutsidePointer
    )

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsidePointer
      )

      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [menuOpen, closeMenu])

  // Prevent background scrolling when mobile menu is open.
  useEffect(() => {
    if (!menuOpen || !isMobile) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen, isMobile])

  // Toggle theme and close the mobile menu.
  const handleThemeToggle = () => {
    closeMenu()
    toggleTheme()
  }

  return (
    <header
      className="navbar"
      ref={navbarRef}
    >
      <div className="container navbar-inner">

        {/* Brand */}
        <Link
          to="/"
          className="brand"
          aria-label="NexLearn home"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <GraduationCap
              size={25}
              strokeWidth={1.8}
            />
          </span>

          <span className="brand-copy">
            <strong>NexLearn</strong>
            <small>LEARN. GROW. ACHIEVE.</small>
          </span>
        </Link>

        {/* Main navigation */}
        <nav
          id="public-navigation"
          className={`nav-links ${
            menuOpen ? 'is-open nav-links-open' : ''
          }`}
          aria-label="Main navigation"
          aria-hidden={isMobile ? !menuOpen : undefined}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Portal Login */}
          <Link
            to="/login"
            className="btn btn-primary nav-mobile-cta"
            onClick={closeMenu}
          >
            Portal Login
            <ArrowUpRight size={17} />
          </Link>
        </nav>

        {/* Theme toggle and navigation actions */}
        <div className="nav-actions">

          {/* Light / Dark Mode */}
          <button
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${
              isDark ? 'light' : 'dark'
            } mode`}
            title={`Switch to ${
              isDark ? 'light' : 'dark'
            } mode`}
          >
            {isDark ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Desktop Portal Login */}
          <Link
            to="/login"
            className="btn btn-primary nav-desktop-cta"
          >
            Portal Login
            <ArrowUpRight size={17} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label={
              menuOpen
                ? 'Close navigation'
                : 'Open navigation'
            }
            aria-expanded={menuOpen}
            aria-controls="public-navigation"
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
