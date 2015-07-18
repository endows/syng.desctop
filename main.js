'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var updater = require('electron-updater')


require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  updater.on('ready', function () {
      // mainWindow = new BrowserWindow({width: 800, height: 600})
      // mainWindow.loadUrl('file://' + __dirname + '/index.html')
      // mainWindow.openDevTools({detach:true})
      // mainWindow.on('closed', function() {
      //     mainWindow = null;
      // })
      updater.on('updateRequired', function () {
          app.quit();
      })
      updater.on('updateAvailable', function () {
        console.log('ok')
          mainWindow.webContents.send('update-available');
      })
      updater.start()

  })
  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
