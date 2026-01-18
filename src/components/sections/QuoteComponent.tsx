import React from 'react';
import Container from '../ui/Container';

interface Quote {
  text: string;
  chapter?: string;
}

const bhagavadGitaQuotes: Quote[] = [
  {
    text: "You have the right to work, but never to the fruit of work.",
    chapter: "Chapter 2, Verse 47"
  },
  {
    text: "The soul is neither born, and nor does it die.",
    chapter: "Chapter 2, Verse 20"
  },
  {
    text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    chapter: "Chapter 6, Verse 19"
  },
  {
    text: "Happiness and distress are temporary. They come and go like winter and summer seasons.",
    chapter: "Chapter 2, Verse 14"
  },
  {
    text: "Perform your duty and abandon all attachment to success or failure. Such evenness of mind is called yoga.",
    chapter: "Chapter 2, Verse 48"
  },
  {
    text: "One who has control over the mind is tranquil in heat and cold, in pleasure and pain, and in honor and dishonor.",
    chapter: "Chapter 6, Verse 7"
  },
  {
    text: "There is neither this world, nor the world beyond, nor happiness for the one who doubts.",
    chapter: "Chapter 4, Verse 40"
  },
  {
    text: "I can become time, the great destroyer of the worlds, come here to destroy all people.",
    chapter: "Chapter 11, Verse 32"
  },
  {
    text: "The mind is restless and difficult to restrain, but it is subdued by practice and detachment.",
    chapter: "Chapter 6, Verse 35"
  },
  {
    text: "Better indeed is knowledge than practice; than knowledge, meditation is better; than meditation, renunciation of the fruits of action; peace immediately follows such renunciation.",
    chapter: "Chapter 12, Verse 12"
  }
];

interface QuoteComponentProps {
  random?: boolean; // If true, shows random quote, otherwise shows first one
  className?: string;
}

const QuoteComponent: React.FC<QuoteComponentProps> = ({ random = false, className = '' }) => {
  const getQuote = () => {
    if (random) {
      const randomIndex = Math.floor(Math.random() * bhagavadGitaQuotes.length);
      return bhagavadGitaQuotes[randomIndex];
    }
    return bhagavadGitaQuotes[0];
  };

  const currentQuote = getQuote();

  return (
    <Container>
      <div className={`p-6 transition-all duration-300 ${className}`}>
        <blockquote className="space-y-4">
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed italic">
            "{currentQuote.text}"
          </p>
          <footer className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              — Bhagavad Gita
            </span>
            {currentQuote.chapter && (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {currentQuote.chapter}
              </span>
            )}
          </footer>
        </blockquote>
      </div>
    </Container>
  );
};

export default QuoteComponent;
