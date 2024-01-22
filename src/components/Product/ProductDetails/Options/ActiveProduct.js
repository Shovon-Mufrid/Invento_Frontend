import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import ReactExport from "react-export-excel";
import { updateSingleProduct } from "../../../../actions/singleProductAction";
import { Button, message } from "antd";
import dateFormat from "dateformat";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({
  data,
  selectedkeys,
  updateSingleProduct,
  setreload,
}) => {
  // const [loading, setloading] = useState(true);
  let result = [];
  result = data.filter((el) => selectedkeys.includes(el.id));
  let array = [];
  for (let i = 0; i < result.length; i++) {
    result[i].special_dates = dateFormat(result[i].special_dates, "yyyy-mm-dd");
    array.push(result[i]);
  }

  const onFinish = () => {
    let promises = [];
    for (let i = 0; i < result.length; i++) {
      let formData = new FormData();
      formData.append("title", result[i].title);
      formData.append("Category", result[i].Category.id);
      formData.append("is_active", true);
      promises.push(updateSingleProduct(result[i].id, formData));
    }
    Promise.all(promises).then(() => {
      message.success("Successfully activated");
      setreload(true);
    });
  };

  if (result.length > 0) {
    return (
      <Button type="primary" onClick={onFinish}>
        Active{" "}
        {result.length > 1 ? (
          <> {result.length} products</>
        ) : (
          <> {result.length} product</>
        )}
      </Button>
    );
  } else {
    return "";
  }
};

export default connect(null, {
  updateSingleProduct,
})(Excelldownload);
