
// 1. 이메일로 회원 조회 - 네이버로그인
async function getUserInfo(connection, email) {
  const getUserInfoQuery = `
                SELECT userIdx
                FROM User 
                WHERE userEmail = ?;
                `;
  const [emailRows] = await connection.query(getUserInfoQuery, email);
  console.log(emailRows);
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

// 7, 9, 10. 유저가 가입한 날(달) 정보 제공
async function selectUserJoinDate(connection, userIdx) {
  const selectUserJoinDateQuery = `
  SELECT DATE(createAt) as 'joindate' FROM User WHERE userIdx = ? AND status = 'active';
                `;
  const [UserJoinDateRows] = await connection.query(selectUserJoinDateQuery, userIdx);
  return UserJoinDateRows[0]['joindate'];
}

// 7. 해당 년월의 유저 뽑기 날짜들 가져오기 - 캘린더 모험횟수 표시 위함. 
async function selectRandomResultDateList(connection, selectRandomResultDateListParams) {
    const selectRandomResultDateListQuery = `
    SELECT DISTINCT DAY(createAt) as 'day' FROM RandomResult WHERE userIdx = ? AND EXTRACT(YEAR_MONTH FROM createAt) = ? AND status = 'active';
    `;
    const [RandomResultDateRows] = await connection.query(selectRandomResultDateListQuery, selectRandomResultDateListParams);
    return RandomResultDateRows;
  }
   // cf. 월만 입력
   // SELECT DATE_FORMAT(createAt, '%Y/%m/%d') FROM RandomResult WHERE userIdx = ? AND MONTH(createAt) = 1 AND status = 'active';
   // SELECT DATE_FORMAT(createAt, '%Y/%m/%d') FROM RandomResult WHERE userIdx = ? AND EXTRACT(YEAR_MONTH FROM createAt) = ?(202201) AND status = 'active';


// 9. 해당 월의 유저 총 모험 횟수 가져오기
async function selectMonthlyAdventureTimes(connection, selectMonthlyAdventureTimesParams) {
  const selectMonthlyAdventureTimesQuery = `
  SELECT count(*) as 'advtimes' FROM RandomResult WHERE userIdx = ? AND EXTRACT(YEAR_MONTH FROM createAt) = ? AND status = 'active';
                `;
  const [MonthlyAdventureTimesRows] = await connection.query(selectMonthlyAdventureTimesQuery, selectMonthlyAdventureTimesParams);
  return MonthlyAdventureTimesRows[0]['advtimes'];
}


// 10-1. 해당 날짜의 개별 뽑기기록 가져오기
async function selectRandomResultList(connection, selectRandomResultListParams) {
    const selectRandomResultListQuery = `
    SELECT * FROM RandomResult WHERE userIdx = ? AND DATE(createAt) = ? AND status = 'active';
                  `;
    const [RandomResultRows] = await connection.query(selectRandomResultListQuery, selectRandomResultListParams);
    return RandomResultRows;
  }


// 10. 해당 날짜의 뽑기 개수 조회
async function selectRandomResultCount(connection, selectRandomResultCountParams) {
  const selectRandomResultCountQuery = `
  SELECT count(*) as 'rrcount' FROM RandomResult WHERE userIdx = ? AND DATE(createAt) = ? AND status = 'active';
                `;
  const [RandomResultCountRows] = await connection.query(selectRandomResultCountQuery, selectRandomResultCountParams);
  return RandomResultCountRows[0]['rrcount'];
}


// // 14-1. 폴더 기록 등록
// async function insertFolderRecording(connection, insertFolderRecordingParams) {
//   const insertFolderRecordingQuery = `
//         INSERT INTO Recording(folderIdx, recordingStar, recordingContent, recordingTitle, recordingImgUrl1, recordingImgUrl2,
//           recordingImgUrl3, recordingImgUrl4, recordingImgUrl5, recordingImgUrl6, recordingImgUrl7,
//           recordingImgUrl8, recordingImgUrl9, recordingImgUrl10)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;
//   const insertFolderRecordingRow = await connection.query(
//     insertFolderRecordingQuery,
//     insertFolderRecordingParams
//   );

//   return insertFolderRecordingRow;
// }

// // 14-2. 개별 기록 등록
// async function insertEachRecording(connection, insertEachRecordingParams) {
//   const insertEachRecordingQuery = `
//         INSERT INTO Recording(randomResultIdx, recordingStar, recordingContent, recordingTitle, recordingImgUrl1, recordingImgUrl2,
//           recordingImgUrl3, recordingImgUrl4, recordingImgUrl5, recordingImgUrl6, recordingImgUrl7,
//           recordingImgUrl8, recordingImgUrl9, recordingImgUrl10)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;
//   const insertEachRecordingRow = await connection.query(
//     insertEachRecordingQuery,
//     insertEachRecordingParams
//   );

//   return insertEachRecordingRow;
// }

// 14 validation. userIdx 값 체크
async function selectUserIdx(connection, userIdx) {
  const selectUserIdxQuery = `
      SELECT userIdx
      FROM User 
      WHERE userIdx = ?;
  `;
  const [selectUserIdxRows] = await connection.query(selectUserIdxQuery, userIdx);
  return selectUserIdxRows[0];
}

// 14 validation. folderIdx 값 체크 - 레코딩에 있는지
async function selectFolderIdx(connection, folderIdx) {
  const selectFolderIdxQuery = `
      SELECT folderIdx
      FROM Recording 
      WHERE folderIdx = ?;
  `;
  const [selectFolderIdxRows] = await connection.query(selectFolderIdxQuery, folderIdx);
  return selectFolderIdxRows[0];
}

// 14 validation. randomResultIdx 값 체크 - 레코딩에 있는지
async function selectRandomResultIdx(connection, randomResultIdx) {
  const selectFolderIdxQuery = `
      SELECT randomResultIdx
      FROM Recording 
      WHERE randomResultIdx = ?;
  `;
  const [selectRandomResultIdxRows] = await connection.query(selectFolderIdxQuery, randomResultIdx);
  return selectRandomResultIdxRows[0];
}

// 14 validation. folderIdx의 userIdx와 넘겨 받은 userIdx 값이 일치하는지 확인
async function selectFolderUserIdx(connection, folderIdx) {
  const selectFolderUserIdxQuery = `
      SELECT userIdx
      FROM Folder
      WHERE folderIdx = ?;
  `;
  const [selectFolderUserIdxRows] = await connection.query(selectFolderUserIdxQuery, folderIdx);
  return selectFolderUserIdxRows[0];
}

// 14 validation. randomResultIdx의 userIdx와 넘겨 받은 userIdx 값이 일치하는지 확인
async function selectRandomResultUserIdx(connection, randomResultIdx) {
  const selectUserIdxQuery = `
      SELECT userIdx
      FROM RandomResult
      WHERE randomResultIdx = ?;
  `;
  const [selectUserIdxRows] = await connection.query(selectUserIdxQuery, randomResultIdx);
  return selectUserIdxRows[0];
}

module.exports = {
    getUserInfo,
    insertUserInfo,
    updateUserToken,
    selectRandomResultDateList,
    selectRandomResultList,
    selectRandomResultCount,
    selectMonthlyAdventureTimes,
    selectUserJoinDate,
    selectUserIdx,
    selectFolderIdx,
    selectRandomResultIdx,
    selectFolderUserIdx,
    selectRandomResultUserIdx
};