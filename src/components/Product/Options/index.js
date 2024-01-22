import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ImportData from "./import";
import Excelldownload from "./Excelldownload";
import { getAllContact } from "../../../actions/contactAction";

import { Layout, Breadcrumb, Divider, Skeleton } from "antd";

const { Content } = Layout;

const Index = ({ getAllContact, ContactList }) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getAllContact().then((result) => {
      setData(result);
      console.log(data);
      setloading(false);
    });
  }, [loading]);

  const renderdata = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <>
          {/* {" "}
          <Divider />
          <h3>Export</h3>
          <Excelldownload data={data} data1={ContactList} />
          <Divider /> */}
          <h3>Import</h3>
          <ImportData />
        </>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Contact</Breadcrumb.Item>
        <Breadcrumb.Item>Import/Export</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{renderdata()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ContactList: state.contacts.contacttype,
  };
};

export default connect(mapStateToProps, { getAllContact })(Index);
