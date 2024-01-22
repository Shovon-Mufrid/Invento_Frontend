import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Divider,
  Col,
  Row,
  Button,
  message,
  Popconfirm,
  Space,
  Tag,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  deleteAttribute,
  deleteAttributeTerm,
} from "../../../actions/attributeAction";
import EditAttributeTerm from "./EditAttributeTerm";
import EditAttribute from "./EditAttribute";
import CreateNewAttributeTerm from "./CreateNewAttributeTerm";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ContactDetails = ({
  details,
  deleteAttribute,
  setUpdatelist,
  deleteAttributeTerm,
  auth,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showcolor = (attribute, colorr) => {
    if (attribute.name == "Color") {
      return <Tag color={colorr}>{colorr}</Tag>;
    } else {
      return <></>;
    }
  };

  const renderTerms = (terms, attribute) => {
    return terms.map((term) => (
      <Row
        style={{
          border: "1px solid lightgray",
          paddingTop: "8px",
          paddingLeft: "7px",
          marginBottom: "5px",
        }}
      >
        <Col span={20}>
          <p>
            {showcolor(attribute, term.context)}
            {term.name}
          </p>
        </Col>
        <Col span={4}>
          <Space>
            <EditAttributeTerm
              details={term}
              attribute={attribute}
              setUpdatelist={setUpdatelist}
            />

            <Button
              type="link"
              style={{
                marginTop: "-3px",
                color: "red",
              }}
            >
              <Popconfirm
                title="Are you sure to delete this term?"
                onConfirm={() => {
                  deleteAttributeTerm(term.id);
                  setUpdatelist(false);
                  message.success(
                    term.name + " Has been deleted from your terms"
                  );
                }}
                okText="Yes"
                cancelText="No"
              >
                <CloseCircleOutlined />
              </Popconfirm>
            </Button>
          </Space>
        </Col>
      </Row>
    ));
  };

  const confirm = () => {
    deleteAttribute(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(details.name + " Has been deleted from your contact list");
  };
  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        View Details
      </Link>

      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Information
        </p>
        <p className="site-description-item-profile-p">Attribute</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="name" content={details.name} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Slug" content={details.slug} />
          </Col>
        </Row>

        {auth.permissions.includes("Products.Attribute_is_delete") ? (
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
        {auth.permissions.includes("Products.Attribute_is_update") ? (
          <EditAttribute details={details} setUpdatelist={setUpdatelist} />
        ) : (
          ""
        )}
        <Divider />
        <p className="site-description-item-profile-p">Terms</p>
        <CreateNewAttributeTerm
          attributeid={details.id}
          details={details}
          setUpdatelist={setUpdatelist}
        />
        {renderTerms(details.terms, details)}
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteAttribute,
  deleteAttributeTerm,
})(ContactDetails);
