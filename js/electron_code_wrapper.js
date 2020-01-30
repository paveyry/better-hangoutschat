const app = require('electron').app;
app.on('web-contents-created', (e, webContents) => {
    var code = `
    (
        function(){
        // CODEHERE
    }()
    )
    `;
    webContents.executeJavaScript(code, true);
})
