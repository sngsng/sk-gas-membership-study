/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsIdCheckBody from "../../apis/auth/types/requests/TermsIdCheckBody";
import ApiUrls from "../../constants/api_urls";
import regex from "../../constants/regex";
// import { idCheckAPI } from "../../apis/auth";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";
import hmsRequest from "../../network";
import cls from "../../util";

function SignUpPart1() {
  const navigate = useNavigate();
  const [idCheck, setIdCheck] = useState(false);
  const [apiIdCheck, setApiIdCheck] = useState(false);
  const [idCheckBtn, setIdCheckBtn] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [rePassWordCheck, setRePasswordCheck] = useState(false);
  const [passWordCrossCheck, setPassWordCrossCheck] = useState(false);
  const [carNumberCheck, setCarNumberCheck] = useState(false);
  const [signPart1Btn, setSignPart1Btn] = useState(false);

  const [useId, setUserId] = useState("");

  const idRef = useRef<HTMLInputElement>(null);
  const passWordRef = useRef<HTMLInputElement>(null);
  const rePassWordRef = useRef<HTMLInputElement>(null);
  const carNumberRef = useRef<HTMLInputElement>(null);

  // singPart1Btn 조건 체크
  useEffect(() => {
    if (
      !idCheck &&
      idRef.current?.value &&
      regex.id.test(idRef.current.value) &&
      !passwordCheck &&
      passWordRef.current?.value &&
      regex.passWord.test(passWordRef.current.value) &&
      !rePassWordCheck &&
      rePassWordRef.current?.value &&
      regex.passWord.test(rePassWordRef.current.value) &&
      !passWordCrossCheck &&
      carNumberRef.current?.value &&
      !carNumberCheck &&
      regex.carNumber.test(carNumberRef.current.value) &&
      apiIdCheck
    ) {
      setSignPart1Btn(true);
    } else {
      setSignPart1Btn(false);
    }
  }, [
    idCheck,
    passwordCheck,
    rePassWordCheck,
    passWordCrossCheck,
    carNumberCheck,
    apiIdCheck,
  ]);

  // 아이디 체크 (정규식)
  const handleIdCheck = () => {
    // console.log(idRef.current?.value);

    if (!idRef.current?.value) {
      setIdCheck(false);
    } else if (idRef.current?.value && regex.id.test(idRef.current?.value)) {
      setIdCheck(false);
      setIdCheckBtn(true);
      setUserId(idRef.current.value);
    } else {
      setIdCheck(true);
      setIdCheckBtn(false);
    }
  };

  // id 중복체크
  const idCheckAPI = async (useId: TermsIdCheckBody) => {
    try {
      const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, useId);
      const { dupYn } = data.responseData;

      if (dupYn === "Y") {
        alert("중복된 아이디 입니다.");
        setApiIdCheck(false);
      }
      if (dupYn === "N") {
        alert("사용가능한 아이디입니다.");
        setApiIdCheck(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 비밀번호 체크
  const handlePasswordCheck = () => {
    // console.log(passWordRef.current?.value);

    if (
      (passWordRef.current?.value &&
        regex.passWord.test(passWordRef.current.value)) ||
      !passWordRef.current?.value
    ) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }

    // 비밀번호 서로 같은지 체크하는 부분 = passWordCrossCheck
    if (
      passWordRef.current?.value &&
      rePassWordRef.current?.value &&
      passWordRef.current?.value !== rePassWordRef.current?.value &&
      regex.passWord.test(rePassWordRef.current.value) &&
      regex.passWord.test(passWordRef.current.value)
    ) {
      setPassWordCrossCheck(true);
    } else if (
      passWordRef.current?.value === rePassWordRef.current?.value ||
      !regex.passWord.test(rePassWordRef.current?.value as string)
    ) {
      setPassWordCrossCheck(false);
    }
  };

  // 비밀번호 재확인 체크
  const handleRePasswordCheck = () => {
    // console.log(rePassWordRef.current?.value);

    if (
      (rePassWordRef.current?.value &&
        regex.passWord.test(rePassWordRef.current.value)) ||
      !rePassWordRef.current?.value
    ) {
      setRePasswordCheck(false);
    } else {
      setRePasswordCheck(true);
    }

    // 비밀번호 서로 같은지 체크하는 부분 = passWordCrossCheck
    if (
      passWordRef.current?.value &&
      rePassWordRef.current?.value &&
      passWordRef.current?.value !== rePassWordRef.current?.value &&
      regex.passWord.test(rePassWordRef.current.value) &&
      regex.passWord.test(passWordRef.current.value)
    ) {
      setPassWordCrossCheck(true);
    } else if (
      passWordRef.current?.value === rePassWordRef.current?.value ||
      !regex.passWord.test(rePassWordRef.current?.value as string)
    ) {
      setPassWordCrossCheck(false);
    }
  };

  // 차량번호 체크
  const handleCarNumberCheck = () => {
    // console.log(carNumberRef.current?.value);
    if (
      (carNumberRef.current?.value &&
        regex.carNumber.test(carNumberRef.current.value)) ||
      !carNumberRef.current?.value
    ) {
      setCarNumberCheck(false);
    } else {
      setCarNumberCheck(true);
    }
  };

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20">
        <p className="text-h2 mb-30">가입정보를 입력해 주세요.</p>

        <div className="mb-40">
          <div className="mb-12 focus-within:text-blue">
            <p className="mb-8 font-bold text-b3 ">아이디 *</p>
            <div className="flex mb-8 ">
              <input
                className="flex-1 label-input"
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요"
                ref={idRef}
                onFocus={() => {
                  setIdCheck(false);
                }}
                onBlur={handleIdCheck}
                onChange={handleIdCheck}
              />
              <button
                type="button"
                disabled={!idCheckBtn}
                className={cls(
                  "ml-10  btn-extra",
                  idCheckBtn
                    ? "cursor-pointer rounded border-1 btn-fill"
                    : "btn-fill-disabled rounded "
                )}
                onClick={() => {
                  idCheckAPI({ lognId: useId });
                }}
              >
                중복확인
              </button>
            </div>
            {idCheck && (
              <p className="font-normal text-b3 text-red">
                영문 대소문자, 숫자를 조합하여 5글자 이상 입력해주세요.
              </p>
            )}
          </div>

          <div className="mb-12 focus-within:text-blue">
            <p className="mb-8 font-bold text-b3">비밀번호 *</p>
            <div className="flex mb-8">
              <input
                className="flex-1 label-input"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                ref={passWordRef}
                onChange={handlePasswordCheck}
                onFocus={() => {
                  setPasswordCheck(false);
                }}
                onBlur={handlePasswordCheck}
              />
            </div>
            {passwordCheck && (
              <p className="font-normal text-b3 text-red">
                영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해 주세요.
              </p>
            )}
          </div>

          <div className="mb-12 focus-within:text-blue">
            <p className="mb-8 font-bold text-b3">비밀번호 재입력 *</p>
            <div className="flex mb-8">
              <input
                className="flex-1 label-input"
                type="password"
                name="repassword"
                placeholder="비밀번호를 입력해주세요"
                ref={rePassWordRef}
                onChange={handleRePasswordCheck}
                onFocus={() => {
                  if (signPart1Btn) {
                    setRePasswordCheck(false);
                    setPassWordCrossCheck(false);
                  }
                }}
                onBlur={handleRePasswordCheck}
              />
            </div>

            {rePassWordCheck && (
              <p className="font-normal text-b3 text-red">
                영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해 주세요.
              </p>
            )}

            {/* 비밀번호 서로 체크후 다를경우 경고 메시지 */}
            {passWordCrossCheck && (
              <p className="font-normal text-b3 text-red">
                비밀번호가 일치하지 않습니다
              </p>
            )}
          </div>
        </div>

        <p className="font-bold text-h2 mb-30">차량정보를 입력해 주세요.</p>
        <div className="focus-within:text-blue">
          <p className="mb-8 font-bold text-b3 focus:text-blue">차량번호 *</p>
          <div className="flex mb-8">
            <input
              className="flex-1 label-input"
              type="text"
              name="id"
              placeholder="차량번호를 입력해 주세요(ex 00가 0000)"
              ref={carNumberRef}
              onChange={handleCarNumberCheck}
              onFocus={() => {
                if (signPart1Btn) {
                  setCarNumberCheck(false);
                }
              }}
              onBlur={handleCarNumberCheck}
            />
          </div>
          {carNumberCheck && (
            <p className="font-normal text-b3 text-red">
              형식이 올바르지 않습니다 (ex 00가0000)
            </p>
          )}
        </div>

        <button
          type="button"
          className={cls(
            "mt-30  btn-extra w-full",
            signPart1Btn
              ? "cursor-pointer rounded border-1 btn-fill"
              : "btn-fill-disabled rounded "
          )}
          // input 값이 전부 통과될 경우 버튼 활성화!
          disabled={!signPart1Btn}
          onClick={() => {
            navigate(urls.SignUpPart2);
            console.log("work");
          }}
        >
          다음
        </button>
      </form>
    </Layout>
  );
}

export default SignUpPart1;
