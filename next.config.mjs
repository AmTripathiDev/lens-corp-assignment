/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "my-lens-bucket.s3.ap-south-1.amazonaws.com",
      "blob:http://localhost:3000/",
    ],
  },
};

export default nextConfig;
  