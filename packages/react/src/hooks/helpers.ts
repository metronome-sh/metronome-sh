import { ClientEvent } from "@metronome-sh/runtime";

const n = 138;

export function stringify(queue: ClientEvent[]) {
  const str = JSON.stringify(queue);
  const date = new Date();
  const first = date.getUTCHours() + date.getUTCMinutes();
  date.setHours(date.getHours() + 13);
  const second = date.getUTCHours() + date.getUTCMinutes();

  function prep(k: number) {
    const chars = str.split("");

    for (var i = 0; i < chars.length; i++) {
      var c = chars[i].charCodeAt(0);

      if (c <= n) {
        chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + k) % n);
      }
    }
    return chars.join("");
  }

  return prep(first) + prep(second);
}
