import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './App.css';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const circles = container.querySelectorAll('.circle');
    const lineContainers = container.querySelectorAll('.line-container');
    const asciiElements = container.querySelectorAll('.ascii');

    // Animate circles
    circles.forEach((circle) => {
      gsap.to(circle, {
        scale: gsap.utils.random(0.8, 1.2),
        opacity: gsap.utils.random(0.4, 1),
        duration: gsap.utils.random(1.5, 2.5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Animate line containers
    lineContainers.forEach((lineContainer) => {
      const direction = lineContainer.classList.contains('horizontal') ? 'x' : 'y';
      const distance = direction === 'x' ? '100%' : '100%';
      gsap.to(lineContainer, {
        [direction]: distance,
        duration: gsap.utils.random(20, 40),
        repeat: -1,
        ease: 'none',
        yoyo: true,
      });
    });

    // Animate ASCII elements
    asciiElements.forEach((ascii) => {
      gsap.to(ascii, {
        opacity: gsap.utils.random(0.3, 0.8),
        duration: gsap.utils.random(1, 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  const createElements = () => {
    const elements = [];
    const asciiChars = ['/', '\\', '|', '-', '+', '*', '=', ':', '.', '<', '>', '^', 'v', '0', '1'];

    // Create circles
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 10 + 2;
      elements.push(
        <circle
          key={`circle-${i}`}
          className="circle"
          cx={`${x}%`}
          cy={`${y}%`}
          r={size}
        />
      );
    }

    // Create horizontal lines
    for (let i = 0; i < 5; i++) {
      const y = Math.random() * 100;
      elements.push(
        <g key={`hline-${i}`} className="line-container horizontal">
          <line
            className="tech-line"
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
          />
        </g>
      );
    }

    // Create vertical lines
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 100;
      elements.push(
        <g key={`vline-${i}`} className="line-container vertical">
          <line
            className="tech-line"
            x1={`${x}%`}
            y1="0"
            x2={`${x}%`}
            y2="100%"
          />
        </g>
      );
    }

    // Create ASCII characters
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const ascii = asciiChars[Math.floor(Math.random() * asciiChars.length)];
      elements.push(
        <text
          key={`ascii-${i}`}
          className="ascii"
          x={`${x}%`}
          y={`${y}%`}
          fontSize={Math.random() * 8 + 6}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {ascii}
        </text>
      );
    }

    return elements;
  };

  return (
    <div className="App" ref={containerRef}>
      <svg className="circuit" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {createElements()}
      </svg>
    </div>
  );
}

export default App;