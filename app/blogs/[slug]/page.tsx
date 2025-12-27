import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Container from '@/src/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug);
    
    return {
      title: `${post.frontmatter.title} | Kaustubh Blog`,
      description: post.frontmatter.description,
      keywords: post.frontmatter.tags,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        images: post.frontmatter.image ? [post.frontmatter.image] : [],
        type: 'article',
        publishedTime: post.frontmatter.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        images: post.frontmatter.image ? [post.frontmatter.image] : [],
      },
    };
  } catch {
    return {
      title: 'Blog Post Not Found | Kaustubh',
    };
  }
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug);
    
    return (
      <div className="bg-white dark:bg-black text-gray-900 dark:text-white py-20 transition-colors min-h-screen">
        <Container >
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <article>
            {/* Header */}
            <header className="mb-8">
              {/* Tags */}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.frontmatter.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${tag}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {post.frontmatter.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <time>
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.frontmatter.readTime || '5 min read'}</span>
              </div>
            </header>

            {/* Featured Image */}
            {post.frontmatter.image && (
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12 bg-gray-100 dark:bg-gray-900">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert prose-lg max-w-none
              prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800
              prose-img:rounded-lg
              prose-li:marker:text-blue-600 dark:prose-li:marker:text-blue-400
              prose-blockquote:border-l-blue-600 dark:prose-blockquote:border-l-blue-400
            ">
              {post.content}
            </div>
          </article>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    notFound();
  }
}