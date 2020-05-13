const fs = require("fs");
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

    win.loadURL(fs.readFileSync(".paths", "utf8"));
	//win.setMenu(null);
}

app.whenReady().then(createWindow);
