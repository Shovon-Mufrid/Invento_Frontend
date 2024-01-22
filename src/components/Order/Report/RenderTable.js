import React from "react";
import { Table, Input, Button, Space, Image, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
// import AttributeDetails from "./AttributeDetails";
// import Quickview from "./Quickview";
// import SingleProductDetailsTable from "./SingleProductDetailsTable";
import Quickview from "./Quickview";
import ServiceView from "./ServiceView";
const { Text } = Typography;
var formatter = new Intl.NumberFormat("en-IN");

class RenderTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    page: 1,
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

  render() {
    const columns = [
      // {
      //   title: "SL",
      //   key: "index",
      //   render: (value, item, index) => {
      //     return (this.state.page - 1) * 10 + index + 1;
      //   },
      // },
      {
        title: "Date",
        dataIndex: "issue_date",
        key: "issue_date",
        ...this.getColumnSearchProps("issue_date"),
      },

      {
        title: "Invoice No.",
        dataIndex: "invoice_number",
        key: "invoice_number",
        ...this.getColumnSearchProps("invoice_number"),
      },
      {
        title: "Contact",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return details.Contact[0].name;
        },
      },
      {
        title: "Total bill (BDT)",
        // dataIndex: "bill",
        align: "right",
        key: "bill",
        render: (details) => {
          return formatter.format(details.bill);
        },
      },
      {
        title: "Total payment (BDT)",
        // dataIndex: "payment",
        key: "payment",
        align: "right",
        render: (details) => {
          return formatter.format(details.payment);
        },
      },
      {
        title: "Due (BDT)",
        // dataIndex: "due",
        key: "due",
        align: "right",
        render: (details) => {
          return formatter.format(details.due);
        },
      },
      {
        title: "Payment Method",
        dataIndex: "Payment_method",
        align: "center",
        key: "Payment_method",
        ...this.getColumnSearchProps("Payment_method"),
      },
      {
        title: "Outlet",
        dataIndex: "Location_name",
        key: "Location_name",
        ...this.getColumnSearchProps("Location_name"),
      },
      {
        title: "Delivery Date",
        dataIndex: "delivery_date",
        key: "delivery_date",
        ...this.getColumnSearchProps("delivery_date"),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return (
            <>
              <Quickview details={details} key="x" />
            </>
          );
        },
      },
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.props.List}
        expandable={{
          expandedRowRender: (record) => {
            return <ServiceView id={record.id} />;
          },
        }}
        size="small"
        pagination={{
          defaultPageSize: 100,
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
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(totalpayment)}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(totaldue)}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
        rowClassName={(details, index) => {
          if (details.status == "Pending") {
            return "rtable table_yellow";
          } else if (details.status == "Ready") {
            return "rtable table_light_green";
          } else if (details.status == "Delivered") {
            return "rtable table_sky";
          } else if (details.status == "Booked") {
            return "rtable table_green";
          } else if (details.status == "Exchanged") {
            return "rtable table_gray";
          } else if (details.status == "Factory Received") {
            return "rtable table_purple";
          } else if (details.status == "Outlet received") {
            return "rtable table_dark_Purple";
          } else if (details.status == "Cancelled") {
            return "rtable table_Cancelled";
          } else if (details.status == "Paid") {
            return "rtable table_light_red";
          } else if (details.status == "Picked by courier") {
            return "rtable table_light_yellow";
          }
        }}
      />
    );
  }
}

export default RenderTable;
