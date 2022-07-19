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

// const data = [
//   {
//     id: 1,
//     value: 1,
//     label: "1",
//   },
//   {
//     id: 2,
//     value: 2,
//     label: "2",
//   },
//   {
//     id: 3,
//     value: 3,
//     label: "3",
//   },
//   {
//     id: 4,
//     value: 4,
//     label: "4",
//   },
// ];

// seletedOptions = [{}, {}];
// seletedOptions = [id, id];

// const onChange = (option: any) => {
//   existed => includes, find //  =>. T / F

//   // T 있음 - 체크 상태  =>     =>  체크x
//   seletedOptions에서 []

//   // F 없음 - 체크 x =>  체크 0
//   setSeletedOptions()

// }

// const onChecked = (    ) => {
//   seletedOptions ( [] )
//   return T / F
// }

// data.map((option) => <checkbox value={value} onChange={() => onChange(option))} checked={T/F} />);
//                                              이렇게 하면 타고 들어가서 주는 방법인가보다~

// 일단 클릭시 배열에 추가하는 로직 ()

function AcceptTerms() {
  const navigate = useNavigate();
  // const [allCheck, setAllCheck] = useState(false);

  // 이게 기준이되는 배열이라고 생각하자.
  const [checkList, setCheckList] = useState<any>([]);

  const { data } = useQuery<Terms[], AxiosError>(
    ["getTermsList", urls.AccepTerms],
    () => SignUpTermsList(),
    {
      retry: 0,
    }
  );

  const changeHandel = (check: boolean, id: string) => {
    if (check) {
      // true일 경우 받은 id 값을 추가 해주는데, 기존 배열에 있는 값을 가져와 거기에 추가해주는 방식.
      setCheckList([...checkList, id]);
    } else {
      // false일 경우 받은 id 값과 다른 것들만 필터해서 반환한다.
      setCheckList(checkList.filter((i: string) => i !== id));
    }
  };

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
          {data?.map((item) => {
            return (
              <li
                className="flex mb-16 cursor-pointer last:mb-0"
                aria-hidden="true"
                key={item.cluCd}
                onClick={() => {
                  // console.log(i + 1);
                }}
              >
                <label className="mr-10" htmlFor={item.cluCd}>
                  <input
                    type="checkbox"
                    className="absolute left-[-10px]"
                    id={item.cluCd}
                    value={item.cluCd}
                    onChange={(e) => {
                      changeHandel(e.currentTarget.checked, item.cluCd);
                    }}
                    checked={!!checkList.includes(item.cluCd)}
                  />
                  <img
                    src={checkList.includes(item.cluCd) ? CheckOn : CheckOff}
                    alt="체크버튼"
                    className="w-full"
                  />
                </label>
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
