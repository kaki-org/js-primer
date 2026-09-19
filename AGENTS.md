# AGENTS.md

`js-primer`（JavaScript 学習用リポジトリ）で作業するエージェント向けの実務ガイドです。

## 言語（デフォルト: 日本語）

- このリポジトリでは**日本語をデフォルト**とします。ユーザーへの応答、PR のタイトル・説明、
  コミットメッセージ、コードコメントは、特に指定がない限り日本語で記述してください。
- ユーザーが別の言語で明示的に依頼した場合は、その言語に従ってください。

## 概要

- サンプルコードを章ごと（`chapter1`〜`chapter29` など）に配置した学習用リポジトリです。
- 実際に「開発」対象となるのは次の 3 つです。
  - `nodecli` … Markdown→HTML 変換 CLI（`marked` / `commander`、mocha テストあり）
  - `todoapp` … ブラウザ用 Todo アプリ（ES Modules、mocha でモデルをテスト）
  - `ajaxapp` … GitHub ユーザー情報を取得するブラウザ用サンプル（外部 API を利用）
- CI（`.github/workflows/main.yml`）は `nodecli` と `todoapp` で `npm install` → `npm test` を実行します。

## ツールチェーン（`.tool-versions` で固定）

- Node.js `24.19.0`（nvm で導入）
- bun `1.3.14`

Cloud Agent 環境では `.cursor/install.sh` がこれらを導入し、ログインシェルの `PATH` に反映します。
ベースイメージには古い `node` が `PATH` 上で優先される場合があるため、`.bashrc` で pin しています。
新しいターミナルでは `node -v` が `v24.19.0`、`bun -v` が `1.3.14` を返すことを前提にしてください。

## セットアップ

依存の導入は冪等な install スクリプトで行います（Cloud Agent では起動時に自動実行）。

```bash
bash .cursor/install.sh
```

これは Node.js / bun を導入し、`nodecli`・`todoapp`（npm）、`chapter29`（`bun install --frozen-lockfile`）の依存をインストールします。
個別に導入する場合は次のとおりです。

```bash
cd nodecli && npm install
cd todoapp && npm install
cd chapter29 && bun install --frozen-lockfile
```

## テスト

CI と同じ内容です（変更に関係する側を実行してください）。

```bash
cd nodecli && npm test    # 2 件成功する想定
cd todoapp && npm test    # 8 件成功する想定
```

## ブラウザ用サンプルの配信

リポジトリのルートを静的配信し、`http://localhost:3000/<ディレクトリ>/index.html` で開きます
（`.vscode/launch.json` の想定と同じ構成）。Cloud Agent では `local-server` ターミナルが自動起動します。

```bash
npx --yes @js-primer/local-server --port 3000 .
```

例:

- Todo アプリ: <http://localhost:3000/todoapp/index.html>
- Ajax アプリ: <http://localhost:3000/ajaxapp/index.html>
- 各章: <http://localhost:3000/chapter15/index.html> など

## 注意点・既知の問題

- ファイル名の大文字小文字は Linux では区別されます。`import` とディスク上のファイル名を必ず一致させてください
  （過去に `TodoLIstView.js` と `TodoListView.js` の不一致で Todo アプリが 404 になっていました）。
- `nodecli` の CLI（`node main.js <ファイル>`）は、`commander` v15 で位置引数の扱いが厳格化されたため、
  現状は引数付き実行でエラーになります。中心的な `md2html` のロジックは `nodecli` のテストでカバーされています。
- ブラウザ用サンプルの依存はリポジトリにコミットしません（`node_modules` は `.gitignore` 済み）。
  ロックファイルを不用意に書き換えないでください（`chapter29` は `--frozen-lockfile` を使用）。
