import React from "react";
import Layout from "../elements/Layout";

function Home() {
  return (
    <Layout isMenu>
      <div className="flex justify-center h-[100vh] items-center">
        <h1 className="text-h1">Home</h1>
      </div>
    </Layout>
  );
}

export default Home;
