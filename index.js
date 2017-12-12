const path = require("path");
const fs = require("fs");

function init({
	args: {
		"--source": source = "."
	}
} = {}) {
	if (!path.isAbsolute(source)) {
		source = path.resolve(source);
	}
	const defaultLocale = require(`${source}/manifest.json`).default_locale;
	const messages = [...Object.entries(require(`${source}/_locales/${defaultLocale}/messages.json`))]
		.filter(([, message]) => message.placeholders);
	if (!messages.length) {
		console.log("No placeholders");
		return;
	}
	fs.readdirSync(`${source}/_locales`)
		.filter(l => l != defaultLocale)
		.forEach(locale => {
			const filename = `${source}/_locales/${locale}/messages.json`;
			const translate = require(filename);
			let isEdited = false;
			for (const [key, {placeholders}] of messages) {
				if (translate[key]) {
					translate[key].placeholders = placeholders;
					isEdited = true;
				}
			}
			if (isEdited) {
				fs.writeFileSync(filename, JSON.stringify(translate, null, "\t"), "utf8");
			}
		});
}
module.exports = {
	init
};
