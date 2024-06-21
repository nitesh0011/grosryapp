
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
           {    hostname: 'localhost',},
           {    hostname: 'localhost:1337/uploads/',}
        ],
    },
};

export default  nextConfig;