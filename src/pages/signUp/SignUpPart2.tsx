/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
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
import { signPart2DataAdd } from "../../store/modules/User";
import { signUpPartApiData2 } from "../../store/modules/ApiData";
import { SignPart2DataMapping } from "../../store/modules/MappingData";
import string from "../../constants/string";

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

const options = [
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
  const singPart2MappingData = useAppSelector((state) => state.mappingData);
  const [apiTermsData, setApiTermsData] = useState<Part2Data>();
  const [termsCheckList, setTermsCheckList] = useState<Terms[]>([]);
  const termsDataLength = fetchPassAuthenticationTermsList().length;
  const termsCheckListLength = termsCheckList.length;
  const termsLengthComparison = termsCheckListLength === termsDataLength;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<SignUpPart2SubmitType>({
    defaultValues: {
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
    // 수동으로 유효성 검사
    if (termsCheckList.length !== 0) {
      trigger(["birthday", "name", "gen", "phoneNo", "phoneCorp"]);
      setTermsCheckList(termsCheckList);
    }
  }, []);

  console.log(getValues("gen"));

  // 데이터 기반으로 작성해야된다.. 서버에서 데이터가 어떻게 변해서 넘어올지 모르니.
  // Body값은 나중에 해도 되는 문제이다.
  // terms all 체크 클릭시
  const termsAllCheckHandel = () => {
    if (!termsLengthComparison) {
      setTermsCheckList([]);
      setTermsCheckList(
        fetchPassAuthenticationTermsList().map((terms) => {
          return terms;
        })
      );
      setApiTermsData({
        ...apiTermsData,
        terms1chk: "Y",
        terms2chk: "Y",
        terms3chk: "Y",
        terms4chk: "Y",
      });
    } else {
      setTermsCheckList([]);
      setApiTermsData({
        ...apiTermsData,
        terms1chk: "",
        terms2chk: "",
        terms3chk: "",
        terms4chk: "",
      });
    }
  };

  // 이부분도 문제! 다시 바꿔줘야된다.!!!
  // terms "Y" 체크후 입력 & 제거 / util로 이동
  const termsRequired = (index: number) => {
    switch (index) {
      case 1:
        if (apiTermsData?.terms1chk) {
          setApiTermsData({ ...apiTermsData, terms1chk: "" });
        } else {
          setApiTermsData({ ...apiTermsData, terms1chk: "Y" });
        }
        break;
      case 2:
        if (apiTermsData?.terms2chk) {
          setApiTermsData({ ...apiTermsData, terms2chk: "" });
        } else {
          setApiTermsData({ ...apiTermsData, terms2chk: "Y" });
        }
        break;
      case 3:
        if (apiTermsData?.terms3chk) {
          setApiTermsData({ ...apiTermsData, terms3chk: "" });
        } else {
          setApiTermsData({ ...apiTermsData, terms3chk: "Y" });
        }
        break;
      case 4:
        if (apiTermsData?.terms4chk) {
          setApiTermsData({ ...apiTermsData, terms4chk: "" });
        } else {
          setApiTermsData({ ...apiTermsData, terms4chk: "Y" });
        }
        break;

      default:
        "";
    }
  };

  // 문제!? 일단 다시 체크!!
  // terms 개별 체크
  const changeHandel = (check: boolean, terms: Terms, index?: number) => {
    if (check && !!termsCheckList) {
      setTermsCheckList([...termsCheckList, terms]);
      !!index && termsRequired(index);
    } else {
      !!index && termsRequired(index);
      setTermsCheckList(
        termsCheckList?.filter((value: Terms) => {
          return value.cluCd !== terms.cluCd;
        })
      );
    }
  };

  const { mutateAsync: NextSendData } = useMutation(sendSMS);

  // data 전송하는곳
  const onSubmit = (data: SignUpPart2SubmitType) => {
    const { birthday, name, gen, phoneCorp, phoneNo } = data;
    console.log("gen : ", gen);

    // mapping data redux 넣기
    dispatch(
      SignPart2DataMapping({
        ...apiTermsData,
        birthday,
        name,
        gen,
        phoneCorp,
        phoneNo,
        nation: "0",
        termsCheckList,
      })
    );

    // 유저정보 redux
    dispatch(
      signPart2DataAdd({
        ...apiTermsData,
        birthday,
        name,
        gen,
        phoneNo,
        phoneCorp: phoneCorp.value,
        nation: "0",
      })
    );

    const body = {
      ...apiTermsData,
      birthday,
      name,
      gender: gen,
      phoneNo,
      phoneCorp: phoneCorp.value,
      nation: "0",
    };

    // 본인인증 app 인증요청 후 자료 리덕스에 담기
    // 에러 처리 하기!!!!!!!!
    NextSendData(body).then((res) => {
      console.log("----------------nextdata----------------");
      console.log("nextdata : ", res);
      const { certNum, trCert, check1, check2 } = res;
      dispatch(signUpPartApiData2({ certNum, trCert, check1, check2 }));
      navigate(urls.SignUpPart3);
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
                options={options}
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
          changeHandel={changeHandel}
          termsData={fetchPassAuthenticationTermsList()}
          termsAllCheckHandel={termsAllCheckHandel}
          termsCheckList={termsCheckList}
          termsLengthComparison={termsLengthComparison}
        />

        {/* btn 컴포넌트 */}
        <Button
          text={string.AgreeAndSignUp}
          className="p-20"
          isBtnCheck={isValid && termsLengthComparison}
          disabled={!(isValid && termsLengthComparison)}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Layout>
  );
}

export default SignInPark2;
