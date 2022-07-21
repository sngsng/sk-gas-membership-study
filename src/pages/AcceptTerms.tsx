/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useAppSelector, useAppDispatch } from "../store/hook/index";

import { addCluAgrList, CluAgrList } from "../store/modules/User";

function AcceptTerms() {
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);
  const dispatch = useAppDispatch();
  const userCheckedList = useAppSelector((state) => state.user.cluAgrList);

  const { data: termsListData, isLoading } = useQuery<Terms[], AxiosError>(
    ["getTermsList", urls.AccepTerms],
    () => SignUpTermsList(),
    {
      retry: 0,
    }
  );

  useEffect(() => {
    setCheckList(userCheckedList);
  }, []);

  useEffect(() => {
    setAllCheck(checkList.length === termsListData?.length);
  }, [checkList]);

  const changeHandel = (check: boolean, id: string | undefined) => {
    if (check) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((i: string) => i !== id));
    }
  };

  const allCheckHandel = () => {
    if (!allCheck) {
      setCheckList([]);
      setAllCheck(true);
      setCheckList(termsListData?.map((i) => i.cluCd));
    } else {
      setAllCheck(false);
      setCheckList([]);
    }
  };

  function searchArray(list: any[], termsListData: Terms[]) {
    const userCheckedList = [];

    for (let i = 0; i < termsListData.length; i++) {
      for (let j = 0; j < termsListData.length; j++) {
        if (termsListData[i].cluCd === list[j]) {
          userCheckedList.push(termsListData[i]);
        }
      }
    }

    console.log("userCheckedList : ", userCheckedList);
    // dispatch(
    //   addCluAgrList(userCheckedList as CluAgrList[])
    //   // termsListData?.findIndex((value, idx) => value.cluCd === checkList[idx])
    // );
  }

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
          className="flex items-center pb-20 mb-20 cursor-pointer border-b-1 border-gray300"
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

        {isLoading ? (
          <p className="text-center py-150">로딩중입니다....</p>
        ) : (
          <ul>
            {termsListData?.map((terms) => {
              return (
                <li
                  className="flex mb-16 cursor-pointer last:mb-0"
                  aria-hidden="true"
                  key={terms.cluCd}
                >
                  <label className="mr-10 cursor-pointer" htmlFor={terms.cluCd}>
                    <input
                      type="checkbox"
                      className="absolute left-[-9999px]"
                      id={terms.cluCd}
                      value={terms.cluCd}
                      onChange={(e) => {
                        changeHandel(e.currentTarget.checked, terms?.cluCd);
                      }}
                      checked={!!checkList.includes(terms.cluCd)}
                    />
                    <img
                      src={checkList.includes(terms.cluCd) ? CheckOn : CheckOff}
                      alt="체크버튼"
                      className="w-full"
                    />
                  </label>
                  <p>{terms.cluShrtCtt}</p>
                </li>
              );
            })}
          </ul>
        )}

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
            searchArray(checkList, termsListData as Terms[]);
            dispatch(addCluAgrList(checkList));
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
