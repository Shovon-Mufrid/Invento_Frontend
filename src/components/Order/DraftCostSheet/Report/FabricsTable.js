import React from "react";
import { Table, Row } from "antd";

const FabricsTable = ({ data }) => {
  // console.log(data);
  // const header = css({ backgroundColor: 'rgb(100, 108, 140)', color: 'white', margin: '50px'});
  const specificCostSheetItem = "Fabrics";
  const filteredData = data.filter(
    (item) => item.cost_sheet_items === specificCostSheetItem
  );

  const columns = [
    {
      title: "Fabrics",
      dataIndex: "draft_name",
      width: "25%",
    },
    {
      title: "Consumption/pcs",
      dataIndex: "unit_quantity",
      width: "25%",
    },
    {
      title: "Rate/Yds(BDT)",
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
          // headerClassName={header} 
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FabricsTable;
