import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpTermsList } from "../apis/common";
import { CheckBoxOff, CheckOff } from "../assets";
import Terms from "../apis/common/types/responses/Terms";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import hmsRequest from "../network";
import ApiUrls from "../constants/api_urls";

function AcceptTerms() {
  const navigate = useNavigate();

  const { data } = useQuery<Terms[], AxiosError>(
    ["getTermsList", urls.AccepTerms],
    () => SignUpTermsList(),
    {
      retry: 0,
    }
  );

  // const OpenTermsDetail = async (body: TermsDetailBody) => {
  //   const { cluTelgCtt } = await getTermsDetail(body);
  //   push(urls.AcceptTermsDetail, {
  //     state: {
  //       cluTelgCtt,
  //     },
  //   });
  // };

  // console.log(OpenTermsDetail({{data[0].cluCd,data[0].cluVer}}));

  // interface Data {
  //   data: Terms[] | undefined;
  // }

  // console.log(data:Data);

  // 도전하는 코드...
  // type TermsList {

  // }

  // eslint-disable-next-line consistent-return
  // const result = async () => {
  //   try {
  //     const data = await hmsRequest(ApiUrls.TERMS_LIST, {
  //       svcCluFg: "01",
  //     }).then((res) => {
  //       return res;
  //     });
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log("tt", result);

  // const [termsList, setTermsList] = useState([]);

  useEffect(() => {
    // -- async 방식
    // (async () => {
    //   const { data } = await hmsRequest(ApiUrls.TERMS_LIST, {
    //     svcCluFg: "01",
    //   });
    //   console.log(data.responseData.cluList);
    //   setTermsList(data.responseData.cluList);
    // })();
    // -- .then 방식
    hmsRequest(ApiUrls.TERMS_LIST, {
      svcCluFg: "01",
    }).then((res) => {
      // setTermsList(res.data.responseData.cluList);
    });
  }, []);

  // console.log(termsList);

  //   const test = async () =>
  //   axios({
  //     method: "post",
  //     url: "https://appdev.happylpg.com/apis/hmsmob/mbr/cluList",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //       Accept: "application/json;charset=utf-8",
  //       "Cache-Control": "no-cache",
  //     },
  //     withCredentials: true,
  //     data: {
  //       serviceCode: "G002",
  //       chnl: "02",
  //       version: "1.0",
  //       trcNo: "20220103100000123456",
  //       requestData: {
  //         svcCluFg: "01",
  //       },
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data.responseData.cluList);
  //       return res.data.responseData.cluList;
  //       setTermsList(res.data.responseData.cluList);
  //     })
  //     .catch((error) => {
  //       console.log("로그인체크 실패", error);
  //     });
  // console.log(test);

  return (
    <Layout isHeader isMenu={false} title="행복충전모바일 회원가입" backBtn>
      <div className="p-20">
        <div className="text-center mb-160">
          <p className="mt-40 mb-6 font-bold text-h2">약관 동의가 필요해요</p>
          <p className="text-[#b7b7b7] text-b2">
            서비스 이용에 필요한 약관에 동의해 주세요.
          </p>
        </div>

        <div
          className="flex items-center pb-20 mb-20 border-b-1 border-gray300"
          role="button" // aria-hidden 을 쓰는게 좋은지 role=button을 쓰는게 좋은지 헷갈린다.
          // onClick={() => {}} // 이부분은 Visible, non-interactive elements with click handlers must have at least one keyboard listener
        >
          <img src={CheckBoxOff} alt="전체동의" className="w-24 h-24 mr-10" />
          <p className="font-bold text-h2">전체 약관에 동의 합니다.</p>
        </div>

        <ul>
          {/* map 돌려야되는 부분 */}
          {data?.map((item) => {
            return (
              <li className="flex mb-16 cursor-pointer last:mb-0">
                <div className="mr-10">
                  <img src={CheckOff} alt="체크버튼" className="w-full" />
                </div>
                <p
                // onClick={() => {
                //   OpenTermsDetail({
                //     cluCd: item?.cluCd,
                //     cluVer: item?.cluVer,
                //   });
                //   console.log(
                //     OpenTermsDetail({
                //       cluCd: item?.cluCd,
                //       cluVer: item?.cluVer,
                //     })
                //   );
                // }}
                >
                  {item.cluShrtCtt}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="pl-34 text-b3 text-[#b7b7b7] mb-30 mt-6">
          ※ 본 마케팅 수신 동의 시 혜택으로 충전 할인 서비스가 제공됩니다.
        </p>
        <button
          type="button"
          className="w-full text-center p-20 bg-[#e8e8e8] btn btn-fill btn-fill-disabled"
          onClick={() => {
            navigate(urls.SignUpPart1);
          }}
        >
          동의하고 회원가입
        </button>
      </div>
    </Layout>
  );
}

export default AcceptTerms;
