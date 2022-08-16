import React from "react";
import { useLocation } from "react-router-dom";
import { TermsDetail } from "../apis/signUp/types/responses";
import Layout from "../elements/Layout";

function AcceptTermsDetail() {
  const location = useLocation();
  const { cluTelgCtt } = location.state as TermsDetail;

  return (
    <Layout isHeader title="약관 상세">
      <div className="p-20" dangerouslySetInnerHTML={{ __html: cluTelgCtt }} />
    </Layout>
  );
}

export default AcceptTermsDetail;
