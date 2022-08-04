import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../elements/Layout";
import { Completion } from "../../assets";

function SignUpPart5() {
  const navigate = useNavigate();
  return (
    <Layout title="행복충전 회원가입">
      <div className="flex flex-col p-20 text-center">
        <div className="flex justify-center mb-20 mt-70">
          <img className="w-100 h-100" src={Completion} alt="회원가입 성공" />
        </div>
        <h2 className="mb-10 text-h3">
          행복충전모바일에 오신 것을
          <br /> 환영합니다.
        </h2>
        <p className="mb-40 text-gray-500 text-b3">
          차별화된 멤버쉽 혜택을 누려보세요.
        </p>

        <button
          className="btn btn-fill btn-extra"
          type="button"
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          홈으로
        </button>
      </div>
    </Layout>
  );
}

export default SignUpPart5;
