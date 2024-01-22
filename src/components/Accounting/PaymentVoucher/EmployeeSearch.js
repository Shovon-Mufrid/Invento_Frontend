import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Image,
  InputNumber,
  Affix,
  Button,
  message,
  DatePicker,
  Space,
  Select,
  Input,
} from "antd";
// import { getContactSearchResultbyPhone } from "../../../actions/contactAction";
import { getEmployeeSearchResultbyPhone } from "../../../actions/employeeAction";
import CreateNewCustomer from "./CreateNewCustomer";
import CreateNewSupplier from "./CreateNewSupplier";

const Demo = ({ getEmployeeSearchResultbyPhone, selector }) => {
  const [showsuggetion, setshowsuggetion] = useState(false);
  const [contactsuggetions, setcontactsuggetions] = useState();
  const [contact, setcontact] = useState({ name: "" });
  const [remove, setremove] = useState(false);

  const onChange = (value) => {
    console.log("value");
    getEmployeeSearchResultbyPhone(value).then((result) => {
      setcontactsuggetions(result);
      setshowsuggetion(true);
    });
  };
  const renderContact = () => {
    if (showsuggetion) {
      return contactsuggetions.map((contact) => {
        console.log(contact);

        return (
          <>
            <Row
              style={{
                border: "1px solid lightgray",
                padding: "5px",
                marginBottom: "1px",
                borderRadius: "5px",
              }}
              onClick={(e) => {
                setcontact(contact);
                selector.current = contact;
                setshowsuggetion(false);
                setremove(true);
              }}
            >
              <Col span={17}>
                <h4 style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  {contact.name}
                </h4>
              </Col>
              <Col span={6}>{contact.phone}</Col>
            </Row>
          </>
        );
      });
    }
  };
  return (
    <>
      {remove ? (
        <Button
          onClick={(e) => {
            setremove(false);
            setcontact({ name: "" });
            selector.current = null;
          }}
          type="link"
        >
          remove employee
        </Button>
      ) : (
        <AutoComplete
          placeholder="Enter Phone Number to select contact"
          onChange={(value) => {
            if (value == "") {
              setshowsuggetion(false);
            } else {
              getEmployeeSearchResultbyPhone(value).then((result) => {
                setcontactsuggetions(result);
                setshowsuggetion(true);
              });
            }
          }}
          style={{ width: "100%" }}
        />
      )}
      <div
        style={{
          position: "absolute",
          zIndex: "5",
          backgroundColor: "#F5F5F5",
          width: "98%",
        }}
      >
        {renderContact()}
      </div>

      {contact.name ? <h1>{contact.name}</h1> : ""}
      {contact.address ? <>{contact.address}</> : ""}

      {contact.phone ? "Phone : " + contact.phone : ""}
    </>
  );
};
export default connect(null, { getEmployeeSearchResultbyPhone })(Demo);
