Autotools syntax highlighting for VSCode
========================================

This vscode package is a fork of the GitHub project [sublime_autotools]. It
includes syntax highlighting for Autoconf M4 (`.m4`, `configure.ac`...) and
Automake files (e.g., `Makefile.am`). This extension uses the vscode's own
Makefile syntax support for hghlighting makefile things in automake files.

I chose to fork the [sublime project][sublime_autotools] in order to have
an easy way of updating vscode_autotools (which is only a matter of `git
merge`).

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
JSON and build it to a tmLanguage file. Then do ⇧⌘P and `Reload Window`
to observe the changes.

# Side notes

The sublime fork also has a Makefile2 (an alternate grammar file for Makefiles)
but the standard vscode's Makefile support works much better (actually,
the sublime's one is kind of buggy).

# Changelog

## v0.0.4
- Use vscode's default Makefile syntax grammar file instead of the sublime's
  one (Makefile2). This is because Makefile2 was buggy and vscode's one works
  just fine.

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
