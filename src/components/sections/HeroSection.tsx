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
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>

            {/* Name & Title */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2">
                Hi, I'm Kaustubh
              </h1>
              <h2 className="text-xl sm:text-2xl text-gray-400 font-light">
                Full Stack Web Developer
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 leading-relaxed"
          >
            I build interactive web applications with a focus on clean UI design. 
            Specialized in modern web technologies and passionate about creating 
            seamless user experiences.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
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
            transition={{ duration: 0.5, delay: 0.8 }}
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
            transition={{ duration: 0.5, delay: 1 }}
            className="flex gap-3 pt-4"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
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