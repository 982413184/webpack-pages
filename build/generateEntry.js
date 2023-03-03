const path = require("path");
const fs = require("fs");

const jsPath = path.join(__dirname, "../src/js");

function generateEntry() {
  let jsFiles = fs.readdirSync(jsPath);
  jsFiles = jsFiles.filter((filename) => {
    return /\.js$/.test(filename);
  });
  return jsFiles.reduce((result, filename) => {
    const [ele1] = filename.split(".");
    result[ele1] = path.join(jsPath, filename);
    return result;
  }, {});
}

module.exports = generateEntry;
