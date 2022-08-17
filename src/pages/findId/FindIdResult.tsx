/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from "react";
import string from "../../constants/string";
import urls from "../../constants/urls";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import useRouter from "../../hooks/useRouter";

interface FindId {
  lognId?: string;
  joinDt?: string;
}

function FindIdResult() {
  const { state, replace } = useRouter();

  const { lognId, joinDt } = (state || { lognId: "", joinDt: "" }) as FindId;

  //
  // 가입일
  const year = joinDt?.slice(0, 4);
  const month = joinDt?.slice(4, 6);
  const day = joinDt?.slice(6);

  return (
    <Layout title="아이디 찾기">
      <div className="p-20 text-center">
        <h2 className="mb-16 font-semibold text-h1 text-blue">인증 완료</h2>
        <p className="text-gray500 text-b1 mb-30">고객님의 아이디입니다.</p>
        <div className="flex flex-col items-center justify-center mb-20 rounded bg-gray150 min-h-170">
          <p className="mb-6">아이디</p>
          <p className="pb-16">{lognId || ""}</p>

          <p className="text-gray500 text-b3">
            가입일{" "}
            <span>
              {year || ""}-{month || ""}-{day || ""}
            </span>
          </p>
        </div>
        <div className="flex max-h-60">
          <Button
            text="로그인"
            className="p-20"
            isBtnCheck
            onClick={() => {
              replace(urls.Login);
            }}
          />
          <Button
            text="비밀번호 재설정"
            className="p-20 ml-10"
            isBtnCheck
            onClick={() => {
              console.log("비밀번호 재설정 링크");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default FindIdResult;
