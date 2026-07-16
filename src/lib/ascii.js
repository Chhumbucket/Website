// Pure helpers for the ASCII renderer. No React, no DOM — easy to test and reuse.

// Character ramp ordered darkest → brightest, tuned for light text on a dark page.
export const DEFAULT_RAMP = ' .:-=+*#%@'

// Map a luminance value (0–255) to a character in the ramp.
export function pickChar(ramp, luminance) {
  const index = Math.min(ramp.length - 1, Math.floor((luminance / 255) * ramp.length))
  return ramp[index]
}

// Rec. 709 luma from RGBA pixel data at a given pixel index.
export function luminanceAt(pixels, i) {
  return 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]
}

// Procedural plasma field used when no video is available.
// nx, ny are normalized coordinates (0–1); t is seconds. Returns luminance 0–255.
export function plasma(nx, ny, t) {
  let v = Math.sin(nx * 6 + t * 0.8)
  v += Math.sin(ny * 8 - t * 0.6)
  v += Math.sin((nx + ny) * 6 + t * 0.5)
  const cx = nx - 0.5 + 0.3 * Math.sin(t * 0.4)
  const cy = ny - 0.5 + 0.3 * Math.cos(t * 0.3)
  v += Math.sin(Math.sqrt(cx * cx + cy * cy) * 12 - t)
  return ((v + 4) / 8) * 255
}
