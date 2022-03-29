const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

const folderProvider = require("./folderProvider");
const folderDao = require("./folderDao");
const userDao = require("../User/userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// //14-1 폴더 기록
// exports.insertFolderRecording = async function (folderIdx, recordingStar, recordingContent, recordingTitle, recordingImgUrl1, recordingImgUrl2,
//     recordingImgUrl3, recordingImgUrl4, recordingImgUrl5, recordingImgUrl6, recordingImgUrl7,
//     recordingImgUrl8, recordingImgUrl9, recordingImgUrl10) {
//     try {

//         // 쿼리문에 사용할 변수 값을 배열 형태로 전달
//         const insertFolderRecordingParams = [folderIdx, recordingStar, recordingContent, recordingTitle, recordingImgUrl1, recordingImgUrl2,
//             recordingImgUrl3, recordingImgUrl4, recordingImgUrl5, recordingImgUrl6, recordingImgUrl7,
//             recordingImgUrl8, recordingImgUrl9, recordingImgUrl10];
//         console.log(insertFolderRecordingParams);
//         const connection = await pool.getConnection(async (conn) => conn);

//         const folderRecordingResult = await folderDao.insertFolderRecording(connection, insertFolderRecordingParams);
//         connection.release();
//         return response(baseResponse.SUCCESS);

//     } catch (err) {
//         logger.error(`App - insertFolderRecording Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };


// //14-2 개별 기록
// exports.insertEachRecording = async function (randomResultIdx, recordingStar, recordingContent) {
//     try {

//         // 쿼리문에 사용할 변수 값을 배열 형태로 전달
//         const insertEachRecordingParams = [randomResultIdx, recordingStar, recordingContent];
//         console.log(insertEachRecordingParams);
//         const connection = await pool.getConnection(async (conn) => conn);

//         const eachRecordingResult = await folderDao.insertEachRecording(connection, insertEachRecordingParams);
//         connection.release();
//         return response(baseResponse.SUCCESS);

//     } catch (err) {
//         logger.error(`App - insertEachRecording Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };

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