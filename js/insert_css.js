// Then get its webviews
let webviews = document.querySelectorAll("webview");

function loadCSS(cssPath) {
    if (cssPath == '') {
        return;
    }
    // Fetch our CSS in parallel ahead of time
    let cssPromise = fetch(cssPath).then(response => response.text());

    // Insert a style tag into the wrapper view
    cssPromise.then(css => {
        let s = document.createElement('style');
        s.type = 'text/css';
        s.innerHTML = css;
        document.head.appendChild(s);
    });

    // Wait for each webview to load
    webviews.forEach(webview => {
        webview.addEventListener('ipc-message', message => {
            if (message.channel == 'didFinishLoading')
                // Finally add the CSS into the webview
                cssPromise.then(css => {
                    let script = "let s = document.createElement('style');"+
                        "s.type = 'text/css';"+
                        "s.id = 'slack-custom-css';"+
                        "s.innerHTML = '"+css+"';"+
                        "document.head.appendChild(s);";
                    webview.executeJavaScript(script);
                })
        });
    });
}

loadCSS('https://raw.githubusercontent.com/paveyry/better-hangoutschat/master/css/shape.css');
loadCSS('CSSCOLORURL');
