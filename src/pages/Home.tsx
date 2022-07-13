import React from "react";
import Layout from "../elements/Layout";

function Home() {
  return (
    <Layout isMenu>
      <div className="flex justify-center">
        <h1 className="inline-block p-20 rounded bg-blue">Home</h1>
      </div>
    </Layout>
  );
}

export default Home;
