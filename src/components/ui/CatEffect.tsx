'use client'

import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpriteSet {
  [key: string]: [number, number][];
}

const SPRITE_SETS: SpriteSet = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  NW: [[-1, 0], [-1, -1]],
  W: [[-4, -2], [-4, -3]],
};

const NEKO_SPEED = 10;

export default function OnekoCat() {
  const nekoRef = useRef<HTMLDivElement>(null);
  const [nekoPos, setNekoPos] = useState<Position>({ x: 32, y: 32 });
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [frameCount, setFrameCount] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [idleAnimation, setIdleAnimation] = useState<string | null>(null);
  const [idleAnimationFrame, setIdleAnimationFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const lastFrameTimestamp = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const speechBubbles = [
    "Meow!",
    "Pet me!",
    "Purr~",
    "Hello!",
    "Nice to meet you!",
    "I like you!",
    "Keep coding!"
  ];

  const setSprite = (name: string, frame: number) => {
    if (!nekoRef.current) return;
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  };

  const resetIdleAnimation = () => {
    setIdleAnimation(null);
    setIdleAnimationFrame(0);
  };

  const handleIdle = () => {
    setIdleTime(prev => prev + 1);

    if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnimation) {
      const availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPos.x < 32) availableIdleAnimations.push("scratchWallW");
      if (nekoPos.y < 32) availableIdleAnimations.push("scratchWallN");
      if (nekoPos.x > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
      if (nekoPos.y > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");

      setIdleAnimation(availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)]);
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) resetIdleAnimation();
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    setIdleAnimationFrame(prev => prev + 1);
  };

  const handleFrame = () => {
    if (!nekoRef.current || isDragging) return;

    setFrameCount(prev => prev + 1);
    const diffX = nekoPos.x - mousePos.x;
    const diffY = nekoPos.y - mousePos.y;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < NEKO_SPEED || distance < 48) {
      handleIdle();
      return;
    }

    setIdleAnimation(null);
    setIdleAnimationFrame(0);

    if (idleTime > 1) {
      setSprite("alert", 0);
      setIdleTime(prev => Math.max(prev - 1, 0));
      return;
    }

    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    const newX = nekoPos.x - (diffX / distance) * NEKO_SPEED;
    const newY = nekoPos.y - (diffY / distance) * NEKO_SPEED;

    setNekoPos({
      x: Math.min(Math.max(16, newX), window.innerWidth - 16),
      y: Math.min(Math.max(16, newY), window.innerHeight - 16)
    });
  };

  const handleCatClick = () => {
    setClickCount(prev => prev + 1);
    
    // Jump animation
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);

    // Always show hearts on click
    const newHeart = {
      id: Date.now(),
      x: nekoPos.x,
      y: nekoPos.y
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);

    // Show speech bubble
    setShowSpeechBubble(true);
    setTimeout(() => setShowSpeechBubble(false), 2000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!nekoRef.current) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - nekoPos.x,
      y: e.clientY - nekoPos.y
    });
    setSprite("alert", 0);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setNekoPos({
          x: Math.min(Math.max(16, event.clientX - dragOffset.x), window.innerWidth - 16),
          y: Math.min(Math.max(16, event.clientY - dragOffset.y), window.innerHeight - 16)
        });
      } else {
        setMousePos({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setIdleTime(0);
      }
    };

    const animate = (timestamp: number) => {
      if (!lastFrameTimestamp.current) {
        lastFrameTimestamp.current = timestamp;
      }

      if (timestamp - lastFrameTimestamp.current > 100) {
        lastFrameTimestamp.current = timestamp;
        handleFrame();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [nekoPos, mousePos, frameCount, idleTime, idleAnimation, idleAnimationFrame, isDragging, dragOffset]);

  return (
    <>
      <div
        ref={nekoRef}
        onClick={handleCatClick}
        onMouseDown={handleMouseDown}
        style={{
          width: '32px',
          height: '32px',
          position: 'fixed',
          cursor: isDragging ? 'grabbing' : 'grab',
          imageRendering: 'pixelated',
          left: `${nekoPos.x - 16}px`,
          top: `${nekoPos.y - 16}px`,
          zIndex: 2147483647,
          backgroundImage: 'url(/oneko.gif)',
          transform: isJumping ? 'translateY(-20px) scale(1.2)' : 'translateY(0) scale(1)',
          transition: isJumping ? 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'transform 0.2s ease',
          filter: isDragging ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'none',
        }}
      />

      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div style={{
          position: 'fixed',
          left: `${nekoPos.x + 20}px`,
          top: `${nekoPos.y - 50}px`,
          background: 'white',
          color: '#333',
          padding: '8px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 2147483646,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'bubblePop 0.3s ease, fadeOut 2s ease 1.7s forwards',
          whiteSpace: 'nowrap'
        }}>
          {speechBubbles[clickCount % speechBubbles.length]}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '10px',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid white',
          }} />
        </div>
      )}

      {/* Hearts */}
      {hearts.map(heart => (
        <div key={heart.id} style={{
          position: 'fixed',
          left: `${heart.x}px`,
          top: `${heart.y}px`,
          fontSize: '24px',
          zIndex: 2147483645,
          animation: 'floatToTop 2s ease-out',
          pointerEvents: 'none'
        }}>
          ❤️
        </div>
      ))}

      {/* Stars */}
      {stars.map(star => (
        <div key={star.id} style={{
          position: 'fixed',
          left: `${star.x}px`,
          top: `${star.y}px`,
          fontSize: '20px',
          zIndex: 2147483645,
          animation: 'sparkle 1.5s ease-out',
          pointerEvents: 'none'
        }}>
          ✨
        </div>
      ))}

      <style>{`
        @keyframes floatToTop {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          20% {
            transform: translateY(-50px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bubblePop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}