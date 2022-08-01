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
import string from "../../constants/string";
// import { useMutation } from "react-query";
// import { idCheckAPI } from "../../apis/signUp";

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
    trigger,
  } = useForm<SignUpPart1SubmitType>({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [apiIdCheck, setApiIdCheck] = useState(false);
  const isIdCheckBtn = !!getValues("Id") && !errors.Id;
  const userData = useAppSelector((state) => state.user);

  // 리덕스에 값이 있을때 값을 유무 체크후 넣어주기 data Mapping
  useEffect(() => {
    const { iognId, iognPwd, carFrtNo, carTbkNo } = userData;
    setValue("Id", iognId || "");
    setValue("Pwd", iognPwd || "");
    setValue("rePwd", iognPwd || "");
    setValue("carNumber", `${carFrtNo}${carTbkNo}` || "");
    if (getValues("Id").length !== 0) {
      trigger(["Id"]);
    }
  }, []);

  // id 중복체크 (api) // 파일 옮기기  // 상태관리는...? // mutation?? // query??
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
    <Layout title={string.MobileMembershipRegistration}>
      <form className="p-20" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-h2 mb-30">가입정보를 입력해 주세요.</p>

        <div className="mb-40">
          <LabelInputBtn
            HtmlFor="id"
            label={string.Id}
            btnText={string.CheckForDuplication}
            isLoading={false} // loadgin useQuery 사용
            isBtnCheck={isIdCheckBtn}
            maxLength={20}
            placeholder={string.EnterID}
            register={register("Id", {
              required: string.IdErrorMessage,
              pattern: {
                value: regex.id,
                message: string.IdErrorMessage,
              },
              minLength: {
                value: 5,
                message: string.IdErrorMessage,
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
            label={string.Pwd}
            className="mb-12"
            placeholder={string.EnterPwd}
            maxLength={20}
            register={register("Pwd", {
              required: string.EnterPwd,
              pattern: {
                value: regex.passWord,
                message: string.PassWordErrorMessage,
              },
              minLength: {
                value: 8,
                message: string.PassWordErrorMessage,
              },
            })}
            errors={errors?.Pwd?.message}
          />

          <LabelInput
            HtmlFor="rePwd"
            // type="password"
            label={string.RePwd}
            className="mb-12"
            placeholder={string.EnterPwd}
            maxLength={20}
            register={register("rePwd", {
              required: string.EnterPwd,
              pattern: {
                value: regex.passWord,
                message: string.PassWordErrorMessage,
              },
              minLength: {
                value: 8,
                message: string.PassWordErrorMessage,
              },
              validate: (value) => {
                return value === getValues("Pwd") || string.PassWordsNotMatch;
              },
            })}
            errors={errors?.rePwd?.message}
          />
        </div>

        <p className="text-h2 mb-30">차량정보를 입력해 주세요.</p>

        <LabelInput
          HtmlFor="carNumber"
          label={string.CarNumber}
          placeholder={string.EnterCarNumber}
          maxLength={10}
          register={register("carNumber", {
            required: string.CarNumber,
            pattern: {
              value: regex.carNumber,
              message: string.CarErrorMessage,
            },
          })}
          errors={errors?.carNumber?.message}
        />

        {false ? (
          <div className="py-40 text-center">
            <ClipLoader className="text-blue" color="text-blue" size={30} />
          </div>
        ) : (
          <Button
            text={string.Next}
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
