'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const Hero: React.FC = () => {
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
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yourusername' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/yourusername' },
    { name: 'Email', icon: Mail, href: 'mailto:your.email@example.com' },
  ];

  const highlights = [
    'Building scalable web applications with modern JavaScript frameworks',
    'Experienced in full-stack development from frontend to backend',
    'Strong focus on clean code, performance optimization & best practices',
    'Specialized in creating responsive UIs and RESTful APIs',
    'Proficient in database design, authentication systems & SEO optimization'
  ];

  return (
    <section className="min-h-screen bg-black text-white flex items-center pt-20">
      <Container className="py-20">
        <div className="space-y-12">
          {/* Top: Avatar + Name */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gray-800 relative">
                <Image
                  src="/images/profile/profilegit.jpeg"
                  alt="Kaustubh - Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
            </div>

            {/* Name & Title */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  Kaustubh Patil
              </h1>
              <h2 className="text-md sm:text-md text-gray-400 font-light">
                Full Stack Web Developer
              </h2>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">
              About
            </h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
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
                  className="flex items-start gap-3 text-gray-400"
                >
                  <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
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
            <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-all group"
                >
                  <Image 
                    src={tech.logo} 
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm text-gray-300">{tech.name}</span>
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
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all hover:scale-105"
              target="_blank"
            >
              View Resume
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 bg-transparent text-white rounded-lg font-medium border border-gray-700 hover:border-gray-500 transition-all hover:scale-105"
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
                    className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all"
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