import string from "../constants/string";

export default function AuthErrorCheck(resultCode: string) {
  console.log("resultCode :", resultCode);

  if (resultCode === "101") {
    return {
      title: string.errorMsg101,
      message: string.errorSubMsg101,
    };
  }
  if (resultCode === "102") {
    return {
      title: string.errorMsg102,
      message: string.errorSubMsg102,
    };
  }
  if (resultCode === "103") {
    return {
      title: string.errorMsg103,
    };
  }
  if (resultCode === "104") {
    return {
      title: string.errorMsg104,
    };
  }
  if (resultCode === "105") {
    return {
      title: string.errorMsg105,
    };
  }
  if (resultCode === "998") {
    return {
      title: string.errorMsgEtc,
    };
  }
  return {
    title: string.errorMsgEtc,
  };
}
