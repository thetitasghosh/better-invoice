/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eejlmzdeaflanwjvbglh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
