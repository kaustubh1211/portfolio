'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import Container from '../ui/Container';

interface Project {
  id: number;
  name: string;
  tagline: string;
  status: 'Live' | 'In Development' | 'On-Going';
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  
  
  {
    id: 0,
    name: "Techluminix Portfolio Website",
    tagline: "Company Portfolio Built with Next.js and Tailwind CSS",
    status: "Live",
    techStack: ["Next.js", " javascript", "Tailwind CSS",  "Framer Motion" , "SEO Optimization"],
    highlights: [
      "Developed a fully responsive and visually engaging portfolio website for Techluminix using Next.js and Tailwind CSS.",
      "Implemented Framer Motion to create smooth, modern animations and interactive UI effects.",
      "Improved Core Web Vitals and overall performance through optimized images, dynamic imports, code-splitting, and SEO best practices.",
      "Enhanced SEO ranking by implementing meta tags, structured content, optimized components, and improved lighthouse scores.",
      "Focused on speed, clean animations, and brand-focused design for better user experience."
    ],
    liveUrl: "https://techluminix.com/",

  },
  {
    id: 1,
    name: "Jeevandhara Admin Panel",
    tagline: "E-Commerce + MLM + Recharge System",
    status: "Live",
    techStack: ["React", "Node.js", "PostgreSQL", "Express", "Tailwind CSS"],
    highlights: [
      "Worked on Admin dashboard frontend + backend APIs, product handling, user management, MLM logic, recharge handling.",
      "Built scalable server backend with authentication & protected routes.",
    ],
    liveUrl: "https://admin.jeevandharadigital.in/",
    // githubUrl: "#",
  },

  {
    id: 3,
    name: "Speaklingo",
    tagline: "Language Learning App",
    status: "Live",
    techStack: ["React", "Tailwind CSS", "Node.js", "WebSocket", "Firebase"],
    highlights: [
      "Real-time learning system with chat, recognition, and interactive language modules.",
    ],
    githubUrl: "#",
  },

];

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0); // Open first project by default

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'On-Going':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'In Development':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-400';
      case 'On-Going':
        return 'bg-blue-400';
      case 'In Development':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <section className="bg-black text-white py-20">
      <Container>
        <div className="space-y-10">
          {/* Section Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
            <p className="text-gray-400">Showcasing my work across web development and full-stack solutions</p>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id;
              
              return (
                <div
                  key={project.id}
                  className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900/40 to-black/60 hover:border-gray-700 transition-all duration-300"
                >
                  {/* Collapsed Header */}
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="w-full px-5 py-4 text-left hover:bg-gray-900/40 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Project Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-base">{project.name}</h4>
                          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${getStatusColor(project.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(project.status)} ${project.status === 'Live' ? 'animate-pulse' : ''}`} />
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{project.tagline}</p>
                      </div>

                      {/* Expand Icon */}
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {/* Tech Stack Preview (Collapsed) */}
                    {!isExpanded && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        {project.techStack.slice(0, 4).map((tech, idx) => (
                          <div key={idx} className="px-2 py-1 bg-gray-900/50 rounded text-[11px] text-gray-400 border border-gray-800">
                            {tech}
                          </div>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[11px] text-gray-500">+{project.techStack.length - 4}</span>
                        )}
                      </div>
                    )}
                  </button>

                  {/* Expanded Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 space-y-4 border-t border-gray-800/50 pt-5">
                      {/* Highlights */}
                      <div>
                        <ul className="space-y-2">
                          {project.highlights.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-400 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-gray-600 before:rounded-full">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack (Full) */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-medium">Tech Stack</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {project.techStack.map((tech, idx) => (
                            <div key={idx} className="px-2.5 py-1.5 bg-gray-900/50 rounded-lg text-xs text-gray-300 border border-gray-800 hover:border-gray-700 transition-colors">
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 transition-all duration-200 hover:border-gray-600"
                          >
                            <Github className="w-4 h-4" />
                            <span>View Code</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-sm text-blue-400 transition-all duration-200 hover:border-blue-500/40"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Projects;