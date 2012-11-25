# bitlash-node - Control Bitlash-enabled Arduinos with Node.js

## Usage

### bitlash.init(options, [readycallback])

### bitlash.exec(command, [callback])

### bitlash.stop()

### bitlash.sendFile(filename)

If filename starts with http: or https: the contents of the url are sent to Bitlash.

## Examples

See test.js


## BUGS

- BUG: sendFile loses first few characters of first command

- BUG: need a way to catch and handle bitlash exceptions

- EventEmitter model

- test http: file source
 
- test bitlash.stop
