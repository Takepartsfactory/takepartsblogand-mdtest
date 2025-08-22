# 📝 詳細編集ガイド

## MDXファイルの書き方

### 基本的な書き方

```markdown
# 大見出し（H1）
## 中見出し（H2）
### 小見出し（H3）

普通のテキストはそのまま書きます。

**太字**にしたいテキスト
*斜体*にしたいテキスト

- 箇条書き1
- 箇条書き2
  - 入れ子の箇条書き

1. 番号付きリスト
2. 番号付きリスト

[リンクテキスト](https://example.com)

![画像の説明](/images/image.jpg)

> 引用文
> 複数行の引用

---

区切り線

`インラインコード`

```code
コードブロック
複数行のコード
```
```

### フロントマター（ページ設定）

すべてのMDXファイルの先頭には、以下の設定を書きます：

**ページ用:**
```yaml
---
title: "ページタイトル"
description: "ページの説明（SEO用）"
---
```

**ブログ記事用:**
```yaml
---
title: "記事タイトル"
date: "2025-08-22"
tags: ["タグ1", "タグ2", "タグ3"]
excerpt: "記事の要約（100文字程度）"
thumbnail: "/images/thumbnail.jpg"
---
```

## よく使うパターン

### 製品仕様テーブル

```markdown
| 項目 | 仕様 |
|------|------|
| 加工径 | φ3～φ200 |
| 加工長 | ～500mm |
| 精度 | ±0.005mm |
```

### 画像ギャラリー

```markdown
<div className="grid grid-cols-2 gap-4">
  <img src="/images/machine1.jpg" alt="加工機1" />
  <img src="/images/machine2.jpg" alt="加工機2" />
  <img src="/images/machine3.jpg" alt="加工機3" />
  <img src="/images/machine4.jpg" alt="加工機4" />
</div>
```

### お客様の声

```markdown
> 「タケパーツファクトリーさんのおかげで、
> 納期通りに製品を完成させることができました。」
> 
> **— 株式会社〇〇 山田様**
```

### CTA（行動喚起）ボタン

```markdown
<div className="text-center my-8">
  <a href="/contact/" className="inline-block bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-colors">
    お問い合わせはこちら
  </a>
</div>
```

### 重要なお知らせ

```markdown
<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8">
  <p className="font-bold">重要なお知らせ</p>
  <p>お知らせの内容をここに記載します。</p>
</div>
```

### 技術仕様表

```markdown
<div className="bg-gray-50 p-6 rounded-lg">
  <h3 className="text-lg font-bold mb-4">加工仕様</h3>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <strong>最大加工径:</strong> φ200mm
    </div>
    <div>
      <strong>最大加工長:</strong> 500mm
    </div>
    <div>
      <strong>精度:</strong> ±0.005mm
    </div>
    <div>
      <strong>表面粗さ:</strong> Ra0.8μm
    </div>
  </div>
</div>
```

## GitHubでの編集手順

### 1. ファイルを探す
1. リポジトリのトップページに移動
2. `content/posts/` または `content/pages/` をクリック
3. 編集したいファイルを選択

### 2. 編集モードに入る
1. ファイルを開く
2. 右上の鉛筆アイコン（Edit this file）をクリック

### 3. 内容を編集
1. マークダウン形式で編集
2. プレビューを確認したい場合は「Preview」タブをクリック

### 4. 変更を保存
1. ページ下部の「Commit changes」セクションに移動
2. 変更内容の説明を入力（例：「サービス内容を更新」）
3. 「Commit changes」ボタンをクリック

## エラーの対処法

### よくあるエラーと解決方法

#### 1. 画像が表示されない

**原因:**
- ファイル名に日本語が含まれている
- パスが正しくない
- 画像ファイルがアップロードされていない

**解決方法:**
1. ファイル名を英数字のみに変更
2. パスが `/images/` から始まっているか確認
3. `public/images/` フォルダーに画像がアップロードされているか確認

#### 2. ページが404エラー

**原因:**
- ファイル名に誤りがある
- フロントマターが正しく書かれていない

**解決方法:**
1. ファイル名を確認（`.mdx` 拡張子が必要）
2. フロントマターの構文を確認
3. 2-3分待ってから再度アクセス

#### 3. レイアウトが崩れる

**原因:**
- マークダウンの記法が正しくない
- HTMLタグが正しく閉じられていない

**解決方法:**
1. マークダウンの記法を確認
2. 開始タグと終了タグが対応しているか確認
3. 前のバージョンに戻して原因を特定

### 前のバージョンに戻す方法

1. GitHubでファイルを開く
2. 「History」ボタンをクリック
3. 戻したいバージョンを選択
4. 「Revert changes in this commit」をクリック
5. コミットメッセージを入力
6. 「Create pull request」→「Merge pull request」をクリック

## 便利なツール

### マークダウンエディタ
オンラインで使えるエディタ:

- [StackEdit](https://stackedit.io/)
- [Dillinger](https://dillinger.io/)

### 画像圧縮ツール
アップロード前に画像を軽くする:

- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### 画像リサイズ
適切なサイズに調整:

- ブログ画像: 1200x630px
- ギャラリー画像: 800x600px
- アイコン: 64x64px

## チェックリスト

### 記事を公開する前に確認:

- [ ] タイトルは適切か
- [ ] 日付は正しいか（YYYY-MM-DD形式）
- [ ] タグは設定したか
- [ ] excerptは100文字程度か
- [ ] 画像は圧縮したか
- [ ] リンクは正しく動作するか
- [ ] 誤字脱字はないか
- [ ] モバイルでも読みやすいか

### ページを更新する前に確認:

- [ ] タイトルは適切か
- [ ] descriptionはSEO対策されているか
- [ ] 画像のaltテキストは設定したか
- [ ] 内部リンクは正しく動作するか
- [ ] 内容は最新の情報か

## コンテンツ作成のコツ

### SEO対策

1. **タイトル**: 32文字以内で魅力的に
2. **見出し**: H2, H3を適切に使用
3. **キーワード**: 自然に配置
4. **内部リンク**: 関連ページへリンク
5. **画像**: altテキストを必ず設定

### 読みやすい文章

1. **段落**: 3-4行で改行
2. **箇条書き**: 情報を整理
3. **強調**: 重要な部分は太字
4. **具体例**: 数値やデータを活用

### 画像の使い方

1. **品質**: 高解像度でクリアな画像
2. **サイズ**: 軽量化して読み込み速度向上
3. **著作権**: 自社撮影または権利フリー画像
4. **説明**: わかりやすいaltテキスト

## 緊急時の対応

### サイトが表示されない場合

1. **Cloudflare Pagesの状態を確認**
   - Cloudflare Pagesのダッシュボードをチェック
   - ビルドエラーがないか確認

2. **最新のコミットを確認**
   - GitHubの「Actions」タブでビルド状況を確認
   - エラーがある場合は前のバージョンに戻す

3. **サポートに連絡**
   - メール: support@example.com
   - 電話: 0532-XX-XXXX

### 間違って削除してしまった場合

1. GitHubの「History」から復元
2. サポートに連絡
3. バックアップからの復旧

---

## お問い合わせ

不明な点があれば、お気軽にご連絡ください：

📧 **メール**: support@example.com  
📞 **電話**: 0532-XX-XXXX（平日9:00-17:00）  
💬 **チャット**: GitHubのIssues機能をご利用ください

## 関連リンク

- [GitHub ヘルプ](https://docs.github.com/ja)
- [Markdown ガイド](https://www.markdownguide.org/basic-syntax/)
- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)

---

**最終更新**: 2025年8月22日