type result 'a 'b = #Ok a | #Error b

module type Result = {}

module Result: Result = {}
