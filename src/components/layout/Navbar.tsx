'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';
import ThemeToggle from '../ui/TheemeToggle';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [showLogo, setShowLogo] = useState(false);

  const tabs = [
    { id: 'work', label: 'Work', href: '/' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'blogs', label: 'Blogs', href: '/blogs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <Container>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center group h-10 overflow-hidden">
              <div 
                className={`w-10 h-10 rounded-full overflow-hidden transition-all duration-500 ${
                  showLogo 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-full opacity-0'
                }`}
              >
                <Image
                  src="/images/profile/profilegit.jpeg"
                  alt="Kaustubh"
                  width={40}
                  height={40}
                  className="object-cover group-hover:scale-110 transition-transform"
                  priority
                />
              </div>
            </Link>

            {/* Tabs */}
            <div className="flex gap-8 flex-1 ml-12">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2 group"
                >
                  <span className="relative z-10">{tab.label}</span>
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                      activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle/>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;