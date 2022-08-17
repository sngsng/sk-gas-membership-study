/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { findIdAPI } from "../../apis/findId";
import LabelInput from "../../components/LabelBtn/LabelInput";
import LabelSelectBtn from "../../components/LabelBtn/LabelSelectBtn";
import SelfAuth from "../../components/SelfAuth";
import string from "../../constants/string";
import urls from "../../constants/urls";
import Button from "../../elements/Button";
import Layout from "../../elements/Layout";
import useModal from "../../hooks/useModal";
import useRouter from "../../hooks/useRouter";
import AuthErrorCheck from "../../util/AuthErrorCheck";
import SignInPark2, { SignUpPart2SubmitType } from "../signUp/SignUpPart2";

interface FindIdType {
  name: string;
  phoneNo: string;
}

const options = [
  { label: "간편찾기", value: "simple" },
  { label: "본인인증으로 찾기", value: "auth" },
];

function FindId1() {
  const { push } = useRouter();
  const { showAlert } = useModal();

  const [select, setSelect] = useState("simple");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FindIdType>({
    mode: "onChange",
  });

  const FindId = useMutation(findIdAPI);

  const onSubmit = (data: FindIdType) => {
    const body = {
      qryFg: (select === "simple" && "01") as string,
      mbrNm: data.name,
      hpNo: data.phoneNo,
    };

    FindId.mutateAsync(body)
      .then((res) => {
        const { joinDt, lognId } = res;
        push(urls.FindIdResult, {
          state: {
            lognId,
            joinDt,
          },
        });
      })
      .catch((err) => {
        showAlert({ title: err.detailMsg });
      });
  };

  return (
    <Layout title="아이디 찾기">
      <div className="p-20">
        <LabelSelectBtn
          name="findIdSelect"
          options={options}
          onChange={setSelect}
          value={select}
        />

        {select === "simple" ? (
          <form className="py-20">
            <LabelInput
              HtmlFor="name"
              label={string.Name}
              maxLength={5}
              placeholder={string.EnterName}
              className="mb-20"
              register={register("name", {
                required: string.EnterName,
                minLength: { value: 2, message: string.EnterMoreThan2 },
              })}
              errors={errors?.name?.message}
            />

            <LabelInput
              HtmlFor="phoneNo"
              label={string.PhoneNumber}
              maxLength={11}
              placeholder={string.EnterPhoneNumber}
              className="mb-30"
              register={register("phoneNo", {
                required: string.EnterPhoneNumber,
                minLength: { value: 11, message: string.Enter11PhoneMessage },
              })}
              errors={errors?.phoneNo?.message}
            />

            <Button
              text={string.Next}
              className="p-20"
              isBtnCheck
              isLoading={FindId.isLoading}
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        ) : (
          <SelfAuth />
        )}
      </div>
    </Layout>
  );
}

export default FindId1;
