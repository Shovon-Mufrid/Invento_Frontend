import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import ContactDetails from "./ContactDetails";
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        // width: "20%",
        ...this.getColumnSearchProps("name"),
      },

      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        ...this.getColumnSearchProps("phone"),
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        // width: "20%",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Type",
        dataIndex: "Role",
        key: "Role",
        ...this.getColumnSearchProps("Role"),
      },
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
            |{" "}
            <History
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              updatelist={this.props.updatelist}
              // key={details.id}
            />
          </>
        ),
      },
    ];
    return (
      <Table
        title={() => (
          <Export
            data={this.props.List}
            selectedkeys={this.state.selectedRowKeys}
          />
        )}
        rowSelection={rowSelection}
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
