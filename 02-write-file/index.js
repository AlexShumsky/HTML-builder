const fs = require("fs");
const path = require("path");
const process = require("process");
const filePath = path.join(__dirname, "text.txt");
const writebleStream = fs.createWriteStream(filePath, "utf8");

process.stdout.write("Hello! Inter your message please: \n");
process.stdin.resume();
process.stdin.on("data", (chunk) => {
  if (String(chunk).trim() === "exit") {
    process.exit();
  } else {
    writebleStream.write(chunk);
  }
});
process.on("SIGINT", () => process.exit());
process.on("exit", () =>
  process.stdout.write(
    "Bye and Thanks for your job! You can try one more time)"
  )
);
