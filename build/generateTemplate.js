const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const templatePath = path.join(__dirname, "../src/views");

function generateTemplate(entry) {
  const keys = Object.keys(entry);
  let templateFiles = keys.map((key) => `${key}.html`);
  templateFiles = templateFiles.filter((file) =>
    fs.existsSync(path.join(templatePath, file))
  );
  return templateFiles.map(
    (filename) =>
      new HtmlWebpackPlugin({
        template: path.resolve(templatePath, filename),
        filename,
        chunks: [filename.split(".")[0]],
      })
  );
}
module.exports = generateTemplate;
