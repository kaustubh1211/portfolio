// next.config.js
module.exports = {
  experimental: {
    turbo: true,  // Enable Turbopack if you want to use it
  },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
    domains: ['images.unsplash.com'], // Add this line
  },
};
