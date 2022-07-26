export interface UserData1 {
  // 로그인ID
  iognId?: string;

  //로그인비밀번호
  iognPwd?: string;

  // 차량 앞번호
  carFrtNo?: string;

  // 차량 뒤번호
  carTbkNo?: string;
}

export interface UserData2 {
  // 회원명
  mbrNm?: string;

  // 생년월일
  birth?: string;

  // 성별
  gen?: string;

  // 휴대폰번호
  hpNo?: string;

  // 국적
  ntnl?: string;
}

export interface UserData3 {
  // 차량 제조사코드
  carManufrCd?: string;

  // 차량 모델코드
  carModelCd?: string;

  // 회원구분
  mbrFg?: string;

  // 개인사업자번호
  prnBizlcNo?: string;

  // // 고객 CI
  ci?: string;
}
