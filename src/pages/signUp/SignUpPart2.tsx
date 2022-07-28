import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { fetchPassAuthenticationTermsList } from "../../apis/signUp";
import { Part2Data, Terms } from "../../apis/signUp/types/responses";
import { CheckBoxOff, CheckBoxOn, CheckOff, CheckOn } from "../../assets";
import Input from "../../elements/Input";
import Layout from "../../elements/Layout";
import cls from "../../util";

interface SubmitData {
  name: string;
  birthday: string;
  gen: "0" | "1";
  phoneNo: string;
  // 받을 값을 타입지정 안해주면 값을 관리 하기 힘들다...
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

function SignInPark2() {
  const [nextData, setNextData] = useState<Part2Data>();
  const [termsCheckList, setTermsCheckList] = useState<Terms[] | any>([]);
  const termsDataLength = fetchPassAuthenticationTermsList().length;
  const termsCheckListLength = termsCheckList.length;
  const termsLengthComparison = termsCheckListLength === termsDataLength;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<SubmitData>({
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
      case 0:
        if (nextData?.terms1chk) {
          setNextData({ ...nextData, terms1chk: "" });
        } else {
          setNextData({ ...nextData, terms1chk: "Y" });
        }
        break;
      case 1:
        if (nextData?.terms2chk) {
          setNextData({ ...nextData, terms2chk: "" });
        } else {
          setNextData({ ...nextData, terms2chk: "Y" });
        }
        break;
      case 2:
        if (nextData?.terms3chk) {
          setNextData({ ...nextData, terms3chk: "" });
        } else {
          setNextData({ ...nextData, terms3chk: "Y" });
        }
        break;
      case 3:
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
  const changeHandel = (check: boolean, terms: Terms, index: number) => {
    if (check && !!termsCheckList) {
      setTermsCheckList([...termsCheckList, terms]);
      termsRequired(index);
    } else {
      setTermsCheckList(
        termsCheckList?.filter((value: Terms) => {
          return value.cluCd !== terms.cluCd;
        })
      );
      termsRequired(index);
    }
  };

  const onSubmit = (data: SubmitData) => {
    const { birthday, name, gen, phoneCorp, phoneNo } = data;

    setNextData({
      ...nextData,
      birthday,
      name,
      gen,
      phoneCorp: phoneCorp.value,
      phoneNo,
    });
    // navigate(urls.SignUpPart3);
  };

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20">
        <p className="mb-30 text-h2">본인인증</p>

        <Input
          HtmlFor="name"
          label="이름 *"
          placeholder="이름을 입력해주세요"
          className="flex flex-col mb-20"
          maxLength={20}
          register={register("name", {
            required: "이름을 입력해주세요",
            minLength: { value: 2, message: "2글자 이상 입력해주세요" },
          })}
          errors={errors?.name?.message}
        />

        <Input
          HtmlFor="birthday"
          placeholder="생년월일을 입력해주세요"
          label="생년월일 *"
          maxLength={8}
          className="flex flex-col mb-20"
          register={register("birthday", {
            required: "생년월일을 입력해주세요",
            minLength: { value: 8, message: "생년월일 8자리를 입력해주세요" },
          })}
          errors={errors?.birthday?.message}
        />

        {/* 성별 */}
        <div className="flex flex-col mb-20 font-bold text-b3 ">
          성별 *
          <Controller
            control={control}
            name="gen"
            render={({ field: { value } }) => {
              return (
                <div className="flex w-full mt-8">
                  <div
                    // aria-label="man"
                    className={cls(
                      "btn-left  btn-extra btn-full",
                      value === "0" ? "btn-fill" : " btn-fill-disabled"
                    )}
                    onClick={() => setValue("gen", "0")}
                    aria-hidden="true"
                  >
                    남자
                  </div>
                  <div
                    // aria-label="woman"
                    className={cls(
                      "btn-right btn-extra btn-full",
                      value === "1" ? "btn-fill" : " btn-fill-disabled"
                    )}
                    onClick={() => setValue("gen", "1")}
                    // onClick={() => onChange("1")}
                    aria-hidden="true"
                  >
                    여자
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* 통신사 */}
        <label htmlFor="phoneCorp" className="block mb-20 text-b3">
          <p className="mb-8 font-bold">통신사 *</p>
          <Controller
            control={control}
            name="phoneCorp"
            rules={{ required: "통신사를 선택해주세요" }}
            render={({ field: { onChange } }) => {
              const styles = {
                input: (prev: any) => ({
                  ...prev,
                  paddingRight: 8,
                  paddingTop: 8,
                  paddingBottom: 8,
                  color: "#808080",
                }),
                control: (prev: any) => ({
                  ...prev,
                  minHeight: 60,
                  borderRadius: 8,
                  paddingLeft: 8,
                  paddingRight: 8,
                  borderColor: "rgb(204, 204, 204)",
                }),
                // 구분선
                indicatorSeparator: (prev: any) => ({
                  ...prev,
                  backgroundColor: "white",
                }),
                placeholder: (prev: any) => ({
                  ...prev,
                  color: "#808080",
                }),
              };
              return (
                <Select
                  onChange={onChange}
                  options={options}
                  styles={styles}
                  placeholder="통신사를 선택해 주세요"
                  className="font-normal text-b1"
                />
              );
            }}
          />
          {errors?.phoneCorp && (
            <p className="mt-8 font-normal error">{errors.phoneCorp.message}</p>
          )}
        </label>

        <Input
          HtmlFor="phoneNo"
          label="휴대폰 *"
          placeholder="휴대폰 번호를 입력해주세요"
          maxLength={11}
          className="flex flex-col mb-20"
          register={register("phoneNo", {
            required: "휴대폰 번호를 입력해주세요",
            minLength: { value: 11, message: "휴대폰 11자리를 입력해주세요" },
          })}
          errors={errors?.phoneNo?.message}
        />
      </form>

      {/* 약관 */}
      <div className="py-20">
        <div
          className="flex items-center pb-20 mb-20 border-b-1 border-gray300"
          role="button"
          aria-hidden="true"
          onClick={termsAllCheckHandel}
        >
          <img
            src={termsLengthComparison ? CheckBoxOn : CheckBoxOff}
            alt="전체동의"
            className="w-24 h-24 mr-10"
          />
          <p className="font-bold text-h2">본인인증 약관에 전체 동의합니다.</p>
        </div>

        <ul className="mb-30">
          {fetchPassAuthenticationTermsList().map((terms, index) => {
            return (
              <li className="flex mb-16 cursor-pointer" key={terms.cluCd}>
                <label className="mr-10 cursor-pointer" htmlFor={terms.cluCd}>
                  <input
                    type="checkBox"
                    className="absolute left-[-9999px]"
                    id={terms.cluCd}
                    value={terms.cluCd}
                    onChange={(e) => {
                      changeHandel(e.currentTarget.checked, terms, index);
                    }}
                    checked={termsCheckList.find(
                      (checked: Terms) => checked.cluCd === terms.cluCd
                    )}
                  />
                  <img
                    src={
                      termsCheckList.find(
                        (checked: Terms) => checked.cluCd === terms.cluCd
                      )
                        ? CheckOn
                        : CheckOff
                    }
                    alt="체크버튼"
                    className="w-full min-w-24"
                  />
                </label>
                <p>{terms.cluShrtCtt}</p>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className={cls(
            "w-full text-center p-20 bg-[#e8e8e8] btn",
            isValid && termsLengthComparison ? "btn-fill" : "btn-fill-disabled"
          )}
          disabled={!(isValid && termsLengthComparison)}
          onClick={handleSubmit(onSubmit)}
        >
          동의하고 회원가입
        </button>
      </div>
    </Layout>
  );
}

export default SignInPark2;
