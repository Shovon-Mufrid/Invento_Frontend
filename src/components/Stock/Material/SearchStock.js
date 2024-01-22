import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import { getProductSearchResultformaterial } from "../../../actions/productDetails";
import {
  getAllLocation,
  getAllLocationPlain,
} from "../../../actions/warehouseAction";
import { getAllCategory } from "../../../actions/categoryAction";

import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Select,
  Skeleton,
  TreeSelect,
} from "antd";
const { Option } = Select;

const SearchStock = ({
  getProductSearchResultformaterial,
  getAllLocation,
  getAllLocationPlain,
  categoryList,
  getAllCategory,
}) => {
  const [List, setList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reload, setreload] = useState(false);
  const [loading, setloading] = useState(true);
  const location = useRef("");
  const keyward = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);
  let total_data = useRef({});
  const searchCategory = useRef("");

  const onChange = (event) => {
    if (event.keyCode == 13) {
      keyward.current = event.target.value;
      setreload(!reload);
    }
  };

  useEffect(() => {
    setloading(true);
    let promises = [];
    promises.push(
      getAllLocationPlain().then((result) => {
        setLocations(result);
      })
    );
    promises.push(
      getAllCategory().then((result) => {
        let packaging = result.filter((item) => item.name === "MATERIAL");
        if (packaging.length > 0) {
          searchCategory.current = packaging[0].id;
        }
      })
    );
    Promise.all(promises).then((values) => {
      getProductSearchResultformaterial(
        keyward.current,
        location.current,
        pageno.current,
        page_size.current,
        searchCategory.current
      ).then((result) => {
        total_data.current = {
          total_purchase_price: result.total_purchase_price,
          total_selling_price: result.total_selling_price,
          total_quantity: result.total_quantity,
          current_purchase_price: result.current_purchase_price,
          current_selling_price: result.current_selling_price,
          current_quantity: result.current_quantity,
        };
        setList(result);
        setloading(false);
      });
    });
  }, [reload]);

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <Rendertable
          List={List}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          setloading={setloading}
          total_data={total_data}
        />
      );
    }
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <h3>Enter barcode or product code for instant Search</h3>
          <AutoComplete
            placeholder="input search text"
            onKeyUp={onChange}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={6} offset={1}>
          <h3>Choose warehouse / outlet</h3>
          <Select
            placeholder="Please select a outlet / warehouse"
            style={{ width: "100%" }}
            onChange={(e) => {
              location.current = e;
              setloading(true);
              setreload(!reload);
            }}
          >
            <Option value="">All</Option>
            {locations.map((outlet) => {
              return <Option value={outlet.id}>{outlet.name}</Option>;
            })}
          </Select>
        </Col>
        <Col span={6} offset={1}></Col>
      </Row>

      <Divider />
      {renderdata()}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    // List: state.ProductDetails.productdetails,
    categoryList: state.category.categorylist,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResultformaterial,
  getAllLocationPlain,
  getAllLocation,
  getAllCategory,
})(SearchStock);