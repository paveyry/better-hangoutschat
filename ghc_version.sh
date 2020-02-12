#!/bin/bash

# Usage: ./ghc_version.sh <path/to/Info.plist>

tr '\n' ' ' < "$1" | grep -o "<key>CFBundleShortVersionString</key>[^<]*<string>[0-9.]*</string>" | grep -Eo '[0-9.]+'
