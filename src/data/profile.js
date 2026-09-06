export const profile = {
  name: 'Dylan Chhum',
  title: 'Backend Engineer',
  company: 'Finix',
  tagline: 'I build backend systems for payment disputes. Previously, I worked on voice AI, campus apps, and computer vision for bioprinting.',
  education: 'B.S. EECS · UC Berkeley',
  email: 'dylchhum@berkeley.edu',

  // Default hero background (visitors can switch modes with the on-page
  // [ video ] / [ plasma ] buttons):
  //   'video'  — render public/ascii-source.mp4 through the ASCII filter,
  //              falling back to the plasma pattern until the file exists.
  //   'plasma' — the generative plasma pattern.
  heroBackground: 'video',

  // Video rendered by the ASCII filter when heroBackground is 'video'. Drop a
  // file at public/ascii-source.mp4 and it plays automatically. YouTube URLs
  // won't work here — browsers block pixel access to cross-origin iframes
  // (see README).
  asciiVideoSrc: '/ascii-source.mp4',

  links: [
    { label: 'GitHub', href: 'https://github.com/chhumbucket' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chhum' },
    { label: 'Email', href: 'mailto:dylchhum@berkeley.edu' },
  ],

  experience: [
    {
      company: 'Finix',
      role: 'Software Engineer',
      team: 'Disputes',
      period: 'Apr 2026 — Present',
      bullets: [
        'Built page validation for Mastercard Mastercom submissions, preventing unnecessary billable pages and reducing network fees by approximately $60K per month.',
        'Design and implement a timeline API that brings card-network and issuer notes into one chronological dispute history.',
        'Removed deprecated code paths and automated manual steps in the CyberSource dispute lifecycle.',
      ],
    },
    {
      company: 'Tokk AI',
      role: 'Full-Stack Engineer Intern',
      period: 'May — Aug 2025',
      bullets: [
        'Architected an MVVM-based iOS app and documented its design for a three-person engineering team.',
        'Connected the iOS client to AWS services over WebSockets with sub-100ms latency.',
        'Built real-time audio streaming with AVFoundation and designed flows for voice-based AI interaction.',
      ],
    },
    {
      company: 'ATP-Bio',
      role: 'Researching Engineer',
      period: 'May 2023 — Oct 2024',
      bullets: [
        'Built a Python and OpenCV system processing 30 frames per second for precision 3D bioprinting.',
        'Reduced cryoprinting material waste by 40% with automated visual tracking and feedback.',
        'Developed microscopic motion tracking and C++ / Arduino modules for device control and data acquisition.',
      ],
    },
  ],

  projects: [
    {
      name: 'Berkeley Mobile',
      role: 'iOS Developer',
      stack: 'Swift · SwiftUI · Firebase · REST APIs',
      description: 'Campus resources for 20,000+ UC Berkeley students, built with a 15-person team.',
      bullets: [
        'Integrated real-time gym capacity, dining menus, and course schedules using Swift Concurrency.',
        'Migrated five UIKit screens to SwiftUI while maintaining iOS 14+ compatibility.',
      ],
    },
    {
      name: 'Dog Shelter Matching Platform',
      stack: 'React · FastAPI · Python · Google Gemini',
      description: 'A web app that connects dog owners with shelters through video-based behavioral analysis.',
      bullets: [
        'Built a FastAPI pipeline for concurrent video uploads and Gemini-powered behavior profiles.',
        'Implemented the React user flows and deployed the application on Vercel.',
      ],
    },
  ],

  // Wordle completions. Each entry is `{ number, date, grid }`, where `grid`
  // is the rows of ⬛🟨🟩 emoji straight from the game's Share output; the
  // score (X/6) is derived in lib/wordle.js. These are placeholders — they'll
  // be replaced by the auto-posting pipeline (share sheet → gist → fetch).
  wordle: [
    {
      number: 1865,
      date: '2026-07-20',
      grid: ['🟨⬛⬛🟨⬛', '🟩🟨⬛⬛⬛', '🟩🟩🟩🟩🟩'],
    },
    {
      number: 1864,
      date: '2026-07-19',
      grid: ['⬛🟨⬛⬛⬛', '⬛🟩⬛🟨⬛', '🟨🟩🟩⬛⬛', '🟩🟩🟩🟩🟩'],
    },
    {
      number: 1863,
      date: '2026-07-18',
      grid: ['⬛⬛🟨⬛⬛', '🟨⬛⬛🟩⬛', '⬛🟩🟨🟩⬛', '🟩🟩⬛🟩🟩', '🟩🟩🟩🟩🟩'],
    },
  ],
}
