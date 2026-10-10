# chapter29: アプリケーション開発の準備

本家 js-primer の「[アプリケーション開発の準備](https://jsprimer.net/use-case/setup-local-env/)」（`source/use-case/setup-local-env/`）に対応する写経ディレクトリです。

## 本家ファイルとの対応

| 本家 | このリポジトリ | 備考 |
| --- | --- | --- |
| `source/use-case/setup-local-env/README.md` | `chapter29/README.md` | 本文の代わりに手順と対応関係を整理 |
| `source/use-case/setup-local-env/src/index.html` | `chapter29/index.html` | 内容は本家と同じ |
| `source/use-case/setup-local-env/src/index.js` | `chapter29/index.js` | 内容は本家と同じ |
| `source/use-case/setup-local-env/img/`, `screenshot.sh` | なし | 書籍用スクリーンショット素材のため写経しない |
| なし | `chapter29/package.json`, `bun.lockb`, `package-lock.json` | `@js-primer/hello-world` をローカルに入れて試すための写経用 |

他章と同じく `src/` サブディレクトリは作らず、`chapter29/` 直下に配置しています。
これにより、リポジトリルートで起動したローカルサーバーから `http://localhost:3000/chapter29/index.html` で開けます（`.vscode/launch.json` と同じ想定）。

## Node.js / npm のバージョン確認

```bash
node -v
npm -v
```

このリポジトリで使うバージョンはルートの `.tool-versions` で固定しています。

## npx / bunx による npm パッケージの実行

[@js-primer/hello-world](https://github.com/js-primer/hello-world) を実行します。

```bash
# 初回はインストール確認のプロンプトが表示される
npx @js-primer/hello-world

# --yes で確認をスキップする
npx --yes @js-primer/hello-world
# => Hello World!

# bun の場合
bunx @js-primer/hello-world
```

`chapter29/package.json` には `@js-primer/hello-world` が依存として入っているため、依存を導入済みなら次のようにも実行できます。

```bash
cd chapter29
bun install --frozen-lockfile
bunx js-primer-hello-world
```

参考（本家のコラム）: グローバルインストールする場合は次のとおりです。

```bash
npm install --global @js-primer/hello-world
js-primer-hello-world
```

## ローカルサーバーの起動と終了

[@js-primer/local-server](https://github.com/js-primer/local-server) で `http` スキーマのURLから配信します。

本家と同じく `chapter29/` で起動する場合:

```bash
cd chapter29
npx --yes @js-primer/local-server
# または
bunx @js-primer/local-server
# => http://localhost:3000 （= http://localhost:3000/index.html）
```

このリポジトリの他章と同じくルートで起動する場合:

```bash
npx --yes @js-primer/local-server --port 3000 .
# => http://localhost:3000/chapter29/index.html
```

ブラウザの開発者ツールのコンソールに `index.js: loaded` と表示されれば、`index.js` が読み込まれています。
終了するときは、起動したターミナルで `Ctrl+C` を押します。
