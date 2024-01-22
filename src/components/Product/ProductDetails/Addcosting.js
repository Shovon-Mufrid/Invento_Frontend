import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { getspecificproductvariation } from "../../../actions/variableProductAction";
import {
  getAllChartofaccounts,
  getSpecificChartofaccountsbycode,
} from "../../../actions/chartofaccountsAction";
import {
  createjournals,
  getJournalSearchResult,
  getJournalSearchResultbyproduct,
  deletejournals,
  updatejournals,
} from "../../../actions/journalAction";
import { updateVariation } from "../../../actions/variableProductAction";
import { getAllAccount, updateAccount } from "../../../actions/accountsAction";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Divider,
  Drawer,
  Image,
  Popconfirm,
  Space,
} from "antd";
import { MinusCircleFilled } from "@ant-design/icons";

const { Option } = Select;

const Quickview = ({
  details,
  Variations,
  getspecificproductvariation,
  createjournals,
  getJournalSearchResult,
  getAllChartofaccounts,
  getSpecificChartofaccountsbycode,
  updateVariation,
  getJournalSearchResultbyproduct,
  updatejournals,
  setreload,
  getAllAccount,
  updateAccount,
}) => {
  const initial = {};
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [accounts, setaccounts] = useState([]);
  const [List, setList] = useState([]);
  const [History, setHistory] = useState([]);
  const selectedhead = useRef(null);
  const narration = useRef(null);
  const account_id = useRef(null);
  const amount = useRef(0);
  const [editeddata, setEditedData] = useState([]);

  const componentRef = useRef();
  const wrapper_ref = React.useRef();
  var formatter = new Intl.NumberFormat("en-IN");
  const showDrawer = () => {
    getAllAccount().then((result) => {
      setaccounts(result);
    });
    getJournalSearchResultbyproduct("", details.id).then((res) => {
      setHistory(res);
    });
    getspecificproductvariation(details.id).then((res) => {
      getAllChartofaccounts().then((result) => {
        setList(result);
      });
      setVisible(true);
    });
  };

  const onFinish = () => {
    let promises = [];
    //jounal entry

    //cost of goods sold
    let formData = new FormData();
    formData.append("chartofaccount", selectedhead.current);
    formData.append("product", details.id);
    formData.append(
      "amount",
      parseFloat(amount.current * details.quantity).toFixed(2)
    );
    formData.append("account", account_id.current);
    formData.append("narration", narration.current);
    formData.append("details", narration.current);
    formData.append("increase", true);
    promises.push(createjournals(formData));

    //cash 100040
    getSpecificChartofaccountsbycode(100040).then((res) => {
      let formData2 = new FormData();
      formData2.append("chartofaccount", res[0].id);
      formData2.append("product", details.id);
      formData2.append(
        "amount",
        parseFloat(amount.current * details.quantity).toFixed(2)
      );
      formData2.append("account", account_id.current);
      formData2.append("narration", details.title + " Cost of goods sold");
      formData2.append("details", details.title + " Cost of goods sold");
      formData2.append("increase", false);
      promises.push(createjournals(formData2));
    });

    //inventory
    // getSpecificChartofaccountsbycode(1000100015).then((res) => {
    //   let formData3 = new FormData();
    //   formData3.append("chartofaccount", res[0].id);
    //   formData3.append("product", details.id);
    //   formData3.append(
    //     "amount",
    //     parseFloat(amount.current * details.quantity).toFixed(2)
    //   );
    //   formData3.append("account", account_id.current);
    //   formData3.append("narration", details.title + " Cost of goods sold");
    //   formData3.append("details", details.title + " Cost of goods sold");
    //   formData3.append("increase", true);
    //   promises.push(createjournals(formData3));
    // });

    //Update variation
    for (let i = 0; i < Variations.length; i++) {
      let var_update = new FormData();
      var_update.append(
        "purchase_price",
        parseFloat(
          parseFloat(Variations[i].purchase_price) + parseFloat(amount.current)
        ).toFixed(2)
      );
      promises.push(updateVariation(Variations[i].id, var_update));
    }

    //update cash

    let cashjournal = new FormData();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].type == "Cash") {
        cashjournal.append(
          "cash",
          (
            accounts[i].cash - parseFloat(amount.current * details.quantity)
          ).toFixed(2)
        );
        promises.push(updateAccount(accounts[i].id, cashjournal));
      }
    }

    Promise.all(promises).then((e) => {
      getJournalSearchResultbyproduct("", details.id).then((res) => {
        setHistory(res);
        message.success("Successfully updated");
        form.resetFields();
        setVisible(false);
        setreload(true);
        // window.location.reload();
      });
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const VariationArray = () => {
    Variations.map((Variation) => {
      console.log(Variation);
    });
  };

  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Add costing
        </a>
        <Drawer
          title={details.title}
          width="800"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <h3>Add costing</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initial}
          >
            <Row>
              <Col span={5}>
                <Form.Item
                  name="accountt"
                  label="Select an account"
                  rules={[
                    {
                      required: true,
                      message: "Please Select CASH",
                    },
                  ]}
                >
                  <Select
                    onChange={(value) => {
                      account_id.current = value;
                    }}
                  >
                    {accounts.map((item) => {
                      if (item.type == "Cash") {
                        return <Option value={item.id}>{item.name}</Option>;
                      }
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5} offset={1}>
                <Form.Item name="name" label="Name">
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      selectedhead.current = value;
                    }}
                  >
                    {List.map((item) => {
                      if (
                        item.Sub_group == "Cost of Goods sold" ||
                        item.account_name == "Cost of Goods sold"
                      ) {
                        return (
                          <Option value={item.id}>{item.account_name}</Option>
                        );
                      }
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={7} offset={1}>
                <Form.Item name="nameee" label="Narration">
                  <Input
                    placeholder="Naration"
                    onChange={(value) => {
                      narration.current = value.target.value;
                    }}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Form.Item name="namee" label="Cost">
                  <InputNumber
                    placeholder="Per unit cost"
                    onChange={(value) => {
                      amount.current = value;
                    }}
                  ></InputNumber>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider></Divider>

          <h3>History</h3>
          <br></br>
          <Row>
            <Col span={8}>
              <h3>Expense type</h3>
            </Col>
            <Col span={10}>
              <h3>Narration</h3>
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              <h3>Amount (BDT)</h3>
            </Col>
            {History.map((item) => {
              const myArray = item.details.split(" ");

              if (item.Group == "Expense" && item.increase) {
                return (
                  <>
                    <Col span={8}>{item.Subgroup}</Col>
                    <Col span={12}>{item.details}</Col>
                    <Col span={2} style={{ textAlign: "right" }}>
                      <Space>
                        {formatter.format(item.amount)}
                        {myArray[0] != "Removed" ? (
                          <Popconfirm
                            title="Are you sure to delete this entry?"
                            onConfirm={(confirm) => {
                              let promises = [];
                              //jounal entry

                              //cost of goods sold
                              let formData = new FormData();
                              formData.append(
                                "chartofaccount",
                                item.chartofaccount
                              );
                              formData.append("product", details.id);
                              formData.append("amount", item.amount);
                              formData.append(
                                "narration",
                                "Removed - " + item.details
                              );
                              formData.append(
                                "details",
                                "Removed - " + item.details
                              );
                              formData.append("increase", false);
                              promises.push(createjournals(formData));

                              //cash 100040
                              getSpecificChartofaccountsbycode(100040).then(
                                (res) => {
                                  let formData2 = new FormData();
                                  formData2.append("chartofaccount", res[0].id);
                                  formData2.append("product", details.id);
                                  formData2.append("amount", item.amount);
                                  formData2.append(
                                    "narration",
                                    item.details + " Cost of goods sold"
                                  );
                                  formData2.append(
                                    "details",
                                    item.details + " Cost of goods sold"
                                  );
                                  formData2.append("increase", true);
                                  promises.push(createjournals(formData2));
                                }
                              );

                              //inventory
                              getSpecificChartofaccountsbycode(1000100015).then(
                                (res) => {
                                  let formData3 = new FormData();
                                  formData3.append("chartofaccount", res[0].id);
                                  formData3.append("product", details.id);
                                  formData3.append("amount", item.amount);
                                  formData3.append(
                                    "narration",
                                    item.details + " Cost of goods sold"
                                  );
                                  formData3.append(
                                    "details",
                                    item.details + " Cost of goods sold"
                                  );
                                  formData3.append("increase", false);
                                  promises.push(createjournals(formData3));
                                }
                              );

                              //Update variation
                              let unitcost =
                                parseFloat(item.amount) /
                                parseFloat(details.quantity);
                              for (let i = 0; i < Variations.length; i++) {
                                let var_update = new FormData();
                                var_update.append(
                                  "purchase_price",
                                  parseFloat(
                                    parseFloat(Variations[i].purchase_price) -
                                      parseFloat(unitcost)
                                  ).toFixed(2)
                                );
                                promises.push(
                                  updateVariation(Variations[i].id, var_update)
                                );
                              }
                              Promise.all(promises).then((e) => {
                                getJournalSearchResultbyproduct(
                                  "",
                                  details.id
                                ).then((res) => {
                                  formData = new FormData();
                                  formData.append(
                                    "narration",
                                    "Removed - " + item.details
                                  );
                                  formData.append(
                                    "details",
                                    "Removed - " + item.details
                                  );
                                  updatejournals(item.id, formData).then(
                                    (result) => {
                                      setHistory(res);
                                      // window.location.reload();
                                      form.resetFields();
                                      setVisible(false);
                                      setreload(true);
                                    }
                                  );
                                });
                                message.success("Successfully updated");
                                form.resetFields();
                              });
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link" danger>
                              <MinusCircleFilled />
                            </Button>
                          </Popconfirm>
                        ) : (
                          ""
                        )}
                      </Space>
                    </Col>
                  </>
                );
              }
            })}
          </Row>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Variations: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, {
  getspecificproductvariation,
  createjournals,
  getJournalSearchResult,
  getAllChartofaccounts,
  getSpecificChartofaccountsbycode,
  updateVariation,
  getJournalSearchResultbyproduct,
  updatejournals,
  getAllAccount,
  updateAccount,
})(Quickview);
