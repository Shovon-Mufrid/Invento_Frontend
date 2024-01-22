import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updateWarehouse } from "../../../actions/warehouseAction";
import {
  getAllAccount,
  getSpecificAccount,
  updateAccount,
} from "../../../actions/accountsAction";

import {
  createChartofaccounts,
  getAllChartofaccounts,
  getSpecificChartofaccounts,
  getSpecificChartofaccountsbycode,
} from "../../../actions/chartofaccountsAction";
import { createjournals } from "../../../actions/journalAction";
import { createpettycashTransfer } from "../../../actions/accounting/pettycashTransfer";

import {
  Form,
  Input,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  InputNumber,
  Divider,
  Skeleton,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const Edit = ({
  details,
  setUpdatelist,
  updateWarehouse,
  getAllAccount,
  updateAccount,
  getSpecificChartofaccountsbycode,
  createjournals,
  createpettycashTransfer,
}) => {
  const initial = { address: "" };
  const [visible, setVisible] = useState(false);
  const [laoding, setlaoding] = useState(true);
  const [accountList, setaccountList] = useState([]);
  const selectedaccountcash = useRef(0);
  const [form] = Form.useForm();

  const showDrawer = () => {
    getAllAccount().then((result) => {
      setaccountList(result);
      setlaoding(false);
      setVisible(true);
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    let promises = [];

    if (typeof values["accountt"] !== "undefined") {
      setlaoding(true);
      if (typeof values["cashh"] !== "undefined") {
        values["cash"] = parseFloat(details.cash) + parseFloat(values["cashh"]);
      }
      if (typeof values["petty_cashh"] !== "undefined") {
        values["petty_cash"] =
          parseFloat(details.petty_cash) + parseFloat(values["petty_cashh"]);
      }
      // creating journal
      // pettycash
      if (typeof values["petty_cashh"] !== "undefined") {
        let accountCode = "100010001";
        promises.push(
          getSpecificChartofaccountsbycode(accountCode).then((res) => {
            let formData2 = new FormData();
            formData2.append("location", details.id);
            formData2.append("outlet", details.id);
            formData2.append("amount", values["petty_cashh"]);
            formData2.append("details", "Petty Cash Transfer");
            formData2.append("increase", true);
            formData2.append("account", values["accountt"]);
            formData2.append("chartofaccount", res[0].id);
            promises.push(createjournals(formData2));
          })
        );
        // cash
        accountCode = "100040";
        promises.push(
          getSpecificChartofaccountsbycode(accountCode).then((res) => {
            let formData2 = new FormData();
            formData2.append("location", details.id);
            formData2.append("outlet", details.id);
            formData2.append("amount", values["petty_cashh"]);
            formData2.append("details", "Petty Cash Transfer");
            formData2.append("increase", false);
            formData2.append("account", values["accountt"]);
            formData2.append("chartofaccount", res[0].id);
            promises.push(createjournals(formData2));
          })
        );
      }
      // ending journal
      promises.push(updateWarehouse(details.id, values));

      values["cash"] = parseFloat(selectedaccountcash.current);
      if (typeof values["cashh"] !== "undefined") {
        values["cash"] =
          parseFloat(selectedaccountcash.current) - parseFloat(values["cashh"]);
      }
      if (typeof values["petty_cashh"] !== "undefined") {
        values["cash"] =
          parseFloat(selectedaccountcash.current) -
          parseFloat(values["petty_cashh"]);
      }
      if (
        typeof values["cashh"] !== "undefined" &&
        typeof values["petty_cashh"] !== "undefined"
      ) {
        values["cash"] =
          parseFloat(selectedaccountcash.current) -
          parseFloat(values["petty_cashh"]) -
          parseFloat(values["cashh"]);
      }

      promises.push(updateAccount(values["accountt"], values));

      // storing transfer history start
      let transfer_data = new FormData();
      transfer_data["cash_amount"] = values["cashh"]
        ? parseFloat(values["cashh"])
        : "";
      transfer_data["pett_cash_amount"] = values["petty_cashh"]
        ? parseFloat(values["petty_cashh"])
        : "";
      transfer_data["location"] = details.id;
      transfer_data["account"] = values["accountt"] ? values["accountt"] : "";
      transfer_data["collect_cash"] = false;
      transfer_data["add_cash"] = true;
      promises.push(createpettycashTransfer(transfer_data));
      // storing transfer history end
      Promise.all(promises).then(() => {
        console.log("done");
        form.resetFields(); // reset form
        setUpdatelist(false);
        setVisible(false);
        // window.location.reload();
      });
    } else {
      alert("Please select an account");
    }
  };

  const renderData = () => {
    if (laoding) {
      return <Skeleton active />;
    } else {
      return (
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={details}
          form={form}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="accountt" label="Select an account">
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    accountList.map((item) => {
                      if (value == item.id) {
                        selectedaccountcash.current = item.cash;
                      }
                    });
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
            {details.is_outlet ? (
              <Col span={24}>
                <Form.Item name="cashh" label="Cash on hand amount">
                  <InputNumber defaultValue={0} />
                </Form.Item>
              </Col>
            ) : (
              ""
            )}
            <Col span={24}>
              <Form.Item name="petty_cashh" label="Petty cash amount">
                <InputNumber defaultValue={0} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Transfer
            </Button>
          </Form.Item>
        </Form>
      );
    }
  };

  return (
    <>
      <Button type="link" onClick={showDrawer}>
        Add cash
      </Button>

      <Drawer
        title="Add cash"
        width={720}
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
  updateWarehouse,
  getAllAccount,
  updateAccount,
  getSpecificChartofaccountsbycode,
  createjournals,
  createpettycashTransfer,
})(Edit);
