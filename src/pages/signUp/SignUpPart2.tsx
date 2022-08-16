import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import {
  fetchPassAuthenticationTermsList,
  RequestAuthentication,
  sendSMS,
} from "../../apis/signUp";
import { Terms } from "../../apis/signUp/types/responses";
import SelectForm from "../../components/signUp/SelectForm";
import TermsList from "../../components/signUp/TermsList";
import LabelInput from "../../components/signUp/LabelInput";
import Layout from "../../elements/Layout";
import LabelSelectBtn from "../../components/signUp/LabelSelectBtn";
import Button from "../../elements/Button";
import urls from "../../constants/urls";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signPart2DataAdd } from "../../store/modules/SignUp";
import {
  signUpPart2ApiData,
  signUpPart3ApiData,
} from "../../store/modules/ApiData";
import { SignPart2DataMapping } from "../../store/modules/MappingData";
import string from "../../constants/string";
import useModal from "../../hooks/useModal";
import { InterceptorError } from "../../network/types/interface";
import { TermsDetailBody } from "../../apis/signUp/types/requests";
import AuthErrorCheck from "../../util/AuthErrorCheck";
import fetchTermsDetailPart2 from "../../util/fetchTermsDetailPart2";

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

interface CommonData {
  name: string;
  birthday: string;
  phoneNo: string;
  nation: "0";
  terms1chk?: string;
  terms2chk?: string;
  terms3chk?: string;
  terms4chk?: string;
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
  // modal
  const { showAlert } = useModal();

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    getValues,
    trigger,
    // reset,
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
      trigger(["birthday", "name", "gen", "phoneNo", "phoneCorp"]);
      setTermsCheckList(termsCheckList);
    }
  }, []);

  const { mutateAsync: NextSendData, isLoading: sendSmsLoading } =
    useMutation(sendSMS);

  const { mutateAsync: smsRequest, isLoading: requestSMSLoading } = useMutation(
    RequestAuthentication
  );

  // 약관 상세페이지 이동
  const openTermsDetail = ({ cluCd }: TermsDetailBody) => {
    const phoneCorp = getValues("phoneCorp.value");
    if (!phoneCorp) {
      showAlert({ title: "통신사를 선택해주세요." });
    }

    const url = fetchTermsDetailPart2(cluCd as string, phoneCorp);

    return window.open(url, "_blank");
  };

  // data 전송하는곳
  const onSubmit = (data: SignUpPart2SubmitType) => {
    const { birthday, name, gen, phoneCorp, phoneNo } = data;

    const makeTermsData: { [index: string]: string } = {};

    termsCheckList.forEach((terms) => {
      makeTermsData[`terms${terms.cluCd}chk`] = "Y";
    });

    const commonData: CommonData = {
      name,
      birthday,
      phoneNo,
      nation: "0",
      ...makeTermsData,
    };

    // mapping redux 넣기
    dispatch(
      SignPart2DataMapping({
        ...commonData,
        gen,
        phoneCorp,
        termsCheckList,
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
    };

    // 본인인증 app 인증요청
    NextSendData(body) //
      .then((res) => {
        const { certNum, trCert, check1, check2, result, smsFlag, resultCode } =
          res;

        if (result === "Y" && smsFlag === "Y") {
          //
          dispatch(
            signUpPart2ApiData({ certNum, trCert, check1, check2, smsFlag })
          );
          smsRequest({ certNum, check1, trCert })
            .then((res) => {
              const { check1, check2, check3, certNum } = res;
              //
              dispatch(
                signUpPart3ApiData({
                  check1,
                  check2,
                  check3,
                  certNum,
                })
              );
            })
            .catch((err: InterceptorError) => {
              showAlert({ title: `sms 인증번호 요청 : ${err.detailMsg}` });
            });

          navigate(urls.SignUpPart4);
        } else if (result === "Y" && smsFlag === "N") {
          //   // api redex
          dispatch(signUpPart2ApiData({ certNum, trCert, check1, check2 }));
          //
          navigate(urls.SignUpPart3);
        } else if (result === "N") {
          //
          showAlert(AuthErrorCheck(resultCode));
        }
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
          openTermsDetail={openTermsDetail}
        />

        {/* btn 컴포넌트 */}
        <Button
          text={string.AgreeAndSignUp}
          className="p-20"
          isBtnCheck={isValid && termsLengthComparison}
          disabled={!(isValid && termsLengthComparison)}
          isLoading={sendSmsLoading || requestSMSLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Layout>
  );
}

export default SignInPark2;
