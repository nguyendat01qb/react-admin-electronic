import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";

const Users = () => {
  const user = useSelector((state) => state.user);

  // console.log(user);
  const renderUsers = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>ID người dùng</th>
            <th>Tên người dùng</th>
            <th>Vị trí</th>
            <th>Email</th>
            <th>Quyền</th>
            {/* <th>Lựa chọn</th> */}
          </tr>
        </thead>
        <tbody>
          {user.users.length > 0
            ? user.users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "super-admin"
                      ? "Cập nhật, quản lý người dùng và sản phẩm"
                      : "Đặt hàng, Đánh giá, Phản hồi"}
                  </td>
                  {/* <td>
                    <Button
                      style={{
                        marginRight: "2px",
                      }}
                    >
                      Sửa
                    </Button>
                    <Button>Xóa</Button>
                  </td> */}
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3>Người dùng</h3>
              {/* <button>Thêm sản phẩm</button> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderUsers()}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Users;
