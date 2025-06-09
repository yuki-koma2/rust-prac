pub fn eval(expression: &str) -> i32 {
    let mut stack: Vec<i32> = Vec::new();
    for token in expression.split_whitespace() {
        if let Ok(value) = token.parse::<i32>() {
            stack.push(value);
            continue;
        }

        let b = stack.pop().expect("スタックからの値取得に失敗");
        let a = stack.pop().expect("スタックからの値取得に失敗");

        let result = match token {
            "+" => a + b,
            "-" => a - b,
            "*" => a * b,
            "/" => a / b,
            op => unreachable!("未対応の演算子: {}", op),
        };

        stack.push(result);
    }
    stack.pop().expect("スタックからの値取得に失敗")
}

#[cfg(test)]
mod tests {
    use super::eval;

    #[test]
    fn add() {
        assert_eq!(eval("1 2 +"), 3);
    }

    #[test]
    #[should_panic(expected = "スタックからの値取得に失敗")]
    fn insufficient_operands() {
        eval("+");
    }

    #[test]
    #[should_panic(expected = "未対応の演算子: ?")]
    fn unsupported_operator() {
        eval("1 2 ?");
    }
}
