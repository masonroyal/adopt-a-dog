const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss";`,
  },
};

module.exports = nextConfig;
