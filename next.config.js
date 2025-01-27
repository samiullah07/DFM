/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
};

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
    });

    return config;
  },
};