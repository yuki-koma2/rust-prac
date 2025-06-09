# rust-prac

Rustの学習のための小規模プロジェクトを保存するリポジトリです。

## サブディレクトリ概要

- **hello-koma**
  基本的な Rust CLI アプリのサンプル。`cargo run` で実行できます。
  依存関係は特になし。詳細は [`hello-koma/src/README.md`](hello-koma/src/README.md) を参照してください。

- **actix-gcd**
  [Actix Web](https://actix.rs/) を使った GCD 計算サービスです。
  `cargo run` でローカルサーバーが起動します。依存関係は `actix-web`, `serde` など。
  詳しくは [`actix-gcd/README.md`](actix-gcd/README.md) を参照してください。

- **wasm-calculator**
  WebAssembly を利用した電卓アプリを作成する予定のディレクトリです。
  現在コードはまだありません。

- **weather-app**
  Rust バックエンドと Next.js フロントエンドからなる簡易天気アプリ。
  `weather-app/backend` で `cargo run`、`weather-app/frontend` で `npm run dev` を実行します。
  依存関係の詳細はそれぞれの `Cargo.toml` や `package.json` を参照してください。

## ビルド手順例

各プロジェクトのコマンドは、リポジトリのルートディレクトリから実行することを想定しています。

```bash
# hello-koma
cd hello-koma
cargo run

# actix-gcd
cd actix-gcd # Assumes starting from repository root
cargo run

# weather-app backend
cd weather-app/backend # Assumes starting from repository root
cargo run

# weather-app frontend
cd weather-app/frontend # Assumes starting from repository root
npm install
npm run dev
```

各プロジェクトのより詳しい使い方や依存関係は、サブディレクトリ内の README をご覧ください。
