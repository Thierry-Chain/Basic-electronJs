const { ipcRenderer } = require('electron')

let btn = document.getElementById('test')

btn.addEventListener('click', () => {
  console.log('btn clicked')
  // ipc.send('clicked-now')
})
/*
ipc.on('handledClick', (e, arg) => {
  console.log('over task completed', e, arg)
})*/
