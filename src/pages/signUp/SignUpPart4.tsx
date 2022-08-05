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
import urls from "../../constants/urls";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signUpPart3ApiData } from "../../store/modules/ApiData";
import { openModal } from "../../store/modules/Modal";
import { userSignUpData } from "../../store/modules/User";
import regex from "../../util/regex";

function SignInPark4() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // redux
  const signApiData = useAppSelector((state) => state.userApiData);
  const userData = useAppSelector((state) => state.signUp);
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
  const [isSmsRetry, setIsSmsRetry] = useState(false);

  // body값
  const { certNum, check1, check2, check3 } = signApiData;
  const commonData = {
    certNum,
    check1,
    check2,
    check3,
  };

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
    //
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

    startSignUp(body).then((res) => {
      //
      // user redux
      dispatch(
        userSignUpData({
          CI,
          loginID: userData.iognId,
          carNo1: userData.carFrtNo,
          carNo2: userData.carTbkNo,
          mbrNM: userData.mbrNm,
          mbrID: res.mbrId,
        })
      );

      navigate(urls.SignUpPart5, { replace: true });
    });
  };

  //
  // SMS 인증 확인
  const authCheckApi = () => {
    const body = {
      ...commonData,
      smsNum: getValues("author"),
    };
    authenticationCheckPress(body).then((res) => {
      const { result } = res;
      //
      // 에러처리
      if (result === "Y") {
        //
        SignUp(res.CI);
        //
      } else if (result === "N") {
        //
        dispatch(
          openModal({
            title: string.AuthFailed,
            checkLabel: string.Check,
            checkFocus: true,
          })
        );
      } else if (result === "F") {
        //
        dispatch(
          openModal({
            title: string.AuthFailed5,
            checkLabel: string.Check,
            checkFocus: true,
          })
        );
      } else if (result === "E") {
        //
        dispatch(
          openModal({
            title: string.Error,
            checkLabel: string.Check,
            checkFocus: true,
          })
        );
      }
    });
  };

  // SMS 인증 재요청
  const smsRetry = () => {
    // 버튼 활성화
    setIsButton(false);

    if (!isSmsRetry) {
      setIsSmsRetry(true);
      // api 인증재요청
      smsRetryMutation({
        ...commonData,
      }).then((res) => {
        // 타이머 다시 시작
        setIsTimer(!isTimer);
        setIsSmsRetry(false);
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
        // 에러처리
        if (result === "Y") {
          //
          setIsSmsRetry(true);
          //
        } else if (result === "N") {
          //
          setIsSmsRetry(false);
          dispatch(
            openModal({
              title: string.AuthFailed,
              checkLabel: string.Check,
              checkFocus: true,
            })
          );
        } else if (result === "F") {
          //
          setIsSmsRetry(true);
          dispatch(
            openModal({
              title: string.AuthFailed5,
              checkLabel: string.Check,
              checkFocus: true,
            })
          );
        } else if (result === "E") {
          //
          setIsSmsRetry(false);
          dispatch(
            openModal({
              title: string.Error,
              checkLabel: string.Check,
              checkFocus: true,
            })
          );
        }
      });
    }
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
