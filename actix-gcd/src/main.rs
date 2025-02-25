use actix_web::{web, App, HttpResponse, HttpServer};
use actix_web::web::Form;
use serde::Deserialize;

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
                <input type="text" name="n" placeholder="Enter first number" />
                <input type="text" name="m" placeholder="Enter second number" />
                <button type="submit">Compute GCD</button>
            </form>
            "#,
        )
}

#[derive(Deserialize)]
struct GcdParameters {
    n: String, // u64ではなくStringにして柔軟に処理
    m: String,
}

fn post_gcd(form: Form<GcdParameters>) -> HttpResponse {
    // 文字列をu64に変換し、エラー処理を追加
    let n_result = form.n.trim().parse::<u64>();
    let m_result = form.m.trim().parse::<u64>();

    match (n_result, m_result) {
        (Ok(n), Ok(m)) => {
            if n == 0 || m == 0 {
                return HttpResponse::BadRequest()
                    .content_type("text/html")
                    .body("Computing the GCD with zero is not allowed.");
            }
            let result = gcd(n, m);
            let response = format!(
                "The greatest common divisor of the numbers {} and {} is <b>{}</b>\n",
                n, m, result
            );
            HttpResponse::Ok().content_type("text/html").body(response)
        }
        (Err(_), _) => HttpResponse::BadRequest()
            .content_type("text/html")
            .body("First number is invalid. Please enter a positive integer."),
        (_, Err(_)) => HttpResponse::BadRequest()
            .content_type("text/html")
            .body("Second number is invalid. Please enter a positive integer."),
    }
}

fn gcd(mut n: u64, mut m: u64) -> u64 {
    while m != 0 {
        if m < n {
            std::mem::swap(&mut m, &mut n);
        }
        m %= n;
    }
    n
}

#[test]
fn test_gcd() {
    assert_eq!(gcd(14, 15), 1);
    assert_eq!(gcd(2, 4), 2);
    assert_eq!(gcd(3 * 5 * 11 * 17, 3 * 11 * 13 * 19), 3 * 11);
}
