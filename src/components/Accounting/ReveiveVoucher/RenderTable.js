import React from "react";
import { Table, Input, Button, Space, Image, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Printvoucher from "./Printvoucher";
import Quickview from "./Quickview";
import dateFormat from "dateformat";

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
        title: "Voucher number",
        dataIndex: "voucher_number",
        key: "voucher_number",
        ...this.getColumnSearchProps("voucher_number"),
      },

      {
        title: "Issued Date",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return dateFormat(details.created, "yyyy-mm-dd");
        },
      },

      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },

      {
        title: "Location",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return details.location != null ? details.Location[0].name : " ";
        },
      },
      {
        title: "Created By",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return details.employee != null ? details.Employee[0].name : " ";
        },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return <Printvoucher details={details} />;
        },
      },
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.props.List}
        expandable={{
          expandedRowRender: (record) => {
            return (
              // <p style={{ margin: 0 }}>{record.voucher_number}</p>
              <Quickview id={record.id} />
            );
          },
          // rowExpandable: (record) => record.id !== "Not Expandable",
        }}
      />
    );
  }
}

export default RenderTable;
