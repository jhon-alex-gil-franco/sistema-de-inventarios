const {app} = require("electron")
const express = require('express')
const appExpress= express()

const {createWindow} = require("./electron/electron");
const  path  = require('path');

appExpress.use(require('./server/index'))

require('electron-reload')(__dirname, {
    electron: path.join(process.cwd(), 'node_modules', '.bin', 'electron.cmd')
})

app.allowRendererProcessReuse = true;
app.whenReady().then(createWindow);