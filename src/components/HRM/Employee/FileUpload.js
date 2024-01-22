import React, { Component } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { message } from "antd";

class MyUpload extends Component {
  state = {
    fileList: [...this.props.oldFiles],
    // fileList: [],
  };
  handleChange = (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };
  handleRemove = (fileId) => {
    const { fileList } = this.state;
    this.setState({ fileList: fileList.filter((item) => item.id !== fileId) });
    this.props.delFile(fileId);
  };

  render() {
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true,
    };
    const uploaderProps = {
      beforeUpload: (file) => {
        const checkingSizeIsLessThan2M = file.size / 1024 / 1024 < 2;
        if (!checkingSizeIsLessThan2M) {
          message.error("This file is too heavy.");
        } else {
          this.state.fileList.push(file);
          this.props.setFile(this.state.fileList);
        }
        return false;
      },
    };
    const { fileList } = this.state;
    return (
      <div>
        <Upload {...uploaderProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {/* {fileList.map((file) => (
          <div>
            <a onClick={() => openInNewTab(file.url)}>{file.name}</a>{" "}
            <a
              onClick={() => this.handleRemove(file.id)}
              style={{ color: "red" }}
            >
              click to remove
            </a>
          </div>
        ))} */}
      </div>
    );
  }
}

export default MyUpload;
const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
