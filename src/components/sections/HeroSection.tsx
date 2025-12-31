'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const techStack = [
    { 
      name: 'TypeScript', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      url: 'https://www.typescriptlang.org/'
    },
    { 
      name: 'React', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      url: 'https://react.dev/'
    },
    { 
      name: 'Next.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      url: 'https://nextjs.org/'
    },
    { 
      name: 'Node.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      url: 'https://nodejs.org/'
    },
    { 
      name: 'PostgreSQL', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      url: 'https://www.postgresql.org/'
    },
  ];

const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/kaustubh-patil-8645b923a/' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/kaustubh1211' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/Kaustub1111' },
    { 
      name: 'Peerlist', 
      icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Peerlist SVG Icon</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M8.87 3h6.26a6 6 0 0 1 5.963 5.337l.21 1.896c.131 1.174.131 2.36 0 3.534l-.21 1.896A6 6 0 0 1 15.13 21H8.87a6 6 0 0 1-5.963-5.337l-.21-1.896a16 16 0 0 1 0-3.534l.21-1.896A6 6 0 0 1 8.87 3"/><path d="M9 17v-4m0 0V7h4a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3z"/></g></svg>
      ), 
      href: 'https://peerlist.io/kaustubh20' 
    },
    { name: 'Email', icon: Mail, href: 'mailto:kasutuubh1211@gmail.com' },
  ];
  const highlights = [
    'Building scalable web applications with modern JavaScript frameworks',
    'Experienced in full-stack development from frontend to backend',
    'Strong focus on clean code, performance optimization & best practices',
    'Specialized in creating responsive UIs and RESTful APIs',
    'Proficient in database design, authentication systems & SEO optimization'
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center pt-5 transition-colors">
      <Container className="py-20">
        <div className="space-y-12">
          {/* Top: Profile Card with Grid Background */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl border overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-black/50 group transition-colors duration-500"
            style={{
              borderColor: isHovering 
              ? 'rgba(229, 231, 235, 0.8)' // gray-200 in light, gray-800 in dark
              : 'rgba(156, 163, 175, 0.5)', // gray-400 in light, gray-600 in dark
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Static Grid Pattern - Low Contrast */}
            <div 
              className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
                color: 'rgb(156 163 175)', // gray-400
              }}
            />

            {/* Torch/Spotlight Effect - Highlights Grid on Hover */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
                    rgba(156, 163, 175, 0.2) 0%, 
                    transparent 70%)`,
                }}
              >
                {/* High contrast grid visible only in torch area */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(107, 114, 128, 0.4) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(107, 114, 128, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                    maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
                      black 0%, 
                      transparent 70%)`,
                    WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
                      black 0%, 
                      transparent 70%)`,
                  }}
                />
              </motion.div>
            )}

            {/* Subtle color accent */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 opacity-30 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, 
                    rgba(96, 165, 250, 0.08), 
                    transparent 60%)`,
                }}
              />
            )}

            {/* Content */}
            <div className="relative z-20 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700/50 relative bg-gray-200 dark:bg-gray-900 shadow-xl">
                    <Image
                      src="/images/profile/profilegit.jpeg"
                      alt="Kaustubh - Full Stack Developer"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] border-white dark:border-gray-900 shadow-lg">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
                    Kaustubh Patil
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium mb-3">
                    Full Stack Web Developer
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Building scalable web solutions with modern technologies
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wider">
              About
            </h3>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Full-Stack Developer specializing in modern web technologies and production-ready solutions.
            </p>
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    x: -20,
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.3 + index * 0.15,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <span className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0">•</span>
                  <span className="text-sm sm:text-base leading-relaxed">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    filter: 'blur(8px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.3 + index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                >
                  <Image 
                    src={tech.logo} 
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/resume.pdf"
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105"
              target="_blank"
            >
              View Resume
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 bg-transparent text-gray-900 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all hover:scale-105"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="flex gap-3 pt-4"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={social.name}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    filter: 'blur(6px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 2.1 + index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;