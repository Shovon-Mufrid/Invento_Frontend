import { Skeleton } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Pie } from "@ant-design/plots";

const ContactList = ({ productionlineitems, updatelist }) => {
  const [loading, setloading] = useState(true);
  const complete = useRef(0);
  const pending = useRef(0);
  const testing = useRef(0);
  const working = useRef(0);
  let data = useRef([]);
  useEffect(() => {
    setloading(true);
    for (let i = 0; i < productionlineitems.length; i++) {
      if (productionlineitems[i].status == "Complete") {
        complete.current += 1;
      } else if (productionlineitems[i].status == "Pending") {
        pending.current += 1;
      } else if (productionlineitems[i].status == "Testing") {
        testing.current += 1;
      } else if (productionlineitems[i].status == "Working") {
        working.current += 1;
      }
    }
    let total =
      complete.current + pending.current + testing.current + working.current;
    data.current = [
      {
        type: "Complete",
        value: complete.current / 100,
      },
      {
        type: "Testing",
        value: testing.current / 100,
      },
      {
        type: "Pending",
        value: pending.current / 100,
      },
      {
        type: "Working",
        value: working.current / 100,
      },
    ];
    console.log(data.current);
    setloading(false);
  }, [productionlineitems]);

  if (loading) {
    return <Skeleton active />;
  } else {
    console.log(data.current);
    return (
      <>
        <Pie
          {...{
            appendPadding: 10,
            data: data.current,
            angleField: "value",
            colorField: "type",
            radius: 0.8,
            label: {
              type: "outer",
              content: "{name} {percentage}",
            },
            interactions: [
              {
                type: "pie-legend-active",
              },
              {
                type: "element-active",
              },
            ],
          }}
        />
      </>
    );
  }
};

export default connect(null, {})(ContactList);
