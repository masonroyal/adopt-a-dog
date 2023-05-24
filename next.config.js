const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['frontend-take-home.fetch.com'],
  },
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss";`,
  },
};

module.exports = nextConfig;
