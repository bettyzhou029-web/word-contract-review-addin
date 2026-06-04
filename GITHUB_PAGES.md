# GitHub Pages 部署说明

## 固定地址

| 用途 | URL |
|------|-----|
| 站点根目录 | https://bettyzhou029-web.github.io/word-contract-review-addin/ |
| 任务窗格 | https://bettyzhou029-web.github.io/word-contract-review-addin/src/taskpane.html |
| Word 侧载清单 | 仓库中的 `manifest.xml`（已指向上述地址） |

## 一、在 GitHub 创建仓库

1. 登录 https://github.com/bettyzhou029-web  
2. 右上角 **+** → **New repository**  
3. 仓库名：`word-contract-review-addin`（须与上面 URL 一致）  
4. 选 **Public**（私有仓需 GitHub Pro 才能用 Pages，建议公开且仅放加载项静态文件）  
5. **不要**勾选 “Add a README”（本地已有代码）  
6. 创建仓库  

## 二、推送代码（在本机项目目录）

```powershell
cd d:\Tools\Cursor\project\word-contract-review-addin

git init
git add .gitignore .nojekyll index.html manifest.xml manifest.template.xml manifest.local.xml src assets scripts/build-manifest-github.js GITHUB_PAGES.md README.md
git commit -m "Deploy Word add-in static files for GitHub Pages"

git branch -M main
git remote add origin https://github.com/bettyzhou029-web/word-contract-review-addin.git
git push -u origin main
```

首次 push 需在浏览器登录 GitHub，或使用 Personal Access Token 作为密码。

## 三、开启 GitHub Pages

1. 打开仓库：https://github.com/bettyzhou029-web/word-contract-review-addin  
2. **Settings** → 左侧 **Pages**  
3. **Build and deployment** → **Source** 选 **Deploy from a branch**  
4. **Branch** 选 `main`，文件夹选 **`/ (root)`**  
5. 点 **Save**  
6. 等待 1～3 分钟，页面上方出现绿色提示：  
   `Your site is live at https://bettyzhou029-web.github.io/word-contract-review-addin/`

## 四、验证

浏览器打开：

- https://bettyzhou029-web.github.io/word-contract-review-addin/src/taskpane.html  

应看到「AI 合同审查」任务窗格界面。

## 五、Word 侧载

1. 从仓库下载或复制 **`manifest.xml`** 到本机  
2. Word：**插入** → **获取加载项** → **上传我的加载项** → 选择 `manifest.xml`  
   或放入共享文件夹后从 **共享文件夹** 标签插入  
3. **开始** → **合同审查** → **AI 合同审查**

之后**无需**在本机运行 `npm start` 或任何本地服务。

## 六、更新加载项页面

修改 `src/` 或 `assets/` 后：

```powershell
git add src assets
git commit -m "Update taskpane UI"
git push
```

Pages 约 1～2 分钟自动更新。若 Word 仍显示旧版，关闭 Word 重开，或删除 `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\` 缓存后重新插入加载项。

## 七、重新生成 manifest（换仓库名时）

```powershell
node scripts/build-manifest-github.js bettyzhou029-web 你的新仓库名
```

然后提交并推送 `manifest.xml`。

## 注意

- 仓库需为 **Public** 才能免费使用 GitHub Pages（除非你有 GitHub Pro）。  
- 后续接入 Dify 时，在 `manifest.template.xml` 的 `<AppDomains>` 增加 Dify 域名，再运行 `build-manifest-github.js` 并 push。  
- 合同正文会发送到 Dify API，请勿把 API Key 写进推送到 GitHub 的前端代码中。
