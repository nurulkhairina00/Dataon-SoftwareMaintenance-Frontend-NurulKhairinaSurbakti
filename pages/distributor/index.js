/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import Layout from "../components/Layout";
import Link from "next/link";

const index = (props) => {
  const { session } = props;
  axios.defaults.headers.common["authorization"] = session.user.token;

  const [data, setData] = useState([]);

  const getDataDistributor = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PATH}:${process.env.NEXT_PUBLIC_API_PORT}/src/api/distributor/get-data`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getDataDistributor();
  }, []);

  return (
    <Layout>
      <div className="px-4 col-6">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th scope="col">Distributor Name</th>
                <th scope="col">City</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.distributor_name}</td>
                    <td>{item.city}</td>
                    <Link href={`/distributor/${item.id}`}>
                      <td
                        className={`${
                          item.update_date === null
                            ? "text-success"
                            : "text-secondary"
                        }`}
                      >
                        [Edit]
                      </td>
                    </Link>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link href="/distributor/add">
          <button className="btn btn-secondary rounded-3 px-3">Add</button>
        </Link>
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
