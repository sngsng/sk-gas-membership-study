/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  fetchPassAuthenticationTermsList,
  RequestAuthentication,
  sendSMS,
} from "../apis/signUp";
import { TermsDetailBody } from "../apis/signUp/types/requests";
import { Terms } from "../apis/signUp/types/responses";
import string from "../constants/string";
import urls from "../constants/urls";
import Button from "../elements/Button";
import useModal from "../hooks/useModal";
import useRouter from "../hooks/useRouter";
import { InterceptorError } from "../network/types/interface";
import {
  CommonData,
  phoneCorpOptions,
  SignUpPart2SubmitType,
} from "../pages/signUp/SignUpPart2";
import { useAppDispatch } from "../store/hook";
import {
  signUpPart2ApiData,
  signUpPart3ApiData,
} from "../store/modules/ApiData";
import { SignPart2DataMapping } from "../store/modules/MappingData";
import { signPart2DataAdd } from "../store/modules/SignUp";
import AuthErrorCheck from "../util/AuthErrorCheck";
import fetchTermsDetailPart2 from "../util/fetchTermsDetailPart2";
import LabelInput from "./LabelBtn/LabelInput";
import LabelSelectBtn from "./LabelBtn/LabelSelectBtn";
import SelectForm from "./LabelBtn/SelectForm";
import TermsList from "./Terms/TermsList";

const options = [
  { label: "남자", value: "0" },
  { label: "여자", value: "1" },
];

export default function SelfAuth() {
  const {
    register,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignUpPart2SubmitType>({
    mode: "onChange",
    defaultValues: {
      gen: "0",
    },
  });
  const dispatch = useAppDispatch();
  const { showAlert } = useModal();
  const { push } = useRouter();
  const [termsCheckList, setTermsCheckList] = useState<Terms[]>([]);
  const termsLengthComparison =
    termsCheckList.length === fetchPassAuthenticationTermsList().length;

  const { mutateAsync: NextSendData, isLoading: sendSmsLoading } =
    useMutation(sendSMS);

  const { mutateAsync: smsRequest, isLoading: requestSMSLoading } = useMutation(
    RequestAuthentication
  );

  // 약관 상세페이지 이동
  const openTermsDetail = ({ cluCd }: TermsDetailBody) => {
    const phoneCorp = getValues("phoneCorp.value");
    if (!phoneCorp) {
      return showAlert({ title: "통신사를 선택해주세요." });
    }

    const url = fetchTermsDetailPart2(cluCd as string, phoneCorp);

    return window.open(url, "_blank");
  };

  // 다음버튼
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

          push(urls.SignUpPart4);
        } else if (result === "Y" && smsFlag === "N") {
          //   // api redex
          dispatch(signUpPart2ApiData({ certNum, trCert, check1, check2 }));
          //
          push(urls.SignUpPart3);
        } else if (result === "N") {
          //
          showAlert(AuthErrorCheck(resultCode));
        }
      });
  };
  return (
    <>
      <form className="py-20">
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
            // pattern:
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
                setValue={setValue}
                options={options}
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
                defaultValue={{ label: "", value: "" }}
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
      <div className="">
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
          // isLoading={sendSmsLoading || requestSMSLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
}
