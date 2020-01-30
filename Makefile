ELECTRON?=/Applications/Chat.app/Contents/Resources/app/main.js
MODE?=dark

all: electron

install: electron
	cp -f out/$(MODE)theme/main.js $(ELECTRON)

gmonkey:
	./generate_patch.sh

electron:
	./generate_patch.sh $(ELECTRON)
