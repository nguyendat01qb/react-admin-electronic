import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { signup } from "../../actions";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const [error, setError] = useState('');
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.loading) {
      setUsername("");
      setFullname("");
      setPhone("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      username,
      fullname,
      phone,
      email,
      password,
    };
    dispatch(signup(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/react-admin-electronic"} />;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "80px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Input
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                value={username}
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input
                label="Tên đầy đủ"
                placeholder="Nhập tên đầy đủ"
                value={fullname}
                type="text"
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                value={phone}
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Email"
                placeholder="Nhập email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
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
                Đăng ký
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
