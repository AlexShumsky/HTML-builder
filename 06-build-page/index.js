const fs = require("fs");
const path = require("path");

const boundlePath = path.join(__dirname, "project-dist");
const originalIndexPath = path.join(__dirname, "template.html");
const componentsPath = path.resolve(__dirname, "components");
const boundleIndexPath = path.resolve(boundlePath, "index.html");

/*project-dist folder creation */

fs.mkdir(boundlePath, { recursive: true }, () => {});

/* check if index exists, then delete and create new index; else createnew index*/

fs.readFile(boundleIndexPath, (err, file) => {
  if (err) {
  }
  if (file) {
    fs.unlink(boundleIndexPath, () => {});
  }
  fs.copyFile(originalIndexPath, boundleIndexPath, () => {});
});

function buildHtml() {
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
          const componentName = path.basename(file, path.extname(file));

          fs.stat(componentPath, (err, stats) => {
            if (err) {
            }
            if (stats.isFile() && path.extname(file) == ".html") {
              fs.readFile(componentPath, (err, data) => {
                if (err) {
                }
                if (data) {
                  const componentStrData = String(data);
                  htmlText = htmlText.replace(
                    `{{${componentName}}}`,
                    componentStrData
                  );
                }

                const boundleHtmlWs = fs.createWriteStream(
                  boundleIndexPath,
                  "utf8"
                );
                boundleHtmlWs.write(htmlText, (err) => {
                  if (err) buildBundle();
                });
              });
            }
          });
        }
      });
    }
  });
}
function buildStyles() {
  const stylesComponentsPath = path.join(__dirname, "styles");
  const styleBoundlePath = path.resolve(boundlePath, "style.css");
  const stylesArr = [];
  fs.readFile(styleBoundlePath, (err, file) => {
    if (err) {
    }
    if (file) fs.unlink(styleBoundlePath, () => {});
  });
  fs.readdir(stylesComponentsPath, (err, files) => {
    if (err) {
    }
    if (files) {
      for (const file of files) {
        const stylesFile = path.resolve(stylesComponentsPath, file);
        fs.stat(stylesFile, (err, stats) => {
          if (err) {
          }
          if (stats.isFile() && path.extname(file) == ".css") {
            fs.readFile(stylesFile, "utf8", (err, data) => {
              if (err) {
              }
              stylesArr.push(data);
              fs.appendFile(styleBoundlePath, stylesArr.join("\n"), () => {});
            });
          }
        });
      }
    }
  });
}
function copyAssets() {
  const assetsPath = path.join(__dirname, "assets");
  const bundleAssetsPath = path.resolve(boundlePath, "assets");

  function copyRecursively(directory, copyDirectory) {
    fs.readdir(
      path.join(directory),
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) {
        }
        for (let item of files) {
          if (item.isFile()) {
            fs.copyFile(
              path.join(directory, item.name),
              path.join(copyDirectory, item.name),
              () => {}
            );
          } else {
            fs.mkdir(
              path.join(copyDirectory, item.name),
              { recursive: true },
              () => {}
            );
            copyRecursively(
              path.join(directory, item.name),
              path.join(copyDirectory, item.name)
            );
          }
        }
      }
    );
  }

  copyRecursively(assetsPath, bundleAssetsPath);
}

buildHtml();
buildStyles();
copyAssets();
