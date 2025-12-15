'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Sparkles } from 'lucide-react';
import Container from '@/src/components/ui/Container';
import Link from 'next/link';

const ComingSoon = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center transition-colors pt-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          {/* Icon */}
          {/* <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div> */}

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Blogs Coming Soon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              I'm currently working on some exciting articles about web development, technology, and my coding journey.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 pt-8"
          >
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Technical Tutorials</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deep dives into React, Next.js, and modern web dev
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">Project Stories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Behind-the-scenes of my development projects
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Weekly Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regular posts about learning and building
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-8"
          >
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              In the meantime, check out my projects and experience
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105"
              >
                View Projects
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-transparent text-gray-900 dark:text-white rounded-lg font-medium border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>

          {/* Animated dots */}

        </motion.div>
      </Container>
    </section>
  );
};

export default ComingSoon;