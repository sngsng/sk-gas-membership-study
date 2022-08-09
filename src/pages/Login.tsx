/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import loginApi from "../apis/login";
import LabelInput from "../components/signUp/LabelInput";
import string from "../constants/string";
import urls from "../constants/urls";
import Button from "../elements/Button";
import Layout from "../elements/Layout";
import useModal from "../hooks/useModal";
import { useAppDispatch } from "../store/hook";

import { userSignUpData } from "../store/modules/User";
import regex from "../util/regex";

interface LoginFormType {
  userId: string;
  userPwd: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useModal();
  //
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
      const { user, detailMsg } = res;
      //
      if (detailMsg === "정상") {
        // user redux
        dispatch(userSignUpData(user));
        navigate(urls.Main);
        //
      } else {
        // 에러처리
        showAlert({ title: detailMsg, message: string.TryMessage });
      }
      // try cath
      // 인터셉트
    });
  };
  return (
    <Layout isHeader isMenu={false} title="로그인" backBtn>
      <form
        action="submit"
        className="flex flex-col justify-center w-full p-20 mx-auto h-250 "
      >
        <LabelInput
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
