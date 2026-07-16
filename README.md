# Personal Website

Minimal personal site built with React + Vite. The hero renders a video
through an ASCII filter on a `<canvas>`.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  data/profile.js          # all site content — edit this, not the components
  lib/ascii.js             # pure ASCII helpers (char ramp, luminance, plasma fallback)
  components/
    AsciiVideo.jsx         # <video> → canvas ASCII renderer
    Hero.jsx               # full-screen intro over the ASCII effect
    Experience.jsx         # job list driven by profile.js
    Footer.jsx
  App.jsx
  index.css
```

## The ASCII video

`AsciiVideo` plays a muted, hidden `<video>`, samples it into a tiny canvas
(one pixel per character cell), maps each pixel's luminance onto a character
ramp (` .:-=+*#%@`), and draws the characters to a visible canvas every frame.

**Adding a video:** drop a file at `public/ascii-source.mp4` and reload — it
plays automatically. Until then a procedural plasma animation renders instead.

**Switching backgrounds:** the `[ video ]` / `[ plasma ]` buttons in the hero's
bottom-left corner switch modes at runtime; `heroBackground` in
`src/data/profile.js` sets the default.

**Why not the YouTube URL directly?** Browsers block pixel access to
cross-origin iframes, so a YouTube embed can't be read into a canvas. The
source has to be a same-origin video file. Note that downloading videos from
YouTube is against its terms of service and most videos (including the JJK
opening) are copyrighted — your own footage or openly licensed clips are the
safe choice for a public site.

Tweakables via props on `<AsciiVideo>`: `fontSize` (cell size), `color`,
`ramp` (character set, darkest → brightest).
