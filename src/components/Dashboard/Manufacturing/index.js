import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllWorkorder } from "../../../actions/Manufacturing/workorderAction";
import { getAllworkstations } from "../../../actions/Manufacturing/workstationsAction";
import { getAllworkstationsitem } from "../../../actions/Manufacturing/workstationsitemAction";
import { getAllproductionlines } from "../../../actions/Manufacturing/productionlinesAction";
import { getproductionlinesitembyfilter } from "../../../actions/Manufacturing/productionlinesitemAction";

import ProcessPiechart from "./ProcessPiechart";

const ContactList = ({
  getAllWorkorder,
  getAllworkstations,
  getAllworkstationsitem,
  getAllproductionlines,
  getproductionlinesitembyfilter,
  List,
  updatelist,
  setUpdatelist,
}) => {
  const [workorders, setworkorders] = useState([]);
  const [workstations, setworkstations] = useState([]);
  const [workstationsitems, setworkstationsitem] = useState([]);
  const [productionlines, setproductionlines] = useState([]);
  const [productionlineitems, setproductionlineitems] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllWorkorder().then((WO) => {
      getAllworkstations().then((WS) => {
        getAllworkstationsitem().then((WSI) => {
          getAllproductionlines().then((PL) => {
            getproductionlinesitembyfilter("", "", "").then((PLI) => {
              setproductionlineitems(PLI);
              setproductionlines(PL);
              setworkstationsitem(WSI);
              setworkstations(WS);
              setworkorders(WO);
              setloading(false);
            });
          });
        });
      });
    });
  }, [getAllWorkorder, updatelist]);

  const renderWorkorder = () => {
    return workorders.map((workorder) => {
      return (
        <h3>
          {workorder.order_name}-{workorder.status}
        </h3>
      );
    });
  };
  const renderproductionlineitems = () => {
    console.log(productionlineitems);
    return productionlineitems.map((productionlineitem) => {
      return (
        <h3>
          {productionlineitem.line_name}-{productionlineitem.workorder_name}-
          {productionlineitem.status}
        </h3>
      );
    });
  };

  const renderWorkstation = () => {
    return workstations.map((workstation) => {
      return <h3>{workstation.workstation_name}</h3>;
    });
  };

  const renderproductionlines = () => {
    // console.log(productionlines);
    return productionlines.map((productionline) => {
      return (
        <h3>
          {productionline.line_name}-{productionline.status}
        </h3>
      );
    });
  };

  const renderworkstationitem = () => {
    return workstationsitems.map((workstationsitem) => {
      return (
        <h3>
          {workstationsitem.workstation_name}-{workstationsitem.workorder_name}-
          {workstationsitem.status}
        </h3>
      );
    });
  };

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <ProcessPiechart productionlineitems={productionlineitems} />
        Workorder
        {renderWorkorder()}
        Workstation
        {renderWorkstation()}
        Workstation items
        {renderworkstationitem()}
        production lines
        {renderproductionlines()}
        Production Line items
        {renderproductionlineitems()}
      </>
    );
  }
};

export default connect(null, {
  getAllWorkorder,
  getAllworkstations,
  getAllworkstationsitem,
  getAllproductionlines,
  getproductionlinesitembyfilter,
})(ContactList);
