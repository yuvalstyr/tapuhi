module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
}
