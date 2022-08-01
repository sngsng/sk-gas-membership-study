/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import { TermsIdCheckBody } from "../../apis/signUp/types/requests";
import ApiUrls from "../../constants/api_urls";
import regex from "../../util/regex";
import Layout from "../../elements/Layout";
import hmsRequest from "../../network";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import LabelInput from "../../components/signUp/LabelInput";
import Button from "../../elements/Button";
import LabelInputBtn from "../../components/signUp/LabelInputBtn";
import { signPart1DataAdd } from "../../store/modules/User";
import urls from "../../constants/urls";
// import { useMutation } from "react-query";
import { idCheckAPI } from "../../apis/signUp";

interface SignUpPart1SubmitType {
  Id: string;
  Pwd: string;
  rePwd: string;
  carNumber: string;
}

function SignUpPart1() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpPart1SubmitType>({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [apiIdCheck, setApiIdCheck] = useState(false);
  const isIdCheckBtn = !!getValues("Id") && !errors.Id;
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    const { iognId, iognPwd, carFrtNo, carTbkNo } = userData;
    setValue("Id", iognId || "");
    setValue("Pwd", iognPwd || "");
    setValue("rePwd", iognPwd || "");
    setValue("carNumber", `${carFrtNo}${carTbkNo}` || "");
  }, []);

  // id 중복체크 (api) // 파일 옮기기  //상태관리는...?
  const idCheckAPI = async (userId: TermsIdCheckBody) => {
    try {
      const { data } = await hmsRequest(ApiUrls.TERMS_ID_CHECK, userId);
      const { dupYn } = data.responseData;

      if (dupYn === "Y") {
        alert("중복된 아이디 입니다.");
        setApiIdCheck(false);
      }
      if (dupYn === "N") {
        alert("사용가능한 아이디입니다.");
        setApiIdCheck(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const { mutateAsync: test } = useMutation(idCheckAPI);
  // console.log(test)

  const onSubmit = (data: SignUpPart1SubmitType) => {
    const part1Data = {
      iognId: data.Id,
      iognPwd: data.Pwd,
      carFrtNo: data.carNumber.slice(0, 3),
      carTbkNo: data.carNumber.slice(3),
    };

    dispatch(signPart1DataAdd(part1Data));
    navigate(urls.SignUpPart2);
  };

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-h2 mb-30">가입정보를 입력해 주세요.</p>

        <div className="mb-40">
          <LabelInputBtn
            HtmlFor="id"
            label="아이디 *"
            btnText="중복확인"
            isLoading={false} // loadgin useQuery 사용
            isBtnCheck={isIdCheckBtn}
            maxLength={20}
            placeholder="아이디를 입력해주세요"
            register={register("Id", {
              required:
                "영문 대소문자, 숫자를 조합하여 5글자 이상 입력해주세요.",
              pattern: {
                value: regex.id,
                message:
                  "영문 대소문자, 숫자를 조합하여 5글자 이상 입력해주세요.",
              },
              minLength: {
                value: 5,
                message:
                  "영문 대소문자, 숫자를 조합하여 5글자 이상 입력해주세요.",
              },
              onChange: () => setApiIdCheck(false),
            })}
            errors={errors?.Id?.message}
            onClick={() => {
              const userId = getValues().Id;
              idCheckAPI({ lognId: userId });
            }}
          />

          <LabelInput
            HtmlFor="Pwd"
            // type="password"
            label="비밀번호 *"
            className="mb-12"
            placeholder="비밀번호를 입력해주세요"
            maxLength={20}
            register={register("Pwd", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: regex.passWord,
                message:
                  "영문 대소문자, 숫자, 특수문자를 포함하여 8이상 입력해주세요",
              },
              minLength: {
                value: 8,
                message:
                  "영문 대소문자, 숫자, 특수문자를 포함하여 8이상 입력해주세요",
              },
            })}
            errors={errors?.Pwd?.message}
          />

          <LabelInput
            HtmlFor="rePwd"
            // type="password"
            label="비밀번호 재입력 *"
            className="mb-12"
            placeholder="비밀번호를 입력해주세요"
            maxLength={20}
            register={register("rePwd", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: regex.passWord,
                message:
                  "영문 대소문자, 숫자, 특수문자를 포함하여 8이상 입력해주세요",
              },
              minLength: {
                value: 8,
                message:
                  "영문 대소문자, 숫자, 특수문자를 포함하여 8이상 입력해주세요",
              },
              validate: (value) => {
                return (
                  value === getValues("Pwd") || "비밀번호가 일치 하지 않습니다"
                );
              },
            })}
            errors={errors?.rePwd?.message}
          />
        </div>

        <p className="text-h2 mb-30">차량정보를 입력해 주세요.</p>

        <LabelInput
          HtmlFor="carNumber"
          label="차량번호 *"
          placeholder="차량번호를 입력해 주세요(ex 00가 0000)"
          maxLength={10}
          register={register("carNumber", {
            required: "차량번호를 입력해 주세요",
            pattern: {
              value: regex.carNumber,
              message: " 형식이 올바르지 않습니다 (ex 00가0000)",
            },
          })}
          errors={errors?.carNumber?.message}
        />

        {/* 여기도 로딩 처리를 해줘야 되낭? */}
        {false ? (
          <div className="py-40 text-center">
            <ClipLoader className="text-blue" color="text-blue" size={30} />
          </div>
        ) : (
          <Button
            text="다음"
            className="btn-extra mt-30"
            isBtnCheck={apiIdCheck && isValid}
            disabled={!apiIdCheck || !isValid}
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </form>
    </Layout>
  );
}

export default SignUpPart1;
