#!/bin/bash

set -e

[ -z $1 ] && echo "Usage: ./patch_electron.sh <original_electron_file>[ <emojis.json>]" && exit 1

DIR="$(mktemp -d)"

asar e "$1" "$DIR"

echo "$(sed -e "10r plugin_source.js" $DIR/renderer/init.js)" > $DIR/renderer/init.js

[ -z $2 ] || cp "$2" "$DIR/renderer/emojis.json"

asar pack "$DIR" electron.asar

rm -rf "$DIR"
