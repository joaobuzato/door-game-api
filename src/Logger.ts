import * as fs from "fs";
import * as path from "path";

export function log(text: string) {
  const row = `\n${text};`;
  const filePath = path.join(__dirname, "..", "logger.csv");
  fs.appendFile(filePath, row, (err) => {
    if (err) {
      console.error(`ErrorWriting CSV: ${err}`);
    }
  });
}
