pub fn parse_decimal(input: &str) -> Result<f64, &'static str> {
    if input.is_empty() {
        return Err("empty input");
    }
    let mut has_dot = false;
    for c in input.chars() {
        if c == '.' {
            if has_dot {
                return Err("multiple dots");
            }
            has_dot = true;
        } else if !c.is_ascii_digit() {
            return Err("invalid character");
        }
    }
    if input == "." {
        return Err("invalid number");
    }
    input.parse::<f64>().map_err(|_| "parse error")
}

#[cfg(test)]
mod tests {
    use super::parse_decimal;

    #[test]
    fn parse_integer() {
        assert_eq!(parse_decimal("42").unwrap(), 42.0);
    }

    #[test]
    fn parse_float() {
        assert_eq!(parse_decimal("3.14").unwrap(), 3.14);
    }

    #[test]
    fn error_multiple_dots() {
        assert!(parse_decimal("1.2.3").is_err());
    }

    #[test]
    fn error_empty() {
        assert!(parse_decimal("").is_err());
    }

    #[test]
    fn error_only_dot() {
        assert!(parse_decimal(".").is_err());
    }

    #[test]
    fn error_invalid_char() {
        assert!(parse_decimal("1a2").is_err());
    }
}
