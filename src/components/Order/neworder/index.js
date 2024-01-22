import React, { Component, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import CustomerDetails from "./CustomerDetails";
import Measurement from "./Measurement";
import {
  createContactfromOrder,
  getSpecificContact,
} from "../../../actions/contactAction";
import {
  createMeasurement,
  updateMasurement,
  getSpecificMeasurementbycontact,
} from "../../../actions/measurment";
import { getcontacttype } from "../../../actions/settings";
import ContactSearch from "./ContctSearch";
// import history from "../../../history";
import moment from "moment";

import {
  Layout,
  Breadcrumb,
  Divider,
  AutoComplete,
  Row,
  Col,
  Image,
  Affix,
  Form,
  Input,
  Button,
  message,
  Spin,
} from "antd";
const { Content } = Layout;

const Neworder = ({
  getSpecificContact,
  getContactSearchResultbyPhone,
  createMeasurement,
  updateMasurement,
  createContactfromOrder,
  Auth,
  getcontacttype,
  ContactList,
  getSpecificMeasurementbycontact,
}) => {
  const contactDefaultValue = useRef();
  const [reload, setreload] = useState(false);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({ remarks: "", Note: "" });
  const selectedContact = useRef("");
  const [createcontactbutton, setcreatecontactbutton] = useState(false);
  const showform = useRef(false);
  const createcontactnumber = useRef("");
  const initial = { remarks: "", Note: "" };
  const inputvalue = useRef("");
  const [form] = Form.useForm();

  useEffect(() => {
    getcontacttype();
    form.setFieldsValue({ phone: inputvalue.current });
    if (selectedContact.current > 0) {
      getSpecificContact(selectedContact.current).then((result) => {
        if (result.special_dates != null && result.special_dates != undefined) {
          result.special_dates = moment(result.special_dates);
        }
        getSpecificMeasurementbycontact(selectedContact.current).then((res) => {
          if (res.length > 0) {
            setdata({ ...result, ...res[0] });
            showform.current = true;
            form.setFieldsValue(data);
            setloading(false);
            console.log(data);
          } else {
            setdata(result);
            showform.current = true;
            form.setFieldsValue(data);
            setloading(false);
          }
        });
      });
    } else {
      setloading(false);
    }
  }, [reload]);

  if (Auth.profile.Office == 4) {
    //Anzara
    contactDefaultValue.current = 1; //Anzara customers
  } else if (Auth.profile.Office == 3) {
    //anzara bridal
    contactDefaultValue.current = 2; //ANzara bridal customers
  } else if (Auth.profile.Office == 6) {
    //Online
    contactDefaultValue.current = 3; // Online customer
  }

  const onFinish = (values) => {
    values.Type = "Customer";
    values.role = contactDefaultValue.current;
    createContactfromOrder(values).then((result) => {
      // console.log(result);
      values.contact = result.id;
      values.is_basic = true;
      if (selectedContact.current > 0) {
        updateMasurement(data.id, values).then((res) => {
          message.success("contact has beed udated");
          // history.push("/order/add/" + result.id);
          window.location.href = "/order/add/" + result.id;
        });
      } else {
        createMeasurement(values).then((res) => {
          message.success("contact has beed created");
          // history.push("/order/add/" + result.id);
          window.location.href = "/order/add/" + result.id;
        });
      }
    });
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Order</Breadcrumb.Item>
        <Breadcrumb.Item>Customer profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Button
          type="primary"
          onClick={() => {
            // history.push("/dashboard");
            window.location.href = "/dashboard";
          }}
        >
          Dashboard
        </Button>
        <Divider />
        {showform.current ? (
          <Spin spinning={loading}>
            <Row>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    showform.current = false;
                    selectedContact.current = "";
                    setreload(!reload);
                  }}
                >
                  Back
                </Button>
              </Col>
            </Row>
            <Form
              form={form}
              layout="horizontal"
              onFinish={onFinish}
              initialValues={data}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              labelAlign="left"
            >
              <Row>
                <Col
                  sm={{
                    span: 24,
                  }}
                  lg={{
                    span: 24,
                  }}
                >
                  <h3>Customer details</h3>
                  <CustomerDetails
                    ContactList={ContactList}
                    contactDefaultValue={contactDefaultValue}
                  />
                </Col>
                <Divider />
                <Col
                  sm={{
                    span: 24,
                  }}
                  lg={{
                    span: 24,
                  }}
                  // style={{
                  //   background: "#F5F5F5",
                  //   padding: "10px",
                  //   borderRadius: "10px",
                  // }}
                >
                  <h3>Customer basic measurements</h3>
                  <Measurement />
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        ) : (
          <ContactSearch
            selectedContact={selectedContact}
            createcontactbutton={createcontactbutton}
            setcreatecontactbutton={setcreatecontactbutton}
            createcontactnumber={createcontactnumber}
            setreload={setreload}
            showform={showform}
            reload={reload}
            inputvalue={inputvalue}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ContactList: state.contacts.contacttype,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  createContactfromOrder,
  createMeasurement,
  updateMasurement,
  getSpecificContact,
  getcontacttype,
  createContactfromOrder,
  getSpecificMeasurementbycontact,
})(Neworder);
