#!/bin/bash

# Usage: ./generate_patch.sh

set -e

PLUGIN="$(mktemp)"
CSSINSERTCODE="$(mktemp)"
PLUGINWITHCSS="$(mktemp)"
URL="https:\/\/raw.githubusercontent.com\/paveyry\/better-hangoutschat\/master\/css\/COLOR"
if [ $OSTYPE == *"linux"* ]; then
   POSIXFLAG="--posix"
fi

generateFiles() {
   mkdir -p "$2"
   COLORURL="$(echo $URL | sed "s/COLOR/$1/g")"
   [ -z $1 ] && COLORURL=""
   cat js/insert_css.js | sed "s#CSSCOLORURL#$COLORURL#g" > "$CSSINSERTCODE"
   cat js/plugin.js | sed "/INSERTCSS/r $CSSINSERTCODE" > "$PLUGINWITHCSS"
   cat js/plugin.js | sed "s/^.*INSERTCSS$//g" > "$PLUGIN"

   cat js/gmonkeyscript_template.js "$PLUGINWITHCSS" > "$2/gmonkeyscript.js"

   VERSION="$(git tag | tail -n 1 | cut -c2-)"
   mkdir -p "$2/firefox"
   cat browser_extensions/firefox_manifest.json | sed "s/VERSION/$VERSION/g" | sed "s/COLOR/$3/g" > $2/firefox/manifest.json
   cp css/shape.css $2/firefox/
   [ -z $1 ] && touch $2/firefox/color.css || cp "css/$1" $2/firefox/color.css
   cp "$PLUGIN" $2/firefox/plugin.js
   mkdir -p "$2/firefox/icons"
   cp browser_extensions/icon.png "$2/firefox/icons/icon.png"
   cat "$2/firefox/color.css" | sed $POSIXFLAG 's/.important;$/;/g' | sed $POSIXFLAG 's/;$/!important;/g' > "$2/firefox/color2.css"
   cat "$2/firefox/shape.css" | sed $POSIXFLAG 's/.important;$/;/g' | sed $POSIXFLAG 's/;$/!important;/g' > "$2/firefox/shape2.css"
   mv "$2/firefox/shape2.css" "$2/firefox/shape.css" && mv "$2/firefox/color2.css" "$2/firefox/color.css"

   cp -r "$2/firefox" "$2/chrome"
}

generateFiles "color_slack.css" "out/slacktheme" "Slack"

generateFiles "" "out/ghctheme" "GHC"

generateFiles "color_dark.css" "out/darktheme" "Dark"

rm -rf "$PLUGINGEN" "$PLUGINWITHCSS"
