import { useEffect, useRef, useState } from 'react'
import { DEFAULT_RAMP, luminanceAt, pickChar, plasma } from '../lib/ascii'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Renders a same-origin video file as animated ASCII characters on a canvas.
 *
 * While the video is unavailable (file missing, still loading, autoplay
 * blocked) it renders a procedural plasma field instead, so the effect never
 * shows up blank. YouTube embeds can't be used as a source — browsers block
 * pixel access to cross-origin iframes — so `src` must point at a local file.
 *
 * The animation pauses when the hero is scrolled offscreen, when the user
 * clicks the pause toggle, or when the OS asks for reduced motion (WCAG 2.2.2).
 *
 * `mode` ('video' | 'plasma') picks the source; pass `onModeChange` to render
 * the on-screen background switcher. `children` are rendered as extra buttons
 * at the end of the control row.
 */
export default function AsciiVideo({
  src,
  mode = 'video',
  onModeChange,
  fontSize = 12,
  color = '#4ade80',
  ramp = DEFAULT_RAMP,
  children,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const videoSrc = mode === 'plasma' ? null : src

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext('2d')
    // Tiny offscreen canvas: one pixel per character cell.
    const sample = document.createElement('canvas')
    const sampleCtx = sample.getContext('2d', { willReadFrequently: true })

    const font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`
    const lineHeight = fontSize
    let charWidth = fontSize * 0.6
    let cols = 0
    let rows = 0
    let samplingFailed = false
    let videoDirty = true

    const videoReady = () =>
      video &&
      !video.error &&
      !video.paused &&
      !samplingFailed &&
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      video.videoWidth > 0

    const sampleVideo = () => {
      // Center-crop the video to the grid's aspect ratio, like object-fit: cover.
      const gridAspect = (cols * charWidth) / (rows * lineHeight)
      const vw = video.videoWidth
      const vh = video.videoHeight
      let sw = vw
      let sh = vh
      if (vw / vh > gridAspect) sw = vh * gridAspect
      else sh = vw / gridAspect
      try {
        sampleCtx.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, cols, rows)
        return sampleCtx.getImageData(0, 0, cols, rows).data
      } catch {
        // Cross-origin source tainted the canvas; fall back to plasma for good.
        samplingFailed = true
        return null
      }
    }

    const drawFrame = (t) => {
      const pixels = videoReady() ? sampleVideo() : null
      // Clear under an identity transform: with a fractional dpr the scaled
      // clearRect would miss part of the backing store and leave trails.
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
      ctx.fillStyle = color
      for (let y = 0; y < rows; y++) {
        let line = ''
        for (let x = 0; x < cols; x++) {
          const lum = pixels
            ? luminanceAt(pixels, (y * cols + x) * 4)
            : plasma(x / cols, y / rows, t)
          line += pickChar(ramp, lum)
        }
        ctx.fillText(line, 0, y * lineHeight)
      }
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = font
      ctx.textBaseline = 'top'
      charWidth = ctx.measureText('M').width || charWidth
      cols = Math.max(1, Math.ceil(width / charWidth))
      rows = Math.max(1, Math.ceil(height / lineHeight))
      sample.width = cols
      sample.height = rows
      videoDirty = true
      // Resizing wipes the canvas; when the loop isn't running, repaint the
      // single static frame ourselves.
      if (paused) drawFrame(0)
    }

    // With requestVideoFrameCallback we only resample when the video actually
    // presents a new frame (a 30fps video on a 60Hz display skips every other
    // tick). Plasma has no frame source, so it redraws every tick.
    const supportsVideoFrames = Boolean(video && 'requestVideoFrameCallback' in video)
    let videoFrameId = 0
    if (supportsVideoFrames) {
      const onVideoFrame = () => {
        videoDirty = true
        videoFrameId = video.requestVideoFrameCallback(onVideoFrame)
      }
      videoFrameId = video.requestVideoFrameCallback(onVideoFrame)
    }

    let rafId = 0
    let running = false
    let lastMediaTime = -1
    let lastAdvanceAt = 0

    // Watchdog: Chrome can silently stall an invisible video's clock near the
    // loop boundary (it reports playing, fires no pause/ended event, and
    // never wraps). If the clock stops advancing while it should be playing,
    // restart from the top.
    const checkStall = (now) => {
      if (!video || video.paused || video.readyState < 2) return
      if (video.currentTime !== lastMediaTime) {
        lastMediaTime = video.currentTime
        lastAdvanceAt = now
      } else if (now - lastAdvanceAt > 2000) {
        lastAdvanceAt = now
        video.currentTime = 0
        video.play().catch(() => {})
      }
    }

    const frame = (now) => {
      rafId = requestAnimationFrame(frame)
      checkStall(now)
      if (videoReady() && supportsVideoFrames && !videoDirty) return
      videoDirty = false
      drawFrame(now / 1000)
    }

    const tryPlay = () => {
      if (!video || !running || document.visibilityState !== 'visible') return
      video.play().catch(() => {
        // Autoplay was blocked; plasma keeps rendering until a tap or
        // visibility change lets us retry.
      })
    }

    // `running` guards against a double rAF chain: the IntersectionObserver
    // delivers its initial state asynchronously, on top of later transitions.
    const start = () => {
      if (running) return
      running = true
      videoDirty = true
      rafId = requestAnimationFrame(frame)
      tryPlay()
    }
    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(rafId)
      video?.pause()
    }

    // Browsers pause invisible muted videos on their own (Chrome does it at
    // the loop boundary to save power, iOS on interruptions), which would
    // freeze the effect. Our intentional pauses clear `running` before
    // calling pause(), so only browser-initiated pauses get resumed here.
    // Chrome re-pauses at the loop boundary faster than play() can cross it,
    // so wrap to the start manually before resuming.
    const onVideoPause = () => {
      if (!running) return
      if (video.duration && video.duration - video.currentTime < 0.5) {
        video.currentTime = 0
      }
      tryPlay()
    }
    video?.addEventListener('pause', onVideoPause)

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionPreference = (e) => setPaused(e.matches)
    mediaQuery.addEventListener('change', onMotionPreference)

    let intersectionObserver = null
    const onVisibility = () => tryPlay()
    const onPointerDown = () => tryPlay()

    if (paused) {
      drawFrame(0)
    } else {
      // Don't burn CPU and battery painting a canvas nobody can see: run the
      // loop (and video decode) only while the hero is in the viewport.
      intersectionObserver = new IntersectionObserver(([entry]) =>
        entry.isIntersecting ? start() : stop(),
      )
      intersectionObserver.observe(container)
      document.addEventListener('visibilitychange', onVisibility)
      window.addEventListener('pointerdown', onPointerDown)
    }

    return () => {
      stop()
      video?.removeEventListener('pause', onVideoPause)
      resizeObserver.disconnect()
      intersectionObserver?.disconnect()
      mediaQuery.removeEventListener('change', onMotionPreference)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointerdown', onPointerDown)
      if (supportsVideoFrames) video.cancelVideoFrameCallback?.(videoFrameId)
    }
  }, [videoSrc, fontSize, color, ramp, paused])

  return (
    <div ref={containerRef} className="ascii-video">
      <canvas ref={canvasRef} aria-hidden="true" />
      {videoSrc && (
        // Kept visually hidden rather than display:none — some browsers stop
        // decoding frames for display:none videos, which would freeze the canvas.
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="ascii-video__source"
        />
      )}
      <div className="ascii-video__controls">
        <button
          type="button"
          aria-label={paused ? 'Play background animation' : 'Pause background animation'}
          onClick={() => setPaused((p) => !p)}
        >
          [ {paused ? 'play' : 'pause'} ]
        </button>
        {onModeChange && (
          <>
            <button
              type="button"
              aria-pressed={mode === 'video'}
              onClick={() => onModeChange('video')}
            >
              [ video ]
            </button>
            <button
              type="button"
              aria-pressed={mode === 'plasma'}
              onClick={() => onModeChange('plasma')}
            >
              [ plasma ]
            </button>
          </>
        )}
        {children}
      </div>
    </div>
  )
}
