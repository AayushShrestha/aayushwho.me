"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParallaxDepthProps {
  imageSrc: string;
  depthSrc: string;
  /** Max UV displacement amount. Default: 0.03 */
  strength?: number;
  /** Lerp factor per RAF tick (0–1). Default: 0.08 */
  easing?: number;
  /** Extra scale-in to hide edge artifacts during displacement. Default: 1.05 */
  zoom?: number;
  /** Blur radius for the depth map (in UV units). Smooths harsh depth edges. 0 = off. Default: 0.002 */
  depthBlur?: number;
  /** Contrast curve applied to depth values. >1 = sharper depth separation, <1 = flatter. Default: 1.0 */
  depthContrast?: number;
  /** Multiplier on the vertical (Y) displacement. 0 = horizontal only. Default: 1.0 */
  verticalBias?: number;
  /** Radial falloff from screen center. 0 = uniform, 1 = displacement fades to zero at edges. Default: 0.0 */
  centerBias?: number;
  /** Vertical displacement driven by page scroll. Near layers scroll faster than far. 0 = off. Default: 0.02 */
  scrollStrength?: number;
  className?: string;
  fallback?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// GLSL shaders — two versions: ES 3.00 (WebGL2) and ES 1.00 (WebGL1)
// ---------------------------------------------------------------------------

const VERT_300 = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAG_300 = `#version 300 es
precision mediump float;
uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2  uMouse;
uniform float uStrength;
uniform float uZoom;
uniform vec2  uCoverScale;
uniform vec2  uAnchor;
uniform float uDepthBlur;
uniform float uDepthContrast;
uniform float uVerticalBias;
uniform float uCenterBias;
uniform float uScroll;
uniform float uScrollStrength;
in vec2 vUv;
out vec4 fragColor;

float sampleDepth(vec2 uv) {
  if (uDepthBlur <= 0.0) return texture(uDepth, uv).r;
  float b = uDepthBlur;
  float d  = texture(uDepth, uv).r;
  d += texture(uDepth, uv + vec2(-b, -b)).r;
  d += texture(uDepth, uv + vec2( 0.0, -b)).r;
  d += texture(uDepth, uv + vec2( b, -b)).r;
  d += texture(uDepth, uv + vec2(-b,  0.0)).r;
  d += texture(uDepth, uv + vec2( b,  0.0)).r;
  d += texture(uDepth, uv + vec2(-b,  b)).r;
  d += texture(uDepth, uv + vec2( 0.0,  b)).r;
  d += texture(uDepth, uv + vec2( b,  b)).r;
  return d / 9.0;
}

void main() {
  vec2 uv = (vUv - uAnchor) * uCoverScale * uZoom + uAnchor;

  float depth = sampleDepth(uv);
  depth = pow(clamp(depth, 0.0, 1.0), uDepthContrast);

  vec2 mouse = vec2(uMouse.x, uMouse.y * uVerticalBias);

  float centerDist = length(vUv - 0.5) * 2.0;
  float centerMul  = max(mix(1.0, 1.0 - centerDist, uCenterBias), 0.0);

  vec2 offset = mouse * depth * uStrength * centerMul;
  offset.y += uScroll * depth * uScrollStrength;

  fragColor = texture(uImage, uv + offset);
}`;

const VERT_100 = `attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAG_100 = `precision mediump float;
uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2  uMouse;
uniform float uStrength;
uniform float uZoom;
uniform vec2  uCoverScale;
uniform vec2  uAnchor;
uniform float uDepthBlur;
uniform float uDepthContrast;
uniform float uVerticalBias;
uniform float uCenterBias;
uniform float uScroll;
uniform float uScrollStrength;
varying vec2 vUv;

float sampleDepth(vec2 uv) {
  if (uDepthBlur <= 0.0) return texture2D(uDepth, uv).r;
  float b = uDepthBlur;
  float d  = texture2D(uDepth, uv).r;
  d += texture2D(uDepth, uv + vec2(-b, -b)).r;
  d += texture2D(uDepth, uv + vec2( 0.0, -b)).r;
  d += texture2D(uDepth, uv + vec2( b, -b)).r;
  d += texture2D(uDepth, uv + vec2(-b,  0.0)).r;
  d += texture2D(uDepth, uv + vec2( b,  0.0)).r;
  d += texture2D(uDepth, uv + vec2(-b,  b)).r;
  d += texture2D(uDepth, uv + vec2( 0.0,  b)).r;
  d += texture2D(uDepth, uv + vec2( b,  b)).r;
  return d / 9.0;
}

void main() {
  vec2 uv = (vUv - uAnchor) * uCoverScale * uZoom + uAnchor;

  float depth = sampleDepth(uv);
  depth = pow(clamp(depth, 0.0, 1.0), uDepthContrast);

  vec2 mouse = vec2(uMouse.x, uMouse.y * uVerticalBias);

  float centerDist = length(vUv - 0.5) * 2.0;
  float centerMul  = max(mix(1.0, 1.0 - centerDist, uCenterBias), 0.0);

  vec2 offset = mouse * depth * uStrength * centerMul;
  offset.y += uScroll * depth * uScrollStrength;

  gl_FragColor = texture2D(uImage, uv + offset);
}`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source.trim());
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    const typeName = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    console.error(`${typeName} shader compile error:`, log ?? "(no log)");
    console.error("Source:\n", source.trim());
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vert: string,
  frag: string,
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vert);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function createTexture(gl: WebGLRenderingContext): WebGLTexture {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // 1×1 placeholder so GL doesn't warn before the real image loads
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
    gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 255]),
  );
  return tex;
}

function uploadImage(
  gl: WebGLRenderingContext,
  tex: WebGLTexture,
  img: HTMLImageElement,
): void {
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ParallaxDepth({
  imageSrc,
  depthSrc,
  strength = 0.03,
  easing = 0.08,
  zoom = 1.05,
  depthBlur = 0.002,
  depthContrast = 1.0,
  verticalBias = 1.0,
  centerBias = 0.0,
  scrollStrength = 0.02,
  className,
  fallback,
}: ParallaxDepthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // -----------------------------------------------------------------------
    // 1. Acquire WebGL context — detect version to pick matching GLSL shaders
    // -----------------------------------------------------------------------
    const gl2 = canvas.getContext("webgl2") as WebGL2RenderingContext | null;
    const gl  = (gl2 ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | null;
    
    if (!gl) {
      console.error("WebGL not supported");
      setGlFailed(true);
      return;
    }

    // Try WebGL2 shaders first, fallback to WebGL1 if compilation fails
    let program: WebGLProgram | null = null;
    
    if (gl2) {
      program = createProgram(gl, VERT_300, FRAG_300);
      if (!program) {
        console.warn("WebGL2 shaders failed, falling back to WebGL1");
      }
    }
    
    if (!program) {
      program = createProgram(gl, VERT_100, FRAG_100);
      if (!program) {
        console.error("Both WebGL2 and WebGL1 shader compilation failed");
        setGlFailed(true);
        return;
      }
    }

    // Set canvas buffer size synchronously so the first draw is never wrong.
    // ResizeObserver fires asynchronously; without this, cached images could
    // trigger the first draw before ResizeObserver runs (canvas still 300×150).
    {
      const rect = canvas.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // -----------------------------------------------------------------------
    // 2. Compile shaders + link program
    // -----------------------------------------------------------------------
    gl.useProgram(program);

    // -----------------------------------------------------------------------
    // 3. Fullscreen quad geometry (triangle strip, 4 vertices)
    // -----------------------------------------------------------------------
    const positions = new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // -----------------------------------------------------------------------
    // 4. Uniform locations
    // -----------------------------------------------------------------------
    const uImage         = gl.getUniformLocation(program, "uImage")!;
    const uDepth         = gl.getUniformLocation(program, "uDepth")!;
    const uMouse         = gl.getUniformLocation(program, "uMouse")!;
    const uStrength      = gl.getUniformLocation(program, "uStrength")!;
    const uZoom          = gl.getUniformLocation(program, "uZoom")!;
    const uCoverScale    = gl.getUniformLocation(program, "uCoverScale")!;
    const uAnchor        = gl.getUniformLocation(program, "uAnchor")!;
    const uDepthBlur     = gl.getUniformLocation(program, "uDepthBlur")!;
    const uDepthContrast = gl.getUniformLocation(program, "uDepthContrast")!;
    const uVerticalBias  = gl.getUniformLocation(program, "uVerticalBias")!;
    const uCenterBias      = gl.getUniformLocation(program, "uCenterBias")!;
    const uScrollLoc       = gl.getUniformLocation(program, "uScroll")!;
    const uScrollStrength  = gl.getUniformLocation(program, "uScrollStrength")!;

    // Upload constants (only changed on resize or never)
    gl.uniform1f(uStrength, strength);
    gl.uniform1f(uZoom, zoom);
    gl.uniform1f(uDepthBlur, depthBlur);
    gl.uniform1f(uDepthContrast, depthContrast);
    gl.uniform1f(uVerticalBias, verticalBias);
    gl.uniform1f(uCenterBias, centerBias);
    gl.uniform1f(uScrollStrength, scrollStrength);
    gl.uniform1f(uScrollLoc, 0.0);

    // Anchor: desktop = object-top (0.5, 0.0), mobile = object-center (0.5, 0.5)
    function updateAnchor(logicalWidth: number): void {
      const anchorY = logicalWidth < 768 ? 0.5 : 0.0;
      gl!.useProgram(program);
      gl!.uniform2f(uAnchor, 0.5, anchorY);
    }
    updateAnchor(canvas.getBoundingClientRect().width);

    // -----------------------------------------------------------------------
    // 5. Textures — 1×1 placeholders until images load
    // -----------------------------------------------------------------------
    const texImage = createTexture(gl);
    const texDepth = createTexture(gl);

    // -----------------------------------------------------------------------
    // 6. Mouse / orientation / scroll state
    // -----------------------------------------------------------------------
    const target  = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let scrollProgress = 0;       // 0 at page top, 1 at one viewport height scrolled
    let currentScroll  = 0;       // eased value fed to shader
    let rafId = 0;
    let imageNaturalW = 1;
    let imageNaturalH = 1;

    // -----------------------------------------------------------------------
    // 7. Cover-scale recomputation (called on resize and after image loads)
    // -----------------------------------------------------------------------
    function updateCoverScale(): void {
      const cw = canvas!.width;
      const ch = canvas!.height;
      if (cw === 0 || ch === 0 || imageNaturalW === 0 || imageNaturalH === 0) return;
      const canvasAspect = cw / ch;
      const imageAspect  = imageNaturalW / imageNaturalH;
      // uCoverScale is the visible UV window size (< 1 on the cropped axis).
      // canvasAspect > imageAspect → image fills width, crops height → uvH < 1
      // canvasAspect ≤ imageAspect → image fills height, crops width → uvW < 1
      let sx: number, sy: number;
      if (canvasAspect > imageAspect) {
        sx = 1.0;
        sy = imageAspect / canvasAspect;
      } else {
        sx = canvasAspect / imageAspect;
        sy = 1.0;
      }
      gl!.useProgram(program);
      gl!.uniform2f(uCoverScale, sx, sy);
    }

    // -----------------------------------------------------------------------
    // 8. RAF draw loop
    // -----------------------------------------------------------------------
    function draw(): void {
      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;
      currentScroll += (scrollProgress - currentScroll) * easing;

      gl!.useProgram(program!);
      gl!.uniform2f(uMouse, current.x, current.y);
      gl!.uniform1f(uScrollLoc, currentScroll);

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, texImage);
      gl!.uniform1i(uImage, 0);

      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, texDepth);
      gl!.uniform1i(uDepth, 1);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    function loop(): void {
      rafId = requestAnimationFrame(loop);
      draw();
    }

    // -----------------------------------------------------------------------
    // 9. Load both images — start RAF when both are ready
    // -----------------------------------------------------------------------
    let loadedCount = 0;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onBothLoaded(): void {
      updateCoverScale();
      draw(); // draw once immediately
      // Always run the RAF loop: even with reduced-motion, scroll parallax
      // is user-driven (not autonomous animation) and needs continuous updates.
      loop();
    }

    const imgEl = new Image();
    imgEl.crossOrigin = "";
    imgEl.onload = () => {
      uploadImage(gl!, texImage, imgEl);
      imageNaturalW = imgEl.naturalWidth;
      imageNaturalH = imgEl.naturalHeight;
      loadedCount++;
      if (loadedCount === 2) onBothLoaded();
    };
    imgEl.onerror = () => setGlFailed(true);
    imgEl.src = imageSrc;

    const depthEl = new Image();
    depthEl.crossOrigin = "";
    depthEl.onload = () => {
      uploadImage(gl!, texDepth, depthEl);
      loadedCount++;
      if (loadedCount === 2) onBothLoaded();
    };
    depthEl.onerror = () => setGlFailed(true);
    depthEl.src = depthSrc;

    // -----------------------------------------------------------------------
    // 10. Mouse tracking (desktop) + scroll tracking
    // -----------------------------------------------------------------------
    function handleMouseMove(e: MouseEvent): void {
      target.x =  (e.clientX / window.innerWidth  - 0.5);
      target.y = -(e.clientY / window.innerHeight - 0.5); // flip Y: CSS↓ vs GL↑
    }

    function handleScroll(): void {
      scrollProgress = window.scrollY / window.innerHeight;
    }
    handleScroll(); // capture initial position

    // -----------------------------------------------------------------------
    // 11. Device orientation (mobile)
    //     Activate if no mouse movement detected within 2 s
    // -----------------------------------------------------------------------
    let mouseSeen = false;
    let orientationAdded = false;

    function handleOrientation(e: DeviceOrientationEvent): void {
      const gamma = e.gamma ?? 0;                        // left/right ±90°
      const beta  = Math.max(-45, Math.min(45, (e.beta ?? 0) - 20)); // forward/back, recentered
      target.x = gamma / 90;                             // -1..1, then clamped below
      target.y = -(beta / 45) * 0.5;
      target.x = Math.max(-0.5, Math.min(0.5, target.x * 0.5));
    }

    function addOrientationIfNeeded(): void {
      if (orientationAdded) return;
      orientationAdded = true;
      // iOS 13+ requires permission
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        // @ts-expect-error — requestPermission is iOS-only
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        // @ts-expect-error
        DeviceOrientationEvent.requestPermission()
          .then((state: string) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(() => {/* silently ignore */});
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    }

    let touchTimer: ReturnType<typeof setTimeout> | undefined;

    // Scroll listener runs regardless of reduced-motion (scroll parallax is
    // driven by the user's own scrolling, not an autonomous animation).
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!reducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);

      // If no mouse event fires within 2 s, assume touch device
      touchTimer = setTimeout(() => {
        if (!mouseSeen) addOrientationIfNeeded();
      }, 2000);

      const originalHandler = handleMouseMove;
      window.addEventListener(
        "mousemove",
        function markMouseSeen() {
          mouseSeen = true;
          clearTimeout(touchTimer);
          window.removeEventListener("mousemove", markMouseSeen);
        },
        { once: true },
      );
      void originalHandler; // suppress unused warning
    }

    // -----------------------------------------------------------------------
    // 12. ResizeObserver — keep canvas at physical pixel resolution
    // -----------------------------------------------------------------------
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width  = Math.round(width  * dpr);
      canvas!.height = Math.round(height * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      updateAnchor(width);
      updateCoverScale();
    });
    ro.observe(canvas);

    // -----------------------------------------------------------------------
    // 13. Cleanup
    // -----------------------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (orientationAdded) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      clearTimeout(touchTimer);
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [imageSrc, depthSrc, strength, easing, zoom, depthBlur, depthContrast, verticalBias, centerBias, scrollStrength]);

  if (glFailed) return <>{fallback}</>;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
