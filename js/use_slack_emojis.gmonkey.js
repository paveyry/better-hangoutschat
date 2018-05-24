// ==UserScript==
// @name     getEmojis
// @version  1
// @grant    none
// @match    https://*.slack.com/customize/emoji*
// ==/UserScript==

var lines = document.getElementsByClassName("emoji_row");

var emojis = {};

var i;
for (i = 0; i < lines.length; i++) {
   var regex = /data\-original="([^"]+)"/gi;
   var regex2 = /:([^:]+):/gi;
   var str = lines[i].getElementsByClassName("emoji-wrapper")[0].outerHTML
   var matches = regex.exec(str);
   var matches2 = regex2.exec(lines[i].getElementsByClassName("custom_emoji_name")[0].innerHTML)
   console.log(matches);
   console.log(matches2);
   if (matches != null && matches.length >= 1 && matches2 != null && matches2.length >= 1) {
      emojis[matches2[1]] = matches[1];
   } else {
      console.log("Fail: " + str);
   }
}
if (Object.keys(emojis).length > 0) {
   var a = document.createElement('a');
   a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(emojis));
   a.download = 'emojis.json';
   document.getElementsByTagName('body')[0].appendChild(a);
   a.click();
}
