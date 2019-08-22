#!/bin/bash

# Usage: ./generate_patch.sh [original_electron_file]

set -e

DIR="$(mktemp -d)"
PLUGINGEN="$(mktemp)"
PLUGINGEN2="$(mktemp)"
DEFAULTINIT="$(mktemp)"
ASARFILE="$1"

[ -z "$ASARFILE" ] || asar e "$ASARFILE" "$DIR"

mkdir -p out/slacktheme

[ -z "$ASARFILE" ] || cp "$DIR/renderer/init.js" $DEFAULTINIT

generateFiles() {
   cat js/plugin.js \
      | sed "s/CSSSHAPEURL/$1/g" \
      | sed "s/CSSCOLORURL/$2/g" \
      > "$PLUGINGEN"
   echo "document.addEventListener(\"DOMContentLoaded\", function() {" > "$PLUGINGEN2"
   cat "$PLUGINGEN" >> "$PLUGINGEN2"
   echo "});" >> "$PLUGINGEN2"
   [ -z "$ASARFILE" ] || sed -e "10r $PLUGINGEN2" $DEFAULTINIT > "$DIR/renderer/init.js"
   cat js/gmonkeyscript_template.js "$PLUGINGEN" > "$3/gmonkeyscript.js"
   [ -z "$ASARFILE" ] || asar pack "$DIR" electron.asar
   [ -z "$ASARFILE" ] || mv electron.asar "$3/electron.asar"
}

generateFiles "https:\/\/raw.githubusercontent.com\/paveyry\/Slack-Theme-for-Hangouts-Chat\/master\/css\/shape.css" "https:\/\/raw.githubusercontent.com\/paveyry\/Slack-Theme-for-Hangouts-Chat\/master\/css\/color_slack.css" "out/slacktheme"

rm -rf "$DIR" "$DEFAULTINIT" "$PLUGINGEN" "$PLUGINGEN2"
