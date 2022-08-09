import React from "react";
import {
  MainBenefitKia1,
  MainBenefitKia2,
  MembershipThumbKia1,
  MembershipThumbKia2,
} from "../assets/index";
import Layout from "../elements/Layout";

interface Data {
  title: string;
  subTitle: string;
  benefit?: string;
  thumb?: string;
  texts?: string[] | undefined;
  children?: React.ReactNode;
}

const datas: Data[] = [
  {
    title: "행복트럭 B2",
    subTitle: "가입비 | 20,000원 / 년",
    benefit: MembershipThumbKia1,
    thumb: MainBenefitKia1,
    texts: [
      "즉시할인 30원/L 또는 머핀 포인트 추가 적립 3%",
      "머핀포인트 기본 적립 0.5%",
      "기아멤버스 포인트 적립 0.5%",
    ],
  },
  {
    title: "행복트럭 B7",
    subTitle: "가입비 | 70,000원 / 년",
    benefit: MembershipThumbKia2,
    thumb: MainBenefitKia2,
    texts: [
      "즉시할인 30원/L 또는 머핀 포인트 추가 적립 3%",
      "머핀 포인트 기본 적립 0.5%",
      "기아멤버스 포인트 적립 0.5%",
      "정비 및 운전자보험 혜택 제공",
    ],
  },
  {
    title: "유료멤버십A상품",
    subTitle: "가입비 | 5,000원 / 년",
  },
  {
    title: "스타리아유료멤버쉽",
    subTitle: "가입비 | 5,000원 / 년",
  },
  {
    title: "통합테스트-멤버쉽",
    subTitle: "가입비 | 10,000원 / 년",
  },
  {
    title: "신규할인 서비스 멤버쉽",
    subTitle: "가입비 | 3,000원 / 년",
  },
  {
    title: "상세테스트",
    subTitle: "가입비 | 3,000원 / 년",
  },
];

function Main() {
  return (
    <Layout title="행복트럭 B2, B7 가입" backBtn={false} isMenu>
      <div className="relative w-full h-[95vh] mx-auto bg-[#f8f8f8]">
        <main className="p-20 h-[100%] pb-74">
          <ul className="h-[100%]">
            {datas.map((data) => {
              return (
                <li
                  key={data.title}
                  className="bg-white rounded cursor-pointer mb-30 last:mb-0"
                >
                  <div className="flex items-center justify-between p-20 border-b-1">
                    <div className="flex">
                      <div className="min-w-47 h-47 bg-gray500 rounded-[50%]">
                        {data.benefit && <img src={data.benefit} alt="/" />}
                      </div>
                      <div className="ml-10">
                        <p className="mb-8 font-semibold text-h2">
                          {data.title}
                        </p>
                        <p className="font-normal text-b1">{data.subTitle}</p>
                      </div>
                    </div>
                    <div>{data.thumb && <img src={data.thumb} alt="/" />}</div>
                  </div>
                  <div className="p-20 min-h-40">
                    {data.texts?.map((text, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <p className="dot" key={idx}>
                        {text}
                      </p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </Layout>
  );
}

export default Main;
