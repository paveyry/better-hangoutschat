[![Build Status](https://travis-ci.org/paveyry/better-hangoutschat.svg?branch=master)](https://github.com/paveyry/better-hangoutschat/releases/latest)

Better Hangouts Chat
====================================

This patch extends Google Hangouts Chat to make it nicer and simpler to use.
Works with both the official Electron clients and the web version.

*Note*: Google has dropped support for the Electron client in favor of using the new Chrome App.
In order to use this plugin within the Chrome App, you can use either the javascript snippet
within Greasemonkey or Tampermonkey in your browser, or install the custom better-hangoutschat
browser extension (experimental).
If you still use an old version of the Electron client, you can use the electron file from release
v4.2.1, the latest version of better-hangoutschat supporting the Electron client.

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

- For the custom script using the tampermonkey (or greasemonkey) extension, just paste the 
`gmonkeyscript.js` script in tampermonkey
- [EXPERIMENTAL] For the dedicated browser extension, download the extension file for your browser
and install it manually.


Building script from source
----------------------------

Just run this command:

    ./generate_patch.sh

The script will appear in `out`. You can now copy it in your greasemonkey or tampermonkey
extension

Preview
--------

### Thread links
![Screenshot](https://user-images.githubusercontent.com/3884900/88812353-88091500-d1af-11ea-8d3d-579cab4aa143.png)

Click on the *Show Thread Links* button and thread links will appear before each thread in the current window.

![Screenshot](https://user-images.githubusercontent.com/3884900/112030582-5247e080-8b32-11eb-8280-3fe396da923e.png)

### Dark Theme
![Screenshot](https://user-images.githubusercontent.com/3884900/63685721-01f28a80-c7f8-11e9-8522-75446596d574.png)

### Slack Theme
![Screenshot](https://user-images.githubusercontent.com/3884900/63689984-6c5cf800-c803-11e9-864e-ec578353b946.png)

### GHC Theme
![Screenshot](https://user-images.githubusercontent.com/3884900/63689983-6c5cf800-c803-11e9-8857-53326ec1d22b.png)
