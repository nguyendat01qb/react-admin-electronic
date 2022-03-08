import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Signin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState('');
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "80px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                style={{ marginTop: "16px" }}
                variant="primary"
                type="submit"
              >
                Đăng nhập
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
