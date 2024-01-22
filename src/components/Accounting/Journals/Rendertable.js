import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import dateFormat from "dateformat";
import { SearchOutlined } from "@ant-design/icons";

class Rendertable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
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

  handleChange = (page, page_size) => {
    this.props.pageno.current = page;
    this.props.page_size.current = page_size;
    this.setState({
      current: page,
      minIndex: (page - 1) * this.props.page_size.current,
      maxIndex: page * this.props.page_size.current,
    });
    // this.props.setloading(true);
    this.props.setreload(!this.props.reload);
  };
  render() {
    const columns = [
      // {
      //   title: "SL",
      //   key: "index",
      //   render: (value, item, index) => {
      //     return this.state.current > 1
      //       ? this.state.current * 10 + index + 1
      //       : index + 1;
      //   },
      // },
      {
        title: "ID",
        key: "index",
        dataIndex: "id",
      },
      {
        title: "Details",
        dataIndex: "details",
        key: "details",
        // width: "20%",
      },
      {
        title: "Group",
        dataIndex: "Group",
        key: "Group",
        // width: "20%",
        ...this.getColumnSearchProps("Group"),
      },
      {
        title: "Sub Group",
        dataIndex: "Subgroup",
        key: "Subgroup",
        // width: "20%",
        ...this.getColumnSearchProps("Subgroup"),
      },

      {
        title: "Debit",
        key: "type",
        render: (details) => {
          if (details.type == "Debit") return details.amount;
        },
      },
      {
        title: "Credit",
        key: "type",
        render: (details) => {
          if (details.type != "Debit") return details.amount;
        },
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

      // {
      //   title: "Amount",
      //   dataIndex: "amount",
      //   key: "amount",
      // },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.props.List.results}
        pagination={{
          defaultPageSize: this.props.page_size.current,
          current: this.state.current,
          total: this.props.List.count,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

export default Rendertable;
