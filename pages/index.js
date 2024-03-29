/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import Layout from "./components/Layout";

function index(props) {
  const { session } = props;
  axios.defaults.headers.common["authorization"] = session.user.token;

  const [data, setData] = useState({});
  const getDataCatalog = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PATH}:${process.env.NEXT_PUBLIC_API_PORT}/src/api/bean/get-data`
      )
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getDataCatalog();
  }, []);

  return (
    <Layout>
      <div className="px-4">
        <h6>Bean Of the Day</h6>
        <p>{data.bean}</p>
        <h6>Sale Price</h6>
        <p>{data.sale_price}</p>
        <h6>Description</h6>
        <p>{data.description}</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default index;
