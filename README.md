VSCode Autotools
=================

**Autotools syntax highlighting for VSCode**

This vscode package is a fork of the github project `sublime_autotools`.

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