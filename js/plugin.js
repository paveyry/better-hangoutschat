function inject(){
    var urlreg = /.*(chat.google.com\/.*room\/[a-zA-Z0-9_-]+).*/g;

    var linkFunction = function(elt) {
        if (elt.hasAttribute("linked")) {
            return;
        }
        var loc = window.location.href;
        var match = urlreg.exec(loc);
        urlreg.lastIndex = 0;
        if (match != null) {
            var tmpdiv = document.createElement("div");
            var link = "https://"+match[1]+"/"+elt.getAttribute("data-topic-id");
            link = link.replace("search/", "");
            tmpdiv.innerHTML = '<p class="threadlink"><a href="'+link+'">Link:</a> '+link+'</p>';
            elt.setAttribute("linked", "");
            elt.insertBefore(tmpdiv.childNodes[0], elt.childNodes[0]);
        }
    };

    button = document.createElement("div")
    button.innerHTML = `<div id="displayLinkButton"><div class="U26fgb mUbCce fKz7Od" title="Display links"><span class="xjKiLb"><span style="top: -12px"><svg viewBox="0 0 16 16" class="GfYBMd Kol3Vd V3Pk2">  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"></path><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"></path></svg></span></span></div></div>`;
    searchButton = document.getElementsByClassName("oJM7Pc")[0];
    searchButton.parentElement.insertBefore(button.childNodes[0], searchButton);
    document.getElementById('displayLinkButton').addEventListener('click', event => {
        var topics = document.getElementsByClassName('cZICLc');
        var i;
        for (i = 0; i < topics.length; i++) {
            linkFunction(topics[i]);
        }
    });

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

    loadCSS('CSSSHAPEURL');
    loadCSS('CSSCOLORURL');
}

if ( window !== undefined ) {
    let injected = window.injected;
    if ( injected === undefined ) {
        inject();
        window.injected = true;
    }
}
