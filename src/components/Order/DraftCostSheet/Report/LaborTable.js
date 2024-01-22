import React from "react";
import { Table } from "antd";

const LaborTable = ({ data }) => {
  const specificCostSheetItem = "Labor Cost";
  const filteredData = data.filter(
    (item) => item.cost_sheet_items === specificCostSheetItem
  );
  const columns = [
    {
      title: "Labor Cost",
      dataIndex: "draft_name",
      width: "200px",
    },
    {
      title: "Time Hour",
      dataIndex: "unit_quantity",
      width: "200px",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      width: "200px",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "200px",
    },
  ];

  return (
    <div>
      {filteredData.length>0 ? (
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          size="middle"
          pagination={false}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default LaborTable;
