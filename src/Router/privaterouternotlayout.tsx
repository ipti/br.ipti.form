
import React from "react";
import { Navigate } from "react-router-dom";
import AplicationProvider from "../Context/Aplication/context";
import { isAuthenticated } from "../Services/localstorage";

const PrivateRouteNotLayout = ({ Component }: { Component: React.ReactNode }) => {

  return isAuthenticated() ?
    <AplicationProvider>
        {Component}
    </AplicationProvider>
    : <Navigate to="/register" />
}




export default PrivateRouteNotLayout;