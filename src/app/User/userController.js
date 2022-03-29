const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");

const requestIp = require('request-ip');
const {logger} = require("../../../config/winston");

/** 
 * API No. 1
 * API Name : 로그인 API (JWT 생성) 
 * [Post] /auth/naver
 */
 exports.getNaverJWT = async function(req, res) {
    /**
     * Body: access_token
     */
    const access_token = req.body.access_token;
    //console.log(access_token);
    if(!access_token)
        return res.send(errResponse(baseResponse.ACCESS_TOKEN_EMPTY))
    const userCheckbyToken = await userProvider.getNaverInfo(access_token);
    if(userCheckbyToken == null)
        return res.send(errResponse(baseResponse.NAVER_LOGIN_ERROR))
    else if(userCheckbyToken == 'error')
        return res.send(errResponse(baseResponse.ACCESS_TOKEN_NOT_VALID))
    else
        logger.info(`App - client IP: ${requestIp.getClientIp(req)}, Get Naverlogin API \n`);
        return res.send(userCheckbyToken);
}


/**
 * API NO. 2
 * API Name : 로그아웃 API
 * [GET] /app/user/logout
 */
 exports.logoutUser = async function (req, res){
    const userIdx = req.verifiedToken.userIdx;
    logger.info(`App - client IP: ${requestIp.getClientIp(req)}, userIdx: ${userIdx}, Accessing logout API \n`);

    if(!userIdx)
        return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));

    const userIdxCheckRows = await userProvider.userIdxCheck(userIdx);
    if(userIdxCheckRows.length < 1) //존재하지 않는 유저
        return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST));

    const logoutUserRow = await userService.logoutUser(userIdx);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}, userIdx: ${userIdx}, Get logout API \n`);
    return res.send(response(baseResponse.LOGOUT_SUCCESS));
};