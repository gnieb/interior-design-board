import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user";
// import {createRoot } from "react-dom/client"

const Rooter = () =>  <UserProvider><BrowserRouter><App /></BrowserRouter></UserProvider>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Rooter />);
