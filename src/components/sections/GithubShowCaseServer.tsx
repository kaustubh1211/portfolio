

import GitHubActivityClient from "./GithubShowCase";


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

const GITHUB_USERNAME = 'kaustubh1211';

// This function runs on the server
async function getGitHubContributions(): Promise<GitHubData | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`,
      {
        // Cache for 1 hour, revalidate in background
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return null;
  }
}

// Server Component - no 'use client' directive
const GitHubActivity = async () => {
  // Data is fetched on the server at request/build time
  const data = await getGitHubContributions();
  
  return (
    <GitHubActivityClient 
      data={data} 
      username={GITHUB_USERNAME} 
    />
  );
};

export default GitHubActivity;