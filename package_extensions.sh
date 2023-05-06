#!/bin/bash

set -e

cd out/slacktheme && mv chrome chrome-slack && 7z a -tzip chrome-slack.zip chrome-slack && cd ../..
cd out/lighttheme && mv chrome chrome-light && 7z a -tzip chrome-light.zip chrome-light && cd ../..
cd out/darktheme && mv chrome chrome-dark && 7z a -tzip chrome-dark.zip chrome-dark && cd ../..