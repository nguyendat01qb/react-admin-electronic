import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, updatePaymentStatus } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";

import "./style.css";

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const [destroy, setDestroy] = useState(false);
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const onStatusUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updatePaymentStatus(payload));
  };

  const payStatus = (status) => {
    let type;
    status.map((sta) => {
      if (sta.type === "Đã hoàn thành" && sta.isCompleted) {
        return (type = "Đã hoàn thành");
      } else if (sta.type === "Đã hủy" && sta.isCompleted) {
        // setDestroy(true);
        return (type = "Đã hủy");
      } else if (sta.type === "Hoàn lại" && sta.isCompleted) {
        return (type = "Hoàn lại");
      } else if (sta.type === "Đang chờ xử lý" && sta.isCompleted) {
        return (type = "Đang chờ xử lý");
      }
    });
    return type;
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={orderItem._id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "50px 50px",
              alignItems: "center",
            }}
          >
            <div>
              <span className="title">Tổng thanh toán</span>
              <br />
              <span className="value">
                <Price
                  value={
                    orderItem.paymentOnDelivery !== 0
                      ? orderItem.paymentOnDelivery
                      : orderItem.payingThroughBank
                  }
                />
              </span>
            </div>
            <div>
              <span className="title">Phương thức thanh toán</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Tình trạng đơn hàng</span> <br />
              <span className="value">
                {payStatus(orderItem.paymentStatus)}
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "0 50px",
              boxSizing: "border-box",
            }}
          >
            <span className="title" style={{ marginRight: 20 }}>
              Cập nhật tình trạng đơn hàng
            </span>
            <select onChange={(e) => setType(e.target.value)}>
              <option value={""}>Lựa chọn</option>
              {orderItem.paymentStatus.map((status) => {
                return (
                  <>
                    {!status.isCompleted ? (
                      <option key={status.type} value={status.type}>
                        {status.type}
                      </option>
                    ) : null}
                  </>
                );
              })}
            </select>
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
                width: "200px",
                display: "inline-block",
              }}
            >
              <button onClick={() => onStatusUpdate(orderItem._id)}>
                Xác nhận
              </button>
            </div>
          </div>
          <div
            style={
              destroy
                ? {
                    display: "none",
                  }
                : {
                    boxSizing: "border-box",
                    padding: "100px",
                    display: "flex",
                    alignItems: "center",
                  }
            }
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* select input to apply order action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>Lựa chọn</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>
            {/* button to confirm action */}

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
                width: "200px",
              }}
            >
              <button onClick={() => onOrderUpdate(orderItem._id)}>
                Xác nhận
              </button>
            </div>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;
