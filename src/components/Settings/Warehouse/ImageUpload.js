import React, { Component } from "react";
import { Upload, Button } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { message, Avatar } from "antd";

class MyUpload extends Component {
  

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            imgUrlInBase64: ''
        }
    }

    getBase64(img) {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        const that = this;
        reader.addEventListener("load", function () {
            that.setState({
                imgUrlInBase64: (this.result != null) ? this.result.toString() : ''
            })
            
        }, false);
        

    }

    normalizingFileUpload = (event) => {
        if (Array.isArray(event)) {
            return event;
        }
        return event && event.fileList;
    };

    render() {
        const {imgUrlInBase64, isLoading} = this.state;
        let avatarSrc;
        if (imgUrlInBase64 != '') {
            avatarSrc = imgUrlInBase64
        } else if (this.props.preLoadedImg != '') {
            avatarSrc = this.props.preLoadedImg
        }
        else {
            avatarSrc = undefined
        }

        const uploaderProps = {
            name: 'avatar',
            listType: "picture-card",
            showUploadList: false,
            accept: "image/*",
            beforeUpload: (file) => {
                const checkingSizeIsLessThan2M = file.size / 1024 / 1024 < 2;
                if (!checkingSizeIsLessThan2M) {
                    message.error('This file is too heavy.')
                } else {
                    this.getBase64(file);
                    this.props.setFileBase64(imgUrlInBase64);
                    this.props.setFile(file);
                }
                return false;
            }
        };
        return (
           
        <Upload {...uploaderProps}>
             
              <Avatar 
              size="large"
              icon={ imgUrlInBase64 != '' ? null : isLoading ? <LoadingOutlined/> : <UploadOutlined />}
              src={avatarSrc}
              ></Avatar>
              
        </Upload>
                    
        );
    }
}

export default MyUpload;
