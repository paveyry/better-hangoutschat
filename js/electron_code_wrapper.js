const app = require('electron').app;
app.on('web-contents-created', (e, webContents) => {
    var code = `
    (
        function(){
        // CODEHERE
    }()
    )
    `;
    if (webContents.id > -1) {
        webContents.on('did-finish-load', () => {
            var millisecondsToWait = 3500;
            setTimeout(function() {
                webContents.executeJavaScript(`(console.log("running better-hangoutschat..."))`);
                webContents.executeJavaScript(code, true);
            }, millisecondsToWait);
        });
        webContents.on('before-input-event', (event, input) => {
            if (input.key == "F12") {
                webContents.openDevTools();
            }
        });
    }
})
