import React from "react";
import { Table, Input, Button, Space, Image, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Quickview from "./Quickview";
import CountProducts from "./CountProducts";

const { Text } = Typography;
var formatter = new Intl.NumberFormat("en-IN");
class RenderTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    totalPage: this.props.details.count,
    current: this.props.pageno.current,
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
  selectproduct = () => {
    this.props.setselectedproduct(true, this.props.List);
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = (page, page_size) => {
    if (isNaN(page_size) || page_size == undefined) {
      page = 1;
      page_size = this.props.List.count;
    }
    this.props.pageno.current = page;
    this.props.page_size.current = page_size;
    this.props.setreload(!this.props.reload);
    this.props.setloading(true);
    this.setState({
      current: page,
      minIndex: (page - 1) * this.props.page_size.current,
      maxIndex: page * this.props.page_size.current,
    });
  };

  render() {
    const columns = [
      {
        title: "SL",
        key: "index",
        render: (value, item, index) => {
          return this.state.current > 1
            ? this.state.current * 10 + index + 1
            : index + 1;
        },
      },
      {
        title: "Issued Date",
        dataIndex: "issue_date",
        key: "issue_date",
        ...this.getColumnSearchProps("issue_date"),
      },
      {
        title: "PO No.",
        dataIndex: "purchase_number",
        key: "purchase_number",
        ...this.getColumnSearchProps("purchase_number"),
      },
      {
        title: "Products",
        dataIndex: "quantity",
        key: "quantity",
        align: "right",
      },
      {
        title: "Total Bill",
        dataIndex: "bill",
        key: "bill",
        align: "right",
      },
      {
        title: "Payment",
        dataIndex: "payment",
        key: "payment",
        align: "right",
      },
      {
        title: "Due",
        dataIndex: "due",
        key: "due",
        align: "right",
      },

      {
        title: "Reference",
        dataIndex: "reference",
        key: "reference",
        ...this.getColumnSearchProps("reference"),
        align: "center",
      },

      {
        title: "Action",
        dataIndex: "",
        key: "x",
        align: "center",
        render: (details) => {
          return (
            <>
              {/* <Update invoice={details} /> | */}
              <Quickview details={details} />
              {/* |{" "} <CancelOrder details={details} /> */}
            </>
          );
        },
      },
    ];
    let page_sizes = [10, 20, 50, 100, 500, 1000, 5000, 10000];
    let page_size_opt = [];
    for (let i = 0; i < page_sizes.length; i++) {
      if (page_sizes[i] < this.props.details.count)
        page_size_opt.push(page_sizes[i]);
    }
    page_size_opt.push(this.props.details.count);
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.props.details.results}
        size="small"
        pagination={{
          defaultPageSize: this.props.page_size.current,
          current: this.state.current,
          total: this.props.details.count,
          pageSizeOptions: page_size_opt,
          showSizeChanger: true,
          onChange: this.handleChange,
        }}
        summary={(pageData) => {
          let total_data = this.props.total_data.current;
          console.log(total_data);
          return (
            <>
              {/* <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  <b>Total For Page</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>
                      {formatter.format(total_data["current_page_quantity"])}
                    </b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["current_page_bill"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
              </Table.Summary.Row> */}
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  <b>Total</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_quantity"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_bill"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_payment"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_due"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    );
  }
}

export default RenderTable;
