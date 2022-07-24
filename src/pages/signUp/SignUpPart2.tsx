/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckBoxOff, CheckOff } from "../../assets/index";
import urls from "../../constants/urls";
// import Select from "react-select";
import Layout from "../../elements/Layout";
import cls from "../../util";

function SignInPark2() {
  const navigate = useNavigate();
  const [checkList, setCheckList] = useState({
    birthdayCheck: false,
    phoneNumberCheck: false,
  });
  const [nextData, setNextData] = useState({
    name: "",
    birthday: "",
    gen: "0",
    phoneCorp: "",
    phoneNo: "",
  });

  console.log(nextData);

  const { name, birthday, phoneNo } = nextData;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setNextData({
      ...nextData,
      [name]: value,
    });
  };

  const birthdayCheck = () => {
    if (nextData.birthday.length !== 8) {
      setCheckList({
        ...checkList,
        birthdayCheck: true,
      });
    } else {
      setCheckList({
        ...checkList,
        birthdayCheck: false,
      });
    }
  };

  const phoneNumberCheck = () => {
    if (nextData.phoneNo.length !== 11) {
      setCheckList({
        ...checkList,
        phoneNumberCheck: true,
      });
    } else {
      setCheckList({
        ...checkList,
        phoneNumberCheck: false,
      });
    }
  };

  console.log(checkList);

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20 mb-40">
        <p className="mb-30 text-h2">본인인증</p>

        {/* park1에도 label쪽 코드 이렇게 수정 그리고, 포커스때 label에 색 바껴야됨. */}
        <label
          htmlFor="userName"
          className="flex flex-col mb-20 font-bold text-b3"
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
          className="flex flex-col mb-20 font-bold text-b3"
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
            onBlur={birthdayCheck}
          />
          {checkList.birthdayCheck && (
            <p className="mt-8 error">생년월일 8자리를 입력해 주세요</p>
          )}
        </label>
        <div className="flex flex-col mb-20 font-bold text-b3">
          성별 *
          <div className="flex w-full mt-8">
            <button
              className={cls(
                "flex-1 btn-extra  rounded-l-[8px]",
                nextData.gen === "0" ? "btn-fill" : "btn-fill-disabled"
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
                nextData.gen === "1" ? "btn-fill" : "btn-fill-disabled"
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
          className="flex flex-col mb-20 font-bold text-b3"
        >
          통신사 *
          {/* <Select
          /> */}
          {/* phoneCorp */}
          {/* 일단 패키지 사용 해야되는 곳 */}
        </label>
        <label htmlFor="phoneNo" className="flex flex-col font-bold text-b3">
          휴대폰 번호 *
          <input
            className="mt-8 label-input"
            type="text"
            placeholder="휴대폰 번호를 입력해 주세요"
            id="phoneNo"
            name="phoneNo"
            value={phoneNo}
            onBlur={phoneNumberCheck}
            onChange={onChange}
          />
          {checkList.phoneNumberCheck && (
            <p className="mt-8 error">휴대폰 번호를 입력해 주세요</p>
          )}
        </label>
      </form>
      <div className="p-20">
        <div
          className="flex items-center pb-20 mb-20 border-b-1 border-gray300"
          role="button"
          aria-hidden="true"
          onClick={() => {
            console.log("22");
          }}
        >
          <img src={CheckBoxOff} alt="전체동의" className="w-24 h-24 mr-10" />
          <p className="font-bold text-h2">본인인증 약관에 전체 동의합니다.</p>
        </div>
        <ul className="mb-30">
          {/* map 돌려야되는 부분 */}
          <li className="flex mb-16 cursor-pointer">
            <div className="mr-10">
              <img src={CheckOff} alt="체크버튼" className="w-full" />
            </div>
            <Link to="/">(필수)SK LPG 행복충전 멤버쉽 서비스 약관</Link>
          </li>
          <li className="flex mb-16 cursor-pointer">
            <div className="mr-[10px]">
              <img src={CheckOff} alt="체크버튼" className="w-full" />
            </div>
            <Link to="/">(필수)SK LPG 행복충전 개인정보 수집 및 이용</Link>
          </li>
          <li className="flex cursor-pointer">
            <div className="mr-[10px]">
              <img src={CheckOff} alt="체크버튼" className="w-full" />
            </div>
            <Link to="/">(필수)OCB 카드서비스/회원서비스 약관</Link>
          </li>
        </ul>

        <button
          type="button"
          className="w-full text-center p-20 bg-[#e8e8e8] btn btn-fill btn-fill-disabled"
          // 여기서 cla써서 조건 줘서 클래서 먹이는거~!!
          onClick={() => {
            navigate(urls.SignUpPart3);
          }}
        >
          동의하고 회원가입
        </button>
      </div>
    </Layout>
  );
}

export default SignInPark2;
