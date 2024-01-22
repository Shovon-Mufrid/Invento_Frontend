import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import { getProductSearchResult } from "../../../actions/productDetails";

import { Divider, AutoComplete, Skeleton, Row, Col, Button } from "antd";
import PdfDownload from "./PdfDownload";
import Excelldownload from "./Excelldownload";
import ReactToPrint from "react-to-print";

const SearchStock = ({ getProductSearchResult, Auth }) => {
  const [List, setList] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const keyward = useRef("");
  // const location = useRef(Auth.superuser ? "" : Auth.profile.branch.id);
  console.log(Auth.profile)
  const location = useRef(Auth.profile.Office);
  const componentRef = useRef();
  // const onChange = (data) => {
  //   setloading(true);
  //   getProductSearchResult(data, location.current).then((result) => {
  //     const arr = [];
  //     for (const item of result.results) {
  //       if (item.quantity <= item.Deatils[0].stock_alart_amount) {
  //         arr.push(item);
  //       }
  //     }
  //     setList(arr);
  //     setloading(false);
  //   });
  // };
  const onChange = (event) => {
    if (event.keyCode == 13) {
      keyward.current = event.target.value;
      setreload(true);
    }
  };
  useEffect(() => {
    setloading(true);
    getProductSearchResult(keyward.current, location.current).then((result) => {
      const arr = [];
      for (const item of result.results) {
        if (item.quantity <= item.Deatils[0].stock_alart_amount) {
          arr.push(item);
        } else if (item.Deatils[0].stock_alart_amount == null) {
          console.log("null");
        }
      }
      setList(arr);
      setloading(false);
      setreload(false);
    });
  }, [reload]);

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return <Rendertable List={List} />;
    }
  };

  return (
    <>
      <h3>Enter barcode or product code for instant Search</h3>
      <AutoComplete
        placeholder="input search text"
        onKeyUp={onChange}
        style={{ width: "100%" }}
      />
      <Divider />
      <Row gutter={24}>
        <Col span={4}>
          <Excelldownload data={List} data1={List} />
        </Col>
        <Col span={4}>
          <ReactToPrint
            trigger={() => <Button type="primary">Print this out!</Button>}
            content={() => componentRef.current}
          />
          <PdfDownload data={List} data1={List} componentRef={componentRef} />
        </Col>
      </Row>

      <Divider />
      {renderdata()}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, { getProductSearchResult })(
  SearchStock
);
