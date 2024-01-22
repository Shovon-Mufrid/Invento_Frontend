import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import { getProductSearchResult } from "../../../actions/productDetails";
import {
  getAllCategory,
  getAllCategoryWithProduct,
  getSingleCategoryWithProduct,
} from "../../../actions/categoryAction";
import {
  Divider,
  AutoComplete,
  Select,
  Skeleton,
  TreeSelect,
  Row,
  Col,
  Button,
} from "antd";
import Excelldownload from "./Excelldownload";
import PdfDownload from "./PdfDownload";
import moment from "moment";
import ReactToPrint from "react-to-print";

const SearchStock = ({ getAllCategory, getAllCategoryWithProduct, getSingleCategoryWithProduct, List }) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [productList, setproductList] = useState([]);
  const category = useRef("");
  const categoryName = useRef("");
  const totalPrice = useRef(0);
  const totalQuantity = useRef(0);
  const componentRef = useRef();
  const dateFormat = "YYYY-MM-DD";
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { Option } = Select;
  useEffect(() => {
    getAllCategory().then((result) => {
      console.log(result);
      // setloading(false);
      setreload(false);
    });
    getAllCategoryWithProduct().then((result) => {
      setproductList([]);
      totalPrice.current = 0;
      totalQuantity.current = 0;
      result.forEach((category) => {
        let all_products = category.children_product;
        if (all_products.length > 0) {
          all_products.forEach((product) => {
            setproductList((productList) => [...productList, product]);
            for (let i = 0; i < product.variations.length; i++) {
              totalPrice.current +=
                product.variations[i].selling_price *
                product.variations[i].quantity;
            }
            totalQuantity.current += product.quantity;
          });
        }
        // fetchData(category.children);
      });
      setloading(false);
    });
  }, [reload]);

  const rendertotalamount = (product) => {
    console.log(product);
    let total = 0;
    for (let i = 0; i < product.variations.length; i++) {
      total +=
        product.variations[i].selling_price * product.variations[i].quantity;
    }
    if (total > 0) {
      return (
        <tr>
          {/* <td>{index + 1}</td> */}
          <td>{product.variations[0].ProductDetails.parent_category}</td>
          <td>{product.variations[0].ProductDetails.main_category}</td>
          <td>{product.variations[0].ProductDetails.category_name}</td>
          <td>{product.title}</td>

          <td style={{ textAlign: "right" }}>{product.quantity}</td>
          <td style={{ textAlign: "right" }}>
            {formatter.format(parseFloat(total).toFixed(2))}
          </td>
        </tr>
      );
    }
  };

  const fetchData = (value) => {
    if (value.length == 0) return [];
    //console.log(value);
    value.forEach((element) => {
      let all_products = element.children_product;
      if (all_products.length > 0) {
        all_products.forEach((product) => {
          setproductList((productList) => [...productList, product]);
          for (let i = 0; i < product.variations.length; i++) {
            totalPrice.current +=
              product.variations[i].selling_price *
              product.variations[i].quantity;
          }

          totalQuantity.current += product.quantity;
        });
      }
      fetchData(element.children);
    });
  };
  const onCategoryChange = (value) => {
    setproductList([]);
    totalPrice.current = 0;
    totalQuantity.current = 0;
    setloading(true);
    category.current = value;
    getSingleCategoryWithProduct(value).then((result) => {
      categoryName.current = result.name;
      let all_products = result.children_product;
      //console.log(all_products);
      if (all_products.length > 0) {
        all_products.forEach((product) => {
          setproductList((productList) => [...productList, product]);
          for (let i = 0; i < product.variations.length; i++) {
            totalPrice.current +=
              product.variations[i].selling_price *
              product.variations[i].quantity;
          }
          totalQuantity.current += product.quantity;
        });
      }
      // fetchData(result.children);
      setloading(false);
    });
  };

  const renderdata = () => {
    if (loading) {
      return (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      );
    } else {
      return (
        <>
          <h3>Select Category For Stock Valuation Report</h3>
          <TreeSelect
            treeData={List}
            style={{ width: "100%" }}
            onChange={onCategoryChange}
          />

          <Divider />
          {" "}
          <Row gutter={24}>
            <Col span={4}>
              <Excelldownload
                data={productList}
                data1={productList}
                startDate={startDate}
                endDate={endDate}
              />
            </Col>
            <Col span={4}>
              <ReactToPrint
                trigger={() => <Button type="primary">Print this out!</Button>}
                content={() => componentRef.current}
              />
              <PdfDownload
                data={productList}
                data1={productList}
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
                categoryName={categoryName}
                componentRef={componentRef}
                startDate={startDate}
                endDate={endDate}
              />
            </Col>
          </Row>
          <br />
          {/* <Rendertable List={productList} /> */}
          <p>Selected Caegory: {categoryName.current}</p>
          <table className="history_table">
            <tr style={{ fontWeight: "bold" }}>
              {/* <td>SL.</td> */}
              {/* <td>Product Name</td> */}
              <td>Type</td>
              <td>Category</td>
              <td>Sub Category</td>
              <td>Product Name</td>
              <td style={{ textAlign: "right" }}>Total Quantity</td>
              <td style={{ textAlign: "right" }}>Total Amount</td>
            </tr>

            {productList.map((item, index) => {
              return <>{rendertotalamount(item)}</>;
            })}
            <tr style={{ fontWeight: "bold" }}>
              <td colSpan={4}>Total</td>
              <td style={{ textAlign: "right" }}>{totalQuantity.current}</td>
              <td style={{ textAlign: "right" }}>
                {formatter.format(parseFloat(totalPrice.current).toFixed(2))}
              </td>
            </tr>
          </table>
        </>
      );
    }
  };

  return (
    <>
      {renderdata()}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    // List: state.category.categoryProductlist,
    List: state.category.categorylist,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
  getAllCategoryWithProduct,
  getSingleCategoryWithProduct,
})(SearchStock);
