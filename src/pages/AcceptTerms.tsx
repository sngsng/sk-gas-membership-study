/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { SignUpTermsList } from "../apis/common";
import { CheckBoxOff, CheckBoxOn } from "../assets";
import Terms from "../apis/common/types/responses/Terms";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import cls from "../util";
import { useAppSelector, useAppDispatch } from "../store/hook/index";

import { addCluAgrList } from "../store/modules/User";
import TermsCheckList from "../components/TermsCheckList";
import Button from "../elements/Button";

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

  return (
    <Layout isHeader title="행복충전모바일 회원가입" backBtn>
      <div className="p-20">
        <div className="text-center mb-160">
          <p className="mb-6 font-bold mt-60 text-h2">약관 동의가 필요해요</p>
          <p className="text-[#b7b7b7] text-b2">
            서비스 이용에 필요한 약관에 동의해 주세요.
          </p>
        </div>

        <div
          className="flex items-center pb-20 mb-20 cursor-pointer border-b-1 border-gray300"
          aria-hidden="true"
          onClick={allCheckHandel}
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
          <TermsCheckList
            termsListData={termsListData}
            changeHandel={changeHandel}
            checkList={checkList}
          />
        )}

        <p className="pl-34 text-b3 text-[#b7b7b7] mb-30 mt-6">
          ※ 본 마케팅 수신 동의 시 혜택으로 충전 할인 서비스가 제공됩니다.
        </p>

        <Button
          text="동의하고 회원가입"
          className={cls(
            "mt-30  btn-extra w-full",
            allCheck ||
              (checkList.includes("SG000001") &&
                checkList.includes("SG000003") &&
                checkList.includes("OCB00002") &&
                checkList.includes("SC140114"))
              ? "cursor-pointer rounded border-1 btn-fill"
              : "btn-fill-disabled rounded "
          )}
          disabled={
            !(
              checkList.includes("SG000001") &&
              checkList.includes("SG000003") &&
              checkList.includes("OCB00002") &&
              checkList.includes("SC140114")
            )
          }
          onClick={() => {
            navigate(urls.SignUpPart1);
            dispatch(addCluAgrList(checkList));
          }}
        />
      </div>
    </Layout>
  );
}

export default AcceptTerms;
