"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var plist = require('plist');
var watch = require('glob-watcher');
var path = require('path');

var inputs = ["Autoconf.JSON-tmLanguage", "Automake.JSON-tmLanguage", "Makefile2.JSON-tmLanguage"];

var update = function(input) {
    var output = input.replace("JSON-tmLanguage", "tmLanguage")
    console.log(input + " -> " + output);
    try {
        fs.writeFileSync(output, plist.build(JSON.parse(fs.readFileSync(input, "utf8"))));
    } catch (e) {
        console.error("   error: "+e);
    }
}
var watchMode = false
process.argv.forEach((val, index) => {
    if (val === "-w") {
        console.log("Watching " + inputs.join(", "));
        watchMode = true
    }
});

if (watchMode) {
    inputs.forEach((f) => {update(f)})

    // Raw chokidar instance
    var watcher = watch(inputs);
    // Listen for the 'change' event to get `path`/`stat`
    // No async completion available because this is the raw chokidar instance
    watcher.on('change', function (path, stat) {
        // `path` is the path of the changed file
        // `stat` is an `fs.Stat` object (not always available)
        update(path)
    });
} else {
    inputs.forEach((f) => {update(f)})
}