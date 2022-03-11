import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLink = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Đăng xuất
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/react-admin-electronic/signin" className="nav-link">
            Đăng nhập
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/react-admin-electronic/signup" className="nav-link">
            Đăng ký
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/react-admin-electronic/" className="navbar-brand">
          Trang quản trị
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLink() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
