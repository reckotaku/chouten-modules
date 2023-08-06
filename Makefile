name = $(shell jq .name ./src/metadata.json -r)

test:
	echo $(name)
build: 
	rm ./dist -rf
	- tsc
	rsync -av --exclude='*.ts' ./src/* ./dist/

build-module:
	- make build
	cd ./dist && zip ../$(name).module ./* -r && cd ..

push:
	- make build
	- adb shell "rm /sdcard/Documents/Chouten/Modules/$(name) -rf"
	- adb shell "mkdir /sdcard/Documents/Chouten/Modules/$(name)"
	adb push ./dist/* /sdcard/Documents/Chouten/Modules/$(name)/
