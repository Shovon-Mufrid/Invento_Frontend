import React, { useState } from "react";
import { Breadcrumb } from "antd";
import { useSelector, connect } from "react-redux";
import DraftCostSheetList from "./DraftCostSheetList";
import CreateNewDraftCost from "./CreateNewDraftCost";

const DraftCostSheet = ({ auth }) => {
  // const [reload, setReload] = useState(false);
  // const auth = useSelector((state) => state.auth);
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Sales</Breadcrumb.Item>
        <Breadcrumb.Item>Draft Cost Sheet</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background main-frame">
        {auth.permissions.includes("Sales.Draft Cost Sheet_is_create") && (
          <CreateNewDraftCost
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        )}
        <DraftCostSheetList
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(DraftCostSheet);
