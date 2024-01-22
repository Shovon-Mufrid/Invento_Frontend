import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getpettycashSearchResult } from "../../actions/accounting/pettycash";
import Rendertable from "./Rendertable";

const ContactList = ({
  getpettycashSearchResult,
  List,
  updatelist,
  setUpdatelist,
  Auth,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (Auth.superuser) {
      getpettycashSearchResult("", "").then((result) => {
        setData(result);
        setUpdatelist(true);
      });
    } else {
      getpettycashSearchResult("", Auth.profile.branch.id).then((result) => {
        setData(result);
        setUpdatelist(true);
      });
    }
  }, [updatelist]);

  return (
    <>
      {
        <Rendertable
          List={data}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.contacts.contactlistsearchresult,

    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getpettycashSearchResult,
})(ContactList);
