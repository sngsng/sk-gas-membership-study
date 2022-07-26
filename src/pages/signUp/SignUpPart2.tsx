/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { CheckBoxOff, CheckBoxOn, CheckOff, CheckOn } from "../../assets/index";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";
import cls from "../../util";
import { fetchPassAuthenticationTermsList } from "../../apis/signUp";
import { Terms } from "../../apis/signUp/types/responses";

interface IFormInput {
  phoneCorp: { label: string; value: string };
}

function SignInPark2() {
  const navigate = useNavigate();
  const { control } = useForm<IFormInput>();
  const [termsCheckList, setTermsCheckList] = useState<Terms[] | any>([]);
  const termsDataLength = fetchPassAuthenticationTermsList().length;
  const termsCheckListLength = termsCheckList.length;
  const termsLengthComparison = termsCheckListLength === termsDataLength;
  const [isCheckList, setIsCheckList] = useState({
    birthdayCheck: false,
    phoneNumberCheck: false,
    phoneCorpCheck: false,
    termsAllCheck: false,
  });
  const [nextData, setNextData] = useState({
    name: "",
    birthday: "",
    gen: "0",
    phoneCorp: "",
    phoneNo: "",
    nation: "0",
    terms1chk: "",
    terms2chk: "",
    terms3chk: "",
    terms4chk: "",
  });
  const { name, birthday, phoneNo, phoneCorp, gen } = nextData;
  const { birthdayCheck, phoneCorpCheck, phoneNumberCheck, termsAllCheck } =
    isCheckList;

  console.log("nextData : ", nextData);

  // 정보 입력 하는곳
  const onChange = (e: any) => {
    const { value, name } = e.target;
    setNextData({
      ...nextData,
      [name]: value,
    });
  };

  // 생일 입력 체크
  const birthdayIsCheck = () => {
    if (birthday.length !== 8) {
      setIsCheckList({
        ...isCheckList,
        birthdayCheck: true,
      });
    } else {
      setIsCheckList({
        ...isCheckList,
        birthdayCheck: false,
      });
    }
  };

  // 휴대폰 갯수 체크
  const phoneNumberIsCheck = () => {
    if (phoneNo.length !== 11) {
      setIsCheckList({
        ...isCheckList,
        phoneNumberCheck: true,
      });
    } else {
      setIsCheckList({
        ...isCheckList,
        phoneNumberCheck: false,
      });
    }
  };

  // terms all btn 상태체크
  useEffect(() => {
    if (termsLengthComparison) {
      setIsCheckList({ ...isCheckList, termsAllCheck: true });
    } else {
      setIsCheckList({ ...isCheckList, termsAllCheck: false });
    }
  }, [termsCheckList]);

  // terms all 체크 클릭시
  const termsAllCheckHandel = () => {
    if (termsAllCheck === false) {
      setIsCheckList({ ...isCheckList, termsAllCheck: true });
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
      setIsCheckList({ ...isCheckList, termsAllCheck: false });
      setNextData({
        ...nextData,
        terms1chk: "",
        terms2chk: "",
        terms3chk: "",
        terms4chk: "",
      });
    }
  };

  // terms "Y" 체크후 입력 & 제거
  const termsRequired = (index: number) => {
    switch (index) {
      case 0:
        if (nextData.terms1chk) {
          console.log("@@@");
          setNextData({ ...nextData, terms1chk: "" });
        } else {
          console.log("!!!");
          setNextData({ ...nextData, terms1chk: "Y" });
        }
        break;
      case 1:
        if (nextData.terms2chk) {
          setNextData({ ...nextData, terms2chk: "" });
        } else {
          setNextData({ ...nextData, terms2chk: "Y" });
        }
        break;
      case 2:
        if (nextData.terms3chk) {
          setNextData({ ...nextData, terms3chk: "" });
        } else {
          setNextData({ ...nextData, terms3chk: "Y" });
        }
        break;
      case 3:
        if (nextData.terms4chk) {
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

  // input값 있는지 체크
  const inputDataCheck = () => {
    if (name && birthday && phoneNo && phoneCorp) {
      return true;
    }
    return false;
  };

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20">
        <p className="mb-30 text-h2">본인인증</p>

        <label
          htmlFor="userName"
          className="flex flex-col mb-20 font-bold text-b3 focus-within:text-blue"
        >
          이름 *
          <input
            className="mt-8 label-input"
            type="text"
            placeholder="이름을 입력해주세요"
            id="userName"
            name="name"
            value={name}
            onChange={onChange}
          />
          <p className="hidden">최소 2글자 이상 입력해주세요</p>
        </label>
        <label
          htmlFor="birthday"
          className="flex flex-col mb-20 font-bold text-b3 focus-within:text-blue"
        >
          생년월일 *
          <input
            className="mt-8 label-input"
            type="text"
            placeholder="생년월일을 입력해주세요"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={onChange}
            onBlur={birthdayIsCheck}
          />
          {birthdayCheck && (
            <p className="mt-8 error">생년월일 8자리를 입력해 주세요</p>
          )}
        </label>
        <div className="flex flex-col mb-20 font-bold text-b3 ">
          성별 *
          <div className="flex w-full mt-8">
            <button
              className={cls(
                "flex-1 btn-extra  rounded-l-[8px]",
                gen === "0" ? "btn-fill" : "btn-fill-disabled"
              )}
              // btn-fill-disabled
              type="button"
              value="man"
              onClick={() => {
                setNextData({ ...nextData, gen: "0" });
              }}
            >
              남자
            </button>
            <button
              className={cls(
                "flex-1 btn-extra  rounded-r-[8px]",
                gen === "1" ? "btn-fill" : "btn-fill-disabled"
              )}
              type="button"
              value="girl"
              onClick={() => {
                setNextData({
                  ...nextData,
                  gen: "1",
                });
              }}
            >
              여자
            </button>
          </div>
        </div>
        <label
          htmlFor="newsAgency"
          className="flex flex-col mb-20 font-bold text-b3 focus-within:text-blue"
        >
          <p className="mb-8 font-bold text-b3">통신사 *</p>
          <Controller
            name="phoneCorp"
            render={() => {
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
                  className="font-bold text-black text-b1 "
                  options={[
                    { value: "SKT", label: "SK텔레콤" },
                    { value: "KTF", label: "KT" },
                    { value: "LGT", label: "LG U+" },
                    { value: "SKM", label: "SKT 알뜰폰" },
                    { value: "KTM", label: "KT 알뜰폰" },
                    { value: "LGM", label: "LG 알뜰폰" },
                  ]}
                  styles={styles}
                  isSearchable={false}
                  defaultValue={{ label: "통신사를 선택해주세요", value: "" }}
                  onChange={(e) => {
                    setNextData({
                      ...nextData,
                      phoneCorp: e?.value as string,
                    });

                    setIsCheckList({ ...isCheckList, phoneCorpCheck: false });
                  }}
                  onBlur={() => {
                    phoneCorp === ""
                      ? setIsCheckList({ ...isCheckList, phoneCorpCheck: true })
                      : setIsCheckList({
                          ...isCheckList,
                          phoneCorpCheck: false,
                        });
                  }}
                />
              );
            }}
            control={control}
          />

          {phoneCorpCheck && (
            <p className="mt-8 font-bold error text-b3">
              통신사를 선택해주세요.
            </p>
          )}
        </label>
        <label
          htmlFor="phoneNo"
          className="flex flex-col font-bold text-b3 focus-within:text-blue"
        >
          휴대폰 번호 *
          <input
            className="mt-8 label-input"
            type="text"
            placeholder="휴대폰 번호를 입력해 주세요"
            id="phoneNo"
            name="phoneNo"
            value={phoneNo}
            onBlur={phoneNumberIsCheck}
            onChange={onChange}
          />
          {phoneNumberCheck && (
            <p className="mt-8 error">휴대폰 번호를 입력해 주세요</p>
          )}
        </label>
      </form>
      <div className="p-20">
        <div
          className="flex items-center pb-20 mb-20 border-b-1 border-gray300"
          role="button"
          aria-hidden="true"
          onClick={termsAllCheckHandel}
        >
          <img
            src={termsAllCheck ? CheckBoxOn : CheckBoxOff}
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
            "w-full text-center p-20 bg-[#e8e8e8] btn btn-fill",
            termsLengthComparison && inputDataCheck()
              ? "btn-fill"
              : "btn-fill-disabled"
          )}
          disabled={!(termsLengthComparison && inputDataCheck())}
          onClick={() => {
            // navigate(urls.SignUpPart3);
            console.log("!!!");
          }}
        >
          동의하고 회원가입
        </button>
      </div>
    </Layout>
  );
}

export default SignInPark2;
