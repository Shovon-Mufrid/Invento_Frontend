import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import EmployeeDetails from "./EmployeeDetails";
import EditEmployee from "./EditEmployee";

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
        title: "Id",
        key: "id",
        // width: "20%",
        ...this.getColumnSearchProps("id"),
        render: (text, record, index) => text["id"],
      },
      {
        title: "Image",
        dataIndex: "photo",
        key: "photo",
        render: (text, record, index) => (
          <img
            style={{ height: "30px", width: "30px" }}
            // alt="image"
            src={text}
          />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Designation",
        dataIndex: "user_roleName",
        key: "Role",
        ...this.getColumnSearchProps("user_roleName"),
      },
      {
        title: "Department",
        dataIndex: "employeeDepartment",
        key: "employeeDepartment",
      },
      {
        title: "Location",
        dataIndex: "branchName",
        key: "branchName",
        ...this.getColumnSearchProps("branchName"),
      },

      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        ...this.getColumnSearchProps("phone"),
      },

      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        // width: "20%",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (details) => (
          <>
            <Space>
              <EmployeeDetails
                details={details}
                updatelist={this.props.updatelist}
                setUpdatelist={this.props.setUpdatelist}
                key="x"
              />
              {this.props.Auth.permissions.includes("HRM.Employee_is_update") ?
              <EditEmployee
                details={details}
                loading={this.props.loading}
                updatelist={this.props.updatelist}
                setUpdatelist={this.props.setUpdatelist}
                key="x"
              />:""}
            </Space>
          </>
        ),
      },
    ];
    return <Table columns={columns} dataSource={this.props.List} />;
  }
}

// export default Rendertable;

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps)(Rendertable);
