const jwtMiddleware = require("../../../config/jwtMiddleware");
const folderProvider = require("../../app/Folder/folderProvider");
const folderService = require("../../app/Folder/folderService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const requestIp = require('request-ip');
const {logger} = require("../../../config/winston");

//const naverOptions = require('../../../config/naverOptions');
//const regexEmail = require("regex-email");
//const http = require('http');

//로그인
// var client_id = '';
// var client_secret = '';
// var state = "RAMDOM_STATE";
// var redirectURI = encodeURI("http://127.0.0.1:3000/auth/naver");
// var api_url = "";
//var api_url = "http://127.0.0.1:3000/naverlogin";

// exports.getnaverlogin = function(req, res) {
//     api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
//     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//     res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
//     res.redirect(api_url);
// }

//주석처리
// exports.getAccessToken = async function(req, res) {
//     code = req.query.code;
//     state = req.query.state;
//     api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
//     var request = require('request');
//     var options = {
//         url: api_url,
//         headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
//      };
//     //console.log(res);//찍어보기
//     request.get(options, async function (error, resp, body) {
//       if (!error && resp.statusCode == 200) {
//         //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//         //res.end(body);
//         console.log(body); //찍어보기 - access_token 발급
//         //console.log(typeof(body));
//         const bodyparse = JSON.parse(body)
//         const access_token = bodyparse.access_token;
//         console.log(access_token);
//         if (!access_token) {
//             //validation 필요
//             //return res.send(response(baseResponse.Err, ErrName));
//             console.log('error');
//         } else {
//             const userCheckbyToken = await folderProvider.getNaverInfo(access_token);
//             return res.send(response(baseResponse.SUCCESS, userCheckbyToken));
//         }
//       } else {
//         //res.status(response.statusCode).end();
//         console.log('error = ' + response.statusCode);
//         return res.status(response.statusCode).end();
//       }
//     });
// }


//주석처리
// exports.getNaverInfo = async function(access_token) {
//     var token = access_token;
//     var header = "Bearer " + token; // Bearer 다음에 공백 추가
//     var api_url = 'https://openapi.naver.com/v1/nid/me';
//     var request = require('request');
//     var options = {
//        url: api_url,
//        headers: {'Authorization': header}
//     };
//     request.get(options, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//             //res.end(body);
//             console.log(body); //찍어보기
//             const bodyparse = JSON.parse(body);
//             const email = bodyparse.response.email;
//             console.log(email);
//         } else {
//             console.log('error');
//             if(response != null) {
//                 //res.status(response.statusCode).end();
//                 console.log('error = ' + response.statusCode);
//             }
//         }
//     });
// }


/** 
 * API No. 1
 * API Name : 로그인 API (JWT 생성)
 * [POST] /auth/naver
 */

     /**
     * Body: access_token
     */
    
exports.getNaverJWT = async function(req, res) {
        const access_token = req.body.access_token;
        console.log(access_token);
        if(!access_token)
            return res.send(errResponse(baseResponse.ACCESS_TOKEN_EMPTY));
        const userCheckbyToken = await folderProvider.getNaverInfo(access_token);
        if(userCheckbyToken == null)
            return res.send(errResponse(baseResponse.NAVER_LOGIN_ERROR));
        else if(userCheckbyToken == 'error')
            return res.send(errResponse(baseResponse.ACCESS_TOKEN_NOT_VALID));
        else
            return res.send(userCheckbyToken);
};

/**
 * API No. 7
 * API Name : 캘린더 조회 API + JWT + Validation 
 * [GET] /app/calendar/:yearmonth
 */
 exports.getRandomResultDateList = async function (req, res) {

    /**
     * Path Variable: yearmonth
     */

    const userIdx = req.verifiedToken.userIdx;
    //const userIdx = req.params.userIdx;
    const yearmonth = req.params.yearmonth;
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

    logger.info(`App - client IP: ${ip}, userIdx: ${userIdx}, Accessing calendar API \n`);

    // errResponse 전달
    if (!userIdx) return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));
    if (!yearmonth) return res.send(errResponse(baseResponse.USER_YEARMONTH_EMPTY));

    // userIdx를 통한 randomresultdateList 검색 함수 호출 및 결과 저장
    const userjoindate = await folderProvider.retrieveUserJoinDate(userIdx);
    const monthlyAdventureTimes = await folderProvider.retrieveMonthlyAdventureTimes(userIdx, yearmonth);
    const randomresultdateList = await folderProvider.retrieveRandomResultDateList(userIdx, yearmonth);

    if(!userjoindate) return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST))
    if(monthlyAdventureTimes.length<1) return res.send(errResponse(baseResponse.FOLDER_MONTHLYADVENTURETIME_ERROR))
    if(!randomresultdateList) return res.send(errResponse(baseResponse.FOLDER_RANDOMRESULTDATELIST_NOT_EXIST))
    logger.info(`App - client IP: ${requestIp.getClientIp(req)}, userIdx: ${userIdx}, Get calendar API \n`);
    return res.send(response(baseResponse.SUCCESS, {userjoindate, monthlyAdventureTimes, randomresultdateList}));
};

// /**
//  * API No. 7
//  * API Name : 해당 년월의 유저 뽑기기록 날짜들 조회 API + JWT + Validation (JWT 적용 전)
//  * [GET] /app/randomresultdateList/:yearmonth
//  */
//  exports.getRandomResultDateList = async function (req, res) {

//     /**
//      * Path Variable: yearmonth
//      */

//     const userIdx = req.verifiedToken.userIdx;
//     //const userIdx = req.params.userIdx;
//     const yearmonth = req.params.yearmonth;
//     // errResponse 전달
//     if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
//     if (!yearmonth) return res.send(errResponse(baseResponse.USER_YEARMONTH_EMPTY));

//     // userIdx를 통한 randomresultdateList 검색 함수 호출 및 결과 저장
//     const userjoindate = await folderProvider.retrieveUserJoinDate(userIdx);
//     const monthlyAdventureTimes = await folderProvider.retrieveMonthlyAdventureTimes(userIdx, yearmonth);
//     const randomresultdateList = await folderProvider.retrieveRandomResultDateList(userIdx, yearmonth);

//     if(!userjoindate) return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST))
//     if(monthlyAdventureTimes.length<1) return res.send(errResponse(baseResponse.FOLDER_MONTHLYADVENTURETIME_ERROR))
//     if(!randomresultdateList) return res.send(errResponse(baseResponse.FOLDER_RANDOMRESULTDATELIST_NOT_EXIST))
//     return res.send(response(baseResponse.SUCCESS, {userjoindate, monthlyAdventureTimes, randomresultdateList}));
// };

// /**
//  * API No. 9
//  * API Name : 해당 월의 유저 총 모험 횟수 조회 API + JWT + Validation (JWT 적용 전)
//  * [GET] /app/monthlyadventuretimes/:yearmonth
//  */
//  exports.getMonthlyAdventureTimes = async function (req, res) {

//     /**
//      * Path Variable: yearmonth
//      */

//     const userIdx = req.verifiedToken.userIdx;
//     //const userIdx = req.params.userIdx;
//     const yearmonth = req.params.yearmonth;
//     // errResponse 전달
//     if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
//     if (!yearmonth) return res.send(errResponse(baseResponse.USER_YEARMONTH_EMPTY));

//     // userIdx를 통한 monthlyAdventureTimes 검색 함수 호출 및 결과 저장
//     const userjoindate = await folderProvider.retrieveUserJoinDate(userIdx);
//     const monthlyAdventureTimes = await folderProvider.retrieveMonthlyAdventureTimes(userIdx, yearmonth);

//     if(!userjoindate) return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST))
//     if(!monthlyAdventureTimes) return res.send(errResponse(baseResponse.FOLDER_MONTHLYADVENTURETIME_ERROR))
//     return res.send(response(baseResponse.SUCCESS, {userjoindate, monthlyAdventureTimes}));
// };

// /**
//  * API No. 10
//  * API Name : 해당 날짜의 뽑기기록 조회 API + JWT + Validation (JWT 적용 전)
//  * [GET] /app/randomresultList/:date
//  */
//  exports.getRandomResultList = async function (req, res) {

//     /**
//      * Path Variable: date
//      */

//     const userIdx = req.verifiedToken.userIdx;
//     //const userIdx = req.params.userIdx;
//     const date = req.params.date;
//     // errResponse 전달
//     if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
//     if (!date) return res.send(errResponse(baseResponse.USER_DATE_EMPTY));

//     // userIdx를 통한 randomresultList 검색 함수 호출 및 결과 저장
//     const userjoindate = await folderProvider.retrieveUserJoinDate(userIdx);
//     const randomresultList = await folderProvider.retrieveRandomResultList(userIdx, date);
//     //뽑기 개수 조회
//     const randomresultcount = await folderProvider.retrieveRandomResultCount(userIdx, date);

//     if(!userjoindate) return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST))
//     if(!randomresultList) return res.send(errResponse(baseResponse.FOLDER_RANDOMRESULTLIST_NOT_EXIST))
//     //뽑기 개수
//     if(randomresultcount.length<1) return res.send(errResponse(baseResponse.FOLDER_RANDOMRESULTCOUNT_ERROR))
//     return res.send(response(baseResponse.SUCCESS, {userjoindate, randomresultcount, randomresultList}));
// };


// /**
//  * API No. 14-1
//  * API Name : 폴더 기록하자 기록 API + JWT + Validation (JWT, Validation 적용 전)
//  * [POST] /app/folderrecording/:folderIdx
//  */
// //폴더 기록post api (별점, 사진, 일기)
// //폴더인 경우 폴더 folderidx 갖고와서 작성, 개별인 경우 randomresultidx 갖고와서 작성
//  exports.postFolderRecording = async function (req, res) {

//     /**
//      * Path Variable: folderIdx
//      * Body: recordingStar, recordingContent, recordingTitle, recordingImgUrl
//      */

//     const userIdx = req.verifiedToken.userIdx
//     //const userIdx = req.params.userIdx;
//     const folderIdx = req.params.folderIdx;
//     const {recordingStar, recordingContent, recordingTitle, recordingImgUrl1, recordingImgUrl2, recordingImgUrl3,
//         recordingImgUrl4, recordingImgUrl5, recordingImgUrl6, recordingImgUrl7, recordingImgUrl8, recordingImgUrl9, recordingImgUrl10} = req.body;

//     // 빈 값 체크
//     if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
//     if (!folderIdx) return res.send(errResponse(baseResponse.FOLDER_ITEMIDX_EMPTY));
//     if (!recordingStar) return res.send(errResponse(baseResponse.FOLDER_RECORDINGSTAR_EMPTY));
//     if (!recordingContent) return res.send(errResponse(baseResponse.FOLDER_RECORDINGCONTENT_EMPTY));

//     const userIdxCheckRows = await folderProvider.userIdxCheck(userIdx);
//     const folderIdxCheckRows = await folderProvider.folderIdxCheck(folderIdx);
//     const userIdxSameCheck = await folderProvider.userIdxSameCheck_Folder(folderIdx, userIdx);

//     if(userIdxCheckRows.length < 1) //존재하지 않는 유저
//         return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST));
//     else if(folderIdxCheckRows.length >= 1) //폴더가 이미 존재하면 안됨
//         return res.send(errResponse(baseResponse.RECORD_FOLDERIDX_ALREADY_EXIST));
//     else if(userIdxSameCheck == 'error')
//         return res.send(errResponse(baseResponse.FOLDERIDX_WRONG_USERIDX));
//     else{
//         // insertFolderRecording 함수 실행을 통한 결과 값을 addFolderRecordingResponse에 저장
//         const addFolderRecordingResponse = await folderService.insertFolderRecording(
//             folderIdx, recordingStar, recordingContent
//             );
//         // addFolderRecordingResponse 값을 json으로 전달
//         return res.send(addFolderRecordingResponse);
//     }
// };


// /**
//  * API No. 14-2
//  * API Name : 개별 기록하자 기록 API + JWT + Validation (JWT, Validation 적용 전)
//  * [POST] /app/eachrecording/:randomResultIdx
//  */
// //개별 기록post api (별점, 사진, 일기)
// //폴더인 경우 폴더 folderidx 갖고와서 작성, 개별인 경우 randomresultidx 갖고와서 작성
// exports.postEachRecording = async function (req, res) {

//     /**
//      * Path Variable: randomResultIdx
//      * Body: recordingStar, recordingContent
//      */

//     const userIdx = req.verifiedToken.userIdx
//     //const userIdx = req.params.userIdx;
//     const randomResultIdx = req.params.randomResultIdx;
//     const {recordingStar, recordingContent} = req.body;

//     // 빈 값 체크
//     if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
//     if (!randomResultIdx) return res.send(errResponse(baseResponse.FOLDER_ITEMIDX_EMPTY));
//     if (!recordingStar) return res.send(errResponse(baseResponse.FOLDER_RECORDINGSTAR_EMPTY));
//     if (!recordingContent) return res.send(errResponse(baseResponse.FOLDER_RECORDINGCONTENT_EMPTY));

//     const userIdxCheckRows = await folderProvider.userIdxCheck(userIdx);
//     const randomResultIdxCheckRows = await folderProvider.randomResultIdxCheck(randomResultIdx);
//     const userIdxSameCheck = await folderProvider.userIdxSameCheck(randomResultIdx, userIdx);

//     if(userIdxCheckRows.length < 1) //존재하지 않는 유저
//         return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST));
//     else if(randomResultIdxCheckRows.length >=1) //항목이 이미 존재하면 안됨
//         return res.send(errResponse(baseResponse.RECORD_RANDOMRESULTIDX_ALREADY_EXIST));
//     else if(userIdxSameCheck == 'error') 
//         return res.send(errResponse(baseResponse.RANDOMRESULTIDX_WRONG_USERIDX));
//     else{
//         // insertEachRecording 함수 실행을 통한 결과 값을 addEachRecordingResponse에 저장
//         const addEachRecordingResponse = await folderService.insertEachRecording(
//             randomResultIdx, recordingStar, recordingContent
//             );
//         // addEachRecordingResponse 값을 json으로 전달
//         return res.send(addEachRecordingResponse);
//     }
// };