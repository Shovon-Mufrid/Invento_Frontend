import React from "react";
import { Table, Input, Button, Space, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import DraftDetails from "./DraftDetails";
// import DraftImageList from "./DraftImage/DraftImageDetails"; 
import DraftImageDetails from "./DraftImage/DraftImageDetails";
import PrintView from "./Report/PrintView";
import moment from "moment";

class Rendertable extends React.Component {
  state = {
    selectedRowKeys: [],
    showModal: false,
    selectedDraft: null,
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

  onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleViewDetails = (draft) => {
    this.setState({
      showModal: true,
      selectedDraft: draft,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedDraft: null,
    });
  };

  
  render() {
    const { selectedRowKeys, showModal, selectedDraft } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    const columns = [
      {
        title: "ID",
        key: "index",
        dataIndex: "id",
      },
      {
        title: "Style Name",
        dataIndex: "style_name",
        key: "style_name",
        ...this.getColumnSearchProps("style_name"),
      },
      {
        title: "Style Code",
        dataIndex: "style_code",
        key: "style_code",
      },
      {
        title: "Client Name",
        dataIndex: "client_name",
        key: "client_name",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Net Total Cost",
        dataIndex: "net_total_cost",
        key: "net_total_cost",
      },
      {
        title: "Net Selling Price",
        dataIndex: "net_selling_price",
        key: "net_selling_price",
      },
      {
        title: "Order Date",
        dataIndex: "date",
        key: "date",            
          render: (value) => {
            return moment(value).format("DD-MM-YYYY");
          },
            
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        width: "18%",
        render: (details) => {
          return (
            <>
              {/* <a style={{ margin: 4 }}
              //  href={"/draft_images/image/" + details.id}
              >
                Images
              </a> */}
              <DraftImageDetails
               details={details}
               setUpdatelist={this.props.setUpdatelist}
               reload={this.props.reload}
               key="x"
              />
              |
              {" "}
              <DraftDetails
                details={details}
                setUpdatelist={this.props.setUpdatelist}
                reload={this.props.reload}
                key="x"
              />
              |
              {" "}
              {/* <PrintView
                details={details}
                setUpdatelist={this.props.setUpdatelist}
                reload={this.props.reload}
                key="x"
              /> */}
               <a style={{ margin: 4 }} href={`/draftcostsheet/printview/${details.id}`}>
                Print
              </a>
            </>
          );
        },
      },
    ];
    return (
    <>
      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={this.props.List}        
        // size="small"
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
      />
      {/* <Modal
          title="Draft Cost Sheet Details"
          visible={showModal}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          {selectedDraft && (
            <DraftDetails
              details={selectedDraft}
              setUpdatelist={this.props.setUpdatelist}
              reload={this.props.reload}
            />
          )}
       </Modal> */}
    </>
    
     
    );
  }
}

export default Rendertable;


