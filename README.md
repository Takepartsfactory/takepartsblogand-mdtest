# タケパーツファクトリー ウェブサイト

## 🚀 かんたん編集ガイド

このウェブサイトは、プログラミング知識なしで編集できます。
GitHubのウェブ画面から直接ファイルを編集するだけで、自動的にサイトが更新されます。

### 📝 ブログ記事を追加する方法

1. GitHubにログイン
2. `content/posts/` フォルダーを開く
3. 「Add file」→「Create new file」をクリック
4. ファイル名を入力: `2025-08-22-記事タイトル.mdx`
5. 以下のテンプレートをコピーして編集:

```markdown
---
title: "記事のタイトル"
date: "2025-08-22"
tags: ["タグ1", "タグ2"]
excerpt: "記事の概要（100文字程度）"
thumbnail: "/images/thumbnail.jpg"
---

記事の本文をここに書きます。

## 見出し2

### 見出し3

- 箇条書き1
- 箇条書き2

1. 番号付きリスト
2. 番号付きリスト

**太字**や*斜体*も使えます。

![画像の説明](/images/画像ファイル名.jpg)
```

6. 「Commit new file」をクリック
7. 2-3分待つと自動的にサイトに反映されます

### 📄 ページを編集する方法

1. `content/pages/` フォルダーを開く
2. 編集したいページ（例: services.mdx）をクリック
3. 鉛筆アイコン（Edit）をクリック
4. 内容を編集
5. 「Commit changes」をクリック

### 🖼️ 画像を追加する方法

1. `public/images/` フォルダーを開く
2. 「Add file」→「Upload files」をクリック
3. 画像をドラッグ＆ドロップ
4. 「Commit changes」をクリック
5. MDXファイル内で `![説明](/images/ファイル名.jpg)` で参照

### ⚙️ サイト設定を変更する方法

`content/config.json` を編集して以下を変更できます:

- サイト名
- 会社情報
- ナビゲーションメニュー
- 営業時間など

### 🔧 トラブルシューティング

**Q: 変更が反映されない**
A: 2-3分待ってからブラウザをリロード（Ctrl+F5）してください

**Q: エラーが出た**
A: GitHubの「History」から前のバージョンに戻せます

**Q: 画像が表示されない**
A: ファイル名に日本語を使わず、英数字のみにしてください

### 📞 サポート

技術的な問題が発生した場合は、以下にお問い合わせください:

- メール: support@example.com
- 電話: 0532-XX-XXXX

## 🌐 Cloudflare Pages デプロイ設定

### 初回セットアップ

1. Cloudflare Pagesにログイン
2. 「Create a project」をクリック
3. GitHubと連携
4. このリポジトリを選択
5. 以下の設定を入力:

```
Build command: npm run build
Build output directory: out
Node version: 20
```

6. 「Save and Deploy」をクリック

### カスタムドメインの設定

1. Cloudflare Pages → プロジェクト → Custom domains
2. 「Add domain」をクリック
3. `takepartsfactory.co.jp` を入力
4. DNSレコードを設定

## 📊 パフォーマンス目標

- ページ読み込み: 2秒以内
- Lighthouse スコア: 90以上
- モバイル対応: 完全レスポンシブ

## 🔄 更新履歴

- 2025-08-22: サイト公開
- 2025-08-23: ブログ機能追加

## 📁 ファイル構成

### ユーザーが編集するフォルダ
```
content/
├── posts/      # ブログ記事（.mdxファイル）
├── pages/      # 固定ページ（.mdxファイル）
└── config.json # サイト設定
```

### 画像フォルダ
```
public/
└── images/     # すべての画像ファイル
```

### 編集してはいけないフォルダ
```
app/            # Next.js アプリケーション
components/     # React コンポーネント
lib/           # ユーティリティ
```

## 🎯 お知らせ機能

緊急のお知らせがある場合は、`content/pages/home.mdx` の先頭に以下を追加:

```markdown
<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8">
  <p className="font-bold">重要なお知らせ</p>
  <p>お知らせの内容をここに記載します。</p>
</div>
```

## 📱 モバイル対応

このサイトは自動的にスマートフォンやタブレットに対応します。
特別な設定は不要です。

---

**重要**: プログラムファイル（.tsx, .ts, .js）は絶対に編集しないでください。
サイトが動作しなくなる可能性があります。
