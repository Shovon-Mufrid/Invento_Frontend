import React from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Image,
  InputNumber,
  Popconfirm,
} from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";

// import Quickview from "./Quickview";

// import Addcosting from "./Addcosting";
// import { getSingleProductbystatus } from "../../../actions/singleProductAction";
// import CountVariation from "./CountVariation";
// import CountPrice from "./CountPrice";

var formatter = new Intl.NumberFormat("en-IN");

console.log("rendertable");

class RenderTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    selectedRowKeys: [],
    shippingcost: 0,
    totoal_received: 0,
  };

  onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8, marginTop: -140 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  // selectproduct = () => {
  //   this.props.setselectedproduct(true, this.props.List);
  // };

  handleChange = (page, page_size) => {
    this.props.pageno.current = page;
    this.props.page_size.current = page_size;
    this.props.setUpdatelist(false);
    this.setState({
      current: page,
      minIndex: (page - 1) * this.props.page_size.current,
      maxIndex: page * this.props.page_size.current,
    });
    this.props.setreload(true);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { REACT_APP_API_URL } = process.env;
    const columns = [
      {
        title: "SL",
        key: "index",
        render: (value, item, index) => {
          return index + 1;
        },
      },
      {
        title: "Products",
        dataIndex: "Details",
        key: "Details",
      },
      {
        title: "Quantity",
        key: "quantity",
        render: (text, record, index) => {
          if (
            this.props.List[index].received != 1 &&
            !this.props.details.is_received
          ) {
            return (
              <InputNumber
                min={0}
                defaultValue={this.props.List[index].quantity}
                onChange={(value) => {
                  if (value != null) {
                    this.props.List[index].quantity = value;
                  }
                }}
              ></InputNumber>
            );
          } else {
            return formatter.format(this.props.List[index].quantity);
          }
        },
      },
      {
        title: "Price",
        key: "price",
        render: (text, record, index) => {
          if (
            this.props.List[index].received != 1 &&
            !this.props.details.is_received
          ) {
            return (
              <InputNumber
                min={0}
                defaultValue={this.props.List[index].price}
                onChange={(value) => {
                  if (value != null) {
                    this.props.List[index].price = value;
                  }
                }}
              ></InputNumber>
            );
          } else {
            return formatter.format(this.props.List[index].price);
          }
        },
      },

      {
        title: "Action",
        key: "quantity",
        align: "right",
        render: (text, record, index) => {
          if (
            this.props.List[index].received != 1 &&
            !this.props.details.is_received
          ) {
            return (
              <>
                <DeleteOutlined
                  style={{
                    color: "Red",
                    float: "right",
                    marginTop: "4px",
                  }}
                  onClick={(e) => {
                    let formData = new FormData();
                    let mainproduct =
                      this.props.List[index].Product[0].quantity -
                      this.props.List[index].quantity;
                    formData.append("quantity", mainproduct);
                    formData.append("data", "");
                    // updateVariation(item.Product[0].id, formData);
                    this.props
                      .deletePurchaseItem(this.props.List[index].id)
                      .then((rsult) => {
                        this.props.setloading(true);
                        this.props.setrefresh(!this.props.refresh);
                      });
                  }}
                />
              </>
            );
          } else {
            return <>Received</>;
          }
        },
      },
    ];
    return (
      <Table
        title={() => {
          if (
            this.state.selectedRowKeys.length > 0 &&
            !this.props.details.is_received
          ) {
            let result = [];
            result = this.props.List.filter((el) =>
              this.state.selectedRowKeys.includes(el.id)
            );
            return (
              <>
                <Button
                  type="primary"
                  // size="small"
                  onClick={() => {
                    let promises = [];
                    result.map((item) => {
                      let formData = new FormData();
                      formData.append(
                        "price",
                        parseFloat(item.price).toFixed(2)
                      );
                      formData.append("quantity", item.quantity);
                      formData.append("data", "");
                      promises.push(
                        this.props.updatePurchaseItem(item.id, formData)
                      );
                    });
                    Promise.all(promises).then((res) => {
                      this.props.setloading(true);
                      this.props.setrefresh(!this.props.refresh);
                    });
                  }}
                >
                  Update
                </Button>
                <Space style={{ float: "right" }}>
                  <InputNumber
                    placeholder="Total shipping cost for this LOT"
                    onChange={(value) => {
                      this.setState({ shippingcost: value });
                      //   console.log(this.state.shippingcost);
                    }}
                  />
                  <Button
                    style={{
                      backgroundColor: "lightgreen",
                      color: "black",
                    }}
                  >
                    <Popconfirm
                      title="Are you sure you have received all the products ?"
                      onConfirm={() => {
                        let promises = [];

                        let formData = new FormData();
                        let addition_landing_cost = 0;
                        let total_quantity = 0;
                        let total_receive = parseFloat(
                          this.props.Wallet.current.total_received_item_price
                        );

                        console.log("Previous received - " + total_receive);
                        let total_payment = parseFloat(
                          this.props.details.payment
                        );

                        let total_cost = 0;
                        for (let i = 0; i < result.length; i++) {
                          if (result[i].received != 1) {
                            total_quantity += parseFloat(result[i].quantity);
                            total_cost += parseFloat(
                              result[i].price * result[i].quantity
                            );
                          }
                        }
                        total_receive += parseFloat(total_cost);

                        if (total_quantity > 0) {
                          addition_landing_cost = parseFloat(
                            this.state.shippingcost / total_quantity
                          );
                        }
                        for (let i = 0; i < result.length; i++) {
                          if (result[i].received != 1) {
                            var newstock =
                              result[i].Product[0].quantity +
                              result[i].quantity;

                            formData = new FormData();
                            formData.append(
                              "purchase_price",
                              parseFloat(
                                parseFloat(result[i].price) +
                                  parseFloat(addition_landing_cost)
                              ).toFixed(2)
                            );

                            formData.append("quantity", newstock);
                            formData.append("data", "");
                            promises.push(
                              this.props.updateVariation(
                                result[i].Product[0].id,
                                formData
                              )
                            );
                          }
                        }

                        // journal entries

                        let journalformData = new FormData();
                        journalformData.append("voucher_type", "cash");
                        journalformData.append(
                          "contact",
                          this.props.details.contact.id
                        );
                        journalformData.append(
                          "purchasee",
                          this.props.details.id
                        );
                        journalformData.append("increase", true);
                        journalformData.append(
                          "location",
                          this.props.details.location
                        );
                        // shipping cost journal entry
                        if (this.state.shippingcost > 0) {
                          console.log(this.state.shippingcost);
                          journalformData.append(
                            "details",
                            "Partial shipping cost for purchase number " +
                              this.props.details.purchase_number
                          );
                          journalformData.append(
                            "amount",
                            parseFloat(this.state.shippingcost).toFixed(2)
                          );
                          journalformData.append("account", 1);
                          promises.push(
                            this.props
                              .getSpecificChartofaccountsbycode(400020010)
                              .then((res) => {
                                journalformData.append(
                                  "chartofaccount",
                                  res[0].id
                                );
                                promises.push(
                                  // shipping cost journal entry
                                  this.props
                                    .createjournals(journalformData)
                                    .then((res1) => {
                                      promises.push(
                                        this.props
                                          .getSpecificChartofaccountsbycode(
                                            100040
                                          )
                                          .then((res2) => {
                                            journalformData.append(
                                              "chartofaccount",
                                              res2[0].id
                                            );
                                            journalformData.append(
                                              "increase",
                                              false
                                            );
                                            promises.push(
                                              // Cash journal entry
                                              this.props.createjournals(
                                                journalformData
                                              )
                                            );
                                          })
                                      );
                                    })
                                );
                              })
                          );
                        }

                        // inventory journal entry
                        let formData2 = new FormData();

                        formData2.append("voucher_type", "cash");
                        formData2.append(
                          "contact",
                          this.props.details.contact.id
                        );
                        formData2.append("purchasee", this.props.details.id);
                        formData2.append("increase", true);
                        formData2.append(
                          "location",
                          this.props.details.location
                        );
                        // inventory journal entry
                        if (total_cost > 0) {
                          formData2.append(
                            "details",
                            "purchase number " +
                              this.props.details.purchase_number
                          );
                          formData2.append(
                            "amount",
                            parseFloat(total_cost).toFixed(2)
                          );
                          formData2.append("account", 1);
                          promises.push(
                            this.props
                              .getSpecificChartofaccountsbycode(1000100015)
                              .then((res) => {
                                formData2.append("chartofaccount", res[0].id);
                                promises.push(
                                  // inventory journal entry
                                  this.props.createjournals(formData2)
                                );
                              })
                          );
                        }

                        result.map((item) => {
                          formData = new FormData();
                          formData.append("data", "");
                          formData.append("received", 1);
                          promises.push(
                            this.props.updatePurchaseItem(item.id, formData)
                          );
                        });

                        //cash decrease
                        if (this.state.shippingcost > 0) {
                          let cashjournal = new FormData();
                          for (let i = 0; i < this.props.accounts.length; i++) {
                            if (this.props.accounts[i].type == "Cash") {
                              cashjournal.append(
                                "cash",
                                (
                                  this.props.accounts[i].cash -
                                  this.state.shippingcost
                                ).toFixed(2)
                              );
                              promises.push(
                                this.props.updateAccount(
                                  this.props.accounts[i].id,
                                  cashjournal
                                )
                              );
                            }
                          }
                        }

                        // accounts payable and receivable

                        let accountsjournal = new FormData();

                        accountsjournal.append("voucher_type", "cash");
                        accountsjournal.append(
                          "contact",
                          this.props.details.contact.id
                        );
                        accountsjournal.append(
                          "purchasee",
                          this.props.details.id
                        );

                        accountsjournal.append(
                          "location",
                          this.props.details.location
                        );
                        accountsjournal.append(
                          "details",
                          "purchase number " +
                            this.props.details.purchase_number
                        );
                        accountsjournal.append("account", 1);
                        console.log("totoal payment - " + total_payment);
                        console.log("totoal receive - " + total_receive);

                        if (total_payment >= total_receive) {
                          accountsjournal.append(
                            "amount",
                            parseFloat(total_cost).toFixed(2)
                          );
                          accountsjournal.append("increase", false);
                          //advance to supplier1 (-) total_cost

                          promises.push(
                            this.props
                              .getSpecificChartofaccountsbycode(100010003)
                              .then((res) => {
                                accountsjournal.append(
                                  "chartofaccount",
                                  res[0].id
                                );
                                promises.push(
                                  // inventory journal entry
                                  this.props.createjournals(accountsjournal)
                                );
                              })
                          );
                        } else {
                          let rest_amount = total_receive - total_payment;
                          console.log("rest amount - " + rest_amount);
                          console.log("Total cost - " + total_cost);

                          if (rest_amount > 0) {
                            let adjustment = rest_amount - total_cost;
                            console.log("Adjustment - " + adjustment);
                            if (adjustment > 0) {
                              //Accounts payable (+) - total cost
                              accountsjournal.append(
                                "amount",
                                parseFloat(total_cost).toFixed(2)
                              );
                              accountsjournal.append("increase", true);
                              promises.push(
                                this.props
                                  .getSpecificChartofaccountsbycode(200010011)
                                  .then((res) => {
                                    accountsjournal.append(
                                      "chartofaccount",
                                      res[0].id
                                    );
                                    promises.push(
                                      // inventory journal entry
                                      this.props.createjournals(accountsjournal)
                                    );
                                  })
                              );
                            } else {
                              // Advance to supplier (-) - adjustment

                              accountsjournal.append(
                                "amount",
                                parseFloat(Math.abs(adjustment)).toFixed(2)
                              );
                              accountsjournal.append("increase", false);
                              promises.push(
                                this.props
                                  .getSpecificChartofaccountsbycode(100010003)
                                  .then((res) => {
                                    accountsjournal.append(
                                      "chartofaccount",
                                      res[0].id
                                    );
                                    promises.push(
                                      // inventory journal entry
                                      this.props.createjournals(accountsjournal)
                                    );
                                  })
                              );

                              // Accounts payable (+) - (total_cost - adjustment)
                              let accountsjournal2 = new FormData();
                              accountsjournal2.append("voucher_type", "cash");
                              accountsjournal2.append(
                                "contact",
                                this.props.details.contact.id
                              );
                              accountsjournal2.append(
                                "purchasee",
                                this.props.details.id
                              );

                              accountsjournal2.append(
                                "location",
                                this.props.details.location
                              );
                              accountsjournal2.append(
                                "details",
                                "purchase number " +
                                  this.props.details.purchase_number
                              );
                              accountsjournal2.append("account", 1);
                              accountsjournal2.append(
                                "amount",
                                parseFloat(
                                  Math.abs(total_cost - Math.abs(adjustment))
                                ).toFixed(2)
                              );
                              accountsjournal2.append("increase", true);
                              promises.push(
                                this.props
                                  .getSpecificChartofaccountsbycode(200010011)
                                  .then((res) => {
                                    accountsjournal2.append(
                                      "chartofaccount",
                                      res[0].id
                                    );
                                    promises.push(
                                      // inventory journal entry
                                      this.props.createjournals(
                                        accountsjournal2
                                      )
                                    );
                                  })
                              );
                            }
                          }
                        }

                        Promise.all(promises).then((res) => {
                          this.props.setloading(true);
                          this.props.setrefresh(!this.props.refresh);
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Link to="#">Receive</Link>
                    </Popconfirm>
                  </Button>
                </Space>
              </>
            );
          }
        }}
        rowSelection={rowSelection}
        columns={columns}
        rowKey="id"
        dataSource={this.props.List}
        size="small"
        pagination={{
          defaultPageSize: 500,
        }}
      />
    );
  }
}

export default RenderTable;
