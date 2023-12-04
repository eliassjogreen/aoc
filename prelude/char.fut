import "./option"

type char = u8

module type Char = {
  val is_digit : char -> bool
  val digit_to_u8 : char -> option u8
}

module Char: Char = {
  def is_digit (c: char) : bool =
    c >= '0' && c <= '9'

  def digit_to_u8 (c: char) : option u8 =
    if is_digit(c) then #Some (c - '0') else #None
}
