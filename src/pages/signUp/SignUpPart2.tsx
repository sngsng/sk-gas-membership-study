import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckBoxOff, CheckOff } from "../../assets/index";
import urls from "../../constants/urls";
// import Select, { Options } from "react-select";
import Layout from "../../elements/Layout";

// interface GroupBase<Option> {
//   readonly options: readonly Option[];
//   readonly label?: string;
// }

// const options: GroupBase<Options> = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

function SignInPark2() {
  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Layout title="행복충전모바일 회원가입">
      <form className="p-20 mb-40">
        <p className="mb-30 text-h2">본인인증</p>

        {/* park1에도 label쪽 코드 이렇게 수정 그리고, 포커스때 label에 색 바껴야됨. */}
        <label htmlFor="useName" className="flex flex-col mb-20 text-b3">
          이름 *
          <input
            className="label-input "
            type="text"
            placeholder="이름을 입력해주세요"
            id="useName"
            name="name"
          />
          <p className="hidden">최소 2글자 이상 입력해주세요</p>
        </label>
        <label htmlFor="useName" className="flex flex-col mb-20 text-b3">
          생년월일 *
          <input
            className="label-input "
            type="text"
            placeholder="생년월일을 입력해주세요"
            id="useName"
            name="name"
          />
          <p className="hidden">생년월일 8자리를 입력해 주세요</p>
        </label>
        <div className="flex flex-col mb-20 text-b3">
          성별 *
          <div className="flex w-full">
            <button
              className="flex-1 btn-extra btn-fill rounded-l-[8px]"
              // btn-fill-disabled
              type="button"
            >
              남자
            </button>
            <button
              className="flex-1 btn-extra btn-fill btn-fill-disabled rounded-r-[8px]"
              type="button"
            >
              여자
            </button>
          </div>
        </div>
        <label htmlFor="newsAgency" className="flex flex-col mb-20 text-b3">
          통신사 *
          {/* <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          /> */}
          {/* 일단 패키지 사용 해야되는 곳 */}
        </label>
        <label htmlFor="useNumber" className="flex flex-col text-b3">
          휴대폰 번호 *
          <input
            className="label-input "
            type="text"
            placeholder="휴대폰 번호를 입력해 주세요"
            id="useNumber"
            name="useNumber"
          />
          <p className="hidden mt-8 label-text error">
            휴대폰 번호를 입력해 주세요
          </p>
        </label>
      </form>
      <div
        className="flex items-center pb-20 mb-20 border-b-1 border-gray300"
        role="button" // aria-hidden 을 쓰는게 좋은지 role=button을 쓰는게 좋은지 헷갈린다.
        // onClick={() => {}} // 이부분은 Visible, non-interactive elements with click handlers must have at least one keyboard listener
      >
        <img src={CheckBoxOff} alt="전체동의" className="w-24 h-24 mr-10" />
        <p className="font-bold text-h2">본인인증 약관에 전체 동의합니다.</p>
      </div>
      <ul className="mb-30">
        {/* map 돌려야되는 부분 */}
        <li className="flex mb-16 cursor-pointer">
          <div className="mr-10">
            <img src={CheckOff} alt="체크버튼" className="w-full" />
          </div>
          <Link to="/">(필수)SK LPG 행복충전 멤버쉽 서비스 약관</Link>
        </li>
        <li className="flex mb-16 cursor-pointer">
          <div className="mr-[10px]">
            <img src={CheckOff} alt="체크버튼" className="w-full" />
          </div>
          <Link to="/">(필수)SK LPG 행복충전 개인정보 수집 및 이용</Link>
        </li>
        <li className="flex cursor-pointer">
          <div className="mr-[10px]">
            <img src={CheckOff} alt="체크버튼" className="w-full" />
          </div>
          <Link to="/">(필수)OCB 카드서비스/회원서비스 약관</Link>
        </li>
      </ul>
      <button
        type="button"
        className="w-full text-center p-20 bg-[#e8e8e8] btn btn-fill btn-fill-disabled"
        // 여기서 cla써서 조건 줘서 클래서 먹이는거~!!
        onClick={() => {
          navigate(urls.SignUpPart3);
        }}
      >
        동의하고 회원가입
      </button>
    </Layout>
  );
}

export default SignInPark2;
