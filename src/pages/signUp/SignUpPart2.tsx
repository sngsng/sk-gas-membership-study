/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { fetchPassAuthenticationTermsList, sendSMS } from "../../apis/signUp";
import { Part2Data, Terms } from "../../apis/signUp/types/responses";
import SelectForm from "../../components/signUp/SelectForm";
import TermsList from "../../components/signUp/TermsList";
import LabelInput from "../../components/signUp/LabelInput";
import Layout from "../../elements/Layout";
import LabelSelectBtn from "../../components/signUp/LabelSelectBtn";
import Button from "../../elements/Button";
import urls from "../../constants/urls";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signPart2DataAdd } from "../../store/modules/SignUp";
import { signUpPart2ApiData } from "../../store/modules/ApiData";
import { SignPart2DataMapping } from "../../store/modules/MappingData";
import string from "../../constants/string";
import { openModal } from "../../store/modules/Modal";

export interface SignUpPart2SubmitType {
  name: string;
  birthday: string;
  gen: "0" | "1";
  phoneNo: string;
  phoneCorp: {
    label: string;
    value: string;
  };
}

const phoneCorpOptions = [
  { value: "SKT", label: "SK텔레콤" },
  { value: "KTF", label: "KT" },
  { value: "LGT", label: "LG U+" },
  { value: "SKM", label: "SKT 알뜰폰" },
  { value: "KTM", label: "KT 알뜰폰" },
  { value: "LGM", label: "LG 알뜰폰" },
];

function SignInPark2() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //
  // 상태관리
  const [termsCheckList, setTermsCheckList] = useState<Terms[]>([]);
  //
  // redux
  const singPart2MappingData = useAppSelector((state) => state.mappingData);
  //
  // 변수
  const termsDataLength = fetchPassAuthenticationTermsList().length;
  const termsCheckListLength = termsCheckList.length;
  const termsLengthComparison = termsCheckListLength === termsDataLength;
  //
  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    trigger,
    reset,
  } = useForm<SignUpPart2SubmitType>({
    defaultValues: {
      // 초기값
      gen: "0",
    },
    mode: "onChange",
  });

  // data mapping
  useEffect(() => {
    const { birthday, gen, name, phoneCorp, phoneNo, termsCheckList } =
      singPart2MappingData;
    setValue("birthday", birthday || "");
    setValue("name", name || "");
    setValue("gen", gen || "");
    setValue("phoneNo", phoneNo || "");
    setValue("phoneCorp", phoneCorp || "");

    // reset으로 MAPPIng 하는 방법 찾아보기
    if (termsCheckList.length > 0) {
      console.log("part2 : 유효성 검사");

      trigger(["birthday", "name", "gen", "phoneNo", "phoneCorp"]);
      setTermsCheckList(termsCheckList);
    }
  }, []);

  const { mutateAsync: NextSendData, isLoading } = useMutation(sendSMS);

  // console.log(
  // "----------------fetchPassAuthenticationTermsList()----------------"
  // );
  // console.log(termsCheckList);
  // console.log(fetchPassAuthenticationTermsList());

  // let arr = [];
  // for (let i = 1; i < termsCheckList.length; i++) {
  //   let keyName = "terms" + i + "check";
  //   // let count = Math.floor(Math.random() * 10);
  //   let newTermsKey: any = new Object();
  //   newTermsKey[keyName] = "Y";
  //   arr.push(newTermsKey);
  // }

  // arr.forEach(function (value) {
  //   console.log(value);
  // });

  // console.log(arr);

  // data 전송하는곳
  const onSubmit = (data: SignUpPart2SubmitType) => {
    const { birthday, name, gen, phoneCorp, phoneNo } = data;

    const commonData = {
      name,
      birthday,
      phoneNo,
      nation: "0",
    };

    // mapping redux 넣기
    dispatch(
      SignPart2DataMapping({
        ...commonData,
        gen,
        phoneCorp,
        termsCheckList,
        terms1chk: "Y",
        terms2chk: "Y",
        terms3chk: "Y",
        terms4chk: "Y",
      })
    );

    // signUp redux
    dispatch(
      signPart2DataAdd({
        ...commonData,
        gen,
        phoneCorp: phoneCorp.value,
      })
    );

    const body = {
      ...commonData,
      gender: gen,
      phoneCorp: phoneCorp.value,
      terms1chk: "Y",
      terms2chk: "Y",
      terms3chk: "Y",
      terms4chk: "Y", // <== 이거!!!!
    };


    // 본인인증 app 인증요청
    NextSendData(body).then((res) => {
      const { certNum, trCert, check1, check2, result } = res;

      // 에러처리
      if (result === "Y") {
        // api redex
        dispatch(signUpPart2ApiData({ certNum, trCert, check1, check2 }));
        //
        navigate(urls.SignUpPart3);
        //
      } else if (result === "N") {
        dispatch(
          openModal({
            title: string.AuthFailed,
            checkLabel: string.Check,
            checkFocus: true,
          })
        );
      } else if (result === "F") {
        dispatch(
          openModal({
            title: "인증 횟수 초과",
            subTitle:
              "하루 동안 인증 가능한 횟수를 초과하여 인증을 진행 할수 없습니다. 24시간 후 다시 시도해주세요.",
            checkLabel: string.Check,
            checkFocus: true,
          })
        );
      } else if (result === "E") {
        dispatch(
          openModal({
            title: string.Error,
            checkLabel: string.Check,
            checkFocus: true,
          })
        );
      }
      //
    });
  };

  return (
    <Layout title={string.MobileMembershipRegistration}>
      <form className="p-20">
        <p className="mb-30 text-h2">{string.Authentication}</p>

        {/* 이름 */}
        <LabelInput
          HtmlFor="name"
          label={string.Name}
          placeholder={string.EnterName}
          className="mb-20 "
          maxLength={20}
          register={register("name", {
            required: string.EnterName,
            minLength: { value: 2, message: string.EnterMoreThan2 },
          })}
          errors={errors?.name?.message}
        />

        {/* 생년월일 */}
        <LabelInput
          HtmlFor="birthday"
          label={string.Birth}
          placeholder={string.EnterBirth}
          maxLength={8}
          className="mb-20 "
          register={register("birthday", {
            required: string.EnterBirth,
            minLength: { value: 8, message: string.Enter8BirthDate },
          })}
          errors={errors?.birthday?.message}
        />

        {/* 성별 */}
        <Controller
          control={control}
          name="gen"
          render={({ field: { value } }) => {
            return (
              <LabelSelectBtn
                name="gen"
                label={string.Gen}
                choice1={string.Man}
                choice2={string.Woman}
                setValue={setValue}
                value={value}
              />
            );
          }}
        />

        {/* 통신사 */}
        <Controller
          control={control}
          name="phoneCorp"
          rules={{ required: string.Agency }}
          render={({ field: { onChange } }) => {
            return (
              <SelectForm
                HtmlFor="phoneCorp"
                label={string.Agency}
                placeholder={string.EnterAgency}
                onChange={onChange}
                options={phoneCorpOptions}
                errors={errors?.phoneCorp?.message}
                defaultValue={singPart2MappingData.phoneCorp}
              />
            );
          }}
        />

        {/* 휴대폰 */}
        <LabelInput
          HtmlFor="phoneNo"
          label={string.PhoneNumber}
          placeholder={string.EnterPhoneNumber}
          maxLength={11}
          className="mb-20"
          register={register("phoneNo", {
            required: string.EnterPhoneNumber,
            minLength: { value: 11, message: string.Enter11PhoneMessage },
          })}
          errors={errors?.phoneNo?.message}
        />
      </form>

      {/* 약관 */}
      <div className="p-20">
        <TermsList
          allCheckTitle={string.FullyAgreeTerms}
          termsListData={fetchPassAuthenticationTermsList()}
          termsCheckList={termsCheckList}
          setTermsCheckList={setTermsCheckList}
        />

        {/* btn 컴포넌트 */}
        <Button
          text={string.AgreeAndSignUp}
          className="p-20"
          isBtnCheck={isValid && termsLengthComparison}
          disabled={!(isValid && termsLengthComparison)}
          isLoading={isLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Layout>
  );
}

export default SignInPark2;
