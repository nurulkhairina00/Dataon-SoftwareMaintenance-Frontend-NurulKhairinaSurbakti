/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Form, Container, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Head from "next/head";

function LoginForm() {
  const userIDRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUserID = userIDRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      userID: enteredUserID,
      password: enteredPassword,
    });

    const loginFailed = result.error;
    if (loginFailed) {
      if (result.error === "Request failed with status code 401") {
        Swal.fire({
          title: "Warning",
          text: "Invalid userID or password",
          icon: "warning",
          width: 400,
          confirmButtonColor: "#27374D",
        });
      } else {
        Swal.fire({
          title: "Warning",
          text: "Account not active",
          icon: "warning",
          width: 400,
          confirmButtonColor: "#27374D",
        });
      }
    }
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Coffee Valley</title>
      </Head>
      <Container fluid className="App">
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col sm={12} md={6} lg={3}>
            <div className="card">
              <div className="card-body ">
                <img
                  src="/image/logo-coffee-vallay.png"
                  alt="logo-coffee-vallay"
                  width="35%"
                />
                <div className="col pb-4">
                  <h3 className="text-brown mb-0">
                    <em>Coffee Valley</em>
                  </h3>
                  <p className="mb-0">
                    <em>Taste the love in every cup</em>
                  </p>
                  <small className="text-secondary">
                    One Alewife Center 3rd Floor
                  </small>
                  <br />
                  <small className="text-secondary">Cambridge, MA 02140</small>
                </div>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-4">
                    <div className="row">
                      <div className="col-3">
                        <Form.Label>UserID</Form.Label>
                      </div>
                      <div className="col-9">
                        <Form.Control type="text" ref={userIDRef} />
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <div className="row">
                      <div className="col-3">
                        <Form.Label>Password</Form.Label>
                      </div>
                      <div className="col-9">
                        <Form.Control type="password" ref={passwordRef} />
                      </div>
                    </div>
                  </Form.Group>
                  <div className="py-4 float-end">
                    <button
                      type="submit"
                      className="btn btn-secondary rounded-3 px-4"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginForm;
