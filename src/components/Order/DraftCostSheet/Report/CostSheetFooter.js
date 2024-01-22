import React from "react";
import { Descriptions, Row, Col } from "antd";
const CostSheetFooter = ({ draftCostSheet }) => {
  return (
    <div>
  
          <Descriptions layout="Vertical" bordered>
            <Descriptions.Item label="Net Total Cost" span={10}>
              {draftCostSheet.net_total_cost}
            </Descriptions.Item>
            <Descriptions.Item label="Profit Percentage" span={10}>
              {draftCostSheet.profit_percentage}
            </Descriptions.Item>
            <Descriptions.Item label="Net Selling Price" span={10}>
              {draftCostSheet.net_selling_price}
            </Descriptions.Item>
          </Descriptions>
   
      {/* <Divider /> */}
    </div>
  );
};

export default CostSheetFooter;
