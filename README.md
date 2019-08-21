[![Build Status](https://travis-ci.org/paveyry/Slack-Theme-for-Hangouts-Chat.svg?branch=master)](https://github.com/paveyry/Slack-Theme-for-Hangouts-Chat/releases/latest)

Better Hangouts Chat
====================================

This patch extends Google Hangouts Chat to make it nicer and simpler to use.
Works with both the official Electron clients and the web version.

Features
---------

Current features: 

- Slack colors and fonts
- Smaller margins and buttons for better readability and screen space optimization
- Thread-link buttons at the top of each thread for easier referencing

Former features:

- Custom emojis (broken for now)

Installing from official release files
---------------------------------------

- Download the latest release from the 'releases' section:
https://github.com/paveyry/Slack-Theme-for-Hangouts-Chat/releases
- For the electron client: open the client at least once, then replace the official
`electron.asar` with the patched one at this path:
    - For Windows: `C:\Users\<username>\AppData\Local\Google\Hangouts Chat\resources`
    - For macOS: `/Applications/Chat.app/Contents/Resources`
- For the browser, just paste the `gmonkeyscript.js` script in your greasemonkey or tampermonkey
extension

Generating Greasemonkey/Tampermonkey script
--------------------------------------------

Just run this command:

    ./generate_patch.sh

The script will appear in out/slacktheme. You can now copy it in your greasemonkey or tampermonkey
extension

Generating Electron client patch
---------------------------------

To generate the electron.asar to use with native clients:

- Install `asar` using `npm` and put it in your `$PATH`
- Install the GHC client
- Run it at least once (this is important)
- Get the path of the electron.asar in the installation directory on Windows, or in the App
 package on Mac (`/Applications/Chat.app/Contents/Resources/electron.asar`) and run this command:

        ./generate_patch.sh <path/to/electron.asar>

- The patched electron file will appear in out/slacktheme. Simply replace the initial one with 
the patched one:

        cp out/slacktheme/electron.asar /Applicaions/Chat.app/Contents/Resources/

- Refresh or Restart GHC.

Preview
--------

![Screenshot](https://user-images.githubusercontent.com/3884900/61730969-c2f59300-ad7a-11e9-9cf3-65b0f5363693.png)
