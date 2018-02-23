VSCode Autotools
=================

**Autotools syntax highlighting for VSCode**

This vscode package is a fork of the github project [sublime_autotools].

This package includes syntax highlighting for Autoconf M4 and Automake files.
It also provides improved syntax highlighting for Makefiles, called Makefile2;
but because the default vscode support for Makefile is kind of better,
Makefile2 is disabled. If you want to try it, add this to your config:

```json
"files.associations": {
    "*akefile": "makefile2",
    ".make": "makefile2",
    ".mk": "makefile2"
}
```

I chose to fork the sublime project in order to have an easy way of updating
vscode_autotools (which is only a matter of `git merge`).

# Development

In order to hack this vscode extension, first remove the extension from
inside vscode. Then:

    cd ~/.vscode-insiders/extensions
    git clone https://github.com/maelvalais/vscode_autotools.git
    cd vscode_autotools
    npm install
    npm start

Using `npm start`, the `.JSON-tmLanguage` files are automatically built
into `.tmLanguage` whenever you change the json. The idea is to edit the
JSON and build it to a tmLanguage file. Then do <kbd>cmd</kbd><kbd>P</kbd>
and `Reload Window` to observe the changes.

# Changelog

## v0.0.3
- Automake: fix a bug with assigments followed by a comment
- added 'npm start'for rebuilding the tmLanguage files from the JSON-tmLanguage
  files. You may observe some changes in grammar because of this, please tell
  me if it is the case!

## v0.0.2
- Fixed the VSCode-version of Makefile that was shadowed by Makefile2, thus
  making it impossible to select the VSCode-provided Makefile highlighting.
- Fixed line comments (`#` instead of `//`)
- Removed block comments (block comments are not available in makefiles)
- added an icon, because we all kind of like nice icons (Twitter, CC 3.0 BY)

## v0.0.1
- Initial release. I disabled the Makefile2 part that was developped in
  the upstream project ([sublime_autotools]) because the Makefile support of
  vscode seems better (but I didn't really dig much to understand why).

[sublime_autotools]: https://github.com/ptomato/sublime_autotools