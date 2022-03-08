import React from "react";
import { Row, Col } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const UpdateCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    onSubmit,
    modalTitle,
    size,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;

  console.log({ expandedArray, checkedArray });

  return (
    // Edit Categories
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Loại sản phẩm cha</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row className="form-input" key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={"Tên loại sản phẩm"}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option>Lựa chọn loại sản phẩm cha</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value="" selected>
                  Lựa chọn kiểu
                </option>
                <option value="store">Cửa hàng</option>
                <option value="product">Sản phẩm</option>
                <option value="page">Trang</option>
              </select>
            </Col>
          </Row>
        ))}
      <h6>Các loại sản phẩm cần chỉnh sửa</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row className="form-input" key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={"Tên loại sản phẩm"}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option>Lựa chọn loại sản phẩm cha</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Lựa chọn kiểu</option>
                <option value="store">Cửa hàng</option>
                <option value="product">Sản phẩm</option>
                <option value="page">Trang</option>
              </select>
            </Col>
          </Row>
        ))}
      {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
    </Modal>
  );
};

export default UpdateCategoriesModal;
