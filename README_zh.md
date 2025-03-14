# SHIFT Helper

[English](README.md) | [中文](README_zh.md) | [Deutsch](README_de.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Wikang Tagalog](README_tl.md) | [reo Māori](README_mi.md) | [हिन्दी](README_hi.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个专为 Kinetic NZ Bus Tauranga 的司机开发的简单易用的开源排班管理工具，帮助司机们规划每周班次并添加到绝大多数日历应用中。

#### 功能
1. **多 Depot 支持**：支持 Greerton、Papamoa、Maleme 和 Standby 的 Shifts。
2. **School Holiday 模式**：打开 School Holiday 开关，自动调整 Shift 选项。
3. **Public Holiday 模式**：单独设定某天为 Public Holiday，动态更改当日选项。
4. **批量安排 Shifts**：多日重复时，可勾选日期同步选择班次。
5. **日历导出**：生成 .ics 文件，支持主流日历应用（如 Google Calendar、Apple Calendar、Microsoft Outlook Calendar）。
6. **离线可用**：PWA 技术，随时随地使用。

### 如何使用
1. 选择 Depot（如 Greerton）。
2. 挑选一周的任意一天，自动显示以周日为首的排班视图。
3. 通过下拉菜单设置每天班次，勾选复选框批量同步，切换节假日选项调整班次。
4. 点击“Add to Calendar”生成 .ics 文件并导入日历。iPhone Safari 用户可直接导入，无需下载。
5. 点击“Send Feedback”提交建议或数据库错误；查看“About”了解版本和更新。

### 安装
SHIFT Helper 支持浏览器访问和手机安装，提供 PWA（渐进式 Web 应用）体验。以下是针对不同设备的分步说明：

#### 浏览器访问
- 打开任意现代浏览器（如 Chrome、Safari、Edge）。
- 输入网址：https://chenpreston.github.io/shift-helper-pwa/
- 即可直接使用，无需额外安装。

#### 安卓用户
- **步骤**：
  1. 使用 Chrome 浏览器（推荐）打开上述网址。
  2. 点击浏览器右上角的“三点菜单”。
  3. 选择“添加到主屏幕”或“安装应用”。
  4. 确认后，应用图标将出现在主屏幕，点击即可像普通应用一样使用。
- **日历导入**：
  - 点击“Add to Calendar”后，下载 .ics 文件。
  - 打开文件（通常会自动关联 Google Calendar），按提示导入。
- **注意**：支持离线使用，建议保持网络连接以获取最新数据。

#### 苹果用户（iPhone/iPad）
- **步骤**：
  1. 使用 Safari 浏览器打开上述网址（必须使用 Safari 以直接导入日历）。
  2. 点击底部“分享”图标（方框中带向上箭头）。
  3. 选择“添加到主屏幕”。
  4. 确认后，应用图标将出现在主屏幕，点击即可使用。
- **日历导入**：
  - 点击“Add to Calendar”后：
    - **Safari**：直接弹出日历导入提示，按提示添加到 Apple Calendar。
    - **Chrome**：仅下载 .ics 文件，无法直接导入 Apple Calendar。
  - 若使用 Chrome 下载了 .ics 文件，需通过邮件或 AirDrop 将文件发送到 Safari 打开，或使用支持 .ics 的第三方应用（如 Google Calendar App）。
- **重要提示**：
  - 苹果设备上，Chrome 等非 Safari 浏览器无法直接将 .ics 文件导入 Apple Calendar。若平时不使用 Safari，建议仅在安装时使用 Safari 完成上述步骤。安装后，从主屏幕打开应用时，系统会自动调用 Safari 内核运行，无需改变日常使用 Chrome 浏览网页的习惯。
  - 确保 iOS 系统为最新版本，以获得最佳体验。

### 数据来源
数据来自公司提供的最新 Shift Card（截至 2025 年 1 月整理）。日历中包含：班次编号、签到时间、签退时间、用餐地点、用餐时长和间隔时长。

### 技术
- **前端**：HTML、CSS、JavaScript
- **PWA**：Service Worker 实现离线缓存
- **CSV 解析**：PapaParse 库
- **开源**：MIT 许可证，源码见 [GitHub](https://github.com/chenpreston/shift-helper-pwa)