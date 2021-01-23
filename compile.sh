#!/bin/sh
echo "Compiling reverse WASM"
emcc -Os reverse.c -o reverse.wasm --verbose -s EXPORTED_FUNCTIONS='["_reverse", "_getDataOffset", "_getSize"]'