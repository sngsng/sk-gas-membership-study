/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import regex from "../../util/regex";
import Layout from "../../elements/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import LabelInput from "../../components/LabelBtn/LabelInput";
import Button from "../../elements/Button";
import LabelInputBtn from "../../components/LabelBtn/LabelInputBtn";
import { signPart1DataAdd } from "../../store/modules/SignUp";
import urls from "../../constants/urls";
import string from "../../constants/string";
import { idCheckAPI } from "../../apis/signUp";
import useModal from "../../hooks/useModal";
import useRouter from "../../hooks/useRouter";

interface SignUpPart1SubmitType {
  Id: string;
  Pwd: string;
  rePwd: string;
  carNumber: string;
}

function SignUpPart1() {
  // hook-Form
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
  //
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { showAlert } = useModal();

  //  state
  const [isIdCheck, setIdCheck] = useState(false);

  //  redux
  const userData = useAppSelector((state) => state.signUp);

  //  변수
  const isIdCheckBtn = !!getValues("Id") && !errors.Id;

  // data Mapping
  useEffect(() => {
    const { lognId, lognPwd, carFrtNo, carTbkNo } = userData;
    setValue("Id", lognId || "");
    setValue("Pwd", lognPwd || "");
    setValue("rePwd", lognPwd || "");
    setValue("carNumber", `${carFrtNo}${carTbkNo}` || "");

    //  조건 체크
    // getValues("Id").length > 0
    if (getValues("Id")) {
      console.log("part1 : 유효성 검사");
      trigger(["Id", "Pwd", "carNumber", "rePwd"]);
      setIdCheck(true);
    }
  }, []);

  // 아이디 중복 체크
  const { mutateAsync: idCheckMutation, isLoading: idCheckLoading } =
    useMutation(idCheckAPI);

  const idCheckHandle = () => {
    const userId = getValues().Id;

    idCheckMutation({ lognId: userId })
      .then((res) => {
        // 에러처리
        if (res === "Y") {
          setIdCheck(false);
          //
          showAlert({
            title: string.DuplicateID,
            message: "다른 아이디를 입력해 주세요",
          });
          //
        } else if (res === "N") {
          setIdCheck(true);
          //
          showAlert({
            title: string.AvailableID,
          });
        }
      })
      .catch((err) => {
        console.log("아이디 중복 체크 : ", err);
      });
  };

  // pageMove Data
  const onSubmit = (data: SignUpPart1SubmitType) => {
    const part1Data = {
      lognId: data.Id,
      lognPwd: data.Pwd,
      carFrtNo: data.carNumber.slice(0, 3),
      carTbkNo: data.carNumber.slice(3),
    };

    dispatch(signPart1DataAdd(part1Data));
    push(urls.SignUpPart2);
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
            isLoading={idCheckLoading}
            isBtnCheck={isIdCheckBtn}
            maxLength={20}
            placeholder={string.EnterID}
            onClick={idCheckHandle}
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
              // 입력시 상태를 false로 만들어주기
              onChange: () => setIdCheck(false),
            })}
            errors={errors?.Id?.message}
          />

          <LabelInput
            HtmlFor="Pwd"
            type="password"
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
            type="password"
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
              //  비밀번호 CROSS 체크
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

        <Button
          text={string.Next}
          className="btn-extra mt-30"
          isBtnCheck={isIdCheck && isValid}
          disabled={!isIdCheck || !isValid}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </Layout>
  );
}

export default SignUpPart1;
