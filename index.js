const express = require('./config/express');
const {logger} = require('./config/winston');

const port = 3000;
express().listen(port, '0.0.0.0');
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
//네이버 로그인
//console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');