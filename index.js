const path = require("path");
const fs = require("fs");

function fixMessages(messages, translate) {
	let isEdited = false;
	for (const key of Object.keys(translate)) {
		if (translate[key].message === messages[key].message) {
			// strip untranslated messages
			delete translate[key];
		} else if (!translate[key].placeholders && messages[key].placeholders) {
			// re-add placeholders
			translate[key].placeholders = messages[key].placeholders;
		} else {
			continue;
		}
		isEdited = true;
	}
	return isEdited;
}

function init({
	args: {
		"--source": source = "."
	}
} = {}) {
	if (!path.isAbsolute(source)) {
		source = path.resolve(source);
	}
	const defaultLocale = require(`${source}/manifest.json`).default_locale;
	const messages = require(`${source}/_locales/${defaultLocale}/messages.json`);
	fs.readdirSync(`${source}/_locales`)
		.filter(l => l != defaultLocale)
		.forEach(locale => {
			const filename = `${source}/_locales/${locale}/messages.json`;
			const translate = JSON.parse(fs.readFileSync(filename, "utf8"));
			if (fixMessages(messages, translate)) {
				fs.writeFileSync(filename, JSON.stringify(translate, null, "\t"), "utf8");
			}
		});
}
module.exports = {init, fixMessages};
