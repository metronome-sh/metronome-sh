const n = 138;

const generateKeys = () => {
  const first = new Date();
  const firstKey = first.getUTCHours() + first.getUTCMinutes();

  const second = new Date();
  second.setHours(second.getHours() + 13);
  const secondKey = second.getUTCHours() + second.getUTCMinutes();

  return [firstKey, secondKey];
};

const encode = (str: string, key: number) => {
  const chars = str.split("");

  for (var i = 0; i < chars.length; i++) {
    var c = chars[i].charCodeAt(0);

    if (c <= n) {
      chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
    }
  }

  return chars.join("");
};

export const encodeObject = (obj: Record<string, any>) => {
  const [firstKey, secondKey] = generateKeys();
  const str = JSON.stringify(obj);
  return `${encode(str, firstKey)}${encode(str, secondKey)}`;
};

export const decodeObject = <T extends Record<string, any>>(
  str: string
): T | undefined => {
  const [firstKey, secondKey] = generateKeys();
  const middle = str.length / 2;
  const encoded = str.slice(0, middle);
  const encoded2 = str.slice(middle);

  // Try to decode the first string
  try {
    return JSON.parse(encode(encoded, n - firstKey));
  } catch (error) {}

  // Try to decode the second string
  try {
    return JSON.parse(encode(encoded2, n - secondKey));
  } catch (error) {}

  return undefined;
};
