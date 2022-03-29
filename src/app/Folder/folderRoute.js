const { http } = require('winston');

module.exports = function(app) {
    const folder = require('./folderController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const auth = require('./folderController');

    //const naverOptions = require('../../../config/naverOptions');

    //네이버 로그인 -주석
    //app.get('/naverlogin', auth.getnaverlogin);

    //인가 코드 받기 - 주석
    //app.get('/auth/naver', auth.getAccessToken);

    //프로필조회 - 주석
    //app.get('/member', auth.getNaverInfo);

    // 1. 로그인 API (JWT 생성)
    //app.post('/auth/naver', auth.getNaverJWT);

    //profile account_email
    // app.get('/auth/kakao',(req,res)=>{
    //     const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOptions.clientID}&redirect_uri=${kakaoOptions.redirectUri}&response_type=code&scope=profile,account_email`;
    //     console.log(kakaoOptions.clientID);
    //     res.redirect(kakaoAuthURL);
    // })

    // 인가 코드 받기 
    //app.get('/auth/naver', auth.getAccessToken());

    // EMAIL, PHONENUMBER, NAME, NICKNAME -> EMAIL, PHONENUMBER 인증 -> 회원가입 API -> 로그인 API -> JWT

    /*
        CODE(CLIENT) -> ACCESS TOKEN(SERVER) -> GET USERINFO (SERVER) -> CHECK USER(SERVER) -> IF (USER): RETURN JWT RESPONSE -> IF (!USER): CREATE USER, JWT RESPONSE

        controller
        getAccessToken 함수에서 accessToken 받아오면
        NAVER 사용자 정보 조회 API -> CONTROLLER
        사용자 정보 가져오면 -> PROVIDER -> 사용자 정보가 있는 지 확인하는 API
        O -> SERVICE -> JWT
        X -> SERVICE -> 회원가입 API -> JWT
    */


    // 7. 캘린더 조회 API
    app.get('/app/calendar/:yearmonth', jwtMiddleware, folder.getRandomResultDateList);

    // 9. 해당 월의 유저 총 모험 횟수 조회 API - 유저가 시작하는 달도 보내주기
    //app.get('/app/monthlyadventuretimes/:yearmonth', jwtMiddleware, folder.getMonthlyAdventureTimes);

    // 10. 해당 날짜의 유저 뽑기기록 목록 조회 API
    //app.get('/app/randomresultList/:date', jwtMiddleware, folder.getRandomResultList);

    // 14-1. 폴더 기록하자 기록 API
    //app.post('/app/folderrecording/:folderIdx', jwtMiddleware, folder.postFolderRecording);

    // 14-2. 개별 기록하자 기록 API
    //app.post('/app/eachrecording/:randomResultIdx', jwtMiddleware, folder.postEachRecording);


    
    // 17. 뽑기 저장 목록 삭제 API
    // app.patch('/app/deleterandomresultlist/:userId', folder.patchRandomResultList);

}

/*
function newFunction() {
    return require('../../../config/naverOptions');
}
*/
