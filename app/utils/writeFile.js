import fetchData from "./fetchData.js";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
const _fileName = fileURLToPath(import.meta.url);
const _pathName = path.dirname(_fileName);
function writeFile(newData, fileName) {
  const data = fetchData(fileName);
  const filePath = path.join(process.cwd(), "app", "data", `${fileName}.json`);
  const books = [...data, newData];

  writeFileSync(filePath, JSON.stringify({ [fileName]: books }));
}
export default writeFile;
