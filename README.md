# rust-prac

このリポジトリには、Rust や JavaScript で書かれたサンプルプロジェクトが複数含まれています。
以下は主なディレクトリと役割の概要です。

## wasm-calculator
簡単な電卓アプリを WebAssembly でビルドするサンプルです。
ビルドには `wasm-pack` を使用します。以下のコマンドでビルドとローカル実行が行えます。

```bash
cd wasm-calculator
wasm-pack build --target web
npm install && npm start
```

## actix-gcd
Rust の Web フレームワーク [Actix-web](https://actix.rs/) を用いて、最大公約数 (GCD) を計算する Web サーバの例です。

## hello-koma
CLI アプリケーションのサンプルで、コマンドラインから簡単な引数を受け取って実行できます。

## weather-app
Rust で書かれたバックエンドと Next.js フロントエンドを組み合わせた天気情報アプリケーションです。

