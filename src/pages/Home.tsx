import React from "react";
import Layout from "../elements/Layout";

function Home() {
  return (
    <Layout isMenu>
      <div className="flex flex-col justify-center h-[100vh] items-center">
        <h1 className="mb-40 text-h1">Home</h1>
      </div>
    </Layout>
  );
}

export default Home;
