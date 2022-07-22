import React from "react";
import { Terms } from "../apis/signUp/types/responses";
import { CheckOff, CheckOn } from "../assets";

interface TermsCheckItemProps {
  terms: Terms;
  changeHandel: (check: boolean, id: Terms) => void;
  checkList: Terms | any;
}

function TermCheckItem({
  terms,
  changeHandel,
  checkList,
}: TermsCheckItemProps) {
  return (
    <li className="flex mb-16 cursor-pointer last:mb-0" aria-hidden="true">
      <label className="mr-10 cursor-pointer" htmlFor={terms.cluCd}>
        <input
          type="checkbox"
          className="absolute left-[-9999px]"
          id={terms.cluCd}
          value={terms.cluCd}
          onChange={(e) => {
            changeHandel(e.currentTarget.checked, terms);
          }}
          checked={
            checkList.find(
              (checked: Terms) => checked.cluCd === terms.cluCd
            ) !== undefined
          }
        />
        <img
          src={
            checkList.find((checked: Terms) => checked.cluCd === terms.cluCd)
              ? CheckOn
              : CheckOff
          }
          alt="체크버튼"
          className="w-full min-w-24"
        />
      </label>
      <p>{terms.cluShrtCtt}</p>
    </li>
  );
}

interface TermsCheckListProps {
  termsListData: Terms[];
  changeHandel: (check: boolean, id: Terms) => void;
  checkList: Terms | any;
}

function TermsCheckList({
  termsListData,
  changeHandel,
  checkList,
}: TermsCheckListProps) {
  return (
    <>
      <ul>
        {termsListData?.map((terms) => {
          return (
            <TermCheckItem
              key={terms.cluCd}
              terms={terms}
              changeHandel={changeHandel}
              checkList={checkList}
            />
          );
        })}
      </ul>
    </>
  );
}

export default TermsCheckList;
