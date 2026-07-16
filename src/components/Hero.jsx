import { useEffect, useRef, useState } from 'react'
import AsciiVideo from './AsciiVideo'
import { profile } from '../data/profile'

export default function Hero() {
  const [introHidden, setIntroHidden] = useState(false)
  const [background, setBackground] = useState(profile.heroBackground)
  const hideButtonRef = useRef(null)
  const showButtonRef = useRef(null)
  const didToggleRef = useRef(false)

  const toggleIntro = (hidden) => {
    didToggleRef.current = true
    setIntroHidden(hidden)
  }

  // The two toggle buttons live in different corners, so the clicked one
  // unmounts. Move focus to its counterpart so keyboard users aren't dropped
  // back to <body>.
  useEffect(() => {
    if (!didToggleRef.current) return
    didToggleRef.current = false
    ;(introHidden ? showButtonRef : hideButtonRef).current?.focus()
  }, [introHidden])

  return (
    <header className="hero">
      <AsciiVideo src={profile.asciiVideoSrc} mode={background} onModeChange={setBackground}>
        {introHidden && (
          <button
            ref={showButtonRef}
            type="button"
            aria-expanded={false}
            onClick={() => toggleIntro(false)}
          >
            [ show intro ]
          </button>
        )}
      </AsciiVideo>
      <div className={`hero__panel${introHidden ? ' hero__panel--hidden' : ''}`}>
        {!introHidden && (
          <button
            ref={hideButtonRef}
            type="button"
            className="hero__toggle"
            aria-expanded={true}
            onClick={() => toggleIntro(true)}
          >
            [ hide ]
          </button>
        )}
        <div className="hero__content">
          <p className="hero__kicker">hi, i&apos;m</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__title">
            {profile.title} @ {profile.company}
          </p>
          <p className="hero__tagline">{profile.tagline}</p>
          <nav className="hero__links" aria-label="Contact links">
            {profile.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
