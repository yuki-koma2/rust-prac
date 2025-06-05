# wasm-calculator

Rust製の計算ロジックをWebAssemblyにコンパイルし、ブラウザ上で実行する簡易計算機です。サーバーを立てずに`index.html`を開くだけで動作します。

## ディレクトリ構成

- `calc/` - 計算ロジックを提供するRustライブラリクレート
- `index.html` - ブラウザ用のUI
- `main.js` - WebAssemblyとUIをつなぐJavaScript

## ビルド方法

1. Rustに`wasm32-unknown-unknown`ターゲットと`wasm-bindgen-cli`、`wasm-pack`が必要です。環境に応じて以下を実行してください。
   ```bash
   rustup target add wasm32-unknown-unknown
   cargo install wasm-bindgen-cli wasm-pack
   ```
2. このディレクトリで以下を実行してWebAssemblyをビルドします。
   ```bash
   wasm-pack build calc --target web
   ```
   `pkg/`フォルダに`calc_bg.wasm`と`calc.js`が生成されます。
3. `index.html`をブラウザで開くと計算機が利用できます。

## 設計について

計算ロジックは`calc`クレート内で実装され、UIやブラウザ固有の処理から切り離しています。`evaluate`関数は式文字列を受け取り、結果を`Result<f64, String>`で返します。Clean Architectureに倣い、アプリケーション層（ブラウザ部分）からドメイン層（計算ロジック）を分離する構成です。

## 使い方

1. 上記手順でビルドを行う。
2. `index.html`をブラウザで開く。
3. 画面上のボタンをクリックまたはタッチして数式を入力し、`Enter`を押すと計算結果が表示されます。`C`でクリア、`Del`で一文字削除します。
