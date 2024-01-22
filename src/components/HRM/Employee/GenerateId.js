import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  Button,
  TreeSelect,
  TimePicker,
  Col,
  Row,
  Select,
  Upload,
  message,
  DatePicker,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactToPrint from "react-to-print";
const { Option } = Select;

const GenerateID = ({
  details,
  setUpdatelist,
  updatelist,
  businessprofile,
}) => {
  const [visible, setVisible] = useState(false);
  const format = "h:mm a";
  const format2 = "h:mm";
  const format24 = "HH:mm";
  const formatDate = "DD-MM-YYYY";
  const [issuedate, setIssueDate] = useState(moment());
  const [expirydate, setExpiryDate] = useState(moment().add(2, "years"));
  const componentRef = useRef();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    setUpdatelist(!updatelist);
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ marginRight: "10px" }}
      >
        View ID
      </Button>

      <Drawer
        title="View ID"
        width={860}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <ReactToPrint
          trigger={() => <Button type="primary">Print this out!</Button>}
          content={() => componentRef.current}
        />
        <br></br>
        <div
          className="employee_id_print_fontSize"
          ref={componentRef}
          style={{ padding: "40px" }}
        >
          <div class="main_div">
            <div class="font_page">
              <div class="bg_color">
                <h3>Employee Id: {1000 + details.id}</h3>
                <img src={details.photo} alt="images" />
              </div>
              <div class="font_page_discription">
                <div class="profile_info">
                  <h3>{details.name}</h3>
                  <div class="job_title">{details.user_roleName}</div>
                  <div class="phone_number">
                    <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                    {details.phone}
                  </div>
                </div>
                <div class="id_card_logo">
                  <img src={businessprofile.logo} alt="logo.png" />
                </div>
                <div class="date_info">
                  <div class="issue_date">
                    <span>Date of Issue: </span>
                    <span>
                      {issuedate.format("D") +
                        " " +
                        issuedate.format("MMM") +
                        ", " +
                        issuedate.format("YYYY")}
                    </span>
                  </div>
                  <div class="expire_date">
                    <span>Date of Expire: </span>
                    <span>
                      {expirydate.format("D") +
                        " " +
                        expirydate.format("MMM") +
                        ", " +
                        expirydate.format("YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="back_page">
              <div class="shap">
                <div class="simple_text">
                  <small>exclusive</small>
                  woman Wear
                </div>
              </div>
              <div class="font_page_discription">
                <div class="address_info">
                  <div class="address">
                    <span>anzara</span>
                    <p>Hs 47,Rd 11,Block H Banani,Dhaka 1213</p>
                    <p>+8801876864484</p>
                  </div>
                  <div class="address">
                    <span>BRIDAL</span>
                    <p>Hs 43,Rd 11,Block F Banani,Dhaka 1213</p>
                    <p>+8801862032373</p>
                  </div>
                </div>
                <div class="footer_text">
                  <p>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    info@anzaraclothing.com
                  </p>
                  <p>
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                    anzaraclothing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};
export default connect(mapStateToProps, {})(GenerateID);
