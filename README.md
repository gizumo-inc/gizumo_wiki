# Gizumo Wiki

## フォルダ構成

```
.
├── package-lock.json
├── package.json
├── public
├── src
│   ├── js
│   │   ├── _helpers/
│   │   ├── _router/
│   │   ├── _store/
│   │   ├── app.js
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── ...
│   │   │   │   └── Button.vue
│   │   │   ├── globals/
│   │   │   │   ├── ...
│   │   │   │   └── Header.vue
│   │   │   └── molecules/
│   │   │       ├── ...
│   │   │       └── ListSidebar.vue
│   │   └── pages/
│   │       ├── ...
│   │       └── index.vue
│   └── scss/
└── webpack.config.babel.js
```

### 「JS」フォルダの中
- 「_helpers」はユーティリティな関数などをまとめているフォルダ
- 「_router」はvue-routerのインスタンスを生成しているフォルダ
- 「_store」はvuexのstoreのインスタンスを生成しているフォルダ

### コンポーネント管理

`components`フォルダでコンポーネントをまとめています。
- 「atoms」は使い回すための最小単位のコンポーネント
- 「globals」はどのページでも使うコンポーネント
- 「molecules」は「atoms」で構成されたコンポーネント（使い回せなくてもいい）

`pages`フォルダは`molecules`のコンポーネントで構成された実ページ
- 「pages」では直接「atoms」を使わない
- 「pages」では子のコンポーネントにpropsを渡すこと・イベントの通知を受け取ることとJSの処理を行っている

## 画面

|  | URL |
|---|---|
| トップ | `/` |
| サインイン | `/signin` |
| サインアウト | `/signout` |
| カテゴリー一覧・追加  | `/categories` |
| 記事一覧 | `/articles` |
| 記事詳細 | `/articles/:id` |
| 更新 | `/articles/:id/edit` |
| 投稿 | `/articles/post` |
| ユーザー一覧 | `/users` |
| ユーザー個別 | `/users/:id` |
| ユーザー作成 | `/users/create` |
| 404 | `/*` |

## サインアップ・サインイン
- 管理者が追加（アカウント名・メールアドレス・パスワード）

## 権限グループ

| グループ | 権限範囲 |
|---|---|
| システム管理者 | 閲覧（全ページ）、更新・削除 |
| 管理ユーザー | 閲覧（全ページ）、更新・削除 |
| 閲覧ユーザー | 閲覧（更新系のページを除く） |


## 開発

開発時は下記のコマンドでサーバーが立ち上がります。

```
npm install
```

```
npm run dev
```

## 本番公開

公開は、下記のコマンドでソースコードをビルドします。

```
npm run build
```

環境にアップしたら、下記のコマンドでNodeのサーバーを立ち上げます。

```
npm run publish
```

## 技術的なもの

- Node.js (v10.15.0): <a href="https://nodejs.org/ja/" target="_blank">https://nodejs.org/ja/</a>
- Babel (v7.x): <a href="https://babeljs.io/" target="_blank">https://babeljs.io/</a>
- ESlint: <a href="https://eslint.org/" target="_blank">https://eslint.org/</a>
- webpack (v4.29.0): <a href="https://webpack.js.org" target="_blank">https://webpack.js.org</a>
- Vue.js (v2.6.6): <a href="https://jp.vuejs.org/index.html" target="_blank">https://jp.vuejs.org/index.html</a>
- Vue Router: <a href="https://router.vuejs.org/ja/" target="_blank">https://router.vuejs.org/ja/</a>
- Vuex: <a href="https://vuex.vuejs.org/ja/" target="_blank">https://vuex.vuejs.org/ja/</a>
- Express (v4.16.4): <a href="https://expressjs.com/ja/" target="_blank">https://expressjs.com/ja/</a>
- PM2 (v3.5.0): <a href="http://pm2.keymetrics.io/" target="_blank">http://pm2.keymetrics.io/</a>
- Storybook (v5.x) コンポーネントガイド: <a href="https://storybook.js.org/" target="_blank">https://storybook.js.org/</a>
- テスト