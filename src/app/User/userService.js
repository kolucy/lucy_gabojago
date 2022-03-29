const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// 1-1. 회원가입
exports.signupToken = async function (signupuserIdx) {
    try {
        //토큰 생성 Service - try~catch 작성
        let token = await jwt.sign(
            {
              userIdx: signupuserIdx,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
              expiresIn: "365d",
              subject: "User",
            } // 유효 기간 365일
          );
        console.log({ 'userIdx': signupuserIdx, 'jwt': token });
        //로그인 시 발급되는 jwt를 DB에 저장
        const connection = await pool.getConnection(async (conn) => conn);
        const userToken = await userDao.updateUserToken(connection, [token, signupuserIdx]);
        connection.release();
        return response(baseResponse.SIGNUP_SUCCESS, {"jwt" :token});

    } catch (err) {
        logger.error(`App - signupToken Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 1-2. 로그인
exports.loginToken = async function (loginuserIdx) {
    try {
        //토큰 생성 Service - try~catch 작성
        let token = await jwt.sign(
            {
              userIdx: loginuserIdx,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
              expiresIn: "365d",
              subject: "User",
            } // 유효 기간 365일
          );
        console.log({ 'userIdx': loginuserIdx, 'jwt': token });
          //로그인 시 발급되는 jwt를 DB에 저장
        const connection = await pool.getConnection(async (conn) => conn);
        const userToken = await userDao.updateUserToken(connection, [token, loginuserIdx]);
        connection.release();
        //const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        //console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        //return(token)
        return response(baseResponse.NAVER_LOGIN_SUCCESS, {"jwt" :token});

    } catch (err) {
        logger.error(`App - loginToken Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 2. 로그아웃 API
exports.logoutUser = async function(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        //transaction
        await connection.beginTransaction();

        //User 테이블의 token 값을 null로 초기화해줌
        await userDao.eraseUserToken(connection, userIdx);

        await connection.commit();
        return response(baseResponse.SUCCESS);
    }
    catch(err){
        await connection.rollback();
        logger.error(`App - logoutUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    finally{
        connection.release();
    }
}