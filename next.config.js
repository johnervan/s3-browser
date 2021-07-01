const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
});
