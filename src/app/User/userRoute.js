module.exports = function(app) {
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

   const auth = require('./userController');

    // 1. 로그인 API (JWT 생성)
    app.post('/auth/naver', auth.getNaverJWT);

    // 2. 로그아웃 API
    app.get('/app/user/logout', jwtMiddleware, user.logoutUser);

}