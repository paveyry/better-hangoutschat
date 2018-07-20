var emojis = {}

var replFunction = function(element) {
   element.innerHTML = element.innerHTML.replace(/:[^:]+:/gi,
      function (match) {
         var emojiName = match.slice(1, match.length - 1);
         if (emojiName in emojis) {
            return '<img class="iiJ4W" alt="'
               + emojiName + '" src="' + emojis[emojiName]
               + '" title="' + emojiName + '">';
         }
         return match;
      });
};

var linkFunction = function(elt) {
   if (!RegExp("chat.google.com/.*room/").test(window.location.href)) {

      return;
   }
   var tmpdiv = document.createElement("div");
   var link = window.location.href+"/"+elt.getAttribute("data-topic-id");
   tmpdiv.innerHTML = '<p style="font-size:8px;"><a href="'+link+'">Link:</a> '+link+'</p>';
   elt.insertBefore(tmpdiv.childNodes[0], elt.childNodes[0]);
};

// insertion-query v1.0.3 (2016-01-20)
// license:MIT
// Zbyszek Tenerowicz <naugtur@gmail.com> (http://naugtur.pl/)
var insertionQ=function(){"use strict";function a(a,b){var d,e="insQ_"+g++,f=function(a){(a.animationName===e||a[i]===e)&&(c(a.target)||b(a.target))};d=document.createElement("style"),d.innerHTML="@"+j+"keyframes "+e+" {  from {  outline: 1px solid transparent  } to {  outline: 0px solid transparent }  }\n"+a+" { animation-duration: 0.001s; animation-name: "+e+"; "+j+"animation-duration: 0.001s; "+j+"animation-name: "+e+";  } ",document.head.appendChild(d);var h=setTimeout(function(){document.addEventListener("animationstart",f,!1),document.addEventListener("MSAnimationStart",f,!1),document.addEventListener("webkitAnimationStart",f,!1)},n.timeout);return{destroy:function(){clearTimeout(h),d&&(document.head.removeChild(d),d=null),document.removeEventListener("animationstart",f),document.removeEventListener("MSAnimationStart",f),document.removeEventListener("webkitAnimationStart",f)}}}function b(a){a.QinsQ=!0}function c(a){return n.strictlyNew&&a.QinsQ===!0}function d(a){return c(a.parentNode)?a:d(a.parentNode)}function e(a){for(b(a),a=a.firstChild;a;a=a.nextSibling)void 0!==a&&1===a.nodeType&&e(a)}function f(f,g){var h=[],i=function(){var a;return function(){clearTimeout(a),a=setTimeout(function(){h.forEach(e),g(h),h=[]},10)}}();return a(f,function(a){if(!c(a)){b(a);var e=d(a);h.indexOf(e)<0&&h.push(e),i()}})}var g=100,h=!1,i="animationName",j="",k="Webkit Moz O ms Khtml".split(" "),l="",m=document.createElement("div"),n={strictlyNew:!0,timeout:20};if(m.style.animationName&&(h=!0),h===!1)for(var o=0;o<k.length;o++)if(void 0!==m.style[k[o]+"AnimationName"]){l=k[o],i=l+"AnimationName",j="-"+l.toLowerCase()+"-",h=!0;break}var p=function(b){return h&&b.match(/[^{}]/)?(n.strictlyNew&&e(document.body),{every:function(c){return a(b,c)},summary:function(a){return f(b,a)}}):!1};return p.config=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b])},p}();"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=insertionQ);

const emojiPath = 'https://api.github.com/gists/GISTID';

let emojiPromise = fetch(emojiPath).then(response => response.text());

emojiPromise.then(gistdata => {
   emojis = JSON.parse(JSON.parse(gistdata)["files"]["gistfile1.txt"]["content"]);
   var preloadedMessages = document.getElementsByClassName("Zc1Emd");
   var i;
   for (i = 0; i < preloadedMessages.length; i++) {
      replFunction(preloadedMessages[i]);
   }

   insertionQ('.Zc1Emd').every(replFunction);
});

var topics = document.getElementsByClassName('cZICLc');
var i;
for (i = 0; i < topics.length; i++) {
   linkFunction(topics[i]);
}
insertionQ('.cZICLc').every(linkFunction);


// Then get its webviews
let webviews = document.querySelectorAll("webview");

// Fetch our CSS in parallel ahead of time
const cssPath = 'CSSURL';
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
            let script = `
            let s = document.createElement('style');
            s.type = 'text/css';
            s.id = 'slack-custom-css';
            s.innerHTML = \`${css}\`;
            document.head.appendChild(s);
            `
            webview.executeJavaScript(script);
         })
   });
});
