#!/bin/bash

/Applications/BetterChat.app/Contents/Resources/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=$HOME/.betterchat 'data:text/html;charset=utf-8,<!DOCTYPE html><html><body><script>alert("Please install Tampermonkey, create a new script and copy paste the desired version of gmonkeyscript.js in this instance, then close it and run BetterChat.app normally");window.location.href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo";</script></body></html>'
