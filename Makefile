ELECTRON?=/Applications/Chat.app/Contents/Resources/app/main.js
THEME?=dark
OUTELECTRON?=out/$(THEME)theme/main.js

all: build_all

install: $(OUTELECTRON)
	cp -f $(OUTELECTRON) $(ELECTRON)

$(OUTELECTRON):
	./generate_patch.sh $(ELECTRON)

gmonkey:
	./generate_patch.sh

build_all: $(OUTELECTRON)

clean:
	rm -rf out/
