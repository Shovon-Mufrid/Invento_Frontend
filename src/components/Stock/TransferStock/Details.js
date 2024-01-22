import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
// import { deleteContact } from "../../actions/contactAction";
// import EditContact from "./EditContact";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const Details = ({ details, deleteContact, setUpdatelist }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    // deleteContact(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(details.name + " Has been deleted from your contact list");
  };
  console.log(details);
  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        View Profile
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
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="name" content={details.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone" content={details.phone} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={details.email} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Type" content={details.Type} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Address" content={details.address} />
          </Col>
          <Col span={24}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Remarks:</p>

              <div dangerouslySetInnerHTML={{ __html: details.remarks }}></div>
            </div>
          </Col>
        </Row>
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
        {/* <EditContact details={details} setUpdatelist={setUpdatelist} /> */}
        <Divider />
        <p className="site-description-item-profile-p">History</p>
      </Drawer>
    </>
  );
};

export default connect(null)(Details);
