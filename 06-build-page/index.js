const fs = require("fs");
const path = require("path");

const boundlePath = path.join(__dirname, "project-dist");
const originalIndexPath = path.join(__dirname, "template.html");
const componentsPath = path.resolve(__dirname, "components");
const boundleIndexPath = path.resolve(boundlePath, "index.html");

/*project-dist folder creation */

fs.mkdir(boundlePath, { recursive: true }, () => {});

/* check if index exists, then delete and create new index; else createnew index*/

fs.readdir(boundlePath, (err, file) => {
  if (err) {
  }
  if (file) {
    fs.unlink(boundleIndexPath, () => {});
  }
});
fs.copyFile(originalIndexPath, boundleIndexPath, () => {});

/* check if index exists, then delete and create new index; else createnew index*/

fs.readdir(componentsPath, (err, files) => {
  if (err) {
  }
  if (files) {
    let htmlText = "";
    fs.readFile(originalIndexPath, (err, data) => {
      if (err) {
      }
      if (data) {
        htmlText += String(data);
      }

      for (const file of files) {
        const componentPath = path.resolve(componentsPath, file);
        const readFileStream = fs.createReadStream(componentPath);
        const writeStream = fs.createWriteStream(boundleIndexPath, "utf8");
        console.log(componentPath);
        readFileStream.on("data", (chunk) => {
          writeStream.write(String(chunk));
        });
      }

      console.log(htmlText);
    });
  }
});
