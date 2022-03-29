
//0. userIdx 값 체크
async function selectUserIdx(connection, userIdx) {
  const selectUserIdxQuery = `
      SELECT userIdx
      FROM User 
      WHERE userIdx = ?;
  `;
  const [selectUserIdxRows] = await connection.query(selectUserIdxQuery, userIdx);
  return selectUserIdxRows;
}

// 1. 이메일로 회원 조회 - 네이버로그인
async function getUserInfo(connection, email) {
  const getUserInfoQuery = `
                SELECT userIdx
                FROM User 
                WHERE userEmail = ?;
                `;
  const [emailRows] = await connection.query(getUserInfoQuery, email);
  //console.log(emailRows);
  return emailRows;
}

// 1. 새 유저 등록 - 네이버로그인
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(userNickName, userName, userEmail)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 1. 발급한 jwt 저장 - 네이버로그인
async function updateUserToken(connection, updateUserTokenParams) {
  const updateUserTokenQuery = `
      UPDATE User
      SET token = ?
      WHERE userIdx = ?;
  `;
  const updateUserTokenRows = await connection.query(updateUserTokenQuery, updateUserTokenParams);
  return updateUserTokenRows;
}

// jwtMiddleware - 올바른 접근 확인
async function selectUserToken(connection, userIdx) {
  const selectUserTokenQuery = `
                SELECT token
                FROM User 
                WHERE userIdx = ?;
                `;
  const [selectUserTokenRows] = await connection.query(selectUserTokenQuery, userIdx);
  console.log("Dao - selectUserTokenRows: ", selectUserTokenRows[0].token);
  //console.log("Dao - selectUserTokenRows: ", selectUserTokenRows[0]["token"]);
  return selectUserTokenRows[0].token;
  //return selectUserTokenRows;
}

// 2. 로그아웃 - 토큰 삭제
async function eraseUserToken(connection, userIdx) {
  const eraseUserTokenQuery = `
      UPDATE User
      SET token = NULL
      WHERE userIdx = ?;
  `;
  const eraseUserTokenRows = await connection.query(eraseUserTokenQuery, userIdx);
  return eraseUserTokenRows;
}


module.exports = {
  selectUserToken,
  getUserInfo,
  insertUserInfo,
  selectUserIdx,
  eraseUserToken,
  updateUserToken
};
