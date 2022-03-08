import React from "react";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        margin: "5px 0",
        color: props.color,
        textDecoration: props.textDecoration,
      }}
    >
      {props.value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} vnđ
    </div>
  );
};

export default Price;
