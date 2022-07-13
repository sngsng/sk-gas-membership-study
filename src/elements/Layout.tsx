import React from "react";
import BottomMenu from "../component/BottomMenu";
import Header from "../component/Header";
import cls from "../util/index";

type ILayout = {
  children: React.ReactNode;
  isHeader?: boolean;
  isMenu?: boolean;
  title?: string;
  backBtn?: boolean;
};

export default function Layout({
  isHeader,
  isMenu,
  children,
  title,
  backBtn,
}: ILayout) {
  return (
    <div
      className={cls(
        "relative max-w-480 min-w-360 h-[100%] mx-auto bg-[##f8f8f8]",
        "font-semibold"
      )}
    >
      {isHeader && <Header title={title} backBtn={backBtn} />}
      {children}
      {isMenu && <BottomMenu />}
    </div>
  );
}

Layout.defaultProps = {
  isHeader: true,
  isMenu: false,
  backBtn: true,
  title: "",
};
