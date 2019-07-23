Better Hangouts Chat
====================================

This applies Slack's look and feel to your Google Hangouts Chat.
To install, put `electron.asar` in `Chat.App/Contents/Resources` to use it
in the Electron client, or use the generated gmonkey scripts with greasemonkey
or tampermonkey if you use Google Chat in your browser.

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
- For the electron client: replace the official `electron.asar` with the patched one:
`C:\Users\<username>\AppData\Local\Google\Hangouts Chat\resources` on Windows,
`/Applications/Chat.app/Contents/Resources` on macOS
- For the browser script, just paste the script in your greasemonkey or tampermonkey extension

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

![Screenshot](https://user-images.githubusercontent.com/3884900/61709663-0090f680-ad50-11e9-9e60-3acc69c87f97.png)
