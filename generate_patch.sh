#!/bin/bash

set -e

[ -z $1 ] || [ -z $2 ] && echo "Usage: ./generate_patch.sh <original_electron_file> <emojis_gist_id>" && exit 1

DIR="$(mktemp -d)"
PLUGINGEN="$(mktemp)"
PLUGINGEN2="$(mktemp)"
DEFAULTINIT="$(mktemp)"
GISTID="$2"

asar e "$1" "$DIR"

mkdir -p out/theme
mkdir -p out/emojisonly

cp "$DIR/renderer/init.js" $DEFAULTINIT


generateFiles() {
   cat js/plugin.js \
      | sed "s/CSSURL/$1/g" \
      | sed "s/GISTID/$GISTID/g" \
      > "$PLUGINGEN"
   echo "document.addEventListener(\"DOMContentLoaded\", function() {" > "$PLUGINGEN2"
   cat "$PLUGINGEN" >> "$PLUGINGEN2"
   echo "});" >> "$PLUGINGEN2"
   sed -e "10r $PLUGINGEN2" $DEFAULTINIT > "$DIR/renderer/init.js"
   cat js/gmonkeyscript_template.js "$PLUGINGEN" > "$2/gmonkeyscript.js"
   asar pack "$DIR" electron.asar
   mv electron.asar "$2/electron.asar"
}

generateFiles "https:\/\/raw.githubusercontent.com\/paveyry\/Slack-Theme-for-Hangouts-Chat\/master\/custom.css" "out/theme"
generateFiles "https:\/\/gist.githubusercontent.com\/devoxel\/359bacdd8d5a3600e10abfb56c21e6c3\/raw\/28f5c1644fcc99b86d2e742558e7bd7e4892b4eb\/emojifix.css" "out/emojisonly"

rm -rf "$DIR" "$DEFAULTINIT" "$PLUGINGEN" "$PLUGINGEN2"
