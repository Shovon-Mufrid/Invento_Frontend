import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";

import { getAllAccount } from "../../../actions/accountsAction";
import RenderTableHistory from "./RendertableHistory";

import { getpettycashTransferSearchResult } from "../../../actions/accounting/pettycashTransfer";

import { Form, Drawer, Button, Col, Row, Select, Skeleton } from "antd";

const { Option } = Select;

const Edit = ({
  details,
  updatelist,
  setUpdatelist,
  getAllAccount,
  getpettycashTransferSearchResult,
}) => {
  const [visible, setVisible] = useState(false);
  const [laoding, setlaoding] = useState(true);
  const [accountList, setaccountList] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllAccount().then((result) => {
      setaccountList(result);
      setlaoding(false);
      setVisible(true);
    });
  };

  useEffect(() => {
    console.log(visible);
    if (visible) {
      getpettycashTransferSearchResult("", details.id, selectedAccount).then(
        (result) => {
          console.log(result);
          setHistory(result);
        }
      );
    }
  }, [selectedAccount]);

  const onClose = () => {
    form.resetFields();
    setVisible(false);
    setHistory([]);
    setSelectedAccount("");
  };

  const renderData = () => {
    if (laoding) {
      return <Skeleton active />;
    } else {
      return (
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="accountt" label="Select an account">
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setSelectedAccount(value);
                    // accountList.map((item) => {
                    //   if (value == item.id) {
                    //     selectedaccountcash.current = item.cash;
                    //   }
                    // });
                  }}
                >
                  {accountList.map((item) => {
                    if (item.type == "Cash") {
                      return <Option value={item.id}>{item.name}</Option>;
                    }
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <RenderTableHistory
                List={history}
                updatelist={updatelist}
                setUpdatelist={setUpdatelist}
              />
            </Col>
          </Row>
          {/* <Form.Item>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Transfer
            </Button>
          </Form.Item> */}
        </Form>
      );
    }
  };

  return (
    <>
      <Button type="link" onClick={showDrawer}>
        History
      </Button>

      <Drawer
        title="Transfer History"
        width="60%"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {renderData()}
      </Drawer>
    </>
  );
};

export default connect(null, {
  getAllAccount,
  getpettycashTransferSearchResult,
})(Edit);
