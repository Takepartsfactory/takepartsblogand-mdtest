# Take Parts Factory - コンテンツ管理ガイド

このガイドでは、非技術者でもGitHub web interfaceを使って簡単にウェブサイトのコンテンツを編集する方法を説明します。

## 📁 ファイル構成

```
content/
├── config.json          # サイト全体の設定
├── pages/               # 固定ページ
│   ├── home.mdx         # ホームページ
│   ├── about.mdx        # 会社概要
│   └── contact.mdx      # お問い合わせページ
└── posts/               # ブログ記事
    ├── post1.mdx
    └── post2.mdx
```

## 🏠 ホームページの編集

ホームページを編集するには：

1. `content/pages/home.mdx` ファイルを開く
2. GitHubの編集ボタン（鉛筆アイコン）をクリック
3. 内容を編集
4. 下部の「Commit changes」ボタンをクリック

## 📝 新しいブログ記事の追加

### 1. 新しいファイルを作成

1. `content/posts/` フォルダに移動
2. 「Add file」→「Create new file」をクリック
3. ファイル名を入力（例：`new-cnc-technology.mdx`）

### 2. フロントマターの設定

ファイルの最初に以下の形式で情報を追加：

```yaml
---
title: "記事のタイトル"
date: "2024-08-15"
tags: ["CNC旋盤", "精密加工", "製造技術"]
excerpt: "記事の要約文。検索結果やSNSで表示されます。"
thumbnail: "/images/記事画像.jpg"
author: "著者名"
published: true
---
```

### 3. 記事本文の作成

フロントマターの後に、Markdown形式で本文を書きます：

```markdown
# 記事のタイトル

記事の本文をここに書きます。

## セクション見出し

- リスト項目1
- リスト項目2

**太字のテキスト**や*斜体*も使えます。

### サブセクション

1. 番号付きリスト
2. 二番目の項目
```

## 🎨 特別なコンポーネントの使用

### Call to Action（行動喚起）

```markdown
<CallToAction
  title="お問い合わせください"
  description="詳細についてはお気軽にご相談ください"
  buttonText="お問い合わせフォーム"
  buttonLink="/contact"
  variant="primary"
/>
```

### 技術仕様表

```markdown
<TechnicalSpecs
  specs={[
    { label: "加工精度", value: "±0.01mm" },
    { label: "対応材料", value: "ステンレス、アルミ、真鍮" },
    { label: "最大径", value: "φ200mm" }
  ]}
/>
```

### お客様の声

```markdown
<CustomerTestimonial
  quote="素晴らしい品質で大変満足しています。"
  author="田中 太郎"
  company="株式会社サンプル"
/>
```

### 画像ギャラリー

```markdown
<ImageGallery
  images={[
    {
      src: "/images/photo1.jpg",
      alt: "写真の説明",
      caption: "写真のキャプション"
    },
    {
      src: "/images/photo2.jpg",
      alt: "写真の説明2",
      caption: "写真のキャプション2"
    }
  ]}
/>
```

## 📸 画像の追加

1. `public/images/` フォルダに画像をアップロード
2. 記事内で以下のように参照：

```markdown
![画像の説明](/images/filename.jpg)
```

## 🏷️ タグの管理

### 推奨タグ一覧
- `CNC旋盤`
- `精密加工`
- `製造技術`
- `品質管理`
- `ステンレス鋼`
- `アルミニウム`
- `真鍮`
- `工具選定`
- `切削条件`
- `品質向上`

### タグの使い方
- 記事に関連する2-5個のタグを選択
- 一貫したタグ名を使用（表記揺れを避ける）
- 新しいタグが必要な場合は慎重に追加

## ⚙️ サイト設定の変更

`content/config.json` ファイルで以下を変更できます：

- 会社名・説明
- 連絡先情報
- ナビゲーションメニュー
- SNSアカウント情報

## ✅ 記事公開前のチェックリスト

### 必須項目
- [ ] タイトルが魅力的で分かりやすい
- [ ] 日付が正しい
- [ ] 適切なタグが設定されている
- [ ] 要約文（excerpt）が記載されている
- [ ] `published: true` が設定されている

### 内容確認
- [ ] 誤字脱字がない
- [ ] 情報が正確
- [ ] 読みやすい構成になっている
- [ ] 画像が適切に表示される

### SEO対策
- [ ] 見出し（##）が階層的に使われている
- [ ] 重要なキーワードが含まれている
- [ ] 適切な文章量（1000文字以上推奨）

## 🔧 トラブルシューティング

### よくある問題

#### 記事が表示されない
- `published: true` が設定されているか確認
- ファイル名が `.mdx` で終わっているか確認
- フロントマターの形式が正しいか確認

#### 画像が表示されない
- 画像ファイルが `public/images/` に配置されているか確認
- パスが `/images/filename.jpg` の形式になっているか確認
- 画像ファイル名に日本語や特殊文字が含まれていないか確認

#### レイアウトが崩れる
- Markdown記法が正しく使われているか確認
- コンポーネントの記述に間違いがないか確認

## 📞 サポート

技術的な問題や質問がある場合は：

- **技術部**: technical@take-parts-factory.com
- **ウェブサイト担当**: web@take-parts-factory.com

## 📚 参考資料

- [Markdown記法ガイド](https://www.markdownguide.org/basic-syntax/)
- [GitHub ファイル編集方法](https://docs.github.com/ja/repositories/working-with-files/managing-files/editing-files)

---

このガイドを参考に、素晴らしいコンテンツを作成してください！