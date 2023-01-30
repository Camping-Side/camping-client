/*
module.exports = {
  apps: [
    {
      name: "camping",
      script: "./app.js",
      env_production: {
      HOST: "127.0.0.1",
        PORT: 3000,
        NODE_ENV: "production",
      },
      env_development: {
      HOST: "127.0.0.1",
        PORT: 3000,
        NODE_ENV: "development",
      },
    },
  ],
};
*/

module.exports = {
  apps: [
    {
      name: "camping",
      // 스크립트 실행
      //cwd: "/home/ubuntu/camping_client",
      script: "npm",
      //args: "run start",
      // 인스턴스 개수
      instances: 2,
      autorestart: true,
      // 파일 변경시 재시작 옵션
      watch: false,
      // 스케줄러 재시작 시간 설정
      // cron_restart: "0 0 * * *",
      // 메모리 기반 재시작 설정
      // max_memory_restart: "1G" or "300M" 등 세팅
      // 재시작 딜레이
      // restart_delay: 3000,
      env: {
        //HOST: "127.0.0.1",
        PORT: 3000,
        NODE_ENV: "development",
      },
      // 배포 환경에서 적용될 설정
      // pm2 start ecosystem.config.js --env production
      env_production: {
        //HOST: "127.0.0.1",
        PORT: 3000,
        NODE_ENV: "production",
      },
      output: "./logs/console.log",
      error: "./logs/consoleError.log",
    },
  ],
  // deploy: {
  //   production: {
  //     // sample
  //     user: 'node',
  //     host: '123.12.123.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy':
  //       'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
