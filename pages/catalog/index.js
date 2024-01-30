/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import Layout from "../components/Layout";

const index = (props) => {
  const { session } = props;
  axios.defaults.headers.common["authorization"] = session.user.token;

  const [data, setData] = useState([]);

  const getDataCatalog = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PATH}:${process.env.NEXT_PUBLIC_API_PORT}/src/api/bean/get-data`
      )
      .then((res) => {
        setData(res.data);
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
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th scope="col">Bean</th>
                <th scope="col">Description</th>
                <th scope="col">Price/Unit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.bean}</td>
                    <td>{item.description}</td>
                    <td>{item.sale_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

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
