'use client';

import { useState, useEffect } from 'react';

interface BlogActionsProps {
  slug: string;
  title: string;
}

export default function BlogActions({ slug, title }: BlogActionsProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  // Load likes from localStorage
  useEffect(() => {
    // Get total likes for this post (simulated from all users)
    const storedLikes = localStorage.getItem(`blog-total-likes-${slug}`);
    const userLiked = localStorage.getItem(`blog-user-liked-${slug}`);
    
    if (storedLikes) {
      setLikes(parseInt(storedLikes));
    } else {
      // Set initial random likes count (simulating existing likes)
      const initialLikes = Math.floor(Math.random() * 50) + 10;
      setLikes(initialLikes);
      localStorage.setItem(`blog-total-likes-${slug}`, initialLikes.toString());
    }
    
    if (userLiked === 'true') {
      setIsLiked(true);
    }
  }, [slug]);

  const handleLike = () => {
    if (isLiked) {
      // Unlike
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setIsLiked(false);
      localStorage.setItem(`blog-total-likes-${slug}`, newLikes.toString());
      localStorage.setItem(`blog-user-liked-${slug}`, 'false');
    } else {
      // Like with animation
      const newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
      localStorage.setItem(`blog-total-likes-${slug}`, newLikes.toString());
      localStorage.setItem(`blog-user-liked-${slug}`, 'true');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-3 py-6 border-y border-gray-200 dark:border-gray-800 my-8">
      {/* Like Button */}
      <div className="relative">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
            isLiked
              ? 'bg-red-50 dark:bg-red-950 border-red-500 text-red-600 dark:text-red-400'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isLiked ? 'scale-110' : ''}`}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="font-medium">{likes}</span>
        </button>

        {/* Like Animation */}
        {showLikeAnimation && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-ping">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Copy Link Button */}
      <div className="relative">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
        >
          {showCopied ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="font-medium">Share</span>
            </>
          )}
        </button>

        {/* Copy Success Popup */}
        {showCopied && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap animate-fade-in">
            Link copied to clipboard!
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-100"></div>
          </div>
        )}
      </div>

      {/* Comment Button (Coming Soon) */}
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
        title="Coming soon"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="font-medium">Comment</span>
      </button>
    </div>
  );
}