#!/bin/bash

./generate_patch.sh $1 emojis_example.json 
cp out/theme/electron.asar /Applications/Chat.app/Contents/Resources/electron.asar
pkill Chat
sleep 1
open /Applications/Chat.app --args -AppCommandLineArg
