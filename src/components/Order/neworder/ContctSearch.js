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
import { getContactSearchResult } from "../../../actions/contactAction";
// import CreateNewContct from "./CreateNewContct";
import { NotificationFilled } from "@ant-design/icons";

const Demo = ({
  getContactSearchResult,
  bill,
  setCart,
  selectedContact,
  setreload,
  reload,
  createcontactnumber,
  createcontactbutton,
  setcreatecontactbutton,
  showform,
  inputvalue,
}) => {
  const [showsuggetion, setshowsuggetion] = useState(false);
  const [contactsuggetions, setcontactsuggetions] = useState();
  const [contact, setcontact] = useState({});
  const [remove, setremove] = useState(false);

  const onChange = (e) => {
    if (e.keyCode == 13) {
      if (e.target.value != "") {
        getContactSearchResult(e.target.value, "Customer").then((result) => {
          if (result.length > 0) {
            setcontactsuggetions(result);
            setcreatecontactbutton(false);
            setshowsuggetion(true);
          } else {
            createcontactnumber.current = e.target.value;
            setshowsuggetion(false);
            message.error("No user found with this number");
            setcreatecontactbutton(true);
            // alert("No result found");
          }
        });
      } else {
        setcreatecontactbutton(false);
        setshowsuggetion(false);
      }
    }
  };

  const onsearch = () => {
    // console.log(inputvalue.current);
    if (inputvalue.current != "") {
      getContactSearchResult(inputvalue.current, "Customer").then((result) => {
        if (result.length > 0) {
          setcontactsuggetions(result);
          setcreatecontactbutton(false);
          setshowsuggetion(true);
        } else {
          createcontactnumber.current = inputvalue.current;
          setshowsuggetion(false);
          message.error("No user found with this number");
          setcreatecontactbutton(true);
          // alert("No result found");
        }
      });
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
                  selectedContact.current = contact.id;

                  setreload(!reload);
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
            // bill.current.Payable = 0;
            // bill.current.Contact = null;
            // setCart(true);
          }}
          type="link"
        >
          remove contact
        </Button>
      ) : (
        <Row>
          <Col flex="auto">
            <Input
              placeholder="Enter Phone Number to select contact"
              onKeyUp={onChange}
              onChange={(e) => {
                inputvalue.current = e.target.value;
              }}
              width="80%"
            />
            <Button onClick={onsearch}>Serach</Button>
          </Col>
          {createcontactbutton ? (
            <Col flex="100px">
              <Button
                type="primary"
                onClick={() => {
                  showform.current = true;
                  setreload(!reload);
                }}
              >
                Create contact
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      )}
      <div
        style={{
          position: "absolute",
          zIndex: "5",
          backgroundColor: "#F5F5F5",
          width: "85%",
        }}
      >
        {renderContact()}
      </div>
    </>
  );
};
export default connect(null, { getContactSearchResult })(Demo);
