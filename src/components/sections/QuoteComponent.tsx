'use client'
import React, { useRef, useState, useEffect } from 'react';
import Container from '../ui/Container';

interface Quote {
  text: string;
  chapter?: string;
}

const bhagavadGitaQuotes: Quote[] = [
  {
    text: "Yoga is excellence in action.",
    chapter: "Chapter 2, Verse 50"
  },
  {
    text: "Lift yourself by yourself; do not degrade yourself. You are your own friend.",
    chapter: "Chapter 6, Verse 5"
  },
  {
    text: "Whatever a great person does, others follow. Whatever standard they set, the world pursues.",
    chapter: "Chapter 3, Verse 21"
  },
  {
    text: "You have the right to perform your duties, but never to the fruit of your actions.",
    chapter: "Chapter 2, Verse 47"
  },
  {
    text: "Perform your duty with an unwavering mind, abandoning attachment to success or failure.",
    chapter: "Chapter 2, Verse 48"
  },
  {
    text: "There is no loss of effort here, nor is there any fear. Even a little practice saves one from great fear.",
    chapter: "Chapter 2, Verse 40"
  },
  {
    text: "Man is made by his belief. As he believes, so he is.",
    chapter: "Chapter 17, Verse 3"
  },
  {
    text: "The resolute understanding is single-pointed; the thoughts of the irresolute are endless.",
    chapter: "Chapter 2, Verse 41"
  },
  {
    text: "Do your prescribed work, for action is better than inaction.",
    chapter: "Chapter 3, Verse 8"
  },
  {
    text: "When one conquers the mind, it becomes their best friend; but for one who fails to do so, it remains the greatest enemy.",
    chapter: "Chapter 6, Verse 6"
  }
];
interface QuoteComponentProps {
  random?: boolean;
  className?: string;
}

const QuoteComponent: React.FC<QuoteComponentProps> = ({ random = false, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote>(bhagavadGitaQuotes[0]);

  useEffect(() => {
    if (random) {
      const randomIndex = Math.floor(Math.random() * bhagavadGitaQuotes.length);
      setCurrentQuote(bhagavadGitaQuotes[randomIndex]);
    }
  }, [random]);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = isAudioOn;
      setIsAudioOn(!isAudioOn);
    }
  };

  return (
    <Container>
      <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ minHeight: '480px' }}>
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/video/background-krishna.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          title={isAudioOn ? 'Mute audio' : 'Play audio'}
          className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-amber-400/30 hover:border-amber-400/70 text-amber-300 transition-all duration-300 backdrop-blur-sm group"
        >
          {isAudioOn ? (
            /* Speaker with sound waves */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            /* Speaker muted */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
          <span className="text-xs font-medium tracking-wide">
            {isAudioOn ? 'Mute' : 'Play Audio'}
          </span>
        </button>

        {/* Quote Content */}
        <div className="relative z-10 flex items-center justify-center h-full p-8 md:p-12" style={{ minHeight: '480px' }}>
          <blockquote className="space-y-6 max-w-2xl text-center">
            {/* Decorative top element */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 bg-amber-400/70" />
              <span className="text-amber-400/80 text-xs tracking-widest uppercase font-medium">Bhagavad Gita</span>
              <div className="h-px w-12 bg-amber-400/70" />
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed italic font-light drop-shadow-lg">
              "{currentQuote.text}"
            </p>

            {currentQuote.chapter && (
              <footer className="pt-4">
                <span className="text-sm text-amber-300/80 tracking-wide font-medium">
                  — {currentQuote.chapter}
                </span>
              </footer>
            )}
          </blockquote>
        </div>
      </div>
    </Container>
  );
};

export default QuoteComponent;