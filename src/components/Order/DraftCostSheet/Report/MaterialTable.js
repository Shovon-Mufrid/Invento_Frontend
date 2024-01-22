import React from "react";
import { Table } from "antd";

const MaterialTable = ({ data }) => {
  console.log(data);

  const specificCostSheetItem = "Trims/Accessories";
  const filteredData = data.filter(
    (item) => item.cost_sheet_items === specificCostSheetItem
  );

  console.log(filteredData)
  const columns = [
    {
      title: "Trims & Accessories Material",
      dataIndex: "draft_name",
      width: "25%",
    },
    {
      title: "Quantity",
      dataIndex: "unit_quantity",
      width: "25%",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      width: "25%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "25%",
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

export default MaterialTable;
