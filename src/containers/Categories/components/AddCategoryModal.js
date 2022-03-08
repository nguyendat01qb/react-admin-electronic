import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    onSubmit,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
    >
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={"Tên loại sản phẩm"}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Lựa chọn loại sản phẩm cha</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
            style={{ marginTop: "12px" }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
