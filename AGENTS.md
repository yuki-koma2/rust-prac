# AGENT instructions for rust-prac

このリポジトリでは、コードを変更する際は必ず以下のコマンドでテストとリンターを実行してください。

```
cargo fmt --all -- --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

各サブプロジェクト（例: `hello-koma`、`actix-gcd` など）に `Cargo.toml` がある場合は、そのディレクトリで上記コマンドを実行します。ドキュメントやコメントのみの変更の場合は、テストやリンターの実行は不要です。

コードを変更する際は必ず対応するテストコードも追加し、TDD を意識して実装してください。責務の分離を心掛け、1 ファイルに多くのロジックを詰め込みすぎないよう注意します。設計は Clean Architecture や DDD を参考にしますが、厳密な適用は必須ではありません。

また、すべての回答および PR メッセージは日本語で記述してください。
