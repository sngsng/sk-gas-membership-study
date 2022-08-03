/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Terms } from "../../apis/signUp/types/responses";
import { CheckBoxOff, CheckBoxOn, CheckOff, CheckOn } from "../../assets";
import cls, { requiredLengthCheck } from "../../util";

interface TermsListCheckBoxProps {
  terms: Terms;
  termsCheckList: Terms[];
  setTermsCheckList: React.Dispatch<React.SetStateAction<Terms[]>>;
}

function TermsListCheckBox({
  terms,
  termsCheckList,
  setTermsCheckList,
}: TermsListCheckBoxProps) {
  // 체크 했는지 여부 체크
  const isChecked = () => {
    return (
      termsCheckList.find((checked: Terms) => checked.cluCd === terms.cluCd) !==
      undefined
    );
  };
  //
  //  개별 체크
  const termsCheckHandle = (check: boolean, terms: Terms) => {
    if (check) {
      setTermsCheckList([...termsCheckList, terms]);
    } else {
      setTermsCheckList(
        termsCheckList?.filter((value: Terms) => {
          return value.cluCd !== terms.cluCd;
        })
      );
    }
  };

  return (
    <>
      <label className="mr-10 cursor-pointer" htmlFor={terms.cluCd}>
        <input
          type="checkBox"
          className="absolute left-[-9999px]"
          id={terms.cluCd}
          value={terms.cluCd}
          onChange={(e) => {
            termsCheckHandle(e.currentTarget.checked, terms);
          }}
          checked={isChecked()}
        />
        <img
          className="w-full min-w-24"
          src={isChecked() ? CheckOn : CheckOff}
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
  setTermsCheckList: React.Dispatch<React.SetStateAction<Terms[]>>;
  termsListData?: Terms[];
  termsCheckList: Terms[];
}

function TermsList({
  className = "",
  allCheckTitle,
  termsListData,
  termsCheckList,
  setTermsCheckList,
}: TermsListProps) {
  //
  // allCheck 상태관리
  const [allTermsChecked, setAllTermsChecked] = useState(false);
  //
  //
  // checkList에 값이 변동 될때마다 실행해서 체크해주는거.
  useEffect(() => {
    setAllTermsChecked(termsListData?.length === termsCheckList?.length);
  }, [termsCheckList]);
  //
  //
  // allBtn press Fn
  const termsAllCheckHandel = () => {
    if (!allTermsChecked && !!termsListData) {
      setAllTermsChecked(true);
      setTermsCheckList([]);
      setTermsCheckList(termsListData);
    } else {
      setAllTermsChecked(false);
      setTermsCheckList([]);
    }
  };
  //

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
          src={allTermsChecked ? CheckBoxOn : CheckBoxOff}
          alt="전체동의"
          className="w-24 h-24 mr-10"
        />
        <p className="font-bold text-h2">{allCheckTitle}</p>
      </div>

      <ul className="mb-30">
        {!termsListData ? (
          <p>로딩중입니다... </p>
        ) : (
          termsListData.map((terms) => {
            return (
              <li className="flex mb-16 cursor-pointer" key={terms.cluCd}>
                <TermsListCheckBox
                  termsCheckList={termsCheckList}
                  setTermsCheckList={setTermsCheckList}
                  terms={terms}
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
