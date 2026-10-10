import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

// index.js はブラウザの <script> で読み込む通常スクリプト（export なし）のため、
// vm で document / fetch / console をスタブしたコンテキストに読み込んで関数を取り出す。
// 外部 API（GitHub）にはアクセスしない。
const source = fs.readFileSync(new URL("../index.js", import.meta.url), "utf8");

function loadApp({ userId = "js-primer-example", fetch } = {}) {
    const elements = {
        userId: { value: userId },
        result: { innerHTML: "" },
    };
    const errors = [];
    const fetchCalls = [];
    const context = {
        document: {
            getElementById: (id) => elements[id],
        },
        fetch: (url) => {
            fetchCalls.push(url);
            return fetch(url);
        },
        console: {
            error: (...args) => errors.push(args.join(" ")),
        },
    };
    vm.createContext(context);
    vm.runInContext(source, context);
    return { app: context, elements, errors, fetchCalls };
}

const userInfo = {
    name: "JS Primer Example",
    login: "js-primer-example",
    avatar_url: "https://avatars.githubusercontent.com/u/0?v=4",
    location: "Japan",
    public_repos: 3,
};

const jsonResponse = (body) => () =>
    Promise.resolve({ json: () => Promise.resolve(body) });

describe("escapeSpecialChars", () => {
    it("HTML の特殊文字をエスケープする", () => {
        const { app } = loadApp();
        assert.equal(
            app.escapeSpecialChars(`<a href="x">Tom & 'Jerry'</a>`),
            "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#039;Jerry&#039;&lt;/a&gt;"
        );
    });
});

describe("escapeHTML", () => {
    it("埋め込まれた文字列のみエスケープし、それ以外は String() で文字列化する", () => {
        const { app } = loadApp();
        const value = "<b>";
        const count = 3;
        assert.equal(
            app.escapeHTML`<p>${value}:${count}:${null}</p>`,
            "<p>&lt;b&gt;:3:null</p>"
        );
    });
});

describe("createView", () => {
    it("ユーザー情報から HTML を組み立てる", () => {
        const { app } = loadApp();
        const view = app.createView(userInfo);
        assert.match(view, /<h4>JS Primer Example \(@js-primer-example\)<\/h4>/);
        assert.match(view, /<img src="https:\/\/avatars\.githubusercontent\.com\/u\/0\?v=4" alt="js-primer-example" height="100">/);
        assert.match(view, /<dd>Japan<\/dd>/);
        assert.match(view, /<dd>3<\/dd>/);
    });

    it("ユーザー情報に含まれる HTML をエスケープする", () => {
        const { app } = loadApp();
        const view = app.createView({ ...userInfo, name: "<script>alert(1)</script>" });
        assert.ok(!view.includes("<script>"));
        assert.match(view, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    });
});

describe("fetchUserInfo", () => {
    it("GitHub API の URL を組み立て、JSON を返す", async () => {
        const { app, fetchCalls } = loadApp({ fetch: jsonResponse(userInfo) });
        const result = await app.fetchUserInfo("a b/c");
        assert.deepEqual(fetchCalls, ["https://api.github.com/users/a%20b%2Fc"]);
        assert.deepEqual(result, userInfo);
    });
});

describe("getUserId / displayView", () => {
    it("入力欄の値を取得し、結果を #result に表示する", () => {
        const { app, elements } = loadApp({ userId: "octocat" });
        assert.equal(app.getUserId(), "octocat");
        app.displayView("<p>ok</p>");
        assert.equal(elements.result.innerHTML, "<p>ok</p>");
    });
});

describe("main", () => {
    it("入力されたユーザーの情報を取得して表示する", async () => {
        const { app, elements, errors, fetchCalls } = loadApp({
            userId: "js-primer-example",
            fetch: jsonResponse(userInfo),
        });
        await app.main();
        assert.deepEqual(fetchCalls, ["https://api.github.com/users/js-primer-example"]);
        assert.match(elements.result.innerHTML, /<h4>JS Primer Example \(@js-primer-example\)<\/h4>/);
        assert.deepEqual(errors, []);
    });

    it("取得に失敗した場合はエラーを出力し、表示を更新しない", async () => {
        const { app, elements, errors } = loadApp({
            fetch: () => Promise.reject(new Error("network error")),
        });
        await app.main();
        assert.equal(elements.result.innerHTML, "");
        assert.deepEqual(errors, ["エラーが発生しました (Error: network error)"]);
    });
});
