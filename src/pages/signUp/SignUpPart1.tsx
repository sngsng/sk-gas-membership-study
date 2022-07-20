/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idCheckAPI } from "../../apis/auth";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";
import cls from "../../util";

function SignUpPart1() {
  const navigate = useNavigate();
  const [idCheck, setIdCheck] = useState(false);
  const [idCheckBtn, setIdCheckBtn] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [rePassWordCheck, setRePasswordCheck] = useState(false);
  const [passWordCrossCheck, setPassWordCrossCheck] = useState(false);
  const [carNumberCheck, setCarNumberCheck] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signPart1Btn, setSignPart1Btn] = useState(false);
  const [check, setCheck] = useState({
    id: false,
    idapi: false,
    password: false,
    repassword: false,
    carnumber: false,
  });

  console.log(check.id);

  // 아이디 , 비밀번호 재입력 , 차량번호, 중복확인 이렇게 네가지가 값이 있을 경우에만 버튼 활성화

  const [useId, setUserId] = useState("");

  const idRef = useRef<HTMLInputElement>(null);
  const passWordRef = useRef<HTMLInputElement>(null);
  const rePassWordRef = useRef<HTMLInputElement>(null);
  const carNumberRef = useRef<HTMLInputElement>(null);

  // 아이디 체크
  const handleIdCheck = () => {
    console.log(idRef.current?.value);

    // 숫자를 꼭 포함해야되는건가?? 물어보기!!
    const userIdRegex = /^[A-Za-z0-9]{5,20}$/i;

    // value가 있어야 되며, test를 통과할때
    if (!idRef.current?.value) {
      setIdCheck(false);
    } else if (idRef.current?.value && userIdRegex.test(idRef.current?.value)) {
      setIdCheck(false);
      setIdCheckBtn(true);
      setUserId(idRef.current.value);
    } else {
      setIdCheck(true);
      setIdCheckBtn(false);
    }
  };

  // 비밀번호 체크
  const handlePasswordCheck = () => {
    console.log(passWordRef.current?.value);

    const usePassWordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (
      (passWordRef.current?.value &&
        usePassWordRegex.test(passWordRef.current.value)) ||
      !passWordRef.current?.value
    ) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  };

  // 비밀번호 재확인 체크
  const handleRePasswordCheck = () => {
    console.log(rePassWordRef.current?.value);

    const usePassWordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (
      (rePassWordRef.current?.value &&
        usePassWordRegex.test(rePassWordRef.current.value)) ||
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
      usePassWordRegex.test(rePassWordRef.current.value) &&
      usePassWordRegex.test(passWordRef.current.value)
    ) {
      setPassWordCrossCheck(true);
    } else if (
      passWordRef.current?.value === rePassWordRef.current?.value ||
      !usePassWordRegex.test(rePassWordRef.current?.value as string)
    ) {
      setPassWordCrossCheck(false);
    }
  };

  // 차량번호 체크
  const handleCarNumberCheck = () => {
    console.log(carNumberRef.current?.value);

    const useCarNumberRegex =
      /^\d{2,3}[가|나|다|라|마|거|너|더|러|머|버|서|어|저|고|노|도|로|모|보|소|오|조|구|누|두|루|무|부|수|우|주|바|사|아|자|허|배|호|하|국|합|육|해|공]\d{4}$|^[서울|부산|대구|인천|대전|광주|울산|제주|경기|강원|충남|전남|전북|경남|경북|세종]{2}\d{2,3}[가|나|다|라|마|거|너|더|러|머|버|서|어|저|고|노|도|로|모|보|소|오|조|구|누|두|루|무|부|수|우|주|바|사|아|자|허|배|호|하|국|합|육|해|공]\d{4}/i;

    if (
      (carNumberRef.current?.value &&
        useCarNumberRegex.test(carNumberRef.current.value)) ||
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
                  setRePasswordCheck(false);
                  setPassWordCrossCheck(false);
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
                setCarNumberCheck(false);
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
            signPart1Btn // 여기서 조건 줘서 스타일 수정
              ? "cursor-pointer rounded border-1 btn-fill"
              : "btn-fill-disabled rounded "
          )}
          // input 값이 전부 통과될 경우 버튼 활성화!
          disabled={!idCheckBtn}
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
