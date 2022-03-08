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
                  <NavLink exact to={"/"}>
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to={"/users"}>
                    Người dùng
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/page"}>Trang</NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"}>Loại sản phẩm</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Sản phẩm</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Đặt hàng</NavLink>
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
