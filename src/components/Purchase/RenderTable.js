import React from "react";
import { Table, Input, Button, Space, Image, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Quickview from "./Quickview";
import Update from "./Update";
import Printvoucher from "./PrintVoucher";
import { connect } from "react-redux";

const { Text } = Typography;
var formatter = new Intl.NumberFormat("en-IN");
class RenderTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    totalPage: this.props.details.count,
    current: this.props.pageno.current,
    minIndex: 0,
    maxIndex: 0,
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
  selectproduct = () => {
    this.props.setselectedproduct(true, this.props.List);
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = (page, page_size) => {
    this.props.pageno.current = page;
    this.props.page_size.current = page_size;
    this.props.setreload(!this.props.reload);
    this.setState({
      current: page,
      minIndex: (page - 1) * this.props.page_size.current,
      maxIndex: page * this.props.page_size.current,
    });
  };

  render() {
    const columns = [
      {
        title: "SL",
        key: "index",
        render: (value, item, index) => {
          return this.state.current > 1
            ? this.state.current * 10 + index + 1
            : index + 1;
        },
      },
      {
        title: "Issued Date",
        dataIndex: "issue_date",
        key: "issue_date",
        ...this.getColumnSearchProps("issue_date"),
      },
      {
        title: "PO No.",
        dataIndex: "purchase_number",
        key: "purchase_number",
        ...this.getColumnSearchProps("purchase_number"),
      },
      {
        title: "Reference",
        dataIndex: "reference",
        key: "reference",
        ...this.getColumnSearchProps("reference"),
      },
      {
        title: "Products",
        // dataIndex: "quantity",
        key: "quantity",
        align: "right",
        render: (details) => {
          let result = "";
          if (details.received_item > 0) {
            result += "Received - " + formatter.format(details.received_item);
          }
          if (details.received_item < details.quantity) {
            result +=
              " Pending - " +
              formatter.format(details.quantity - details.received_item);
          }
          return result;
        },
      },

      {
        title: "Total Bill",
        // dataIndex: "bill",
        align: "right",
        key: "bill",
        render: (details) => {
          return formatter.format(details.bill);
        },
      },
      {
        title: "Payment",
        // dataIndex: "bill",
        align: "right",
        key: "payment",
        render: (details) => {
          return formatter.format(details.payment);
        },
      },
      {
        title: "Due",
        // dataIndex: "bill",
        align: "right",
        key: "due",
        render: (details) => {
          return formatter.format(details.due);
        },
      },

      {
        title: "Discount",
        // dataIndex: "bill",
        align: "right",
        key: "discount",
        render: (details) => {
          return formatter.format(details.discount);
        },
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "right",
        ...this.getColumnSearchProps("status"),
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "22%",
        render: (details) => {
          return (
            <>
              {this.props.auth.permissions.includes(
                "Inventory Purchase.All purchase_is_update"
              ) ? (
                <Update invoice={details} />
              ) : (
                ""
              )}
              |
              <Quickview details={details} />
              | <Printvoucher details={details} />
              {/* {!details.is_received ? (
                <>
                  | <CancelOrder details={details} />
                </>
              ) : (
                ""
              )} */}
            </>
          );
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.props.details.results}
        size="small"
        pagination={{
          defaultPageSize: this.props.page_size.current,
          current: this.state.current,
          total: this.props.details.count,
          onChange: this.handleChange,
        }}
        rowClassName={(details, index) => {
          if (details.quantity - details.received_item != 0) {
            return "rtable table_yellow";
          } else if (details.due > 0) {
            return "rtable table_red";
          } else {
            return "rtable table_light_green";
          }
        }}
        summary={(pageData) => {
          let totalbill = 0;
          let totalpayment = 0;
          let totaldue = 0;

          pageData.forEach(({ bill, payment, due }) => {
            totalbill += parseFloat(bill);
            totalpayment += parseFloat(payment);
            totaldue += parseFloat(due);
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={5}>
                  <b>Total</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(totalbill)}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell
                  className="ant_right"
                  colSpan={3}
                ></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(RenderTable);
