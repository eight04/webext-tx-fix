const assert = require("assert");
const fs = require("fs");
const {promisify} = require("util");

const {describe, it} = require("mocha");
const {fixMessages, getLocaleInfo} = require("..");

describe("fixMessages", () => {
  for (const dir of fs.readdirSync(`${__dirname}/cases`)) {
    it(dir, () => {
      return Promise.all(
        ["source", "translate", "translate-expect"]
          .map(filename => {
            return promisify(fs.readFile)(`${__dirname}/cases/${dir}/${filename}.json`, "utf8")
              .then(s => s.replace(/\r/g, ""));
          })
      )
        .then(([source, translate, translateExpect]) => {
          const output = fixMessages(translate, getLocaleInfo(source));
          assert.equal(output, translateExpect);
        });
    });
  }
});
