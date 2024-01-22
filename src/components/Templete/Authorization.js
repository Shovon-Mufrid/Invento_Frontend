import React, { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    Auth: state.auth,
  };
}

const Authorization = ({ Auth, children, Module, SubModule }) => {
  const location = useLocation();
  let permission_name = Module + "." + SubModule + "_is_read";
  if (!Auth.isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (Auth.permissions.includes(permission_name) || Module == "pass") {
    return children;
  }
  return <div>You don't have permission to view this page</div>;
};

export default connect(mapStateToProps)(Authorization);
