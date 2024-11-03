use std::env;
use std::str::FromStr;

fn main() {
    println!("Hello, world!");
    // Vec is a growable array
    // Vec::new() is a constructor for Vec
    // Vecはjsonの配列のようなもの。 Vec<u64>として宣言できるが、型推論によりVec::new()でu64をpushすることで型が決定される。
    let mut numbers = Vec::new();

    for arg in env::args().skip(1) {
        // u64::from_str() is a function that converts a string to a u64
        // from_str はu64のような型に対して、文字列を変換する関数。fromStrトレイトを実装している型に対して使える。
        // & is a reference to the argument.参照を示す。参照は値をコピーせず、値のアドレスを渡す。
        // 関数呼び出しにおいて arg のデータをコピーする代わりに、arg の場所を参照して渡すことで、メモリ効率を向上させる。
        // Rustでは、参照を利用することで「所有権の移動」を避けながらデータを扱える。
        numbers.push(u64::from_str(&arg)
            .expect("error parsing argument")
        );
    }

    if numbers.is_empty() {
        eprintln!("Usage: gcd NUMBER ...");
        std::process::exit(1);
    }

    let mut d = numbers[0];

    for m in &numbers[1..] {
        d = gcd(d, *m);
    }

    println!("The greatest common divisor of {:?} is {}", numbers, d);
}

/*
** とかくとrustdocが生成される対象となる。
mut is used to make a variable mutable
u64 is an unsigned 64-bit integer
*/

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
            std::mem::swap(&mut m, &mut n)
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
