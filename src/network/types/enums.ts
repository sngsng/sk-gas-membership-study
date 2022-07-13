export enum ServiceCode {
  SK_GAS = "G001",
  SK_WEB = "G002",
}

export enum Channel {
  MOBILE_APP = "01",
  MOBILE_WEB = "02",
}

export enum ResponseCode {
  SUCCESS = "0000",
  // 회원정보 불일치
  SIGN_IN_ERROR_INVALID_ACCOUNT_INFO = "4207",
  NETWORK_ERROR = "-1",
}
