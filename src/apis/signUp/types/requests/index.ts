export interface TermsBody {
  // 01: 가입, 02: 유료멤버십, 03: 제휴사
  svcCluFg: "01";
}

export interface TermsIdCheckBody {
  // 아이디 중복 체크 조회
  lognId: string;
}
