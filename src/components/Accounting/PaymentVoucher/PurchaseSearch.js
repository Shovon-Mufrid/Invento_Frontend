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

import { searchInvoice } from "../../../actions/invoiceItem";
import { searchPurchase } from "../../../actions/purchase";

const Demo = ({ searchPurchase, selector }) => {
  const [showsuggetion, setshowsuggetion] = useState(false);
  const [contactsuggetions, setcontactsuggetions] = useState();
  const [contact, setcontact] = useState({ name: "" });
  const [remove, setremove] = useState(false);

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
              <Col span={13}>
                <h4 style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  Purchase no. {contact.purchase_number}
                </h4>
              </Col>
              <Col span={6}>{contact.Contact[0].name}</Col>
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
          remove purchase
        </Button>
      ) : (
        <AutoComplete
          placeholder="Enter enter invoice number"
          onChange={(value) => {
            if (value == "") {
              setshowsuggetion(false);
            } else {
              searchPurchase("", "", "", "", "", value).then((result) => {
                console.log(result);
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
      {contact.purchase_number ? (
        <h1>Purchase no . {contact.purchase_number}</h1>
      ) : (
        ""
      )}
      {contact.purchase_number ? contact.Contact[0].name : ""}
      <br></br>
      {contact.purchase_number ? "phone :" + contact.Contact[0].phone : ""}
      <br></br>
      {contact.due ? "due :" + contact.due : ""}
    </>
  );
};
export default connect(null, { searchPurchase })(Demo);
