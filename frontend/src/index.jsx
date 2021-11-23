import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import GlobalFonts from './helpers/fonts'
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <GlobalFonts/>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
