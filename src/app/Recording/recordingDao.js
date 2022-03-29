// 14-1. 폴더 기록 등록
async function insertFolderRecording(connection, insertFolderRecordingParams) {
    const insertFolderRecordingQuery = `
          INSERT INTO Recording(folderIdx, recordingStar, recordingContent, recordingTitle)
          VALUES (?, ?, ?, ?);
      `;
    const [insertFolderRecordingRow] = await connection.query(
      insertFolderRecordingQuery,
      insertFolderRecordingParams
    );
  
    return insertFolderRecordingRow;
  }
//img생성
async function insertImgUrl(connection, insertImgUrlParams) {
  const insertImgUrlQuery = `
        INSERT INTO RecordingImg(recordingIdx, recordingImgUrl)
        VALUES ((SELECT recordingIdx FROM Recording WHERE folderIdx=?), ?);
    `;
  const [insertImgUrlRow] = await connection.query(insertImgUrlQuery, insertImgUrlParams);

  return insertImgUrlRow;
}

  
// 14-2. 개별 기록 등록
async function insertEachRecording(connection, insertEachRecordingParams) {
  const insertEachRecordingQuery = `
        INSERT INTO Recording(randomResultIdx, recordingStar, recordingContent, recordingTitle)
        VALUES (?, ?, ?, ?);
    `;
  const [insertEachRecordingRow] = await connection.query(
    insertEachRecordingQuery,
    insertEachRecordingParams
  );
  return insertEachRecordingRow;
}
//img생성
async function insertImgUrlEach(connection, insertImgUrlParams) {
  const insertImgUrlQuery = `
        INSERT INTO RecordingImg(recordingIdx, recordingImgUrl)
        VALUES ((SELECT recordingIdx FROM Recording WHERE randomResultIdx=?), ?);
    `;
  const [insertImgUrlEachRow] = await connection.query(insertImgUrlQuery, insertImgUrlParams);

  return insertImgUrlEachRow;
}

// 폴더Idx 존재 여부 확인
async function selectFolderExist(connection, folderIdx){
  const selectFolderExistQuery = `
              SELECT folderIdx
              FROM Recording
              WHERE folderIdx = ?;
              `;
  const [folderExistRows] = await connection.query(selectFolderExistQuery, folderIdx);
  return folderExistRows[0];
}

// 개별Idx 존재 여부 확인
async function selectEachExist(connection, randomResultIdx){
    const selectEachExistQuery = `
                SELECT randomResultIdx
                FROM Recording
                WHERE randomResultIdx = ?;
                `;
    const [eachExistRows] = await connection.query(selectEachExistQuery, randomResultIdx);
    return eachExistRows[0];
}



module.exports = {
    insertFolderRecording,
    insertImgUrl,
    insertEachRecording,
    insertImgUrlEach,
    selectFolderExist,
    selectEachExist
};
