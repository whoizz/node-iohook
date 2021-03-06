'use strict';
const IOHook = require('./index.js')

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


const ioHook = new IOHook();



ioHook.on("mouse_pressed",function(msg){
  console.log(msg);
})
ioHook.on("key_pressed",function(msg){
  console.log(msg);
})


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL("http://www.google.com");

  //install event listener
  ioHook.on("keyup",function(msg){console.log(msg); if(msg.keyboard.keycode==57){
        ioHook.stop()
    }
  })
  ioHook.on("mousemove",function(msg){console.log(msg)})

  mainWindow.on("focus",function()
  {
    ioHook.resume();
  })
  mainWindow.on("blur",function()
  {
    ioHook.pause()

  })


  //start ioHook
  ioHook.start();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});




