import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import Layout from "../elements/Layout";

function SignIn() {
  const navigate = useNavigate();

  return (
    <Layout isHeader={false} isMenu={false}>
      <main className="flex flex-col items-center justify-center h-[100vh] w-full bg-white">
        <img className="mb-20" src={Logo} alt="logo" />
        <p className="font-semibold text-center text-h2 mb-27">
          행복충전 모바일
        </p>
        <div className="w-full px-20 mb-20 mt-102 ">
          <button
            className="w-full p-20 bg-white border rounded cursor-pointer h-60 text-b1 text-blue border-blue"
            onClick={() => {
              navigate("/accept-terms");
            }}
            type="button"
          >
            회원가입
          </button>
        </div>
        <div className="w-full px-[20px]">
          <button
            className="w-full p-20 text-white border border-white rounded cursor-pointer h-60 text-b1 bg-blue"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        </div>
      </main>
    </Layout>
  );
}

export default SignIn;
