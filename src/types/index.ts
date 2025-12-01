export interface Experience {
  id: number;
  company: string;
  logo: string;
  position: string;
  duration: string;
  location: string;
  status: string;
  technologies: string[];
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface TechStack {
  name: string;
  icon: string;
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}