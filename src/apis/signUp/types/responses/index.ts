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

export interface TermsIdCheck {
  // 아이디 중복 여부
  dupYn: "Y" | "N";
}
