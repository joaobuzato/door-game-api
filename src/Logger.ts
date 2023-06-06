import * as fs from "fs";

export function log(text: string) {
  const row = `\n${text}`;

  fs.appendFile("../logger.csv", row, (err) => {
    if (err) {
      console.error(`ErrorWriting CSV: ${err}`);
    }
  });
}
