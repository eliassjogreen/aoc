import "./char"

type string [n] = [n]u8

type slice = (i64, i64)

module type String = {
  val length [n] : string[n] -> i64

  val find_char_indices [n] : char -> string[n] -> []i64

  val split_at_indices [n] [o] : [n]i64 -> string[o] -> []slice

  val split_by_char [n] : char -> string[n] -> []slice

  val from_slices [n] [o] : string[n] -> [o]slice -> []string[]
}

module String: String = {
  def length [n] (_: string[n]) = n

  def find_char_indices [n] (c: char) (s: string[n]) =
    filter (\i -> s[i] == c) (iota n)

  def split_at_indices [n] (splits: [n]i64) (s: string[]) =
    let ends   = splits ++ [length s] :> [n + 1]i64
    let starts = [0] ++ splits        :> [n + 1]i64
    in zip starts ends

  def split_by_char [n] (c: char) (s: string[n]) =
    split_at_indices (find_char_indices c s) s

  def from_slices (s: string[]) (slices: []slice) =
    let lengths =
      slices
      |> map (\slice -> slice.1 - slice.0)
    let length = i64.maximum lengths
    in
      zip slices lengths
      |> map (\(slice, slice_length) -> s[slice.0:slice.1] ++ replicate (length - slice_length) 0 :> string[length])
}
