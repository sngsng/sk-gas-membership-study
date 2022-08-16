export interface Terms {
  // 약관 코드
  cluCd?: string;

  // 약관 버전
  cluVer?: string;

  // 필수 약관여부
  mndtAgrYn?: string;

  // 약관명
  cluShrtCtt?: string;
}

export interface TermsDetail {
  // 약관 상세 내용 (HTML 문자열)
  cluTelgCtt: string;
}

export interface TermsIdCheck {
  // 아이디 중복 여부
  dupYn: "Y" | "N";
}

export interface Part2Data {
  name?: string;
  birthday?: string;
  gen?: string;
  phoneCorp?: string;
  phoneNo?: string;
  nation?: string;
  terms1chk?: string;
  terms2chk?: string;
  terms3chk?: string;
  terms4chk?: string;
}
