const path = require("path");
const fs = require("fs");
const {promisify} = require("util");

const orderedJSON = require("ordered-json");
const detectIndent = require("detect-indent");

function isSubArray(a, b) {
  let pos = 0;
  for (const i of b) {
    pos = a.indexOf(i, pos);
    if (pos < 0) {
      return false;
    }
    pos++;
  }
  return true;
}

function fixMessages(content, {messages, order, indent}) {
	const translate = JSON.parse(content);
  const translateOrder = Object.keys(translate);
	let shouldOutput = indent != null ||
    !isSubArray(order, translateOrder);
	for (const key of translateOrder) {
    if (!messages[key]) {
      // strip unknown key?
      delete translate[key];
    } else if (translate[key].message === messages[key].message) {
			// strip untranslated messages
			delete translate[key];
		} else if (!translate[key].placeholders && messages[key].placeholders) {
			// re-add placeholders
			translate[key].placeholders = messages[key].placeholders;
		} else {
			continue;
		}
		shouldOutput = true;
	}
	if (shouldOutput) {
		return orderedJSON.stringify(translate, {
      space: indent || "\t",
      order
    });
	}
}

function getLocaleInfo(content) {
	const messages = JSON.parse(content);
	const {indent} = detectIndent(content); // indent could be null
  const order = Object.keys(messages);
  return {messages, indent, order};
}

function init({
	args: {
		"--source": source = "."
	}
} = {}) {
	if (!path.isAbsolute(source)) {
		source = path.resolve(source);
	}
	const defaultLocale = JSON.parse(fs.readFileSync(`${source}/manifest.json`, "utf8")).default_locale;
	const sourceContent = fs.readFileSync(
		`${source}/_locales/${defaultLocale}/messages.json`,
		"utf8"
	);
	const sourceInfo = getLocaleInfo(sourceContent);
	const pendings = fs.readdirSync(`${source}/_locales`)
		.filter(l => l != defaultLocale)
		.map(locale => {
			const filename = `${source}/_locales/${locale}/messages.json`;
			return promisify(fs.readFile)(filename, "utf8")
				.then(content => {
					const output = fixMessages(content, sourceInfo);
					if (output != null) {
						return promisify(fs.writeFile)(filename, output, "utf8");
					}
				});
		});
	return Promise.all(pendings);
}

module.exports = {init, fixMessages, getLocaleInfo};
