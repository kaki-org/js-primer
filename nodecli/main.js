// utilモジュールをutilオブジェクトとしてインポートする
import * as util from "node:util";
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from "./md2html.js";

// コマンドライン引数からファイルパスとオプション/フラグを受け取る
const { values, positionals } = util.parseArgs({
  allowPositionals: true,
  options: {
    // gfmフラグを定義する
    gfm: {
      type: "boolean",
      default: false,
    },
  },
});
// ファイルパスをpositionals配列から取り出す
const filePath = positionals[0];

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" })
  .then((file) => {
    // MarkdownファイルをHTML文字列に変換する
    const html = md2html(file, {
      // gfmフラグのパース結果をオプションとして渡す
      gfm: values.gfm,
    });
    console.log(html);
  })
  .catch((err) => {
    console.error(err.message);
    // 終了ステータス1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
  });
