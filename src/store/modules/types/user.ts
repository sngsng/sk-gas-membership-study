export interface UserDataType {
  // CI
  CI?: string;

  // 차량번호 앞
  carNo1?: string;

  // 차량번호 뒤
  carNo2?: string;

  // 즐겨찾는 충전소
  favoriteChargePlace?: favoriteCjargePlaceType[];

  // 즐겨찾는 충전소 갯수
  favoriteChargePlaceCnt?: number;

  // 로그인 아이디
  loginID?: string;

  // 회원등급
  lvlCd?: "01" | "02" | "03" | "04";

  // 회원ID
  mbrID?: string;

  // 이름
  mbrNM?: string;

  // 개인사업자 여부
  // prnBizYn?: string;
  prnBizYn?: "N" | "Y";
}

export interface favoriteCjargePlaceType {
  // 충전소 코드
  chargeplaceID?: string;

  // 충전소명
  chargeplaceName?: string;
}
