import { execFile } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const works = JSON.parse(await readFile(path.join(root, "works.json"), "utf8"));

await mkdir(path.join(root, "assets/cases"), { recursive: true });

for (const work of works) {
  const output = path.join(root, work.screenshot);
  try {
    await execFileAsync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=1500,900",
        `--screenshot=${output}`,
        work.url,
      ],
      { timeout: 30000 },
    );
    console.log(`ok ${work.screenshot}`);
  } catch (error) {
    console.log(`failed ${work.screenshot}: ${error.message}`);
  }
}
