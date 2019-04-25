"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const plist = require("plist");
const watch = require("glob-watcher");
const yaml = require("js-yaml");
const prettier = require("prettier");

/**
 * update takes care of updating outputs given an input. For example, it
 * updates the outputs a.JSON-tmLanguage and a.tmLanguage from an input
 * a.YAML-tmLanguage.
 * - input is for example the string `"filename.yaml"`. Extensions
 * must be one of .JSON-tmLanguage, .YAML-tmLanguage, .json or .yaml.
 * - outputs is for example `["filename.json","filename.tmLanguage"]`
 */
const update = function({ input, outputs }) {
  console.log(input + " -> " + outputs.join(", "));
  try {
    let input_str = fs.readFileSync(input, "utf8");
    let parsed = "";
    if (input.match("\\.(JSON-tmLanguage|.json)$")) {
      parsed = JSON.parse(input_str);
    } else if (input.match("\\.(YAML-tmLanguage|ya?ml)$")) {
      parsed = yaml.safeLoad(input_str);
    } else {
      throw `   error: input file ${input} is not in (JSON-tmLanguage | json | YAML-tmLanguage | yaml | yml)`;
    }
    outputs.forEach(output => {
      let output_str = "";
      if (output.match("\\.(YAML-tmLanguage|ya?ml)$")) {
        output_str = prettier.format(yaml.safeDump(parsed), { parser: "yaml" });
      } else if (output.match("\\.(JSON-tmLanguage|json)$")) {
        output_str = prettier.format(JSON.stringify(parsed), {
          parser: "json"
        });
      } else if (output.match("\\.tmLanguage$")) {
        output_str = plist.build(parsed);
      } else {
        throw `   error: output file ${output} is not in (JSON-tmLanguage | json | YAML-tmLanguage | yaml | yml | tmLanguage)`;
      }
      fs.writeFileSync(output, output_str);
    });
  } catch (e) {
    console.error("   error: " + e);
  }
};

const input_prefixes = ["Autoconf", "Automake", "Makefile2"];

let mappings = [];
if (process.argv.includes("--json")) {
  mappings = input_prefixes.map(v => ({
    input: v + ".JSON-tmLanguage",
    outputs: [v + ".YAML-tmLanguage", v + ".tmLanguage"]
  }));
} else {
  mappings = input_prefixes.map(v => ({
    input: v + ".YAML-tmLanguage",
    outputs: [v + ".JSON-tmLanguage", v + ".tmLanguage"]
  }));
}

let watchMode = false;
const inputs = mappings.map(({ input }) => input);

if (process.argv.includes("-w")) {
  console.log("Watching " + inputs.join(", "));
  watchMode = true;
}

if (watchMode) {
  mappings.forEach(mapping => update(mapping));
  // Raw chokidar instance
  const watcher = watch(inputs);
  // Listen for the 'change' event to get `path`/`stat`
  // No async completion available because this is the raw chokidar instance
  watcher.on("change", function(path, stat) {
    // `path` is the path of the changed file
    // `stat` is an `fs.Stat` object (not always available)
    update(path);
  });
} else {
  mappings.forEach(mapping => update(mapping));
}
