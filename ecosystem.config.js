module.exports = {
  apps: [
    {
      name: "camping",
      script: "./_app.js",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
