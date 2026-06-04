/**
 * 生成适配 GitHub Pages 的 manifest.xml
 * 用法: node scripts/build-manifest-github.js
 *       node scripts/build-manifest-github.js bettyzhou029-web word-contract-review-addin
 */
const fs = require("fs");
const path = require("path");

const githubUser = process.argv[2] || "bettyzhou029-web";
const repoName = process.argv[3] || "word-contract-review-addin";
const baseUrl = ("https://" + githubUser + ".github.io/" + repoName).replace(/\/$/, "");

const root = path.join(__dirname, "..");
const templatePath = path.join(root, "manifest.template.xml");
const localhostPath = path.join(root, "manifest.local.xml");
const outPath = path.join(root, "manifest.xml");

let templateFile = templatePath;
if (!fs.existsSync(templateFile)) {
  templateFile = localhostPath;
}
if (!fs.existsSync(templateFile)) {
  const fallback = path.join(root, "manifest.xml");
  if (!fs.existsSync(fallback)) {
    console.error("未找到 manifest.template.xml 或 manifest.local.xml");
    process.exit(1);
  }
  if (!fs.existsSync(localhostPath)) {
    let xml = fs.readFileSync(fallback, "utf8");
    if (xml.indexOf("localhost:3000") !== -1) {
      fs.writeFileSync(localhostPath, xml, "utf8");
      console.log("已备份 localhost 版本为 manifest.local.xml");
    }
  }
  templateFile = localhostPath;
}

const localhost = "https://localhost:3000";
const githubOrigin = "https://" + githubUser + ".github.io";
let xml = fs.readFileSync(templateFile, "utf8");
const count = (xml.match(/https:\/\/localhost:3000/g) || []).length;
xml = xml.split(localhost).join(baseUrl);
if (xml.indexOf(githubOrigin) === -1) {
  xml = xml.replace(
    "</AppDomains>",
    "    <AppDomain>" + githubOrigin + "</AppDomain>\n  </AppDomains>"
  );
}

fs.writeFileSync(outPath, xml, "utf8");

console.log("");
console.log("GitHub Pages 基址: " + baseUrl);
console.log("任务窗格 URL:     " + baseUrl + "/src/taskpane.html");
console.log("已写入 manifest.xml（替换 " + count + " 处 localhost URL）");
console.log("");
