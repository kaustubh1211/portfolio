
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import Container from '@/src/components/ui/Container';

export default async function BlogSection({
  searchParams,
}: {
  searchParams?: { tag?: string };
}) {
  const allPosts = await getAllPosts();
  
  // Get unique tags
  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags || []))
  ).sort();
  
  // Filter posts by tag
  const posts = searchParams?.tag
    ? allPosts.filter((post) => post.tags?.includes(searchParams.tag as string))
    : allPosts;

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white py-20 transition-colors min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Insights on modern web development, tutorials, and best practices
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Popular Tags</h2>
              {searchParams?.tag && (
                <Link
                  href="/blogs"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  Clear filter
                </Link>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const count = allPosts.filter((post) => 
                  post.tags?.includes(tag)
                ).length;
                const isActive = searchParams?.tag === tag;
                
                return (
                  <Link
                    key={tag}
                    href={`/blogs?tag=${tag}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    {tag} ({count})
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found with this tag.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group"
              >
                <article className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 bg-white dark:bg-black">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm">
                      <time className="text-gray-500 dark:text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      
                      <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                        Read more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}