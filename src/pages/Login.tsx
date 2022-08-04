/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import loginApi from "../apis/login";
import LabelInput from "../components/signUp/LabelInput";
import ApiUrls from "../constants/api_urls";
import string from "../constants/string";
import urls from "../constants/urls";
import Button from "../elements/Button";
import Layout from "../elements/Layout";
import hmsRequest from "../network";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { userSignUpData } from "../store/modules/User";
import cls from "../util";
import regex from "../util/regex";

// input 값 다 있으면 버튼의 스타일 바뀜

interface LoginFormType {
  userId: string;
  userPwd: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // hook-Form
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormType>({
    mode: "onChange",
  });

  // 로그인
  const { mutateAsync: LoginMutation, isLoading: loginLoading } =
    useMutation(loginApi);

  const onSubmit = async (data: LoginFormType) => {
    const body = {
      loginID: data.userId,
      mbrPW: data.userPwd,
    };

    LoginMutation(body).then((res) => {
      //
      // user redux
      dispatch(userSignUpData(res.user));
      navigate(urls.Main);
    });
  };
  return (
    <Layout isHeader isMenu={false} title="로그인" backBtn>
      <form
        action="submit"
        className="flex flex-col justify-center w-full p-20 mx-auto h-250 "
      >
        <LabelInput
          // className="mb-10"
          placeholder="아이디를 입력해주세요"
          register={register("userId", { required: true, pattern: regex.id })}
        />
        <LabelInput
          className="mb-20"
          placeholder="비밀번호를 입력해주세요"
          register={register("userPwd", {
            required: true,
            pattern: regex.passWord,
          })}
        />
        <Button
          text="로그인"
          className="btn-extra"
          isBtnCheck={isValid}
          isLoading={loginLoading}
          onClick={handleSubmit(onSubmit)}
        />
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
