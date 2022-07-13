import React from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";

function SignUpPart1() {
  const navigate = useNavigate();
  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20">
        <p className="text-h2 mb-30">가입정보를 입력해 주세요.</p>
        <p className="mb-8 text-b3">아이디 *</p>
        <div className="flex mb-20">
          <input
            className="flex-1 label-input"
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요"
          />
          <button
            type="button"
            className="ml-10 btn btn-extra btn-fill-disabled btn-fill"
          >
            중복확인
          </button>
        </div>
        <p className="mb-8 text-b3">비밀번호 *</p>
        <div className="flex mb-20">
          <input
            className="flex-1 label-input"
            type="password"
            name="id"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <p className="mb-8 text-b3">비밀번호 재입력 *</p>
        <div className="flex mb-20">
          <input
            className="flex-1 label-input"
            type="text"
            name="id"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <p className="text-h2 mb-30">차량정보를 입력해 주세요.</p>
        <p className="mb-8 text-b3 focus:text-blue">차량번호 *</p>
        <div className="flex">
          <input
            className="flex-1 label-input"
            type="text"
            name="id"
            placeholder="차량번호를 입력해 주세요(ex 00가 0000)"
          />
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
