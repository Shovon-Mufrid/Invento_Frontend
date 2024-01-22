

import React, { Component } from "react";
import { connect } from "react-redux";
import { Upload, Modal, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { uploadDraftImage } from "../../../../actions/draftcostsheetAction";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class ImageUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    if (!file.url && !file.preview) {
      file.preview = file.originFileObj;
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  
  updateimage = () => {
    this.state.fileList.map((file) => {
      // alert("working...");
      const formData = new FormData();
      formData.append("product_image", file.originFileObj);
      formData.append("cost_sheet",  this.props.cost_sheet_id);
      // if (this.props.cost_sheet_id) {
      //   formData.append("DraftCostSheet", this.props.cost_sheet_id);
      //   console.log(this.props.cost_sheet_id)
      // }
      this.props.uploadDraftImage(formData, this.props.cost_sheet_id);
    });
    setTimeout(
      function () {
        //Start the timer
        this.props.setnewimage(true); //After 1 second, set render to true
      }.bind(this),
      2000
    );

    this.setState({
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    });
  };

  // handleChange = ({ fileList }) => {
  //   this.props.setImages(fileList);
  //   this.setState({ fileList });
  // };
  handleChange = (info) => {
    console.log(info);
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-5);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      console.log(file)
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}></div>
      </div>
    );
    return (
      <>
        {/* <ImgCrop rotate> */}
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            maxCount={this.props.limit}
          >
            {fileList.length >= this.props.limit ? null : uploadButton}
          </Upload>
        {/* </ImgCrop> */}
        <Modal
          // visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <Button type="primary" size="large" onClick={this.updateimage} style={{ marginTop: "10" }}>
          Upload An Image
        </Button>
        
      </>
    );
  }
}

export default connect(null, { uploadDraftImage })(ImageUpload);
