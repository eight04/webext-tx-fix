webext-tx-fix
=============

A CLI tool which re-adds placeholders to webextension locales pulled from Transifex.

Installation
------------
```
npm install -d webext-tx-fix
```

Use it as npm script:

```
"scripts": {
	"build-locales": "tx pull -a --mode=developer && webext-tx-fix",
}
```

Usage
-----
<!-- $inline.start("./cli.js|docstring|markdown:codeblock") -->
```
webext-tx-fix

Usage:
  webext-tx-fix [--source SOURCE_DIR]

Options:
  -s --source SOURCE_DIR  Source folder containing manifest.json. [default: .]
  -h --help               Show this.
  -v --version            Show version.
```
<!-- $inline.end -->

Changelog
---------

* 0.1.0 (Dec 12, 2017)

    - First release.
