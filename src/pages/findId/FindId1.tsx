import React from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";

function FindId1() {
  const navigate = useNavigate();
  return (
    <Layout title="아이디 찾기">
      <div className="p-20">
        <div className="flex mb-30">
          <button
            className="flex-1 rounded-l btn-fill btn-extra "
            type="button"
          >
            간편찾기
          </button>
          <button
            className="flex-1 rounded-r btn-fill btn-extra btn-fill-disabled"
            type="button"
            onClick={() => {
              navigate(urls.FindId2);
            }}
          >
            본인인증으로 찾기
          </button>
        </div>
        <label htmlFor="useName" className="flex flex-col mb-20 text-b3">
          이름
          <input
            className="mt-8 label-input"
            type="text"
            placeholder="이름을 입력해주세요"
            id="useName"
            name="name"
          />
          <p className="hidden">최소 2글자 이상 입력해주세요</p>
        </label>
        <label htmlFor="useName" className="flex flex-col mb-20 text-b3">
          휴대폰 번호
          <input
            className="mt-8 label-input"
            type="text"
            placeholder="휴대폰 번호를 입력해 주세요"
            id="useName"
            name="name"
          />
          <p className="hidden">최소 2글자 이상 입력해주세요</p>
        </label>
        <button
          className="w-full btn btn-fill btn-extra"
          type="button"
          onClick={() => {
            navigate(urls.FindIdResult);
          }}
        >
          다음
        </button>
      </div>
    </Layout>
  );
}

export default FindId1;
