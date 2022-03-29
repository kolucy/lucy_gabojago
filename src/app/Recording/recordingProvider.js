const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const recordingDao = require("./recordingDao");

//folderIdx가 Recording 테이블에 있는지 벨리데이션
exports.recordingCheck_Folder = async function(folderIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    let recordingExistResult = await recordingDao.selectFolderExist(connection, folderIdx);

    if(!recordingExistResult) recordingExistResult = 0

    //console.log("recordingExistResult:", recordingExistResult)

    connection.release();

    return recordingExistResult;
}

//randomResultIdx가 Recording 테이블에 있는지 벨리데이션
exports.recordingCheck_Each = async function(randomResultIdx){
    const connection = await pool.getConnection(async (conn) => conn);

    let recordingExistResult = await recordingDao.selectEachExist(connection, randomResultIdx);

    if(!recordingExistResult) recordingExistResult = 0

    //console.log("recordingExistResult:", recordingExistResult)

    connection.release();

    return recordingExistResult;
}