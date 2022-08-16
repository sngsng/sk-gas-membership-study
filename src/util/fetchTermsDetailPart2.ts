export default function fetchTermsDetailPart2(
  cluCd: string,
  phoneCorp: string
) {
  //
  switch (phoneCorp) {
    case "SKT":
    case "SKM":
      switch (cluCd) {
        case "1":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpAgree_QR_SKT.html";
        case "2":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpDiscrAgree_QR_SKT.html";
        case "3":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpUse_QR_SKT.html";
        case "4":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpUse_QR.html";
        default:
          return "";
      }

    case "KTF":
    case "KTM":
      switch (cluCd) {
        case "1":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpAgree_QR_KT.html";
        case "2":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpDiscrAgree_QR_KT.html";
        case "3":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpUse_QR_KT.html";
        case "4":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpUse_QR.html";
        default:
          return "";
      }

    case "LGT":
    case "LGM":
      switch (cluCd) {
        case "1":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpAgree_QR_LGU.html";
        case "2":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpDiscrAgree_QR_LGU.html";
        case "3":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpUse_QR_LGU.html";
        case "4":
          return "https://www.kmcert.com/kmcis/comm/terms_qr/kmcisHpUse_QR.html";
        default:
          return "";
      }
    default:
      return "";
  }
}
