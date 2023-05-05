#!/bin/bash

set -e

cd out/slacktheme/firefox && 7z a -tzip firefox-slack.zip * && cd ../../..
cd out/slacktheme && mv chrome chrome-slack && 7z a -tzip chrome-slack.zip chrome-slack && cd ../..
cd out/lighttheme/firefox && 7z a -tzip firefox-light.zip * && cd ../../..
cd out/lighttheme && mv chrome chrome-light && 7z a -tzip chrome-light.zip chrome-light && cd ../..
cd out/darktheme/firefox && 7z a -tzip firefox-dark.zip * && cd ../../..
cd out/darktheme && mv chrome chrome-dark && 7z a -tzip chrome-dark.zip chrome-dark && cd ../..