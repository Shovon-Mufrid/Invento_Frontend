import React from "react";
import { Table, Input, Button, Space, Image } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import Invoice from "./Invoice";
import Update from "./Update";
class RenderTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
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
      {
        title: "SL",
        key: "index",
        render: (value, item, index) => {
          return index + 1;
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
          console.log(details);
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
              <Update
                id={details.id}
                setloadServicepage={this.props.setloadServicepage}
              />
              | <Invoice id={details.invoice_id} />
            </>
          );
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.props.List}
        size="small"
        pagination={{
          defaultPageSize: 100,
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

export default RenderTable;
