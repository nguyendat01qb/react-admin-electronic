import React from "react";
import Header from "../Header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={"/react-admin-electronic/"}>
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to={"/react-admin-electronic/users"}>
                    Người dùng
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/react-admin-electronic/page"}>Trang</NavLink>
                </li>
                <li>
                  <NavLink to={"/react-admin-electronic/categories"}>
                    Loại sản phẩm
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/react-admin-electronic/products"}>
                    Sản phẩm
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/react-admin-electronic/orders"}>
                    Đặt hàng
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
