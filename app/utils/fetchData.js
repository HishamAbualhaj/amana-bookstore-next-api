import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
const _fileName = fileURLToPath(import.meta.url);
const _pathName = path.dirname(_fileName);

function fetchData(key) {
  const filePath = path.join(process.cwd(), "app", "data", `${key}.json`);
  const file = readFileSync(filePath, "utf-8");
  const arr = JSON.parse(file)[key];

  return arr;
}

export default fetchData;
