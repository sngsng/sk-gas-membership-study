import React from "react";
import { NavLink } from "react-router-dom";
import {
  MembershipOn,
  HomeOn,
  HomeOff,
  MypageOn,
  MypageOff,
  MembershipOff,
} from "../assets/index";
import urls from "../constants/urls";
import useRouter from "../hooks/useRouter";
import { useAppSelector } from "../store/hook";

function BottomMenu() {
  const { pathname } = useRouter();
  const isLogin = useAppSelector((state) => state.user.isLogin);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center w-full mx-auto bg-white max-w-480 min-w-360 h-54 ">
      <NavLink to="/" className="cursor-pointer w-[33%] text-center py-5">
        <img
          className="mx-auto"
          src={pathname === urls.Main ? MembershipOn : MembershipOff}
          alt="멤버쉽"
        />
        <p className="text-b3">멤버쉽</p>
      </NavLink>
      <NavLink
        to={isLogin ? urls.Home : urls.SignIn}
        className="cursor-pointer w-[33%] text-center py-5"
      >
        <img
          className="mx-auto"
          src={pathname === urls.Home ? HomeOn : HomeOff}
          alt="홈"
        />
        <p className="text-b3">홈</p>
      </NavLink>
      <NavLink
        to={isLogin ? urls.Mypage : urls.SignIn}
        className="cursor-pointer w-[33%] text-center py-5"
      >
        <img
          className="mx-auto"
          src={pathname === urls.Mypage ? MypageOn : MypageOff}
          alt="마이페이지"
        />
        <p className="text-b3">마이 페이지</p>
      </NavLink>
    </div>
  );
}

export default BottomMenu;
