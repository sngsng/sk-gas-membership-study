import React from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";

function FindIdResult() {
  const navigate = useNavigate();
  return (
    <Layout title="아이디 찾기">
      <div className="p-20 text-center">
        <h2 className="mb-16 font-semibold text-h1 text-blue">인증 완료</h2>
        <p className="text-gray500 text-b1 mb-30">고객님의 아이디입니다.</p>
        <div className="flex flex-col items-center justify-center mb-20 rounded bg-gray150 min-h-170">
          <p className="mb-6">아이디</p>
          <p className="pb-16">blabla</p>

          <p className="text-gray500 text-b3">
            가입일 <span>2022-00-00</span>
          </p>
        </div>
        <div className="flex">
          <button
            type="button"
            className="flex-1 btn btn-fill btn-extra"
            onClick={() => {
              navigate(urls.Login);
            }}
          >
            로그인
          </button>
          <button type="button" className="flex-1 ml-10 btn btn-fill btn-extra">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default FindIdResult;
