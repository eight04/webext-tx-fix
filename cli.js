#!/usr/bin/env node

const neodoc = require("neodoc");
const args = neodoc.run(`webext-tx-fix

Usage:
  webext-tx-fix [--source SOURCE_DIR]

Options:
  -s --source SOURCE_DIR  Source folder containing manifest.json. [default: .]
  -h --help               Show this.
  -v --version            Show version.`, {
	laxPlacement: true
});

require("./index").init({args});
