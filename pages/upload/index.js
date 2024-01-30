/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Form } from "react-bootstrap";

const index = () => {
  let [input, setInput] = useState({
    title: "",
    upload: "",
    nama_upload: "",
    author: "",
  });

  const handleChangeInput = (name, value) => {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleInsertDocument = () => {};
  return (
    <Layout>
      <div className="col-6 px-4">
        <Form onSubmit={handleInsertDocument}>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Title</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e) => handleChangeInput("title", e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Document File</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="file"
                  name="upload"
                  value={input.upload}
                  onChange={(e) =>
                    handleChangeInput("author", e.target.files[0])
                  }
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="row">
              <div className="col-4">
                <Form.Label>Author</Form.Label>
              </div>
              <div className="col-8">
                <Form.Control
                  type="text"
                  name="author"
                  value={input.author}
                  onChange={(e) => handleChangeInput("author", e.target.value)}
                />
              </div>
            </div>
          </Form.Group>
          <button type="submit" className="btn btn-secondary rounded-3 px-4">
            Add Document
          </button>
        </Form>
      </div>
    </Layout>
  );
};

export default index;
