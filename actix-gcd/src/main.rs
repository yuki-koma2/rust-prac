#[derive(serde::Deserialize)]
struct GcdParameters {
    n: String, // String型に変更
    m: String, // String型に変更
}

fn post_gcd(form: Form<GcdParameters>) -> HttpResponse {
    let n = match form.n.parse::<u64>() { // Stringからu64へのパースを試みる
        Ok(val) => val,
        Err(_) => {
            return HttpResponse::BadRequest()
                .content_type("text/html")
                .body("Invalid input for n. Please enter a positive number."); // エラーメッセージを修正
        }
    };

    let m = match form.m.parse::<u64>() { // Stringからu64へのパースを試みる
        Ok(val) => val,
        Err(_) => {
            return HttpResponse::BadRequest()
                .content_type("text/html")
                .body("Invalid input for m. Please enter a positive number."); // エラーメッセージを修正
        }
    };


    if n == 0 || m == 0 {
        return HttpResponse::BadRequest()
            .content_type("text/html")
            .body("Computing the GCD with zero is boring.");
    }

    let response = format!(
        "The greatest common divisor of the numbers {} and {} is <b>{}</b>\n",
        n,
        m,
        gcd(n, m)
    );

    HttpResponse::Ok()
        .content_type("text/html")
        .body(response)
}
