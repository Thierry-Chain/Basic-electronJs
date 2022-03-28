//const electron = require('electron')
const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  globalShortcut,
  Tray,
  Notification,
  electron,
} = require('electron')
const path = require('path')
//const { electron } = require('process')
let mainWindow, traywin, iconPath
iconPath = path.join(__dirname, 'capture.jpg')
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    alwaysOnTop: true,
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => {
    mainWindow = null
    // console.log('! end')
  })
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', () => {
  createWindow()
  traywin = new Tray(iconPath)
  traywin.setToolTip('Simple app')
  traywin.setTitle('Homemade')
  const template = [
    {
      label: 'More',
      submenu: [
        {
          label: 'Help',
          click: () => {
            electron.shell.openExternal('https://github.com/Thierry-Chain')
          },
        },
        {
          label: 'Notify',
          click: () => {
            const msg = new Notification({
              title: 'Goodbye',
              body: 'From my app',
              urgency: 'critical',
            })
            msg.show()
          },
        },
      ],
    },
    { label: 'Extract' },
    {
      label: 'Close',
      submenu: [
        {
          label: 'Exit',

          click: () => {
            console.log('exitted')
            app.quit()
            app.removeAllListeners()
            app.exit()
          },
        },
        {
          role: 'selectall',
        },
        {
          role: 'reload',
        },
        {
          role: 'copy',
        },
      ],
    },
  ]
  const temp1 = [
    {
      label: 'Exit',
      click: () => {
        console.log('exitted')
        app.quit()
        app.removeAllListeners()
        app.exit()
      },
    },
  ]
  const menu = Menu.buildFromTemplate(template)
  const menu1 = Menu.buildFromTemplate(temp1)
  traywin.setContextMenu(menu1)
  Menu.setApplicationMenu(menu)
  const ctxMenu = new Menu()
  ctxMenu.append(
    new MenuItem({
      label: 'Inspect',
      click: () => {
        console.log('click from context menu')
      },
      accelerator: 'Alt + q',
    }),
  )
  ctxMenu.append(new MenuItem({ role: 'selectAll' }))
  mainWindow.webContents.on('context-menu', (e, params) => {
    ctxMenu.popup(mainWindow, params.x, params.y)
  })
  globalShortcut.register('Alt+0', () => {
    mainWindow.show()
  })
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('click-now', (event) => {
  console.log('yeah started working in the event')
  event.sender.send('handledClick')
})
