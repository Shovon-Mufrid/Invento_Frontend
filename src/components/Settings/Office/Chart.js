import React, { useState, useEffect, useRef } from "react";
import {
  FundFlowGraph,
  FlowAnalysisGraph,
  DecompositionTreeGraph,
} from "@ant-design/graphs";

const Chart = ({ List }) => {
  const [loading, setLoading] = useState(true);
  const reload = useRef(false);
  const node = useRef([]);
  const edge = useRef([]);
  useEffect(() => {
    for (let i = 0; i < List.length; i++) {
      let obj = {
        id: List[i].id.toString(),
        value: {
          text: List[i].title,
          // items: [
          //   {
          //     text: List[i].title,
          //     value: List[i].cash,
          //     icon: "https://gw.alipayobjects.com/zos/antfincdn/28B4PgocL4/bbd3e7ef-6b5e-4034-893d-1b5073ad9aa4.png",
          //   },
          // ],
          // icon: List[i].logo,
          // icon: "https://gw.alipayobjects.com/zos/antfincdn/28B4PgocL4/bbd3e7ef-6b5e-4034-893d-1b5073ad9aa4.png",
        },
      };
      if (List[i].Warehouse_parent) {
        let obj1 = {
          source: List[i].id.toString(),
          target: List[i].Warehouse_parent.toString(),
          value: {
            text: "Cash: " + List[i].cash + " BDT",
            subText: "Petty Cash: " + List[i].cash + " BDT",
          },
        };
        edge.current.push(obj1);
      }
      node.current.push(obj);
    }
    reload.current = true;
    setLoading(false);
  }, []);

  if (!reload.current) {
    return <h1>Loading</h1>;
  } else {
    const data = {
      nodes: node.current,
      edges: edge.current,
    };

    const config = {
      data,
      // layout: {
      //   /** Direction for rank nodes. Can be TB, BT, LR, or RL, where T = top, B = bottom, L = left, and R = right. */
      //   rankdir: "RL",
      //   nodesep: 40,
      //   ranksep: 40,
      // },
      edgeCfg: {
        type: "polyline",
      },
      // behaviors: ["drag-canvas", "drag-node"],
    };
    return <FundFlowGraph {...config} />;
  }
};

export default Chart;
