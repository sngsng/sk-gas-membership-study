/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import urls from "../constants/urls";
import Layout from "../elements/Layout";
import useModal from "../hooks/useModal";
import { useAppDispatch } from "../store/hook";
import { userDataReset } from "../store/modules/User";
import { resetToken } from "../util/Auth";

function Mypage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandel = () => {
    navigate(urls.Main, { replace: true });
    dispatch(userDataReset());
    resetToken();
  };

  return (
    <Layout isMenu>
      <div className="h-[95vh] flex flex-col items-center justify-center">
        <h1 className="mb-50 text-h1">mypage</h1>
        <button
          type="button"
          className="py-10 px-20 rounded shadow-[0_0_3px_.5px_#a5a5a5] "
          onClick={logoutHandel}
        >
          logout
        </button>
      </div>
    </Layout>
  );
}

export default Mypage;
