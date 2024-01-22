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
import { getContactSearchResultbyPhone } from "../../../actions/contactAction";
import CreateNewCustomer from "./CreateNewCustomer";
import CreateNewSupplier from "./CreateNewSupplier";

const Demo = ({ getContactSearchResultbyPhone, selector, type }) => {
  const [showsuggetion, setshowsuggetion] = useState(false);
  const [contactsuggetions, setcontactsuggetions] = useState();
  const [contact, setcontact] = useState({ name: "" });
  const [remove, setremove] = useState(false);

  const onChange = (e) => {
    if (e.keyCode == 13) {
      getContactSearchResultbyPhone(e.target.value).then((result) => {
        setcontactsuggetions(result);
        setshowsuggetion(true);
      });
    }
    if (e.target.value == "") {
      setshowsuggetion(false);
    }
  };
  const renderContact = () => {
    if (showsuggetion) {
      return contactsuggetions.map((contact, index) => {
        console.log(contact);
        if (contact.Type == type && index < 15) {
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
        }
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
          remove contact
        </Button>
      ) : (
        <>
          <Space style={{ width: "100%" }}>
            <Input
              placeholder="Enter Phone Number to select contact"
              onKeyUp={onChange}
              className="voucher_inputnumber"
            />

            {type == "Supplier" ? (
              <CreateNewSupplier
                selector={selector}
                setcontact={setcontact}
                setremove={setremove}
              />
            ) : (
              ""
            )}
            {type == "Customer" ? (
              <CreateNewCustomer
                selector={selector}
                setcontact={setcontact}
                setremove={setremove}
              />
            ) : (
              ""
            )}
          </Space>
        </>
        // </Space>
      )}
      <div
        style={{
          position: "absolute",
          zIndex: "5",
          backgroundColor: "#F5F5F5",
          width: "38%",
        }}
      >
        {renderContact()}
      </div>

      {contact.name ? <h1>{contact.name}</h1> : ""}
      {contact.address ? <>{contact.address}</> : ""}
      <br></br>
      {contact.phone ? "Phone : " + contact.phone : ""}
    </>
  );
};
export default connect(null, { getContactSearchResultbyPhone })(Demo);
