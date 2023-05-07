function updatePaneWidth() {

    const lst = ["45%", "65%", "80%", "30%"];
    var sizepos = parseInt(sessionStorage.getItem("sizepos"), 10);
    var style=document.createElement('style');
    style.type ='text/css';
    var width = lst[sizepos];
    var styletext = `.ekM2ie.eO2Zfd { width: ${width} !important; max-width: ${width} !important; min-width: 300px;}`;

    if(style.styleSheet){
        style.styleSheet.cssText=styletext;
    }else{
        style.appendChild(document.createTextNode(styletext));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    
}

function inject(){

    if (!("sizepos" in sessionStorage )) {
        sessionStorage.setItem("sizepos", "0");
    }
    updatePaneWidth();

    var chanIDreg = /.*space\/([_a-zA-Z0-9-]+).*/g;

    var linkFunction = function(elt) {
        if (elt.hasAttribute("linked")) {
            return;
        }
        var chanIDdiv = document.getElementsByClassName("SSPGKf");
        if (chanIDdiv.length == 0) {
            console.log("failed to retrieve channel id");
            return;
        }
        var chanIDdata = chanIDdiv[0].getAttribute("data-p");
        var match = chanIDreg.exec(chanIDdata);
        chanIDreg.lastIndex = 0;
        if (match != null) {
            var tmpdiv = document.createElement("div");
            var link = "https://mail.google.com/mail/u/0/#chat/space/"+match[1]+"/"+elt.getAttribute("data-topic-id");
            link = link.replace("search/", "");
            // Remove the /u/[0-9] from the link, which is bad when sharing links because it
            // could try to open the link with their non-default Google account.
            link = link.replace(/\/u\/\d/, "");
            tmpdiv.innerHTML = '<p class="threadlink"><a href="'+link+'">Link: </a> '+link+' </p>';
            var copyLink = document.createElement("a");
            copyLink.className = "linkcpy";
            copyLink.setAttribute("link", link);
            copyLink.innerText = "(COPY TO CLIPBOARD)";
            copyLink.setAttribute("linked", "");
            copyLink.addEventListener("click", function() {
                const valelt = document.createElement('textarea');
                valelt.value = link;
                document.body.appendChild(valelt);
                valelt.select();
                document.execCommand('copy');
                document.body.removeChild(valelt);
                copyLink.innerText = "(COPIED TO CLIPBOARD)";
                copyLink.style.color = 'green';
                setTimeout(function(){
                    copyLink.innerText = "(COPY TO CLIPBOARD)";
                    copyLink.style.color = "var(--primary-app-color)";
                    }, 3000);
            });
            tmpdiv.childNodes[0].appendChild(copyLink);
            elt.insertBefore(tmpdiv, elt.childNodes[0]);
        }
    };

    var addResizeButton = function(sb) {
        if (window.parent == null || window.location == window.parent.location) {
            return;
        }
        if (sb == undefined) {
            return;
        }
        var existing = document.getElementById("resizeButton");
        if (existing != null && existing.length > 0) {
            return;
        }

        var jsName = sb.getAttribute("jsname");
        if (jsName == null || jsName != "bJFgVc") {
            return;
        }

        var linkButton = sb;//.parentElement;
        var button = document.createElement("div");
        button.innerHTML = '<div id="resizeButton"><div class="U26fgb mUbCce fKz7Od Rb5ixf M9Bg4d" title="Resize thread panel"><span class="xjKiLb"><span class="Ce1Y1c" style="top: -12px"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/></svg></span></span></div></div>';
        linkButton.parentElement.insertBefore(button.childNodes[0], linkButton);
        document.getElementById('resizeButton').addEventListener('click', event => {
            var sizepos = parseInt(sessionStorage.getItem("sizepos"), 10);
            sizepos = (sizepos + 1) % 4;
            sessionStorage.setItem("sizepos", sizepos);
            updatePaneWidth();
        });
    }

    var addLinkButton = function(sb) {
        if (window.parent == null || window.location == window.parent.location) {
            return;
        }
        if (sb == undefined) {
            return;
        }
        var existing = document.getElementById("displayLinkButton");
        if (existing != null && existing.length > 0) {
            return;
        }
        var jsName = sb.getAttribute("jsname");
        if (jsName == null || jsName != "wUKE9d") {
            return;
        }

        var searchButton = sb.parentElement;
        var button = document.createElement("div");
        button.innerHTML = '<div id="displayLinkButton"><div class="U26fgb mUbCce fKz7Od" title="Show thread links"><span class="xjKiLb"><span style="top: -12px"><svg viewBox="0 0 16 16" class="GfYBMd Kol3Vd V3Pk2">  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"></path><path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"></path></svg></span></span></div></div>';
        searchButton.parentElement.insertBefore(button.childNodes[0], searchButton);
        document.getElementById('displayLinkButton').addEventListener('click', event => {
            var topics = document.getElementsByClassName('cZICLc');
            var i;
            for (i = 0; i < topics.length; i++) {
                linkFunction(topics[i]);
            }
        });
    }

    
    // insertion-query v1.0.3 (2016-01-20)
    // license:MIT
    // Zbyszek Tenerowicz <naugtur@gmail.com> (http://naugtur.pl/)
    var insertionQ=function(){"use strict";function a(a,b){var d,e="insQ_"+g++,f=function(a){(a.animationName===e||a[i]===e)&&(c(a.target)||b(a.target))};d=document.createElement("style"),d.innerHTML="@"+j+"keyframes "+e+" {  from {  outline: 1px solid transparent  } to {  outline: 0px solid transparent }  }\n"+a+" { animation-duration: 0.001s; animation-name: "+e+"; "+j+"animation-duration: 0.001s; "+j+"animation-name: "+e+";  } ",document.head.appendChild(d);var h=setTimeout(function(){document.addEventListener("animationstart",f,!1),document.addEventListener("MSAnimationStart",f,!1),document.addEventListener("webkitAnimationStart",f,!1)},n.timeout);return{destroy:function(){clearTimeout(h),d&&(document.head.removeChild(d),d=null),document.removeEventListener("animationstart",f),document.removeEventListener("MSAnimationStart",f),document.removeEventListener("webkitAnimationStart",f)}}}function b(a){a.QinsQ=!0}function c(a){return n.strictlyNew&&a.QinsQ===!0}function d(a){return c(a.parentNode)?a:d(a.parentNode)}function e(a){for(b(a),a=a.firstChild;a;a=a.nextSibling)void 0!==a&&1===a.nodeType&&e(a)}function f(f,g){var h=[],i=function(){var a;return function(){clearTimeout(a),a=setTimeout(function(){h.forEach(e),g(h),h=[]},10)}}();return a(f,function(a){if(!c(a)){b(a);var e=d(a);h.indexOf(e)<0&&h.push(e),i()}})}var g=100,h=!1,i="animationName",j="",k="Webkit Moz O ms Khtml".split(" "),l="",m=document.createElement("div"),n={strictlyNew:!0,timeout:20};if(m.style.animationName&&(h=!0),h===!1)for(var o=0;o<k.length;o++)if(void 0!==m.style[k[o]+"AnimationName"]){l=k[o],i=l+"AnimationName",j="-"+l.toLowerCase()+"-",h=!0;break}var p=function(b){return h&&b.match(/[^{}]/)?(n.strictlyNew&&e(document.body),{every:function(c){return a(b,c)},summary:function(a){return f(b,a)}}):!1};return p.config=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b])},p}();"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=insertionQ);

    addLinkButton(document.querySelector("div[jsname='wUKE9d']"));
    insertionQ('.U26fgb').every(addLinkButton);
    
    var exitButton = document.querySelector("div[jsname='bJFgVc']");
    if (exitButton != null) {
        addResizeButton(exitButton);
    }
    insertionQ('.U26fgb').every(addResizeButton);

// INSERTCSS
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
