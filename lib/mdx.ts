import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(contentDirectory);
  
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        image: data.image,
        tags: data.tags,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { content, data } = matter(fileContent);
  
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
  });
  
  return {
    slug,
    frontmatter: data,
    content: mdxContent,
  };
}