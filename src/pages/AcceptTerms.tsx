import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpTermsList } from "../apis/common";
import { CheckBoxOff, CheckBoxOn, CheckOff, CheckOn } from "../assets";
import Terms from "../apis/common/types/responses/Terms";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import cls from "../util";

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

// findIndex...

function AcceptTerms() {
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);

  const { data } = useQuery<Terms[], AxiosError>(
    ["getTermsList", urls.AccepTerms],
    () => SignUpTermsList(),
    {
      retry: 0,
    }
  );

  useEffect(() => {
    setAllCheck(checkList.length === 7);
  }, [checkList]);

  const changeHandel = (check: boolean, id: string | undefined) => {
    if (check) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((i: string) => i !== id));
    }
  };

  const allCheckHandel = () => {
    if (allCheck === false) {
      setCheckList([]);
      setAllCheck(true);
      setCheckList(data?.map((i) => i.cluCd));
    } else {
      setAllCheck(false);
      setCheckList([]);
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
            allCheckHandel();
          }}
        >
          <img
            src={allCheck ? CheckBoxOn : CheckBoxOff}
            alt="전체동의"
            className="w-24 h-24 mr-10"
          />
          <p className="font-bold text-h2">전체 약관에 동의 합니다.</p>
        </div>

        <ul>
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
                <label className="mr-10 cursor-pointer" htmlFor={item.cluCd}>
                  <input
                    type="checkbox"
                    className="absolute left-[-9999px]"
                    id={item.cluCd}
                    value={item.cluCd}
                    onChange={(e) => {
                      changeHandel(e.currentTarget.checked, item?.cluCd);
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
          className={cls(
            "mt-30  btn-extra w-full text-center",
            allCheck ||
              (checkList.includes("SG000001") &&
                checkList.includes("SG000003") &&
                checkList.includes("OCB00002") &&
                checkList.includes("SC140114"))
              ? "cursor-pointer rounded border-1 btn-fill"
              : "btn-fill-disabled rounded "
          )}
          onClick={() => {
            navigate(urls.SignUpPart1);
            // dispatch 해줘야되는 부분
          }}
          disabled={
            !(
              checkList.includes("SG000001") &&
              checkList.includes("SG000003") &&
              checkList.includes("OCB00002") &&
              checkList.includes("SC140114")
            )
          }
        >
          동의하고 회원가입
        </button>
      </div>
    </Layout>
  );
}

export default AcceptTerms;
