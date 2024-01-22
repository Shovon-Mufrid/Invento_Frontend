import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Rendertable from "./Rendertable";
import { getWordrobeItem_not_returned } from "../../../actions/wordrobe";

import { Divider, AutoComplete, Skeleton } from "antd";

const SearchStock = ({ getWordrobeItem_not_returned }) => {
  const [List, setList] = useState();
  const [Loading, setLoading] = useState(true);
  const onChange = (data) => {
    getWordrobeItem_not_returned(data).then((result) => {
      setList(result);
      setLoading(false);
    });
  };
  useEffect(() => {
    getWordrobeItem_not_returned("").then((result) => {
      setList(result);
      setLoading(false);
    });
  }, []);
  console.log(List);

  return (
    <>
      <h3>Enter barcode or product code for instant Search</h3>
      <AutoComplete
        placeholder="input search text"
        onChange={onChange}
        style={{ width: "100%" }}
      />
      <Divider />
      <Rendertable List={List} />
    </>
  );
};

export default connect(null, { getWordrobeItem_not_returned })(SearchStock);
