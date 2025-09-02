import path from 'path';
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const webpackConfig = (config: Configuration): Configuration => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@components': path.resolve(__dirname, 'src/components'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@utils': path.resolve(__dirname, 'src/utils'),
    };
    return config;
};

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/t/p/**',
            },
        ],
    },
    webpack: webpackConfig,
};

export default nextConfig;
