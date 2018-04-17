#!/usr/bin/env bash

BASEDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIFF_FILE="${BASEDIR}/electron.asar.diff"

unamestr=`uname`

function patch_asar {
    chat_app="${1}"
    if [ ! -d "${chat_app}" ] ; then
        echo "Could not find Chat at ${chat_app}"
        exit 1
    fi
    echo -n "Found Chat, patching ... "
    out="$(patch -p1 -d "${chat_app}/Contents/Resources" -i ${DIFF_FILE})"
    if [ $? -eq 0 ] ; then
        echo "OK"
    else
        echo "FAIL"
        echo "=== OUTPUT ==="
        echo "${out}"
        echo "=== OUTPUT ==="
        exit 1
    fi
}

if [[ "$unamestr" == 'Darwin' ]] ; then
    echo "Platform: MacOS"
    patch_asar "/Applications/Chat.app"
else
    echo "Unsupported platform: ${unamestr}"
    exit 1
fi
