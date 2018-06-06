Better Hangouts Chat
====================================

This applies Slack's look and feel to your Google Hangouts Chat.
To install, put `electron.asar` in `Chat.App/Contents/Resources` to use it
in the Electron client, or use the generated gmonkey scripts with greasemonkey
or tampermonkey if you use Google Chat in your browser.

This also offers the possibility to add a sheet of custom emojis. The default
patched `electron.asar` file in this repository only provides a few examples.
If you want to add your own, just write a json emoji sheet following the
example in this repository, host it on a github gist, and call the script to
patch your own electron.asar`:

    ./generate_patch.sh /path/to/original/electron.asar id_of_gist_for_emojis

The plugin uses github's API to get the latest file of your gist, so that you
can add emojis without having your users repatch their clients/browsers.

The script `js/use_slack_emojis.js` is a greasemonkey script that allows you
to generate an emoji sheet from a slack team's existing emojis.

Update June 6th 2018: Google added a Content Security Policy HTTP header
to Hangouts Chat, which means all the emoji content has to come from google
servers.
You can use the `emojis2drive.py` script to fetch all the images from your
existing emoji sheet and use the Google Drive API to upload them all to drive
and generate a new emoji sheet compliant with the CSP.

Preview
========

![Screenshot](https://user-images.githubusercontent.com/3884900/37156764-f398a696-22de-11e8-90f8-ebca25780551.png)
