import React from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user";


const Rooter = () =>  <UserProvider><BrowserRouter><App /></BrowserRouter></UserProvider>

const root = createRoot(document.getElementById('root'));
root.render( <Rooter />);
