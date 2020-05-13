// Import React
import React from "react";

// Import React Router
import { HashRouter as Router, Route } from "react-router-dom";

const { getCurrentWindow } = window.require(`electron`).remote;
global.win = getCurrentWindow();

console.log(win)

// Titlebar
import TitleBar from "frameless-titlebar";

let ROUTES = [];
const importAll = a => a.keys().forEach(k => ROUTES.push(a(k).default));
importAll(require.context("../views", true, /\.js$/));

const Root = () => (
	<Router>
		<TitleBar
		  iconSrc={app.static("icon.png")}
		  currentWindow={win}
		  platform={process.platform}
		  title="App"
		  onClose={() => win.close()}
		  onMinimize={() => win.minimize()}
		  onMaximize={() => win.isMaximized() ? win.restore() : win.maximize()}
		  onDoubleClick={() => win.isMaximized() ? win.restore() : win.maximize()}/>
		<main>
			{ ROUTES.map(({ route, View }, key) => <Route key={key} path={route} exact={true} component={View}/> ) }
		</main>
	</Router>
);

export default Root;
