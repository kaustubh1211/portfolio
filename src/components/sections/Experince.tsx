'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ExternalLink } from 'lucide-react';
import Container from '../ui/Container';
interface ExperienceItem {
  id: number;
  company: string;
  logo: string;
  position: string;
  duration: string;
  location: string;
  status: 'Working' | 'Completed';
  technologies: string[];
  description: string;
  website?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Tech Company",
    logo: "/images/company-logo.png",
    position: "Founding Frontend Engineer",
    duration: "August 2025 - Present",
    location: "United States (Remote)",
    status: "Working",
    technologies: ["TypeScript", "React", "Next.js"],
    description: "Building scalable web applications with modern technologies.",
    website: "https://company.com"
  },
  // Add more experiences here
];

const Experience: React.FC = () => {
  return (
    <section className="bg-black text-white py-20">
      <Container className="py-16">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="space-y-2">
            <h2 className="text-sm text-gray-400 uppercase tracking-wider">Featured</h2>
            <h3 className="text-4xl font-bold">Experience</h3>
          </div>

          {/* Experience List */}
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0 ">
                    <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden relative">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-semibold">{exp.position}</h4>
                          {exp.website && (
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-400">{exp.duration}</p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-400">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                          exp.status === 'Working'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-gray-500/10 text-gray-500'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {exp.status}
                      </span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-900 rounded text-sm text-gray-300 border border-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center pt-8">
            <a
              href="/work"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              View all experience
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Experience;