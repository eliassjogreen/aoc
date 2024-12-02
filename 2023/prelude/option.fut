type option 'a = #Some a | #None

module type Option = {
  val and 'a : option a -> option a -> option a

  val unwrap 'a : a -> option a -> a
}

module Option: Option = {
  def and 'a (and_value: option a) (value: option a) =
    match value
      case #Some _ -> value
      case #None -> and_value

  def unwrap 'a (default_value: a) (value: option a) =
    match value
      case #Some a -> a
      case #None -> default_value
}
