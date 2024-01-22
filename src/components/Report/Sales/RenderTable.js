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
    totalPage: this.props.List.count,
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
    if (isNaN(page_size) || page_size == undefined) {
      page = 1;
      page_size = this.props.List.count;
    }
    this.props.pageno.current = page;
    this.props.page_size.current = page_size;
    this.props.setreload(!this.props.reload);
    this.props.setloading(true);
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
          return (
            (this.props.pageno.current - 1) * this.props.page_size.current +
            index +
            1
          );
        },
      },
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
        title: "Method",
        dataIndex: "Payment_method",
        align: "center",
        key: "Payment_method",
        ...this.getColumnSearchProps("Payment_method"),
      },
      {
        title: "Remarks",
        // dataIndex: "remarks",
        key: "remarks",
        render: (details) => {
          return (
            <div
              className="d-div"
              dangerouslySetInnerHTML={{ __html: details.remarks }}
            ></div>
          );
        },
      },
      {
        title: "Discount",
        // dataIndex: "due",
        key: "discount",
        align: "right",
        render: (details) => {
          return formatter.format(details.discount);
        },
      },
      {
        title: "Bill",
        // dataIndex: "bill",
        key: "bill",
        align: "right",
        render: (details) => {
          return formatter.format(details.bill);
        },
      },
      {
        title: "Payment",
        // dataIndex: "payment",
        key: "payment",
        align: "right",
        render: (details) => {
          return formatter.format(details.payment);
        },
      },
      {
        title: "Due",
        // dataIndex: "due",
        key: "due",
        align: "right",
        render: (details) => {
          return formatter.format(details.due);
        },
      },
      {
        title: "VAT",
        // dataIndex: "due",
        key: "tax",
        align: "right",
        render: (details) => {
          return formatter.format(details.tax);
        },
      },

      // {
      //   title: "Courier",
      //   dataIndex: "DeliveryType",
      //   key: "DeliveryType",

      //   // ...this.getColumnSearchProps("DeliveryType"),
      // },
      {
        title: "Outlet",
        dataIndex: "Location_name",
        key: "Location_name",
        // ...this.getColumnSearchProps("Location_name"),
      },
      // {
      //   title: "Contact",
      //   dataIndex: "",
      //   key: "x",
      //   render: (details) => {
      //     return details.Contact[0].name;
      //   },
      // },

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
    let page_sizes = [10, 20, 50, 100, 500, 1000, 5000, 10000];
    let page_size_opt = [];
    for (let i = 0; i < page_sizes.length; i++) {
      if (page_sizes[i] < this.props.List.count)
        page_size_opt.push(page_sizes[i]);
    }
    page_size_opt.push(this.props.List.count);
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.props.List.results}
        size="small"
        pagination={{
          defaultPageSize: this.props.page_size.current,
          current: this.state.current,
          total: this.props.List.count,
          pageSizeOptions: page_size_opt,
          showSizeChanger: true,
          onChange: this.handleChange,
        }}
        summary={(pageData) => {
          let total_data = this.props.total_data.current;
          return (
            <>
              {/* <Table.Summary.Row>
                <Table.Summary.Cell colSpan={5}>
                  <b>Total For Page</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>
                      {formatter.format(total_data["current_page_discount"])}
                    </b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["current_page_sales"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>
                      {formatter.format(total_data["current_page_payment"])}
                    </b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["current_page_due"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["current_page_tax"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
              </Table.Summary.Row> */}
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={6}>
                  <b>Total</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_discount"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_sales"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_payment"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_due"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_tax"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
        expandable={{
          expandedRowRender: (record) => {
            return <ServiceView id={record.id} />;
          },
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
