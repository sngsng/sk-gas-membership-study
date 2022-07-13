import React from "react";
import { Link, useNavigate } from "react-router-dom";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import cls from "../util";

// input 값 다 있으면 버튼의 스타일 바뀜

function Login() {
  const navigate = useNavigate();
  return (
    <Layout isHeader isMenu={false} title="로그인" backBtn>
      <form
        action="submit"
        className="flex flex-col justify-center w-full p-20 mx-auto h-250 "
      >
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          className="bg-white px-16 py-20 h-60 rounded border-[#e8e8e8] border-1 mb-10 outline-none focus:border-blue placeholder:text-[#6b7280]"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="bg-white px-16 py-20 h-60 rounded border-[#e8e8e8] border-1 outline-none focus:border-blue mb-20 placeholder:text-[#6b7280]"
        />
        <button
          type="submit"
          className={cls("btn btn-fill btn-extra", "btn-fill-disabled")}
          // input 값 둘다 있을시 버튼 활성화
          onClick={() => {
            navigate(urls.Main);
            // home으로 가게 만들어야됨.
          }}
        >
          로그인
        </button>
      </form>
      <div className="text-center">
        <Link
          to={urls.FindId1}
          className="text-center text-b3 mx-auto inline-block text-[#949494] underline "
        >
          아이디 찾기 / 비밀번호 재설정
        </Link>
      </div>
      {/* <input type="checkbox" className="appearance-none checked:bg-blue-500 " /> */}
    </Layout>
  );
}

export default Login;

// 로그인 버튼 : id & pw 전부 입력시 버튼(bg) 색 #3882f6 | 텍스트 색 text-white로 변경
// input : 입력시 border-[#2563eb] bg-[#e8f0fe] 로 변경
