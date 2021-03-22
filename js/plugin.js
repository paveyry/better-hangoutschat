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
            // Remove the /u/[0-9] from the link, which is bad when sharing links because it
            // could try to open the link with their non-default Google account.
            link = link.replace(/\/u\/\d/, "");
            tmpdiv.innerHTML = '<p class="threadlink"><a href="'+link+'">Link:</a> '+link+' (<a class="linkcpy" link="'+link+'">COPY TO CLIPBOARD</a>)</p>';
            elt.setAttribute("linked", "");
            elt.insertBefore(tmpdiv.childNodes[0], elt.childNodes[0]);
        }
    };

    var addLinkButton = function(searchButton) {
        var existing = document.getElementById("displayLinkButton");
        if (existing != null && existing.length > 0) {
            return;
        }
        button = document.createElement("div");
        button.innerHTML = '<div id="displayLinkButton"><div class="U26fgb mUbCce fKz7Od" title="Show thread links"><span class="xjKiLb"><span style="top: -12px"><svg viewBox="0 0 16 16" class="GfYBMd Kol3Vd V3Pk2">  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"></path><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"></path></svg></span></span></div></div>';
        searchButton.parentElement.insertBefore(button.childNodes[0], searchButton);
        document.getElementById('displayLinkButton').addEventListener('click', event => {
            var topics = document.getElementsByClassName('cZICLc');
            var i;
            for (i = 0; i < topics.length; i++) {
                linkFunction(topics[i]);
            }
            var links = document.getElementsByClassName('linkcpy');
            for (i = 0; i < links.length; i++) {
                links[i].addEventListener("click", async event => {
                    if (!navigator.clipboard) {
                        event.target.innerText = "Clipboard API not available";
                        event.target.style.color = 'red';
                        return;
                    }
                    var text = event.target.getAttribute("link");
                    console.log(text);
                    try {
                        await navigator.clipboard.writeText(text);
                        event.target.innerText = 'SUCCESSFULLY COPIED TO CLIPBOARD';
                        event.target.style.color = 'green';
                    } catch (err) {
                        event.target.innerText = 'FAILED TO COPY';
                        event.target.style.color = 'red';
                        console.error('Failed to copy!', err);
                    }
                });
            }
        });
    }

    
    // insertion-query v1.0.3 (2016-01-20)
    // license:MIT
    // Zbyszek Tenerowicz <naugtur@gmail.com> (http://naugtur.pl/)
    var insertionQ=function(){"use strict";function a(a,b){var d,e="insQ_"+g++,f=function(a){(a.animationName===e||a[i]===e)&&(c(a.target)||b(a.target))};d=document.createElement("style"),d.innerHTML="@"+j+"keyframes "+e+" {  from {  outline: 1px solid transparent  } to {  outline: 0px solid transparent }  }\n"+a+" { animation-duration: 0.001s; animation-name: "+e+"; "+j+"animation-duration: 0.001s; "+j+"animation-name: "+e+";  } ",document.head.appendChild(d);var h=setTimeout(function(){document.addEventListener("animationstart",f,!1),document.addEventListener("MSAnimationStart",f,!1),document.addEventListener("webkitAnimationStart",f,!1)},n.timeout);return{destroy:function(){clearTimeout(h),d&&(document.head.removeChild(d),d=null),document.removeEventListener("animationstart",f),document.removeEventListener("MSAnimationStart",f),document.removeEventListener("webkitAnimationStart",f)}}}function b(a){a.QinsQ=!0}function c(a){return n.strictlyNew&&a.QinsQ===!0}function d(a){return c(a.parentNode)?a:d(a.parentNode)}function e(a){for(b(a),a=a.firstChild;a;a=a.nextSibling)void 0!==a&&1===a.nodeType&&e(a)}function f(f,g){var h=[],i=function(){var a;return function(){clearTimeout(a),a=setTimeout(function(){h.forEach(e),g(h),h=[]},10)}}();return a(f,function(a){if(!c(a)){b(a);var e=d(a);h.indexOf(e)<0&&h.push(e),i()}})}var g=100,h=!1,i="animationName",j="",k="Webkit Moz O ms Khtml".split(" "),l="",m=document.createElement("div"),n={strictlyNew:!0,timeout:20};if(m.style.animationName&&(h=!0),h===!1)for(var o=0;o<k.length;o++)if(void 0!==m.style[k[o]+"AnimationName"]){l=k[o],i=l+"AnimationName",j="-"+l.toLowerCase()+"-",h=!0;break}var p=function(b){return h&&b.match(/[^{}]/)?(n.strictlyNew&&e(document.body),{every:function(c){return a(b,c)},summary:function(a){return f(b,a)}}):!1};return p.config=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b])},p}();"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=insertionQ);

    addLinkButton(document.getElementsByClassName("oJM7Pc")[0]);
    insertionQ('.oJM7Pc').every(addLinkButton);
  
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
    setTimeout(function(){
        let injected = window.injected;
        if ( injected === undefined ) {
            inject();
            window.injected = true;
        }
    }, 3500);
}
