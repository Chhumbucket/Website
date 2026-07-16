// Single source of truth for the site's content — edit this file, not the components.
export const profile = {
  name: 'Dylan Chhum',
  title: 'Backend Engineer',
  company: 'Finix',
  tagline: 'Building dispute processing systems on the Disputes team at Finix.',
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
    { label: 'Email', href: 'mailto:dylchhum@berkeley.edu' },
  ],

  experience: [
    {
      company: 'Finix',
      role: 'Backend Engineer',
      team: 'Disputes',
      period: '2026 — Present', 
      bullets: [
        'Build and maintain backend services powering the dispute lifecycle — intake, evidence submission, and resolution.',
        'Work across processor integrations to normalize dispute data into a single internal model.',
      ],
    },
    {
      company: 'Berkeley Mobile',
      role: 'iOS Engineer',
      period: '2024 — 2026', 
      bullets: [
        'Builted a webscrapper that kept track of the gym occupancy.',
        'Worked on improving a webscrapper that allowed for ingredients in cafeteria food.',
        'Designed a page that kept track of macros based on dining hall meals.',
      ]
    },
    {
      company: 'Tokk AI', 
      role: 'iOS Engineer Intern',
      period: '2025 — 2026',
      bullets: [
        'Designed the system that connects platform to the app',
        'Created voice integration system in order to communicate with the AI',
        'Added a chatbot to the app for customers',
        'Integrated native calendar and reminders into app and platform',
      ]
    }
  ],
}
