const app = require('electron').app;
app.on('web-contents-created', (e, webContents) => {
    var code = `
    (
        function(){
        // CODEHERE
    }()
    )
    `;
    webContents.on('did-finish-load', () => {
       webContents.executeJavaScript(code, true);
    });
    webContents.on('before-input-event', (event, input) => {
        if (input.key == "F12") {
            webContents.openDevTools();
       }
    })
})
