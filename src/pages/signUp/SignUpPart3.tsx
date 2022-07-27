/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ApiUrls from "../../constants/api_urls";
import urls from "../../constants/urls";
import Layout from "../../elements/Layout";
import hmsRequest from "../../network";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { signUpPart3 } from "../../store/modules/ApiData";

interface RequestAuthenticationBody {
  certNum: string;
  check1: string;
  trCert: string;
}

function SignInPark3() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userAPiData = useAppSelector((state) => state.userApiData);
  const test = useAppSelector((state) => state);
  console.log(test);

  // api 호출. / api파일로 옮기기
  const RequestAuthentication = async (body: RequestAuthenticationBody) => {
    const { data } = await hmsRequest(ApiUrls.REQUEST_SMS1, body);
    const { responseData } = data;
    return responseData;
  };

  const { mutateAsync: smsRequestPress } = useMutation(RequestAuthentication);

  // 필요한 데이터 받아서 리덕스에 넣어줌.
  const RequestForSmsAuthentication = () => {
    smsRequestPress(userAPiData).then((res) => {
      const { check1, check2, check3, certNum } = res;
      dispatch(
        signUpPart3({
          check1,
          check2,
          check3,
          certNum,
          trCert: "",
          // 이 부분..
        })
      );
    });

    // navigate(urls.SignUpPart4);

    // 필요한 데이터
    // certNum, check1, check2, check3

    // part4에서 필요한듯하다.
    // smsNum <==
  };

  // 다음 이동 페이지

  console.log(userAPiData);
  return (
    <Layout title="행복한충전모바일 회원가입">
      <div className="flex flex-col p-20">
        <h2 className="text-h2 mb-30">인증수단 선택</h2>
        <button className="mb-10 btn btn-fill btn-extra" type="button">
          PASS 앱으로 인증완료
        </button>
        <p className="dot">
          PASS 앱 푸시알림을 통한 본인인증을 완료한 후 위 버튼을 눌러주시면
          본인인증 절차가 완료됩니다.
        </p>
        <p className="mb-40 dot">
          푸시알림을 받지 못한 경우, 아래 버튼을 눌러 휴대폰 문자인증을 통해
          본인인증 절차를 완료해 주세요.
        </p>
        <button
          className="mb-10 btn btn-line btn-extra"
          type="button"
          onClick={RequestForSmsAuthentication}
        >
          휴대폰으로 인증하기
        </button>
        <p className="dot">
          입력하신 휴대폰 번호로 발송된 보안코드를 통해 본인인증을 진행합니다.
        </p>
      </div>
    </Layout>
  );
}

export default SignInPark3;
