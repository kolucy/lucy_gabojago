const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const folderDao = require("./folderDao");
const folderService = require("./folderService");
const userDao = require("../User/userDao");
const {response} = require("../../../config/response");

//로그인
// exports.checkEmail = async function (email) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const emailCheckResult = await folderDao.selectUserEmail(connection, email);

//   connection.release();
//   return emailCheckResult;
// };

// 1. 로그인
exports.getNaverInfo = async function (access_token) {
  var token = access_token;
  var header = "Bearer " + token; // Bearer 다음에 공백 추가
  var api_url = 'https://openapi.naver.com/v1/nid/me';
  var request = require('request');
  var options = {
    url: api_url,
    headers: { 'Authorization': header }
  };
  return new Promise(function(resolve, reject){
    request.get(options, async function(error, response, body){
      if(error) reject(error);
      else {
        if (!error && response.statusCode == 200) {
          //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
          //res.end(body);
          //console.log(body); //찍어보기
          const bodyparse = JSON.parse(body);
          const name = bodyparse.response.name;
          const email = bodyparse.response.email;
          console.log(email);
          if (!email) {
            //validation 필요
            //return res.send(response(baseResponse.Err, ErrName));
            console.log('No email Info');
          } else if (!name) {
            console.log('No name Info');
          } else {
            // exports.checkUserEmail = async function (email) {
            const connection = await pool.getConnection(async (conn) => conn);
            let emailCheckResult = await folderDao.getUserInfo(connection, email);
            //결과값 없으면 DB에 저장, 있으면 jwt
            if (emailCheckResult[0] == undefined) {
              const addUserResult = await folderDao.insertUserInfo(connection, [name, name, email]);
              //console.log(addUserResult);
              emailCheckResult = await folderDao.getUserInfo(connection, email);
              const signupuserIdx = emailCheckResult[0]["userIdx"];
              const signupToken = await folderService.signupToken(loginuserIdx);
              connection.release();
              resolve(signupToken);
            }
            else {
              const loginuserIdx = emailCheckResult[0]["userIdx"];
              const loginToken = await folderService.loginToken(loginuserIdx);
              connection.release();
              resolve(loginToken);
            }
            //return response(baseResponse.SUCCESS, {'userIdX': emailCheckResult[0], 'jwt': token});
          }
        } else if (response.statusCode == 401) {
          resolve('error');
        } else {
          console.log('error');
          if (response != null) {
            //res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
          }
          resolve(null);
        }
      }
    })
  });
}

// 7, 9, 10. 유저가 가입한 달 제공
exports.retrieveUserJoinDate = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const UserJoinDate = await folderDao.selectUserJoinDate(connection, userIdx);

  connection.release();
  return UserJoinDate;
};

// 7. 해당 년월의 유저 뽑기기록 날짜들 조회
exports.retrieveRandomResultDateList = async function (userIdx, yearmonth) {
  const connection = await pool.getConnection(async (conn) => conn);
  const RandomResultDateList = await folderDao.selectRandomResultDateList(connection, [userIdx, yearmonth]);

  connection.release();
  return RandomResultDateList;
};


// 9. 해당 월의 유저 총 모험 횟수 조회
exports.retrieveMonthlyAdventureTimes = async function (userIdx, yearmonth) {
  const connection = await pool.getConnection(async (conn) => conn);
  let monthlyAdventureTimes = await folderDao.selectMonthlyAdventureTimes(connection, [userIdx, yearmonth]);

  connection.release();
  monthlyAdventureTimes = String(monthlyAdventureTimes);
  //console.log(typeof(monthlyAdventureTimes))
  return monthlyAdventureTimes;
};

// 10. 해당 날짜의 뽑기기록 조회
exports.retrieveRandomResultList = async function (userIdx, date) {
  const connection = await pool.getConnection(async (conn) => conn);
  const RandomResultList = await folderDao.selectRandomResultList(connection, [userIdx, date]);

  connection.release();
  return RandomResultList;
};

// 10. 해당 날짜의 뽑기 개수 조회
exports.retrieveRandomResultCount = async function (userIdx, date) {
  const connection = await pool.getConnection(async (conn) => conn);
  const RandomResultCount = await folderDao.selectRandomResultCount(connection, [userIdx, date]);

  connection.release();
  return RandomResultCount;
};

//14 validation_ userIdx 존재하는지 체크
exports.userIdxCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdxCheckResult = await folderDao.selectUserIdx(connection, userIdx);

  connection.release();
  
  return userIdxCheckResult;
}

//14 validation_ folderIdx 존재하는지 체크
exports.folderIdxCheck = async function (folderIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  let folderIdxCheckResult = await folderDao.selectFolderIdx(connection, folderIdx);
  if(!folderIdxCheckResult) folderIdxCheckResult = 'empty';

  connection.release();

  return folderIdxCheckResult;
}

//14 validation_ randomResultIdx 존재하는지 체크
// exports.randomResultIdxCheck = async function (randomResultIdx) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   let randomResultIdxCheckResult = await folderDao.selectRandomResultIdx(connection, randomResultIdx);
//   if(!randomResultIdxCheckResult) randomResultIdxCheckResult = 'empty';

//   connection.release();

//   return randomResultIdxCheckResult;
// }

//14-1 validation_ folderIdx의 userIdx와 넘겨받은 userIdx 값이 같은지 확인
exports.userIdxSameCheck_Folder = async function(folderIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  let folderUserIdxCheckResult = await folderDao.selectFolderUserIdx(connection, folderIdx);

  if(!folderUserIdxCheckResult)
      folderUserIdxCheckResult = 'empty';
  else if(userIdx != folderUserIdxCheckResult.userIdx)
      folderUserIdxCheckResult = 'error';

  connection.release();
  return folderUserIdxCheckResult;
}

//14-2 validation_ randomResultIdx의 userIdx와 넘겨받은 userIdx 값이 같은지 확인
exports.userIdxSameCheck_Each = async function (randomResultIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  let randomResultUserIdxCheckResult = await folderDao.selectRandomResultUserIdx(connection, randomResultIdx);

  if(!randomResultUserIdxCheckResult){
      randomResultUserIdxCheckResult = 'empty'
  }
  else if(userIdx != randomResultUserIdxCheckResult.userIdx)
      randomResultUserIdxCheckResult = 'error';

  //console.log("randomResultUserIdxCheckResult: ", randomResultUserIdxCheckResult);
  connection.release();
  return randomResultUserIdxCheckResult;
}


//11 validation_ randomResultIdx의 userIdx와 넘겨 받은 userIdx 값이 일치하는지 확인(배열)
exports.userIdxSameCheck = async function (randomResultIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  let randomResultUserIdxCheckResult;
  for (var i = 0; i < randomResultIdx.length; i++) {
    randomResultUserIdxCheckResult = await folderDao.selectRandomResultUserIdx(connection, randomResultIdx[i]);
    if (userIdx != randomResultUserIdxCheckResult[0].userIdx) {
      randomResultUserIdxCheckResult = 'error';
      break;
    }
  }
  connection.release();
  return randomResultUserIdxCheckResult;
}

/*
async function (error, response, body) {
    console.log(response.statusCode)
    if (!error && response.statusCode == 200) {
      //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      //res.end(body);
      //console.log(body); //찍어보기
      const bodyparse = JSON.parse(body);
      const name = bodyparse.response.name;
      const email = bodyparse.response.email;
      console.log(email);
      if (!email) {
        //validation 필요
        //return res.send(response(baseResponse.Err, ErrName));
        console.log('No email Info');
      } else if (!name) {
        console.log('No name Info');
      } else {
        // exports.checkUserEmail = async function (email) {
        const connection = await pool.getConnection(async (conn) => conn);
        let emailCheckResult = await folderDao.getUserInfo(connection, email);
        console.log('이거출력');
        console.log(emailCheckResult[0]);
        //결과값 없으면 DB에 저장, 있으면 jwt
        if (emailCheckResult[0] == undefined) {
          const addUserResult = await folderDao.insertUserInfo(connection, [name, name, email]);
          console.log(addUserResult);
          emailCheckResult = await folderDao.getUserInfo(connection, email);
        }
        const secret_config = require("../../../config/secret");
        const jwt = require("jsonwebtoken");
        //토큰 생성 Service - try~catch 작성
        let token = await jwt.sign(
          {
            userIdx: emailCheckResult[0]["userIdx"],
          }, // 토큰의 내용(payload)
          secret_config.jwtsecret, // 비밀키
          {
            expiresIn: "365d",
            subject: "User",
          } // 유효 기간 365일
        );
        console.log(token);
        console.log({ 'userIdx': emailCheckResult[0]["userIdx"], 'jwt': token });
        connection.release();
        result = token;
        //return response(baseResponse.SUCCESS, {'userIdX': emailCheckResult[0], 'jwt': token});
      }
    } else if (response.statusCode == 401) {
      console.log("에러나와야함");
      result = 'error';
    } else {
      console.log('error');
      if (response != null) {
        //res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
      result = null;
    }
  });
  return result;
}
*/