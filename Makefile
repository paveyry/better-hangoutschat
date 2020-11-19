ELECTRON?=/Applications/Chat.app/Contents/Resources/app/main.js
THEME?=dark# can be replaced with `slack` or `ghc`
OUTELECTRON?=out/$(THEME)theme/main.js

all: build_all

install: $(OUTELECTRON)
	cp -f $(OUTELECTRON) $(ELECTRON)

$(OUTELECTRON): clean
	./generate_patch.sh $(ELECTRON)

gmonkey:
	./generate_patch.sh

build_all: $(OUTELECTRON)

clean:
	rm -rf out/
