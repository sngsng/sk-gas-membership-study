/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "react-query";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import cls, { requiredLengthCheck } from "../util";
import { useAppSelector, useAppDispatch } from "../store/hook/index";
import { addCluAgrList } from "../store/modules/SignUp";
import Button from "../elements/Button";
import { Terms } from "../apis/signUp/types/responses";
import { fetchTermsDetail, fetchTermsList } from "../apis/signUp";
import TermsList from "../components/signUp/TermsList";
import string from "../constants/string";
import { TermsDetailBody } from "../apis/signUp/types/requests";

function AcceptTerms() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // redux
  const userCheckedList = useAppSelector((state) => state.signUp.cluAgrList); // 다음 페이지로 갔다가 올때
  //
  // state
  const [termsCheckList, setTermsCheckList] = useState<Terms[]>(
    userCheckedList || []
  );
  // data
  const { data: termsListData, isLoading } = useQuery<Terms[]>(
    "termsListData",
    fetchTermsList
  );

  // 선택한 Y 값 갯수 같은지 체크
  const termsRequiredLengthCheck = () =>
    requiredLengthCheck(termsListData) === requiredLengthCheck(termsCheckList);

  // 전체 Y 값 갯수 같거나 모두 체크된지 상태 여부
  const isTermsListBtnCheck =
    termsRequiredLengthCheck() ||
    termsListData?.length === termsCheckList.length;

  const pageMoveHandle = () => {
    //
    dispatch(addCluAgrList(termsCheckList));
    navigate(urls.SignUpPart1);
  };

  // 약관 상세페이지 이동
  const openTermsDetail = async (body: TermsDetailBody) => {
    const cluTelgCtt = await fetchTermsDetail(body);

    navigate(urls.AcceptTermsDetail, {
      state: {
        cluTelgCtt,
      },
    });
  };

  return (
    <Layout isHeader title={string.MobileMembershipRegistration} backBtn>
      <div className="p-20">
        <div className="text-center mb-160">
          <p className="mb-6 font-bold mt-60 text-h2">약관 동의가 필요해요</p>
          <p className="text-[#b7b7b7] text-b2">
            서비스 이용에 필요한 약관에 동의해 주세요.
          </p>
        </div>

        {isLoading ? (
          <p className="text-center py-150">로딩중입니다....</p>
        ) : (
          <TermsList
            allCheckTitle={string.AcceptTheFullTerms}
            termsListData={termsListData}
            termsCheckList={termsCheckList}
            setTermsCheckList={setTermsCheckList}
            openTermsDetail={openTermsDetail}
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
            text={string.AgreeAndSignUp}
            className={cls("mt-30  btn-extra w-full")}
            isBtnCheck={isTermsListBtnCheck}
            disabled={!termsRequiredLengthCheck()}
            onClick={pageMoveHandle}
          />
        )}
      </div>
    </Layout>
  );
}

export default AcceptTerms;
