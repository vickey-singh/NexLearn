import {
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import './Footer.css'

// Replace these placeholders with your actual institute details.
const contactDetails = {
  address: 'Your Institute Address, City, State, PIN',
  phone: '+91-XXXXXXXXXX',
  email: 'your-email@example.com',
}

// Replace with your official social media profile URLs.
const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: 'instagram',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: 'facebook',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: 'linkedin',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: 'youtube',
  },
]

function SocialIcon({ name }) {
  const props = {
    width: 19,
    height: 19,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'instagram':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.8"
            fill="currentColor"
          />
        </svg>
      )

    case 'facebook':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
        </svg>
      )

    case 'linkedin':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.3-1.8c3.5 0 4.2 2.3 4.2 5.3v6.4h-3.4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H9V9Z" />
        </svg>
      )

    case 'youtube':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M23 7.1a3 3 0 0 0-2.1-2.2C19.1 4.4 12 4.4 12 4.4s-7.1 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.8.5 8.9.5 8.9.5s7.1 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9ZM9.7 15.4V8.6l6 3.4-6 3.4Z" />
        </svg>
      )

    default:
      return null
  }
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand and social media */}
          <div className="footer-brand-section">
            <a
              href="/"
              className="brand footer-brand"
              aria-label="NexLearn home"
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
            </a>

            <p className="footer-description">
              A thoughtful approach to education, skill development
              and lifelong learning.
            </p>

            <div
              className="footer-socials"
              aria-label="Social media"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="footer-social-link"
                  aria-label={social.name}
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div className="footer-contact">
            <h3>Get in touch</h3>

            <a
              className="footer-contact-item"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactDetails.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="footer-contact-icon">
                <MapPin size={18} />
              </span>

              <span className="footer-contact-copy">
                <small>Our address</small>
                <strong>{contactDetails.address}</strong>
              </span>
            </a>

            <a
              className="footer-contact-item"
              href={`tel:${contactDetails.phone.replace(/[^\d+]/g, '')}`}
            >
              <span className="footer-contact-icon">
                <Phone size={18} />
              </span>

              <span className="footer-contact-copy">
                <small>Call us</small>
                <strong>{contactDetails.phone}</strong>
              </span>
            </a>

            <a
              className="footer-contact-item"
              href={`mailto:${contactDetails.email}`}
            >
              <span className="footer-contact-icon">
                <Mail size={18} />
              </span>

              <span className="footer-contact-copy">
                <small>Email us</small>
                <strong>{contactDetails.email}</strong>
              </span>
            </a>
          </div>
        </div>

        {/* Copyright and developer credit */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} NexLearn. All rights reserved.
          </span>

          <p className="footer-credit">
            Designed &amp; Developed by{' '}
            <a
              href="https://vickey-singh.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vickey Singh
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer