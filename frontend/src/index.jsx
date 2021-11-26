import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import GlobalFonts from './helpers/fonts';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvidor } from './context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<GlobalFonts />
		<Router>
			<AuthProvidor>
				<App />
			</AuthProvidor>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
