/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../constants/urls";
import Layout from "../elements/Layout";

function NotFound() {
  const navigate = useNavigate();
  const [sec, setSec] = useState(3);
  const time = useRef(0);
  const timerId = useRef<any>(null);

  useEffect(() => {
    time.current = 3;

    timerId.current = setInterval(() => {
      setSec((time.current -= 1));
      if (time.current === 0) {
        navigate(urls.Main, { replace: true });
        clearInterval(timerId.current);
      }
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);
  return (
    <Layout title="행복트럭 B2, B7 가입">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div>
          <p className="mb-10 text-center text-h1 text-red">
            잘못된 주소 입니다.
          </p>
          <p className="font-bold text-b1">
            {sec}초 후에 메인 페이지로 이동합니다!
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
