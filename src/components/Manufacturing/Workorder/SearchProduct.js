import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getSingleProductbystatus } from "../../../actions/singleProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import {
  Skeleton,
  Tabs,
  Row,
  Col,
  AutoComplete,
  Divider,
  TreeSelect,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProductList = ({
  getSingleProductbystatus,
  selectedproduct,
  List,
  updatelist,
  setUpdatelist,
  setselectedproduct,
  totalitems,
  getAllCategory,
  categoryList,
}) => {
  const [data, setdata] = useState(false);
  const [products, setproducts] = useState([]);
  const [dataloading, setdataloading] = useState(false);
  const [showresults, setShowresults] = useState(false);
  const loading = useRef(true);
  const pageno = useRef(1);
  const page_size = useRef(10);
  const keytab = useRef(true);
  const keyward = useRef("");
  const counter = useRef(0);
  const searchCategory = useRef("");
  const [reload, setreload] = useState(false);

  const onChange = (event) => {
    if (event.target.value != "") {
      setShowresults(true);
      keyward.current = event.target.value;
      counter.current = 0;
      const intervalId = setInterval(function () {
        counter.current++;
      }, 1000);

      setTimeout(function () {
        if (counter.current > 5) {
          counter.current = 0;
          clearInterval(intervalId);
          setreload(!reload);
        }
      }, 2000);
    } else {
      setproducts([]);
      setShowresults(false);
    }
  };

  useEffect(() => {
    if (keyward.current != "") {
      setdataloading(true);
      getSingleProductbystatus(
        keytab.current,
        keyward.current,
        searchCategory.current,
        "",
        "",
        pageno.current,
        page_size.current
      ).then((result) => {
        console.log(result.results);
        setproducts(result.results);
        setdataloading(false);
      });
    }
  }, [reload]);

  return (
    <>
      <Row>
        <Col span={10}>
          <h3>Enter product title for instant Search</h3>
          <AutoComplete
            placeholder="input search text"
            onKeyUp={onChange}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Divider />
      {showresults ? (
        <div
          style={{
            width: "100%",
            // top: "60px",
            padding: "10px",
          }}
        >
          <Spin spinning={dataloading}>
            <div>
              {products.map((product) => {
                // <CardView key={product.id} product={product} />
                return (
                  <h3
                    onClick={() => {
                      setselectedproduct(product);
                    }}
                    style={{
                      width: "100%",
                      // top: "60px",
                      padding: "10px",
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                    }}
                  >
                    {product.title}
                  </h3>
                );
              })}
            </div>
          </Spin>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.singleProduct.sinleproductlist.results,
    totalitems: state.singleProduct.sinleproductlist.count,
    categoryList: state.category.categorylist,
  };
};

export default connect(mapStateToProps, {
  getSingleProductbystatus,
  getAllCategory,
})(ProductList);
