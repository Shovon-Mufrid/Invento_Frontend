import React from "react";
import { Table, Input, Button, Space, Image, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
// import AttributeDetails from "./AttributeDetails";
// import Quickview from "./Quickview";
// import SingleProductDetailsTable from "./SingleProductDetailsTable";
import Quickview from "./Quickview";

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

  handleChange = (page, page_size) => {
    if (isNaN(page_size) || page_size == undefined) {
      page = 1;
      page_size = this.props.List.count;
    }
    console.log(page);
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
    // const renderBody = (props, columns) => {
    //   return (
    //     <tr className={props.className}>
    //       {columns.map((item, idx) => {
    //         console.log(item);
    //         if (
    //           item.Status == "Delivered" ||
    //           item.Status == "Picked by courier" ||
    //           item.Status == "Paid"
    //         ) {
    //           return props.children[idx];
    //         }
    //       })}
    //     </tr>
    //   );
    // };

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
      // {
      //   title: "Date",
      //   dataIndex: "issue_date",
      //   key: "issue_date",
      //   ...this.getColumnSearchProps("issue_date"),
      // },
      {
        title: "Delivery date",
        dataIndex: "delivery_date",
        key: "delivery_date",
        ...this.getColumnSearchProps("delivery_date"),
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
        title: "Phone",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return details.Contact[0].phone;
        },
      },
      // {
      //   title: "Payment Method",
      //   dataIndex: "Payment_method",
      //   key: "Payment_method",
      //   ...this.getColumnSearchProps("Payment_method"),
      // },

      {
        title: "Outlet",
        dataIndex: "Location_name",
        key: "Location_name",
        ...this.getColumnSearchProps("Location_name"),
      },
      {
        title: "Courier",
        dataIndex: "DeliveryTypeName",
        key: "DeliveryTypeName",

        ...this.getColumnSearchProps("DeliveryTypeName"),
      },
      {
        title: "Total bill",
        // dataIndex: "bill",
        align: "right",
        key: "bill",
        render: (details) => {
          return formatter.format(details.bill);
        },
      },
      {
        title: "Due",
        // dataIndex: "due",
        align: "right",
        key: "due",
        render: (details) => {
          return formatter.format(details.due);
        },
      },

      {
        title: "Delivery Charge",
        // dataIndex: "delivery_charge",
        key: "delivery_charge",
        align: "right",
        render: (details) => {
          return formatter.format(details.delivery_charge);
        },
      },
      {
        title: "Delivery Cost",
        // dataIndex: "delivery_cost",
        key: "delivery_cost",
        align: "right",
        render: (details) => {
          return formatter.format(details.delivery_cost);
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
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
    let page_sizes = [10, 20, 50, 100, 500, 1000, 5000, 10000];
    let page_size_opt = [];
    for (let i = 0; i < page_sizes.length; i++) {
      if (page_sizes[i] < this.props.List.count)
        page_size_opt.push(page_sizes[i]);
    }
    page_size_opt.push(this.props.List.count);
    return (
      <Table
        columns={columns}
        rowKey="id"
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
