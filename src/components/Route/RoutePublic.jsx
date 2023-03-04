import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import config from "../../config/config";

export const RoutePublic = ({ children, ...rest }) => {

  function hasJWT() {
    let flag = false;
    localStorage.getItem(config.nameUserToken) ? flag=true : flag=false
    return flag
  }

  return (
    !hasJWT() ?
      children
      :
      <Navigate to="/" />
  );
};

export default RoutePublic;