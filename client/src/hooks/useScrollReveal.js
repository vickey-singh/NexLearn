import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const root = document.querySelector('.site-shell')

    if (!root) return undefined

    const revealElements = root.querySelectorAll('[data-reveal]')
    const staggerGroups = root.querySelectorAll(
      '.programs-grid, .benefits-list'
    )

    // Respect the user's motion preference.
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) {
      revealElements.forEach((element) => {
        element.classList.add('is-visible')
      })

      return undefined
    }

    // Give cards a cinematic staggered entrance.
    staggerGroups.forEach((group) => {
      Array.from(group.children).forEach((element, index) => {
        element.style.setProperty(
          '--reveal-delay',
          `${Math.min(index * 120, 360)}ms`
        )
      })
    })

    // Reveal elements as they enter the viewport.
    let observer

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -55px 0px',
        }
      )

      revealElements.forEach((element) => {
        observer.observe(element)
      })
    } else {
      revealElements.forEach((element) => {
        element.classList.add('is-visible')
      })
    }

    // Subtle parallax for hero artwork.
    const hero = root.querySelector('.hero-visual')

    let animationFrame = null
    let lastScrollY = window.scrollY

    const updateParallax = () => {
      animationFrame = null

      if (!hero) return

      const heroRect = hero.getBoundingClientRect()

      // Stop updating when the hero is far outside the viewport.
      if (
        heroRect.bottom < -100 ||
        heroRect.top > window.innerHeight + 100
      ) {
        return
      }

      const viewportCenter = window.innerHeight / 2
      const heroCenter = heroRect.top + heroRect.height / 2
      const distance = (heroCenter - viewportCenter) / viewportCenter

      const parallax = Math.max(-16, Math.min(16, distance * -10))

      hero.style.setProperty('--hero-parallax', `${parallax}px`)
    }

    const handleScroll = () => {
      lastScrollY = window.scrollY

      if (animationFrame !== null) return

      animationFrame = window.requestAnimationFrame(() => {
        updateParallax()
      })
    }

    const handleResize = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }

      animationFrame = window.requestAnimationFrame(() => {
        updateParallax()
      })
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleResize)

    updateParallax()

    return () => {
      observer?.disconnect()

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }

      hero?.style.removeProperty('--hero-parallax')

      staggerGroups.forEach((group) => {
        Array.from(group.children).forEach((element) => {
          element.style.removeProperty('--reveal-delay')
        })
      })
    }
  }, [])
}