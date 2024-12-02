const encoder = new TextEncoder();

const stdin = [];
let length = 0n;
for await (const value of Deno.stdin.readable.values()) {
  stdin.push(value);
  length += BigInt(value.length);
}

await Deno.stdout.write(encoder.encode("b"));
// Version
await Deno.stdout.write(new Uint8Array([2]));
// Dimensions
await Deno.stdout.write(new Uint8Array([1]));
// Type
await Deno.stdout.write(encoder.encode("  u8"));
// Length
await Deno.stdout.write(
  new Uint8Array(new BigUint64Array([length]).buffer),
);

for (const value of stdin) {
  await Deno.stdout.write(value);
}
