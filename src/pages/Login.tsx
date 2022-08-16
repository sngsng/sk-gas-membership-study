import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import loginApi from "../apis/login";
import LabelInput from "../components/LabelBtn/LabelInput";
import urls from "../constants/urls";
import Button from "../elements/Button";
import Layout from "../elements/Layout";
import useModal from "../hooks/useModal";
import { InterceptorError } from "../network/types/interface";
import { useAppDispatch } from "../store/hook";
import { userSignUpData } from "../store/modules/User";

interface LoginFormType {
  userId: string;
  userPwd: string;
}

function Login() {
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
  const { mutateAsync: LoginMutation, isLoading } = useMutation(loginApi);

  const onSubmit = async (data: LoginFormType) => {
    const body = {
      loginID: data.userId,
      mbrPW: data.userPwd,
    };

    try {
      const { user, token } = await LoginMutation(body);
      if (token) {
        // user redux
        dispatch(userSignUpData(user));
      }
    } catch (err) {
      const error = err as InterceptorError;
      showAlert({ title: error.detailMsg });
    }
  };
  return (
    <Layout isHeader isMenu={false} title="로그인" backBtn>
      <form
        action="submit"
        className="flex flex-col justify-center w-full p-20 mx-auto h-250 "
      >
        <LabelInput
          placeholder="아이디를 입력해주세요"
          register={register("userId", { required: true })}
        />
        <LabelInput
          className="mb-20"
          placeholder="비밀번호를 입력해주세요"
          register={register("userPwd", {
            required: true,
          })}
        />
        <Button
          text="로그인"
          className="btn-extra"
          isBtnCheck={isValid}
          isLoading={isLoading}
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
