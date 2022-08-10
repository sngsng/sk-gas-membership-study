import { Terms } from "../apis/signUp/types/responses";

export default function cls(...classnames: string[]) {
  return classnames.join(" ").trim();
}

// termsList Y 값 갯수 구하는 로직
export function requiredLengthCheck(data: Terms[] | undefined) {
  return data?.filter((terms) => {
    return terms.mndtAgrYn === "Y";
  }).length;
}
