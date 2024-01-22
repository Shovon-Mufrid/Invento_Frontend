import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import List from "./List";
import CreateNewAttribute from "./CreateNewCategory";
import EditCategory from "./EditCategory";
import { deleteOfficeLocation } from "../../../actions/officelocationAction";

import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Space,
  Popconfirm,
  Button,
  message,
} from "antd";

const { Content } = Layout;

const Category = ({ deleteOfficeLocation, auth }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const [categorylist, setcategorylist] = useState([]);
  const [selectedCategory, setselectedCategory] = useState([]);

  const confirm = () => {
    deleteOfficeLocation(selectedCategory.id);
    setUpdatelist(false);
    message.success(
      selectedCategory.name + " Has been deleted from your contact list"
    );
  };

  const renderDetails = () => {
    if (selectedCategory.name) {
      return (
        <>
          <Row>
            <Col span={8}>
              <h4>Location Name :</h4>
            </Col>
            <Col span={16}>
              <p>{selectedCategory.name}</p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <h4>Slug :</h4>
            </Col>
            <Col span={16}>
              <p>{selectedCategory.slug}</p>
            </Col>
          </Row>
          <Divider></Divider>
          <Space>
            {auth.permissions.includes("Settings.Office Location_is_delete") ? (
              <Button danger style={{ marginRight: "10px" }}>
                <Popconfirm
                  title="Are you sure to delete this contact?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <Link to="#">Delete</Link>
                </Popconfirm>
              </Button>
            ) : (
              ""
            )}
            {auth.permissions.includes("Settings.Office Location_is_update") ? (
              <EditCategory
                details={selectedCategory}
                setUpdatelist={setUpdatelist}
              />
            ) : (
              ""
            )}
          </Space>
        </>
      );
    } else {
      return <p>Please select a location to see details</p>;
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Office Locations</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col span={12}>
            {auth.permissions.includes("Settings.Office Location_is_create") ? (
              <CreateNewAttribute
                setUpdatelist={setUpdatelist}
                updatelist={updatelist}
              />
            ) : (
              ""
            )}
            <h3>Location list</h3>
            <Divider></Divider>
            <List
              updatelist={updatelist}
              setUpdatelist={setUpdatelist}
              setcategorylist={setcategorylist}
              setselectedCategory={setselectedCategory}
            />
          </Col>
          <Col span={10} offset={2}>
            <h3>Location Details</h3>
            <Divider></Divider>
            {renderDetails()}
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { deleteOfficeLocation })(Category);
