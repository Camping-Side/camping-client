#!/bin/bash
PROJECT_NAME="camping_client"

CLIENT_PATH="/home/ubuntu/$PROJECT_NAME/package.json"
DEPLOY_PATH=/home/ubuntu/$PROJECT_NAME/
DEPLOY_LOG_PATH="/home/ubuntu/$PROJECT_NAME/deploy.log"
DEPLOY_ERR_LOG_PATH="/home/ubuntu/$PROJECT_NAME/deploy_err.log"
APPLICATION_LOG_PATH="/home/ubuntu/$PROJECT_NAME/application.log"

echo "===== 배포 시작 : $(date +%c) =====" >> $DEPLOY_LOG_PATH

echo "> install 파일명: $CLIENT_PATH" >> $DEPLOY_LOG_PATH
yarn install 

echo "> build 시작" >> $DEPLOY_LOG_PATH
yarn build

echo "> PM2 start" >> $DEPLOY_LOG_PATH
nohup yarn pm2 start >> $APPLICATION_LOG_PATH 2> $DEPLOY_ERR_LOG_PATH &

sleep 3

echo "> 배포 종료 : $(date +%c)" >> $DEPLOY_LOG_PATH
