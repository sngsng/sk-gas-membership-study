/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";
import cls from "../../util";

function SignUpPart1() {
  const navigate = useNavigate();
  const [idCheck, setIdCheck] = useState(false);
  const [idCheckBtn, setIdCheckBtn] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [rePasswordCheck, setRePasswordCheck] = useState(false);
  const [carNumberCheck, setCarNumberCheck] = useState(false);

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rePassWordRef = useRef<HTMLInputElement>(null);
  const carNumberRef = useRef<HTMLInputElement>(null);

  // 공통사항 포커스 해제 될때 함수 체크후 경고 문자 뜸.
  // password랑 id 체크 함수를 따로 관리 해야될까??
  // chacge여서 계속 호출되는거 보기 싫음. (효율 나쁠꺼 같음)
  // input 값 한번에 관리 할수 있도록 하자!
  // 중복확인 api 버튼에 달아서 호출후 alert 띄우기
  // ai

  const handleIdCheck = () => {
    console.log(idRef.current?.value);

    // 숫자를 꼭 포함해야되는건가?? 물어보기!!
    const userIdRegex = /^[A-Za-z0-9]{5,20}$/i;

    // value가 있어야 되며, test를 통과할때

    if (!idRef.current?.value) {
      setIdCheck(false);
      setIdCheckBtn(false);
    } else if (idRef.current?.value && userIdRegex.test(idRef.current?.value)) {
      // 경고 문자를 안보이게 해주고, 버튼은 활성화 시켜준다.
      setIdCheck(false);
      setIdCheckBtn(true);
    } else {
      // 경고 문자를 보여주고, 버튼을 비활성화 시켜준다.
      setIdCheck(true);
      setIdCheckBtn(false);
    }
  };

  const handlePasswordCheck = () => {
    console.log(passwordRef.current?.value);

    const usePassWordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (
      (passwordRef.current?.value &&
        usePassWordRegex.test(passwordRef.current.value)) ||
      !passwordRef.current?.value
    ) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  };

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
  };

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
                  alert("로그인 중복 api 사용하기");
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
                ref={passwordRef}
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
                }}
                onBlur={handleRePasswordCheck}
              />
            </div>
            {rePasswordCheck && (
              <p className="font-normal text-b3 text-red">
                영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상 입력해 주세요.
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
          className="w-full mt-30 btn btn-fill btn-fill-disabled btn-extra"
          // 정보 값이 없으면 버튼은 클릭시에 활성화 되면 안된다.
          type="button"
          onClick={() => {
            navigate(urls.SignUpPart2);
          }}
        >
          다음
        </button>
      </form>
    </Layout>
  );
}

export default SignUpPart1;
