import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import WarehouseDetails from "./Collect";
import Add from "./Add";
import History from "./history";

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
        title: "Name",
        dataIndex: "name",
        key: "name",
        // width: "20%",
        ...this.getColumnSearchProps("name"),
      },

      // {
      //   title: "Address",
      //   dataIndex: "",
      //   key: "x",
      //   render: (details) => {
      //     return (
      //       <div
      //         className="d-div"
      //         dangerouslySetInnerHTML={{ __html: details.address }}
      //       ></div>
      //     );
      //   },
      // },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        // width: "30%",
        ...this.getColumnSearchProps("contact"),
      },
      {
        title: "Cash on hand",
        // dataIndex: "x",
        key: "cash",

        render: (details) => {
          if (details.is_outlet) {
            return details.cash;
          }
        },
      },
      {
        title: "Petty cash",
        dataIndex: "petty_cash",
        key: "petty_cash",
        // width: "20%",
        // ...this.getColumnSearchProps("contact"),
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "30%",
        align: "center",
        render: (details) => (
          <>
            <WarehouseDetails
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              key="x"
            />
            {"|"}
            <Add
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              key="x"
            />
            {"|"}
            <History
              details={details}
              updatelist={this.props.updatelist}
              setUpdatelist={this.props.setUpdatelist}
              key="x"
            />
          </>
        ),
      },
    ];
    return <Table columns={columns} dataSource={this.props.List} />;
  }
}

export default Rendertable;
