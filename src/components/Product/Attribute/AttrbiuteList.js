import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllAttribute } from "../../../actions/attributeAction";
import Excelldownload from "./Exceldownload";
import Rendertable from "./Rendertable";

const AttrbiuteList = ({
  getAllAttribute,
  List,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllAttribute();
    setUpdatelist(true);
  }, [getAllAttribute, updatelist, setUpdatelist]);

  return (
    <>
      <Rendertable List={List} setUpdatelist={setUpdatelist} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.attribute.attributelist,
  };
};

export default connect(mapStateToProps, {
  getAllAttribute,
})(AttrbiuteList);
