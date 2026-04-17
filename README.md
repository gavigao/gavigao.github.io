# 政国中统男子足球队官方网站

一个基于 HTML5 + CSS3 + Bootstrap 5 + 原生 JavaScript 的纯静态官网项目，可直接部署到 GitHub Pages，零后端、零数据库、零服务器成本。

## 1. 项目简介

本项目用于记录政国中统男子足球队的历史、荣誉、赛事与成员信息，支持长期维护。

主要特性：

- 8 个独立页面：首页、历史、现役阵容、历届队员、赛事战绩、荣誉殿堂、相册、关于我们
- 响应式设计：电脑和手机均可正常浏览
- 数据文件分离：队员、赛事、荣誉均通过 JSON 管理
- 图表展示：使用 Chart.js 渲染战绩可视化
- 留言板预留：已提供 Waline 嵌入示例代码

## 2. 本地预览方法（VS Code Live Server）

1. 安装 VS Code 插件：Live Server
2. 在 VS Code 打开本项目目录
3. 右键 index.html，点击 Open with Live Server
4. 浏览器会自动打开本地地址（通常是 http://127.0.0.1:5500）

注意：由于页面使用 fetch 读取 JSON，建议通过 Live Server 预览，不要直接双击 HTML 文件打开。

## 3. GitHub 仓库创建步骤（建议仓库名：football-team-website）

1. 打开 GitHub，点击 New repository
2. Repository name 填写：football-team-website
3. 选择 Public
4. 创建仓库后，将本地项目推送到 main 分支

可参考命令：

```bash
git init
git add .
git commit -m "init: football team static website"
git branch -M main
git remote add origin https://github.com/你的用户名/football-team-website.git
git push -u origin main
```

## 4. GitHub Pages 开启方法

1. 进入仓库页面，点击 Settings
2. 左侧菜单选择 Pages
3. Source 选择 Deploy from a branch
4. Branch 选择 main，文件夹选择 / (root)
5. 点击 Save
6. 等待 1-3 分钟后，页面会生成公开访问链接

## 5. 内容更新教程

### 5.1 更新队员数据

编辑 data/players.json：

- 新增/删除队员对象
- 维护字段：id、name、number、position、group、bio、avatar
- group 可用值：goalkeeper / defender / midfielder / forward

### 5.2 更新赛事数据

编辑 data/matches.json：

- 维护字段：date、season、competition、opponent、score_us、score_them、result、note
- result 使用 W / D / L
- matches.html 会自动按 season 生成筛选按钮
- 图表会自动根据数据重绘

### 5.3 更新荣誉数据

编辑 data/honors.json：

- 团队荣誉：type 填 team
- 个人荣誉：type 填 personal，并补充 player、season 字段

### 5.4 替换队员头像

1. 把图片放入 img/ 目录，例如 img/player-zhangsan.jpg
2. 修改对应队员 avatar 字段，例如：

```json
"avatar": "img/player-zhangsan.jpg"
```

3. 若 avatar 为空字符串，页面会显示默认灰色头像占位

### 5.5 添加相册图片

当前 gallery.html 使用占位块。

替换为真实图片的常见方式：

1. 把图片放到 img/gallery/ 目录（可自行创建）
2. 在 gallery.html 中将占位块替换为 img 标签
3. 同步维护 data-category 和说明文字，保留筛选与弹窗逻辑

## 6. Waline 留言板配置教程

关于我们页面已预留 Waline 示例代码注释。正式启用步骤如下：

1. 准备 LeanCloud 数据库
- 注册 LeanCloud 账号
- 创建应用，获取 APP_ID、APP_KEY、MASTER_KEY

2. 部署 Waline 服务端（推荐 Vercel）
- 使用 Waline 官方模板一键部署到 Vercel
- 在 Vercel 环境变量中设置 LeanCloud 凭据

3. 获取服务端地址
- 部署完成后会得到类似 https://your-waline-server.vercel.app 的地址

4. 在 about.html 启用前端代码
- 找到 Waline 注释代码块
- 将 serverURL 替换为你的服务地址
- 取消注释并保存

5. 提交并推送到 GitHub
- GitHub Pages 更新后，留言板即可上线

## 7. 常见问题

### Q1：GitHub Pages 没有生效怎么办？

- 确认仓库是 Public
- 确认 Pages 分支为 main 且目录是 / (root)
- 确认首页文件名是 index.html
- 提交后等待几分钟再访问

### Q2：页面能打开，但 JSON 数据没显示？

- 不要直接双击 HTML 文件，需使用 Live Server 或 GitHub Pages 访问
- 检查 data/*.json 是否为合法 JSON（注意逗号和引号）
- 打开浏览器控制台查看报错信息

### Q3：图片不显示？

- 检查路径是否正确（大小写和文件后缀）
- 确认图片文件已提交到仓库
- 确认 avatar 字段填写的是相对路径，例如 img/player-a.jpg

### Q4：图表不显示？

- 确认 matches.html 已引入 Chart.js CDN
- 确认 data/matches.json 至少有一条有效数据
- 检查控制台是否存在脚本报错

## 8. 项目目录

```text
/
├── index.html
├── history.html
├── roster.html
├── alumni.html
├── matches.html
├── honors.html
├── gallery.html
├── about.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── charts.js
├── img/
│   └── logo-placeholder.png
├── data/
│   ├── players.json
│   ├── matches.json
│   └── honors.json
└── README.md
```

---

如需后续扩展（例如增加赛季数据页面、球员个人页、真实图床接入），可继续保持纯静态架构，不影响 GitHub Pages 免费托管。
