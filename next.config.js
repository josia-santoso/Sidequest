const withPWA = require('next-pwa')({
    dest: 'public'
  })
 
 /** @type {import('next').NextConfig} */
 const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com"
    ],
  },
}

 
 module.exports = withPWA(nextConfig)
 // export default nextConfig;
 