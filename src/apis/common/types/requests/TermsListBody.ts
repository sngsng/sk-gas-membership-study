// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface TermsListBody {
  // 01: 가입, 02: 유료멤버십, 03: 제휴사
  svcCluFg: "01" | "02" | "03";

  // 02-유료멤버십일 경우 상품ID
  svcPrdId?: string;
}
