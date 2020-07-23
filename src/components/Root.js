// Import React
import React from "react";

// Import React Router
import { HashRouter as Router, Route } from "react-router-dom";

const { getCurrentWindow } = window.require(`electron`).remote;
global.win = getCurrentWindow();

// Titlebar
import TitleBar from "frameless-titlebar";

let ROUTES = [];
const importAll = a => a.keys().forEach(k => ROUTES.push(a(k).default));
importAll(require.context("../views", true, /\.js$/));

let menu = [];
window.process.env.NODE_ENV === "dev" && (menu = [{
    label: "Dev Tools",
    submenu: [{
        label: "Reload",
		accelerator: "Ctrl+Shift+R",
        click: () => win.reload()
    }, {
        label: "Toggle Dev Tools",
        accelerator: "Ctrl+Shift+I",
        click: () => win.toggleDevTools()
    }]
}, ...menu])

const theme = Photon.getTheme();

const Root = () => {

	let __cached = location.href;
	(function loop() {
		requestAnimationFrame(loop)
		if(__cached !== location.href) {
			requestAnimationFrame(Photon.reload);
			__cached = location.href;
		}
	}())

	return (
		<Router>
			<TitleBar
			  currentWindow={win}
			  menu={menu}
			  platform={process.platform}
			  title={require("../../package.json").customName || require("../../package.json").name}
			  theme={{
				menu: {
	      			palette: theme["theme"],
	      			list: {
	        			background: theme["background"]
	      			},
	      			item: {
	        			active: {
	          				background: theme["accent"]
	        			}
	     			}
	    		},
				bar: {
			      	palette: function(c){
						c = c.split("(")[1].split(")")[0].split(", ");
						let [ r, g, b ] = [ parseInt(c[0]), parseInt(c[1]), parseInt(c[2]) ]
						var yiq = ((r*299)+(g*587)+(b*114))/1000;
						return (yiq >= 128) ? "dark":"light";
					}(theme["on-primary"]),
			      	background: theme["primary-variant"],
			     	borderBottom: ""
	    		},
	      		button: {
	        		active: {
	          			color: function(c){
							c = c.split("(")[1].split(")")[0].split(", ");
							let [ r, g, b ] = [ parseInt(c[0]), parseInt(c[1]), parseInt(c[2]) ]
							var yiq = ((r*299)+(g*587)+(b*114))/1000;
							return (yiq >= 128) ? "dark":"light";
						}(theme["on-primary"]),
	          			background: theme["primary"]
	        		}
	      		}
			  }}
			  onClose={() => win.close()}
			  onMinimize={() => win.minimize()}
			  onMaximize={() => win.isMaximized() ? win.restore() : win.maximize()}
			  onDoubleClick={() => win.isMaximized() ? win.restore() : win.maximize()}/>
			<main>
				{ ROUTES.map(({ route, View }, key) => <Route key={key} path={route} exact={true} component={View}/> ) }
			</main>
		</Router>
	)
}

export default Root;
