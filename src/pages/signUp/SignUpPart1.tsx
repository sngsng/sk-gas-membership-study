/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import { TermsIdCheckBody } from "../../apis/signUp/types/requests";
import ApiUrls from "../../constants/api_urls";
import regex from "../../util/regex";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";
import hmsRequest from "../../network";
import { useAppDispatch } from "../../store/hook";
import { UserData1 } from "../../store/modules/types/signUp";
import { signPart1DataAdd } from "../../store/modules/User";
import cls from "../../util";
import LabelInput from "../../components/signUp/LabelInput";
import Button from "../../elements/Button";
import LabelInputBtn from "../../components/signUp/LabelInputBtn";

interface SignUpPart1SubmitType {
  Id: string;
  Pwd: string;
  rePwd: string;
  carNumber: string;
}

function SignUpPart1() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    getFieldState,
    formState: { errors, isValid, isDirty, isSubmitted, isSubmitSuccessful },
  } = useForm<SignUpPart1SubmitType>({
    mode: "onChange",
  });

  console.log("----------------isValid----------------");
  console.log(errors);

  const onSubmit = (data: SignUpPart1SubmitType) => {
    console.log("----------------data----------------");
    console.log(data);
  };

  const [apiIdCheck, setApiIdCheck] = useState(false);

  const [isIdCheckLoading, setIdCheckLoading] = useState(false);

  const [userId, setUserId] = useState("");

  // dispatch로 다음 데이터 넘기는 곳
  const [nextData, setNextData] = useState<UserData1>({
    iognId: "",
    iognPwd: "",
    carFrtNo: "",
    carTbkNo: "",
  });

  // id 중복체크 (api)
  const idCheckAPI = async (userId: TermsIdCheckBody) => {
    setUserId(userId.lognId);
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
    } finally {
      setIdCheckLoading(false);
    }
  };

  // // 비밀번호 체크
  // const handlePasswordCheck = () => {
  //   if (
  //     (passWordRef.current?.value &&
  //       regex.passWord.test(passWordRef.current.value)) ||
  //     !passWordRef.current?.value
  //   ) {
  //     setPasswordCheck(false);
  //   } else {
  //     setPasswordCheck(true);
  //   }

  //   if (
  //     passWordRef.current?.value &&
  //     rePassWordRef.current?.value &&
  //     passWordRef.current?.value !== rePassWordRef.current?.value &&
  //     regex.passWord.test(rePassWordRef.current.value) &&
  //     regex.passWord.test(passWordRef.current.value)
  //   ) {
  //     setPassWordCrossCheck(true);
  //   } else if (
  //     passWordRef.current?.value === rePassWordRef.current?.value ||
  //     !regex.passWord.test(rePassWordRef.current?.value as string)
  //   ) {
  //     setPassWordCrossCheck(false);
  //   }
  // };

  // // 비밀번호 재확인 체크
  // const handleRePasswordCheck = () => {
  //   if (
  //     (rePassWordRef.current?.value &&
  //       regex.passWord.test(rePassWordRef.current.value)) ||
  //     !rePassWordRef.current?.value
  //   ) {
  //     setRePasswordCheck(false);
  //   } else {
  //     setRePasswordCheck(true);
  //   }

  //   if (
  //     passWordRef.current?.value &&
  //     rePassWordRef.current?.value &&
  //     passWordRef.current?.value !== rePassWordRef.current?.value &&
  //     regex.passWord.test(rePassWordRef.current.value) &&
  //     regex.passWord.test(passWordRef.current.value)
  //   ) {
  //     setPassWordCrossCheck(true);
  //   } else if (
  //     passWordRef.current?.value === rePassWordRef.current?.value ||
  //     !regex.passWord.test(rePassWordRef.current?.value as string)
  //   ) {
  //     setPassWordCrossCheck(false);
  //     setNextData({ ...nextData, iognPwd: rePassWordRef.current?.value });
  //   }
  // };

  // // 차량번호 체크
  // const handleCarNumberCheck = () => {
  //   if (
  //     (carNumberRef.current?.value &&
  //       regex.carNumber.test(carNumberRef.current.value)) ||
  //     !carNumberRef.current?.value
  //   ) {
  //     setCarNumberCheck(false);
  //     // 차량 앞번호
  //     const carFrtNo = carNumberRef.current?.value.slice(0, 3);
  //     // 차량 뒷번호
  //     const carTbkNo = carNumberRef.current?.value.slice(3);
  //     setNextData({ ...nextData, carFrtNo, carTbkNo });
  //   } else {
  //     setCarNumberCheck(true);
  //   }
  // };

  const isIdCheckBtn = !!getValues().Id && !errors.Id;

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-h2 mb-30">가입정보를 입력해 주세요.</p>

        <div className="mb-40">
          <LabelInputBtn
            HtmlFor="id"
            label="아이디 *"
            btnText="중복확인"
            isLoading={false}
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
              // useState로 상태관리. 또는 hookform에서 쓸만한 기능 있는지 체크하기.
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
              // validate: {
              //   passWordCrossCheck: (value) => {
              //     console.clear();
              //     console.log("----------------value----------------");
              //     console.log(value);
              //     return value === getValues("Pwd");
              //     // ? ""
              //     // : "비밀번호가 일치하지 않습니다.";
              //   },
              // },
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
            isBtnCheck={apiIdCheck && isValid} // Id값 변경 되면 다시 비활성화 되어야 된다.
            disabled={!apiIdCheck && isValid}
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </form>
    </Layout>
  );
}

export default SignUpPart1;
