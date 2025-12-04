'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

interface ContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

interface GitHubData {
  contributions: ContributionDay[][];
  totalContributions: number;
}

const GitHubActivity = () => {
  const GITHUB_USERNAME = 'kaustubh1211';
  
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`);
        const jsonData = await response.json();
        
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, day: ContributionDay) => {
    setHoveredDay(day);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMonthLabels = () => {
    if (!data) return [];
    const months: string[] = [];
    const seenMonths = new Set<string>();
    
    data.contributions.forEach(week => {
      week.forEach(day => {
        const month = new Date(day.date).toLocaleDateString('en-US', { month: 'short' });
        if (!seenMonths.has(month)) {
          seenMonths.add(month);
          months.push(month);
        }
      });
    });
    
    return months;
  };

  return (
    <section className="bg-black text-white ">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
              Featured
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              GitHub Activity
            </h2>
            
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
                <span className="text-gray-400 text-sm">Loading contributions...</span>
              </div>
            ) : data ? (
              <p className="text-gray-400">
                Total: <span className="text-white font-semibold">{data.totalContributions.toLocaleString()}</span> contributions in the last year
              </p>
            ) : null}
          </div>

          {/* GitHub Contribution Graph */}
          <div className="border border-[#090a0a] rounded-xl    md:overflow-hidden overflow-x-auto relative">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : data ? (
              <div className="min-w-[700px]">
                {/* Month Labels */}
                <div className="flex gap-1 mb-2 text-xs text-gray-500 pl-8">
                  {getMonthLabels().map((month, idx) => (
                    <div key={idx} className="flex-1 text-left">
                      {month}
                    </div>
                  ))}
                </div>

                {/* Contribution Grid */}
                <div className="flex gap-1">
                  {/* Day Labels */}
                  <div className="flex flex-col gap-1 text-xs text-gray-500 pr-2">
                    <div style={{ height: '10px' }}>Mon</div>
                    <div style={{ height: '10px' }}></div>
                    <div style={{ height: '10px' }}>Wed</div>
                    <div style={{ height: '10px' }}></div>
                    <div style={{ height: '10px' }}>Fri</div>
                    <div style={{ height: '10px' }}></div>
                    <div style={{ height: '10px' }}>Sun</div>
                  </div>

                  {/* Weeks */}
                  <div className="flex gap-1 contain">
                    {data.contributions.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            onMouseMove={(e) => handleMouseMove(e, day)}
                            onMouseLeave={handleMouseLeave}
                            className="cursor-pointer transition-all hover:ring-2 hover:ring-white/50 rounded-sm"
                            style={{
                              width: '8px',
                              height: '9px',
                              backgroundColor: day.color,
                              borderRadius: '2px',
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            
            {/* Contribution Legend */}
            <div className="flex items-center justify-end gap-2 mt-6 text-xs text-gray-500">
              <span>Less</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-[#ebedf0] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#9be9a8] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#40c463] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#30a14e] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#216e39] rounded-sm"></div>
              </div>
              <span>More</span>
            </div>

            {/* Tooltip */}
            {hoveredDay && (
              <div
                className="fixed z-50 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm pointer-events-none shadow-xl"
                style={{
                  left: `${mousePosition.x + 10}px`,
                  top: `${mousePosition.y - 40}px`,
                }}
              >
                <div className="font-semibold">
                  {hoveredDay.contributionCount} contribution{hoveredDay.contributionCount !== 1 ? 's' : ''}
                </div>
                <div className="text-gray-400 text-xs">
                  {formatDate(hoveredDay.date)}
                </div>
              </div>
            )}
          </div>

          {/* View GitHub Button */}
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#21262d] border border-[#30363d] rounded-lg hover:bg-[#30363d] hover:border-[#8b949e] transition-all text-sm group"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>View on GitHub</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default GitHubActivity;