# Claude Code Club 网站

欢迎来到 Claude Code Club！这是一个专注于 Claude AI 编程学习的中文社区网站。

## 🌟 项目特色

- **全中文内容**：专为中文用户设计的 Claude AI 学习资源
- **SEO 优化**：完整的 SEO 配置，包括 meta 标签、sitemap、robots.txt
- **响应式设计**：适配桌面端和移动端设备
- **现代化架构**：使用现代 Web 技术构建
- **易于部署**：支持 GitHub Pages 和 Cloudflare 部署

## 📁 项目结构

```
ccclub.club/
├── index.html              # 首页
├── styles/
│   ├── main.css            # 主样式文件
│   └── tutorial.css        # 教程页面样式
├── scripts/
│   └── main.js             # 主要 JavaScript 功能
├── tutorials/              # 教程页面
│   ├── claude-basics.html
│   ├── prompt-engineering.html
│   └── code-generation.html
├── examples/               # 示例页面
│   ├── python-data-analysis.html
│   └── web-development.html
├── assets/                 # 静态资源（图片、图标等）
├── sitemap.xml            # 搜索引擎站点地图
├── robots.txt             # 搜索引擎爬虫规则
└── README.md              # 项目说明
```

## 🚀 部署指南

### GitHub Pages 部署

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为源
4. 访问 `https://yourusername.github.io/repository-name`

### Cloudflare Pages 部署

1. 在 Cloudflare 控制台创建新的 Pages 项目
2. 连接到 GitHub 仓库
3. 设置构建配置：
   - 构建命令：留空（静态站点）
   - 构建输出目录：`/`
4. 配置自定义域名 `ccclub.club`

## 🛠️ 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/ccclub.club.git
cd ccclub.club
```

2. 使用本地服务器运行：
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 或使用 PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

## 📝 内容管理

### 添加新教程

1. 在 `tutorials/` 目录下创建新的 HTML 文件
2. 使用现有教程作为模板
3. 更新首页的教程链接
4. 更新 `sitemap.xml`

### 添加新示例

1. 在 `examples/` 目录下创建新的 HTML 文件
2. 使用现有示例作为模板
3. 更新首页的示例链接
4. 更新 `sitemap.xml`

## 🎨 样式定制

- 主要样式在 `styles/main.css`
- 教程页面样式在 `styles/tutorial.css`
- 颜色主题可以通过修改 CSS 变量调整
- 响应式断点：768px（移动端）

## 📊 SEO 优化

网站已包含完整的 SEO 优化：

- **Meta 标签**：每个页面都有独特的 title、description、keywords
- **Open Graph**：支持社交媒体分享
- **结构化数据**：使用语义化 HTML 标签
- **站点地图**：`sitemap.xml` 帮助搜索引擎索引
- **Robots.txt**：指导搜索引擎爬虫行为
- **规范链接**：每个页面都有 canonical URL

## 🔧 技术栈

- **HTML5**：语义化标记
- **CSS3**：现代样式和响应式设计
- **JavaScript**：交互功能和用户体验
- **无框架**：纯静态站点，加载速度快

## 📱 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 🤝 贡献指南

欢迎贡献内容和改进！

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-tutorial`
3. 提交更改：`git commit -m 'Add new tutorial'`
4. 推送分支：`git push origin feature/new-tutorial`
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 📞 联系我们

- 网站：https://ccclub.club
- 邮箱：contact@ccclub.club
- GitHub：https://github.com/yourusername/ccclub.club

---

© 2024 Claude Code Club. 保留所有权利。