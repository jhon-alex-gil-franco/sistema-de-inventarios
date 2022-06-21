const { app, BrowserWindow,Menu} = require('electron')


const electronEjs = require('electron-ejs')
let ejs = new electronEjs({"key": "my value"}, {});

// Menu.setApplicationMenu(false)
function createWindow () {
  const win = new BrowserWindow({
        height: 600,
        width: 1000, 
        resizable: true,
        center: true,   
        // icon: './src/source/images/logo.ico',
        webPreferences: {
           nodeIntegration: true
    }
  })
  win.loadFile("./src/client/login.ejs")
}

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })


// if you are in Mac, just add the Name of the App
// if (process.platform === 'darwin') {
//   templateMenu.unshift({
//     label: app.getName()
//   });
// };

module.exports = {
    createWindow,
}