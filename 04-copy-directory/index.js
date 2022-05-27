const fs = require("fs");
const path = require("path");

const sourceFolderPath = path.join(__dirname, "files");
const copyFolderPath = path.join(__dirname, "files-copy");

fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
  if (err) console.error(err);

  fs.readdir(path.join(__dirname, "/files-copy"), (err, files) => {
    if (err) {
    }
    (files || []).forEach((file) =>
      fs.unlink(path.join(__dirname, `/files-copy/${file}`), function (err) {
        if (err) {
        }
      })
    );
  });

  fs.readdir(sourceFolderPath, (err, files) => {
    if (err) console.error(err);
    for (const file of files) {
      const filePath = path.resolve(sourceFolderPath, file);
      const copiedFilePath = path.resolve(copyFolderPath, file);
      fs.copyFile(
        filePath,
        copiedFilePath,
        fs.constants.COPYFILE_FICLONE,
        (err) => {
          if (err) {
          }
        }
      );
    }
  });
});
