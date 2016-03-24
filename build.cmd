@echo off
IF %1.==. GOTO Browserify
IF %1==-m GOTO Minify
GOTO Invalid

:Minify
	call browserify ChromeWare\js\src\main.js -d -p [minifyify --no-map --uglify] > ChromeWare\js\main.js
    call browserify ChromeWare\js\src\background.js -d -p [minifyify --no-map --uglify] > ChromeWare\js\background.js
GOTO EndBuild
:Browserify
	call browserify ChromeWare\js\src\main.js -o ChromeWare\js\main.js
    call browserify ChromeWare\js\src\background.js -o ChromeWare\js\background.js
GOTO EndBuild
:Invalid
	ECHO Invalid params!
	ECHO "-m" to Minify
	ECHO No params to simple build
GOTO EndBuild

:EndBuild