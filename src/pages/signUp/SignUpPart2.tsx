/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import { fetchPassAuthenticationTermsList } from "../../apis/signUp";
import { Part2Data, Terms } from "../../apis/signUp/types/responses";
import SelectForm from "../../components/signUp/SelectForm";
import TermsList from "../../components/signUp/TermsList";
import LabelInput from "../../components/signUp/LabelInput";
import Layout from "../../elements/Layout";
import LabelSelectBtn from "../../components/signUp/LabelSelectBtn";
import Button from "../../elements/Button";

export interface SignUpPart2SubmitType {
  name: string;
  birthday: string;
  gen: "0" | "1";
  phoneNo: string;
  phoneCorp: {
    value: string;
    label: string;
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

// const schema = yup.object({
//   name: yup
//     .string()
//     .required("이름을 입력해주세요")
//     .min(2, "2글자 이상 입력해주세요"),
//   birthday: yup
//     .string()
//     .required("생년월일을 입력해주세요")
//     .min(8, "생년월일 8자리를 입력해주세요"),
//   phoneNo: yup
//     .string()
//     .required("휴대폰 번호를 입력해주세요")
//     .min(11, "휴대폰 11자리를 입력해주세요 "),
//   //     phoneCorp: {
//   //   value: string;
//   //   label: string;
//   // };
// });

function SignInPark2() {
  // const navigate = useNavigate();
  const [nextData, setNextData] = useState<Part2Data>();
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
  } = useForm<SignUpPart2SubmitType>({
    // resolver: yupResolver(schema),
    defaultValues: {
      gen: "0",
    },
    mode: "onChange",
  });

  // terms all 체크 클릭시
  const termsAllCheckHandel = () => {
    if (!termsLengthComparison) {
      setTermsCheckList([]);
      setTermsCheckList(
        fetchPassAuthenticationTermsList().map((terms) => {
          return terms;
        })
      );
      setNextData({
        ...nextData,
        terms1chk: "Y",
        terms2chk: "Y",
        terms3chk: "Y",
        terms4chk: "Y",
      });
    } else {
      setTermsCheckList([]);
      setNextData({
        ...nextData,
        terms1chk: "",
        terms2chk: "",
        terms3chk: "",
        terms4chk: "",
      });
    }
  };

  // terms "Y" 체크후 입력 & 제거 / util로 이동
  const termsRequired = (index: number) => {
    switch (index) {
      case 1:
        if (nextData?.terms1chk) {
          setNextData({ ...nextData, terms1chk: "" });
        } else {
          setNextData({ ...nextData, terms1chk: "Y" });
        }
        break;
      case 2:
        if (nextData?.terms2chk) {
          setNextData({ ...nextData, terms2chk: "" });
        } else {
          setNextData({ ...nextData, terms2chk: "Y" });
        }
        break;
      case 3:
        if (nextData?.terms3chk) {
          setNextData({ ...nextData, terms3chk: "" });
        } else {
          setNextData({ ...nextData, terms3chk: "Y" });
        }
        break;
      case 4:
        if (nextData?.terms4chk) {
          setNextData({ ...nextData, terms4chk: "" });
        } else {
          setNextData({ ...nextData, terms4chk: "Y" });
        }
        break;

      default:
        "";
    }
  };

  // terms 개별 체크
  const changeHandel = (
    check: boolean,
    terms: Terms,
    index: number | undefined
  ) => {
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
    // mapping data redux
    dispatch(
      SignPart2DataMapping({
        ...nextData,
        birthday,
        name,
        gen,
        phoneCorp,
        phoneNo,
        nation: "0",
      })
    );

    const body = {
      ...nextData,
      birthday,
      name,
      gen,
      phoneNo,
      phoneCorp: phoneCorp.value,
      nation: "0",
    };

    // 유저정보 redux
    dispatch(signPart2DataAdd(body));

    // 본인인증 app 인증요청 후 자료 리덕스에 담기
    NextSendData(body).then((res) => {
      const { certNum, trCert, check1 } = res;
      dispatch(signUpPartApiData2({ certNum, trCert, check1 }));
      // navigate(urls.SignUpPart3);
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
