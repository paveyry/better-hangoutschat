[![Build Status](https://travis-ci.org/paveyry/better-hangoutschat.svg?branch=master)](https://github.com/paveyry/better-hangoutschat/releases/latest)

Update January 29th 2020
------------------------

Google recently released version 20 of the Google Hangouts Chat client. This new build does not
contain an `electron.asar` file and I have been unable to find another way to inject the code so
far. The Greasemonkey/Tampermonkey script still works fine.

If you care about having a minimal GUI for the chat separate from your main browser window, 
you can run use the Custom Mac Launcher as described below or simply use the Chrome flag `--app=https://chat.google.com`:

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --app=https://chat.google.com # on Mac OS

    google-chrome --app=https://chat.google.com # on GNU/Linux

You can follow the evolution of this issue and suggest solutions here: https://github.com/paveyry/better-hangoutschat/issues/10

### Custom Mac Launcher

You can clone this repository and run the `make install_mac_app` rule to install a `BetterChat`
launcher that runs an entirely separate instance of Google Chrome, with a separate user data directory
(in `$HOME/.betterchat`).

This means that the tampermonkey extension will *only* be installed for Hangouts Chat but not for
your main Chrome instance.

Just run the `make install_mac_app` rule and follow the instructions. You will only have to configure
it once.

Better Hangouts Chat
====================================

This patch extends Google Hangouts Chat to make it nicer and simpler to use.
Works with both the official Electron clients and the web version.

Features
---------

Current features: 

- Smaller margins and buttons for better readability and screen space optimization
- Thread-link buttons at the top of each thread for easier referencing
- Several different color schemes:
    - GHC standard colors
    - Slack colors
    - Dark theme (for lower eye strain)

Former features:

- Custom emojis (broken for now)

Installing from official release files
---------------------------------------

- Download the latest release from the 'releases' section:
https://github.com/paveyry/better-hangoutschat/releases
- For the electron client: open the client at least once, then replace the official
`electron.asar` with the patched one at this path:
    - For Windows: `C:\Users\<username>\AppData\Local\Google\Hangouts Chat\resources`
    - For macOS: `/Applications/Chat.app/Contents/Resources`
    - For GNU/Linux: Google have not released their electron client for GNU/Linux, but you can use
    the browser script with the web version.
- For the browser, just paste the `gmonkeyscript.js` script in your greasemonkey or tampermonkey
extension

Building Greasemonkey/Tampermonkey script from source
------------------------------------------------------

Just run this command:

    ./generate_patch.sh

The script will appear in `out`. You can now copy it in your greasemonkey or tampermonkey
extension

Building Electron Client patch from source
-------------------------------------------

To generate the electron.asar to use with native clients:

- Install `asar` using `npm` and put it in your `$PATH`
- Install the GHC client
- Run it at least once (this is important)
- Locate `electron.asar` in the installation directory on Windows, or in the App
 package on Mac (`/Applications/Chat.app/Contents/Resources/electron.asar`) and run this command:

        ./generate_patch.sh <path/to/electron.asar>

- The patched electron file will appear in `out`. Simply replace the initial one with 
the patched one:

        cp out/<theme>/electron.asar /Applications/Chat.app/Contents/Resources/

- Refresh or Restart GHC.

Preview
--------

### Thread links
![Screenshot](https://user-images.githubusercontent.com/3884900/63706271-db981380-c826-11e9-953b-8983738463b7.png)

### Dark Theme
![Screenshot](https://user-images.githubusercontent.com/3884900/63685721-01f28a80-c7f8-11e9-8522-75446596d574.png)

### Slack Theme
![Screenshot](https://user-images.githubusercontent.com/3884900/63689984-6c5cf800-c803-11e9-864e-ec578353b946.png)

### GHC Theme
![Screenshot](https://user-images.githubusercontent.com/3884900/63689983-6c5cf800-c803-11e9-8857-53326ec1d22b.png)
