/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  authenticationNumberCheckApi,
  signUpApi,
  smsRetryApi,
} from "../../apis/signUp";
import LabelInput from "../../components/signUp/LabelInput";
import Timer from "../../components/signUp/Timer";
import string from "../../constants/string";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signUpPart3ApiData } from "../../store/modules/ApiData";
import regex from "../../util/regex";

function SignInPark4() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // redux
  const signApiData = useAppSelector((state) => state.userApiData);
  const userData = useAppSelector((state) => state.user);
  // hook-Form
  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  //
  // 상태관리
  const [isButton, setIsButton] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  //
  // 변수

  //
  // body값
  const { certNum, check1, check2, check3 } = signApiData;

  // console.clear();
  console.log("----------------signApiData----------------");
  console.log(signApiData);

  // console.log("----------------userData----------------");
  // console.log(userData);

  // SMS 인증 확인
  const {
    mutateAsync: authenticationCheckPress,
    isLoading: authNumberLoading,
  } = useMutation(authenticationNumberCheckApi);

  // SMS 인증 재전송 요청
  const { mutateAsync: smsRetryMutation, isLoading: smsRetryLoading } =
    useMutation(smsRetryApi);

  // 회원가입 요청
  const { mutateAsync: startSignUp, isLoading: SignUpLoading } =
    useMutation(signUpApi);

  //
  // 회원가입 요청
  const SignUp = (CI: string) => {
    console.log("----------------CI----------------");
    console.log(CI);

    const body = {
      lognId: userData.iognId,
      lognPwd: userData.iognPwd,
      ci: CI,
      carFrtNo: userData.carFrtNo,
      carTbkNo: userData.carTbkNo,
      mbrNm: userData.mbrNm,
      hpNo: userData.hpNo,
      birth: userData.birth,
      gen: userData.gen === "0" ? "M" : "F",
      ntnl: "N",
      mbrFg: "1",
      cluAgrList: userData.cluAgrList,
    };

    console.log("----------------body----------------");
    console.log(body);

    startSignUp(body).then((res) => {
      console.log(res);
      // navigate(urls.SignUpPart5, { replace: true });
    });
  };

  //
  // SMS 인증 확인
  const authCheckApi = () => {
    const body = {
      certNum,
      check1,
      check2,
      check3,
      smsNum: getValues("author"),
    };
    authenticationCheckPress(body).then((res) => {
      SignUp(res.CI);
    });
  };

  // SMS 인증 재요청
  const smsRetry = () => {
    // retry 했을시 버튼에 로딩 처리..
    // 문자 수신 되지 않나요? 에 조건 건어서 여러번 클릭 방지
    //
    // 버튼 활성화
    setIsButton(false);
    //
    // api 인증재요청
    smsRetryMutation({
      check1,
      check2,
      check3,
      certNum,
    }).then((res) => {
      // 타이머 다시 시작
      setIsTimer(!isTimer);
      //
      console.log("----------------sms retry : res----------------");
      console.log(res);
      //
      const { check1, check2, check3, certNum, result } = res;
      //
      // api redux
      dispatch(
        signUpPart3ApiData({
          check1,
          check2,
          check3,
          certNum,
        })
      );
      //
      // 모달 만들어서 띄워줘야될 곳
      if (result === "Y") {
        console.log("성공");
      } else if (result === "N") {
        console.log("실패");
      } else if (result === "F") {
        console.log("일 5회 인증실패");
      } else if (result === "E") {
        console.log("오류");
      }
    });
  };

  return (
    <Layout title="행복충전모바일 회원가입">
      <div className="flex flex-col p-20">
        <h2 className="text-h2 mb-30">인증수단 입력</h2>

        <div className="relative">
          <LabelInput
            placeholder={string.AuthPlaceholder}
            HtmlFor="인증"
            className="relative mb-20 text-b2"
            label={string.AuthLabel}
            maxLength={6}
            register={register("author", {
              required: true,
              pattern: regex.confirmNumber,
            })}
          />
          <Timer
            isTimer={isTimer}
            setIsButton={setIsButton}
            className="right-20 top-52"
          />
        </div>

        <Button
          className="mb-10 btn-extra"
          text={string.Check}
          disabled={!isValid}
          isBtnCheck={!isButton}
          isLoading={authNumberLoading || smsRetryLoading || SignUpLoading}
          onClick={authCheckApi}
        />
        <p
          className="text-center text-gray-500 underline cursor-pointer text-b3"
          aria-hidden="true"
          onClick={smsRetry}
        >
          문자가 수신되지 않나요?
        </p>
      </div>
    </Layout>
  );
}

export default SignInPark4;
