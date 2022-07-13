import React from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";

function SignInPark4() {
  const navigate = useNavigate();
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
          />
          <p className="absolute top-52 right-20 text-b1">00:00</p>
        </label>

        <button
          type="button"
          className="mb-10 btn btn-fill btn-extra"
          onClick={() => {
            navigate(urls.FindIdResult);
          }}
        >
          확인
        </button>
        <p
          className="text-center text-gray-500 underline text-b3"
          // onClick={() => {
          // 인증 재요청
          // }}
        >
          문자가 수신되지 않나요?
        </p>
      </div>
    </Layout>
  );
}

export default SignInPark4;