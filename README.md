Better Hangouts Chat
====================================

This applies Slack's look and feel to your Google Hangouts Chat.
To install, put `electron.asar` in `Chat.App/Contents/Resources` to use it
in the Electron client.

This also offers the possibility to add a sheet of custom emojis. The default
patched `electron.asar` file in this repository only provides a few examples.
If you want to add your own, just write a json emoji sheet following the
example in this repository, and call the script to patch your own
`electron.asar`:

    ./patch_electron.sh /path/to/original/electron.asar /path/to/emojis.json

Preview
========

![Screenshot](https://user-images.githubusercontent.com/3884900/37156764-f398a696-22de-11e8-90f8-ebca25780551.png)
