'use client';

import React, { useState } from 'react';
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

interface GitHubActivityClientProps {
  data: GitHubData | null;
  username: string;
}

const GitHubActivityClient = ({ data, username }: GitHubActivityClientProps) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, day: ContributionDay) => {
    setHoveredDay(day);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => setHoveredDay(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
    <section className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors ">
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
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Featured</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">GitHub Activity</h2>
            {data ? (
              <p className="text-gray-600 dark:text-gray-400">
                Total:{' '}
                <span className="text-gray-900 dark:text-white font-semibold">
                  {data.totalContributions.toLocaleString()}
                </span>{' '}
                contributions in the last year
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Unable to load contribution data</p>
            )}
          </div>

          {/* Graph Card */}
          <div className=" rounded-xl p-6 ">
            {data ? (
              <>
                {/* Scrollable wrapper — hides scrollbar on mobile */}
                <div
                  className="overflow-x-auto"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>{`.gh-scroll::-webkit-scrollbar { display: none; }`}</style>

                  <div className="gh-scroll min-w-[600px]">
                    {/* Month Labels */}
                    <div className="flex gap-[3px] mb-2 pl-0">
                      {getMonthLabels().map((month, idx) => (
                        <div
                          key={idx}
                          className="flex-1 text-left text-[11px] text-gray-500 dark:text-gray-500"
                        >
                          {month}
                        </div>
                      ))}
                    </div>

                    {/* Contribution Grid — NO day labels */}
                    <div className="flex gap-[3px] w-full">
                      {data.contributions.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px] flex-1">
                          {week.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              onMouseMove={e => handleMouseMove(e, day)}
                              onMouseLeave={handleMouseLeave}
                              className="cursor-pointer transition-transform hover:scale-125 hover:ring-1 hover:ring-white/30 rounded-sm w-full aspect-square"
                              style={{
                                backgroundColor: day.color,
                                borderRadius: '3px',
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-5 text-xs text-gray-500 dark:text-gray-500">
                  <span>Less</span>
                  <div className="flex gap-1.5">
                    {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map(bg => (
                      <div
                        key={bg}
                        className="w-[13px] h-[13px] rounded-sm dark:first:bg-gray-800"
                        style={{ backgroundColor: bg }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-500">
                Failed to load GitHub contributions
              </div>
            )}

            {/* Tooltip */}
            {hoveredDay && (
              <div
                className="fixed z-50 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm pointer-events-none shadow-xl"
                style={{
                  left: `${mousePosition.x + 12}px`,
                  top: `${mousePosition.y - 44}px`,
                }}
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {hoveredDay.contributionCount} contribution
                  {hoveredDay.contributionCount !== 1 ? 's' : ''}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  {formatDate(hoveredDay.date)}
                </div>
              </div>
            )}
          </div>

          {/* View GitHub Button */}
          {/* <motion.a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm group text-gray-900 dark:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
          </motion.a> */}
        </motion.div>
      </Container>
    </section>
  );
};

export default GitHubActivityClient;