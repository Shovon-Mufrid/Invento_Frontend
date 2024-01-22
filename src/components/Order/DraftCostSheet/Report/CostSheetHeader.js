import React from "react";
import { Descriptions, Row, Col } from "antd";
import moment from "moment";

const CostSheetHeader = ({ draftCostSheet }) => {
  console.log(draftCostSheet);
  const specificCostSheetItem = "Fabrics";
  return (
    <div>
      <Row align="middle">
        <Col span={4}>
          {" "}
          <img
            src="https://meherbysara.s3.amazonaws.com/uploads/products/Meher.png"
            // style={{ height: "80px"}}
            style={{
              height: "80px",
            }}
          />
        </Col>
        <Col span={20}>
          <Descriptions
            // title="Draft Cost Sheet Details"
            layout="Vertical"
            bordered
          >
            <Descriptions.Item label="Style Name" span={2}>
              {/* {style_name} */} {draftCostSheet.style_name}
            </Descriptions.Item>
            <Descriptions.Item label="Style Code" span={2}>
              {/* {style_code} */}
              {draftCostSheet.style_code}
            </Descriptions.Item>
            <Descriptions.Item label="Designer Name" span={2}>
              {/* {designer_name} */}
              {draftCostSheet.designer_name}
            </Descriptions.Item>
            <Descriptions.Item label="Client Name" span={2}>
              {/* {client_name} */}
              {draftCostSheet.client_name}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date" span={2}>
              {moment(draftCostSheet.date).format("DD-MM-YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity" span={2}>
              {/* {quantity} */}
              {draftCostSheet.quantity}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {/* {description} */}
              {/* {draftCostSheet.description} */}
              <div dangerouslySetInnerHTML={{ __html: draftCostSheet.description }}></div>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      {/* <Divider /> */}
    </div>
  );
};

export default CostSheetHeader;
