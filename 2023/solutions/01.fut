import "../prelude/prelude"

def find_first_and_last_digit (s: string[]) : (option u8, option u8) =
  let digits = filter (Char.is_digit) s
  in (
    Char.digit_to_u8 (digits[0]),
    Char.digit_to_u8 (digits[length digits - 1])
  )

def unwrap_first_and_last_digit (digits: (option u8, option u8)) : (u8, u8) =
  (Option.unwrap 0u8 digits.0, Option.unwrap 0u8 digits.1)

def combine_first_and_last_digit (digits: (u8, u8)) : u8 =
  digits.0 * 10 + digits.1

entry part1 (lines: string[]) =
  lines
  |> String.split_by_char '\n'
  |> String.from_slices lines
  |> map (\line ->
      find_first_and_last_digit (line)
    |> unwrap_first_and_last_digit
    |> combine_first_and_last_digit
    |> u64.u8
  )
  |> reduce (+) 0
