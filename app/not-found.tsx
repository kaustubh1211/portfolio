'use client';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center px-4 transition-colors">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 dark:text-gray-800 leading-none">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-gray-900 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link 
              href="/projects" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Projects
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link 
              href="/blogs" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}