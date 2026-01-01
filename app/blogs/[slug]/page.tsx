import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Container from '@/src/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogActions from '@/src/components/blog/BlogActions';

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
      <div className="bg-white dark:bg-black transition-colors min-h-screen">
        <article className="py-12 md:py-16">
          <Container className="max-w-3xl">
            {/* Back Button */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>

            {/* Header */}
            <header className="mb-12">
              {/* Tags */}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.frontmatter.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${tag}`}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-[1.2]">
                {post.frontmatter.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-gray-500">
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
              <div className="relative aspect-video rounded-xl overflow-hidden mb-12 bg-gray-100 dark:bg-gray-900">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Blog Actions - Like & Share */}
            <BlogActions
              slug={slug}
              title={post.frontmatter.title}
            />

            {/* Content */}
            <div className="blog-content">
              {post.content}
            </div>

            {/* Separator */}
            <div className="my-16 border-t border-gray-200 dark:border-gray-800"></div>

            {/* Bottom Actions */}
            <BlogActions 
              slug={slug}
              title={post.frontmatter.title}
            />

       

            

            {/* Footer */}
            <div className="flex items-center justify-between">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all posts
              </Link>
            </div>
          </Container>
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}