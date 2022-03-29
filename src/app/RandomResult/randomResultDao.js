async function deleteRecordingImgFolder(connection, folderIdx) {
    const deleteRecordingImgQuery = `
        DELETE FROM RecordingImg
        WHERE recordingIdx in (SELECT sub.recordingIdx
                               FROM (SELECT I.recordingIdx recordingIdx
                                     FROM Recording R join RecordingImg I
                                     ON R.recordingIdx = I.recordingIdx
                                     WHERE R.folderIdx = ? ) sub);
    `;
    const deleteRecordingImgRow = await connection.query(deleteRecordingImgQuery, folderIdx);
    return deleteRecordingImgRow[0];
}

async function deleteRecordingFolder(connection, folderIdx) {
    const deleteRandomResultQuery = `
        DELETE FROM Recording
        WHERE folderIdx = ?;
    `;

    const deleteRecordingRow = await connection.query(deleteRandomResultQuery, folderIdx);
    return deleteRecordingRow[0];
}

async function deleteRecordingImg(connection, randomResultIdx) {
    const deleteRandomResultImgQuery = `
        DELETE FROM RecordingImg
        WHERE recordingIdx in (SELECT sub.recordingIdx
                               FROM (SELECT I.recordingIdx as recordingIdx
                                     FROM Recording R join RecordingImg I
                                     on R.recordingIdx=I.recordingIdx
                                     WHERE R.randomResultIdx = ?) sub);
    `;

    const deleteRecordingImgRow = await connection.query(deleteRandomResultImgQuery, randomResultIdx);
    return deleteRecordingImgRow[0];
}

async function deleteRecording(connection, randomResultIdx) {
    const deleteRecordingQuery = `
        DELETE FROM Recording
        WHERE randomResultIdx in (SELECT sub.randomResult
                                  FROM (SELECT A.randomResultIdx as randomResult
                                        FROM Recording A join RandomResult B
                                        ON A.randomResultIdx = B.randomResultIdx
                                        WHERE A.randomResultIdx = ?) sub);
    `;

    const deleteRecordingRow = await connection.query(deleteRecordingQuery, randomResultIdx);
    return deleteRecordingRow[0];
}

module.exports = {
    deleteRecordingImgFolder,
    deleteRecordingFolder,
    deleteRecordingImg,
    deleteRecording
};
