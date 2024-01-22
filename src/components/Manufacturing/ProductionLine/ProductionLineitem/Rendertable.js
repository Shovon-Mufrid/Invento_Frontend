import React from "react";
import { Table, Input, Button, Space, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

import { deleteproductionlinesitem } from "../../../../actions/Manufacturing/productionlinesitemAction";

import ContactDetails from "./Details";
import History from "./History";
import Export from "../../Options/Excellfromdatatable";
import Edit from "./Edit";
import Costing from "./Costing";

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

  confirm = (id) => {
    deleteproductionlinesitem(id).then((rs) => {
      this.props.setUpdatelist(!this.props.updatelist);
      message.success("Removed");
    });
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
      // {
      //   title: "Workorder Name",
      //   dataIndex: "workorder_name",
      //   key: "workorder_name",
      //   // width: "20%",
      //   ...this.getColumnSearchProps("workorder_name"),
      // },

      {
        title: "Workorder description",
        dataIndex: "",
        key: "x",
        render: (details) => {
          return details.workorder_item.description;
        },
      },
      {
        title: "Start",
        dataIndex: "",
        key: "x",
        render: (details) => (
          <>
            {moment(details.start_date).format("DD-MM-YYYY")}
            {console.log(details)}
          </>
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
        title: "Capacity",
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        // width: "20%",
        render: (details) => (
          <>
            <Edit
              details={details}
              setUpdatelist={this.props.setUpdatelist}
              updatelist={this.props.updatelist}
              // key={details.id}
            />{" "}
            |
            <Costing
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
