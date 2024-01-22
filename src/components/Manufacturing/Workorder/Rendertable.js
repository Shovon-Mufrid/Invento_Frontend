import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

import ContactDetails from "./Details";
import History from "./History";
import Export from "../Options/Excellfromdatatable";

class Rendertable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
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

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
      // {
      //   title: "SL",
      //   key: "index",
      //   render: (value, item, index) => {
      //     return index + 1;
      //   },
      // },
      {
        title: "Order",
        dataIndex: "order_name",
        key: "order_name",
        // width: "20%",
        ...this.getColumnSearchProps("order_name"),
      },

      {
        title: "Order No.",
        dataIndex: "order_number",
        key: "order_number",
        ...this.getColumnSearchProps("order_number"),
      },
      {
        title: "Start",
        dataIndex: "",
        key: "x",
        render: (details) => (
          <>{moment(details.start_date).format("DD-MM-YYYY")}</>
        ),
      },
      {
        title: "End",
        dataIndex: "",
        key: "x",
        render: (details) => (
          <>{moment(details.end_date).format("DD-MM-YYYY")}</>
        ),
      },
      {
        title: "Total Need",
        dataIndex: "quantity_needed",
        key: "quantity_needed",
      },
      {
        title: "Pending",
        dataIndex: "quantity_pending",
        key: "quantity_pending",
      },
      {
        title: "Complete",
        dataIndex: "quantity_complete",
        key: "quantity_complete",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      // {
      //   title: "Email",
      //   dataIndex: "email",
      //   key: "email",
      //   // width: "20%",
      //   ...this.getColumnSearchProps("email"),
      // },
      // {
      //   title: "Type",
      //   dataIndex: "Role",
      //   key: "Role",
      //   ...this.getColumnSearchProps("Role"),
      // },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "10%",
        render: (details) => (
          <>
            <ContactDetails
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              updatelist={this.props.updatelist}
              // key={details.id}
            />{" "}
            {/* <History
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              updatelist={this.props.updatelist}
              // key={details.id}
            /> */}
          </>
        ),
      },
    ];
    return (
      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={this.props.List}
        size="small"
        pagination={{
          defaultPageSize: 100,
        }}
      />
      // <></>
    );
  }
}

export default Rendertable;
