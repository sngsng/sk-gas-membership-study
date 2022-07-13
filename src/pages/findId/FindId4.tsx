import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../elements/Layout";
import urls from "../../constants/urls";

function FindId4() {
  const navigate = useNavigate();

  return (
    <Layout title="아이디 찾기">
      <div className="p-20">
        <div className="flex mb-30">
          <button
            className="flex-1 rounded-l btn-fill btn-extra btn-fill-disabled"
            type="button"
            onClick={() => {
              navigate(urls.FindId1);
            }}
          >
            간편찾기
          </button>
          <button className="flex-1 rounded-r btn-fill btn-extra" type="button">
            본인인증으로 찾기
          </button>
        </div>
      </div>
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
        className="w-full mb-10 btn btn-fill btn-extra"
        onClick={() => {
          navigate(urls.FindIdResult);
        }}
      >
        확인
      </button>
      <p className="text-center text-gray-500 underline text-b3">
        문자가 수신되지 않나요?
      </p>
    </Layout>
  );
}

export default FindId4;
