#!/bin/bash

set -e

F="$(mktemp)"
mv "$1" "$F"
cat $F | sed "s/GECKO_ID/$2/g" > "$1"