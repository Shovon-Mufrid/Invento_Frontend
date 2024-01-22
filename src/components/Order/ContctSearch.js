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
import { getContactSearchResultbyPhone } from "../../actions/contactAction";
import CreateNewContct from "./CreateNewContct";
import { NotificationFilled } from "@ant-design/icons";

const Demo = ({ getContactSearchResultbyPhone, bill, setCart }) => {
  const [showsuggetion, setshowsuggetion] = useState(false);
  const [contactsuggetions, setcontactsuggetions] = useState();
  const [contact, setcontact] = useState({});
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
        if (contact.Type == "Customer" && index < 10) {
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
                  bill.current.Contact = contact.id;
                  if (parseFloat(contact.account_balance) > 0) {
                    bill.current.Payable = parseFloat(contact.account_balance);
                  } else {
                    bill.current.Payable = 0;
                  }
                  setshowsuggetion(false);
                  setremove(true);
                  setCart(true);
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
            setcontact(null);
            bill.current.Payable = 0;
            bill.current.Contact = null;
            setCart(true);
          }}
          type="link"
        >
          remove contact
        </Button>
      ) : (
        <Space direction="Horizontal" style={{ width: "90%" }}>
          <Input
            placeholder="Enter Phone Number to select contact"
            onKeyUp={onChange}
            width="60"
          />
          <CreateNewContct bill={bill} setcontact={setcontact} />
        </Space>
      )}
      <div
        style={{
          position: "absolute",
          zIndex: "5",
          backgroundColor: "#F5F5F5",
          width: "70%",
        }}
      >
        {renderContact()}
      </div>
      <br></br>
      {contact ? (
        <>
          {contact.name ? <h1>{contact.name}</h1> : ""}
          {contact.address ? (
            <>
              {contact.address}
              <br></br>
            </>
          ) : (
            ""
          )}

          {contact.phone ? "Phone : " + contact.phone : ""}
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default connect(null, { getContactSearchResultbyPhone })(Demo);
