import React from "react";
import { NavLink } from "react-router-dom";
import {
  MembershipOn,
  // MembershopOff,
  // HomeOn,
  HomeOff,
  // MypageOn,
  MypageOff,
} from "../assets/index";
// const [isCheck, setCheck] = useState(false);

function BottomMenu() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center w-full mx-auto bg-white max-w-480 min-w-360 h-54 ">
      <NavLink to="/" className="cursor-pointer w-[33%] text-center py-5">
        <img className="mx-auto" src={MembershipOn} alt="멤버쉽" />
        <p className="text-b3">멤버쉽</p>
      </NavLink>
      <NavLink to="sign-in" className="cursor-pointer w-[33%] text-center py-5">
        <img className="mx-auto" src={HomeOff} alt="홈" />
        <p className="text-b3">홈</p>
      </NavLink>
      <NavLink to="mypage" className="cursor-pointer w-[33%] text-center py-5">
        <img className="mx-auto" src={MypageOff} alt="마이페이지" />
        <p className="text-b3">마이 페이지</p>
      </NavLink>
    </div>
  );
}

export default BottomMenu;
