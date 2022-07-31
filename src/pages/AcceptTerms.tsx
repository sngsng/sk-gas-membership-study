/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "react-query";
import { CheckBoxOff, CheckBoxOn } from "../assets";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import cls from "../util";
import { useAppSelector, useAppDispatch } from "../store/hook/index";
import { addCluAgrList } from "../store/modules/User";
import TermsCheckList from "../components/TermsCheckList";
import Button from "../elements/Button";
import ApiUrls from "../constants/api_urls";
import hmsRequest from "../network";
import { Terms } from "../apis/signUp/types/responses";
import { fetchTermsList } from "../apis/signUp";

function AcceptTerms() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userCheckedList = useAppSelector((state) => state.user.cluAgrList); // 다음 페이지로 갔다가 올때
  const [allCheck, setAllCheck] = useState(false);
  const [checkList, setCheckList] = useState<Terms[]>(userCheckedList || []);

  const { data: termsListData, isLoading } = useQuery<Terms[]>(
    "termsListData",
    fetchTermsList
  );

  // all check버튼 활성화 체크부분
  useEffect(() => {
    if (termsListData?.length) {
      setAllCheck(termsListData.length === checkList?.length);
    }
  }, [checkList, termsListData]);

  // 약관 개별 선택시
  const changeHandel = (check: boolean, terms: Terms) => {
    if (check && !!checkList) {
      setCheckList([...checkList, terms]);
    } else {
      setCheckList(
        checkList?.filter((value: Terms) => {
          return value.cluCd !== terms.cluCd;
        })
      );
    }
  };

  // all 버튼 클릭시
  const allCheckHandel = () => {
    if (!allCheck && termsListData) {
      setCheckList([]);
      setAllCheck(true);
      setCheckList(
        termsListData?.map((terms: Terms) => {
          return terms;
        })
      );
    } else {
      setAllCheck(false);
      setCheckList([]);
    }
  };

  // Y 값 갯수 구하는 로직
  function requiredLengthCheck(data: Terms[] | undefined) {
    return data?.filter((terms) => {
      return terms.mndtAgrYn === "Y";
    }).length;
  }

  // 필수 Y 값 갯수
  const termsListRequiredLength = requiredLengthCheck(termsListData);

  // 클릭한 Y 값 갯수
  const checkedTermsLength = requiredLengthCheck(checkList);

  const termsRequiredLengthCheck =
    termsListRequiredLength === checkedTermsLength;

  // Y 값 갯수 같은지 체크
  const isTermsListBtnCheck = allCheck || termsRequiredLengthCheck;

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

        {isLoading ? (
          <div className="text-center ">
            <ClipLoader className=" text-blue" color="text-blue" size={30} />
          </div>
        ) : (
          <Button
            text="동의하고 회원가입"
            className={cls("mt-30  btn-extra w-full")}
            isBtnCheck={isTermsListBtnCheck}
            disabled={!termsRequiredLengthCheck}
            onClick={() => {
              navigate(urls.SignUpPart1);
              dispatch(addCluAgrList(checkList as Terms[]));
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export default AcceptTerms;
