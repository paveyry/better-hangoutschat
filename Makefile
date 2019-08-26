ELECTRON?=/Applications/Chat.app/Contents/Resources/electron.asar

all: electron

gmonkey:
	./generate_patch.sh

electron:
	./generate_patch.sh $(ELECTRON)
