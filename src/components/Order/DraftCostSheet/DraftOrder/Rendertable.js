import React from 'react';
import { Table, Input, Button, Space, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
const Rendertable = ({List}) => {
        const columns = [
      {
        title: "Cost Sheet Item",
        dataIndex: "cost_sheet_items",
        key: "cost_sheet_items",
      },
      {
        title: "Name",
        dataIndex: "draft_name",
        key: "draft_name",
      },
      {
        title: "Unit Quantity",
        dataIndex: "unit_quantity",
        key: "unit_quantity",
      },
      {
        title: "Unit Name",
        dataIndex: "unit_name",
        key: "unit_name",
      },
      {
        title: "Unit Price",
        dataIndex: "unit_price",
        key: "unit_price",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },

    ];
    return (
        <div>
      <Table dataSource={List} columns={columns} />
        </div>
    );
};

export default Rendertable;


