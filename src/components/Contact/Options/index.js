import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import ImportData from "./import";
import {
  getAllContact,
  getContactSearchResult,
} from "../../../actions/contactAction";
import { getcontacttype } from "../../../actions/settings";
import Export from "./export";

import { Layout, Breadcrumb, Divider, Skeleton, Row, Col, Select } from "antd";
const { Option } = Select;

const { Content } = Layout;

const Index = ({
  getAllContact,
  Contacttype,
  getContactSearchResult,
  getcontacttype,
}) => {
  const [data, setData] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [supplier, setsupplier] = useState([]);
  const [loading, setloading] = useState(true);
  const type = useRef("");
  const role = useRef("");

  useEffect(() => {
    getcontacttype();
  }, []);

  const renderdata = () => {
    return (
      <>
        {" "}
        <Divider />
        <h3>Export</h3>
        <Row>
          <Col span={3}>
            <p>Select Contact type</p>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Please choose the type"
              style={{ width: "100%" }}
              // defaultValue="All"
              labelInValue
              onChange={(target) => {
                type.current = target.value[0];
                role.current = target.value[1];
                setloading(true);
              }}
            >
              <Option value={["", ""]}>All</Option>
              <Option value={["Customer", ""]}>All Customer</Option>

              {Contacttype.map((contact) => {
                if (contact.Type == "Customer")
                  return (
                    <Option value={[contact.Type, contact.id]}>
                      {contact.Type} - {contact.name}
                    </Option>
                  );
              })}
              <Option value={["Supplier", ""]}>All Supplier</Option>
              {Contacttype.map((contact) => {
                if (contact.Type == "Supplier")
                  return (
                    <Option value={[contact.Type, contact.id]}>
                      {contact.Type} - {contact.name}
                    </Option>
                  );
              })}
            </Select>
          </Col>

          <Export
            type={type}
            role={role}
            loading={loading}
            setloading={setloading}
          />
        </Row>
        <Divider />
        <h3>Import</h3>
        <ImportData />
      </>
    );
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
    Contacttype: state.contacts.contacttype,
  };
};

export default connect(mapStateToProps, {
  getAllContact,
  getContactSearchResult,
  getcontacttype,
})(Index);
