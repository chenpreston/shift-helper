# SHIFT Helper

[English](README.md) | [中文](README_zh.md) | [Deutsch](README_de.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Wikang Tagalog](README_tl.md) | [reo Māori](README_mi.md) | [हिन्दी](README_hi.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Kinetic NZ Bus Taurangaのドライバー向けに特別に設計された、シンプルで使いやすいオープンソースのシフト管理ツールで、毎週のシフトを計画し、ほとんどのカレンダーアプリケーションに追加するのをサポートします。

#### 機能
1. **複数デポ対応**: Greerton、Papamoa、Maleme、StandbyのShiftsをサポート。
2. **スクールホリデーモード**: School Holidayスイッチをオンにすると、Shiftオプションが自動的に調整されます。
3. **公休日モード**: 任意の日をPublic Holidayに設定し、その日のオプションを動的に変更可能。
4. **シフトの一括配置**: 複数日にわたる繰り返しシフトを、まとめて選択して同期できます。
5. **カレンダーエクスポート**: .icsファイルを生成し、主流のカレンダーアプリ（例: Google Calendar、Apple Calendar、Microsoft Outlook Calendar）に追加可能。
6. **オフライン利用**: PWA技術により、いつでもどこでも使用可能。

### 使用方法
1. デポを選択（例: Greerton）。
2. 週の任意の日を選択すると、日曜日を起点とするその週のシフトビューが自動表示されます。
3. ドロップダウンメニューで毎日のシフトを設定し、チェックボックスで一括同期、ホリデーオプションを切り替えてシフトを調整。
4. 「Add to Calendar」をクリックして.icsファイルを生成し、カレンダーにインポート。iPhone Safariユーザーはダウンロードせずに直接インポート可能。
5. 「Send Feedback」をクリックして提案やデータベースエラーを送信、または「About」でバージョンと更新情報を確認。

### インストール
SHIFT Helperはブラウザアクセスとモバイルインストールをサポートし、PWA（プログレッシブウェブアプリ）体験を提供します。以下はデバイスごとのステップごとの説明です：

#### ブラウザアクセス
- 最新のブラウザ（例: Chrome、Safari、Edge）を開く。
- URLを入力: https://chenpreston.github.io/shift-helper-pwa/
- 追加のインストールなしで即座に使用可能。

#### Androidユーザー
- **手順**:
  1. Chromeブラウザ（推奨）で上記URLを開く。
  2. 右上隅の「三点メニュー」をタップ。
  3. 「ホーム画面に追加」または「アプリをインストール」を選択。
  4. 確認すると、アプリアイコンがホーム画面に表示され、通常のアプリのように使用可能。
- **カレンダーインポート**:
  - 「Add to Calendar」をクリックすると、.icsファイルがダウンロードされます。
  - ファイルを開く（通常Google Calendarに自動リンク）と、指示に従ってインポート。
- **注意**: オフライン使用をサポート。最新データの取得にはネットワーク接続を推奨。

#### Appleユーザー（iPhone/iPad）
- **手順**:
  1. Safariブラウザで上記URLを開く（カレンダー直接インポートにはSafari必須）。
  2. 下部の「共有」アイコン（上向き矢印付きの四角）をタップ。
  3. 「ホーム画面に追加」を選択。
  4. 確認すると、アプリアイコンがホーム画面に表示され使用可能。
- **カレンダーインポート**:
  - 「Add to Calendar」をクリックすると:
    - **Safari**: カレンダーインポートのプロンプトが表示され、指示に従ってApple Calendarに追加。
    - **Chrome**: .icsファイルのみダウンロードされ、Apple Calendarに直接インポート不可。
  - Chromeで.icsファイルをダウンロードした場合、メールまたはAirDropでSafariに送信して開くか、.icsをサポートするサードパーティアプリ（例: Google Calendar App）を使用。
- **重要な注意**:
  - Appleデバイスでは、Chromeなどの非Safariブラウザは.icsファイルをApple Calendarに直接インポートできません。通常Safariを使用しない場合、上記インストール手順をSafariで一度だけ実行することをお勧めします。インストール後、ホーム画面からアプリを起動すると、システムが自動的にSafariエンジンを使用するため、普段のウェブ閲覧でChromeを引き続き使用できます。
  - 最適な体験のために、iOSシステムを最新バージョンに更新してください。

### データソース
データは会社提供の最新Shift Cardから取得（2025年1月時点で整理）。カレンダーには以下が含まれます: シフト番号、出勤時間、退勤時間、食事場所、食事時間、休憩時間。

### 技術
- **フロントエンド**: HTML、CSS、JavaScript
- **PWA**: Service Workerによるオフラインキャッシング
- **CSV解析**: PapaParseライブラリ
- **オープンソース**: MITライセンス、ソースコードは[GitHub](https://github.com/chenpreston/shift-helper-pwa)で確認可能