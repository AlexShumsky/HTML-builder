const fs = require("fs");
const path = require("path");
const process = require("process");

const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, (err, files) => {
  if (err) console.error("folder Error");
  for (const file of files) {
    const filePath = path.resolve(folderPath, file);
    const fileExt = path.extname(file).slice(1);
    const fileName = path.basename(file, fileExt);

    fs.stat(filePath, (err, stats) => {
      if (err) console.error("stats Error");
      if (stats.isFile()) {
        const fileSize = (stats.size / 1024).toFixed(3);
        process.stdout.write(`${fileName} — ${fileExt} — ${fileSize}kb\n`);
      }
    });
  }
});
