import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { uploadDraftImage } from "../../../../actions/draftcostsheetAction";
import { Form, Input, Drawer, Button, Col, Row, message, Divider, Select } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import ImageUpload from "./ImageUpload";

const CreateDraftImage = ({
    cost_sheet_id,
    uploadDraftImage,
    setUpdatelist,
    details,
  }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [updateimage, setUpdateimage] = useState(false);
    const [newimage, setnewimage] = useState(false);
    // const { cost_sheet_id } = useParams();
    // const [imgFileBase64, setimgFileBase64] = useState(null);
    // const [imgFile, setimgFile] = useState(null);

    const showDrawer = () => {
        setVisible(true);
      };
    
    const onClose = () => {
    setVisible(false);
    form.resetFields();
    };
    
    const onFinish = (values) => {
        try {
          uploadDraftImage(values, cost_sheet_id);
          setVisible(false);
          setUpdatelist(false);
          message.success(values.product_image + " Has been added to your contact list");
          form.resetFields();
        } catch {
          message.warning("There are something wrong with the API");
        }
      };
    
      return (
        <>
          <>
            <Button
              type="primary"
              onClick={showDrawer}
              style={{ marginBottom: "10px" }}
            >
              <PlusOutlined /> Draft Image
            </Button>
            <Drawer
              title="Create a Draft Image"
              width={1080}
              onClose={onClose}
              visible={visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                onFinish={onFinish}>

                <Row gutter={16}>                 
                    <Col span={12}>
                        {/* <Form.Item name="product_image" label="Photo" extra="Upload photo"> */}
                        <ImageUpload
                        limit={1}
                        cost_sheet_id={cost_sheet_id}
                        setnewimage={setnewimage}
                        setUpdateimage={setUpdateimage}
                            // setFile={(file) => setimgFile(file)}
                            // setFileBase64={(file) => setimgFileBase64(file)}
                        >
                            {/* <Button icon={<UploadOutlined />}> Click to Upload</Button> */}
                        </ImageUpload>
                        {/* </Form.Item> */}
                    </Col>
                </Row>

                {/* <Form.Item>
                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item> */}
              </Form>
            </Drawer>
          </>
        </>
      );  

  };
export default connect(null, { uploadDraftImage }) (CreateDraftImage);    

