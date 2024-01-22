import React from "react";

import { Table, Input, Button, Space, Image, Popconfirm, Tag } from "antd";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Quickview from "./Quickview";
import Update from "./Update";
import Cancel from "./Cancel";
import { connect } from "react-redux";

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
      // {
      //   title: "SL",
      //   key: "index",
      //   render: (value, item, index) => {
      //     return index + 1;
      //   },
      // },
      {
        title: "Issued Date",
        dataIndex: "issue_date",
        key: "issue_date",
        ...this.getColumnSearchProps("issue_date"),
      },
      {
        title: "Challan No.",
        dataIndex: "tansfer_number",
        key: "tansfer_number",
        ...this.getColumnSearchProps("tansfer_number"),
      },

      {
        title: "From",
        dataIndex: "",
        key: "",
        ...this.getColumnSearchProps("source"),
        render: (details) => {
          return details.source ? details.Source[0].name : "";
        },
      },
      {
        title: "To",
        dataIndex: "",
        key: "destance",
        ...this.getColumnSearchProps("destance"),
        render: (details) => {
          return details.destance ? details.Destance[0].name : "";
        },
      },
      {
        title: "Status",
        dataIndex: "",
        key: "status",
        ...this.getColumnSearchProps("status"),
        render: (details) => {
          if (details.status == "Received") {
            return (
              <>
                <Tag color="green" key={details.id}>
                  {details.status.toUpperCase()}
                </Tag>
              </>
            );
          } else if (details.status == "Processing") {
            return (
              <>
                <Tag color="red" key={details.id}>
                  {details.status.toUpperCase()}
                </Tag>
              </>
            );
          }
        },
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "22%",
        render: (details) => {
          return (
            <>
              {this.props.auth.permissions.includes(
                "Stock.Transfer History_is_update"
              ) ? (
                <Update wordrobe={details} />
              ) : (
                ""
              )}
              |
              <Quickview details={details} /> |
              {this.props.auth.permissions.includes(
                "Stock.Transfer History_is_delete"
              ) ? (
                details.status != "Received" ? (
                  <Cancel details={details} />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          );
        },
      },
    ];
    // console.log(this.props.Auth);
    return (
      <Table
        columns={columns}
        // dataSource={this.props.details}
        dataSource={this.props.details.filter(
          (el) =>
            el.source == this.props.Auth.profile.Office ||
            el.destance == this.props.Auth.profile.Office ||
            this.props.Auth.superuser
        )}
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
