import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import LoanDetails from "./LoanDetails";
import PrintVoucher from "./PrintVoucher";

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
        key: "id",
        // width: "20%",
        // ...this.getColumnSearchProps("id"),
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
        title: "Type",
        // dataIndex: "loanType",
        key: "loanType",
        ...this.getColumnSearchProps("loanType"),
        render: (details) => {
          if (details.loanType == "emi") {
            return "EMI";
          } else {
            return "Advance";
          }
        },
      },
      {
        title: "Application Status",
        dataIndex: "loanStatus",
        key: "loanStatus",
        ...this.getColumnSearchProps("loanStatus"),
      },
      {
        title: "Loan Amount",
        dataIndex: "loanAmount",
        key: "loanAmount",
      },
      {
        title: "Collected Amount",
        // dataIndex: "total_paid",
        key: "total_paid",
        render: (details) => {
          if (details.loanStatus == "denied") {
            return "-";
          } else {
            return details.total_paid;
          }
        },
      },
      {
        title: "Due Amount",
        // dataIndex: "total_due_payment",
        key: "total_due_payment",
        render: (details) => {
          if (details.loanStatus != "paid") {
            return "-";
          } else {
            return details.total_due_payment;
          }
        },
      },
      {
        title: "Payable/Month",
        // dataIndex: "loanPayableAmount",
        key: "loanPayableAmount",
        render: (details) => {
          if (details.loanStatus == "denied") {
            return "-";
          } else {
            return details.loanPayableAmount;
          }
        },
      },
      {
        title: "Loan Payable Months",
        // dataIndex: "loanPayableMonths",
        key: "loanPayableMonths",
        render: (details) => {
          if (details.loanStatus == "denied") {
            return "-";
          } else {
            return details.loanPayableMonths;
          }
        },
      },

      // {
      //   title: "Note",
      //   dataIndex: "note",
      //   key: "note",
      // },

      {
        title: "Loan Status",
        // dataIndex: "loanPaymentStatus",
        key: "loanPaymentStatus",
        render: (details) => {
          if (details.loanStatus != "paid") {
            return "-";
          } else {
            return details.loanPaymentStatus;
          }
        },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (details) => (
          <>
            {" "}
            <LoanDetails
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              updatelist={this.props.updatelist}
              key="x"
            />{" "}
            {details.loanStatus == "paid" ? (
              <>
                | <PrintVoucher details={details} key="x" />
              </>
            ) : (
              ""
            )}
          </>
        ),
      },
    ];
    return <Table columns={columns} dataSource={this.props.List} />;
  }
}

export default Rendertable;
