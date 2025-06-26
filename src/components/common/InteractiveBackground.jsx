import React, { useEffect, useRef } from "react";
import { createGlobalStyle } from "styled-components";

/**
 * A slick, dark-themed interactive background.
 * – Uses requestAnimationFrame for performant mouse-tracking
 * – Animated, multi-layered gray gradients for a "moving glass" effect
 * – CSS-only blinking stars for a dynamic universe feel
 * – Subtle noise overlay for added depth
 */
const BackgroundEffectStyle = createGlobalStyle`
  /* Define animations */
  @keyframes move-background {
    0% { transform: translate(10%, -10%) scale(1.5); }
    50% { transform: translate(-10%, 10%) scale(1.5); }
    100% { transform: translate(10%, -10%) scale(1.5); }
  }

  @keyframes blink {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.2; }
  }

  /* Create a starfield using a single element and box-shadow */
  .stars {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 
      /* A selection of stars... */
      -5vw 20vh 0px 0px #fff, 10vw 40vh 1px 1px #fff, 
      90vw 10vh 1px 0px #fff, 40vw 90vh 0px 1px #fff,
      -30vw 50vh 1px 1px #fff, 70vw 20vh 0px 1px #fff,
      50vw 60vh 1px 0px #fff, -60vw 80vh 1px 1px #fff,
      15vw 5vh 0px 0px #fff, 80vw -2vh 1px 1px #fff;
    animation: blink 2s infinite alternate;
  }
  
  /* Add more star layers for parallax effect */
  .stars:nth-of-type(2) {
    transform: scale(0.8);
    animation-delay: -1s;
    animation-duration: 3s;
  }
  
  .stars:nth-of-type(3) {
    transform: scale(1.2);
    animation-delay: -2s;
    animation-duration: 2.5s;
  }


  body {
    /* --- CUSTOMIZABLE COLORS --- */
    --bg-primary: #101014;         /* Deep space gray */
    --bg-accent: rgba(80, 88, 115, .25); /* Muted blue-gray for the spotlight */
    --glass-gradient-1: #18181f;
    --glass-gradient-2: #20222b;

    /* --- CORE STYLES --- */
    background-color: var(--bg-primary);
    color: #e0e0e0;
    position: relative;
    transition: background .15s ease-out, color .2s ease-out;

    &::before {
      /* --- Moving Glass/Aurora Effect --- */
      content: '';
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background-image: 
        radial-gradient(circle at 20% 20%, var(--glass-gradient-1), transparent 50%),
        radial-gradient(circle at 80% 70%, var(--glass-gradient-2), transparent 50%);
      filter: blur(80px);
      animation: move-background 25s linear infinite;
    }

    &::after {
      /* --- Interactive Spotlight & Static Vignette --- */
      content: '';
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-image:
        /* Mouse-driven spotlight */
        radial-gradient(600px circle at var(--x) var(--y),
          var(--bg-accent),
          transparent 70%),
        /* Subtle noise overlay (base64 SVG) */
        url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjA0KScgd2lkdGg9JzEnIGhlaWdodD0nMScvPjwvc3ZnPg==");
      background-attachment: fixed;
    }
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

  // Render the global styles and the star elements
  return (
    <>
      <BackgroundEffectStyle />
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
    </>
  );
};

export default InteractiveBackground;