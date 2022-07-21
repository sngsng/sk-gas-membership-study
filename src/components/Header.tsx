import React from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../assets";
import urls from "../constants/urls";
import { useAppDispatch } from "../store/hook";
import { addCluAgrList } from "../store/modules/User";

interface HeadTitle {
  title?: string;
  backBtn?: boolean;
}

function Header({ title, backBtn }: HeadTitle) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-center w-full bg-white border-b max-w-480 min-w-360 h-61 border-grey-200">
      {backBtn && (
        <button
          className="absolute left-20"
          onClick={() => {
            if (window.location.pathname === urls.AccepTerms) {
              dispatch(addCluAgrList([]));
            }
            navigate(-1);
          }}
          type="button"
        >
          <img src={Back} alt="뒤로가기" />
        </button>
      )}
      <p className="py-10 font-semibold text-b1">{title}</p>
    </header>
  );
}

Header.defaultProps = {
  title: "",
  backBtn: true,
};

export default Header;
