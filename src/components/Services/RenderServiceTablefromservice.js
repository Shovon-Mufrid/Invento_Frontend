import React from "react";
import { Table, Input, Button, Space, Image } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import Invoice from "./Invoice";
import Update from "./Updatefromservice";
import { connect } from "react-redux";

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
    this.props.setloadServicepage(!this.props.loadServicepage);
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
          return this.state.current > 1
            ? this.state.current * 10 + index + 1
            : index + 1;
        },
      },
      {
        title: "Invoice No.",
        dataIndex: "invoice_number",
        key: "invoice_number",
        ...this.getColumnSearchProps("invoice_number"),
      },

      {
        title: "Details",
        dataIndex: "",
        key: "x",
        ...this.getColumnSearchProps("details"),
        render: (details) => {
          return (
            <>
              <div
                className="d-div"
                dangerouslySetInnerHTML={{ __html: details.details }}
              ></div>
            </>
          );
        },
      },
      // {
      //   title: "Time left",
      //   dataIndex: "",
      //   key: "x",

      //   render: (details) => {
      //     var today = new Date();
      //     var date =
      //       today.getFullYear() +
      //       "-" +
      //       (today.getMonth() + 1) +
      //       "-" +
      //       today.getDate();
      //     const date1 = new Date(date);
      //     const date2 = new Date(details.delivery_date);
      //     const diffTime = date2 - date1;
      //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //     if (diffDays >= 0) {
      //       return <>{diffDays} days</>;
      //     } else {
      //       if (details.status != "Delivered")
      //         return (
      //           <>
      //             <span style={{ color: "red" }}>Due date</span>
      //           </>
      //         );
      //       else return <> - </>;
      //     }
      //   },
      // },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
      },

      {
        title: "Delivery Date",
        dataIndex: "delivery_date",
        key: "delivery_date",
        ...this.getColumnSearchProps("delivery_date"),
      },
      {
        title: "Last update",
        // dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
        render: (details) => {
          return dateFormat(details.updated_at, "yyyy-mm-dd");
        },
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "18%",
        render: (details) => {
          // console.log(details);
          return (
            <>
              {this.props.auth.permissions.includes(
                "Sales.All Services_is_update"
              ) ? (
                <Update
                  id={details.id}
                  setloadServicepage={this.props.setloadServicepage}
                />
              ) : (
                ""
              )}
              | <Invoice id={details.invoice_id} />
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
        style={{
          margin: "8px 0px 8px -15px",
        }}
        rowClassName={(details, index) => {
          if (details.status == "Pending") {
            return "rtable table_yellow";
          } else if (details.status == "Factory Received") {
            return "rtable table_purple";
          } else if (details.status == "Ready (QC checked)") {
            return "rtable table_light_green";
          } else if (details.status == "Outlet Delivered") {
            return "rtable table_sky";
          } else if (details.status == "Partially Ready") {
            return "rtable table_green";
          } else if (details.status == "Processing") {
            return "rtable table_purple";
          } else if (details.status == "On Hold") {
            return "rtable table_gray";
          }
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
