import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Button, Image } from "antd";
import { deleteProductImage } from "../../../actions/productDetails";

const ShowImage = ({ details, deleteProductImage, setnewimage }) => {
  const { REACT_APP_API_URL } = process.env;
  const removerImage = () => {
    deleteProductImage(details.id);
    setnewimage(true);
  };
  return (
    <>
      <Col span={3} offset={1}>
        <Image
          src={`${details.photo}`}
          style={{
            width: "100%",
            marginBottom: ".5rem",
          }}
        />
        <Button size="small" type="link" onClick={removerImage}>
          Remove
        </Button>
      </Col>
    </>
  );
};

export default connect(null, { deleteProductImage })(ShowImage);
