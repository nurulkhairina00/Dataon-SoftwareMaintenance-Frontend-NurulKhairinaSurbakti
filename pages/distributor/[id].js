/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Form } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
import { getSession } from "next-auth/react";

const edit = (props) => {
  const { session, master } = props;
  axios.defaults.headers.common["authorization"] = session.user.token;

  let [input, setInput] = useState({
    id: master.id,
    distributor_name: master.distributor_name,
    city: master.city,
    state: master.state,
    country: master.country,
    phone: master.phone,
    email: master.email,
  });

  const options = [
    { value: "Indonesia", label: "Indonesia" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Singapore", label: "Singapore" },
    { value: "Thailand", label: "Thailand" },
    { value: "Filipina", label: "Filipina" },
  ];

  const handleChangeInput = (name, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_PATH}:${process.env.NEXT_PUBLIC_API_PORT}/src/api/distributor/update`,
      data: {
        input: input,
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Data berhasil diperbarui",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        Router.push("/distributor");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Layout>
      <div className="col-6 px-4">
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Distributor Name</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="distributor_name"
                  value={input.distributor_name}
                  onChange={(e) =>
                    handleChangeInput("distributor_name", e.target.value)
                  }
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>City</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={(e) => handleChangeInput("city", e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>State / Region</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="state"
                  value={input.state}
                  onChange={(e) => handleChangeInput("state", e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Country</Form.Label>
              </div>
              <div className="col-8">
                <Select
                  id="long-value"
                  options={options}
                  name="country"
                  value={{
                    value: input.country,
                    label:
                      options.find((option) => option.value === input.country)
                        ?.label || input.country,
                  }}
                  onChange={(e) => handleChangeInput("country", e.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Phone</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="phone"
                  value={input.phone}
                  onChange={(e) => handleChangeInput("phone", e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Email</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={(e) => handleChangeInput("email", e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <button type="submit" className="btn btn-secondary rounded-3 px-4">
            Update
          </button>
        </Form>
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

  const master = await getDataDistributorById(context.query.id);

  return {
    props: { session, master },
  };
}

const getDataDistributorById = async (id) => {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_PATH}:${process.env.NEXT_PUBLIC_API_PORT}/src/api/distributor/get-data/${id}`
    )
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      throw error;
    });
};

export default edit;
