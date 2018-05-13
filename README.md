webext-tx-fix
=============

[![Build Status](https://travis-ci.org/eight04/webext-tx-fix.svg?branch=master)](https://travis-ci.org/eight04/webext-tx-fix)
[![Coverage Status](https://coveralls.io/repos/github/eight04/webext-tx-fix/badge.svg?branch=master)](https://coveralls.io/github/eight04/webext-tx-fix?branch=master)

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

* 0.3.1 (May 13, 2018)

  - Exclude test files from the dist.

* 0.3.0 (May 13, 2018)

  - Update neodoc.
  - Add: files are processed in parallel.
  - Add: detect the indent style of the source language and fix the indent if translation.

* 0.2.1 (Dec 26, 2017)

	- Add: use ordered-json.

* 0.2.0 (Dec 14, 2017)

	- **Add: messages which is not translated are removed.**
	- **Add: re-order the messages to match source language.**

* 0.1.0 (Dec 12, 2017)

    - First release.
