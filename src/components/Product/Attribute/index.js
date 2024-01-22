import React, { useState } from "react";
import { connect } from "react-redux";
import AttrbiuteList from "./AttrbiuteList";
import CreateNewAttribute from "./CreateNewAttribute";

import { Breadcrumb, Row, Col } from "antd";

const Attribute = ({auth}) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Attribute</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col span={24}>
          {auth.permissions.includes("Products.Attribute_is_create") ? <CreateNewAttribute
              setUpdatelist={setUpdatelist}
              updatelist={updatelist}
            />:""}
            <h3>Attributes</h3>
            <AttrbiuteList
              updatelist={updatelist}
              setUpdatelist={setUpdatelist}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Attribute);
