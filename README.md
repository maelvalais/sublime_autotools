# Autotools syntax highlighting for VSCode

The extension is available on both [vsce](https://marketplace.visualstudio.com/items?itemName=maelvalais.autoconf),
and on [ovsx](https://open-vsx.org/extension/maelvalais/autoconf).

This VSCode extension is a fork of the GitHub project [sublime_autotools][]. It
includes syntax highlighting for Autoconf M4 (`.m4`, `configure.ac`...) and
Automake files (e.g., `Makefile.am`). This extension uses the vscode's own
Makefile syntax support for hghlighting makefile things in automake files.

I chose to fork the [sublime project][sublime_autotools] in order to have
an easy way of updating vscode_autotools (which is only a matter of `git merge`).

## Debugging why the grammar is off

To find out why the syntax highlighting is off, turn on the
command "Developer: Inspect Editor Grammar Tokens and Scopes":

![vscode-grammar-tokens-and-scopes-hover](https://user-images.githubusercontent.com/2195781/105803142-23334980-5f9d-11eb-8fcb-4feee8d27c04.png)

Then you will see exactly in which scope the syntax highlighting fails:

![vscode-inspect-editor-tokens-and-scopes](https://user-images.githubusercontent.com/2195781/105803144-23cbe000-5f9d-11eb-894a-6548d0889064.png)

To try to fix the grammar issue, you can clone and run the cloned folder
as the only extension:

```sh
git clone https://github.com/maelvalais/vscode_autotools.git
cd vscode_autotools
npm install && npm start
code --disable-extensions --extensionDevelopmentPath=$PWD
```

## Development

In order to hack this vscode extension, first remove the extension from
inside vscode. Then:

```sh
git clone https://github.com/maelvalais/vscode_autotools.git
cd vscode_autotools
npm install
npm start
```

To run a new instance of VSCode with the modified extension:

```sh
# From inside the vscode_autotools folder you just cloned:
code --disable-extensions --extensionDevelopmentPath=$PWD
```

Using `npm start`, the `.YAML-tmLanguage` files are automatically built
into `.tmLanguage` and `.JSON-tmLanguage`. Whenever you change the YAML
files, it will rebuild the JSON and YAML files. Then do ⇧⌘P and `Reload Window` to observe the changes on a m4/Makefile/Makefile.am file.

You can use `npm start -- --json` in order to use the JSON-tmLanguage files
as the source, in which case `.YAML-tmLanguage` and `.tmLanguage` will be
generated from the json file.

I chose to convert from JSON to YAML for three reasons: YAML is way less
verbose, does not need two backslashes for each backslash and has proper
comments. In order to have a proper Yaml autocompletion (I know everybody
loves the vscode's JSON autocompletion and schema helpers), I recommend to
install the Red Hat YAML extension and add the following to your settings:

```json
"yaml.schemas": {
    "https://cdn.rawgit.com/martinring/tmlanguage/master/tmlanguage.json": "*.YAML-tmLanguage"
}
```

## Side notes

The sublime fork also has a Makefile2 (an alternate grammar file for Makefiles)
but the standard vscode's Makefile support works much better (actually,
the sublime's one is kind of buggy).

## Publishing to vsce & secrets

Before publishing, I go into package.json and bump the version and commit
that. I also `git tag` with that same version.

### For publishing to the official extension marketplace

**Secret required**: `VSCE_TOKEN` (stored in @maelvls's 1Password)

```sh
export VSCE_TOKEN=<the-token>
npm install -g vsce
cat <<EOF > ~/.vsce
{"publishers":[{"name":"maelvalais","pat":"$VSCE_TOKEN"}]}
EOF
vsce publish
```

> Note: I created the [publisher id](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) "maelvalais" with
>
> ```sh
> vsce create-publisher maelvalais
> ```

### For publishing to open-vsce

**Secret required**: `OVSX_PAT` (stored in @maelvls's 1Password)

```sh
export OVSX_PAT=<the-token>
npm install -g ovsx
ovsx publish
```

> Note: I created the [namespace](https://open-vsx.org/user-settings/namespaces) "maelvalais" with
>
> ```sh
> ovsx create-namespace maelvalais
> ```

## Changelog

### v0.1.0

- complete PKG macro family. Change proposed by jannick0 (initially
  proposed at <https://github.com/ptomato/sublime_autotools/pull/9>)

### v0.0.9

- Add [AC_CONFIG_MACRO_DIRS] provided by `automake` which surprisingly
  exists together with `autoconf`'s [AC_CONFIG_MACRO_DIR]. Change proposed
  by jannick0.
- (internal) add the `npm start -- --json` feature that allows people more
  familiar with json to generate tmLanguage from the json file instead of
  the yaml one.

[ac_config_macro_dirs]: https://www.gnu.org/software/automake/manual/html_node/Local-Macros.html
[ac_config_macro_dir]: https://www.gnu.org/savannah-checkouts/gnu/autoconf/manual/autoconf-2.69/html_node/Input.html#Input.

### v0.0.7

- Autoconf M4 (configure.ac): fix \" not being properly escaped in a string.
  Note for now, that variables won't (for some reason) be highlighted in
  strings. I couldn't find why.

### v0.0.6

- Automake: fix comments not being highlighted when it starts at the beginning
  of a line and is interleaved with a recipe.

### v0.0.5

- Automake grammar: fixed bug with `foo: $(VAR:%.h=%.h)`
- Makefile2: re-include it into the extension. The Automake grammar is actually
  working better using makefile2.
- Many small improvements to Makefile2 and Automake, e.g., `$(if a,b)`
  properly colored.
- Moved from JSON grammar files to YAML.

### v0.0.4

- Use vscode's default Makefile syntax grammar file instead of the sublime's
  one (Makefile2). This is because Makefile2 was buggy and vscode's one works
  just fine.

### v0.0.3

- Automake: fix a bug with assigments followed by a comment
- added 'npm start'for rebuilding the tmLanguage files from the JSON-tmLanguage
  files. You may observe some changes in grammar because of this, please tell
  me if it is the case!

### v0.0.2

- Fixed the VSCode-version of Makefile that was shadowed by Makefile2, thus
  making it impossible to select the VSCode-provided Makefile highlighting.
- Fixed line comments (`#` instead of `//`)
- Removed block comments (block comments are not available in makefiles)
- added an icon, because we all kind of like nice icons (Twitter, CC 3.0 BY)

### v0.0.1

- Initial release. I disabled the Makefile2 part that was developped in
  the upstream project ([sublime_autotools]) because the Makefile support of
  vscode seems better (but I didn't really dig much to understand why).

[sublime_autotools]: https://github.com/ptomato/sublime_autotools
