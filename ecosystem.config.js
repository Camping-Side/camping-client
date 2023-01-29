module.exports = {
  apps: [
    {
      name: "camping",
      script: "./.next/server/pages/_app.js",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
