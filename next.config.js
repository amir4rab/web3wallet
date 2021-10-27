const withPWA = require('next-pwa')
const costumeCache = require('./src/next-pwa/cache');

module.exports = withPWA({
  webpack: (config) => {
    config.optimization.splitChunks = false;
    return config;
  },
  reactStrictMode: true,
  pwa: {
    runtimeCaching: costumeCache,
    dest: 'public',
    runtimeCaching: [],
  },
  // swcMinify: true,
})
