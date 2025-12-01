'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [showLogo, setShowLogo] = useState(false);

  const tabs = [
    { id: 'work', label: 'Work', href: '/work' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'blogs', label: 'Blogs', href: '/blogs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Change 200 to any value you want
      if (window.scrollY > 800) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
      <Container className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Slides up from bottom */}
            <Link href="/" className="flex items-center group h-10 overflow-hidden">
              <div 
                className={`w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 transition-all duration-500 ${
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
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative text-gray-300 hover:text-white transition-colors py-2 group"
                >
                  <span className="relative z-10">{tab.label}</span>
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
                      activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;