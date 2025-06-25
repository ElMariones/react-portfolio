import React, { useEffect, useRef } from "react";
import { createGlobalStyle } from "styled-components";

/**
 * A slick, dark‑themed interactive background.
 * – Uses requestAnimationFrame for better performance
 * – Multiple dark‑toned gradients & subtle noise overlay for depth
 */
const BackgroundEffectStyle = createGlobalStyle`
  /* Base dark surface */
  body {
    --bg-primary: #0d0d12;            /* near‑black base */
    --bg-accent: rgba(98, 0, 238, .25); /* soft purple glow */

    background-color: var(--bg-primary);
    background-image:
      /* Mouse‑driven spotlight */
      radial-gradient(600px circle at var(--x) var(--y),
        var(--bg-accent),
        transparent 70%),
      /* Static vignette corners for depth */
      radial-gradient(1200px at 100% 0%, rgba(0,0,0,.6) 0%, transparent 70%),
      radial-gradient(1200px at 0% 100%, rgba(0,0,0,.6) 0%, transparent 70%),
      /* Subtle noise overlay (base64 SVG) */
      url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjA1KScgd2lkdGg9JzEnIGhlaWdodD0nMScvPjwvc3ZnPg==");

    background-attachment: fixed;
    background-size: cover;
    transition: background .15s ease-out, color .2s ease-out;
    color: #e0e0e0; /* light text for readability */
  }
`;

const InteractiveBackground = () => {
  const rafId = useRef(null);
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      coords.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--x", `${coords.current.x}px`);
          document.documentElement.style.setProperty("--y", `${coords.current.y}px`);
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <BackgroundEffectStyle />;
};

export default InteractiveBackground;
