# js-primer

本家はこちら。 <https://github.com/js-primer/js-primer> （ウェブ版: <https://jsprimer.net/>）
本家からforkはせず、一旦個別に作成してみる
各ディレクトリにてサンプルのコードを記載していく事にする。

### 写経方針

* 第1部（`source/basic/`）は章ごとに `chapterN/` を作り、`index.html` からサンプルの JS を読み込む
* 第2部（`source/use-case/`）は本家のユースケース名に合わせたディレクトリ（`ajaxapp/` `nodecli/` `todoapp/`）で写経する。ただしアプリケーション開発の準備（`setup-local-env`）は `chapter29/`
* 章番号は写経した時点の版に合わせている。本家の現行版で追加された章（イテレータとジェネレータ、第一部: おわりに）は未写経


## 第1部

### 第1章 JavaScriptとは

* [JavaScriptとは](./chapter1)

### 第2章 コメント

* [コメント](./chapter2/comment.js)
* [参考](https://qiita.com/rana_kualu/items/3ec7a5fdf6a62fd6eecb#-----)

### 第3章 変数と宣言

* [変数と宣言](./chapter3/variable.js)

### 第4章 値の評価と表示

* [値の評価と表示](./chapter4/example/index.html)

ウェブ版の方が良さそうなので、この章はwebのリンクをつけておく事にする
<https://jsprimer.net/basic/read-eval-print/>

### 第5章 データ型とリテラル

* [データ型とリテラル](./chapter5/index.html)

### 第6章 演算子

* [演算子](./chapter6/index.html)

### 第7章 暗黙的な型変換

* [暗黙的な型変換](./chapter7/index.html)

### 第8章 関数と宣言

* [関数と宣言](./chapter8/index.html)

### 第9章 文と式

* [文と式](./chapter9/index.html)

### 第10章 条件分岐

* [条件分岐](./chapter10/index.html)

### 第11章 ループと反復処理

* [ループと反復処理](./chapter11/index.html)

### 第12章 オブジェクト

* [オブジェクト](./chapter12/index.html)

### 第13章 プロトタイプオブジェクト

* [プロトタイプオブジェクト](./chapter13/index.html)

### 第14章 配列

* [配列](./chapter14/index.html)

### 第15章 文字列

* [文字列](./chapter15/index.html)

### 第16章 文字列とUnicode

* [文字列とUnicode](./chapter16/index.html)

### 第17章 ラッパーオブジェクト

* [ラッパーオブジェクト](./chapter17/index.html)

### 第18章 関数とスコープ

* [関数とスコープ](./chapter18/index.html)

### 第19章 関数とthis

* [関数とthis](./chapter19/index.html)

### 第20章 クラス

* [クラス](./chapter20/index.html)

### 第21章 例外処理

* [例外処理](./chapter21/index.html)

### 第22章 非同期処理:Promise/Async Function

* [非同期処理](./chapter22/index.html)

### 第23章 Map/Set

* [Map/Set](./chapter23/index.html)

### 第24章 JSON

* [JSON](./chapter24/index.html)

### 第25章 Date

* [Date](./chapter25/index.html)

### 第26章 Math

* [Math](./chapter26/index.html)

### 第27章 ECMAScriptモジュール

* [ECMAScriptモジュール](./chapter27/index.html)

### 第28章 ECMAScript

写経対象外（README のみ）。本家の該当章（`source/basic/ecmascript/`）はサンプルコードを伴わないため、`chapter28/` は作らずメモだけ残す。

バージョン | リリース時期
--- | ---
1 | 1997年6月
2 | 1998年6月
3 | 1999年12月
4 | 2000年8月(破棄)
5 | 2009年12月
5.1 | 2011年6月
2015 | 2015年6月
2016 | 2016年6月
… | 毎年リリース

* [ECMAScriptの事実上の最新の仕様](https://github.com/tc39/tc39.github.io)

新しい機能を試す際につかえるもの

* Transpiler
  * Babel
  * TypeScript
* Polyfill
  * core-js
    * regenerator-runtime
  * polyfill.io
  
言語機能そのものを調べる

* [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript)

## 第2部

### 第29章 アプリケーション開発の準備

* [ローカルサーバーのセットアップ](./chapter29/index.html)

### 第30章 ユースケース: Ajax通信

* [Ajax通信](./ajaxapp/index.html)

### 第31章 ユースケース: Node.jsでCLIアプリ

* [Node.jsでHello World](./nodecli/)

### 第32章 ユースケース: Todoアプリ

* [Todoアプリ](./todoapp/index.html)

### 参考

* [JavaScript Primer](https://jsprimer.net/)
* [現代の JavaScript チュートリアル](https://ja.javascript.info/)

Github Actionsでハマる時にいつも躓くのでメモ

* <https://zenn.dev/kenghaya/articles/d7f766e5db6437>
* <https://zenn.dev/tatsugon/articles/github-actions-permission-error>
