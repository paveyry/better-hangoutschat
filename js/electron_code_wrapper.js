const app = require('electron').app;
app.on('web-contents-created', (e, webContents) => {
    var code = `
    (
        function(){
        // CODEHERE
    }()
    )
    `;
    if (webContents.id > 3) {
        webContents.on('did-finish-load', () => {
            webContents.executeJavaScript(`(console.log("running better-hangoutschat..."))`);
            webContents.executeJavaScript(code, true);
        });
        webContents.on('before-input-event', (event, input) => {
            if (input.key == "F12") {
                webContents.openDevTools();
            }
        });
    }
})
