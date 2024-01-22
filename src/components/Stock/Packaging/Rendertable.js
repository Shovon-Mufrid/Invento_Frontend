import React from "react";
import { Table, Input, Button, Space, Image, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import Quickview from "../../Product/ProductDetails/Quickview";
const { Text } = Typography;
var formatter = new Intl.NumberFormat("en-IN");
class Rendertable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    totalPage: this.props.List.count,
    current: this.props.pageno.current,
    minIndex: 0,
    maxIndex: 0,
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
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
    const { REACT_APP_API_URL } = process.env;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
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
        title: "Image",
        dataIndex: "",
        width: "12%",
        key: "x",
        render: (details) => {
          if (details.image != "")
            return (
              <>
                <Image width={70} src={`${details.image[0].photo}`} />
              </>
            );
          else {
            return (
              <>
                <Image
                  width={70}
                  src="data:image/png;base64,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"
                />
              </>
            );
          }
        },
      },
      {
        title: "Barcode",
        dataIndex: "barcode",
        key: "barcode",
        ...this.getColumnSearchProps("barcode"),
      },
      {
        title: "Product",
        dataIndex: "title",
        key: "title",
        // width: "20%",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        // width: "20%",
        ...this.getColumnSearchProps("category"),
      },
      {
        title: "Variation",
        dataIndex: "Attribute_details",
        key: "Attribute_details",
        ...this.getColumnSearchProps("Attribute_details"),
      },

      {
        title: "Quantity",
        align: "right",
        dataIndex: "quantity",
        key: "quantity",
      },
      // {
      //   title: "Purchase Price",
      //   align: "right",
      //   dataIndex: "purchase_price",
      //   key: "purchase_price",
      // },
      {
        title: "Selling Price",
        align: "right",
        dataIndex: "selling_price",
        key: "selling_price",
      },

      {
        title: "Location",
        dataIndex: "Warehouse_name",
        key: "Warehouse_name",
        ...this.getColumnSearchProps("Warehouse_name"),
      },
      // {
      //   title: "Action",
      //   dataIndex: "",
      //   key: "x",
      //   render: (details) => {
      //     return (
      //       <>
      //         <Quickview details={details.Deatils[0]} />
      //       </>
      //     );
      //   },
      // },
    ];
    let page_sizes = [5, 10, 20, 50, 100, 500, 1000, 5000, 10000];
    let page_size_opt = [];
    for (let i = 0; i < page_sizes.length; i++) {
      if (page_sizes[i] < this.props.List.count)
        page_size_opt.push(page_sizes[i]);
    }
    page_size_opt.push(this.props.List.count);
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.props.List.results}
        size="small"
        pagination={{
          defaultPageSize: this.props.page_size.current,
          current: this.state.current,
          total: this.props.List.count,
          pageSizeOptions: page_size_opt,
          showSizeChanger: true,
          onChange: this.handleChange,
        }}
        summary={(pageData) => {
          let total_data = this.props.total_data.current;
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={6}>
                  <b>Total For Page</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["current_quantity"])}</b>
                  </Text>
                </Table.Summary.Cell>
                {/* <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>
                      {formatter.format(total_data["current_purchase_price"])}
                    </b>
                  </Text>
                </Table.Summary.Cell> */}
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>
                      {formatter.format(total_data["current_selling_price"])}
                    </b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={6}>
                  <b>Total</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_quantity"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>
                      {formatter.format(total_data["total_purchase_price"])}
                    </b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="ant_right">
                  <Text>
                    <b>{formatter.format(total_data["total_selling_price"])}</b>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    );
  }
}

export default Rendertable;
