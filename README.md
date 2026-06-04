# AI 合同审查 — Word 加载项

内部法务用 Word 任务窗格加载项，页面托管在 **GitHub Pages**，无需本机 `localhost` 或 Node 服务。

## 在线地址

- **任务窗格**：https://bettyzhou029-web.github.io/word-contract-review-addin/src/taskpane.html
- **清单文件**：本仓库根目录 `manifest.xml`

## Word 中使用

1. 下载本仓库的 [`manifest.xml`](./manifest.xml)
2. Word → **插入** → **获取加载项** → **上传我的加载项** → 选择该文件
3. **开始** → **合同审查** → **AI 合同审查**

## 部署与更新

详见 **[GITHUB_PAGES.md](./GITHUB_PAGES.md)**（创建仓库、开启 Pages、推送代码）。

更新界面后修改 `src/`、`assets/`，`git push` 即可，约 1～2 分钟生效。

## 本地开发（可选）

需要 localhost 调试时见 `manifest.local.xml` 与 `npm run server`（非日常使用）。
