import React from "react";
import ReactDOM from "react-dom";
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import "./styles.css";
import App from "./component/App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
