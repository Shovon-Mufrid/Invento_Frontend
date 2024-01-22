import React from "react";
import { Table, Input, Button, Space, Image, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Quickview from "./Quickview";
import Update from "./neworder/update/Update";
// import Update from "./Update";
import CancelOrder from "./CancelOrder";
import Exchange from "./Exchange";
import EditMeasurement from "./EditMeasurement";
import ServiceView from "./ServiceView";
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
        title: "Invoice No.",
        dataIndex: "invoice_number",
        key: "invoice_number",
      },
      {
        title: "Order No.",
        dataIndex: "order_number",
        key: "order_number",
      },
      {
        title: "Contact",
        dataIndex: "",
        key: "x",
        render: (details) => {
          if (details.contact) {
            return details.Contact[0].name;
          }
        },
      },

      // {
      //   title: "Payment",
      //   dataIndex: "payment",
      //   key: "payment",
      // },
      // {
      //   title: "Due",
      //   dataIndex: "due",
      //   key: "due",
      // },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },

      {
        title: "Location",
        dataIndex: "Location_name",
        key: "Location_name",
      },
      {
        title: "Issued Date",
        dataIndex: "issue_date",
        key: "issue_date",
      },
      {
        title: "Delivery Date",
        dataIndex: "delivery_date",
        key: "delivery_date",
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
        title: "Action",
        dataIndex: "",
        key: "x",
        align: "center",
        // width: "22%",
        render: (details) => {
          return (
            <>
              {/* <a style={{ margin: 4 }} href={"/product/image/" + details.id}>
                Images
              </a>
              |
              <SingleProductDetailsTable
                setUpdatelist={this.props.setUpdatelist}
                details={details}
              />{" "} */}
              <Update invoice={details} />
              {""}|{""}
              <Quickview details={details} />
              {/* {""}|{""}
              <CancelOrder details={details} /> */}
              {/* <EditMeasurement details={details} /> */}
              {/* <Exchange invoice={details} /> */}
            </>
          );
        },
      },
    ];
    let page_sizes = [5, 10, 20, 50, 100, 500, 1000, 5000, 10000];
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
        expandable={{
          expandedRowRender: (record) => {
            return <ServiceView id={record.id} />;
          },
        }}
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
