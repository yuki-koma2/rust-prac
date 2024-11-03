use actix_web::{web, App, HttpResponse, HttpServer};
use actix_web::web::Form;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let server = HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(|| async { get_index() }))
            .route("/gcd", web::post().to(|form: Form<GcdParameters>| async move { post_gcd(form) }))
    });

    println!("Server running at http://localhost:3000");
    server
        .bind("127.0.0.1:3000")
        .expect("error binding server to address")
        .run()
        .await
}

fn get_index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(
            r#"
            <title>GCD Calculator</title>
            <form action="/gcd" method="post">
                <input type="text" name="n" />
                <input type="text" name="m" />
                <button type="submit">Compute GCD</button>
            </form>
            "#,
        )
}

#[derive(serde::Deserialize)]
struct GcdParameters {
    n: u64,
    m: u64,
}

fn post_gcd(form: Form<GcdParameters>) -> HttpResponse {

    if form.n == 0 || form.m == 0 {
        return HttpResponse::BadRequest()
            .content_type("text/html")
            .body("Computing the GCD with zero is boring.");
    }

    let response = format!(
        "The greatest common divisor of the numbers {} and {} is <b>{}</b>\n",
        form.n,
        form.m,
        gcd(form.n, form.m)
    );

    //
    //
    // let response = match form {
    //     Ok(form) => {
    //         let d = gcd(form.n, form.m);
    //         format!("The greatest common divisor of the numbers {} and {} is <b>{}</b>\n", form.n, form.m, d)
    //     },
    //     Err(_) => "Error parsing parameters".to_string(),
    // };

    HttpResponse::Ok()
        .content_type("text/html")
        .body(response)
}


/**
 * Calculate the greatest common divisor of two numbers
 *
 * # Examples
 *
 * ```
 * assert_eq!(gcd(14, 15), 1);
 * assert_eq!(gcd(2, 4), 2);
 * ```
 */
fn gcd(mut n: u64, mut m: u64) -> u64 {
    // assert! is used to check if the condition is true
    // ! is macro syntax 関数呼び出しではなく、コンパイル時に展開される。
    // 関数呼び出しだと、関数のスタックフレームを作成する必要があるが、マクロだと展開されるだけなので、効率が良い。
    /*
    関数呼び出しで記述した場合には以下のようなオーバーヘッドがある。
    1. スタックフレームの作成
    2. 引数のコピー
    3. 関数の呼び出し
    4. 戻り値のコピー、リターンアドレスの保存
    5. スタックフレームの破棄、クリーンアップ
    */
    assert!(n != 0 && m != 0);
    while m != 0 {
        if m < n {
            // let t = m;
            // m = n;
            // n = t;
            std::mem::swap(&mut m, &mut n);
        }
        // m = m % n;
        m %= n;
    }
    // return is optional
    // rust においては Returnは不要であり、最後の式が返り値となる。(;を書くと、返り値とならない)
    // ちなみに式と文の違いは、式は値を返すが、文は値を返さない。
    // 式： 5 + 5
    // 文： let x = 5;
    n
}

#[test]
fn test_gcd() {
    assert_eq!(gcd(14, 15), 1);
    assert_eq!(gcd(2, 4), 2);
    assert_eq!(gcd(3 * 5 * 11 * 17, 3 * 11 * 13 * 19), 3 * 11);
}

// // use actix_web::{web, App, HttpResponse, Responder};
// use actix_web::{web, App, HttpResponse, HttpServer, Responder};
//
// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//     let server = HttpServer::new(|| {
//         App::new().route("/", web::get().to(get_index))
//         // actix_web::App::new().service(
//         //     actix_web::web::resource("/gcd/{x}/{y}")
//         //         .route(actix_web::web::get().to(gcd)),
//     });
//
//     println!("Server running at http://localhost:3000");
//     server
//         .bind("127.0.0.1:3000")
//         .expect("error binding server to address")
//         .run()
//         .await
// }
//
//
// fn get_index() -> HttpResponse {
//     HttpResponse::Ok()
//         .content_type("text/html")
//         .body(
//             r#"
//             <title>GCD Calculator</title>
//             <form action="/gcd" method="post">
//                 <input type="text" name="n" />
//                 <input type="text" name="m" />
//                 <button type="submit">Compute GCD</button>
//             </form>
//             "#,
//         )
// }
