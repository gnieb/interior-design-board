import React from "react";
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//


const Rooter = () =>  <UserProvider><BrowserRouter><DndProvider backend={HTML5Backend}><App /></DndProvider></BrowserRouter></UserProvider>

const root = createRoot(document.getElementById('root'));
root.render( <Rooter />);
