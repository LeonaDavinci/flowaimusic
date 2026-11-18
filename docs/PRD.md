# Flow AI Music 产品需求文档（PRD）

| 项目 | 内容 |
| --- | --- |
| 项目名 | Flow AI Music |
| 域名 | `www.flowaimusic.com` |
| 仓库 | `flowaimusic.git`（main 分支） |
| 文档版本 | v1.0 |
| 日期 | 2026-11-18 |
| 参考产品 | Google Flow Music（https://www.flowmusic.app/），调研时间 2026-11-18 |
| 技术栈 | Next.js 16 App Router + React 19 + TypeScript + 原生 CSS，全站 SSR |
| 当前范围 | 品牌官网 + 产品演示（MVP 前端），不含真实音乐生成服务与账号系统 |

---

## 1. 项目背景与目标

### 1.1 背景

`flowmusic.app`（Google Flow Music，前身 ProducerAI / Riffusion）是 Google Labs 旗下的对话式 AI 音乐创作平台：用户用自然语言与「Producer」对话生成完整歌曲，配合 Lyria 3.5 音乐模型、Veo 音乐视频、Spaces（vibe-code 音频小工具）、社区发现与歌单，形成「创作 → 编辑 → 可视化 → 分享」闭环。

本项目 `www.flowaimusic.com` 参考其**信息架构与产品叙事**，建设一个独立品牌、独立文案、独立视觉的 AI 音乐创作产品官网。

### 1.2 目标

1. **G1 品牌与转化**：首屏 5 秒内说清「输入一句话 → 得到一首歌」，主 CTA 点击直达创作工作台。
2. **G2 SEO 可索引**：全部内容页服务端渲染，具备 title / description / canonical / OG / JSON-LD / sitemap / robots，支持长尾关键词扩展。
3. **G3 产品可信度**：用可交互 Demo（对话式创作台、迷你键盘、试听波形）替代空泛截图，让访客「没登录也能体验」。
4. **G4 工程基线**：`next build` 通过、无类型错误、响应式与可访问性达标，可直接部署到 Vercel / Cloudflare / Node 服务器。

### 1.3 合规边界（重要）

参考站 `robots.txt` 声明 `Content-Signal: search=yes, ai-train=no, use=reference`，允许作为参考、禁止用于训练。本项目：

- 仅借鉴**页面结构、区块顺序、交互模式**这类通用信息架构；
- **不复制**其品牌名、商标、Google / Lyria / Veo 等第三方模型名、宣传文案、图片、音频、曲库、定价数字与代码；
- 全部文案、曲名、歌单、视觉素材与演示数据均为原创或本地生成；
- 不声明与 Google 或参考产品的任何关联。

---

## 2. 参考站页面结构分析（实证）

### 2.1 基本事实

| 项 | 观测值 |
| --- | --- |
| 页面 title | `Google Flow Music` |
| meta description | 生成式 AI 平台：创作 / 混音 / 分享录音室级歌曲，可导演 MV、vibe-code 乐器、个性化声音 |
| canonical | `https://www.flowmusic.app/` |
| OG | `og:title` / `og:description` / `og:site_name` / `og:image`(`/og-image.png`) / `og:url` |
| 技术栈 | Next.js（Pages/App 混合产物）、Tailwind CSS、Webpack、Cloudflare、Google Cloud |
| 字体 | Google Sans / Google Sans Text |
| 配色 | 深色为底（`#070708`、`#1c1c1e`），青蓝 `#1a9bb6` 作强调，大量半透明白/黑叠层 |

### 2.2 首页区块顺序（自上而下）

| # | 区块 | 结构 | 关键元素 |
| --- | --- | --- | --- |
| 1 | 顶栏 | 左 Logo，右操作 | `Log in` / `Sign up` 按钮 |
| 2 | Hero | H1 + 副标题 + 身份标签 + 创作入口 | H1「Welcome to the studio」，副标题「Make any song you can imagine. Unlimited downloads.」；身份切换 `Video creator` / `Just for fun` / `Artist` / `Producer`（本项目已把首个标签改为 `Music creator`） |
| 3 | Get started | H2 + 5 张快捷卡片 | `Make songs for fun` / `Create music for videos` / `Make tracks for my vocal` / `Remix unreleased tracks` / `Make FX / instruments`，`Create` 按钮 |
| 4 | Your new instrument | 左文右示例 | 对话式 Producer 叙事 + 3 张歌曲卡（曲名 / 风格）+ `AI Music Video` 入口 |
| 5 | Direct your own music videos | 左文右视频卡 | 模型能力叙事 + `Build` 按钮 |
| 6 | Vibe-code Spaces | 左文右可交互 Demo | 「Mini Keyboard」钢琴键 C~C，hover 可发声；URL 提示 `flowmusic.app/space/piano` |
| 7 | Share what you make | 左文右歌单卡 | 3 张歌单（名称 + 歌曲数） |
| 8 | Learns your style | 标题 + 功能网格 | `Remix your audio` / `Audio effects` / `Stem split` / `Daily credits` / 更多 |
| 9 | Ready to create? | 底部大 CTA | `Get Started` + 「Free to start · No credit card required」 |
| 10 | 页脚 / 快捷入口 | 链接组 | `Create song` / `Create music video` / `Create playlist` / `Create your own music space` / `Profile` / `Terms` / `Privacy` |

### 2.3 信息架构（sitemap.xml 实证）

| 路径 | 定位 | 权重 |
| --- | --- | --- |
| `/` | 官网首页 | 1.0 / daily |
| `/explore` | 社区发现，卡片流（曲名、prompt、作者、播放数、点赞数） | 0.8 / daily |
| `/pricing` | 4 档订阅：Free / Starter / Plus / Member | 0.7 / weekly |
| `/session?t=true` | 对话式创作工作台 | 0.9 |
| `/library/videos` `/library/playlists` `/library/spaces` | 个人资产库 | 0.9 |
| `/profile` | 个人主页 | 0.9 |
| `/privacynotice` | 隐私声明 | 0.3 |

其余导航探测：`/terms`、`/privacy` 返回 307（外链到主域条款页）。

### 2.4 值得借鉴 / 需要改进

| 借鉴 | 参考站问题 → 本项目对策 |
| --- | --- |
| 首屏即创作入口（不是「了解更多」） | 首页未给定价明细 → 独立 `/pricing` 页并给出 FAQ |
| 身份标签分流不同用户场景 | 深色沉浸视觉对 SEO 内容页不友好 → 明亮高对比 + 深色仅用于「工作室」演示卡 |
| 可交互 Demo（钢琴、播放器）替代静态截图 | 全部文案偏品牌叙事，缺少长尾关键词承载 → 增加 `/features`、`/guides/*` 内容页 |
| 创作 → 编辑 → 视频 → 分享的完整叙事链 | 生成能力依赖登录 → MVP 提供免登录可玩的演示台 |
| 底部单一强 CTA + 免信用卡承诺 | 无结构化数据 → 全站 JSON-LD（SoftwareApplication / FAQPage / BreadcrumbList） |

---

## 3. 产品定位

**一句话**：Flow AI Music 是「把一句话变成一首完整歌曲」的对话式 AI 音乐工作室——从灵感、编曲、人声到 MV 与分享，全程在同一个创作流里完成。

| 维度 | 定义 |
| --- | --- |
| 品类 | AI 音乐生成 / 创作工具（B2C + 创作者经济） |
| 核心差异 | ① 对话式迭代而非一次性抽卡；② 生成 → 局部重制 → 分轨 → MV → 发布一体化；③ 免登录可体验的 Demo |
| 目标用户 | 视频创作者（配乐）、独立音乐人 / 唱作人（伴奏与 demo）、制作人（快速试想法）、纯兴趣玩家（玩梗与送礼） |
| 内容语言 | 英文（国际站，便于长尾 SEO），后续可加多语言子路径 |
| 商业模式 | Freemium：每日免费额度 + 订阅（积分 / 并发 / 商用授权） |
| 品牌调性 | 明亮、阳光、高对比、有节奏感；开发者气质但不冰冷 |

---

## 4. 用户故事

| ID | 作为… | 我希望… | 以便… |
| --- | --- | --- | --- |
| US-1 | 视频博主 | 输入视频情绪与时长直接生成配乐 | 不用去素材库翻版权音乐 |
| US-2 | 唱作人 | 生成无人声伴奏并保留我的人声 | 快速做 demo |
| US-3 | 制作人 | 只重制副歌 / 拆分 stems | 不用整首重生成 |
| US-4 | 兴趣玩家 | 不登录就能点几下听到东西 | 先玩再决定要不要注册 |
| US-5 | 站长 / SEO | 每个内容页都有独立可索引的标题与结构化数据 | 长尾关键词获得自然流量 |
| US-6 | 付费用户 | 清楚看到各档积分与并发差异 | 做出订阅决策 |

---

## 5. 信息架构与页面清单

```
/                     首页（转化主路径）
├── /studio           创作工作台（免登录 Demo，?brief= 支持深链）
├── /explore          发现 / 社区曲库（SSR 筛选 ?genre=）
├── /features         功能总览（6 大能力 + 工作流）
├── /pricing          定价（4 档 + 对比表 + FAQ）
├── /ai-music-creator  长尾词落地页（ai music creator / flow music ai）
├── /guides
│   └── /ai-music-generator   长尾 SEO 内容页（What / How / FAQ）
├── /library          我的作品库（空状态 + 三类入口）
│   ├── /library/playlists
│   ├── /library/videos
│   └── /library/spaces
├── /terms            服务条款
└── /privacy          隐私政策
```

| 页面 | 渲染 | 主要关键词 | 优先级 |
| --- | --- | --- | --- |
| `/` | SSR | ai music generator, **ai music creator**, flow music ai | P0 |
| `/studio` | SSR + 客户端交互 | create music with ai, ai music studio | P0 |
| `/explore` | SSR（searchParams 驱动） | ai generated songs, ai music community | P0 |
| `/features` | SSR | ai music editor, stem split, ai music video | P1 |
| `/pricing` | SSR | ai music pricing, free ai music generator | P1 |
| `/ai-music-creator` | SSR | **ai music creator**, **flow music ai**, flowaimusic | P1 |
| `/guides/ai-music-generator` | SSR | how to make ai music, text to music | P1 |
| `/library/*` | SSR | — | P2 |
| `/terms` `/privacy` | SSR | — | P2 |

### 5.1 品牌写法与关键词策略（v1.1 追加）

| 规则 | 说明 |
| --- | --- |
| 品牌标准写法 | **`Flow AI Music`**（三词、带空格）。全站 UI、title、description、OG、JSON-LD、页脚版权统一使用，禁止再使用原先的连写写法。 |
| 连写词保留位 | `flowaimusic` **仅保留**在域名 `www.flowaimusic.com`、仓库/package 名 `flowaimusic`、Spaces URL 示例与文档的项目标识中，用于命中该品牌长尾搜索词。 |
| 核心长尾词 | `ai music creator`、`flow music ai`。前者落在首页 H1 副区、独立落地页 `/ai-music-creator`、页脚内链与 `SoftwareApplication.keywords`；后者作为 `alternateName` 写入 `Organization` / `SoftwareApplication`，并在首页、落地页、指南页自然出现。 |
| music 词密度 | CTA 由 `Create song` 系列统一改为 `Create music`；身份标签 `Video creator` → `Music creator`；hero 副标题、套餐描述、页脚品牌句、工作台标题均以 music 为主词；避免堆砌，每屏出现 2–4 次即可。 |
| 内链结构 | 首页 capabilities 区块 → `/ai-music-creator`；页脚 Product 组 → `/ai-music-creator`；指南页 → 落地页 → `/features` / `/pricing` / `/studio` / `/explore`。 |
| 页脚 | 去掉「· Demo site」字样；品牌句改为「Made for people who hear music before it exists.」 |

---

## 6. 页面详细需求

### 6.1 全局

- **顶栏**（sticky，滚动后加细底边）：Logo（音符波形）+ 主导航 `Explore / Features / Pricing / Guides` + `Log in`（幽灵按钮）+ `Start creating`（实色主按钮）。移动端折叠为菜单按钮。
- **页脚**：4 列（Product / Create / Library / Legal）+ 品牌行 + 版权；含 `Terms` `Privacy` `Sitemap` 与 `AI music creator` 内链。
- **图标资产**：品牌标记统一使用 `public/logo.png`（128×128 RGBA PNG），导航栏与页脚以 `<img>` 渲染，`public/favicon.ico`（16/32/48/64/128/256 多尺寸）用于浏览器标签；**不保留 SVG 版 logo**。`layout.tsx` 的 `icons` 声明 `icon` / `apple` / `shortcut`，`Organization` 结构化数据的 `logo` 指向 PNG。logo 的 `alt` 为 `flow ai music`。
- **作品封面**：`public/album-cover.png`（1080×800，紫粉橙渐变 + 双波形 + 同心圆，本地生成无外部依赖）用于 `/explore` 的作品卡片，`<img alt="flow ai music" loading="lazy">` 铺满封面区，播放按钮与时长标签保持在上层。
- **底部 CTA 条**：所有内容页复用，「Ready to make something?」+ 主按钮 + 「Free to start · No credit card required」。
- 激活态控件**必须实色背景 + 高对比文字**（不使用半透明底叠字）。

### 6.2 首页 `/`

| 区块 | 内容与交互 | 验收 |
| --- | --- | --- |
| Hero | H1 以品牌词开头：「Flow AI Music」+「Turn the song in your head into a real one.」+ 副标题（含 `AI music creator`）+ 身份标签（`Music creator / Just for fun / Artist / Producer`）+ 创作输入框 + `Create music` 按钮 + 右侧「工作室预览卡」（深色、动态波形、正在生成的对话气泡） | 一个 H1 且文本以 `Flow AI Music` 起始；输入提交跳转 `/studio?brief=<urlencoded>` |
| Quick starts | H2「Start from anywhere」+ 5 张快捷卡（写首歌 / 视频配乐 / 给我的人声做伴奏 / 重制 / 音效与乐器），点击带入对应 brief | 卡片可键盘聚焦，hover 有位移 |
| Studio story | 左文右「对话式 Producer」演示：3 条消息 + 3 张曲目卡 | 文案原创，不出现第三方模型名 |
| Music videos | 左文右 MV 视觉卡（渐变 + 播放按钮 + 时长） | 播放按钮有视觉状态 |
| Spaces | 左文右**可发声迷你键盘**（C4~C5，hover/点击触发 Web Audio 合成音），附 URL 提示 | 点击有按键高亮 + 发声，无音频文件 |
| Share | 3 张歌单卡（名称 / 曲目数 / 渐变封面） | 卡片链接到 `/explore` |
| Personalization | 6 宫格能力：Remix / FX / Stem split / Daily credits / Lyrics / Downloads | 图标 + 短描述 |
| Social proof | 3 条创作者评价（原创文案） | 与定价页不冲突 |
| Final CTA | 主按钮 + 免信用卡说明 | 与全局 CTA 不重复出现两次 |

### 6.3 创作工作台 `/studio`

- SSR 读取 `searchParams.brief` 并渲染为「你的第一条需求」，体现真实服务端渲染。
- 左侧：创作会话列表（mock）+ 新建按钮；中间：消息流（用户 brief → 助手回复 → 生成中卡片）；底部：输入框 + 风格 chip + 生成按钮。
- 客户端交互：提交追加一条消息并显示模拟生成进度（0→100%，2 秒），完成后输出一张「新曲目卡」。**不调用真实 AI**。
- 右侧：当前曲目参数（BPM / 调性 / 时长 / 分轨开关）+ 下载按钮（disabled + 提示「Demo mode」）。

### 6.4 发现页 `/explore`

- SSR 依据 `?genre=` 过滤曲目数据；分类导航为带 query 的链接（可被爬虫抓取）。
- 曲目卡：渐变封面、曲名、prompt 摘要、作者、风格标签、播放/点赞数、时长、试听按钮（视觉波形动画）。
- 顶部：H1 + 排序说明 + 统计条（曲目数 / 创作者数）。

### 6.5 功能页 `/features`

6 个能力模块（对话式生成 / 局部重制 / 分轨与效果 / 音乐视频 / Spaces / 分享与个性化），每块含 H2、说明、要点列表、示意视觉；底部工作流时间线 4 步。

### 6.6 定价页 `/pricing`

4 档卡片（Free / Creator / Pro / Studio），中间档标注「Most popular」；月/年切换（年付 8 折，客户端）；功能对比表；FAQ 6 条（`<details>`）；`FAQPage` JSON-LD。

### 6.7 SEO 内容页 `/guides/ai-music-generator`

H1 + 目录锚点 + 3 段正文（What / How / Use cases）+ 3 条 FAQ + `BreadcrumbList` / `Article` JSON-LD + 内链到 `/studio`、`/features`、`/pricing`。作为后续长尾文章模板。

### 6.8 长尾词落地页 `/ai-music-creator`（v1.1 新增）

面向 `ai music creator` / `flow music ai` 的独立可索引页面：H1「An AI music creator that keeps up with your ideas.」+ 侧边目录 + 5 段正文（What / Why Flow Music AI / Who it is for / Workflow / FAQ）+ `FAQPage` 与 `BreadcrumbList` JSON-LD + 内链到 `/studio`、`/features`、`/pricing`、`/explore`、`/guides/ai-music-generator`。FAQ 中自然解释 `flowaimusic` 与 `Flow Music AI` 为同一产品，命中品牌长尾词。已加入 sitemap（priority 0.7 / weekly）与页脚 Product 组内链。

### 6.9 其他

`/library/*` 空状态页（引导去 `/studio`）；`/terms`、`/privacy` 简明条款（明确 Demo 数据、无真实支付、无音频上传）；`not-found` 自定义 404。

---

## 7. 功能需求（FR）

| ID | 需求 | 说明 | 优先级 |
| --- | --- | --- | --- |
| FR-1 | 全站 SSR | 所有路由 `export const dynamic = 'force-dynamic'`，Server Components 渲染首屏 HTML | P0 |
| FR-2 | 创作深链 | 首页输入框 → `/studio?brief=`；searchParams 服务端读取 | P0 |
| FR-3 | 交互式 Demo | 迷你键盘 Web Audio 发声、工作台模拟生成进度、试听波形动画 | P0 |
| FR-4 | SSR 筛选 | `/explore?genre=` 服务端过滤，分类为真实 `<a href>` | P0 |
| FR-5 | SEO 元数据 | 每页 `generateMetadata`（title/description/canonical/OG/Twitter/alternates） | P0 |
| FR-6 | 结构化数据 | 首页 `SoftwareApplication` + `Organization`（含 `alternateName: Flow Music AI`）；定价页 `/ai-music-creator` 页 `FAQPage`；指南页 `Article` + `BreadcrumbList` | P0 |
| FR-7 | sitemap / robots | `app/sitemap.ts`、`app/robots.ts`，域名指向 `https://www.flowaimusic.com` | P0 |
| FR-8 | OG 图 | `app/opengraph-image.tsx` 用 `ImageResponse` 服务端生成 1200×630 | P1 |
| FR-9 | 响应式 | 320 / 768 / 1024 / 1440 断点，移动导航折叠 | P0 |
| FR-10 | 可访问性 | 语义化标签、可见 focus ring、按钮 aria-label、色彩对比 ≥ 4.5:1、`prefers-reduced-motion` | P1 |
| FR-11 | 埋点占位 | `data-track` 属性标注 CTA / 生成 / 试听 / 定价点击，预留 `window.dataLayer` | P2 |
| FR-12 | 品牌与词规范 | 全站品牌写 `Flow AI Music`；`flowaimusic` 仅保留于域名 / 仓库 / 示例 URL；`ai music creator`、`flow music ai` 在首页、落地页、指南页与结构化数据中自然出现 | P0 |
| FR-13 | 图标资产 | 页面 logo 使用 `logo.png`（128×128 PNG，非 SVG）；`favicon.ico` 多尺寸用于标签页；两者在 `layout.tsx` 声明，站点内无 SVG logo 引用；logo 与作品封面图 `alt` 均为 `flow ai music` | P0 |

---

## 8. 数据模型（前端演示数据）

```ts
type Track = {
  id: string; title: string; prompt: string; creator: string;
  genre: 'Pop' | 'Electronic' | 'R&B' | 'Lo-fi' | 'Cinematic' | 'Hip-Hop';
  plays: string; likes: string; duration: string; bpm: number;
  gradient: [string, string];
};
type Playlist = { id: string; title: string; count: number; gradient: [string, string] };
type Plan = { id: string; name: string; monthly: number; credits: string;
             concurrency: number; features: string[]; featured?: boolean };
```

数据集中在 `src/lib/content.ts`，服务端直接 import；无数据库、无 API 路由（后续接后端时替换为 `fetch(..., { cache: 'no-store' })` 即可保持 SSR）。

---

## 9. 非功能需求（NFR）

| 类别 | 要求 |
| --- | --- |
| SSR | `next build` 输出中主要路由标记为 `ƒ (Dynamic)`；首屏 HTML 含完整文案，禁用纯客户端渲染内容页 |
| 性能 | 首页 JS < 200KB（gzip 目标），LCP < 2.5s；无外部图片依赖，封面用 CSS 渐变 + SVG；字体走系统栈 + 可选 Google Fonts 异步加载 |
| SEO | 唯一 H1、canonical 自指、OG 完整、sitemap 覆盖全部公开路由、robots 允许抓取并声明 sitemap |
| 兼容 | Chrome / Edge / Safari / Firefox 最近两个版本；移动 Safari 的 Web Audio 需用户手势触发 |
| 安全 | 无用户输入回显 XSS（React 默认转义）、无密钥入仓、无第三方追踪脚本 |
| 部署 | `npm run build && npm run start` 可跑；同时兼容 Vercel / Cloudflare Node 运行时 |
| 合规 | 不出现第三方商标；Demo 数据显著标注；条款页说明无真实支付与上传 |

---

## 10. 埋点设计（占位）

| 事件 | 触发元素 | 参数 |
| --- | --- | --- |
| `cta_click` | 所有主 CTA | `placement`, `label` |
| `brief_submit` | 首页 / 工作台输入提交 | `brief_length`, `persona` |
| `demo_play` | 键盘按键 / 试听按钮 | `note` / `track_id` |
| `plan_select` | 定价卡片按钮 | `plan_id`, `billing` |
| `nav_click` | 顶栏与页脚链接 | `href` |

MVP 仅写 `data-track` 属性与 `dataLayer.push` 占位，不加载分析脚本。

---

## 11. 验收标准

1. `npm run build` 与 `npx tsc --noEmit` 均无错误。
2. `curl -s http://localhost:3100/ | grep "Flow AI Music"` 能在服务端 HTML 中命中首屏 H1（证明 SSR 且品牌词位于 H1 开头）；`/favicon.ico` 与 `/logo.png` 均返回 200，PNG 尺寸为 128×128，HTML 中品牌标记为 `<img src="/logo.png">`，无 `icon.svg` 引用。
3. 主要路由构建产物标记为动态渲染；`/explore?genre=Electronic` 返回过滤后的 HTML。
4. 每页 `<title>` / `<meta name="description">` / `<link rel="canonical">` 唯一且正确；`/sitemap.xml`、`/robots.txt` 返回 200。
5. 桌面与 375px 宽度下无横向溢出；键盘 Tab 可遍历所有交互控件且焦点可见。
6. 首页交互链路可走通：输入 brief → 跳 `/studio` → 显示该 brief → 点击生成出现曲目卡；迷你键盘点击发声并有高亮。
7. 站内不出现参考站品牌名与其第三方模型名；无外部图片/音频资源请求失败。
8. 全站品牌写 `Flow AI Music`（无连写形式）；`flowaimusic` 仅出现在域名 / 仓库 / 示例 URL；`ai music creator` 与 `flow music ai` 在首页、落地页、指南页 HTML 与结构化数据中可命中；页脚不再出现 `Demo site`；首屏身份标签为 `Music creator`，主 CTA 为 `Create music`。

---

## 12. 范围边界与后续迭代

**本期不做**：真实 AI 生成 / 音频上传 / 账号与 OAuth / 支付 / 数据库 / 评论 / 多语言 / CMS。

**下一期建议**：

1. 接 `fetch` 到音乐生成 API，工作台改为流式（SSE / streaming）输出；
2. 加 `/guides/*` 长尾文章集群（如 `ai-song-generator-for-youtube`、`text-to-music-no-copyright`），沿用本 PRD 的 SEO 模板；
3. 账号 + 资产库真实持久化；
4. 接入分析平台，把 `data-track` 占位替换为真实事件上报。

---

## 13. 风险登记

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| 参考站品牌/内容侵权 | 法务风险 | 见 §1.3，仅借鉴结构，文案与素材原创 |
| SSR 被静态优化降级为 SSG | SEO 与需求不符 | 显式 `dynamic = 'force-dynamic'`，构建后校验 `ƒ` 标记 |
| Web Audio 在移动端被拦截 | Demo 无声 | 要求用户手势触发，失败时保留视觉反馈 |
| OG 图生成依赖 Edge 运行时 | 构建/部署差异 | 若部署环境不支持，回退为 `public/og-image.png` |
| 外部字体加载失败 | 视觉降级 | 系统字体栈兜底，首屏不依赖外部字体 |

---

## 14. 实施与验证记录（2026-11-18 初版 / 2026-11-19 v1.1 修订）

| 项 | 结果 |
| --- | --- |
| `npm run typecheck` | 通过，0 错误 |
| `npm run build`（Next.js 16.4.6 / Turbopack） | 通过；13 个内容路由（另含 `/_not-found`）标记为 `ƒ`（Dynamic SSR），`sitemap.xml` / `robots.txt` / `opengraph-image` 静态生成 |
| 首屏 SSR 校验 | 服务端 HTML 的 H1 文本为 `Flow AI Music Turn the song in your head into a real one.`，品牌词位于 H1 开头；canonical 为 `https://www.flowaimusic.com` |
| 图标资产 | `public/favicon.ico`（16/32/48/64/128/256）与 `public/logo.png`（128×128 RGBA）已生成并由 `layout.tsx` 声明；两者 HTTP 200（`image/x-icon` / `image/png`）；header/footer 的 `BrandMark` 由内联 SVG 改为 PNG `<img>`，`public/icon.svg` 已移除，`/icon.svg` 返回 404 |
| 路由状态 | `/`、`/ai-music-creator`、`/explore`、`/studio`、`/features`、`/pricing`、`/guides/ai-music-generator`、`/library/*`、`/terms`、`/privacy`、`/sitemap.xml`、`/robots.txt` 全部 200；未知路径返回自定义 404 |
| SSR 筛选 | `/explore` 12 张卡片，`?genre=Electronic` 2 张，`?genre=R&B` 2 张；`/studio?brief=...` 的 brief 出现在服务端 HTML |
| 品牌与词规范 | 源码与文档内 `FlowAI`（连写）出现 0 次；`flowaimusic` 仅保留在域名、package/仓库名、Spaces 示例 URL 与 `/ai-music-creator` 长尾页；`ai music creator` / `flow music ai` 在首页、落地页、指南页与 JSON-LD 中命中 |
| 文案修订 | 主 CTA `Create music`；身份标签 `Music creator`；页脚无 `Demo site`；`Video creator` 在 src 中出现 0 次 |
| 品牌合规 | `src/`、`public/`、`README.md` 内无参考站域名与第三方模型名（PRD 第 2 节的分析引用除外） |
| 本地预览 | 生产模式运行于 `http://127.0.0.1:3100`（3000 端口被其他项目占用） |

> 说明：目标 GitHub 仓库 `LeonaDavinci/flowaimusic` 已存在且为空仓库；本机凭证所属账号为 `LeonaDavinci`，GitHub 上不存在独立的 `sixwaters` 账号，因此提交作者设为 `sixwaters <sixwaters@qq.com>`（仓库级 local 配置），推送目标为该已有仓库的 `main` 分支。
