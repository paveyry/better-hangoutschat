ELECTRON?=/Applications/Chat.app/Contents/Resources/electron.asar

MAC_APP_RSC=/Applications/BetterChat.app/Contents/Resources

all: electron

gmonkey:
	./generate_patch.sh

electron:
	./generate_patch.sh $(ELECTRON)

install_mac_app: uninstall_mac_app
	cp -r mac_app/app /Applications/BetterChat.app
	cp -r "/Applications/Google Chrome.app" $(MAC_APP_RSC)/
	cp -r $(MAC_APP_RSC)/electron.icns "$(MAC_APP_RSC)/Google Chrome.app/Contents/Resources/app.icns"
	mac_app/runAppChrome.sh

uninstall_mac_app:
	rm -rf /Applications/BetterChat.app
