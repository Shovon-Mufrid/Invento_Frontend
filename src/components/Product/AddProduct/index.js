import React, { useState } from "react";
import { connect } from "react-redux";
// import SingleProductForm from "./SingpleProductForm";
// import VariableProductForm from "./VariableProductForm";
import Addproduct from "./Addproduct";

import { Layout, Breadcrumb, Row, Col, Select, Divider } from "antd";

const AddProduct = () => {
  const [updatelist, setUpdatelist] = useState(true);
  const [producttype, setproducttype] = useState("S");

  function handleChange(value) {
    setproducttype(value);
  }
  // function renderform() {
  //   if (producttype === "S") {
  //     return (
  //       <SingleProductForm
  //         setUpdatelist={setUpdatelist}
  //         updatelist={updatelist}
  //       />
  //     );
  //   } else if (producttype === "V") {
  //     return (
  //       <VariableProductForm
  //         setUpdatelist={setUpdatelist}
  //         updatelist={updatelist}
  //       />
  //     );
  //   } else {
  //     return <p>Bulk Product</p>;
  //   }
  // }

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>Add</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background main-frame">
        <Addproduct setUpdatelist={setUpdatelist} updatelist={updatelist} />
      </div>
    </>
  );
};

export default connect()(AddProduct);
