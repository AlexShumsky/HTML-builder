const fs = require("fs");
const path = require("path");
let arr = [];

const filePath = path.join(__dirname, "styles");
const filePathTo = path.join(__dirname, "project-dist", "bundle.css");

fs.readFile(filePathTo, (err, file) => {
  if (err) {
  }
  if (file) fs.unlink(filePathTo, () => {});
});

fs.readdir(filePath, function (err, files) {
  if (err) {
  }

  for (const file of files) {
    const stylesFile = path.resolve(filePath, file);

    fs.stat(stylesFile, (err, stats) => {
      if (err) {
      }
      if (stats.isFile() && path.extname(file) == ".css") {
        fs.readFile(stylesFile, "utf8", function (err, data) {
          if (err) {
          }
          arr.push(data);
          fs.appendFile(filePathTo, arr.join("\n"), function () {});
          arr.length = 0;
        });
      }
    });
  }
});
