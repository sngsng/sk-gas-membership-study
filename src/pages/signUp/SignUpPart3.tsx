/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { RequestAuthentication } from "../../apis/signUp";
import string from "../../constants/string";
import urls from "../../constants/urls";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import useModal from "../../hooks/useModal";
import { InterceptorError } from "../../network/types/interface";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signUpPart3ApiData } from "../../store/modules/ApiData";
import AuthErrorCheck from "../../util/AuthErrorCheck";

function SignInPark3() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //
  // redux
  const { certNum, check1, trCert } = useAppSelector(
    (state) => state.userApiData
  );
  // modal
  const { showAlert } = useModal();
  //
  const { mutateAsync: smsRequest, isLoading: requestSMSLoading } = useMutation(
    RequestAuthentication
  );

  const RequestForSmsAuthentication = () => {
    //
    // SMS 전송요청
    smsRequest({ certNum, check1, trCert }).then((res) => {
      console.log("----------------part3 res----------------");
      console.log(res);
      const { check1, check2, check3, certNum, result } = res;

      console.log("sms 전송 요청 part3 : ", res);

      if (result === "Y") {
        // api redex
        dispatch(
          signUpPart3ApiData({
            check1,
            check2,
            check3,
            certNum,
          })
        );
        navigate(urls.SignUpPart4);
        //
      } else if (result === "N") {
        showAlert({ title: string.AuthFailed });
      } else if (result === "F") {
        showAlert({
          title: "인증 횟수 초과",
          message:
            "하루 동안 인증 가능한 횟수를 초과하여 인증을 진행 할수 없습니다. 24시간 후 다시 시도해주세요.",
        });
      } else if (result === "E") {
        showAlert({ title: `SMS 문자 요청 ${string.Error}` });
      }
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
            showAlert({ title: "준비중" });
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
          isLoading={requestSMSLoading}
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
