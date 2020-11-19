#!/bin/bash

# Usage: ./generate_patch.sh [original_mainjs_file]

set -e

PLUGINGEN="$(mktemp)"
ESCAPEDPLUGIN="$(mktemp)"
WRAPPEDPLUGIN="$(mktemp)"
DEFAULTINIT="$(mktemp)"
MAINJSFILE="$1"

generateFiles() {
   mkdir -p "$3"
   cat js/plugin.js \
      | sed "s/CSSSHAPEURL/$1/g" \
      | sed "s/CSSCOLORURL/$2/g" \
      > "$PLUGINGEN"

   if grep -q "paveyry" "$MAINJSFILE"; then
       echo "The specified main.js file is already patched, please specify a clean main.js file from a fresh release"
       return 1
   fi

   [ -z "$MAINJSFILE" ] || cat $PLUGINGEN | sed "s/\\\/\\\\\\\\/g" > "$ESCAPEDPLUGIN"
   [ -z "$MAINJSFILE" ] || cat js/electron_code_wrapper.js | sed "/CODEHERE/r $ESCAPEDPLUGIN" > $WRAPPEDPLUGIN
   [ -z "$MAINJSFILE" ] || cat $MAINJSFILE $WRAPPEDPLUGIN > $3/main.js

   cat js/gmonkeyscript_template.js "$PLUGINGEN" > "$3/gmonkeyscript.js"
}

generateFiles "https:\/\/raw.githubusercontent.com\/paveyry\/better-hangoutschat\/master\/css\/shape.css" "https:\/\/raw.githubusercontent.com\/paveyry\/better-hangoutschat\/master\/css\/color_slack.css" "out/slacktheme"

generateFiles "https:\/\/raw.githubusercontent.com\/paveyry\/better-hangoutschat\/master\/css\/shape.css" "" "out/ghctheme"

generateFiles "https:\/\/raw.githubusercontent.com\/paveyry\/better-hangoutschat\/master\/css\/shape.css" "https:\/\/raw.githubusercontent.com\/paveyry\/better-hangoutschat\/master\/css\/color_dark.css" "out/darktheme"

rm -rf "$DEFAULTINIT" "$PLUGINGEN" "$ESCAPEDPLUGIN" "$WRAPPEDPLUGIN"
