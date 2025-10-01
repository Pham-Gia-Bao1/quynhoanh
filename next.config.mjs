/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.pravatar.cc", // avatar random
      "source.unsplash.com", // ảnh review
      "images.unsplash.com", // nếu dùng link trực tiếp của Unsplash,
      "www.pinterest.com", // ảnh review
      "i.pinimg.com"
    ],
  },
};

export default nextConfig;
