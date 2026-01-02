'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import Container from '../ui/Container';

interface Role {
  position: string;
  type: string;
  duration: string;
  description: string[];
}

interface ExperienceItem {
  id: number;
  company: string;
  logo: string;
  location: string;
  status: 'Working' | 'Completed';
  dateRange: string;
  roles: Role[];
  technologies: string[];
  website?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Techluminix",
    logo: "/company/techluminix.svg",
    location: "Mumbai",
    status: "Working",
    dateRange: "Jan 2025 - Present",
    roles: [
      {
        position: "Full Stack Developer",
        type: "Full-time",
        duration: "04/2025 - Present",
        description: [
          "Developed & maintained full-stack e-commerce and admin systems using Next.js, Node.js, PostgreSQL & Prisma.",
          "Built REST APIs for authentication, product management, MLM structure & recharge system.",
          "Improved UI performance & responsiveness, integrated reusable design components.",
          "Worked on SEO optimization, deployment, database schema, version control & production scaling.",
        ]
      },
      {
        position: "Software Developer Intern",
        type: "Internship",
        duration: "01/2025 - 04/2025",
        description: [
          "Assisted in developing full-stack e-commerce applications.",
          "Learned backend development with Node.js and database management.",
        ]
      }
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "REST API"],
    website: "https://techluminix.com",
  },
  {
    id: 5,
    company: "Nextsoftinnovation",
    logo: "/company/nextsoftinnovation.svg",
    location: "Palghar",
    status: "Completed",
    dateRange: "Mar 2024 - Jun 2024",
    roles: [
      {
        position: "Software Engineer Intern",
        type: "Internship",
        duration: "03/2024 - 06/2024",
        description: [
          "Learned fundamentals of web development using HTML/CSS/JavaScript.",
          "Worked with AWS (EC2/S3) & Git for deployments and version control.",
        ]
      }
    ],
    technologies: ["HTML", "CSS", "JavaScript", "AWS", "Git"],
  },
];

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-20 transition-colors">
      <Container className="py-16">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">Experience</h2>
            <p className="text-gray-600 dark:text-gray-400">My professional journey through various roles and companies</p>
          </div>

          {/* Experience List with Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[28px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-gray-400 dark:to-gray-700 hidden md:block" />
            
            <div className="space-y-6">
              {experiences.map((exp, index) => {
                const isExpanded = expandedId === exp.id;
                
                return (
                  <div
                    key={exp.id}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[22px] top-[22px] w-[14px] h-[14px] rounded-full border-[3px] border-white dark:border-black z-10 hidden md:block"
                         style={{
                           background: exp.status === 'Working' 
                             ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                             : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
                         }}>
                      {exp.status === 'Working' && (
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
                      )}
                    </div>

                    {/* Experience Card */}
                    <div className="md:ml-12  rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/40 dark:to-black/60 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                      {/* Collapsed Header */}
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="w-full px-5 py-4 text-left hover:bg-gray-100/50 dark:hover:bg-gray-900/40 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between gap-4">
                          {/* Left: Logo + Company Info */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Company Logo */}
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-800 relative border border-gray-300 dark:border-gray-700/50">
                              <Image
                                src={exp.logo}
                                alt={exp.company}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Company Name & Primary Role */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="font-semibold text-base text-gray-900 dark:text-white">{exp.company}</h4>
                                {exp.status === 'Working' && (
                                  <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                                    <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {exp.roles[0].position}
                                {exp.roles.length > 1 && ` +${exp.roles.length - 1} more`}
                              </p>
                            </div>
                          </div>

                          {/* Right: Date & Location */}
                          <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="font-medium">{exp.dateRange}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          {/* Expand Icon */}
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>

                        {/* Mobile Date & Location */}
                        <div className="flex sm:hidden items-center gap-3 mt-3 text-xs text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.dateRange}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-5 pb-5 space-y-5 border-t border-gray-200 dark:border-gray-800/50 pt-5">
                          {/* Roles */}
                          {exp.roles.map((role, roleIndex) => (
                            <div key={roleIndex} className={`${roleIndex !== 0 ? 'pt-5 border-t border-gray-200 dark:border-gray-800/30' : ''}`}>
                              {/* Role Header */}
                              <div className="flex items-start gap-3 mb-3">
                                <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-sm">
                                    {roleIndex === 0 ? '💼' : '📋'}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-[15px] mb-1 text-gray-900 dark:text-white">{role.position}</h5>
                                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800/50 rounded border border-gray-300 dark:border-gray-700/50">
                                      {role.type}
                                    </span>
                                    <span>•</span>
                                    <span>{role.duration}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <ul className="space-y-2 ml-10">
                                {role.description.map((item, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-gray-400 dark:before:bg-gray-600 before:rounded-full">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {/* Technologies */}
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-800/30">
                            <div className="flex flex-wrap items-center gap-2">
                              {exp.technologies.map((tech, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-200 dark:bg-gray-900/50 rounded-lg text-xs text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-colors">
                                  <span>{tech}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Experience;