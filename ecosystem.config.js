module.exports = {
  apps: [
    {
      name: "camping",
      script: "./.next/server/pages/_app.js",
      env_production: {
        HOST: '15.165.88.20',
        PORT: 3000,
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
