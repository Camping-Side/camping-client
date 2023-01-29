module.exports = {
  apps: [
    {
      name: "camping",
      script: "./.next/server/pages/_app.js",
      env_production: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: "production",
      },
      env_development: {
        HOST: '0.0.0.0',
        PORT: 3000,
        NODE_ENV: "development",
      },
    },
  ],
};
