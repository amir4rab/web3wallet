const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public'
  },
  webpack: (config) => {
    config.optimization.splitChunks = false;
    return config;
  }
})


// module.exports = {
//   reactStrictMode: true,
//   webpack: (config) => {
//     config.optimization.splitChunks = false;
//     return config;
//   },
// }
