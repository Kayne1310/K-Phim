/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.ophim.live',
            },
        ],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    },
};

export default nextConfig;
