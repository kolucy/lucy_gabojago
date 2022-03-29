module.exports = function(app) {
    const recording = require("./recordingController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 9-1. 해당 날짜의 뽑기 개수 조회 API
    app.get('/app/randomresultcount/:date', jwtMiddleware, recording.getRandomResultCount);

    // 10-1. 개별 뽑기기록 조회 API
    //app.get('/app/recordingList/each/:date', jwtMiddleware, recording.getFolderList);

    // 14-1. 폴더 기록하자 기록 API
    app.post('/app/folderrecording/:folderIdx', jwtMiddleware, recording.postFolderRecording);

    // 14-2. 개별 기록하자 기록 API
    app.post('/app/eachrecording/:randomResultIdx', jwtMiddleware, recording.postEachRecording);

    //18-1. 기록화면B 폴더 기록 삭제 API
    app.patch('/app/recording/folderrecorddeletion/:folderIdx', jwtMiddleware, recording.deleteFolderRecording);

    //18-2. 기록화면B 개별 기록 삭제 API
    app.patch('/app/recording/eachrecorddeletion/:randomResultIdx', jwtMiddleware, recording.deleteEachRecording);

}
