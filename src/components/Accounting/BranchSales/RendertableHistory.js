import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import dateFormat from "dateformat";
import { SearchOutlined } from "@ant-design/icons";
import PrintVoucher from "./Printvoucher";

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
        title: "SL",
        key: "index",
        render: (value, item, index) => {
          return index + 1;
        },
      },
      {
        title: "Transfer Type",
        render: (value, item, index) => {
          return item.add_cash ? "Add Cash" : "Collect Cash";
        },
      },
      {
        title: "Outlet",
        dataIndex: "Location_name",
        key: "Location_name",
        // width: "20%",
      },
      // {
      //   title: "Account",
      //   dataIndex: "Account_name",
      //   key: "Account_name",
      // },
      {
        title: "Cash",
        dataIndex: "cash_amount",
        key: "cash_amount",
      },
      {
        title: "Petty Cash",
        dataIndex: "pett_cash_amount",
        key: "pett_cash_amount",
      },
      {
        title: "Created at",
        // dataIndex: "updated_at",
        key: "created",
        ...this.getColumnSearchProps("created"),
        render: (details) => {
          return dateFormat(details.created, "yyyy-mm-dd");
        },
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",

        render: (details) => (
          <>
            <PrintVoucher details={details} />
          </>
        ),
      },
    ];
    return <Table columns={columns} dataSource={this.props.List} />;
  }
}

export default Rendertable;
