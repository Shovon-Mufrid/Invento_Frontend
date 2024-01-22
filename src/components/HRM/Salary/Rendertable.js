import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import EmployeeSalaryDetails from "./EmployeeSalaryDetails";

class Rendertable extends React.Component {
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "SL.",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "ID",
        key: "employeeId",
        // width: "20%",
        // ...this.getColumnSearchProps("employeeId"),
        render: (text, record, index) => 1000 + text["employeeId"],
      },
      {
        title: "Employee",
        dataIndex: "employeeName",
        key: "employeeName",
        // width: "20%",
        ...this.getColumnSearchProps("employeeName"),
      },
      {
        title: "Role",
        dataIndex: "employeeRole",
        key: "employeeRole",
        // width: "20%",
        ...this.getColumnSearchProps("employeeRole"),
      },

      {
        title: "Basic Salary",
        dataIndex: "monthlySalary",
        key: "monthlySalary",
      },
      {
        title: "Daily Allowance",
        dataIndex: "dailyAllowance",
        key: "dailyAllowance",
      },
      {
        title: "Wage/Hour",
        dataIndex: "perHourWageDay",
        key: "perHourWageDay",
      },
      {
        title: "Incentive",
        dataIndex: "incentive",
        key: "incentive",
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (details) => (
          <EmployeeSalaryDetails
            details={details}
            setUpdatelist={this.props.setUpdatelist}
            key="x"
          />
        ),
      },
    ];
    // console.log(this.props.List);
    return <Table columns={columns} dataSource={this.props.List} />;
  }
}

export default Rendertable;
