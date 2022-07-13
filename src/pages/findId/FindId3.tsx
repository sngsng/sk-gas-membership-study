import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../elements/Layout";
import urls from "../../constants/urls";

function FindId3() {
  const navigate = useNavigate();

  return (
    <Layout title="아이디 찾기">
      <div className="flex flex-col p-20">
        <div className="flex mb-30">
          <button
            className="flex-1 rounded-l btn-fill btn-extra btn-fill-disabled"
            type="button"
            onClick={() => {
              navigate(urls.FindId1);
            }}
          >
            간편찾기
          </button>
          <button className="flex-1 rounded-r btn-fill btn-extra" type="button">
            본인인증으로 찾기
          </button>
        </div>
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
          onClick={() => {
            navigate(urls.FindId4);
          }}
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

export default FindId3;
