import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Col, Container, Row, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { addProduct, deleteProductById, updateProduct } from "../../actions";
import Modal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import Price from "../../components/UI/Price";
import Pagination from "../../components/Pagination";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [name, setName] = useState("");
  const [priceOld, setPriceOld] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);
  const [able, setAble] = useState(true);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 1,
  });
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [qty, setQty] = useState(0);
  const [updateQuantity, setUpdateQuantity] = useState({ _id: 0, quantity: 0 });
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("priceOld", priceOld);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    console.log(form);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => {
      setShow(false);
      setName("");
      setPriceOld("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setCategoryId("");
      setProductPictures([]);
    });
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  function handlePageChange(newPage) {
    console.log("NewPage: ", newPage);
  }

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>T??n s???n ph???m</th>
            <th>????n gi?? c??</th>
            <th>????n gi?? hi???n t???i</th>
            <th>S??? l?????ng</th>
            <th>Lo???i</th>
            <th>L???a ch???n</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    <Price
                      color="#666"
                      textDecoration="line-through"
                      value={product.priceOld}
                    />
                  </td>
                  <td>
                    <Price value={product.price} />
                  </td>
                  <td>{product.quantity ? product.quantity : "H???t h??ng"}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      Chi ti???t
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                          productName: product.name,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      X??a
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Th??m s???n ph???m m???i"}
        onSubmit={submitProductForm}
      >
        <Input
          style={{ marginBottom: "10px", border: "1px solid #333" }}
          label="T??n"
          value={name}
          placeholder={"T??n s???n ph???m"}
          onChange={(e) => setName(e.target.value)}
        />
        <div style={{ display: "flex", margin: "10px" }}>
          <Input
            style={{
              marginTop: "-5px",
              border: "1px solid #333",
            }}
            label="????n gi?? c??"
            value={priceOld}
            placeholder={"????n gi?? s???n ph???m"}
            onChange={(e) => setPriceOld(e.target.value)}
          />
          <Input
            style={{
              marginTop: "-5px",
              border: "1px solid #333",
            }}
            label="????n gi?? hi???n t???i"
            value={price}
            placeholder={"????n gi?? s???n ph???m"}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Input
          style={{
            marginBottom: "10px",
            marginTop: "-5px",
            border: "1px solid #333",
          }}
          label="S??? l?????ng"
          value={quantity}
          placeholder={"S??? l?????ng s???n ph???m"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <span>M?? t???</span>
        <textarea
          style={{ margin: "5px 0 10px 0", width: "100%", height: "100px" }}
          value={description}
          placeholder={"Chi ti???t s???n ph???m"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          style={{ marginTop: "5px", border: "1px solid #333" }}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Lo???i s???n ph???m</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <p style={{ margin: "10px 0 5px 0" }}>H??nh ???nh</p>
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setQty(product.quantity);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    const onQuantityIncrement = () => {
      setAble(false);
      setQty(qty + 1);
    };

    const onQuantityDecrement = () => {
      if (qty <= 1) {
        setAble(true);
        return;
      }
      setAble(false);
      setQty(qty - 1);
    };

    const updateForm = () => {
      setUpdateQuantity((updateQuantity._id = productDetails._id));
      setUpdateQuantity((updateQuantity.quantity = qty));
      dispatch(updateProduct(updateQuantity));
      setProductDetailModal(false);
    };
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Chi ti???t s???n ph???m"}
        size="lg"
        onSubmit={updateForm}
      >
        <Row>
          <Col md="6">
            <label className="key">T??n s???n ph???m</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Lo???i</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">????n gi??</label>
            <p className="value" style={{ width: "100%", display: "flex" }}>
              <Price
                color="#666"
                textDecoration="line-through"
                value={productDetails.priceOld}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Price value={productDetails.price} />
            </p>
          </Col>
          <Col md="6">
            <label className="key">S??? l?????ng</label>
            <div style={{ display: "flex" }}>
              <button
                onClick={onQuantityDecrement}
                style={
                  able
                    ? {
                        width: "30px",
                        height: "30px",
                        borderRadius: "15px",
                        border: "1px solid #c2c2c2",
                        backgroundColor: "transparent",
                        opacity: 0.2,
                        cursor: "auto",
                      }
                    : {
                        width: "30px",
                        height: "30px",
                        borderRadius: "15px",
                        border: "1px solid #c2c2c2",
                        backgroundColor: "transparent",
                      }
                }
              >
                -
              </button>
              <p className="value" style={{ margin: "6px 10px" }}>
                {qty}
              </p>
              <button
                onClick={onQuantityIncrement}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  border: "1px solid #c2c2c2",
                  backgroundColor: "transparent",
                }}
              >
                +
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">H??nh ???nh</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">M?? t???: </label>
            <span
              className="value"
              style={{
                overflowY: "scroll",
                maxHeight: "380px",
                display: "block",
                marginTop: "10px",
              }}
            >
              {productDetails.description}
            </span>
          </Col>
        </Row>
        <Row>
          <h5 style={{ marginTop: "20px" }}>????nh gi??</h5>
          <tr>
            <th style={{ width: "200px" }}>Kh??ch h??ng</th>
            <th>B??nh lu???n</th>
          </tr>
          {productDetails.reviews.map((review) => (
            <tr>
              <td style={{ width: "200px" }}>{review.user}</td>
              <td>{review.review}</td>
            </tr>
          ))}
        </Row>
      </Modal>
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
              <h3>S???n ph???m</h3>
              <button onClick={handleShow}>Th??m s???n ph???m</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
