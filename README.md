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


Installing from official release files
---------------------------------------

### Using the Firefox extension (recommended)

- Download the `better_hangouts_chat_<color>_X.X.X-fx.xpi` file of your choice from the 'releases' section: <https://github.com/paveyry/better-hangoutschat/releases>
- Open it with Firefox to install the extension and follow the instructions.
- Enjoy

<!--- ### Using the Chrome extension (not signed by Google)

- Download the `chrome-<color>.zip` file of your choice from the 'releases' section: <https://github.com/paveyry/better-hangoutschat/releases>
- Unzip the archive
- In Chrome, open <chrome://extensions>
- Click "Developer mode" at the top right-hand corner
- Click "Load unpacked" and select the directory extracted from the zip archive
- Enjoy -->

### Using the javascript snippet with Tampermonkey/Greasemonkey

- Download the `gmonkeyscript-<color>.js` file of your choice from the 'releases' section: <https://github.com/paveyry/better-hangoutschat/releases>
- Install Tampermonkey or Greasemonkey in your browser
- Create a new script in the extension and paste the content of the `gmonkeyscript.js` script
- Save, reload the GHC page and enjoy


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
