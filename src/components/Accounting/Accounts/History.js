import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// import Log from "../../Log";
import { Drawer, Button, Skeleton } from "antd";

const History = ({ module, id, design }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);

  const showDrawer = () => {
    setloading(false);
    setVisible(true);
  };

  const onClose = () => {
    setloading(true);
    setVisible(false);
  };

  const rendercontent = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      // return <Log module={module} id={id} design={design} />;
    }
  };

  return (
    <>
      <>
        <Button
          type="link"
          onClick={showDrawer}
          //   style={{ marginBottom: "10px", float: "right" }}
        >
          History
        </Button>
        <Drawer
          title="Log"
          width="60%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {rendercontent()}
        </Drawer>
      </>
    </>
  );
};

export default connect(null, {})(History);
