const fs = require("fs");
const url = require("url");
const path = require("path");
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
		width: 800,
		minWidth: 400,
		height: 600,
		minHeight: 300,
		frame: false,
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

	if (process.env.NODE_ENV === "dev") {

	    win.loadURL("http://localhost:8311/");

	} else {

	    win.loadURL(url.format({
	        pathname: path.join(__dirname, "asar_unpacked/index.html"),
	        protocol: "file:",
	        slashes: true,
	    }));

		win.webContents.on("devtools-opened", () => win.webContents.closeDevTools());

	}

	win.once("ready-to-show", () => win.show());

}

app.whenReady().then(createWindow);
