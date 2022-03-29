//Response로 보내줄 상태코드와 메세지 등을 이 파일에서 관리함

module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    NAVER_LOGIN_SUCCESS : { "isSuccess": true, "code": 1100, "message":"네이버 로그인 성공" }, //루시 추가 0202
    LOGOUT_SUCCESS : { "isSuccess": true, "code": 1101, "message":"로그아웃 성공" }, //루시 추가 0226
    SIGNUP_SUCCESS : { "isSuccess": true, "code": 1102, "message":"회원가입 성공" }, //루시 추가 0310

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, 

    //Request error
    FOLDER_RANDOMRESULTDATELIST_NOT_EXIST : { "isSuccess": false, "code": 5001, "message":"이달의 뽑기 기록이 없습니다." }, // 루시 추가 0123
    FOLDER_RANDOMRESULTLIST_NOT_EXIST : { "isSuccess": false, "code": 5002, "message":"이날의 뽑기 기록이 없습니다." }, // 루시 추가 0124
    FOLDER_MONTHLYADVENTURETIME_ERROR : { "isSuccess": false, "code": 5003, "message":"이달의 모험 조회 오류." }, // 루시 수정 0210
    RECORDING_EACH_TITLE_EMPTY : { "isSuccess": false, "code": 5004, "message":"해당 항목의 제목을 입력해주세요." }, // 루시 추가 0126
    RECORDING_RECORDINGSTAR_EMPTY : { "isSuccess": false, "code": 5005, "message":"별점을 입력해주세요." }, // 루시 추가 0126
    RECORDING_RECORDINGCONTENT_EMPTY : { "isSuccess": false, "code": 5006, "message":"기록할 내용을 입력해주세요." }, // 루시 추가 0126
    USER_YEARMONTH_EMPTY : { "isSuccess": false,"code": 5007,"message":"조회할 년월을 입력해주세요." }, // 루시 추가 0130
    USER_DATE_EMPTY : { "isSuccess": false, "code": 5008, "message":"조회할 날짜를 입력해주세요." }, // 루시 추가 0130
    RECORDING_FOLDERIDX_ALREADY_EXIST : { "isSuccess": false, "code": 5009, "message":"폴더 기록이 이미 존재합니다." }, //루시 추가 0130
    RECORDING_RANDOMRESULTIDX_ALREADY_EXIST : { "isSuccess": false, "code": 5010, "message":"뽑기 기록이 이미 존재합니다." }, //루시 추가 0130
    FOLDERIDX_WRONG_USERIDX : { "isSuccess": false, "code": 5011, "message": "해당 유저의 폴더가 아닙니다." }, //루시 추가 0131
    RANDOMRESULTIDX_WRONG_USERIDX : { "isSuccess": false, "code": 5012, "message": "해당 유저의 뽑기 항목이 아닙니다." }, //루시 추가 0131
    ACCESS_TOKEN_EMPTY : { "isSuccess": false, "code": 5013, "message": "access_token을 입력해주세요." }, //루시 추가 0202
    NAVER_LOGIN_ERROR  : { "isSuccess": false, "code": 5014, "message": "네이버 로그인 에러." }, //루시 추가 0202
    ACCESS_TOKEN_NOT_VALID  : { "isSuccess": false, "code": 5015, "message": "access_token이 유효하지 않습니다." }, //루시 추가 0202
    FOLDER_RANDOMRESULTCOUNT_ERROR  : { "isSuccess": false, "code": 5016, "message": "뽑기 개수 조회 오류." }, //루시 추가 0210
    RECORDING_IMG_LENGTH : { "isSuccess": false, "code": 5017, "message": "등록할 수 있는 이미지는 최대 10장입니다." }, //루시 추가 0220
    WRONG_ACCESS : { "isSuccess": false, "code": 5018, "message": "잘못된 접근입니다." }, //루시 추가 0224
    INVALID_TOKEN : { "isSuccess": false, "code": 5019, "message": "유효하지 않은 JWT입니다." }, //루시 추가 0225
    
    //포뇨 추가
    RECORDING_FOLDERIDX_EMPTY : { "isSuccess": false, "code": 6000, "message": "해당 폴더의 인덱스를 입력해주세요." },
    RECORDING_CONTENT_NOT_EXIST : { "isSuccess": false, "code": 6001, "message": "기존의 기록하자 내용이 존재하지 않습니다." },
    RECORDING_RANDOMRESULTIDX_EMPTY : { "isSuccess": false, "code": 6002, "message": "해당 항목의 인덱스를 입력해주세요." },

    RECORDING_STAR_EMPTY : { "isSuccess": false, "code": 6003, "message": "해당 폴더의 수정할 별점을 입력해주세요." },
    RECORDING_CONTENT_EMPTY : { "isSuccess": false, "code": 6004, "message": "해당 폴더의 수정할 발자취 내용을 입력해주세요." },
    RECORDING_CONTENT_LENGTH : { "isSuccess": false, "code": 6005, "message":"발자취 내용은 1000자 이하로 입력해주세요." },
    RECORDING_TITLE_EMPTY : { "isSuccess": false, "code": 6006, "message": "해당 폴더의 제목을 입력해주세요." },

    RANDOMRESULT_CONTENT_EMPTY : { "isSuccess": false, "code": 6007, "message": "저장할 내용을 입력해주세요." },
    RANDOMRESULT_CONTENT_LEGNTH : { "isSuccess": false, "code": 6008, "message": "저장할 내용은 100자 이하로 입력해주세요." },
    RANDOMRESULT_TYPE_EMPTY : { "isSuccess": false, "code": 6009, "message": "저장할 내용의 타입을 입력해주세요." },
    RANDOMRESULT_TYPE_NOT_MATCH : { "isSuccess": false, "code": 6010, "message": "저장할 내용의 타입을 A,B,C,D 중 하나로 입력해주세요." },
    RANDOMRESULT_DELETE_EMPTY : { "isSuccess": false, "code": 6011, "message": "삭제할 항목을 선택해주세요." },
    VERIFIEDTOKEN_USERIDX_EMPTY : { "isSuccess": false, "code": 6012, "message": "베리파이드토큰 안에 userIdx를 넣어주세요." },
    FOLDER_CONTENT_EMPTY : { "isSuccess": false, "code": 6013, "message": "해당 폴더에 저장된 기록하자 내용이 없습니다." },
    EACH_CONTENT_EMPTY : { "isSuccess": false, "code": 6014, "message": "해당 개별항목에 저장된 기록하자 내용이 없습니다." },
    EACH_NOT_EXIST : { "isSuccess": false, "code": 6015, "message": "존재하지 않는 개별 항목입니다." },
    RECORDING_STAR_RANGE : { "isSuccess": false, "code": 6016, "message": "별점은 5점 이하로 입력해주세요." },
    RECORDING_TITLE_LENGTH : { "isSuccess": false, "code": 6017, "message": "제목은 15자 이하로 입력해주세요." },
    RECORDING_FOLDERIDX_NOT_EXIST : { "isSuccess": false, "code": 6018, "message": "해당 폴더에 대한 기록하자 내용이 없습니다." },
    RECORDING_RANDOMRESULTIDX_NOT_EXIST : { "isSuccess": false, "code": 6019, "message": "해당 항목에 대한 기록하자 내용이 없습니다." },

    //케융 추가
    FOLDER_NOT_EXIST : {"isSuccess": false, "code":7006 , "message": "존재하지 않는 폴더입니다" },
    RANDOMRESULT_NOT_EXIST : {"isSuccess": false, "code":7008 , "message": "존재하지 않는 뽑기결과 항목입니다" },

    //
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userIdx를 입력해주세요." },
    USER_USERIDX_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
