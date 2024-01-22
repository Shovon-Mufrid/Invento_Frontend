import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getSingleProductbystatus } from "../../../actions/singleProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import RenderTable from "./RenderTable";
import ActiveRenderTable from "./ActiveRendertable";
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
  List,
  updatelist,
  setUpdatelist,
  setselectedproduct,
  totalitems,
  getAllCategory,
  categoryList,
}) => {
  const [data, setdata] = useState(false);
  const [products, setproducts] = useState(false);
  const loading = useRef(true);
  const pageno = useRef(1);
  const page_size = useRef(10);
  const keytab = useRef(true);
  const keyward = useRef("");
  const searchCategory = useRef("");
  const [reload, setreload] = useState(false);

  const onChange = (event) => {
    if (event.keyCode == 13) {
      pageno.current = 1;
      keyward.current = event.target.value;
      setreload(true);
    }
  };

  function callback(key) {
    console.log(key);
    pageno.current = 1;
    if (key == 1) {
      keytab.current = true;
    } else {
      keytab.current = false;
    }
    setreload(true);
  }

  useEffect(() => {
    getAllCategory();
    getSingleProductbystatus(
      keytab.current,
      keyward.current,
      searchCategory.current,
      "",
      "",
      pageno.current,
      page_size.current
    ).then((result) => {
      setproducts(result);
      setUpdatelist(true);
      setdata(true);
      setreload(false);
    });
  }, [reload]);

  const rendertable = () => {
    if (reload) {
      return (
        <>
          <span style={{ marginTop: "30px" }}>
            <Spin indicator={antIcon} /> loading
          </span>
        </>
      );
    }
  };

  if (data) {
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
          <Col span={5} offset={1}>
            <h3>Category</h3>

            <TreeSelect
              style={{ width: "100%" }}
              treeData={categoryList}
              onChange={(value) => {
                pageno.current = 1;
                searchCategory.current = value;
                setreload(true);
              }}
            />
          </Col>
          {/* <Col offset={1}>{rendertable()}</Col> */}
        </Row>
        <Divider />
        <Spin spinning={reload}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Active Products" key="1">
              <ActiveRenderTable
                List={products.results}
                setUpdatelist={setUpdatelist}
                setselectedproduct={setselectedproduct}
                pageno={pageno}
                page_size={page_size}
                totalitems={totalitems}
                setreload={setreload}
              />
            </TabPane>
            <TabPane tab="Inactive Products" key="2">
              <RenderTable
                List={products.results}
                setUpdatelist={setUpdatelist}
                setselectedproduct={setselectedproduct}
                pageno={pageno}
                page_size={page_size}
                totalitems={totalitems}
                setreload={setreload}
              />
            </TabPane>
          </Tabs>
        </Spin>
      </>
    );
  } else {
    return (
      <>
        <Skeleton active />
        <Skeleton active />
      </>
    );
  }
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
