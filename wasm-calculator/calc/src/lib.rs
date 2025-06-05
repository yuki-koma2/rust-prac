use std::str::Chars;

/// 四則演算を行うシンプルな計算機ロジック。
/// サポートしているのは `+`, `-`, `*`, `/` のみで括弧は未対応。
pub fn evaluate(expression: &str) -> Result<f64, String> {
    let mut chars = expression.chars().peekable();
    let mut num_stack: Vec<f64> = Vec::new();
    let mut op_stack: Vec<char> = Vec::new();

    fn precedence(op: char) -> i32 {
        match op {
            '+' | '-' => 1,
            '*' | '/' => 2,
            _ => 0,
        }
    }

    fn apply_op(num_stack: &mut Vec<f64>, op: char) -> Result<(), String> {
        if num_stack.len() < 2 {
            return Err("不正な式です".into());
        }
        let b = num_stack.pop().unwrap();
        let a = num_stack.pop().unwrap();
        let result = match op {
            '+' => a + b,
            '-' => a - b,
            '*' => a * b,
            '/' => {
                if b == 0.0 {
                    return Err("0で割ることはできません".into());
                }
                a / b
            }
            _ => unreachable!(),
        };
        num_stack.push(result);
        Ok(())
    }

    fn parse_number(chars: &mut std::iter::Peekable<Chars<'_>>) -> Result<f64, String> {
        let mut num = String::new();
        while let Some(&ch) = chars.peek() {
            if ch.is_ascii_digit() || ch == '.' {
                num.push(ch);
                chars.next();
            } else {
                break;
            }
        }
        num.parse::<f64>().map_err(|_| "数値の解析に失敗しました".into())
    }

    while let Some(&ch) = chars.peek() {
        if ch.is_whitespace() {
            chars.next();
            continue;
        }
        if ch.is_ascii_digit() || ch == '.' {
            let value = parse_number(&mut chars)?;
            num_stack.push(value);
        } else if matches!(ch, '+' | '-' | '*' | '/') {
            let op = ch;
            chars.next();
            while let Some(&top) = op_stack.last() {
                if precedence(top) >= precedence(op) {
                    apply_op(&mut num_stack, op_stack.pop().unwrap())?;
                } else {
                    break;
                }
            }
            op_stack.push(op);
        } else {
            return Err(format!("無効な文字: {}", ch));
        }
    }

    while let Some(op) = op_stack.pop() {
        apply_op(&mut num_stack, op)?;
    }

    if num_stack.len() == 1 {
        Ok(num_stack[0])
    } else {
        Err("不正な式です".into())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_operations() {
        assert_eq!(evaluate("1+2").unwrap(), 3.0);
        assert_eq!(evaluate("4-2").unwrap(), 2.0);
        assert_eq!(evaluate("3*5").unwrap(), 15.0);
        assert_eq!(evaluate("8/4").unwrap(), 2.0);
    }

    #[test]
    fn test_precedence() {
        assert_eq!(evaluate("2+3*4").unwrap(), 14.0);
        assert_eq!(evaluate("2*3+4").unwrap(), 10.0);
    }

    #[test]
    fn test_complex_expression() {
        assert_eq!(evaluate("1+2*3-4/2").unwrap(), 5.0);
    }
}
