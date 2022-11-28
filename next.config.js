const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
});
