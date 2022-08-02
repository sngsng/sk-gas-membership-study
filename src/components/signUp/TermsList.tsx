import React from "react";
import { Terms } from "../../apis/signUp/types/responses";
import { CheckBoxOff, CheckBoxOn, CheckOff, CheckOn } from "../../assets";
import cls from "../../util";

interface TermsListCheckBoxProps {
  terms: Terms;
  changeHandel: (check: boolean, terms: Terms, index?: number) => void;
  termsCheckList: any;
  index: number;
}

function TermsListCheckBox({
  terms,
  changeHandel,
  termsCheckList,
  index,
}: TermsListCheckBoxProps) {
  return (
    <>
      <label className="mr-10 cursor-pointer" htmlFor={terms.cluCd}>
        <input
          type="checkBox"
          className="absolute left-[-9999px]"
          id={terms.cluCd}
          value={terms.cluCd}
          onChange={(e) => {
            changeHandel(e.currentTarget.checked, terms, index + 1);
          }}
          checked={termsCheckList.find(
            (checked: Terms) => checked.cluCd === terms.cluCd
          )}
        />
        <img
          className="w-full min-w-24"
          src={
            termsCheckList.find(
              (checked: Terms) => checked.cluCd === terms.cluCd
            )
              ? CheckOn
              : CheckOff
          }
          alt="체크버튼"
        />
      </label>
      <p>{terms.cluShrtCtt}</p>
    </>
  );
}

interface TermsListProps {
  className?: string;
  allCheckTitle: string;
  changeHandel: (check: boolean, terms: Terms, index?: number) => void;
  termsData?: Terms[];
  termsAllCheckHandel?: () => void;
  termsCheckList: Terms[] | any;
  termsLengthComparison?: boolean;
}

function TermsList({
  className = "",
  allCheckTitle,
  termsLengthComparison = false,
  termsAllCheckHandel,
  termsData,
  changeHandel,
  termsCheckList,
}: TermsListProps) {
  // all check 넣기

  return (
    <div>
      <div
        className={cls(
          "flex items-center pb-20 mb-20 border-b-1 border-gray300",
          className
        )}
        role="button"
        aria-hidden="true"
        onClick={termsAllCheckHandel}
      >
        <img
          src={termsLengthComparison ? CheckBoxOn : CheckBoxOff}
          alt="전체동의"
          className="w-24 h-24 mr-10"
        />
        <p className="font-bold text-h2">{allCheckTitle}</p>
      </div>

      <ul className="mb-30">
        {!termsData ? (
          <p>로딩중입니다... </p>
        ) : (
          termsData.map((terms, index) => {
            return (
              <li className="flex mb-16 cursor-pointer" key={terms.cluCd}>
                <TermsListCheckBox
                  changeHandel={changeHandel}
                  termsCheckList={termsCheckList}
                  terms={terms}
                  index={index}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default TermsList;
