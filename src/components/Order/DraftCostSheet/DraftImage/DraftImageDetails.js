import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Drawer, Row, Col, Divider, Popconfirm, message, Space } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {uploadDraftImage, deleteDraftImage, getDraftCostSheet} from "../../../../actions/draftcostsheetAction";
import { CloseCircleOutlined } from "@ant-design/icons";
import CreateDraftImage from "./CreateNewDraftImage";
import DraftImageList from "./DraftImageList";
import ImageUpload from "./ImageUpload";

// import 

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const DraftImageDetails = ({ details, setUpdatelist, reload , deleteDraftImage}) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setUpdatelist(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const renderDetails = () => {
    if (!details) {
      return "";
    }

    const {
      id,
      product_image,
      draftImage
    } = details;

    return (
      <div>
        <h3>Draft Images</h3>
        <CreateDraftImage 
         cost_sheet_id={details.id}
          details={details}
          setUpdatelist={setUpdatelist}
        />
         <Divider />
         <DraftImageList id={id} draftImage={draftImage}/>
      
      </div>
    );
  };
  

  return (
    <>
      <a
        onClick={() => setVisible(true)}
        style={{ marginRight: 8 }}
      >
          Images
      </a>
      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        {renderDetails()}
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
   deleteDraftImage, 
})(DraftImageDetails);