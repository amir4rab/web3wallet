const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack: (config) => {
    config.optimization.splitChunks = false;
    return config;
  },
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching: [],
  },
  swcMinify: true,
})
