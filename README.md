# 灵感王 - 小说梗概生成器

一键提取小说核心梗概，并生成10个类似的创意梗概。基于阿里云千问大模型，运行在ESA边缘计算平台。

## 本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护

![阿里云ESA](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

## 功能特点

- 智能提取小说核心梗概（简洁犀利，突出核心冲突）
- 基于梗概生成10个类似创意（大脑洞、爆炸性情节、多重反转）
- 支持多种类型：追妻火葬场、世事无常、复仇爽文、悬疑等
- 用户可自行配置千问API Key（本地存储，安全可靠）
- 完美适配移动端，响应式设计
- 暗黑科技风UI，避免AI味儿

## 技术栈

- 前端：React 18 + TypeScript + Vite + Tailwind CSS
- 边缘计算：ESA Pages 边缘函数
- AI模型：阿里云千问（qwen-plus）
- 部署：阿里云ESA Pages

## How We Use Edge

本项目充分利用了ESA边缘计算的优势：

1. **边缘函数处理AI请求**
   - 所有千问API调用都在边缘函数中完成
   - 用户API Key不会暴露给前端，保证安全性
   - 边缘节点就近处理请求，降低延迟

2. **全球加速**
   - 静态资源通过ESA CDN全球分发
   - 用户访问自动路由到最近的边缘节点
   - 大幅提升国际用户访问速度

3. **无服务器架构**
   - 无需维护后端服务器
   - 自动弹性伸缩，应对流量波动
   - 按需付费，降低运营成本

4. **边缘安全防护**
   - ESA提供DDoS防护和WAF
   - 保护API调用不被滥用
   - 确保服务稳定可靠

## 本地开发

### 前置要求

- Node.js 18+
- npm 或 pnpm

### 安装依赖

```bash
cd frontend
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

## 部署到ESA Pages

### 1. 推送到GitHub

```bash
git init
git add .
git commit -m "feat: 初始化灵感王项目"
git remote add origin https://github.com/1195214305/Inspiration King.git
git push -u origin main
```

### 2. 在ESA控制台创建Pages项目

- 选择GitHub仓库
- 配置构建参数（已在esa.jsonc中配置，无需手动填写）
- 点击部署

### 3. 配置千问API Key

部署完成后，访问网站：
1. 点击右上角设置按钮
2. 输入您的千问API Key
3. 保存（API Key存储在浏览器本地）

## 获取千问API Key

1. 访问[阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 登录并进入控制台
3. 创建应用并获取API Key

## 使用说明

1. 在输入框中粘贴小说文本或故事梗概
2. 点击"提取梗概并生成创意"按钮
3. 系统会先提取核心梗概
4. 然后生成10个类似的创意梗概
5. 点击复制按钮可快速复制梗概内容

## 生成公式

本项目基于以下公式生成高质量梗概：

- **核心冲突** = 欲望/需求 × 致命障碍 × 代价
- **独特元素** = 反套路设定 + 象征性细节
- **情感爆发点** = 伏笔 × 转折点时机 × 心理冲击
- **不可避免的结果** = 逻辑闭环 × 余韵设计

## 项目结构

```
36_InspirationKing_灵感王/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # React组件
│   │   │   └── SettingsModal.tsx
│   │   ├── App.tsx          # 主应用
│   │   ├── main.tsx         # 入口文件
│   │   └── index.css        # 全局样式
│   ├── public/              # 静态资源
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── functions/               # 边缘函数
│   ├── index.js            # 统一入口
│   └── api/
│       └── generate.js     # 梗概生成接口
├── esa.jsonc               # ESA配置文件
└── README.md
```

## 特色功能

1. **智能提取**：使用千问大模型深度理解小说文本，提取核心冲突和情感爆发点
2. **创意生成**：基于提取的梗概，生成10个风格相似但情节不同的创意
3. **类型多样**：支持追妻火葬场、复仇爽文、悬疑等多种热门类型
4. **反套路设计**：严格禁止AI或网络元素，避免千篇一律
5. **移动优先**：完美适配手机端，随时随地激发灵感

## 评选维度

- **创意卓越**：独特的梗概生成算法，暗黑科技风UI设计
- **应用价值**：为小说作者提供灵感，提升创作效率
- **技术探索**：充分利用ESA边缘函数+千问AI，展示边缘计算在AI应用中的优势

## 开源协议

MIT License

## 作者

项目作者：[您的名字]
GitHub：https://github.com/1195214305

## 致谢

- 感谢阿里云ESA提供边缘计算平台
- 感谢阿里云千问提供强大的AI能力
