/* eslint-disable @typescript-eslint/no-unused-vars */
import { id } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { authenticationNumberCheckApi, signUpApi } from "../../apis/signUp";
import { AuthNumberCheckBody } from "../../apis/signUp/types/requests";
import Timer from "../../components/signUp/Timer";
import ApiUrls from "../../constants/api_urls";
import string from "../../constants/string";
import urls from "../../constants/urls";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import hmsRequest from "../../network";
import { useAppSelector } from "../../store/hook";
import regex from "../../util/regex";

function SignInPark4() {
  const navigate = useNavigate();
  const signApiData = useAppSelector((state) => state.userApiData);
  const userData = useAppSelector((state) => state.user);
  const {
    register,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  console.log(signApiData);

  const [isButton, setIsButton] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const inputValue = getValues("author");

  // input value 값이랑 redux 값 불러서 body값 정리해서 확인 버튼 클릭시 api 요청!

  console.log("----------------userData----------------");
  console.log(userData);

  // body값
  const { certNum, check1, check2, check3 } = signApiData;

  const {
    mutateAsync: authenticationCheckPress,
    isLoading: authNumberLoading,
  } = useMutation(authenticationNumberCheckApi);

  const { mutateAsync: startSignUp, isLoading: SignUpLoading } =
    useMutation(signUpApi);

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

    startSignUp(body)
      .then((res) => {
        console.log(res);
        // navigate(urls.SignUpPart5, { replace: true });
      })
      .catch((err) => console.log("startSignUp : ", err));
  };

  const authCheckApi = () => {
    const body = {
      certNum,
      check1,
      check2,
      check3,
      smsNum: inputValue,
    };
    authenticationCheckPress(body).then((res) => {
      console.log("part4", res);
      console.log("CI", res.CI);
      SignUp(res.CI);
    });
  };

  return (
    <Layout title="행복충전모바일 회원가입">
      <div className="flex flex-col p-20">
        <h2 className="text-h2 mb-30">인증수단 입력</h2>

        <label htmlFor="인증" className="relative flex flex-col mb-20">
          <p className="mb-8 text-b2">인증번호 *</p>
          <input
            type="text"
            placeholder="발송된 숫자 6자리를 입력해주세요"
            id="인증"
            className="label-input"
            maxLength={6}
            {...register("author", {
              required: true,
              pattern: regex.confirmNumber,
            })}
          />
          <Timer isTimer={isTimer} setIsButton={setIsButton} />
        </label>

        <Button
          className="mb-10 btn-extra"
          text={string.Check}
          disabled={!isValid}
          isBtnCheck={!isButton}
          onClick={authCheckApi}
        />
        <p
          className="text-center text-gray-500 underline cursor-pointer text-b3"
          aria-hidden="true"
          onClick={() => {
            if (isButton) {
              // api 인증재요청
              setIsButton(false);
              setIsTimer(!isTimer);
            }
          }}
        >
          문자가 수신되지 않나요?
        </p>
      </div>
    </Layout>
  );
}

export default SignInPark4;
