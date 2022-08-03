/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginBody } from "../apis/signUp/types/requests";
import ApiUrls from "../constants/api_urls";
import string from "../constants/string";
import urls from "../constants/urls";
import Button from "../elements/Button";
import Layout from "../elements/Layout";
import hmsRequest from "../network";
import cls from "../util";
import regex from "../util/regex";

// input 값 다 있으면 버튼의 스타일 바뀜

interface LoginFormType {
  userId: string;
  userPwd: string;
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormType>({
    mode: "onChange",
  });

  const loginApi = async (body: loginBody) => {
    await hmsRequest(ApiUrls.LOGIN, body).then((res) =>
      console.log("res : ", res)
    );
  };

  const { mutateAsync: LoginMutation, isLoading: loginLoading } =
    useMutation(loginApi);

  const onSubmit = async (data: LoginFormType) => {
    const body = {
      loginID: data.userId,
      mbrPW: data.userPwd,
    };

    console.log("----------------body----------------");
    console.log(body);

    LoginMutation(body);
    // navigate(urls.Main);
  };
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
          {...register("userId", { required: true, pattern: regex.id })}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="bg-white px-16 py-20 h-60 rounded border-[#e8e8e8] border-1 outline-none focus:border-blue mb-20 placeholder:text-[#6b7280]"
          {...register("userPwd", { required: true, pattern: regex.passWord })}
        />
        <Button
          text="로그인"
          className="btn-extra"
          isBtnCheck={isValid}
          onClick={handleSubmit(onSubmit)}
        />
        {/* 버튼 로딩 하는거 */}
      </form>
      <div className="text-center">
        <Link
          to={urls.FindId1}
          className="text-center text-b3 mx-auto inline-block text-[#949494] underline "
        >
          아이디 찾기 / 비밀번호 재설정
        </Link>
      </div>
    </Layout>
  );
}

export default Login;

// 로그인 버튼 : id & pw 전부 입력시 버튼(bg) 색 #3882f6 | 텍스트 색 text-white로 변경
// input : 입력시 border-[#2563eb] bg-[#e8f0fe] 로 변경
