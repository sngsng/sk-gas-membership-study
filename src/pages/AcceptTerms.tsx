/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpTermsList } from "../apis/common";
import { CheckBoxOff, CheckOff, CheckOn } from "../assets";
import Terms from "../apis/common/types/responses/Terms";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import hmsRequest from "../network";
import ApiUrls from "../constants/api_urls";

function AcceptTerms() {
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(false);
  const [checkList, setCheckList] = useState([]);

  const { data } = useQuery<Terms[], AxiosError>(
    ["getTermsList", urls.AccepTerms],
    () => SignUpTermsList(),
    {
      retry: 0,
    }
  );

  // const handleSingleCheck = (checked, id) => {
  //   if(checked) {
  //     setCheckList([...checkList, id]);
  //   } else {
  //     setCheckList(checkList.filter((item)=> item !== id));
  //   }
  // };

  // const handleAllCheck = (checked) => {
  //   if(checked) {
  //     console.log("!!!")
  //     const idArray = [];
  //     data?.forEach((dataItem) => idArray.push(dataItem.mndtAgrYn));
  //     setCheckList(idArray);
  //   } else {
  //     setCheckList([]);
  //   }
  // }

  return (
    <Layout isHeader title="행복충전모바일 회원가입" backBtn>
      <div className="p-20">
        <div className="text-center mb-160">
          <p className="mt-40 mb-6 font-bold text-h2">약관 동의가 필요해요</p>
          <p className="text-[#b7b7b7] text-b2">
            서비스 이용에 필요한 약관에 동의해 주세요.
          </p>
        </div>

        <div
          className="flex items-center pb-20 mb-20 border-b-1 border-gray300"
          aria-hidden="true"
          onClick={() => {
            console.log("전체 선택 해야된다.");
          }}
        >
          <img src={CheckBoxOff} alt="전체동의" className="w-24 h-24 mr-10" />
          <p className="font-bold text-h2">전체 약관에 동의 합니다.</p>
        </div>

        <ul>
          {/* map 돌려야되는 부분 */}
          {data?.map((item, i) => {
            return (
              <li
                className="flex mb-16 cursor-pointer last:mb-0"
                aria-hidden="true"
                key={item.cluCd}
                onClick={() => {
                  console.log(i + 1);
                }}
              >
                <div className="mr-10">
                  <img
                    src={true ? CheckOn : CheckOff}
                    alt="체크버튼"
                    className="w-full"
                  />
                </div>
                <p>{item.cluShrtCtt}</p>
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
