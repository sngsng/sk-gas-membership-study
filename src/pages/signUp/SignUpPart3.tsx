/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { RequestAuthentication } from "../../apis/signUp";
import string from "../../constants/string";
import urls from "../../constants/urls";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signUpPart3ApiData } from "../../store/modules/ApiData";

function SignInPark3() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // redux
  const userApiData = useAppSelector((state) => state.userApiData);

  console.log("----------------userApiData!!!!----------------");
  console.log(userApiData);

  const { mutateAsync: smsRequestPress, isLoading } = useMutation(
    RequestAuthentication
  );

  // 필요한 데이터 받아서 리덕스에 넣어줌.
  const RequestForSmsAuthentication = () => {
    // console.clear();
    console.log("----------------userApiData----------------");
    console.log(userApiData);
    //
    // SMS 인증문자 요청
    smsRequestPress(userApiData).then((res) => {
      //
      console.log("----------------smsRequest : res----------------");
      console.log(res);
      //
      const { check1, check2, check3, certNum } = res;
      //
      // api redux
      dispatch(
        signUpPart3ApiData({
          check1,
          check2,
          check3,
          certNum,
        })
      );
      navigate(urls.SignUpPart4);
    });
  };

  return (
    <Layout title={string.MobileMembershipRegistration}>
      <div className="flex flex-col p-20">
        <h2 className="text-h2 mb-30">인증수단 선택</h2>
        <Button
          className="mb-10 btn-extra"
          isBtnCheck
          text={string.AuthenticateWithApp}
          onClick={() => {
            console.log("준비중...");
          }}
        />
        <p className="dot">
          PASS 앱 푸시알림을 통한 본인인증을 완료한 후 위 버튼을 눌러주시면
          본인인증 절차가 완료됩니다.
        </p>
        <p className="mb-40 dot">
          푸시알림을 받지 못한 경우, 아래 버튼을 눌러 휴대폰 문자인증을 통해
          본인인증 절차를 완료해 주세요.
        </p>
        <Button
          className="mb-10 btn-extra btn-line"
          text={string.AuthenticateWithPhone}
          isBtnCheck
          isLoading={isLoading}
          LoadingColor="blue"
          type="line"
          onClick={RequestForSmsAuthentication}
        />
        <p className="dot">
          입력하신 휴대폰 번호로 발송된 보안코드를 통해 본인인증을 진행합니다.
        </p>
      </div>
    </Layout>
  );
}

export default SignInPark3;
