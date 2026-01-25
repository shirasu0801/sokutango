# 📚 英単語1問1答アプリ (Sokutango)

Duolingo風のポップなUIを持つ英単語学習アプリケーションです。

## 機能

- **トピック管理**: 複数のトピックを作成し、それぞれに単語を登録できます
- **登録モード**: 英単語と日本語訳のペアを登録（上限なし）
- **1問1答モード**: 
  - 日本語→英語 / 英語→日本語の2つのモード
  - 各単語に赤・黄・緑の3色でマーキング可能
  - 色別でフィルタリングしてクイズに挑戦可能
- **データ保存**: LocalStorageを使用してデータを保存（ログイン不要）

## 使い方

### 開発サーバーの起動

```bash
npm install
npm run dev
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## 技術スタック

- React 19
- TypeScript
- Vite
- CSS3（Duolingo風のデザイン）

## プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── TopicList.tsx   # トピック一覧画面
│   ├── TopicDetail.tsx # トピック詳細画面
│   ├── RegisterMode.tsx # 登録モード
│   └── QuizMode.tsx    # 1問1答モード
├── utils/              # ユーティリティ関数
│   ├── storage.ts      # LocalStorage管理
│   └── id.ts           # ID生成
├── types.ts            # TypeScript型定義
├── App.tsx             # メインコンポーネント
└── main.tsx            # エントリーポイント
```

## ライセンス

MIT
