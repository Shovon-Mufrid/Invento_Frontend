import React, { useRef } from "react";
import {
  Table,
  Input,
  TimePicker,
  InputNumber,
  Checkbox,
  Button,
  Space,
  message,
  Select,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

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
      <div style={{ padding: 4, marginTop: -140 }}>
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
    const employeeSalarylist = [...this.props.List];
    // const details = [...this.props.details];

    const { Option } = Select;

    // console.log("report render table");
    // console.log(employeeSalarylist);

    const columns = [
      // {
      //   title: 'SL.',
      //   key: 'index',
      //   render :(text, record, index) => index+1,
      // },

      {
        title: "ID",
        key: "id",
        render: (text, record, index) => 1000 + text["id"],
      },
      {
        title: "Name",
        dataIndex: "employeeName",
        key: "employeeName",
        ...this.getColumnSearchProps("employeeName"),
      },
      {
        title: "Department",
        dataIndex: "employeeDepartment",
        key: "employeeDepartment",
        ...this.getColumnSearchProps("employeeDepartment"),
      },
      {
        title: "Present",
        dataIndex: "present",
        key: "present",
      },
      {
        title: "Absent",
        dataIndex: "absent",
        key: "absent",
      },
      {
        title: "Leave",
        dataIndex: "leave",
        key: "leave",
      },
      {
        title: "Overtime",
        dataIndex: "overtimeTotal",
        key: "overtimeTotal",
      },
      {
        title: "Late",
        dataIndex: "late",
        key: "late",
      },
      {
        title: "Fine",
        dataIndex: "fine",
        key: "fine",
      },

      {
        title: "Loan",
        dataIndex: "loan_adjustment",
        key: "loan_adjustment",
      },
      {
        title: "Advance",
        dataIndex: "advance_adjustment",
        key: "advance_adjustment",
      },
      {
        title: "Allowance",
        dataIndex: "dailyAllowanceTotal",
        key: "dailyAllowanceTotal",
      },

      {
        title: "Incentive",
        dataIndex: "incentiveTotal",
        key: "incentiveTotal",
      },
      {
        title: "Paid Salary",
        dataIndex: "net_salary",
        key: "net_salary",
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={employeeSalarylist} size="small" />
      </div>
    );
  }
}

export default Rendertable;
