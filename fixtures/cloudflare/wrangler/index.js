var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
  }
});

// ../../../node_modules/.pnpm/wrangler@3.48.0_@cloudflare+workers-types@4.20240405.0/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../node_modules/.pnpm/wrangler@3.48.0_@cloudflare+workers-types@4.20240405.0/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../../node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "../../../node_modules/.pnpm/cookie@0.6.0/node_modules/cookie/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    exports.parse = parse2;
    exports.serialize = serialize;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (void 0 === obj[key]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/warnings.js
var require_warnings = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/warnings.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var alreadyWarned = {};
    function warnOnce(condition, message) {
      if (!condition && !alreadyWarned[message]) {
        alreadyWarned[message] = true;
        console.warn(message);
      }
    }
    exports.warnOnce = warnOnce;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/cookies.js
var require_cookies = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/cookies.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookie = require_cookie();
    var warnings = require_warnings();
    var createCookieFactory = ({
      sign,
      unsign
    }) => (name, cookieOptions = {}) => {
      let {
        secrets = [],
        ...options
      } = {
        path: "/",
        sameSite: "lax",
        ...cookieOptions
      };
      warnOnceAboutExpiresCookie(name, options.expires);
      return {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = cookie.parse(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(unsign, cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return cookie.serialize(name, value === "" ? "" : await encodeCookieValue(sign, value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    };
    var isCookie = (object) => {
      return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
    };
    async function encodeCookieValue(sign, value, secrets) {
      let encoded = encodeData(value);
      if (secrets.length > 0) {
        encoded = await sign(encoded, secrets[0]);
      }
      return encoded;
    }
    async function decodeCookieValue(unsign, value, secrets) {
      if (secrets.length > 0) {
        for (let secret of secrets) {
          let unsignedValue = await unsign(value, secret);
          if (unsignedValue !== false) {
            return decodeData(unsignedValue);
          }
        }
        return null;
      }
      return decodeData(value);
    }
    function encodeData(value) {
      return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
    }
    function decodeData(value) {
      try {
        return JSON.parse(decodeURIComponent(myEscape(atob(value))));
      } catch (error) {
        return {};
      }
    }
    function myEscape(value) {
      let str = value.toString();
      let result = "";
      let index = 0;
      let chr, code;
      while (index < str.length) {
        chr = str.charAt(index++);
        if (/[\w*+\-./@]/.exec(chr)) {
          result += chr;
        } else {
          code = chr.charCodeAt(0);
          if (code < 256) {
            result += "%" + hex(code, 2);
          } else {
            result += "%u" + hex(code, 4).toUpperCase();
          }
        }
      }
      return result;
    }
    function hex(code, length) {
      let result = code.toString(16);
      while (result.length < length)
        result = "0" + result;
      return result;
    }
    function myUnescape(value) {
      let str = value.toString();
      let result = "";
      let index = 0;
      let chr, part;
      while (index < str.length) {
        chr = str.charAt(index++);
        if (chr === "%") {
          if (str.charAt(index) === "u") {
            part = str.slice(index + 1, index + 5);
            if (/^[\da-f]{4}$/i.exec(part)) {
              result += String.fromCharCode(parseInt(part, 16));
              index += 5;
              continue;
            }
          } else {
            part = str.slice(index, index + 2);
            if (/^[\da-f]{2}$/i.exec(part)) {
              result += String.fromCharCode(parseInt(part, 16));
              index += 2;
              continue;
            }
          }
        }
        result += chr;
      }
      return result;
    }
    function warnOnceAboutExpiresCookie(name, expires) {
      warnings.warnOnce(!expires, `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
    }
    exports.createCookieFactory = createCookieFactory;
    exports.isCookie = isCookie;
  }
});

// ../../../node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  const utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  const utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  const out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0));
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
}
function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_utils = __esm({
  "../../../node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
  }
});

// ../../../node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  if (a instanceof Uint8Array) {
    return (index) => a[index];
  }
  return a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  const fn1 = coerce(buf1);
  const fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i) {
    if (fn1(pos1 + i) !== fn2(pos2 + i)) {
      return false;
    }
  }
  return true;
}
function createOccurenceTable(s) {
  const table = new Array(256).fill(s.length);
  if (s.length > 1) {
    for (let i = 0; i < s.length - 1; i++) {
      table[s[i]] = s.length - 1 - i;
    }
  }
  return table;
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch;
var init_search = __esm({
  "../../../node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_utils();
    MATCH = Symbol("Match");
    StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array();
        if (typeof needle === "string") {
          this._needle = needle = stringToArray(needle);
        } else {
          this._needle = needle;
        }
        this._lastChar = needle[needle.length - 1];
        this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0;
        let tokens;
        const allTokens = [];
        while (pos !== chunk.length) {
          ;
          [pos, ...tokens] = this._feed(chunk, pos);
          allTokens.push(...tokens);
        }
        return allTokens;
      }
      end() {
        const tail = this._lookbehind;
        this._lookbehind = new Uint8Array();
        return tail;
      }
      _feed(data, bufPos) {
        const tokens = [];
        let pos = -this._lookbehind.length;
        if (pos < 0) {
          while (pos < 0 && pos <= data.length - this._needle.length) {
            const ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1)) {
              if (pos > -this._lookbehind.length) {
                tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos));
              }
              tokens.push(MATCH);
              this._lookbehind = new Uint8Array();
              return [
                pos + this._needle.length,
                ...tokens
              ];
            } else {
              pos += this._occ[ch];
            }
          }
          if (pos < 0) {
            while (pos < 0 && !this._memcmp(data, pos, data.length - pos)) {
              pos++;
            }
          }
          if (pos >= 0) {
            tokens.push(this._lookbehind);
            this._lookbehind = new Uint8Array();
          } else {
            const bytesToCutOff = this._lookbehind.length + pos;
            if (bytesToCutOff > 0) {
              tokens.push(this._lookbehind.slice(0, bytesToCutOff));
              this._lookbehind = this._lookbehind.slice(bytesToCutOff);
            }
            this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_, i) => this._charAt(data, i - this._lookbehind.length));
            return [
              data.length,
              ...tokens
            ];
          }
        }
        pos += bufPos;
        while (pos <= data.length - this._needle.length) {
          const ch = data[pos + this._needle.length - 1];
          if (ch === this._lastChar && data[pos] === this._needle[0] && jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1)) {
            if (pos > bufPos) {
              tokens.push(data.slice(bufPos, pos));
            }
            tokens.push(MATCH);
            return [
              pos + this._needle.length,
              ...tokens
            ];
          } else {
            pos += this._occ[ch];
          }
        }
        if (pos < data.length) {
          while (pos < data.length && (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos))) {
            ++pos;
          }
          if (pos < data.length) {
            this._lookbehind = data.slice(pos);
          }
        }
        if (pos > 0) {
          tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length));
        }
        return [
          data.length,
          ...tokens
        ];
      }
      _charAt(data, pos) {
        if (pos < 0) {
          return this._lookbehind[this._lookbehind.length + pos];
        }
        return data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    };
    ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream;
        this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        const reader = this._readableStream.getReader();
        try {
          while (true) {
            const result = await reader.read();
            if (result.done) {
              break;
            }
            yield* this._search.feed(result.value);
          }
          const tail = this._search.end();
          if (tail.length) {
            yield tail;
          }
        } finally {
          reader.releaseLock();
        }
      }
    };
    EOQ = Symbol("End of Queue");
    QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [];
        this._closed = false;
        this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed) {
          throw new Error("cannot call push after close");
        }
        this._chunksQueue.push(...chunks);
        if (this._notify) {
          this._notify();
        }
      }
      close() {
        if (this._closed) {
          throw new Error("close was already called");
        }
        this._closed = true;
        this._chunksQueue.push(EOQ);
        if (this._notify) {
          this._notify();
        }
      }
      async *[Symbol.asyncIterator]() {
        while (true) {
          let chunk;
          while (!(chunk = this._chunksQueue.shift())) {
            await new Promise((resolve) => this._notify = resolve);
            this._notify = void 0;
          }
          if (chunk === EOQ) {
            break;
          }
          yield* this._search.feed(chunk);
        }
        const tail = this._search.end();
        if (tail.length) {
          yield tail;
        }
      }
    };
  }
});

// ../../../node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/index.js
var src_exports = {};
__export(src_exports, {
  iterateMultipart: () => iterateMultipart,
  streamMultipart: () => streamMultipart
});
function parseContentDisposition(header) {
  const parts = header.split(";").map((part) => part.trim());
  if (parts.shift() !== "form-data") {
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + "`");
  }
  const out = {};
  for (const part of parts) {
    const kv = part.split("=", 2);
    if (kv.length !== 2) {
      throw new Error("malformed content-disposition header: key-value pair not found - " + part + " in `" + header + "`");
    }
    const [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"') {
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    } else if (value[0] !== '"' && value[value.length - 1] !== '"') {
      out[name] = value;
    } else if (value[0] === '"' && value[value.length - 1] !== '"' || value[0] !== '"' && value[value.length - 1] === '"') {
      throw new Error("malformed content-disposition header: mismatched quotations in `" + header + "`");
    }
  }
  if (!out.name) {
    throw new Error("malformed content-disposition header: missing field name in `" + header + "`");
  }
  return out;
}
function parsePartHeaders(lines) {
  const entries = [];
  let disposition = false;
  let line;
  while (typeof (line = lines.shift()) !== "undefined") {
    const colon = line.indexOf(":");
    if (colon === -1) {
      throw new Error("malformed multipart-form header: missing colon");
    }
    const header = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    switch (header) {
      case "content-disposition":
        disposition = true;
        entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case "content-type":
        entries.push([
          "contentType",
          value
        ]);
    }
  }
  if (!disposition) {
    throw new Error("malformed multipart-form header: missing content-disposition");
  }
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = true;
  let lastTokenWasMatch = false;
  const headerLines = [[]];
  const crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    const result = await it.next();
    if (result.done) {
      throw new Error("malformed multipart-form data: unexpected end of stream");
    }
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash)) {
      return [
        void 0,
        new Uint8Array()
      ];
    }
    let chunk;
    if (result.value !== MATCH) {
      chunk = result.value;
    } else if (!lastTokenWasMatch) {
      chunk = needle;
    } else {
      throw new Error("malformed multipart-form data: unexpected boundary");
    }
    if (!chunk.length) {
      continue;
    }
    if (firstChunk) {
      firstChunk = false;
    }
    const tokens = crlfSearch.feed(chunk);
    for (const [i, token] of tokens.entries()) {
      const isMatch = token === MATCH;
      if (!isMatch && !token.length) {
        continue;
      }
      if (lastTokenWasMatch && isMatch) {
        tokens.push(crlfSearch.end());
        return [
          headerLines.filter((chunks) => chunks.length).map(mergeArrays2).map(arrayToString),
          mergeArrays(...tokens.slice(i + 1).map((token2) => token2 === MATCH ? CRLF : token2))
        ];
      }
      if (lastTokenWasMatch = isMatch) {
        headerLines.push([]);
      } else {
        headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  const needle = mergeArrays(dash, stringToArray(boundary));
  const it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (; ; ) {
    const result = await it.next();
    if (result.done) {
      return;
    }
    if (result.value === MATCH) {
      break;
    }
  }
  const crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let feedChunk = function(chunk) {
      const chunks = [];
      for (const token of crlfSearch.feed(chunk)) {
        if (trailingCRLF) {
          chunks.push(CRLF);
        }
        if (!(trailingCRLF = token === MATCH)) {
          chunks.push(token);
        }
      }
      return mergeArrays(...chunks);
    };
    const [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines) {
      return;
    }
    async function nextToken() {
      const result = await it.next();
      if (result.done) {
        throw new Error("malformed multipart-form data: unexpected end of stream");
      }
      return result;
    }
    let trailingCRLF = false;
    let done = false;
    async function nextChunk() {
      const result = await nextToken();
      let chunk;
      if (result.value !== MATCH) {
        chunk = result.value;
      } else if (!trailingCRLF) {
        chunk = CRLF;
      } else {
        done = true;
        return { value: crlfSearch.end() };
      }
      return { value: feedChunk(chunk) };
    }
    const bufferedChunks = [{ value: feedChunk(tail) }];
    yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (; ; ) {
            const result = bufferedChunks.shift();
            if (!result) {
              break;
            }
            if (result.value.length > 0) {
              return result;
            }
          }
          for (; ; ) {
            if (done) {
              return {
                done,
                value: void 0
              };
            }
            const result = await nextChunk();
            if (result.value.length > 0) {
              return result;
            }
          }
        }
      }
    };
    while (!done) {
      bufferedChunks.push(await nextChunk());
    }
  }
}
async function* iterateMultipart(body, boundary) {
  for await (const part of streamMultipart(body, boundary)) {
    const chunks = [];
    for await (const chunk of part.data) {
      chunks.push(chunk);
    }
    yield {
      ...part,
      data: mergeArrays(...chunks)
    };
  }
}
var mergeArrays2, dash, CRLF;
var init_src = __esm({
  "../../../node_modules/.pnpm/@web3-storage+multipart-parser@1.0.0/node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0);
    dash = stringToArray("--");
    CRLF = stringToArray("\r\n");
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/formData.js
var require_formData = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/formData.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var multipartParser = (init_src(), __toCommonJS(src_exports));
    function composeUploadHandlers(...handlers) {
      return async (part) => {
        for (let handler of handlers) {
          let value = await handler(part);
          if (typeof value !== "undefined" && value !== null) {
            return value;
          }
        }
        return void 0;
      };
    }
    async function parseMultipartFormData(request, uploadHandler) {
      let contentType = request.headers.get("Content-Type") || "";
      let [type, boundary] = contentType.split(/\s*;\s*boundary=/);
      if (!request.body || !boundary || type !== "multipart/form-data") {
        throw new TypeError("Could not parse content as FormData.");
      }
      let formData = new FormData();
      let parts = multipartParser.streamMultipart(request.body, boundary);
      for await (let part of parts) {
        if (part.done)
          break;
        if (typeof part.filename === "string") {
          part.filename = part.filename.split(/[/\\]/).pop();
        }
        let value = await uploadHandler(part);
        if (typeof value !== "undefined" && value !== null) {
          formData.append(part.name, value);
        }
      }
      return formData;
    }
    exports.composeUploadHandlers = composeUploadHandlers;
    exports.parseMultipartFormData = parseMultipartFormData;
  }
});

// ../../../node_modules/.pnpm/@remix-run+router@1.15.3/node_modules/@remix-run/router/dist/router.cjs.js
var require_router_cjs = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+router@1.15.3/node_modules/@remix-run/router/dist/router.cjs.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    function _extends2() {
      _extends2 = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends2.apply(this, arguments);
    }
    var Action = /* @__PURE__ */ function(Action2) {
      Action2["Pop"] = "POP";
      Action2["Push"] = "PUSH";
      Action2["Replace"] = "REPLACE";
      return Action2;
    }({});
    var PopStateEventType = "popstate";
    function createMemoryHistory(options) {
      if (options === void 0) {
        options = {};
      }
      let {
        initialEntries = ["/"],
        initialIndex,
        v5Compat = false
      } = options;
      let entries;
      entries = initialEntries.map((entry2, index2) => createMemoryLocation(entry2, typeof entry2 === "string" ? null : entry2.state, index2 === 0 ? "default" : void 0));
      let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
      let action2 = Action.Pop;
      let listener = null;
      function clampIndex(n) {
        return Math.min(Math.max(n, 0), entries.length - 1);
      }
      function getCurrentLocation() {
        return entries[index];
      }
      function createMemoryLocation(to, state, key) {
        if (state === void 0) {
          state = null;
        }
        let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
        return location;
      }
      function createHref(to) {
        return typeof to === "string" ? to : createPath2(to);
      }
      let history = {
        get index() {
          return index;
        },
        get action() {
          return action2;
        },
        get location() {
          return getCurrentLocation();
        },
        createHref,
        createURL(to) {
          return new URL(createHref(to), "http://localhost");
        },
        encodeLocation(to) {
          let path = typeof to === "string" ? parsePath3(to) : to;
          return {
            pathname: path.pathname || "",
            search: path.search || "",
            hash: path.hash || ""
          };
        },
        push(to, state) {
          action2 = Action.Push;
          let nextLocation = createMemoryLocation(to, state);
          index += 1;
          entries.splice(index, entries.length, nextLocation);
          if (v5Compat && listener) {
            listener({
              action: action2,
              location: nextLocation,
              delta: 1
            });
          }
        },
        replace(to, state) {
          action2 = Action.Replace;
          let nextLocation = createMemoryLocation(to, state);
          entries[index] = nextLocation;
          if (v5Compat && listener) {
            listener({
              action: action2,
              location: nextLocation,
              delta: 0
            });
          }
        },
        go(delta) {
          action2 = Action.Pop;
          let nextIndex = clampIndex(index + delta);
          let nextLocation = entries[nextIndex];
          index = nextIndex;
          if (listener) {
            listener({
              action: action2,
              location: nextLocation,
              delta
            });
          }
        },
        listen(fn) {
          listener = fn;
          return () => {
            listener = null;
          };
        }
      };
      return history;
    }
    function createBrowserHistory(options) {
      if (options === void 0) {
        options = {};
      }
      function createBrowserLocation(window2, globalHistory) {
        let {
          pathname,
          search,
          hash
        } = window2.location;
        return createLocation(
          "",
          {
            pathname,
            search,
            hash
          },
          // state defaults to `null` because `window.history.state` does
          globalHistory.state && globalHistory.state.usr || null,
          globalHistory.state && globalHistory.state.key || "default"
        );
      }
      function createBrowserHref(window2, to) {
        return typeof to === "string" ? to : createPath2(to);
      }
      return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
    }
    function createHashHistory(options) {
      if (options === void 0) {
        options = {};
      }
      function createHashLocation(window2, globalHistory) {
        let {
          pathname = "/",
          search = "",
          hash = ""
        } = parsePath3(window2.location.hash.substr(1));
        if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
          pathname = "/" + pathname;
        }
        return createLocation(
          "",
          {
            pathname,
            search,
            hash
          },
          // state defaults to `null` because `window.history.state` does
          globalHistory.state && globalHistory.state.usr || null,
          globalHistory.state && globalHistory.state.key || "default"
        );
      }
      function createHashHref(window2, to) {
        let base = window2.document.querySelector("base");
        let href = "";
        if (base && base.getAttribute("href")) {
          let url = window2.location.href;
          let hashIndex = url.indexOf("#");
          href = hashIndex === -1 ? url : url.slice(0, hashIndex);
        }
        return href + "#" + (typeof to === "string" ? to : createPath2(to));
      }
      function validateHashLocation(location, to) {
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
      }
      return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
    }
    function invariant2(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        throw new Error(message);
      }
    }
    function warning(cond, message) {
      if (!cond) {
        if (typeof console !== "undefined")
          console.warn(message);
        try {
          throw new Error(message);
        } catch (e) {
        }
      }
    }
    function createKey() {
      return Math.random().toString(36).substr(2, 8);
    }
    function getHistoryState(location, index) {
      return {
        usr: location.state,
        key: location.key,
        idx: index
      };
    }
    function createLocation(current, to, state, key) {
      if (state === void 0) {
        state = null;
      }
      let location = _extends2({
        pathname: typeof current === "string" ? current : current.pathname,
        search: "",
        hash: ""
      }, typeof to === "string" ? parsePath3(to) : to, {
        state,
        // TODO: This could be cleaned up.  push/replace should probably just take
        // full Locations now and avoid the need to run through this flow at all
        // But that's a pretty big refactor to the current test suite so going to
        // keep as is for the time being and just let any incoming keys take precedence
        key: to && to.key || key || createKey()
      });
      return location;
    }
    function createPath2(_ref) {
      let {
        pathname = "/",
        search = "",
        hash = ""
      } = _ref;
      if (search && search !== "?")
        pathname += search.charAt(0) === "?" ? search : "?" + search;
      if (hash && hash !== "#")
        pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
      return pathname;
    }
    function parsePath3(path) {
      let parsedPath = {};
      if (path) {
        let hashIndex = path.indexOf("#");
        if (hashIndex >= 0) {
          parsedPath.hash = path.substr(hashIndex);
          path = path.substr(0, hashIndex);
        }
        let searchIndex = path.indexOf("?");
        if (searchIndex >= 0) {
          parsedPath.search = path.substr(searchIndex);
          path = path.substr(0, searchIndex);
        }
        if (path) {
          parsedPath.pathname = path;
        }
      }
      return parsedPath;
    }
    function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
      if (options === void 0) {
        options = {};
      }
      let {
        window: window2 = document.defaultView,
        v5Compat = false
      } = options;
      let globalHistory = window2.history;
      let action2 = Action.Pop;
      let listener = null;
      let index = getIndex();
      if (index == null) {
        index = 0;
        globalHistory.replaceState(_extends2({}, globalHistory.state, {
          idx: index
        }), "");
      }
      function getIndex() {
        let state = globalHistory.state || {
          idx: null
        };
        return state.idx;
      }
      function handlePop() {
        action2 = Action.Pop;
        let nextIndex = getIndex();
        let delta = nextIndex == null ? null : nextIndex - index;
        index = nextIndex;
        if (listener) {
          listener({
            action: action2,
            location: history.location,
            delta
          });
        }
      }
      function push(to, state) {
        action2 = Action.Push;
        let location = createLocation(history.location, to, state);
        if (validateLocation)
          validateLocation(location, to);
        index = getIndex() + 1;
        let historyState = getHistoryState(location, index);
        let url = history.createHref(location);
        try {
          globalHistory.pushState(historyState, "", url);
        } catch (error) {
          if (error instanceof DOMException && error.name === "DataCloneError") {
            throw error;
          }
          window2.location.assign(url);
        }
        if (v5Compat && listener) {
          listener({
            action: action2,
            location: history.location,
            delta: 1
          });
        }
      }
      function replace(to, state) {
        action2 = Action.Replace;
        let location = createLocation(history.location, to, state);
        if (validateLocation)
          validateLocation(location, to);
        index = getIndex();
        let historyState = getHistoryState(location, index);
        let url = history.createHref(location);
        globalHistory.replaceState(historyState, "", url);
        if (v5Compat && listener) {
          listener({
            action: action2,
            location: history.location,
            delta: 0
          });
        }
      }
      function createURL(to) {
        let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
        let href = typeof to === "string" ? to : createPath2(to);
        href = href.replace(/ $/, "%20");
        invariant2(base, "No window.location.(origin|href) available to create URL for href: " + href);
        return new URL(href, base);
      }
      let history = {
        get action() {
          return action2;
        },
        get location() {
          return getLocation(window2, globalHistory);
        },
        listen(fn) {
          if (listener) {
            throw new Error("A history only accepts one active listener");
          }
          window2.addEventListener(PopStateEventType, handlePop);
          listener = fn;
          return () => {
            window2.removeEventListener(PopStateEventType, handlePop);
            listener = null;
          };
        },
        createHref(to) {
          return createHref(window2, to);
        },
        createURL,
        encodeLocation(to) {
          let url = createURL(to);
          return {
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
          };
        },
        push,
        replace,
        go(n) {
          return globalHistory.go(n);
        }
      };
      return history;
    }
    var ResultType = /* @__PURE__ */ function(ResultType2) {
      ResultType2["data"] = "data";
      ResultType2["deferred"] = "deferred";
      ResultType2["redirect"] = "redirect";
      ResultType2["error"] = "error";
      return ResultType2;
    }({});
    var immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    function isIndexRoute(route) {
      return route.index === true;
    }
    function convertRoutesToDataRoutes(routes3, mapRouteProperties, parentPath, manifest) {
      if (parentPath === void 0) {
        parentPath = [];
      }
      if (manifest === void 0) {
        manifest = {};
      }
      return routes3.map((route, index) => {
        let treePath = [...parentPath, index];
        let id = typeof route.id === "string" ? route.id : treePath.join("-");
        invariant2(route.index !== true || !route.children, "Cannot specify children on an index route");
        invariant2(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`);
        if (isIndexRoute(route)) {
          let indexRoute = _extends2({}, route, mapRouteProperties(route), {
            id
          });
          manifest[id] = indexRoute;
          return indexRoute;
        } else {
          let pathOrLayoutRoute = _extends2({}, route, mapRouteProperties(route), {
            id,
            children: void 0
          });
          manifest[id] = pathOrLayoutRoute;
          if (route.children) {
            pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
          }
          return pathOrLayoutRoute;
        }
      });
    }
    function matchRoutes3(routes3, locationArg, basename2) {
      if (basename2 === void 0) {
        basename2 = "/";
      }
      let location = typeof locationArg === "string" ? parsePath3(locationArg) : locationArg;
      let pathname = stripBasename(location.pathname || "/", basename2);
      if (pathname == null) {
        return null;
      }
      let branches = flattenRoutes(routes3);
      rankRouteBranches(branches);
      let matches = null;
      for (let i = 0; matches == null && i < branches.length; ++i) {
        let decoded = decodePath(pathname);
        matches = matchRouteBranch(branches[i], decoded);
      }
      return matches;
    }
    function convertRouteMatchToUiMatch(match3, loaderData) {
      let {
        route,
        pathname,
        params
      } = match3;
      return {
        id: route.id,
        pathname,
        params,
        data: loaderData[route.id],
        handle: route.handle
      };
    }
    function flattenRoutes(routes3, branches, parentsMeta, parentPath) {
      if (branches === void 0) {
        branches = [];
      }
      if (parentsMeta === void 0) {
        parentsMeta = [];
      }
      if (parentPath === void 0) {
        parentPath = "";
      }
      let flattenRoute = (route, index, relativePath) => {
        let meta2 = {
          relativePath: relativePath === void 0 ? route.path || "" : relativePath,
          caseSensitive: route.caseSensitive === true,
          childrenIndex: index,
          route
        };
        if (meta2.relativePath.startsWith("/")) {
          invariant2(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
          meta2.relativePath = meta2.relativePath.slice(parentPath.length);
        }
        let path = joinPaths([parentPath, meta2.relativePath]);
        let routesMeta = parentsMeta.concat(meta2);
        if (route.children && route.children.length > 0) {
          invariant2(
            // Our types know better, but runtime JS may not!
            // @ts-expect-error
            route.index !== true,
            "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
          );
          flattenRoutes(route.children, branches, routesMeta, path);
        }
        if (route.path == null && !route.index) {
          return;
        }
        branches.push({
          path,
          score: computeScore(path, route.index),
          routesMeta
        });
      };
      routes3.forEach((route, index) => {
        var _route$path;
        if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
          flattenRoute(route, index);
        } else {
          for (let exploded of explodeOptionalSegments(route.path)) {
            flattenRoute(route, index, exploded);
          }
        }
      });
      return branches;
    }
    function explodeOptionalSegments(path) {
      let segments = path.split("/");
      if (segments.length === 0)
        return [];
      let [first, ...rest] = segments;
      let isOptional = first.endsWith("?");
      let required = first.replace(/\?$/, "");
      if (rest.length === 0) {
        return isOptional ? [required, ""] : [required];
      }
      let restExploded = explodeOptionalSegments(rest.join("/"));
      let result = [];
      result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
      if (isOptional) {
        result.push(...restExploded);
      }
      return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
    }
    function rankRouteBranches(branches) {
      branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
    }
    var paramRe = /^:[\w-]+$/;
    var dynamicSegmentValue = 3;
    var indexRouteValue = 2;
    var emptySegmentValue = 1;
    var staticSegmentValue = 10;
    var splatPenalty = -2;
    var isSplat = (s) => s === "*";
    function computeScore(path, index) {
      let segments = path.split("/");
      let initialScore = segments.length;
      if (segments.some(isSplat)) {
        initialScore += splatPenalty;
      }
      if (index) {
        initialScore += indexRouteValue;
      }
      return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
    }
    function compareIndexes(a, b) {
      let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
      return siblings ? (
        // If two routes are siblings, we should try to match the earlier sibling
        // first. This allows people to have fine-grained control over the matching
        // behavior by simply putting routes with identical paths in the order they
        // want them tried.
        a[a.length - 1] - b[b.length - 1]
      ) : (
        // Otherwise, it doesn't really make sense to rank non-siblings by index,
        // so they sort equally.
        0
      );
    }
    function matchRouteBranch(branch, pathname) {
      let {
        routesMeta
      } = branch;
      let matchedParams = {};
      let matchedPathname = "/";
      let matches = [];
      for (let i = 0; i < routesMeta.length; ++i) {
        let meta2 = routesMeta[i];
        let end = i === routesMeta.length - 1;
        let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
        let match3 = matchPath2({
          path: meta2.relativePath,
          caseSensitive: meta2.caseSensitive,
          end
        }, remainingPathname);
        if (!match3)
          return null;
        Object.assign(matchedParams, match3.params);
        let route = meta2.route;
        matches.push({
          // TODO: Can this as be avoided?
          params: matchedParams,
          pathname: joinPaths([matchedPathname, match3.pathname]),
          pathnameBase: normalizePathname(joinPaths([matchedPathname, match3.pathnameBase])),
          route
        });
        if (match3.pathnameBase !== "/") {
          matchedPathname = joinPaths([matchedPathname, match3.pathnameBase]);
        }
      }
      return matches;
    }
    function generatePath2(originalPath, params) {
      if (params === void 0) {
        params = {};
      }
      let path = originalPath;
      if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
        warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
        path = path.replace(/\*$/, "/*");
      }
      const prefix = path.startsWith("/") ? "/" : "";
      const stringify = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
      const segments = path.split(/\/+/).map((segment, index, array) => {
        const isLastSegment = index === array.length - 1;
        if (isLastSegment && segment === "*") {
          const star = "*";
          return stringify(params[star]);
        }
        const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
        if (keyMatch) {
          const [, key, optional] = keyMatch;
          let param = params[key];
          invariant2(optional === "?" || param != null, 'Missing ":' + key + '" param');
          return stringify(param);
        }
        return segment.replace(/\?$/g, "");
      }).filter((segment) => !!segment);
      return prefix + segments.join("/");
    }
    function matchPath2(pattern, pathname) {
      if (typeof pattern === "string") {
        pattern = {
          path: pattern,
          caseSensitive: false,
          end: true
        };
      }
      let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
      let match3 = pathname.match(matcher);
      if (!match3)
        return null;
      let matchedPathname = match3[0];
      let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
      let captureGroups = match3.slice(1);
      let params = compiledParams.reduce((memo, _ref, index) => {
        let {
          paramName,
          isOptional
        } = _ref;
        if (paramName === "*") {
          let splatValue = captureGroups[index] || "";
          pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
        }
        const value = captureGroups[index];
        if (isOptional && !value) {
          memo[paramName] = void 0;
        } else {
          memo[paramName] = (value || "").replace(/%2F/g, "/");
        }
        return memo;
      }, {});
      return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern
      };
    }
    function compilePath(path, caseSensitive, end) {
      if (caseSensitive === void 0) {
        caseSensitive = false;
      }
      if (end === void 0) {
        end = true;
      }
      warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
      let params = [];
      let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
        params.push({
          paramName,
          isOptional: isOptional != null
        });
        return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
      });
      if (path.endsWith("*")) {
        params.push({
          paramName: "*"
        });
        regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
      } else if (end) {
        regexpSource += "\\/*$";
      } else if (path !== "" && path !== "/") {
        regexpSource += "(?:(?=\\/|$))";
      } else
        ;
      let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
      return [matcher, params];
    }
    function decodePath(value) {
      try {
        return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
      } catch (error) {
        warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
        return value;
      }
    }
    function stripBasename(pathname, basename2) {
      if (basename2 === "/")
        return pathname;
      if (!pathname.toLowerCase().startsWith(basename2.toLowerCase())) {
        return null;
      }
      let startIndex = basename2.endsWith("/") ? basename2.length - 1 : basename2.length;
      let nextChar = pathname.charAt(startIndex);
      if (nextChar && nextChar !== "/") {
        return null;
      }
      return pathname.slice(startIndex) || "/";
    }
    function resolvePath2(to, fromPathname) {
      if (fromPathname === void 0) {
        fromPathname = "/";
      }
      let {
        pathname: toPathname,
        search = "",
        hash = ""
      } = typeof to === "string" ? parsePath3(to) : to;
      let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
      return {
        pathname,
        search: normalizeSearch(search),
        hash: normalizeHash(hash)
      };
    }
    function resolvePathname(relativePath, fromPathname) {
      let segments = fromPathname.replace(/\/+$/, "").split("/");
      let relativeSegments = relativePath.split("/");
      relativeSegments.forEach((segment) => {
        if (segment === "..") {
          if (segments.length > 1)
            segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });
      return segments.length > 1 ? segments.join("/") : "/";
    }
    function getInvalidPathError(char, field, dest, path) {
      return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
    }
    function getPathContributingMatches(matches) {
      return matches.filter((match3, index) => index === 0 || match3.route.path && match3.route.path.length > 0);
    }
    function getResolveToMatches(matches, v7_relativeSplatPath) {
      let pathMatches = getPathContributingMatches(matches);
      if (v7_relativeSplatPath) {
        return pathMatches.map((match3, idx) => idx === matches.length - 1 ? match3.pathname : match3.pathnameBase);
      }
      return pathMatches.map((match3) => match3.pathnameBase);
    }
    function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
      if (isPathRelative === void 0) {
        isPathRelative = false;
      }
      let to;
      if (typeof toArg === "string") {
        to = parsePath3(toArg);
      } else {
        to = _extends2({}, toArg);
        invariant2(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
        invariant2(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
        invariant2(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
      }
      let isEmptyPath = toArg === "" || to.pathname === "";
      let toPathname = isEmptyPath ? "/" : to.pathname;
      let from;
      if (toPathname == null) {
        from = locationPathname;
      } else {
        let routePathnameIndex = routePathnames.length - 1;
        if (!isPathRelative && toPathname.startsWith("..")) {
          let toSegments = toPathname.split("/");
          while (toSegments[0] === "..") {
            toSegments.shift();
            routePathnameIndex -= 1;
          }
          to.pathname = toSegments.join("/");
        }
        from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
      }
      let path = resolvePath2(to, from);
      let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
      let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
      if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
        path.pathname += "/";
      }
      return path;
    }
    function getToPathname(to) {
      return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath3(to).pathname : to.pathname;
    }
    var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
    var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
    var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
    var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
    var json2 = function json3(data, init) {
      if (init === void 0) {
        init = {};
      }
      let responseInit = typeof init === "number" ? {
        status: init
      } : init;
      let headers = new Headers(responseInit.headers);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json; charset=utf-8");
      }
      return new Response(JSON.stringify(data), _extends2({}, responseInit, {
        headers
      }));
    };
    var AbortedDeferredError = class extends Error {
    };
    var DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set();
        this.subscribers = /* @__PURE__ */ new Set();
        this.deferredKeys = [];
        invariant2(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r);
        this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
        this.controller.signal.addEventListener("abort", onAbort);
        this.data = Object.entries(data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {});
        if (this.done) {
          this.unlistenAbortSignal();
        }
        this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise)) {
          return value;
        }
        this.deferredKeys.push(key);
        this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
        promise.catch(() => {
        });
        Object.defineProperty(promise, "_tracked", {
          get: () => true
        });
        return promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
          this.unlistenAbortSignal();
          Object.defineProperty(promise, "_error", {
            get: () => error
          });
          return Promise.reject(error);
        }
        this.pendingKeysSet.delete(key);
        if (this.done) {
          this.unlistenAbortSignal();
        }
        if (error === void 0 && data === void 0) {
          let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
          Object.defineProperty(promise, "_error", {
            get: () => undefinedError
          });
          this.emit(false, key);
          return Promise.reject(undefinedError);
        }
        if (data === void 0) {
          Object.defineProperty(promise, "_error", {
            get: () => error
          });
          this.emit(false, key);
          return Promise.reject(error);
        }
        Object.defineProperty(promise, "_data", {
          get: () => data
        });
        this.emit(false, key);
        return data;
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort();
        this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
        this.emit(true);
      }
      async resolveData(signal) {
        let aborted = false;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort);
          aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort);
              if (aborted2 || this.done) {
                resolve(aborted2);
              }
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        invariant2(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
        return Object.entries(this.data).reduce((acc, _ref3) => {
          let [key, value] = _ref3;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    function isTrackedPromise(value) {
      return value instanceof Promise && value._tracked === true;
    }
    function unwrapTrackedPromise(value) {
      if (!isTrackedPromise(value)) {
        return value;
      }
      if (value._error) {
        throw value._error;
      }
      return value._data;
    }
    var defer = function defer2(data, init) {
      if (init === void 0) {
        init = {};
      }
      let responseInit = typeof init === "number" ? {
        status: init
      } : init;
      return new DeferredData(data, responseInit);
    };
    var redirect2 = function redirect3(url, init) {
      if (init === void 0) {
        init = 302;
      }
      let responseInit = init;
      if (typeof responseInit === "number") {
        responseInit = {
          status: responseInit
        };
      } else if (typeof responseInit.status === "undefined") {
        responseInit.status = 302;
      }
      let headers = new Headers(responseInit.headers);
      headers.set("Location", url);
      return new Response(null, _extends2({}, responseInit, {
        headers
      }));
    };
    var redirectDocument = (url, init) => {
      let response = redirect2(url, init);
      response.headers.set("X-Remix-Reload-Document", "true");
      return response;
    };
    var ErrorResponseImpl = class {
      constructor(status, statusText, data, internal) {
        if (internal === void 0) {
          internal = false;
        }
        this.status = status;
        this.statusText = statusText || "";
        this.internal = internal;
        if (data instanceof Error) {
          this.data = data.toString();
          this.error = data;
        } else {
          this.data = data;
        }
      }
    };
    function isRouteErrorResponse3(error) {
      return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
    }
    var validMutationMethodsArr = ["post", "put", "patch", "delete"];
    var validMutationMethods = new Set(validMutationMethodsArr);
    var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
    var validRequestMethods = new Set(validRequestMethodsArr);
    var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
    var IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    var IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    var IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    };
    var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    var defaultMapRouteProperties = (route) => ({
      hasErrorBoundary: Boolean(route.hasErrorBoundary)
    });
    var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
    function createRouter(init) {
      const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
      const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
      const isServer = !isBrowser;
      invariant2(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
      let mapRouteProperties;
      if (init.mapRouteProperties) {
        mapRouteProperties = init.mapRouteProperties;
      } else if (init.detectErrorBoundary) {
        let detectErrorBoundary = init.detectErrorBoundary;
        mapRouteProperties = (route) => ({
          hasErrorBoundary: detectErrorBoundary(route)
        });
      } else {
        mapRouteProperties = defaultMapRouteProperties;
      }
      let manifest = {};
      let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, void 0, manifest);
      let inFlightDataRoutes;
      let basename2 = init.basename || "/";
      let future2 = _extends2({
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: false,
        v7_prependBasename: false,
        v7_relativeSplatPath: false
      }, init.future);
      let unlistenHistory = null;
      let subscribers = /* @__PURE__ */ new Set();
      let savedScrollPositions = null;
      let getScrollRestorationKey = null;
      let getScrollPosition = null;
      let initialScrollRestored = init.hydrationData != null;
      let initialMatches = matchRoutes3(dataRoutes, init.history.location, basename2);
      let initialErrors = null;
      if (initialMatches == null) {
        let error = getInternalRouterError(404, {
          pathname: init.history.location.pathname
        });
        let {
          matches,
          route
        } = getShortCircuitMatches(dataRoutes);
        initialMatches = matches;
        initialErrors = {
          [route.id]: error
        };
      }
      let initialized;
      let hasLazyRoutes = initialMatches.some((m) => m.route.lazy);
      let hasLoaders = initialMatches.some((m) => m.route.loader);
      if (hasLazyRoutes) {
        initialized = false;
      } else if (!hasLoaders) {
        initialized = true;
      } else if (future2.v7_partialHydration) {
        let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
        let errors = init.hydrationData ? init.hydrationData.errors : null;
        let isRouteInitialized = (m) => {
          if (!m.route.loader)
            return true;
          if (m.route.loader.hydrate === true)
            return false;
          return loaderData && loaderData[m.route.id] !== void 0 || errors && errors[m.route.id] !== void 0;
        };
        if (errors) {
          let idx = initialMatches.findIndex((m) => errors[m.route.id] !== void 0);
          initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
        } else {
          initialized = initialMatches.every(isRouteInitialized);
        }
      } else {
        initialized = init.hydrationData != null;
      }
      let router;
      let state = {
        historyAction: init.history.action,
        location: init.history.location,
        matches: initialMatches,
        initialized,
        navigation: IDLE_NAVIGATION,
        // Don't restore on initial updateState() if we were SSR'd
        restoreScrollPosition: init.hydrationData != null ? false : null,
        preventScrollReset: false,
        revalidation: "idle",
        loaderData: init.hydrationData && init.hydrationData.loaderData || {},
        actionData: init.hydrationData && init.hydrationData.actionData || null,
        errors: init.hydrationData && init.hydrationData.errors || initialErrors,
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
      let pendingAction = Action.Pop;
      let pendingPreventScrollReset = false;
      let pendingNavigationController;
      let pendingViewTransitionEnabled = false;
      let appliedViewTransitions = /* @__PURE__ */ new Map();
      let removePageHideEventListener = null;
      let isUninterruptedRevalidation = false;
      let isRevalidationRequired = false;
      let cancelledDeferredRoutes = [];
      let cancelledFetcherLoads = [];
      let fetchControllers = /* @__PURE__ */ new Map();
      let incrementingLoadId = 0;
      let pendingNavigationLoadId = -1;
      let fetchReloadIds = /* @__PURE__ */ new Map();
      let fetchRedirectIds = /* @__PURE__ */ new Set();
      let fetchLoadMatches = /* @__PURE__ */ new Map();
      let activeFetchers = /* @__PURE__ */ new Map();
      let deletedFetchers = /* @__PURE__ */ new Set();
      let activeDeferreds = /* @__PURE__ */ new Map();
      let blockerFunctions = /* @__PURE__ */ new Map();
      let ignoreNextHistoryUpdate = false;
      function initialize() {
        unlistenHistory = init.history.listen((_ref) => {
          let {
            action: historyAction,
            location,
            delta
          } = _ref;
          if (ignoreNextHistoryUpdate) {
            ignoreNextHistoryUpdate = false;
            return;
          }
          warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
          let blockerKey = shouldBlockNavigation({
            currentLocation: state.location,
            nextLocation: location,
            historyAction
          });
          if (blockerKey && delta != null) {
            ignoreNextHistoryUpdate = true;
            init.history.go(delta * -1);
            updateBlocker(blockerKey, {
              state: "blocked",
              location,
              proceed() {
                updateBlocker(blockerKey, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location
                });
                init.history.go(delta);
              },
              reset() {
                let blockers = new Map(state.blockers);
                blockers.set(blockerKey, IDLE_BLOCKER);
                updateState({
                  blockers
                });
              }
            });
            return;
          }
          return startNavigation(historyAction, location);
        });
        if (isBrowser) {
          restoreAppliedTransitions(routerWindow, appliedViewTransitions);
          let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
          routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
          removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
        }
        if (!state.initialized) {
          startNavigation(Action.Pop, state.location, {
            initialHydration: true
          });
        }
        return router;
      }
      function dispose() {
        if (unlistenHistory) {
          unlistenHistory();
        }
        if (removePageHideEventListener) {
          removePageHideEventListener();
        }
        subscribers.clear();
        pendingNavigationController && pendingNavigationController.abort();
        state.fetchers.forEach((_, key) => deleteFetcher(key));
        state.blockers.forEach((_, key) => deleteBlocker(key));
      }
      function subscribe(fn) {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
      }
      function updateState(newState, opts) {
        if (opts === void 0) {
          opts = {};
        }
        state = _extends2({}, state, newState);
        let completedFetchers = [];
        let deletedFetchersKeys = [];
        if (future2.v7_fetcherPersist) {
          state.fetchers.forEach((fetcher, key) => {
            if (fetcher.state === "idle") {
              if (deletedFetchers.has(key)) {
                deletedFetchersKeys.push(key);
              } else {
                completedFetchers.push(key);
              }
            }
          });
        }
        [...subscribers].forEach((subscriber) => subscriber(state, {
          deletedFetchers: deletedFetchersKeys,
          unstable_viewTransitionOpts: opts.viewTransitionOpts,
          unstable_flushSync: opts.flushSync === true
        }));
        if (future2.v7_fetcherPersist) {
          completedFetchers.forEach((key) => state.fetchers.delete(key));
          deletedFetchersKeys.forEach((key) => deleteFetcher(key));
        }
      }
      function completeNavigation(location, newState, _temp) {
        var _location$state, _location$state2;
        let {
          flushSync
        } = _temp === void 0 ? {} : _temp;
        let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
        let actionData;
        if (newState.actionData) {
          if (Object.keys(newState.actionData).length > 0) {
            actionData = newState.actionData;
          } else {
            actionData = null;
          }
        } else if (isActionReload) {
          actionData = state.actionData;
        } else {
          actionData = null;
        }
        let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
        let blockers = state.blockers;
        if (blockers.size > 0) {
          blockers = new Map(blockers);
          blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
        }
        let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
        if (inFlightDataRoutes) {
          dataRoutes = inFlightDataRoutes;
          inFlightDataRoutes = void 0;
        }
        if (isUninterruptedRevalidation)
          ;
        else if (pendingAction === Action.Pop)
          ;
        else if (pendingAction === Action.Push) {
          init.history.push(location, location.state);
        } else if (pendingAction === Action.Replace) {
          init.history.replace(location, location.state);
        }
        let viewTransitionOpts;
        if (pendingAction === Action.Pop) {
          let priorPaths = appliedViewTransitions.get(state.location.pathname);
          if (priorPaths && priorPaths.has(location.pathname)) {
            viewTransitionOpts = {
              currentLocation: state.location,
              nextLocation: location
            };
          } else if (appliedViewTransitions.has(location.pathname)) {
            viewTransitionOpts = {
              currentLocation: location,
              nextLocation: state.location
            };
          }
        } else if (pendingViewTransitionEnabled) {
          let toPaths = appliedViewTransitions.get(state.location.pathname);
          if (toPaths) {
            toPaths.add(location.pathname);
          } else {
            toPaths = /* @__PURE__ */ new Set([location.pathname]);
            appliedViewTransitions.set(state.location.pathname, toPaths);
          }
          viewTransitionOpts = {
            currentLocation: state.location,
            nextLocation: location
          };
        }
        updateState(_extends2({}, newState, {
          // matches, errors, fetchers go through as-is
          actionData,
          loaderData,
          historyAction: pendingAction,
          location,
          initialized: true,
          navigation: IDLE_NAVIGATION,
          revalidation: "idle",
          restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
          preventScrollReset,
          blockers
        }), {
          viewTransitionOpts,
          flushSync: flushSync === true
        });
        pendingAction = Action.Pop;
        pendingPreventScrollReset = false;
        pendingViewTransitionEnabled = false;
        isUninterruptedRevalidation = false;
        isRevalidationRequired = false;
        cancelledDeferredRoutes = [];
        cancelledFetcherLoads = [];
      }
      async function navigate(to, opts) {
        if (typeof to === "number") {
          init.history.go(to);
          return;
        }
        let normalizedPath = normalizeTo(state.location, state.matches, basename2, future2.v7_prependBasename, to, future2.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
        let {
          path,
          submission,
          error
        } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, false, normalizedPath, opts);
        let currentLocation = state.location;
        let nextLocation = createLocation(state.location, path, opts && opts.state);
        nextLocation = _extends2({}, nextLocation, init.history.encodeLocation(nextLocation));
        let userReplace = opts && opts.replace != null ? opts.replace : void 0;
        let historyAction = Action.Push;
        if (userReplace === true) {
          historyAction = Action.Replace;
        } else if (userReplace === false)
          ;
        else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
          historyAction = Action.Replace;
        }
        let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
        let flushSync = (opts && opts.unstable_flushSync) === true;
        let blockerKey = shouldBlockNavigation({
          currentLocation,
          nextLocation,
          historyAction
        });
        if (blockerKey) {
          updateBlocker(blockerKey, {
            state: "blocked",
            location: nextLocation,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: nextLocation
              });
              navigate(to, opts);
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({
                blockers
              });
            }
          });
          return;
        }
        return await startNavigation(historyAction, nextLocation, {
          submission,
          // Send through the formData serialization error if we have one so we can
          // render at the right error boundary after we match routes
          pendingError: error,
          preventScrollReset,
          replace: opts && opts.replace,
          enableViewTransition: opts && opts.unstable_viewTransition,
          flushSync
        });
      }
      function revalidate() {
        interruptActiveLoads();
        updateState({
          revalidation: "loading"
        });
        if (state.navigation.state === "submitting") {
          return;
        }
        if (state.navigation.state === "idle") {
          startNavigation(state.historyAction, state.location, {
            startUninterruptedRevalidation: true
          });
          return;
        }
        startNavigation(pendingAction || state.historyAction, state.navigation.location, {
          overrideNavigation: state.navigation
        });
      }
      async function startNavigation(historyAction, location, opts) {
        pendingNavigationController && pendingNavigationController.abort();
        pendingNavigationController = null;
        pendingAction = historyAction;
        isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
        saveScrollPosition(state.location, state.matches);
        pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
        pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let loadingNavigation = opts && opts.overrideNavigation;
        let matches = matchRoutes3(routesToUse, location, basename2);
        let flushSync = (opts && opts.flushSync) === true;
        if (!matches) {
          let error = getInternalRouterError(404, {
            pathname: location.pathname
          });
          let {
            matches: notFoundMatches,
            route
          } = getShortCircuitMatches(routesToUse);
          cancelActiveDeferreds();
          completeNavigation(location, {
            matches: notFoundMatches,
            loaderData: {},
            errors: {
              [route.id]: error
            }
          }, {
            flushSync
          });
          return;
        }
        if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
          completeNavigation(location, {
            matches
          }, {
            flushSync
          });
          return;
        }
        pendingNavigationController = new AbortController();
        let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
        let pendingActionData;
        let pendingError;
        if (opts && opts.pendingError) {
          pendingError = {
            [findNearestBoundary(matches).route.id]: opts.pendingError
          };
        } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
          let actionOutput = await handleAction(request, location, opts.submission, matches, {
            replace: opts.replace,
            flushSync
          });
          if (actionOutput.shortCircuited) {
            return;
          }
          pendingActionData = actionOutput.pendingActionData;
          pendingError = actionOutput.pendingActionError;
          loadingNavigation = getLoadingNavigation(location, opts.submission);
          flushSync = false;
          request = new Request(request.url, {
            signal: request.signal
          });
        }
        let {
          shortCircuited,
          loaderData,
          errors
        } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionData, pendingError);
        if (shortCircuited) {
          return;
        }
        pendingNavigationController = null;
        completeNavigation(location, _extends2({
          matches
        }, pendingActionData ? {
          actionData: pendingActionData
        } : {}, {
          loaderData,
          errors
        }));
      }
      async function handleAction(request, location, submission, matches, opts) {
        if (opts === void 0) {
          opts = {};
        }
        interruptActiveLoads();
        let navigation = getSubmittingNavigation(location, submission);
        updateState({
          navigation
        }, {
          flushSync: opts.flushSync === true
        });
        let result;
        let actionMatch = getTargetMatch(matches, location);
        if (!actionMatch.route.action && !actionMatch.route.lazy) {
          result = {
            type: ResultType.error,
            error: getInternalRouterError(405, {
              method: request.method,
              pathname: location.pathname,
              routeId: actionMatch.route.id
            })
          };
        } else {
          result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath);
          if (request.signal.aborted) {
            return {
              shortCircuited: true
            };
          }
        }
        if (isRedirectResult(result)) {
          let replace;
          if (opts && opts.replace != null) {
            replace = opts.replace;
          } else {
            replace = result.location === state.location.pathname + state.location.search;
          }
          await startRedirectNavigation(state, result, {
            submission,
            replace
          });
          return {
            shortCircuited: true
          };
        }
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
          if ((opts && opts.replace) !== true) {
            pendingAction = Action.Push;
          }
          return {
            // Send back an empty object we can use to clear out any prior actionData
            pendingActionData: {},
            pendingActionError: {
              [boundaryMatch.route.id]: result.error
            }
          };
        }
        if (isDeferredResult(result)) {
          throw getInternalRouterError(400, {
            type: "defer-action"
          });
        }
        return {
          pendingActionData: {
            [actionMatch.route.id]: result.data
          }
        };
      }
      async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionData, pendingError) {
        let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
        let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future2.v7_partialHydration && initialHydration === true, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename2, pendingActionData, pendingError);
        cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId));
        pendingNavigationLoadId = ++incrementingLoadId;
        if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
          let updatedFetchers2 = markFetchRedirectsDone();
          completeNavigation(location, _extends2({
            matches,
            loaderData: {},
            // Commit pending error if we're short circuiting
            errors: pendingError || null
          }, pendingActionData ? {
            actionData: pendingActionData
          } : {}, updatedFetchers2 ? {
            fetchers: new Map(state.fetchers)
          } : {}), {
            flushSync
          });
          return {
            shortCircuited: true
          };
        }
        if (!isUninterruptedRevalidation && (!future2.v7_partialHydration || !initialHydration)) {
          revalidatingFetchers.forEach((rf) => {
            let fetcher = state.fetchers.get(rf.key);
            let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
            state.fetchers.set(rf.key, revalidatingFetcher);
          });
          let actionData = pendingActionData || state.actionData;
          updateState(_extends2({
            navigation: loadingNavigation
          }, actionData ? Object.keys(actionData).length === 0 ? {
            actionData: null
          } : {
            actionData
          } : {}, revalidatingFetchers.length > 0 ? {
            fetchers: new Map(state.fetchers)
          } : {}), {
            flushSync
          });
        }
        revalidatingFetchers.forEach((rf) => {
          if (fetchControllers.has(rf.key)) {
            abortFetcher(rf.key);
          }
          if (rf.controller) {
            fetchControllers.set(rf.key, rf.controller);
          }
        });
        let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
        if (pendingNavigationController) {
          pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
        }
        let {
          results,
          loaderResults,
          fetcherResults
        } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
        if (request.signal.aborted) {
          return {
            shortCircuited: true
          };
        }
        if (pendingNavigationController) {
          pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
        }
        revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
        let redirect3 = findRedirect(results);
        if (redirect3) {
          if (redirect3.idx >= matchesToLoad.length) {
            let fetcherKey = revalidatingFetchers[redirect3.idx - matchesToLoad.length].key;
            fetchRedirectIds.add(fetcherKey);
          }
          await startRedirectNavigation(state, redirect3.result, {
            replace
          });
          return {
            shortCircuited: true
          };
        }
        let {
          loaderData,
          errors
        } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
        activeDeferreds.forEach((deferredData, routeId) => {
          deferredData.subscribe((aborted) => {
            if (aborted || deferredData.done) {
              activeDeferreds.delete(routeId);
            }
          });
        });
        if (future2.v7_partialHydration && initialHydration && state.errors) {
          Object.entries(state.errors).filter((_ref2) => {
            let [id] = _ref2;
            return !matchesToLoad.some((m) => m.route.id === id);
          }).forEach((_ref3) => {
            let [routeId, error] = _ref3;
            errors = Object.assign(errors || {}, {
              [routeId]: error
            });
          });
        }
        let updatedFetchers = markFetchRedirectsDone();
        let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
        let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
        return _extends2({
          loaderData,
          errors
        }, shouldUpdateFetchers ? {
          fetchers: new Map(state.fetchers)
        } : {});
      }
      function fetch2(key, routeId, href, opts) {
        if (isServer) {
          throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
        }
        if (fetchControllers.has(key))
          abortFetcher(key);
        let flushSync = (opts && opts.unstable_flushSync) === true;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let normalizedPath = normalizeTo(state.location, state.matches, basename2, future2.v7_prependBasename, href, future2.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
        let matches = matchRoutes3(routesToUse, normalizedPath, basename2);
        if (!matches) {
          setFetcherError(key, routeId, getInternalRouterError(404, {
            pathname: normalizedPath
          }), {
            flushSync
          });
          return;
        }
        let {
          path,
          submission,
          error
        } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, true, normalizedPath, opts);
        if (error) {
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        }
        let match3 = getTargetMatch(matches, path);
        pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
        if (submission && isMutationMethod(submission.formMethod)) {
          handleFetcherAction(key, routeId, path, match3, matches, flushSync, submission);
          return;
        }
        fetchLoadMatches.set(key, {
          routeId,
          path
        });
        handleFetcherLoader(key, routeId, path, match3, matches, flushSync, submission);
      }
      async function handleFetcherAction(key, routeId, path, match3, requestMatches, flushSync, submission) {
        interruptActiveLoads();
        fetchLoadMatches.delete(key);
        if (!match3.route.action && !match3.route.lazy) {
          let error = getInternalRouterError(405, {
            method: submission.formMethod,
            pathname: path,
            routeId
          });
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        }
        let existingFetcher = state.fetchers.get(key);
        updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
          flushSync
        });
        let abortController = new AbortController();
        let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
        fetchControllers.set(key, abortController);
        let originatingLoadId = incrementingLoadId;
        let actionResult = await callLoaderOrAction("action", fetchRequest, match3, requestMatches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath);
        if (fetchRequest.signal.aborted) {
          if (fetchControllers.get(key) === abortController) {
            fetchControllers.delete(key);
          }
          return;
        }
        if (future2.v7_fetcherPersist && deletedFetchers.has(key)) {
          if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          }
        } else {
          if (isRedirectResult(actionResult)) {
            fetchControllers.delete(key);
            if (pendingNavigationLoadId > originatingLoadId) {
              updateFetcherState(key, getDoneFetcher(void 0));
              return;
            } else {
              fetchRedirectIds.add(key);
              updateFetcherState(key, getLoadingFetcher(submission));
              return startRedirectNavigation(state, actionResult, {
                fetcherSubmission: submission
              });
            }
          }
          if (isErrorResult(actionResult)) {
            setFetcherError(key, routeId, actionResult.error);
            return;
          }
        }
        if (isDeferredResult(actionResult)) {
          throw getInternalRouterError(400, {
            type: "defer-action"
          });
        }
        let nextLocation = state.navigation.location || state.location;
        let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let matches = state.navigation.state !== "idle" ? matchRoutes3(routesToUse, state.navigation.location, basename2) : state.matches;
        invariant2(matches, "Didn't find any matches after fetcher action");
        let loadId = ++incrementingLoadId;
        fetchReloadIds.set(key, loadId);
        let loadFetcher = getLoadingFetcher(submission, actionResult.data);
        state.fetchers.set(key, loadFetcher);
        let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
          init.history,
          state,
          matches,
          submission,
          nextLocation,
          false,
          isRevalidationRequired,
          cancelledDeferredRoutes,
          cancelledFetcherLoads,
          deletedFetchers,
          fetchLoadMatches,
          fetchRedirectIds,
          routesToUse,
          basename2,
          {
            [match3.route.id]: actionResult.data
          },
          void 0
          // No need to send through errors since we short circuit above
        );
        revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
          let staleKey = rf.key;
          let existingFetcher2 = state.fetchers.get(staleKey);
          let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
          state.fetchers.set(staleKey, revalidatingFetcher);
          if (fetchControllers.has(staleKey)) {
            abortFetcher(staleKey);
          }
          if (rf.controller) {
            fetchControllers.set(staleKey, rf.controller);
          }
        });
        updateState({
          fetchers: new Map(state.fetchers)
        });
        let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
        abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
        let {
          results,
          loaderResults,
          fetcherResults
        } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
        if (abortController.signal.aborted) {
          return;
        }
        abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
        fetchReloadIds.delete(key);
        fetchControllers.delete(key);
        revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
        let redirect3 = findRedirect(results);
        if (redirect3) {
          if (redirect3.idx >= matchesToLoad.length) {
            let fetcherKey = revalidatingFetchers[redirect3.idx - matchesToLoad.length].key;
            fetchRedirectIds.add(fetcherKey);
          }
          return startRedirectNavigation(state, redirect3.result);
        }
        let {
          loaderData,
          errors
        } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
        if (state.fetchers.has(key)) {
          let doneFetcher = getDoneFetcher(actionResult.data);
          state.fetchers.set(key, doneFetcher);
        }
        abortStaleFetchLoads(loadId);
        if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
          invariant2(pendingAction, "Expected pending action");
          pendingNavigationController && pendingNavigationController.abort();
          completeNavigation(state.navigation.location, {
            matches,
            loaderData,
            errors,
            fetchers: new Map(state.fetchers)
          });
        } else {
          updateState({
            errors,
            loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
            fetchers: new Map(state.fetchers)
          });
          isRevalidationRequired = false;
        }
      }
      async function handleFetcherLoader(key, routeId, path, match3, matches, flushSync, submission) {
        let existingFetcher = state.fetchers.get(key);
        updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
          flushSync
        });
        let abortController = new AbortController();
        let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
        fetchControllers.set(key, abortController);
        let originatingLoadId = incrementingLoadId;
        let result = await callLoaderOrAction("loader", fetchRequest, match3, matches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath);
        if (isDeferredResult(result)) {
          result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
        }
        if (fetchControllers.get(key) === abortController) {
          fetchControllers.delete(key);
        }
        if (fetchRequest.signal.aborted) {
          return;
        }
        if (deletedFetchers.has(key)) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        }
        if (isRedirectResult(result)) {
          if (pendingNavigationLoadId > originatingLoadId) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          } else {
            fetchRedirectIds.add(key);
            await startRedirectNavigation(state, result);
            return;
          }
        }
        if (isErrorResult(result)) {
          setFetcherError(key, routeId, result.error);
          return;
        }
        invariant2(!isDeferredResult(result), "Unhandled fetcher deferred data");
        updateFetcherState(key, getDoneFetcher(result.data));
      }
      async function startRedirectNavigation(state2, redirect3, _temp2) {
        let {
          submission,
          fetcherSubmission,
          replace
        } = _temp2 === void 0 ? {} : _temp2;
        if (redirect3.revalidate) {
          isRevalidationRequired = true;
        }
        let redirectLocation = createLocation(state2.location, redirect3.location, {
          _isRedirect: true
        });
        invariant2(redirectLocation, "Expected a location on the redirect navigation");
        if (isBrowser) {
          let isDocumentReload = false;
          if (redirect3.reloadDocument) {
            isDocumentReload = true;
          } else if (ABSOLUTE_URL_REGEX2.test(redirect3.location)) {
            const url = init.history.createURL(redirect3.location);
            isDocumentReload = // Hard reload if it's an absolute URL to a new origin
            url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
            stripBasename(url.pathname, basename2) == null;
          }
          if (isDocumentReload) {
            if (replace) {
              routerWindow.location.replace(redirect3.location);
            } else {
              routerWindow.location.assign(redirect3.location);
            }
            return;
          }
        }
        pendingNavigationController = null;
        let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
        let {
          formMethod,
          formAction,
          formEncType
        } = state2.navigation;
        if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
          submission = getSubmissionFromNavigation(state2.navigation);
        }
        let activeSubmission = submission || fetcherSubmission;
        if (redirectPreserveMethodStatusCodes.has(redirect3.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
          await startNavigation(redirectHistoryAction, redirectLocation, {
            submission: _extends2({}, activeSubmission, {
              formAction: redirect3.location
            }),
            // Preserve this flag across redirects
            preventScrollReset: pendingPreventScrollReset
          });
        } else {
          let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
          await startNavigation(redirectHistoryAction, redirectLocation, {
            overrideNavigation,
            // Send fetcher submissions through for shouldRevalidate
            fetcherSubmission,
            // Preserve this flag across redirects
            preventScrollReset: pendingPreventScrollReset
          });
        }
      }
      async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
        let results = await Promise.all([...matchesToLoad.map((match3) => callLoaderOrAction("loader", request, match3, matches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath)), ...fetchersToLoad.map((f) => {
          if (f.matches && f.match && f.controller) {
            return callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath);
          } else {
            let error = {
              type: ResultType.error,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            };
            return error;
          }
        })]);
        let loaderResults = results.slice(0, matchesToLoad.length);
        let fetcherResults = results.slice(matchesToLoad.length);
        await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), true)]);
        return {
          results,
          loaderResults,
          fetcherResults
        };
      }
      function interruptActiveLoads() {
        isRevalidationRequired = true;
        cancelledDeferredRoutes.push(...cancelActiveDeferreds());
        fetchLoadMatches.forEach((_, key) => {
          if (fetchControllers.has(key)) {
            cancelledFetcherLoads.push(key);
            abortFetcher(key);
          }
        });
      }
      function updateFetcherState(key, fetcher, opts) {
        if (opts === void 0) {
          opts = {};
        }
        state.fetchers.set(key, fetcher);
        updateState({
          fetchers: new Map(state.fetchers)
        }, {
          flushSync: (opts && opts.flushSync) === true
        });
      }
      function setFetcherError(key, routeId, error, opts) {
        if (opts === void 0) {
          opts = {};
        }
        let boundaryMatch = findNearestBoundary(state.matches, routeId);
        deleteFetcher(key);
        updateState({
          errors: {
            [boundaryMatch.route.id]: error
          },
          fetchers: new Map(state.fetchers)
        }, {
          flushSync: (opts && opts.flushSync) === true
        });
      }
      function getFetcher(key) {
        if (future2.v7_fetcherPersist) {
          activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
          if (deletedFetchers.has(key)) {
            deletedFetchers.delete(key);
          }
        }
        return state.fetchers.get(key) || IDLE_FETCHER;
      }
      function deleteFetcher(key) {
        let fetcher = state.fetchers.get(key);
        if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
          abortFetcher(key);
        }
        fetchLoadMatches.delete(key);
        fetchReloadIds.delete(key);
        fetchRedirectIds.delete(key);
        deletedFetchers.delete(key);
        state.fetchers.delete(key);
      }
      function deleteFetcherAndUpdateState(key) {
        if (future2.v7_fetcherPersist) {
          let count = (activeFetchers.get(key) || 0) - 1;
          if (count <= 0) {
            activeFetchers.delete(key);
            deletedFetchers.add(key);
          } else {
            activeFetchers.set(key, count);
          }
        } else {
          deleteFetcher(key);
        }
        updateState({
          fetchers: new Map(state.fetchers)
        });
      }
      function abortFetcher(key) {
        let controller = fetchControllers.get(key);
        invariant2(controller, "Expected fetch controller: " + key);
        controller.abort();
        fetchControllers.delete(key);
      }
      function markFetchersDone(keys) {
        for (let key of keys) {
          let fetcher = getFetcher(key);
          let doneFetcher = getDoneFetcher(fetcher.data);
          state.fetchers.set(key, doneFetcher);
        }
      }
      function markFetchRedirectsDone() {
        let doneKeys = [];
        let updatedFetchers = false;
        for (let key of fetchRedirectIds) {
          let fetcher = state.fetchers.get(key);
          invariant2(fetcher, "Expected fetcher: " + key);
          if (fetcher.state === "loading") {
            fetchRedirectIds.delete(key);
            doneKeys.push(key);
            updatedFetchers = true;
          }
        }
        markFetchersDone(doneKeys);
        return updatedFetchers;
      }
      function abortStaleFetchLoads(landedId) {
        let yeetedKeys = [];
        for (let [key, id] of fetchReloadIds) {
          if (id < landedId) {
            let fetcher = state.fetchers.get(key);
            invariant2(fetcher, "Expected fetcher: " + key);
            if (fetcher.state === "loading") {
              abortFetcher(key);
              fetchReloadIds.delete(key);
              yeetedKeys.push(key);
            }
          }
        }
        markFetchersDone(yeetedKeys);
        return yeetedKeys.length > 0;
      }
      function getBlocker(key, fn) {
        let blocker = state.blockers.get(key) || IDLE_BLOCKER;
        if (blockerFunctions.get(key) !== fn) {
          blockerFunctions.set(key, fn);
        }
        return blocker;
      }
      function deleteBlocker(key) {
        state.blockers.delete(key);
        blockerFunctions.delete(key);
      }
      function updateBlocker(key, newBlocker) {
        let blocker = state.blockers.get(key) || IDLE_BLOCKER;
        invariant2(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
        let blockers = new Map(state.blockers);
        blockers.set(key, newBlocker);
        updateState({
          blockers
        });
      }
      function shouldBlockNavigation(_ref4) {
        let {
          currentLocation,
          nextLocation,
          historyAction
        } = _ref4;
        if (blockerFunctions.size === 0) {
          return;
        }
        if (blockerFunctions.size > 1) {
          warning(false, "A router only supports one blocker at a time");
        }
        let entries = Array.from(blockerFunctions.entries());
        let [blockerKey, blockerFunction] = entries[entries.length - 1];
        let blocker = state.blockers.get(blockerKey);
        if (blocker && blocker.state === "proceeding") {
          return;
        }
        if (blockerFunction({
          currentLocation,
          nextLocation,
          historyAction
        })) {
          return blockerKey;
        }
      }
      function cancelActiveDeferreds(predicate) {
        let cancelledRouteIds = [];
        activeDeferreds.forEach((dfd, routeId) => {
          if (!predicate || predicate(routeId)) {
            dfd.cancel();
            cancelledRouteIds.push(routeId);
            activeDeferreds.delete(routeId);
          }
        });
        return cancelledRouteIds;
      }
      function enableScrollRestoration(positions, getPosition, getKey) {
        savedScrollPositions = positions;
        getScrollPosition = getPosition;
        getScrollRestorationKey = getKey || null;
        if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
          initialScrollRestored = true;
          let y = getSavedScrollPosition(state.location, state.matches);
          if (y != null) {
            updateState({
              restoreScrollPosition: y
            });
          }
        }
        return () => {
          savedScrollPositions = null;
          getScrollPosition = null;
          getScrollRestorationKey = null;
        };
      }
      function getScrollKey(location, matches) {
        if (getScrollRestorationKey) {
          let key = getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData)));
          return key || location.key;
        }
        return location.key;
      }
      function saveScrollPosition(location, matches) {
        if (savedScrollPositions && getScrollPosition) {
          let key = getScrollKey(location, matches);
          savedScrollPositions[key] = getScrollPosition();
        }
      }
      function getSavedScrollPosition(location, matches) {
        if (savedScrollPositions) {
          let key = getScrollKey(location, matches);
          let y = savedScrollPositions[key];
          if (typeof y === "number") {
            return y;
          }
        }
        return null;
      }
      function _internalSetRoutes(newRoutes) {
        manifest = {};
        inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, void 0, manifest);
      }
      router = {
        get basename() {
          return basename2;
        },
        get future() {
          return future2;
        },
        get state() {
          return state;
        },
        get routes() {
          return dataRoutes;
        },
        get window() {
          return routerWindow;
        },
        initialize,
        subscribe,
        enableScrollRestoration,
        navigate,
        fetch: fetch2,
        revalidate,
        // Passthrough to history-aware createHref used by useHref so we get proper
        // hash-aware URLs in DOM paths
        createHref: (to) => init.history.createHref(to),
        encodeLocation: (to) => init.history.encodeLocation(to),
        getFetcher,
        deleteFetcher: deleteFetcherAndUpdateState,
        dispose,
        getBlocker,
        deleteBlocker,
        _internalFetchControllers: fetchControllers,
        _internalActiveDeferreds: activeDeferreds,
        // TODO: Remove setRoutes, it's temporary to avoid dealing with
        // updating the tree while validating the update algorithm.
        _internalSetRoutes
      };
      return router;
    }
    var UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
    function createStaticHandler(routes3, opts) {
      invariant2(routes3.length > 0, "You must provide a non-empty routes array to createStaticHandler");
      let manifest = {};
      let basename2 = (opts ? opts.basename : null) || "/";
      let mapRouteProperties;
      if (opts != null && opts.mapRouteProperties) {
        mapRouteProperties = opts.mapRouteProperties;
      } else if (opts != null && opts.detectErrorBoundary) {
        let detectErrorBoundary = opts.detectErrorBoundary;
        mapRouteProperties = (route) => ({
          hasErrorBoundary: detectErrorBoundary(route)
        });
      } else {
        mapRouteProperties = defaultMapRouteProperties;
      }
      let future2 = _extends2({
        v7_relativeSplatPath: false,
        v7_throwAbortReason: false
      }, opts ? opts.future : null);
      let dataRoutes = convertRoutesToDataRoutes(routes3, mapRouteProperties, void 0, manifest);
      async function query(request, _temp3) {
        let {
          requestContext
        } = _temp3 === void 0 ? {} : _temp3;
        let url = new URL(request.url);
        let method = request.method;
        let location = createLocation("", createPath2(url), null, "default");
        let matches = matchRoutes3(dataRoutes, location, basename2);
        if (!isValidMethod(method) && method !== "HEAD") {
          let error = getInternalRouterError(405, {
            method
          });
          let {
            matches: methodNotAllowedMatches,
            route
          } = getShortCircuitMatches(dataRoutes);
          return {
            basename: basename2,
            location,
            matches: methodNotAllowedMatches,
            loaderData: {},
            actionData: null,
            errors: {
              [route.id]: error
            },
            statusCode: error.status,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        } else if (!matches) {
          let error = getInternalRouterError(404, {
            pathname: location.pathname
          });
          let {
            matches: notFoundMatches,
            route
          } = getShortCircuitMatches(dataRoutes);
          return {
            basename: basename2,
            location,
            matches: notFoundMatches,
            loaderData: {},
            actionData: null,
            errors: {
              [route.id]: error
            },
            statusCode: error.status,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        }
        let result = await queryImpl(request, location, matches, requestContext);
        if (isResponse2(result)) {
          return result;
        }
        return _extends2({
          location,
          basename: basename2
        }, result);
      }
      async function queryRoute(request, _temp4) {
        let {
          routeId,
          requestContext
        } = _temp4 === void 0 ? {} : _temp4;
        let url = new URL(request.url);
        let method = request.method;
        let location = createLocation("", createPath2(url), null, "default");
        let matches = matchRoutes3(dataRoutes, location, basename2);
        if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
          throw getInternalRouterError(405, {
            method
          });
        } else if (!matches) {
          throw getInternalRouterError(404, {
            pathname: location.pathname
          });
        }
        let match3 = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
        if (routeId && !match3) {
          throw getInternalRouterError(403, {
            pathname: location.pathname,
            routeId
          });
        } else if (!match3) {
          throw getInternalRouterError(404, {
            pathname: location.pathname
          });
        }
        let result = await queryImpl(request, location, matches, requestContext, match3);
        if (isResponse2(result)) {
          return result;
        }
        let error = result.errors ? Object.values(result.errors)[0] : void 0;
        if (error !== void 0) {
          throw error;
        }
        if (result.actionData) {
          return Object.values(result.actionData)[0];
        }
        if (result.loaderData) {
          var _result$activeDeferre;
          let data = Object.values(result.loaderData)[0];
          if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match3.route.id]) {
            data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match3.route.id];
          }
          return data;
        }
        return void 0;
      }
      async function queryImpl(request, location, matches, requestContext, routeMatch) {
        invariant2(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
        try {
          if (isMutationMethod(request.method.toLowerCase())) {
            let result2 = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
            return result2;
          }
          let result = await loadRouteData(request, matches, requestContext, routeMatch);
          return isResponse2(result) ? result : _extends2({}, result, {
            actionData: null,
            actionHeaders: {}
          });
        } catch (e) {
          if (isQueryRouteResponse(e)) {
            if (e.type === ResultType.error) {
              throw e.response;
            }
            return e.response;
          }
          if (isRedirectResponse(e)) {
            return e;
          }
          throw e;
        }
      }
      async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
        let result;
        if (!actionMatch.route.action && !actionMatch.route.lazy) {
          let error = getInternalRouterError(405, {
            method: request.method,
            pathname: new URL(request.url).pathname,
            routeId: actionMatch.route.id
          });
          if (isRouteRequest) {
            throw error;
          }
          result = {
            type: ResultType.error,
            error
          };
        } else {
          result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath, {
            isStaticRequest: true,
            isRouteRequest,
            requestContext
          });
          if (request.signal.aborted) {
            throwStaticHandlerAbortedError(request, isRouteRequest, future2);
          }
        }
        if (isRedirectResult(result)) {
          throw new Response(null, {
            status: result.status,
            headers: {
              Location: result.location
            }
          });
        }
        if (isDeferredResult(result)) {
          let error = getInternalRouterError(400, {
            type: "defer-action"
          });
          if (isRouteRequest) {
            throw error;
          }
          result = {
            type: ResultType.error,
            error
          };
        }
        if (isRouteRequest) {
          if (isErrorResult(result)) {
            throw result.error;
          }
          return {
            matches: [actionMatch],
            loaderData: {},
            actionData: {
              [actionMatch.route.id]: result.data
            },
            errors: null,
            // Note: statusCode + headers are unused here since queryRoute will
            // return the raw Response or value
            statusCode: 200,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        }
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
          let context2 = await loadRouteData(request, matches, requestContext, void 0, {
            [boundaryMatch.route.id]: result.error
          });
          return _extends2({}, context2, {
            statusCode: isRouteErrorResponse3(result.error) ? result.error.status : 500,
            actionData: null,
            actionHeaders: _extends2({}, result.headers ? {
              [actionMatch.route.id]: result.headers
            } : {})
          });
        }
        let loaderRequest = new Request(request.url, {
          headers: request.headers,
          redirect: request.redirect,
          signal: request.signal
        });
        let context = await loadRouteData(loaderRequest, matches, requestContext);
        return _extends2({}, context, result.statusCode ? {
          statusCode: result.statusCode
        } : {}, {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: _extends2({}, result.headers ? {
            [actionMatch.route.id]: result.headers
          } : {})
        });
      }
      async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
        let isRouteRequest = routeMatch != null;
        if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
          throw getInternalRouterError(400, {
            method: request.method,
            pathname: new URL(request.url).pathname,
            routeId: routeMatch == null ? void 0 : routeMatch.route.id
          });
        }
        let requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
        let matchesToLoad = requestMatches.filter((m) => m.route.loader || m.route.lazy);
        if (matchesToLoad.length === 0) {
          return {
            matches,
            // Add a null for all matched routes for proper revalidation on the client
            loaderData: matches.reduce((acc, m) => Object.assign(acc, {
              [m.route.id]: null
            }), {}),
            errors: pendingActionError || null,
            statusCode: 200,
            loaderHeaders: {},
            activeDeferreds: null
          };
        }
        let results = await Promise.all([...matchesToLoad.map((match3) => callLoaderOrAction("loader", request, match3, matches, manifest, mapRouteProperties, basename2, future2.v7_relativeSplatPath, {
          isStaticRequest: true,
          isRouteRequest,
          requestContext
        }))]);
        if (request.signal.aborted) {
          throwStaticHandlerAbortedError(request, isRouteRequest, future2);
        }
        let activeDeferreds = /* @__PURE__ */ new Map();
        let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds);
        let executedLoaders = new Set(matchesToLoad.map((match3) => match3.route.id));
        matches.forEach((match3) => {
          if (!executedLoaders.has(match3.route.id)) {
            context.loaderData[match3.route.id] = null;
          }
        });
        return _extends2({}, context, {
          matches,
          activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
        });
      }
      return {
        dataRoutes,
        query,
        queryRoute
      };
    }
    function getStaticContextFromError(routes3, context, error) {
      let newContext = _extends2({}, context, {
        statusCode: isRouteErrorResponse3(error) ? error.status : 500,
        errors: {
          [context._deepestRenderedBoundaryId || routes3[0].id]: error
        }
      });
      return newContext;
    }
    function throwStaticHandlerAbortedError(request, isRouteRequest, future2) {
      if (future2.v7_throwAbortReason && request.signal.reason !== void 0) {
        throw request.signal.reason;
      }
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted: " + request.method + " " + request.url);
    }
    function isSubmissionNavigation(opts) {
      return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
    }
    function normalizeTo(location, matches, basename2, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
      let contextualMatches;
      let activeRouteMatch;
      if (fromRouteId) {
        contextualMatches = [];
        for (let match3 of matches) {
          contextualMatches.push(match3);
          if (match3.route.id === fromRouteId) {
            activeRouteMatch = match3;
            break;
          }
        }
      } else {
        contextualMatches = matches;
        activeRouteMatch = matches[matches.length - 1];
      }
      let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename2) || location.pathname, relative === "path");
      if (to == null) {
        path.search = location.search;
        path.hash = location.hash;
      }
      if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
        path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
      }
      if (prependBasename && basename2 !== "/") {
        path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
      }
      return createPath2(path);
    }
    function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
      if (!opts || !isSubmissionNavigation(opts)) {
        return {
          path
        };
      }
      if (opts.formMethod && !isValidMethod(opts.formMethod)) {
        return {
          path,
          error: getInternalRouterError(405, {
            method: opts.formMethod
          })
        };
      }
      let getInvalidBodyError = () => ({
        path,
        error: getInternalRouterError(400, {
          type: "invalid-body"
        })
      });
      let rawFormMethod = opts.formMethod || "get";
      let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
      let formAction = stripHashFromPath(path);
      if (opts.body !== void 0) {
        if (opts.formEncType === "text/plain") {
          if (!isMutationMethod(formMethod)) {
            return getInvalidBodyError();
          }
          let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
            // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
            Array.from(opts.body.entries()).reduce((acc, _ref5) => {
              let [name, value] = _ref5;
              return "" + acc + name + "=" + value + "\n";
            }, "")
          ) : String(opts.body);
          return {
            path,
            submission: {
              formMethod,
              formAction,
              formEncType: opts.formEncType,
              formData: void 0,
              json: void 0,
              text
            }
          };
        } else if (opts.formEncType === "application/json") {
          if (!isMutationMethod(formMethod)) {
            return getInvalidBodyError();
          }
          try {
            let json3 = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
            return {
              path,
              submission: {
                formMethod,
                formAction,
                formEncType: opts.formEncType,
                formData: void 0,
                json: json3,
                text: void 0
              }
            };
          } catch (e) {
            return getInvalidBodyError();
          }
        }
      }
      invariant2(typeof FormData === "function", "FormData is not available in this environment");
      let searchParams;
      let formData;
      if (opts.formData) {
        searchParams = convertFormDataToSearchParams(opts.formData);
        formData = opts.formData;
      } else if (opts.body instanceof FormData) {
        searchParams = convertFormDataToSearchParams(opts.body);
        formData = opts.body;
      } else if (opts.body instanceof URLSearchParams) {
        searchParams = opts.body;
        formData = convertSearchParamsToFormData(searchParams);
      } else if (opts.body == null) {
        searchParams = new URLSearchParams();
        formData = new FormData();
      } else {
        try {
          searchParams = new URLSearchParams(opts.body);
          formData = convertSearchParamsToFormData(searchParams);
        } catch (e) {
          return getInvalidBodyError();
        }
      }
      let submission = {
        formMethod,
        formAction,
        formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
        formData,
        json: void 0,
        text: void 0
      };
      if (isMutationMethod(submission.formMethod)) {
        return {
          path,
          submission
        };
      }
      let parsedPath = parsePath3(path);
      if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
        searchParams.append("index", "");
      }
      parsedPath.search = "?" + searchParams;
      return {
        path: createPath2(parsedPath),
        submission
      };
    }
    function getLoaderMatchesUntilBoundary(matches, boundaryId) {
      let boundaryMatches = matches;
      if (boundaryId) {
        let index = matches.findIndex((m) => m.route.id === boundaryId);
        if (index >= 0) {
          boundaryMatches = matches.slice(0, index);
        }
      }
      return boundaryMatches;
    }
    function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename2, pendingActionData, pendingError) {
      let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : void 0;
      let currentUrl = history.createURL(state.location);
      let nextUrl = history.createURL(location);
      let boundaryId = pendingError ? Object.keys(pendingError)[0] : void 0;
      let boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
      let navigationMatches = boundaryMatches.filter((match3, index) => {
        let {
          route
        } = match3;
        if (route.lazy) {
          return true;
        }
        if (route.loader == null) {
          return false;
        }
        if (isInitialLoad) {
          if (route.loader.hydrate) {
            return true;
          }
          return state.loaderData[route.id] === void 0 && // Don't re-run if the loader ran and threw an error
          (!state.errors || state.errors[route.id] === void 0);
        }
        if (isNewLoader(state.loaderData, state.matches[index], match3) || cancelledDeferredRoutes.some((id) => id === match3.route.id)) {
          return true;
        }
        let currentRouteMatch = state.matches[index];
        let nextRouteMatch = match3;
        return shouldRevalidateLoader(match3, _extends2({
          currentUrl,
          currentParams: currentRouteMatch.params,
          nextUrl,
          nextParams: nextRouteMatch.params
        }, submission, {
          actionResult,
          defaultShouldRevalidate: (
            // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
            isRevalidationRequired || // Clicked the same link, resubmitted a GET form
            currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
            currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
          )
        }));
      });
      let revalidatingFetchers = [];
      fetchLoadMatches.forEach((f, key) => {
        if (isInitialLoad || !matches.some((m) => m.route.id === f.routeId) || deletedFetchers.has(key)) {
          return;
        }
        let fetcherMatches = matchRoutes3(routesToUse, f.path, basename2);
        if (!fetcherMatches) {
          revalidatingFetchers.push({
            key,
            routeId: f.routeId,
            path: f.path,
            matches: null,
            match: null,
            controller: null
          });
          return;
        }
        let fetcher = state.fetchers.get(key);
        let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
        let shouldRevalidate = false;
        if (fetchRedirectIds.has(key)) {
          shouldRevalidate = false;
        } else if (cancelledFetcherLoads.includes(key)) {
          shouldRevalidate = true;
        } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
          shouldRevalidate = isRevalidationRequired;
        } else {
          shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends2({
            currentUrl,
            currentParams: state.matches[state.matches.length - 1].params,
            nextUrl,
            nextParams: matches[matches.length - 1].params
          }, submission, {
            actionResult,
            defaultShouldRevalidate: isRevalidationRequired
          }));
        }
        if (shouldRevalidate) {
          revalidatingFetchers.push({
            key,
            routeId: f.routeId,
            path: f.path,
            matches: fetcherMatches,
            match: fetcherMatch,
            controller: new AbortController()
          });
        }
      });
      return [navigationMatches, revalidatingFetchers];
    }
    function isNewLoader(currentLoaderData, currentMatch, match3) {
      let isNew = (
        // [a] -> [a, b]
        !currentMatch || // [a, b] -> [a, c]
        match3.route.id !== currentMatch.route.id
      );
      let isMissingData = currentLoaderData[match3.route.id] === void 0;
      return isNew || isMissingData;
    }
    function isNewRouteInstance(currentMatch, match3) {
      let currentPath = currentMatch.route.path;
      return (
        // param change for this match, /users/123 -> /users/456
        currentMatch.pathname !== match3.pathname || // splat param changed, which is not present in match.path
        // e.g. /files/images/avatar.jpg -> files/finances.xls
        currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match3.params["*"]
      );
    }
    function shouldRevalidateLoader(loaderMatch, arg) {
      if (loaderMatch.route.shouldRevalidate) {
        let routeChoice = loaderMatch.route.shouldRevalidate(arg);
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return arg.defaultShouldRevalidate;
    }
    async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
      if (!route.lazy) {
        return;
      }
      let lazyRoute = await route.lazy();
      if (!route.lazy) {
        return;
      }
      let routeToUpdate = manifest[route.id];
      invariant2(routeToUpdate, "No route found in manifest");
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isPropertyStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
        if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
          routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, _extends2({}, mapRouteProperties(routeToUpdate), {
        lazy: void 0
      }));
    }
    async function callLoaderOrAction(type, request, match3, matches, manifest, mapRouteProperties, basename2, v7_relativeSplatPath, opts) {
      if (opts === void 0) {
        opts = {};
      }
      let resultType;
      let result;
      let onReject;
      let runHandler = (handler) => {
        let reject;
        let abortPromise = new Promise((_, r) => reject = r);
        onReject = () => reject();
        request.signal.addEventListener("abort", onReject);
        return Promise.race([handler({
          request,
          params: match3.params,
          context: opts.requestContext
        }), abortPromise]);
      };
      try {
        let handler = match3.route[type];
        if (match3.route.lazy) {
          if (handler) {
            let handlerError;
            let values = await Promise.all([
              // If the handler throws, don't let it immediately bubble out,
              // since we need to let the lazy() execution finish so we know if this
              // route has a boundary that can handle the error
              runHandler(handler).catch((e) => {
                handlerError = e;
              }),
              loadLazyRouteModule(match3.route, mapRouteProperties, manifest)
            ]);
            if (handlerError) {
              throw handlerError;
            }
            result = values[0];
          } else {
            await loadLazyRouteModule(match3.route, mapRouteProperties, manifest);
            handler = match3.route[type];
            if (handler) {
              result = await runHandler(handler);
            } else if (type === "action") {
              let url = new URL(request.url);
              let pathname = url.pathname + url.search;
              throw getInternalRouterError(405, {
                method: request.method,
                pathname,
                routeId: match3.route.id
              });
            } else {
              return {
                type: ResultType.data,
                data: void 0
              };
            }
          }
        } else if (!handler) {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(404, {
            pathname
          });
        } else {
          result = await runHandler(handler);
        }
        invariant2(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match3.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
      } catch (e) {
        resultType = ResultType.error;
        result = e;
      } finally {
        if (onReject) {
          request.signal.removeEventListener("abort", onReject);
        }
      }
      if (isResponse2(result)) {
        let status = result.status;
        if (redirectStatusCodes.has(status)) {
          let location = result.headers.get("Location");
          invariant2(location, "Redirects returned/thrown from loaders/actions must have a Location header");
          if (!ABSOLUTE_URL_REGEX2.test(location)) {
            location = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match3) + 1), basename2, true, location, v7_relativeSplatPath);
          } else if (!opts.isStaticRequest) {
            let currentUrl = new URL(request.url);
            let url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
            let isSameBasename = stripBasename(url.pathname, basename2) != null;
            if (url.origin === currentUrl.origin && isSameBasename) {
              location = url.pathname + url.search + url.hash;
            }
          }
          if (opts.isStaticRequest) {
            result.headers.set("Location", location);
            throw result;
          }
          return {
            type: ResultType.redirect,
            status,
            location,
            revalidate: result.headers.get("X-Remix-Revalidate") !== null,
            reloadDocument: result.headers.get("X-Remix-Reload-Document") !== null
          };
        }
        if (opts.isRouteRequest) {
          let queryRouteResponse = {
            type: resultType === ResultType.error ? ResultType.error : ResultType.data,
            response: result
          };
          throw queryRouteResponse;
        }
        let data;
        try {
          let contentType = result.headers.get("Content-Type");
          if (contentType && /\bapplication\/json\b/.test(contentType)) {
            if (result.body == null) {
              data = null;
            } else {
              data = await result.json();
            }
          } else {
            data = await result.text();
          }
        } catch (e) {
          return {
            type: ResultType.error,
            error: e
          };
        }
        if (resultType === ResultType.error) {
          return {
            type: resultType,
            error: new ErrorResponseImpl(status, result.statusText, data),
            headers: result.headers
          };
        }
        return {
          type: ResultType.data,
          data,
          statusCode: result.status,
          headers: result.headers
        };
      }
      if (resultType === ResultType.error) {
        return {
          type: resultType,
          error: result
        };
      }
      if (isDeferredData2(result)) {
        var _result$init, _result$init2;
        return {
          type: ResultType.deferred,
          deferredData: result,
          statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
          headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
        };
      }
      return {
        type: ResultType.data,
        data: result
      };
    }
    function createClientSideRequest(history, location, signal, submission) {
      let url = history.createURL(stripHashFromPath(location)).toString();
      let init = {
        signal
      };
      if (submission && isMutationMethod(submission.formMethod)) {
        let {
          formMethod,
          formEncType
        } = submission;
        init.method = formMethod.toUpperCase();
        if (formEncType === "application/json") {
          init.headers = new Headers({
            "Content-Type": formEncType
          });
          init.body = JSON.stringify(submission.json);
        } else if (formEncType === "text/plain") {
          init.body = submission.text;
        } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
          init.body = convertFormDataToSearchParams(submission.formData);
        } else {
          init.body = submission.formData;
        }
      }
      return new Request(url, init);
    }
    function convertFormDataToSearchParams(formData) {
      let searchParams = new URLSearchParams();
      for (let [key, value] of formData.entries()) {
        searchParams.append(key, typeof value === "string" ? value : value.name);
      }
      return searchParams;
    }
    function convertSearchParamsToFormData(searchParams) {
      let formData = new FormData();
      for (let [key, value] of searchParams.entries()) {
        formData.append(key, value);
      }
      return formData;
    }
    function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
      let loaderData = {};
      let errors = null;
      let statusCode;
      let foundError = false;
      let loaderHeaders = {};
      results.forEach((result, index) => {
        let id = matchesToLoad[index].route.id;
        invariant2(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, id);
          let error = result.error;
          if (pendingError) {
            error = Object.values(pendingError)[0];
            pendingError = void 0;
          }
          errors = errors || {};
          if (errors[boundaryMatch.route.id] == null) {
            errors[boundaryMatch.route.id] = error;
          }
          loaderData[id] = void 0;
          if (!foundError) {
            foundError = true;
            statusCode = isRouteErrorResponse3(result.error) ? result.error.status : 500;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        } else {
          if (isDeferredResult(result)) {
            activeDeferreds.set(id, result.deferredData);
            loaderData[id] = result.deferredData.data;
          } else {
            loaderData[id] = result.data;
          }
          if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
            statusCode = result.statusCode;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        }
      });
      if (pendingError) {
        errors = pendingError;
        loaderData[Object.keys(pendingError)[0]] = void 0;
      }
      return {
        loaderData,
        errors,
        statusCode: statusCode || 200,
        loaderHeaders
      };
    }
    function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
      let {
        loaderData,
        errors
      } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
      for (let index = 0; index < revalidatingFetchers.length; index++) {
        let {
          key,
          match: match3,
          controller
        } = revalidatingFetchers[index];
        invariant2(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
        let result = fetcherResults[index];
        if (controller && controller.signal.aborted) {
          continue;
        } else if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(state.matches, match3 == null ? void 0 : match3.route.id);
          if (!(errors && errors[boundaryMatch.route.id])) {
            errors = _extends2({}, errors, {
              [boundaryMatch.route.id]: result.error
            });
          }
          state.fetchers.delete(key);
        } else if (isRedirectResult(result)) {
          invariant2(false, "Unhandled fetcher revalidation redirect");
        } else if (isDeferredResult(result)) {
          invariant2(false, "Unhandled fetcher deferred data");
        } else {
          let doneFetcher = getDoneFetcher(result.data);
          state.fetchers.set(key, doneFetcher);
        }
      }
      return {
        loaderData,
        errors
      };
    }
    function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
      let mergedLoaderData = _extends2({}, newLoaderData);
      for (let match3 of matches) {
        let id = match3.route.id;
        if (newLoaderData.hasOwnProperty(id)) {
          if (newLoaderData[id] !== void 0) {
            mergedLoaderData[id] = newLoaderData[id];
          }
        } else if (loaderData[id] !== void 0 && match3.route.loader) {
          mergedLoaderData[id] = loaderData[id];
        }
        if (errors && errors.hasOwnProperty(id)) {
          break;
        }
      }
      return mergedLoaderData;
    }
    function findNearestBoundary(matches, routeId) {
      let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
      return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
    }
    function getShortCircuitMatches(routes3) {
      let route = routes3.length === 1 ? routes3[0] : routes3.find((r) => r.index || !r.path || r.path === "/") || {
        id: "__shim-error-route__"
      };
      return {
        matches: [{
          params: {},
          pathname: "",
          pathnameBase: "",
          route
        }],
        route
      };
    }
    function getInternalRouterError(status, _temp5) {
      let {
        pathname,
        routeId,
        method,
        type
      } = _temp5 === void 0 ? {} : _temp5;
      let statusText = "Unknown Server Error";
      let errorMessage = "Unknown @remix-run/router error";
      if (status === 400) {
        statusText = "Bad Request";
        if (method && pathname && routeId) {
          errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
        } else if (type === "defer-action") {
          errorMessage = "defer() is not supported in actions";
        } else if (type === "invalid-body") {
          errorMessage = "Unable to encode submission body";
        }
      } else if (status === 403) {
        statusText = "Forbidden";
        errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
      } else if (status === 404) {
        statusText = "Not Found";
        errorMessage = 'No route matches URL "' + pathname + '"';
      } else if (status === 405) {
        statusText = "Method Not Allowed";
        if (method && pathname && routeId) {
          errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
        } else if (method) {
          errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
        }
      }
      return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
    }
    function findRedirect(results) {
      for (let i = results.length - 1; i >= 0; i--) {
        let result = results[i];
        if (isRedirectResult(result)) {
          return {
            result,
            idx: i
          };
        }
      }
    }
    function stripHashFromPath(path) {
      let parsedPath = typeof path === "string" ? parsePath3(path) : path;
      return createPath2(_extends2({}, parsedPath, {
        hash: ""
      }));
    }
    function isHashChangeOnly(a, b) {
      if (a.pathname !== b.pathname || a.search !== b.search) {
        return false;
      }
      if (a.hash === "") {
        return b.hash !== "";
      } else if (a.hash === b.hash) {
        return true;
      } else if (b.hash !== "") {
        return true;
      }
      return false;
    }
    function isDeferredResult(result) {
      return result.type === ResultType.deferred;
    }
    function isErrorResult(result) {
      return result.type === ResultType.error;
    }
    function isRedirectResult(result) {
      return (result && result.type) === ResultType.redirect;
    }
    function isDeferredData2(value) {
      let deferred = value;
      return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
    }
    function isResponse2(value) {
      return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
    }
    function isRedirectResponse(result) {
      if (!isResponse2(result)) {
        return false;
      }
      let status = result.status;
      let location = result.headers.get("Location");
      return status >= 300 && status <= 399 && location != null;
    }
    function isQueryRouteResponse(obj) {
      return obj && isResponse2(obj.response) && (obj.type === ResultType.data || obj.type === ResultType.error);
    }
    function isValidMethod(method) {
      return validRequestMethods.has(method.toLowerCase());
    }
    function isMutationMethod(method) {
      return validMutationMethods.has(method.toLowerCase());
    }
    async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
      for (let index = 0; index < results.length; index++) {
        let result = results[index];
        let match3 = matchesToLoad[index];
        if (!match3) {
          continue;
        }
        let currentMatch = currentMatches.find((m) => m.route.id === match3.route.id);
        let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match3) && (currentLoaderData && currentLoaderData[match3.route.id]) !== void 0;
        if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
          let signal = signals[index];
          invariant2(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
          await resolveDeferredData(result, signal, isFetcher).then((result2) => {
            if (result2) {
              results[index] = result2 || results[index];
            }
          });
        }
      }
    }
    async function resolveDeferredData(result, signal, unwrap) {
      if (unwrap === void 0) {
        unwrap = false;
      }
      let aborted = await result.deferredData.resolveData(signal);
      if (aborted) {
        return;
      }
      if (unwrap) {
        try {
          return {
            type: ResultType.data,
            data: result.deferredData.unwrappedData
          };
        } catch (e) {
          return {
            type: ResultType.error,
            error: e
          };
        }
      }
      return {
        type: ResultType.data,
        data: result.deferredData.data
      };
    }
    function hasNakedIndexQuery(search) {
      return new URLSearchParams(search).getAll("index").some((v) => v === "");
    }
    function getTargetMatch(matches, location) {
      let search = typeof location === "string" ? parsePath3(location).search : location.search;
      if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
        return matches[matches.length - 1];
      }
      let pathMatches = getPathContributingMatches(matches);
      return pathMatches[pathMatches.length - 1];
    }
    function getSubmissionFromNavigation(navigation) {
      let {
        formMethod,
        formAction,
        formEncType,
        text,
        formData,
        json: json3
      } = navigation;
      if (!formMethod || !formAction || !formEncType) {
        return;
      }
      if (text != null) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData: void 0,
          json: void 0,
          text
        };
      } else if (formData != null) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData,
          json: void 0,
          text: void 0
        };
      } else if (json3 !== void 0) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData: void 0,
          json: json3,
          text: void 0
        };
      }
    }
    function getLoadingNavigation(location, submission) {
      if (submission) {
        let navigation = {
          state: "loading",
          location,
          formMethod: submission.formMethod,
          formAction: submission.formAction,
          formEncType: submission.formEncType,
          formData: submission.formData,
          json: submission.json,
          text: submission.text
        };
        return navigation;
      } else {
        let navigation = {
          state: "loading",
          location,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0
        };
        return navigation;
      }
    }
    function getSubmittingNavigation(location, submission) {
      let navigation = {
        state: "submitting",
        location,
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text
      };
      return navigation;
    }
    function getLoadingFetcher(submission, data) {
      if (submission) {
        let fetcher = {
          state: "loading",
          formMethod: submission.formMethod,
          formAction: submission.formAction,
          formEncType: submission.formEncType,
          formData: submission.formData,
          json: submission.json,
          text: submission.text,
          data
        };
        return fetcher;
      } else {
        let fetcher = {
          state: "loading",
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0,
          data
        };
        return fetcher;
      }
    }
    function getSubmittingFetcher(submission, existingFetcher) {
      let fetcher = {
        state: "submitting",
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text,
        data: existingFetcher ? existingFetcher.data : void 0
      };
      return fetcher;
    }
    function getDoneFetcher(data) {
      let fetcher = {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data
      };
      return fetcher;
    }
    function restoreAppliedTransitions(_window, transitions) {
      try {
        let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
        if (sessionPositions) {
          let json3 = JSON.parse(sessionPositions);
          for (let [k, v] of Object.entries(json3 || {})) {
            if (v && Array.isArray(v)) {
              transitions.set(k, new Set(v || []));
            }
          }
        }
      } catch (e) {
      }
    }
    function persistAppliedTransitions(_window, transitions) {
      if (transitions.size > 0) {
        let json3 = {};
        for (let [k, v] of transitions) {
          json3[k] = [...v];
        }
        try {
          _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json3));
        } catch (error) {
          warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
        }
      }
    }
    exports.AbortedDeferredError = AbortedDeferredError;
    exports.Action = Action;
    exports.IDLE_BLOCKER = IDLE_BLOCKER;
    exports.IDLE_FETCHER = IDLE_FETCHER;
    exports.IDLE_NAVIGATION = IDLE_NAVIGATION;
    exports.UNSAFE_DEFERRED_SYMBOL = UNSAFE_DEFERRED_SYMBOL;
    exports.UNSAFE_DeferredData = DeferredData;
    exports.UNSAFE_ErrorResponseImpl = ErrorResponseImpl;
    exports.UNSAFE_convertRouteMatchToUiMatch = convertRouteMatchToUiMatch;
    exports.UNSAFE_convertRoutesToDataRoutes = convertRoutesToDataRoutes;
    exports.UNSAFE_getResolveToMatches = getResolveToMatches;
    exports.UNSAFE_invariant = invariant2;
    exports.UNSAFE_warning = warning;
    exports.createBrowserHistory = createBrowserHistory;
    exports.createHashHistory = createHashHistory;
    exports.createMemoryHistory = createMemoryHistory;
    exports.createPath = createPath2;
    exports.createRouter = createRouter;
    exports.createStaticHandler = createStaticHandler;
    exports.defer = defer;
    exports.generatePath = generatePath2;
    exports.getStaticContextFromError = getStaticContextFromError;
    exports.getToPathname = getToPathname;
    exports.isDeferredData = isDeferredData2;
    exports.isRouteErrorResponse = isRouteErrorResponse3;
    exports.joinPaths = joinPaths;
    exports.json = json2;
    exports.matchPath = matchPath2;
    exports.matchRoutes = matchRoutes3;
    exports.normalizePathname = normalizePathname;
    exports.parsePath = parsePath3;
    exports.redirect = redirect2;
    exports.redirectDocument = redirectDocument;
    exports.resolvePath = resolvePath2;
    exports.resolveTo = resolveTo;
    exports.stripBasename = stripBasename;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/mode.js
var require_mode = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/mode.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var ServerMode = /* @__PURE__ */ function(ServerMode2) {
      ServerMode2["Development"] = "development";
      ServerMode2["Production"] = "production";
      ServerMode2["Test"] = "test";
      return ServerMode2;
    }({});
    function isServerMode(value) {
      return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
    }
    exports.ServerMode = ServerMode;
    exports.isServerMode = isServerMode;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/errors.js
var require_errors = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/errors.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    var mode2 = require_mode();
    function sanitizeError(error, serverMode) {
      if (error instanceof Error && serverMode !== mode2.ServerMode.Development) {
        let sanitized = new Error("Unexpected Server Error");
        sanitized.stack = void 0;
        return sanitized;
      }
      return error;
    }
    function sanitizeErrors(errors, serverMode) {
      return Object.entries(errors).reduce((acc, [routeId, error]) => {
        return Object.assign(acc, {
          [routeId]: sanitizeError(error, serverMode)
        });
      }, {});
    }
    function serializeError(error, serverMode) {
      let sanitized = sanitizeError(error, serverMode);
      return {
        message: sanitized.message,
        stack: sanitized.stack
      };
    }
    function serializeErrors(errors, serverMode) {
      if (!errors)
        return null;
      let entries = Object.entries(errors);
      let serialized = {};
      for (let [key, val] of entries) {
        if (router.isRouteErrorResponse(val)) {
          serialized[key] = {
            ...val,
            __type: "RouteErrorResponse"
          };
        } else if (val instanceof Error) {
          let sanitized = sanitizeError(val, serverMode);
          serialized[key] = {
            message: sanitized.message,
            stack: sanitized.stack,
            __type: "Error",
            // If this is a subclass (i.e., ReferenceError), send up the type so we
            // can re-create the same type during hydration.  This will only apply
            // in dev mode since all production errors are sanitized to normal
            // Error instances
            ...sanitized.name !== "Error" ? {
              __subType: sanitized.name
            } : {}
          };
        } else {
          serialized[key] = val;
        }
      }
      return serialized;
    }
    exports.sanitizeError = sanitizeError;
    exports.sanitizeErrors = sanitizeErrors;
    exports.serializeError = serializeError;
    exports.serializeErrors = serializeErrors;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/responses.js
var require_responses = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/responses.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    var errors = require_errors();
    var json2 = (data, init = {}) => {
      return router.json(data, init);
    };
    var defer = (data, init = {}) => {
      return router.defer(data, init);
    };
    var redirect2 = (url, init = 302) => {
      return router.redirect(url, init);
    };
    var redirectDocument = (url, init = 302) => {
      return router.redirectDocument(url, init);
    };
    function isDeferredData2(value) {
      let deferred = value;
      return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
    }
    function isResponse2(value) {
      return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
    }
    var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    function isRedirectStatusCode(statusCode) {
      return redirectStatusCodes.has(statusCode);
    }
    function isRedirectResponse(response) {
      return isRedirectStatusCode(response.status);
    }
    function isTrackedPromise(value) {
      return value != null && typeof value.then === "function" && value._tracked === true;
    }
    var DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
    function createDeferredReadableStream(deferredData, signal, serverMode) {
      let encoder = new TextEncoder();
      let stream = new ReadableStream({
        async start(controller) {
          let criticalData = {};
          let preresolvedKeys = [];
          for (let [key, value] of Object.entries(deferredData.data)) {
            if (isTrackedPromise(value)) {
              criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
              if (typeof value._data !== "undefined" || typeof value._error !== "undefined") {
                preresolvedKeys.push(key);
              }
            } else {
              criticalData[key] = value;
            }
          }
          controller.enqueue(encoder.encode(JSON.stringify(criticalData) + "\n\n"));
          for (let preresolvedKey of preresolvedKeys) {
            enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
          }
          let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
            if (settledKey) {
              enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
            }
          });
          await deferredData.resolveData(signal);
          unsubscribe();
          controller.close();
        }
      });
      return stream;
    }
    function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
      if ("_error" in promise) {
        controller.enqueue(encoder.encode("error:" + JSON.stringify({
          [settledKey]: promise._error instanceof Error ? errors.serializeError(promise._error, serverMode) : promise._error
        }) + "\n\n"));
      } else {
        controller.enqueue(encoder.encode("data:" + JSON.stringify({
          [settledKey]: promise._data ?? null
        }) + "\n\n"));
      }
    }
    exports.createDeferredReadableStream = createDeferredReadableStream;
    exports.defer = defer;
    exports.isDeferredData = isDeferredData2;
    exports.isRedirectResponse = isRedirectResponse;
    exports.isRedirectStatusCode = isRedirectStatusCode;
    exports.isResponse = isResponse2;
    exports.json = json2;
    exports.redirect = redirect2;
    exports.redirectDocument = redirectDocument;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/entry.js
var require_entry = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/entry.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    function createEntryRouteModules(manifest) {
      return Object.keys(manifest).reduce((memo, routeId) => {
        memo[routeId] = manifest[routeId].module;
        return memo;
      }, {});
    }
    exports.createEntryRouteModules = createEntryRouteModules;
  }
});

// ../../../node_modules/.pnpm/set-cookie-parser@2.6.0/node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "../../../node_modules/.pnpm/set-cookie-parser@2.6.0/node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key === "expires") {
          cookie.expires = new Date(value2);
        } else if (key === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key === "secure") {
          cookie.secure = true;
        } else if (key === "httponly") {
          cookie.httpOnly = true;
        } else if (key === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse2(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/headers.js
var require_headers = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/headers.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var setCookieParser = require_set_cookie();
    function getDocumentHeadersRR(build, context) {
      let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1;
      let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
      let errorHeaders;
      if (boundaryIdx >= 0) {
        let {
          actionHeaders,
          actionData,
          loaderHeaders,
          loaderData
        } = context;
        context.matches.slice(boundaryIdx).some((match3) => {
          let id = match3.route.id;
          if (actionHeaders[id] && (!actionData || actionData[id] === void 0)) {
            errorHeaders = actionHeaders[id];
          } else if (loaderHeaders[id] && loaderData[id] === void 0) {
            errorHeaders = loaderHeaders[id];
          }
          return errorHeaders != null;
        });
      }
      return matches.reduce((parentHeaders, match3, idx) => {
        let {
          id
        } = match3.route;
        let routeModule = build.routes[id].module;
        let loaderHeaders = context.loaderHeaders[id] || new Headers();
        let actionHeaders = context.actionHeaders[id] || new Headers();
        let includeErrorHeaders = errorHeaders != void 0 && idx === matches.length - 1;
        let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
        if (routeModule.headers == null) {
          let headers2 = new Headers(parentHeaders);
          if (includeErrorCookies) {
            prependCookies(errorHeaders, headers2);
          }
          prependCookies(actionHeaders, headers2);
          prependCookies(loaderHeaders, headers2);
          return headers2;
        }
        let headers = new Headers(routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
          loaderHeaders,
          parentHeaders,
          actionHeaders,
          errorHeaders: includeErrorHeaders ? errorHeaders : void 0
        }) : routeModule.headers : void 0);
        if (includeErrorCookies) {
          prependCookies(errorHeaders, headers);
        }
        prependCookies(actionHeaders, headers);
        prependCookies(loaderHeaders, headers);
        prependCookies(parentHeaders, headers);
        return headers;
      }, new Headers());
    }
    function prependCookies(parentHeaders, childHeaders) {
      let parentSetCookieString = parentHeaders.get("Set-Cookie");
      if (parentSetCookieString) {
        let cookies = setCookieParser.splitCookiesString(parentSetCookieString);
        cookies.forEach((cookie) => {
          childHeaders.append("Set-Cookie", cookie);
        });
      }
    }
    exports.getDocumentHeadersRR = getDocumentHeadersRR;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/invariant.js
var require_invariant = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/invariant.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    function invariant2(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new");
        throw new Error(message);
      }
    }
    exports["default"] = invariant2;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routeMatching.js
var require_routeMatching = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routeMatching.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    function matchServerRoutes(routes3, pathname, basename2) {
      let matches = router.matchRoutes(routes3, pathname, basename2);
      if (!matches)
        return null;
      return matches.map((match3) => ({
        params: match3.params,
        pathname: match3.pathname,
        route: match3.route
      }));
    }
    exports.matchServerRoutes = matchServerRoutes;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/data.js
var require_data = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/data.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var responses = require_responses();
    async function callRouteActionRR({
      loadContext,
      action: action2,
      params,
      request,
      routeId
    }) {
      let result = await action2({
        request: stripDataParam(stripIndexParam(request)),
        context: loadContext,
        params
      });
      if (result === void 0) {
        throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
      }
      return responses.isResponse(result) ? result : responses.json(result);
    }
    async function callRouteLoaderRR({
      loadContext,
      loader: loader3,
      params,
      request,
      routeId
    }) {
      let result = await loader3({
        request: stripDataParam(stripIndexParam(request)),
        context: loadContext,
        params
      });
      if (result === void 0) {
        throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
      }
      if (responses.isDeferredData(result)) {
        if (result.init && responses.isRedirectStatusCode(result.init.status || 200)) {
          return responses.redirect(new Headers(result.init.headers).get("Location"), result.init);
        }
        return result;
      }
      return responses.isResponse(result) ? result : responses.json(result);
    }
    function stripIndexParam(request) {
      let url = new URL(request.url);
      let indexValues = url.searchParams.getAll("index");
      url.searchParams.delete("index");
      let indexValuesToKeep = [];
      for (let indexValue of indexValues) {
        if (indexValue) {
          indexValuesToKeep.push(indexValue);
        }
      }
      for (let toKeep of indexValuesToKeep) {
        url.searchParams.append("index", toKeep);
      }
      let init = {
        method: request.method,
        body: request.body,
        headers: request.headers,
        signal: request.signal
      };
      if (init.body) {
        init.duplex = "half";
      }
      return new Request(url.href, init);
    }
    function stripDataParam(request) {
      let url = new URL(request.url);
      url.searchParams.delete("_data");
      let init = {
        method: request.method,
        body: request.body,
        headers: request.headers,
        signal: request.signal
      };
      if (init.body) {
        init.duplex = "half";
      }
      return new Request(url.href, init);
    }
    exports.callRouteActionRR = callRouteActionRR;
    exports.callRouteLoaderRR = callRouteLoaderRR;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routes.js
var require_routes = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/routes.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var data = require_data();
    function groupRoutesByParentId2(manifest) {
      let routes3 = {};
      Object.values(manifest).forEach((route) => {
        let parentId = route.parentId || "";
        if (!routes3[parentId]) {
          routes3[parentId] = [];
        }
        routes3[parentId].push(route);
      });
      return routes3;
    }
    function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
      return (routesByParentId[parentId] || []).map((route) => ({
        ...route,
        children: createRoutes(manifest, route.id, routesByParentId)
      }));
    }
    function createStaticHandlerDataRoutes(manifest, future2, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
      return (routesByParentId[parentId] || []).map((route) => {
        let commonRoute = {
          // Always include root due to default boundaries
          hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
          id: route.id,
          path: route.path,
          loader: route.module.loader ? (
            // Need to use RR's version here to permit the optional context even
            // though we know it'll always be provided in remix
            (args) => data.callRouteLoaderRR({
              request: args.request,
              params: args.params,
              loadContext: args.context,
              loader: route.module.loader,
              routeId: route.id
            })
          ) : void 0,
          action: route.module.action ? (args) => data.callRouteActionRR({
            request: args.request,
            params: args.params,
            loadContext: args.context,
            action: route.module.action,
            routeId: route.id
          }) : void 0,
          handle: route.module.handle
        };
        return route.index ? {
          index: true,
          ...commonRoute
        } : {
          caseSensitive: route.caseSensitive,
          children: createStaticHandlerDataRoutes(manifest, future2, route.id, routesByParentId),
          ...commonRoute
        };
      });
    }
    exports.createRoutes = createRoutes;
    exports.createStaticHandlerDataRoutes = createStaticHandlerDataRoutes;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/markup.js
var require_markup = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/markup.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var ESCAPE_LOOKUP2 = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    var ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
    function escapeHtml2(html) {
      return html.replace(ESCAPE_REGEX2, (match3) => ESCAPE_LOOKUP2[match3]);
    }
    exports.escapeHtml = escapeHtml2;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/serverHandoff.js
var require_serverHandoff = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/serverHandoff.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var markup = require_markup();
    function createServerHandoffString(serverHandoff) {
      return markup.escapeHtml(JSON.stringify(serverHandoff));
    }
    exports.createServerHandoffString = createServerHandoffString;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/dev.js
var require_dev = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/dev.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    async function broadcastDevReady(build, origin) {
      origin ??= process.env.REMIX_DEV_ORIGIN;
      if (!origin)
        throw Error("Dev server origin not set");
      let url = new URL(origin);
      url.pathname = "ping";
      let response = await fetch(url.href, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          buildHash: build.assets.version
        })
      }).catch((error) => {
        console.error(`Could not reach Remix dev server at ${url}`);
        throw error;
      });
      if (!response.ok) {
        console.error(`Could not reach Remix dev server at ${url} (${response.status})`);
        throw Error(await response.text());
      }
    }
    function logDevReady(build) {
      console.log(`[REMIX DEV] ${build.assets.version} ready`);
    }
    var globalDevServerHooksKey = "__remix_devServerHooks";
    function setDevServerHooks(devServerHooks) {
      globalThis[globalDevServerHooksKey] = devServerHooks;
    }
    function getDevServerHooks() {
      return globalThis[globalDevServerHooksKey];
    }
    exports.broadcastDevReady = broadcastDevReady;
    exports.getDevServerHooks = getDevServerHooks;
    exports.logDevReady = logDevReady;
    exports.setDevServerHooks = setDevServerHooks;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/server.js
var require_server = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/server.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var router = require_router_cjs();
    var entry2 = require_entry();
    var errors = require_errors();
    var headers = require_headers();
    var invariant2 = require_invariant();
    var mode2 = require_mode();
    var routeMatching = require_routeMatching();
    var routes3 = require_routes();
    var responses = require_responses();
    var serverHandoff = require_serverHandoff();
    var dev = require_dev();
    function derive(build, mode$1) {
      var _build$future, _build$future2;
      let routes$1 = routes3.createRoutes(build.routes);
      let dataRoutes = routes3.createStaticHandlerDataRoutes(build.routes, build.future);
      let serverMode = mode2.isServerMode(mode$1) ? mode$1 : mode2.ServerMode.Production;
      let staticHandler = router.createStaticHandler(dataRoutes, {
        basename: build.basename,
        future: {
          v7_relativeSplatPath: ((_build$future = build.future) === null || _build$future === void 0 ? void 0 : _build$future.v3_relativeSplatPath) === true,
          v7_throwAbortReason: ((_build$future2 = build.future) === null || _build$future2 === void 0 ? void 0 : _build$future2.v3_throwAbortReason) === true
        }
      });
      let errorHandler = build.entry.module.handleError || ((error, {
        request
      }) => {
        if (serverMode !== mode2.ServerMode.Test && !request.signal.aborted) {
          console.error(
            // @ts-expect-error This is "private" from users but intended for internal use
            router.isRouteErrorResponse(error) && error.error ? error.error : error
          );
        }
      });
      return {
        routes: routes$1,
        dataRoutes,
        serverMode,
        staticHandler,
        errorHandler
      };
    }
    var createRequestHandler2 = (build, mode$1) => {
      let _build;
      let routes4;
      let serverMode;
      let staticHandler;
      let errorHandler;
      return async function requestHandler(request, loadContext = {}) {
        _build = typeof build === "function" ? await build() : build;
        mode$1 ??= _build.mode;
        if (typeof build === "function") {
          let derived = derive(_build, mode$1);
          routes4 = derived.routes;
          serverMode = derived.serverMode;
          staticHandler = derived.staticHandler;
          errorHandler = derived.errorHandler;
        } else if (!routes4 || !serverMode || !staticHandler || !errorHandler) {
          let derived = derive(_build, mode$1);
          routes4 = derived.routes;
          serverMode = derived.serverMode;
          staticHandler = derived.staticHandler;
          errorHandler = derived.errorHandler;
        }
        let url = new URL(request.url);
        let matches = routeMatching.matchServerRoutes(routes4, url.pathname, _build.basename);
        let handleError = (error) => {
          if (mode$1 === mode2.ServerMode.Development) {
            var _getDevServerHooks, _getDevServerHooks$pr;
            (_getDevServerHooks = dev.getDevServerHooks()) === null || _getDevServerHooks === void 0 ? void 0 : (_getDevServerHooks$pr = _getDevServerHooks.processRequestError) === null || _getDevServerHooks$pr === void 0 ? void 0 : _getDevServerHooks$pr.call(_getDevServerHooks, error);
          }
          errorHandler(error, {
            context: loadContext,
            params: matches && matches.length > 0 ? matches[0].params : {},
            request
          });
        };
        let response;
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data");
          response = await handleDataRequestRR(serverMode, _build, staticHandler, routeId, request, loadContext, handleError);
          if (_build.entry.module.handleDataRequest) {
            var _matches$find;
            response = await _build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: (matches === null || matches === void 0 ? void 0 : (_matches$find = matches.find((m) => m.route.id == routeId)) === null || _matches$find === void 0 ? void 0 : _matches$find.params) || {},
              request
            });
          }
        } else if (matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null) {
          response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext, handleError);
        } else {
          var _getDevServerHooks2, _getDevServerHooks2$g;
          let criticalCss = mode$1 === mode2.ServerMode.Development ? await ((_getDevServerHooks2 = dev.getDevServerHooks()) === null || _getDevServerHooks2 === void 0 ? void 0 : (_getDevServerHooks2$g = _getDevServerHooks2.getCriticalCss) === null || _getDevServerHooks2$g === void 0 ? void 0 : _getDevServerHooks2$g.call(_getDevServerHooks2, _build, url.pathname)) : void 0;
          response = await handleDocumentRequestRR(serverMode, _build, staticHandler, request, loadContext, handleError, criticalCss);
        }
        if (request.method === "HEAD") {
          return new Response(null, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
          });
        }
        return response;
      };
    };
    async function handleDataRequestRR(serverMode, build, staticHandler, routeId, request, loadContext, handleError) {
      try {
        let response = await staticHandler.queryRoute(request, {
          routeId,
          requestContext: loadContext
        });
        if (responses.isRedirectResponse(response)) {
          let headers2 = new Headers(response.headers);
          let redirectUrl = headers2.get("Location");
          headers2.set("X-Remix-Redirect", build.basename ? router.stripBasename(redirectUrl, build.basename) || redirectUrl : redirectUrl);
          headers2.set("X-Remix-Status", response.status);
          headers2.delete("Location");
          if (response.headers.get("Set-Cookie") !== null) {
            headers2.set("X-Remix-Revalidate", "yes");
          }
          return new Response(null, {
            status: 204,
            headers: headers2
          });
        }
        if (router.UNSAFE_DEFERRED_SYMBOL in response) {
          let deferredData = response[router.UNSAFE_DEFERRED_SYMBOL];
          let body = responses.createDeferredReadableStream(deferredData, request.signal, serverMode);
          let init = deferredData.init || {};
          let headers2 = new Headers(init.headers);
          headers2.set("Content-Type", "text/remix-deferred");
          headers2.set("X-Remix-Response", "yes");
          init.headers = headers2;
          return new Response(body, init);
        }
        response.headers.set("X-Remix-Response", "yes");
        return response;
      } catch (error) {
        if (responses.isResponse(error)) {
          error.headers.set("X-Remix-Catch", "yes");
          return error;
        }
        if (router.isRouteErrorResponse(error)) {
          if (error) {
            handleError(error);
          }
          return errorResponseToJson(error, serverMode);
        }
        let errorInstance = error instanceof Error || error instanceof DOMException ? error : new Error("Unexpected Server Error");
        handleError(errorInstance);
        return router.json(errors.serializeError(errorInstance, serverMode), {
          status: 500,
          headers: {
            "X-Remix-Error": "yes"
          }
        });
      }
    }
    async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError, criticalCss) {
      let context;
      try {
        context = await staticHandler.query(request, {
          requestContext: loadContext
        });
      } catch (error) {
        handleError(error);
        return new Response(null, {
          status: 500
        });
      }
      if (responses.isResponse(context)) {
        return context;
      }
      if (context.errors) {
        Object.values(context.errors).forEach((err) => {
          if (!router.isRouteErrorResponse(err) || err.error) {
            handleError(err);
          }
        });
        context.errors = errors.sanitizeErrors(context.errors, serverMode);
      }
      let headers$1 = headers.getDocumentHeadersRR(build, context);
      let entryContext = {
        manifest: build.assets,
        routeModules: entry2.createEntryRouteModules(build.routes),
        staticHandlerContext: context,
        criticalCss,
        serverHandoffString: serverHandoff.createServerHandoffString({
          url: context.location.pathname,
          basename: build.basename,
          criticalCss,
          state: {
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: errors.serializeErrors(context.errors, serverMode)
          },
          future: build.future,
          isSpaMode: build.isSpaMode
        }),
        future: build.future,
        isSpaMode: build.isSpaMode,
        serializeError: (err) => errors.serializeError(err, serverMode)
      };
      let handleDocumentRequestFunction = build.entry.module.default;
      try {
        return await handleDocumentRequestFunction(request, context.statusCode, headers$1, entryContext, loadContext);
      } catch (error) {
        handleError(error);
        let errorForSecondRender = error;
        if (responses.isResponse(error)) {
          let data;
          try {
            let contentType = error.headers.get("Content-Type");
            if (contentType && /\bapplication\/json\b/.test(contentType)) {
              if (error.body == null) {
                data = null;
              } else {
                data = await error.json();
              }
            } else {
              data = await error.text();
            }
            errorForSecondRender = new router.UNSAFE_ErrorResponseImpl(error.status, error.statusText, data);
          } catch (e) {
          }
        }
        context = router.getStaticContextFromError(staticHandler.dataRoutes, context, errorForSecondRender);
        if (context.errors) {
          context.errors = errors.sanitizeErrors(context.errors, serverMode);
        }
        entryContext = {
          ...entryContext,
          staticHandlerContext: context,
          serverHandoffString: serverHandoff.createServerHandoffString({
            url: context.location.pathname,
            basename: build.basename,
            state: {
              loaderData: context.loaderData,
              actionData: context.actionData,
              errors: errors.serializeErrors(context.errors, serverMode)
            },
            future: build.future,
            isSpaMode: build.isSpaMode
          })
        };
        try {
          return await handleDocumentRequestFunction(request, context.statusCode, headers$1, entryContext, loadContext);
        } catch (error2) {
          handleError(error2);
          return returnLastResortErrorResponse(error2, serverMode);
        }
      }
    }
    async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
      try {
        let response = await staticHandler.queryRoute(request, {
          routeId,
          requestContext: loadContext
        });
        invariant2["default"](!(router.UNSAFE_DEFERRED_SYMBOL in response), `You cannot return a \`defer()\` response from a Resource Route.  Did you forget to export a default UI component from the "${routeId}" route?`);
        invariant2["default"](responses.isResponse(response), "Expected a Response to be returned from queryRoute");
        return response;
      } catch (error) {
        if (responses.isResponse(error)) {
          error.headers.set("X-Remix-Catch", "yes");
          return error;
        }
        if (router.isRouteErrorResponse(error)) {
          if (error) {
            handleError(error);
          }
          return errorResponseToJson(error, serverMode);
        }
        handleError(error);
        return returnLastResortErrorResponse(error, serverMode);
      }
    }
    function errorResponseToJson(errorResponse, serverMode) {
      return router.json(errors.serializeError(
        // @ts-expect-error This is "private" from users but intended for internal use
        errorResponse.error || new Error("Unexpected Server Error"),
        serverMode
      ), {
        status: errorResponse.status,
        statusText: errorResponse.statusText,
        headers: {
          "X-Remix-Error": "yes"
        }
      });
    }
    function returnLastResortErrorResponse(error, serverMode) {
      let message = "Unexpected Server Error";
      if (serverMode !== mode2.ServerMode.Production) {
        message += `

${String(error)}`;
      }
      return new Response(message, {
        status: 500,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
    exports.createRequestHandler = createRequestHandler2;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions.js
var require_sessions = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var warnings = require_warnings();
    function flash(name) {
      return `__flash_${name}__`;
    }
    var createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            map.delete(flashName);
            return value;
          }
          return void 0;
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    };
    var isSession = (object) => {
      return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
    };
    var createSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) => {
      let cookie = cookies.isCookie(cookieArg) ? cookieArg : createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
      warnOnceAboutSigningSessionCookie(cookie);
      return {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options);
          let data = id && await readData(id);
          return createSession(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session;
          let expires = (options === null || options === void 0 ? void 0 : options.maxAge) != null ? new Date(Date.now() + options.maxAge * 1e3) : (options === null || options === void 0 ? void 0 : options.expires) != null ? options.expires : cookie.expires;
          if (id) {
            await updateData(id, data, expires);
          } else {
            id = await createData(data, expires);
          }
          return cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          await deleteData(session.id);
          return cookie.serialize("", {
            ...options,
            maxAge: void 0,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
    function warnOnceAboutSigningSessionCookie(cookie) {
      warnings.warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/utils/cookies#signing-cookies for more information.`);
    }
    exports.createSession = createSession;
    exports.createSessionStorageFactory = createSessionStorageFactory;
    exports.isSession = isSession;
    exports.warnOnceAboutSigningSessionCookie = warnOnceAboutSigningSessionCookie;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/cookieStorage.js
var require_cookieStorage = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/cookieStorage.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var sessions = require_sessions();
    var createCookieSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg
    } = {}) => {
      let cookie = cookies.isCookie(cookieArg) ? cookieArg : createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
      sessions.warnOnceAboutSigningSessionCookie(cookie);
      return {
        async getSession(cookieHeader, options) {
          return sessions.createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          let serializedCookie = await cookie.serialize(session.data, options);
          if (serializedCookie.length > 4096) {
            throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
          }
          return serializedCookie;
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            maxAge: void 0,
            expires: /* @__PURE__ */ new Date(0)
          });
        }
      };
    };
    exports.createCookieSessionStorageFactory = createCookieSessionStorageFactory;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/memoryStorage.js
var require_memoryStorage = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/sessions/memoryStorage.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var createMemorySessionStorageFactory = (createSessionStorage) => ({
      cookie
    } = {}) => {
      let map = /* @__PURE__ */ new Map();
      return createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = Math.random().toString(36).substring(2, 10);
          map.set(id, {
            data,
            expires
          });
          return id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > /* @__PURE__ */ new Date()) {
              return data;
            }
            if (expires)
              map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    };
    exports.createMemorySessionStorageFactory = createMemorySessionStorageFactory;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/errors.js
var require_errors2 = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/errors.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`);
        this.field = field;
        this.maxBytes = maxBytes;
      }
    };
    exports.MaxPartSizeExceededError = MaxPartSizeExceededError;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/memoryUploadHandler.js
var require_memoryUploadHandler = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/upload/memoryUploadHandler.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var errors = require_errors2();
    function createMemoryUploadHandler({
      filter,
      maxPartSize = 3e6
    } = {}) {
      return async ({
        filename,
        contentType,
        name,
        data
      }) => {
        if (filter && !await filter({
          filename,
          contentType,
          name
        })) {
          return void 0;
        }
        let size = 0;
        let chunks = [];
        for await (let chunk of data) {
          size += chunk.byteLength;
          if (size > maxPartSize) {
            throw new errors.MaxPartSizeExceededError(name, maxPartSize);
          }
          chunks.push(chunk);
        }
        if (typeof filename === "string") {
          return new File(chunks, filename, {
            type: contentType
          });
        }
        return await new Blob(chunks, {
          type: contentType
        }).text();
      };
    }
    exports.createMemoryUploadHandler = createMemoryUploadHandler;
  }
});

// ../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/index.js
var require_dist = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+server-runtime@2.8.1_typescript@5.3.3/node_modules/@remix-run/server-runtime/dist/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cookies = require_cookies();
    var formData = require_formData();
    var responses = require_responses();
    var server = require_server();
    var sessions = require_sessions();
    var cookieStorage = require_cookieStorage();
    var memoryStorage = require_memoryStorage();
    var memoryUploadHandler = require_memoryUploadHandler();
    var errors = require_errors2();
    var dev = require_dev();
    exports.createCookieFactory = cookies.createCookieFactory;
    exports.isCookie = cookies.isCookie;
    exports.unstable_composeUploadHandlers = formData.composeUploadHandlers;
    exports.unstable_parseMultipartFormData = formData.parseMultipartFormData;
    exports.defer = responses.defer;
    exports.json = responses.json;
    exports.redirect = responses.redirect;
    exports.redirectDocument = responses.redirectDocument;
    exports.createRequestHandler = server.createRequestHandler;
    exports.createSession = sessions.createSession;
    exports.createSessionStorageFactory = sessions.createSessionStorageFactory;
    exports.isSession = sessions.isSession;
    exports.createCookieSessionStorageFactory = cookieStorage.createCookieSessionStorageFactory;
    exports.createMemorySessionStorageFactory = memoryStorage.createMemorySessionStorageFactory;
    exports.unstable_createMemoryUploadHandler = memoryUploadHandler.createMemoryUploadHandler;
    exports.MaxPartSizeExceededError = errors.MaxPartSizeExceededError;
    exports.broadcastDevReady = dev.broadcastDevReady;
    exports.logDevReady = dev.logDevReady;
    exports.unstable_setDevServerHooks = dev.setDevServerHooks;
  }
});

// ../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var encoder = new TextEncoder();
    var sign = async (value, secret) => {
      let key = await createKey(secret, ["sign"]);
      let data = encoder.encode(value);
      let signature = await crypto.subtle.sign("HMAC", key, data);
      let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
      return value + "." + hash;
    };
    var unsign = async (signed, secret) => {
      let index = signed.lastIndexOf(".");
      let value = signed.slice(0, index);
      let hash = signed.slice(index + 1);
      let key = await createKey(secret, ["verify"]);
      let data = encoder.encode(value);
      let signature = byteStringToUint8Array(atob(hash));
      let valid = await crypto.subtle.verify("HMAC", key, signature, data);
      return valid ? value : false;
    };
    async function createKey(secret, usages) {
      let key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
      }, false, usages);
      return key;
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        array[i] = byteString.charCodeAt(i);
      }
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  }
});

// ../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require_dist();
    var crypto3 = require_crypto();
    var createCookie = serverRuntime.createCookieFactory({
      sign: crypto3.sign,
      unsign: crypto3.unsign
    });
    var createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie);
    var createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie);
    var createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});

// ../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js
var require_workersKVStorage = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/sessions/workersKVStorage.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var implementations = require_implementations();
    function createWorkersKVSessionStorage({
      cookie,
      kv
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          while (true) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
            if (await kv.get(id, "json")) {
              continue;
            }
            await kv.put(id, JSON.stringify(data), {
              expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
            });
            return id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          if (!session) {
            return null;
          }
          return JSON.parse(session);
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        }
      });
    }
    exports.createWorkersKVSessionStorage = createWorkersKVSessionStorage;
  }
});

// ../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/index.js
var require_dist2 = __commonJS({
  "../../../node_modules/.pnpm/@remix-run+cloudflare@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var workersKVStorage = require_workersKVStorage();
    var implementations = require_implementations();
    var serverRuntime = require_dist();
    exports.createWorkersKVSessionStorage = workersKVStorage.createWorkersKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: true,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "broadcastDevReady", {
      enumerable: true,
      get: function() {
        return serverRuntime.broadcastDevReady;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: true,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "defer", {
      enumerable: true,
      get: function() {
        return serverRuntime.defer;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "logDevReady", {
      enumerable: true,
      get: function() {
        return serverRuntime.logDevReady;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "redirectDocument", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirectDocument;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
  }
});

// ../../../node_modules/.pnpm/@remix-run+cloudflare-pages@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare-pages/dist/esm/worker.js
function createRequestHandler({
  build,
  mode: mode2,
  getLoadContext = ({
    context
  }) => ({
    ...context,
    cloudflare: {
      ...context.cloudflare,
      cf: context.cloudflare.request.cf
    }
  })
}) {
  let handleRequest2 = (0, import_cloudflare.createRequestHandler)(build, mode2);
  return async (cloudflare) => {
    let loadContext = await getLoadContext({
      ...cloudflare,
      // Backcompat, remove in v3
      request: cloudflare.request,
      context: {
        cloudflare: {
          ...cloudflare,
          cf: cloudflare.request.cf,
          ctx: {
            waitUntil: cloudflare.waitUntil,
            passThroughOnException: cloudflare.passThroughOnException
          },
          caches
        }
      }
    });
    return handleRequest2(cloudflare.request, loadContext);
  };
}
function createPagesFunctionHandler({
  build,
  getLoadContext,
  mode: mode2
}) {
  let handleRequest2 = createRequestHandler({
    build,
    getLoadContext,
    mode: mode2
  });
  let handleFetch = async (context) => {
    let response;
    context.request.headers.delete("if-none-match");
    try {
      response = await context.env.ASSETS.fetch(context.request.url, context.request.clone());
      response = response && response.status >= 200 && response.status < 400 ? new Response(response.body, response) : void 0;
    } catch {
    }
    if (!response) {
      response = await handleRequest2(context);
    }
    return response;
  };
  return async (context) => {
    try {
      return await handleFetch(context);
    } catch (error) {
      if (false) {
        console.error(error);
        return new Response(error.message || error.toString(), {
          status: 500
        });
      }
      return new Response("Internal Error", {
        status: 500
      });
    }
  };
}
var import_cloudflare;
var init_worker = __esm({
  "../../../node_modules/.pnpm/@remix-run+cloudflare-pages@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare-pages/dist/esm/worker.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    import_cloudflare = __toESM(require_dist2());
  }
});

// ../../../node_modules/.pnpm/@remix-run+cloudflare-pages@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare-pages/dist/esm/index.js
var init_esm = __esm({
  "../../../node_modules/.pnpm/@remix-run+cloudflare-pages@2.8.1_@cloudflare+workers-types@4.20240405.0_typescript@5.3.3/node_modules/@remix-run/cloudflare-pages/dist/esm/index.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_worker();
  }
});

// ../../../packages/metronome/dist/esm/async-local-storage.js
import { AsyncLocalStorage } from "node:async_hooks";
var asyncLocalStorage;
var init_async_local_storage = __esm({
  "../../../packages/metronome/dist/esm/async-local-storage.js"() {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    asyncLocalStorage = new AsyncLocalStorage();
  }
});

// ../../../node_modules/.pnpm/ua-parser-js@2.0.0-beta.2/node_modules/ua-parser-js/src/main/ua-parser.mjs
function UACHData(uach, isHttpUACH) {
  uach = uach || {};
  setProps.call(this, CH_ALL_VALUES);
  if (isHttpUACH) {
    setProps.call(this, [
      [BRANDS, itemListToArray(uach[CH_HEADER])],
      [FULLVERLIST, itemListToArray(uach[CH_HEADER_FULL_VER_LIST])],
      [MOBILE, /\?1/.test(uach[CH_HEADER_MOBILE])],
      [MODEL, stripQuotes(uach[CH_HEADER_MODEL])],
      [PLATFORM, stripQuotes(uach[CH_HEADER_PLATFORM])],
      [PLATFORMVER, stripQuotes(uach[CH_HEADER_PLATFORM_VER])],
      [ARCHITECTURE, stripQuotes(uach[CH_HEADER_ARCH])],
      [FORMFACTOR, itemListToArray(uach[CH_HEADER_FORM_FACTOR])],
      [BITNESS, stripQuotes(uach[CH_HEADER_BITNESS])]
    ]);
  } else {
    for (var prop in uach) {
      if (this.hasOwnProperty(prop) && typeof uach[prop] !== UNDEF_TYPE)
        this[prop] = uach[prop];
    }
  }
}
function UAItem(itemType, ua, rgxMap, uaCH) {
  this.get = function(prop) {
    if (!prop)
      return this.data;
    return this.data.hasOwnProperty(prop) ? this.data[prop] : void 0;
  };
  this.set = function(prop, val) {
    this.data[prop] = val;
    return this;
  };
  this.setCH = function(ch) {
    this.uaCH = ch;
    return this;
  };
  this.detectFeature = function() {
    if (NAVIGATOR && NAVIGATOR.userAgent == this.ua) {
      switch (this.itemType) {
        case UA_BROWSER:
          if (NAVIGATOR.brave && typeof NAVIGATOR.brave.isBrave == FUNC_TYPE) {
            this.set(NAME, "Brave");
          }
          break;
        case UA_DEVICE:
          if (!this.get(TYPE) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[MOBILE]) {
            this.set(TYPE, MOBILE);
          }
          if (this.get(MODEL) == "Macintosh" && NAVIGATOR && typeof NAVIGATOR.standalone !== UNDEF_TYPE && NAVIGATOR.maxTouchPoints && NAVIGATOR.maxTouchPoints > 2) {
            this.set(MODEL, "iPad").set(TYPE, TABLET);
          }
          break;
        case UA_OS:
          if (!this.get(NAME) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[PLATFORM]) {
            this.set(NAME, NAVIGATOR_UADATA[PLATFORM]);
          }
          break;
        case UA_RESULT:
          var data = this.data;
          var detect = function(itemType2) {
            return data[itemType2].getItem().detectFeature().get();
          };
          this.set(UA_BROWSER, detect(UA_BROWSER)).set(UA_CPU, detect(UA_CPU)).set(UA_DEVICE, detect(UA_DEVICE)).set(UA_ENGINE, detect(UA_ENGINE)).set(UA_OS, detect(UA_OS));
      }
    }
    return this;
  };
  this.parseUA = function() {
    if (this.itemType != UA_RESULT) {
      rgxMapper.call(this.data, this.ua, this.rgxMap);
    }
    if (this.itemType == UA_BROWSER) {
      this.set(MAJOR, majorize(this.get(VERSION)));
    }
    return this;
  };
  this.parseCH = function() {
    var uaCH2 = this.uaCH, rgxMap2 = this.rgxMap;
    switch (this.itemType) {
      case UA_BROWSER:
        var brands = uaCH2[FULLVERLIST] || uaCH2[BRANDS], prevName;
        if (brands) {
          for (var i in brands) {
            var brandName = strip(/(Google|Microsoft) /, brands[i].brand || brands[i]), brandVersion = brands[i].version;
            if (!/not.a.brand/i.test(brandName) && (!prevName || /chrom/i.test(prevName) && !/chromi/i.test(brandName))) {
              this.set(NAME, brandName).set(VERSION, brandVersion).set(MAJOR, majorize(brandVersion));
              prevName = brandName;
            }
          }
        }
        break;
      case UA_CPU:
        var archName = uaCH2[ARCHITECTURE];
        if (archName) {
          if (archName && uaCH2[BITNESS] == "64")
            archName += "64";
          rgxMapper.call(this.data, archName + ";", rgxMap2);
        }
        break;
      case UA_DEVICE:
        if (uaCH2[MOBILE]) {
          this.set(TYPE, MOBILE);
        }
        if (uaCH2[MODEL]) {
          this.set(MODEL, uaCH2[MODEL]);
        }
        if (uaCH2[MODEL] == "Xbox") {
          this.set(TYPE, CONSOLE).set(VENDOR, MICROSOFT);
        }
        if (uaCH2[FORMFACTOR]) {
          var ff;
          if (typeof uaCH2[FORMFACTOR] !== "string") {
            var idx = 0;
            while (!ff && idx < uaCH2[FORMFACTOR].length) {
              ff = strMapper(uaCH2[FORMFACTOR][idx++], formFactorMap);
            }
          } else {
            ff = strMapper(uaCH2[FORMFACTOR], formFactorMap);
          }
          this.set(TYPE, ff);
        }
        break;
      case UA_OS:
        var osName = uaCH2[PLATFORM];
        if (osName) {
          var osVersion = uaCH2[PLATFORMVER];
          if (osName == WINDOWS)
            osVersion = parseInt(majorize(osVersion), 10) >= 13 ? "11" : "10";
          this.set(NAME, osName).set(VERSION, osVersion);
        }
        if (this.get(NAME) == WINDOWS && uaCH2[MODEL] == "Xbox") {
          this.set(NAME, "Xbox").set(VERSION, void 0);
        }
        break;
      case UA_RESULT:
        var data = this.data;
        var parse2 = function(itemType2) {
          return data[itemType2].getItem().setCH(uaCH2).parseCH().get();
        };
        this.set(UA_BROWSER, parse2(UA_BROWSER)).set(UA_CPU, parse2(UA_CPU)).set(UA_DEVICE, parse2(UA_DEVICE)).set(UA_ENGINE, parse2(UA_ENGINE)).set(UA_OS, parse2(UA_OS));
    }
    return this;
  };
  setProps.call(this, [
    ["itemType", itemType],
    ["ua", ua],
    ["uaCH", uaCH],
    ["rgxMap", rgxMap],
    ["data", createIData(this, itemType)]
  ]);
  return this;
}
function UAParser(ua, extensions, headers) {
  if (typeof ua === OBJ_TYPE) {
    if (isExtensions(ua)) {
      if (typeof extensions === OBJ_TYPE) {
        headers = extensions;
      }
      extensions = ua;
    } else {
      headers = ua;
      extensions = void 0;
    }
    ua = void 0;
  } else if (typeof ua === STR_TYPE && !isExtensions(extensions)) {
    headers = extensions;
    extensions = void 0;
  }
  if (!(this instanceof UAParser)) {
    return new UAParser(ua, extensions, headers).getResult();
  }
  var userAgent = typeof ua === STR_TYPE ? ua : (
    // Passed user-agent string
    NAVIGATOR && NAVIGATOR.userAgent ? NAVIGATOR.userAgent : (
      // navigator.userAgent
      headers && headers[USER_AGENT] ? headers[USER_AGENT] : (
        // User-Agent from passed headers
        EMPTY
      )
    )
  ), httpUACH = new UACHData(headers, true), regexMap = extensions ? extend(defaultRegexes, extensions) : defaultRegexes, createItemFunc = function(itemType) {
    if (itemType == UA_RESULT) {
      return function() {
        return new UAItem(itemType, userAgent, regexMap, httpUACH).set("ua", userAgent).set(UA_BROWSER, this.getBrowser()).set(UA_CPU, this.getCPU()).set(UA_DEVICE, this.getDevice()).set(UA_ENGINE, this.getEngine()).set(UA_OS, this.getOS()).get();
      };
    } else {
      return function() {
        return new UAItem(itemType, userAgent, regexMap[itemType], httpUACH).parseUA().get();
      };
    }
  };
  setProps.call(this, [
    ["getBrowser", createItemFunc(UA_BROWSER)],
    ["getCPU", createItemFunc(UA_CPU)],
    ["getDevice", createItemFunc(UA_DEVICE)],
    ["getEngine", createItemFunc(UA_ENGINE)],
    ["getOS", createItemFunc(UA_OS)],
    ["getResult", createItemFunc(UA_RESULT)],
    ["getUA", function() {
      return userAgent;
    }],
    ["setUA", function(ua2) {
      if (isString(ua2))
        userAgent = ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
      return this;
    }]
  ]).setUA(userAgent);
  return this;
}
var LIBVERSION, EMPTY, UNKNOWN, FUNC_TYPE, UNDEF_TYPE, OBJ_TYPE, STR_TYPE, MAJOR, MODEL, NAME, TYPE, VENDOR, VERSION, ARCHITECTURE, CONSOLE, MOBILE, TABLET, SMARTTV, WEARABLE, EMBEDDED, USER_AGENT, UA_MAX_LENGTH, BRANDS, FORMFACTOR, FULLVERLIST, PLATFORM, PLATFORMVER, BITNESS, CH_HEADER, CH_HEADER_FULL_VER_LIST, CH_HEADER_ARCH, CH_HEADER_BITNESS, CH_HEADER_FORM_FACTOR, CH_HEADER_MOBILE, CH_HEADER_MODEL, CH_HEADER_PLATFORM, CH_HEADER_PLATFORM_VER, CH_ALL_VALUES, UA_BROWSER, UA_CPU, UA_DEVICE, UA_ENGINE, UA_OS, UA_RESULT, AMAZON, APPLE, ASUS, BLACKBERRY, GOOGLE, HUAWEI, LENOVO, LG, MICROSOFT, MOTOROLA, SAMSUNG, SHARP, SONY, XIAOMI, ZEBRA, PREFIX_MOBILE, SUFFIX_BROWSER, CHROME, EDGE, FIREFOX, OPERA, FACEBOOK, SOGOU, WINDOWS, isWindow, NAVIGATOR, NAVIGATOR_UADATA, extend, enumerize, has, isExtensions, isString, itemListToArray, lowerize, majorize, setProps, strip, stripQuotes, trim, rgxMapper, strMapper, windowsVersionMap, formFactorMap, defaultRegexes, defaultProps, createIData;
var init_ua_parser = __esm({
  "../../../node_modules/.pnpm/ua-parser-js@2.0.0-beta.2/node_modules/ua-parser-js/src/main/ua-parser.mjs"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    LIBVERSION = "2.0.0-beta.2";
    EMPTY = "";
    UNKNOWN = "?";
    FUNC_TYPE = "function";
    UNDEF_TYPE = "undefined";
    OBJ_TYPE = "object";
    STR_TYPE = "string";
    MAJOR = "major";
    MODEL = "model";
    NAME = "name";
    TYPE = "type";
    VENDOR = "vendor";
    VERSION = "version";
    ARCHITECTURE = "architecture";
    CONSOLE = "console";
    MOBILE = "mobile";
    TABLET = "tablet";
    SMARTTV = "smarttv";
    WEARABLE = "wearable";
    EMBEDDED = "embedded";
    USER_AGENT = "user-agent";
    UA_MAX_LENGTH = 500;
    BRANDS = "brands";
    FORMFACTOR = "formFactor";
    FULLVERLIST = "fullVersionList";
    PLATFORM = "platform";
    PLATFORMVER = "platformVersion";
    BITNESS = "bitness";
    CH_HEADER = "sec-ch-ua";
    CH_HEADER_FULL_VER_LIST = CH_HEADER + "-full-version-list";
    CH_HEADER_ARCH = CH_HEADER + "-arch";
    CH_HEADER_BITNESS = CH_HEADER + "-" + BITNESS;
    CH_HEADER_FORM_FACTOR = CH_HEADER + "-form-factor";
    CH_HEADER_MOBILE = CH_HEADER + "-" + MOBILE;
    CH_HEADER_MODEL = CH_HEADER + "-" + MODEL;
    CH_HEADER_PLATFORM = CH_HEADER + "-" + PLATFORM;
    CH_HEADER_PLATFORM_VER = CH_HEADER_PLATFORM + "-version";
    CH_ALL_VALUES = [BRANDS, FULLVERLIST, MOBILE, MODEL, PLATFORM, PLATFORMVER, ARCHITECTURE, FORMFACTOR, BITNESS];
    UA_BROWSER = "browser";
    UA_CPU = "cpu";
    UA_DEVICE = "device";
    UA_ENGINE = "engine";
    UA_OS = "os";
    UA_RESULT = "result";
    AMAZON = "Amazon";
    APPLE = "Apple";
    ASUS = "ASUS";
    BLACKBERRY = "BlackBerry";
    GOOGLE = "Google";
    HUAWEI = "Huawei";
    LENOVO = "Lenovo";
    LG = "LG";
    MICROSOFT = "Microsoft";
    MOTOROLA = "Motorola";
    SAMSUNG = "Samsung";
    SHARP = "Sharp";
    SONY = "Sony";
    XIAOMI = "Xiaomi";
    ZEBRA = "Zebra";
    PREFIX_MOBILE = "Mobile ";
    SUFFIX_BROWSER = " Browser";
    CHROME = "Chrome";
    EDGE = "Edge";
    FIREFOX = "Firefox";
    OPERA = "Opera";
    FACEBOOK = "Facebook";
    SOGOU = "Sogou";
    WINDOWS = "Windows";
    isWindow = typeof window !== UNDEF_TYPE;
    NAVIGATOR = isWindow && window.navigator ? window.navigator : void 0;
    NAVIGATOR_UADATA = NAVIGATOR && NAVIGATOR.userAgentData ? NAVIGATOR.userAgentData : void 0;
    extend = function(regexes, extensions) {
      var mergedRegexes = {};
      for (var i in regexes) {
        mergedRegexes[i] = extensions[i] && extensions[i].length % 2 === 0 ? extensions[i].concat(regexes[i]) : regexes[i];
      }
      return mergedRegexes;
    };
    enumerize = function(arr) {
      var enums = {};
      for (var i = 0; i < arr.length; i++) {
        enums[arr[i].toUpperCase()] = arr[i];
      }
      return enums;
    };
    has = function(str1, str2) {
      if (typeof str1 === OBJ_TYPE && str1.length > 0) {
        for (var i in str1) {
          if (lowerize(str1[i]) == lowerize(str2))
            return true;
        }
        return false;
      }
      return isString(str1) ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
    };
    isExtensions = function(obj) {
      for (var prop in obj) {
        return /^(browser|cpu|device|engine|os)$/.test(prop);
      }
    };
    isString = function(val) {
      return typeof val === STR_TYPE;
    };
    itemListToArray = function(header) {
      if (!header)
        return void 0;
      var arr = [];
      var tokens = strip(/\\?\"/g, header).split(",");
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].indexOf(";") > -1) {
          var token = trim(tokens[i]).split(";v=");
          arr[i] = { brand: token[0], version: token[1] };
        } else {
          arr[i] = trim(tokens[i]);
        }
      }
      return arr;
    };
    lowerize = function(str) {
      return isString(str) ? str.toLowerCase() : str;
    };
    majorize = function(version) {
      return isString(version) ? strip(/[^\d\.]/g, version).split(".")[0] : void 0;
    };
    setProps = function(arr) {
      for (var i in arr) {
        var propName = arr[i];
        if (typeof propName == OBJ_TYPE && propName.length == 2) {
          this[propName[0]] = propName[1];
        } else {
          this[propName] = void 0;
        }
      }
      return this;
    };
    strip = function(pattern, str) {
      return isString(str) ? str.replace(pattern, EMPTY) : str;
    };
    stripQuotes = function(str) {
      return strip(/\\?\"/g, str);
    };
    trim = function(str, len) {
      if (isString(str)) {
        str = strip(/^\s\s*/, str);
        return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
      }
    };
    rgxMapper = function(ua, arrays) {
      if (!ua || !arrays)
        return;
      var i = 0, j, k, p, q, matches, match3;
      while (i < arrays.length && !matches) {
        var regex = arrays[i], props = arrays[i + 1];
        j = k = 0;
        while (j < regex.length && !matches) {
          if (!regex[j]) {
            break;
          }
          matches = regex[j++].exec(ua);
          if (!!matches) {
            for (p = 0; p < props.length; p++) {
              match3 = matches[++k];
              q = props[p];
              if (typeof q === OBJ_TYPE && q.length > 0) {
                if (q.length === 2) {
                  if (typeof q[1] == FUNC_TYPE) {
                    this[q[0]] = q[1].call(this, match3);
                  } else {
                    this[q[0]] = q[1];
                  }
                } else if (q.length === 3) {
                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                    this[q[0]] = match3 ? q[1].call(this, match3, q[2]) : void 0;
                  } else {
                    this[q[0]] = match3 ? match3.replace(q[1], q[2]) : void 0;
                  }
                } else if (q.length === 4) {
                  this[q[0]] = match3 ? q[3].call(this, match3.replace(q[1], q[2])) : void 0;
                }
              } else {
                this[q] = match3 ? match3 : void 0;
              }
            }
          }
        }
        i += 2;
      }
    };
    strMapper = function(str, map) {
      for (var i in map) {
        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
          for (var j = 0; j < map[i].length; j++) {
            if (has(map[i][j], str)) {
              return i === UNKNOWN ? void 0 : i;
            }
          }
        } else if (has(map[i], str)) {
          return i === UNKNOWN ? void 0 : i;
        }
      }
      return map.hasOwnProperty("*") ? map["*"] : str;
    };
    windowsVersionMap = {
      "ME": "4.90",
      "NT 3.11": "NT3.51",
      "NT 4.0": "NT4.0",
      "2000": "NT 5.0",
      "XP": ["NT 5.1", "NT 5.2"],
      "Vista": "NT 6.0",
      "7": "NT 6.1",
      "8": "NT 6.2",
      "8.1": "NT 6.3",
      "10": ["NT 6.4", "NT 10.0"],
      "RT": "ARM"
    };
    formFactorMap = {
      "embedded": "Automotive",
      "mobile": "Mobile",
      "tablet": ["Tablet", "EInk"],
      "smarttv": "TV",
      "wearable": ["VR", "XR", "Watch"],
      "?": ["Desktop", "Unknown"],
      "*": void 0
    };
    defaultRegexes = {
      browser: [
        [
          // Most common regardless engine
          /\b(?:crmo|crios)\/([\w\.]+)/i
          // Chrome for Android/iOS
        ],
        [VERSION, [NAME, PREFIX_MOBILE + "Chrome"]],
        [
          /edg(?:e|ios|a)?\/([\w\.]+)/i
          // Microsoft Edge
        ],
        [VERSION, [NAME, "Edge"]],
        [
          // Presto based
          /(opera mini)\/([-\w\.]+)/i,
          // Opera Mini
          /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
          // Opera Mobi/Tablet
          /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          // Opera
        ],
        [NAME, VERSION],
        [
          /opios[\/ ]+([\w\.]+)/i
          // Opera mini on iphone >= 8.0
        ],
        [VERSION, [NAME, OPERA + " Mini"]],
        [
          /\bop(?:rg)?x\/([\w\.]+)/i
          // Opera GX
        ],
        [VERSION, [NAME, OPERA + " GX"]],
        [
          /\bopr\/([\w\.]+)/i
          // Opera Webkit
        ],
        [VERSION, [NAME, OPERA]],
        [
          // Mixed
          /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
          // Baidu
        ],
        [VERSION, [NAME, "Baidu"]],
        [
          /(kindle)\/([\w\.]+)/i,
          // Kindle
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
          // Lunascape/Maxthon/Netfront/Jasmine/Blazer
          // Trident based
          /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
          // Avant/IEMobile/SlimBrowser
          /(?:ms|\()(ie) ([\w\.]+)/i,
          // Internet Explorer
          // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
          /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
          // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo
          /(heytap|ovi)browser\/([\d\.]+)/i,
          // HeyTap/Ovi
          /(weibo)__([\d\.]+)/i
          // Weibo
        ],
        [NAME, VERSION],
        [
          /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          // UCBrowser
        ],
        [VERSION, [NAME, "UCBrowser"]],
        [
          /microm.+\bqbcore\/([\w\.]+)/i,
          // WeChat Desktop for Windows Built-in Browser
          /\bqbcore\/([\w\.]+).+microm/i,
          /micromessenger\/([\w\.]+)/i
          // WeChat
        ],
        [VERSION, [NAME, "WeChat"]],
        [
          /konqueror\/([\w\.]+)/i
          // Konqueror
        ],
        [VERSION, [NAME, "Konqueror"]],
        [
          /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          // IE11
        ],
        [VERSION, [NAME, "IE"]],
        [
          /ya(?:search)?browser\/([\w\.]+)/i
          // Yandex
        ],
        [VERSION, [NAME, "Yandex"]],
        [
          /slbrowser\/([\w\.]+)/i
          // Smart Lenovo Browser
        ],
        [VERSION, [NAME, "Smart " + LENOVO + SUFFIX_BROWSER]],
        [
          /(avast|avg)\/([\w\.]+)/i
          // Avast/AVG Secure Browser
        ],
        [[NAME, /(.+)/, "$1 Secure" + SUFFIX_BROWSER], VERSION],
        [
          /\bfocus\/([\w\.]+)/i
          // Firefox Focus
        ],
        [VERSION, [NAME, FIREFOX + " Focus"]],
        [
          /\bopt\/([\w\.]+)/i
          // Opera Touch
        ],
        [VERSION, [NAME, OPERA + " Touch"]],
        [
          /coc_coc\w+\/([\w\.]+)/i
          // Coc Coc Browser
        ],
        [VERSION, [NAME, "Coc Coc"]],
        [
          /dolfin\/([\w\.]+)/i
          // Dolphin
        ],
        [VERSION, [NAME, "Dolphin"]],
        [
          /coast\/([\w\.]+)/i
          // Opera Coast
        ],
        [VERSION, [NAME, OPERA + " Coast"]],
        [
          /miuibrowser\/([\w\.]+)/i
          // MIUI Browser
        ],
        [VERSION, [NAME, "MIUI" + SUFFIX_BROWSER]],
        [
          /fxios\/([\w\.-]+)/i
          // Firefox for iOS
        ],
        [VERSION, [NAME, PREFIX_MOBILE + FIREFOX]],
        [
          /\bqihu|(qi?ho?o?|360)browser/i
          // 360
        ],
        [[NAME, "360" + SUFFIX_BROWSER]],
        [
          /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
        ],
        [[NAME, /(.+)/, "$1" + SUFFIX_BROWSER], VERSION],
        [
          // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
          /samsungbrowser\/([\w\.]+)/i
          // Samsung Internet
        ],
        [VERSION, [NAME, SAMSUNG + " Internet"]],
        [
          /(comodo_dragon)\/([\w\.]+)/i
          // Comodo Dragon
        ],
        [[NAME, /_/g, " "], VERSION],
        [
          /metasr[\/ ]?([\d\.]+)/i
          // Sogou Explorer
        ],
        [VERSION, [NAME, SOGOU + " Explorer"]],
        [
          /(sogou)mo\w+\/([\d\.]+)/i
          // Sogou Mobile
        ],
        [[NAME, SOGOU + " Mobile"], VERSION],
        [
          /(electron)\/([\w\.]+) safari/i,
          // Electron-based App
          /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
          // Tesla
          /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i
          // QQBrowser/2345 Browser
        ],
        [NAME, VERSION],
        [
          /(lbbrowser)/i,
          // LieBao Browser
          /\[(linkedin)app\]/i
          // LinkedIn App for iOS & Android
        ],
        [NAME],
        [
          // WebView
          /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          // Facebook App for iOS & Android
        ],
        [[NAME, FACEBOOK], VERSION],
        [
          /(Klarna)\/([\w\.]+)/i,
          // Klarna Shopping Browser for iOS & Android
          /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
          // Kakao App
          /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
          // Naver InApp
          /safari (line)\/([\w\.]+)/i,
          // Line App for iOS
          /\b(line)\/([\w\.]+)\/iab/i,
          // Line App for Android
          /(alipay)client\/([\w\.]+)/i,
          // Alipay
          /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
          // Chromium/Instagram/Snapchat
        ],
        [NAME, VERSION],
        [
          /\bgsa\/([\w\.]+) .*safari\//i
          // Google Search Appliance on iOS
        ],
        [VERSION, [NAME, "GSA"]],
        [
          /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
          // TikTok
        ],
        [VERSION, [NAME, "TikTok"]],
        [
          /headlesschrome(?:\/([\w\.]+)| )/i
          // Chrome Headless
        ],
        [VERSION, [NAME, CHROME + " Headless"]],
        [
          / wv\).+(chrome)\/([\w\.]+)/i
          // Chrome WebView
        ],
        [[NAME, CHROME + " WebView"], VERSION],
        [
          /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          // Android Browser
        ],
        [VERSION, [NAME, "Android" + SUFFIX_BROWSER]],
        [
          /chrome\/([\w\.]+) mobile/i
          // Chrome Mobile
        ],
        [VERSION, [NAME, PREFIX_MOBILE + "Chrome"]],
        [
          /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          // Chrome/OmniWeb/Arora/Tizen/Nokia
        ],
        [NAME, VERSION],
        [
          /version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i
          // Safari Mobile
        ],
        [VERSION, [NAME, PREFIX_MOBILE + "Safari"]],
        [
          /iphone .*mobile(?:\/\w+ | ?)safari/i
        ],
        [[NAME, PREFIX_MOBILE + "Safari"]],
        [
          /version\/([\w\.\,]+) .*(safari)/i
          // Safari
        ],
        [VERSION, NAME],
        [
          /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          // Safari < 3.0
        ],
        [NAME, [VERSION, "1"]],
        [
          /(webkit|khtml)\/([\w\.]+)/i
        ],
        [NAME, VERSION],
        [
          // Gecko based
          /(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i
          // Firefox Mobile
        ],
        [[NAME, PREFIX_MOBILE + FIREFOX], VERSION],
        [
          /(navigator|netscape\d?)\/([-\w\.]+)/i
          // Netscape
        ],
        [[NAME, "Netscape"], VERSION],
        [
          /mobile vr; rv:([\w\.]+)\).+firefox/i
          // Firefox Reality
        ],
        [VERSION, [NAME, FIREFOX + " Reality"]],
        [
          /ekiohf.+(flow)\/([\w\.]+)/i,
          // Flow
          /(swiftfox)/i,
          // Swiftfox
          /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
          // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
          /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
          // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
          /(firefox)\/([\w\.]+)/i,
          // Other Firefox-based
          /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
          // Mozilla
          // Other
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
          // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
          /(links) \(([\w\.]+)/i,
          // Links
          /panasonic;(viera)/i
          // Panasonic Viera
        ],
        [NAME, VERSION],
        [
          /(cobalt)\/([\w\.]+)/i
          // Cobalt
        ],
        [NAME, [VERSION, /[^\d\.]+./, EMPTY]]
      ],
      cpu: [
        [
          /\b(?:(amd|x|x86[-_]?|wow|win)64)\b/i
          // AMD64 (x64)
        ],
        [[ARCHITECTURE, "amd64"]],
        [
          /(ia32(?=;))/i,
          // IA32 (quicktime)
          /((?:i[346]|x)86)[;\)]/i
          // IA32 (x86)
        ],
        [[ARCHITECTURE, "ia32"]],
        [
          /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          // ARM64
        ],
        [[ARCHITECTURE, "arm64"]],
        [
          /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          // ARMHF
        ],
        [[ARCHITECTURE, "armhf"]],
        [
          // PocketPC mistakenly identified as PowerPC
          /windows (ce|mobile); ppc;/i
        ],
        [[ARCHITECTURE, "arm"]],
        [
          /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          // PowerPC
        ],
        [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
        [
          /(sun4\w)[;\)]/i
          // SPARC
        ],
        [[ARCHITECTURE, "sparc"]],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
          // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
        ],
        [[ARCHITECTURE, lowerize]]
      ],
      device: [
        [
          //////////////////////////
          // MOBILES & TABLETS
          /////////////////////////
          // Samsung
          /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
        ],
        [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
        [
          /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
          /samsung[- ]([-\w]+)/i,
          /sec-(sgh\w+)/i
        ],
        [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
        [
          // Apple
          /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
          // iPod/iPhone
        ],
        [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
        [
          /\((ipad);[-\w\),; ]+apple/i,
          // iPad
          /applecoremedia\/[\w\.]+ \((ipad)/i,
          /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
        ],
        [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
        [
          /(macintosh);/i
        ],
        [MODEL, [VENDOR, APPLE]],
        [
          // Sharp
          /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
        ],
        [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
        [
          // Huawei
          /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
        ],
        [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
        [
          /(?:huawei|honor)([-\w ]+)[;\)]/i,
          /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
        ],
        [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
        [
          // Xiaomi
          /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
          // Xiaomi POCO
          /\b; (\w+) build\/hm\1/i,
          // Xiaomi Hongmi 'numeric' models
          /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
          // Xiaomi Hongmi
          /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
          // Xiaomi Redmi
          /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
          // Xiaomi Redmi 'numeric' models
          /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          // Xiaomi Mi
        ],
        [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
        [
          /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
          // Redmi Pad
          /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          // Mi Pad tablets
        ],
        [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
        [
          // OPPO
          /; (\w+) bui.+ oppo/i,
          /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
        ],
        [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
        [
          // Vivo
          /vivo (\w+)(?: bui|\))/i,
          /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
        ],
        [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
        [
          // Realme
          /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
        ],
        [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
        [
          // Motorola
          /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
          /\bmot(?:orola)?[- ](\w*)/i,
          /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
        ],
        [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
        [
          /\b(mz60\d|xoom[2 ]{0,2}) build\//i
        ],
        [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
        [
          // LG
          /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
        ],
        [MODEL, [VENDOR, LG], [TYPE, TABLET]],
        [
          /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
          /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
          /\blg-?([\d\w]+) bui/i
        ],
        [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
        [
          // Lenovo
          /(ideatab[-\w ]+)/i,
          /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
        ],
        [MODEL, [VENDOR, LENOVO], [TYPE, TABLET]],
        [
          // Nokia
          /(?:maemo|nokia).*(n900|lumia \d+)/i,
          /nokia[-_ ]?([-\w\.]*)/i
        ],
        [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
        [
          // Google
          /(pixel c)\b/i
          // Google Pixel C
        ],
        [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
        [
          /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          // Google Pixel
        ],
        [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
        [
          // Sony
          /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
        ],
        [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
        [
          /sony tablet [ps]/i,
          /\b(?:sony)?sgp\w+(?: bui|\))/i
        ],
        [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
        [
          // OnePlus
          / (kb2005|in20[12]5|be20[12][59])\b/i,
          /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
        ],
        [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
        [
          // Amazon
          /(alexa)webm/i,
          /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
          // Kindle Fire without Silk / Echo Show
          /(kf[a-z]+)( bui|\)).+silk\//i
          // Kindle Fire HD
        ],
        [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
        [
          /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          // Fire Phone
        ],
        [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
        [
          // BlackBerry
          /(playbook);[-\w\),; ]+(rim)/i
          // BlackBerry PlayBook
        ],
        [MODEL, VENDOR, [TYPE, TABLET]],
        [
          /\b((?:bb[a-f]|st[hv])100-\d)/i,
          /\(bb10; (\w+)/i
          // BlackBerry 10
        ],
        [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
        [
          // Asus
          /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
        ],
        [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
        [
          / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
        ],
        [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
        [
          // HTC
          /(nexus 9)/i
          // HTC Nexus 9
        ],
        [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
        [
          /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
          // HTC
          // ZTE
          /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
          /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
          // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
        ],
        [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
        [
          // Acer
          /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
        ],
        [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
        [
          // Meizu
          /droid.+; (m[1-5] note) bui/i,
          /\bmz-([-\w]{2,})/i
        ],
        [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
        [
          // Ulefone
          /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
        ],
        [MODEL, [VENDOR, "Ulefone"], [TYPE, MOBILE]],
        [
          // MIXED
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
          // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
          /(hp) ([\w ]+\w)/i,
          // HP iPAQ
          /(asus)-?(\w+)/i,
          // Asus
          /(microsoft); (lumia[\w ]+)/i,
          // Microsoft Lumia
          /(lenovo)[-_ ]?([-\w]+)/i,
          // Lenovo
          /(jolla)/i,
          // Jolla
          /(oppo) ?([\w ]+) bui/i
          // OPPO
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /(kobo)\s(ereader|touch)/i,
          // Kobo
          /(archos) (gamepad2?)/i,
          // Archos
          /(hp).+(touchpad(?!.+tablet)|tablet)/i,
          // HP TouchPad
          /(kindle)\/([\w\.]+)/i
          // Kindle
        ],
        [VENDOR, MODEL, [TYPE, TABLET]],
        [
          /(surface duo)/i
          // Surface Duo
        ],
        [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
        [
          /droid [\d\.]+; (fp\du?)(?: b|\))/i
          // Fairphone
        ],
        [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
        [
          /(shield[\w ]+) b/i
          // Nvidia Shield Tablets
        ],
        [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
        [
          /(sprint) (\w+)/i
          // Sprint Phones
        ],
        [VENDOR, MODEL, [TYPE, MOBILE]],
        [
          /(kin\.[onetw]{3})/i
          // Microsoft Kin
        ],
        [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
        [
          /droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          // Zebra
        ],
        [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
        [
          /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
        ],
        [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
        [
          ///////////////////
          // SMARTTVS
          ///////////////////
          /smart-tv.+(samsung)/i
          // Samsung
        ],
        [VENDOR, [TYPE, SMARTTV]],
        [
          /hbbtv.+maple;(\d+)/i
        ],
        [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
        [
          /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          // LG SmartTV
        ],
        [[VENDOR, LG], [TYPE, SMARTTV]],
        [
          /(apple) ?tv/i
          // Apple TV
        ],
        [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
        [
          /crkey/i
          // Google Chromecast
        ],
        [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
        [
          /droid.+aft(\w+)( bui|\))/i
          // Fire TV
        ],
        [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
        [
          /\(dtv[\);].+(aquos)/i,
          /(aquos-tv[\w ]+)\)/i
          // Sharp
        ],
        [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
        [
          /(bravia[\w ]+)( bui|\))/i
          // Sony
        ],
        [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
        [
          /(mitv-\w{5}) bui/i
          // Xiaomi
        ],
        [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
        [
          /Hbbtv.*(technisat) (.*);/i
          // TechniSAT
        ],
        [VENDOR, MODEL, [TYPE, SMARTTV]],
        [
          /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
          // Roku
          /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
          // HbbTV devices
        ],
        [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
        [
          /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          // SmartTV from Unidentified Vendors
        ],
        [[TYPE, SMARTTV]],
        [
          ///////////////////
          // CONSOLES
          ///////////////////
          /(ouya)/i,
          // Ouya
          /(nintendo) (\w+)/i
          // Nintendo
        ],
        [VENDOR, MODEL, [TYPE, CONSOLE]],
        [
          /droid.+; (shield) bui/i
          // Nvidia
        ],
        [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
        [
          /(playstation \w+)/i
          // Playstation
        ],
        [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
        [
          /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          // Microsoft Xbox
        ],
        [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
        [
          ///////////////////
          // WEARABLES
          ///////////////////
          /((pebble))app/i
          // Pebble
        ],
        [VENDOR, MODEL, [TYPE, WEARABLE]],
        [
          /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
          // Apple Watch
        ],
        [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
        [
          /droid.+; (glass) \d/i
          // Google Glass
        ],
        [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
        [
          /droid.+; (wt63?0{2,3})\)/i
        ],
        [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
        [
          /(quest( 2| pro)?)/i
          // Oculus Quest
        ],
        [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
        [
          ///////////////////
          // EMBEDDED
          ///////////////////
          /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          // Tesla
        ],
        [VENDOR, [TYPE, EMBEDDED]],
        [
          /(aeobc)\b/i
          // Echo Dot
        ],
        [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
        [
          ////////////////////
          // MIXED (GENERIC)
          ///////////////////
          /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
          // Android Phones from Unidentified Vendors
        ],
        [MODEL, [TYPE, MOBILE]],
        [
          /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          // Android Tablets from Unidentified Vendors
        ],
        [MODEL, [TYPE, TABLET]],
        [
          /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          // Unidentifiable Tablet
        ],
        [[TYPE, TABLET]],
        [
          /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
          // Unidentifiable Mobile
        ],
        [[TYPE, MOBILE]],
        [
          /(android[-\w\. ]{0,9});.+buil/i
          // Generic Android Device
        ],
        [MODEL, [VENDOR, "Generic"]]
      ],
      engine: [
        [
          /windows.+ edge\/([\w\.]+)/i
          // EdgeHTML
        ],
        [VERSION, [NAME, EDGE + "HTML"]],
        [
          /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          // Blink
        ],
        [VERSION, [NAME, "Blink"]],
        [
          /(presto)\/([\w\.]+)/i,
          // Presto
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
          /ekioh(flow)\/([\w\.]+)/i,
          // Flow
          /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
          // KHTML/Tasman/Links
          /(icab)[\/ ]([23]\.[\d\.]+)/i,
          // iCab
          /\b(libweb)/i
        ],
        [NAME, VERSION],
        [
          /rv\:([\w\.]{1,9})\b.+(gecko)/i
          // Gecko
        ],
        [VERSION, NAME]
      ],
      os: [
        [
          // Windows
          /microsoft (windows) (vista|xp)/i
          // Windows (iTunes)
        ],
        [NAME, VERSION],
        [
          /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i
          // Windows Phone
        ],
        [NAME, [VERSION, strMapper, windowsVersionMap]],
        [
          /windows nt 6\.2; (arm)/i,
          // Windows RT
          /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
          /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
        ],
        [[VERSION, strMapper, windowsVersionMap], [NAME, WINDOWS]],
        [
          // iOS/macOS
          /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
          // iOS
          /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
          /cfnetwork\/.+darwin/i
        ],
        [[VERSION, /_/g, "."], [NAME, "iOS"]],
        [
          /(mac os x) ?([\w\. ]*)/i,
          /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          // Mac OS
        ],
        [[NAME, "macOS"], [VERSION, /_/g, "."]],
        [
          // Mobile OSes
          /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
          // Android-x86/HarmonyOS
        ],
        [VERSION, NAME],
        [
          // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
          /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
          /(blackberry)\w*\/([\w\.]*)/i,
          // Blackberry
          /(tizen|kaios)[\/ ]([\w\.]+)/i,
          // Tizen/KaiOS
          /\((series40);/i
          // Series 40
        ],
        [NAME, VERSION],
        [
          /\(bb(10);/i
          // BlackBerry 10
        ],
        [VERSION, [NAME, BLACKBERRY]],
        [
          /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          // Symbian
        ],
        [VERSION, [NAME, "Symbian"]],
        [
          /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          // Firefox OS
        ],
        [VERSION, [NAME, FIREFOX + " OS"]],
        [
          /web0s;.+rt(tv)/i,
          /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          // WebOS
        ],
        [VERSION, [NAME, "webOS"]],
        [
          /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
          // watchOS
        ],
        [VERSION, [NAME, "watchOS"]],
        [
          // Google Chromecast
          /crkey\/([\d\.]+)/i
          // Google Chromecast
        ],
        [VERSION, [NAME, CHROME + "cast"]],
        [
          /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
          // Chromium OS
        ],
        [[NAME, "Chrome OS"], VERSION],
        [
          // Smart TVs
          /panasonic;(viera)/i,
          // Panasonic Viera
          /(netrange)mmh/i,
          // Netrange
          /(nettv)\/(\d+\.[\w\.]+)/i,
          // NetTV
          // Console
          /(nintendo|playstation) (\w+)/i,
          // Nintendo/Playstation
          /(xbox); +xbox ([^\);]+)/i,
          // Microsoft Xbox (360, One, X, S, Series X, Series S)
          // Other
          /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
          // Joli/Palm
          /(mint)[\/\(\) ]?(\w*)/i,
          // Mint
          /(mageia|vectorlinux)[; ]/i,
          // Mageia/VectorLinux
          /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
          // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
          /(hurd|linux) ?([\w\.]*)/i,
          // Hurd/Linux
          /(gnu) ?([\w\.]*)/i,
          // GNU
          /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
          // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
          /(haiku) (\w+)/i
          // Haiku
        ],
        [NAME, VERSION],
        [
          /(sunos) ?([\w\.\d]*)/i
          // Solaris
        ],
        [[NAME, "Solaris"], VERSION],
        [
          /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
          // Solaris
          /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
          // AIX
          /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
          // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
          /(unix) ?([\w\.]*)/i
          // UNIX
        ],
        [NAME, VERSION]
      ]
    };
    defaultProps = function() {
      var props = { init: {}, isIgnore: {}, isIgnoreRgx: {}, toString: {} };
      setProps.call(props.init, [
        [UA_BROWSER, [NAME, VERSION, MAJOR]],
        [UA_CPU, [ARCHITECTURE]],
        [UA_DEVICE, [TYPE, MODEL, VENDOR]],
        [UA_ENGINE, [NAME, VERSION]],
        [UA_OS, [NAME, VERSION]]
      ]);
      setProps.call(props.isIgnore, [
        [UA_BROWSER, [VERSION, MAJOR]],
        [UA_ENGINE, [VERSION]],
        [UA_OS, [VERSION]]
      ]);
      setProps.call(props.isIgnoreRgx, [
        [UA_BROWSER, / ?browser$/i],
        [UA_OS, / ?os$/i]
      ]);
      setProps.call(props.toString, [
        [UA_BROWSER, [NAME, VERSION]],
        [UA_CPU, [ARCHITECTURE]],
        [UA_DEVICE, [VENDOR, MODEL]],
        [UA_ENGINE, [NAME, VERSION]],
        [UA_OS, [NAME, VERSION]]
      ]);
      return props;
    }();
    createIData = function(item, itemType) {
      var init_props = defaultProps.init[itemType], is_ignoreProps = defaultProps.isIgnore[itemType] || 0, is_ignoreRgx = defaultProps.isIgnoreRgx[itemType] || 0, toString_props = defaultProps.toString[itemType] || 0;
      function IData() {
        setProps.call(this, init_props);
      }
      IData.prototype.getItem = function() {
        return item;
      };
      IData.prototype.withClientHints = function() {
        if (!NAVIGATOR_UADATA) {
          return item.parseCH().get();
        }
        return NAVIGATOR_UADATA.getHighEntropyValues(CH_ALL_VALUES).then(function(res) {
          return item.setCH(new UACHData(res, false)).parseCH().get();
        });
      };
      IData.prototype.withFeatureCheck = function() {
        return item.detectFeature().get();
      };
      if (itemType != UA_RESULT) {
        IData.prototype.is = function(strToCheck) {
          var is = false;
          for (var i in this) {
            if (this.hasOwnProperty(i) && !has(is_ignoreProps, i) && lowerize(is_ignoreRgx ? strip(is_ignoreRgx, this[i]) : this[i]) == lowerize(is_ignoreRgx ? strip(is_ignoreRgx, strToCheck) : strToCheck)) {
              is = true;
              if (strToCheck != UNDEF_TYPE)
                break;
            } else if (strToCheck == UNDEF_TYPE && is) {
              is = !is;
              break;
            }
          }
          return is;
        };
        IData.prototype.toString = function() {
          var str = EMPTY;
          for (var i in toString_props) {
            if (typeof this[toString_props[i]] !== UNDEF_TYPE) {
              str += (str ? " " : EMPTY) + this[toString_props[i]];
            }
          }
          return str || UNDEF_TYPE;
        };
      }
      if (!NAVIGATOR_UADATA) {
        IData.prototype.then = function(cb) {
          var that = this;
          var IDataResolve = function() {
            for (var prop in that) {
              if (that.hasOwnProperty(prop)) {
                this[prop] = that[prop];
              }
            }
          };
          IDataResolve.prototype = {
            is: IData.prototype.is,
            toString: IData.prototype.toString
          };
          var resolveData = new IDataResolve();
          cb(resolveData);
          return resolveData;
        };
      }
      return new IData();
    };
    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);
  }
});

// ../../../node_modules/.pnpm/zod@3.22.4/node_modules/zod/lib/index.mjs
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var util, objectUtil, ZodParsedType, getParsedType, ZodIssueCode, quotelessJson, ZodError, errorMap, overrideErrorMap, makeIssue, EMPTY_PATH, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, errorUtil, ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv6Regex, datetimeRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, ZodReadonly, custom, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce2, NEVER, z;
var init_lib = __esm({
  "../../../node_modules/.pnpm/zod@3.22.4/node_modules/zod/lib/index.mjs"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = (obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    };
    ZodError = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
    errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    };
    overrideErrorMap = errorMap;
    makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    EMPTY_PATH = [];
    ParseStatus = class {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (this._key instanceof Array) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    ZodType = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this, this._def);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[a-z][a-z0-9]*$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
    ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    datetimeRegex = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    ZodString = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(
            ctx2,
            {
              code: ZodIssueCode.invalid_type,
              expected: ZodParsedType.string,
              received: ctx2.parsedType
            }
            //
          );
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
      }
      datetime(options) {
        var _a;
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
          offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
          ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options === null || options === void 0 ? void 0 : options.position,
          ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      /**
       * @deprecated Use z.string().min(1) instead.
       * @see {@link ZodString.min}
       */
      nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
      }
      trim() {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      var _a;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind2, value, inclusive, message) {
        return new ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind: kind2,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind2, value, inclusive, message) {
        return new ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind: kind2,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodBigInt.create = (params) => {
      var _a;
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = class extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip")
            ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              syncPairs.push({
                key,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index) {
        return new ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key) => {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key) => {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else {
        return null;
      }
    };
    ZodDiscriminatedUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values) {
        return ZodEnum.create(values);
      }
      exclude(values) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.issues.length) {
            return {
              status: "dirty",
              value: ctx.data
            };
          }
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return base;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return base;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        if (isValid(result)) {
          result.value = Object.freeze(result.value);
        }
        return result;
      }
    };
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    custom = (check, params = {}, fatal) => {
      if (check)
        return ZodAny.create().superRefine((data, ctx) => {
          var _a, _b;
          if (!check(data)) {
            const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
            const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
            const p2 = typeof p === "string" ? { message: p } : p;
            ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
          }
        });
      return ZodAny.create();
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = () => stringType().optional();
    onumber = () => numberType().optional();
    oboolean = () => booleanType().optional();
    coerce2 = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
    z = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      defaultErrorMap: errorMap,
      setErrorMap,
      getErrorMap,
      makeIssue,
      EMPTY_PATH,
      addIssueToContext,
      ParseStatus,
      INVALID,
      DIRTY,
      OK,
      isAborted,
      isDirty,
      isValid,
      isAsync,
      get util() {
        return util;
      },
      get objectUtil() {
        return objectUtil;
      },
      ZodParsedType,
      getParsedType,
      ZodType,
      ZodString,
      ZodNumber,
      ZodBigInt,
      ZodBoolean,
      ZodDate,
      ZodSymbol,
      ZodUndefined,
      ZodNull,
      ZodAny,
      ZodUnknown,
      ZodNever,
      ZodVoid,
      ZodArray,
      ZodObject,
      ZodUnion,
      ZodDiscriminatedUnion,
      ZodIntersection,
      ZodTuple,
      ZodRecord,
      ZodMap,
      ZodSet,
      ZodFunction,
      ZodLazy,
      ZodLiteral,
      ZodEnum,
      ZodNativeEnum,
      ZodPromise,
      ZodEffects,
      ZodTransformer: ZodEffects,
      ZodOptional,
      ZodNullable,
      ZodDefault,
      ZodCatch,
      ZodNaN,
      BRAND,
      ZodBranded,
      ZodPipeline,
      ZodReadonly,
      custom,
      Schema: ZodType,
      ZodSchema: ZodType,
      late,
      get ZodFirstPartyTypeKind() {
        return ZodFirstPartyTypeKind;
      },
      coerce: coerce2,
      any: anyType,
      array: arrayType,
      bigint: bigIntType,
      boolean: booleanType,
      date: dateType,
      discriminatedUnion: discriminatedUnionType,
      effect: effectsType,
      "enum": enumType,
      "function": functionType,
      "instanceof": instanceOfType,
      intersection: intersectionType,
      lazy: lazyType,
      literal: literalType,
      map: mapType,
      nan: nanType,
      nativeEnum: nativeEnumType,
      never: neverType,
      "null": nullType,
      nullable: nullableType,
      number: numberType,
      object: objectType,
      oboolean,
      onumber,
      optional: optionalType,
      ostring,
      pipeline: pipelineType,
      preprocess: preprocessType,
      promise: promiseType,
      record: recordType,
      set: setType,
      strictObject: strictObjectType,
      string: stringType,
      symbol: symbolType,
      transformer: effectsType,
      tuple: tupleType,
      "undefined": undefinedType,
      union: unionType,
      unknown: unknownType,
      "void": voidType,
      NEVER,
      ZodIssueCode,
      quotelessJson,
      ZodError
    });
  }
});

// ../../../node_modules/.pnpm/path-to-regexp@6.2.1/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
var init_dist = __esm({
  "../../../node_modules/.pnpm/path-to-regexp@6.2.1/node_modules/path-to-regexp/dist.es2015/index.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
  }
});

// ../../../packages/metronome/dist/esm/server.js
import crypto2 from "node:crypto";
function isExpressRequest(request) {
  return typeof request.originalUrl !== "undefined";
}
function getIp(request) {
  let ipAddress = headerNames.flatMap((headerName) => {
    let value;
    if (isExpressRequest(request)) {
      value = request.headers[headerName];
    } else {
      value = request.headers.get(headerName);
    }
    if (headerName === "Forwarded") {
      return parseForwardedHeader(typeof value === "string" ? value : null);
    }
    if (!value)
      return;
    if (typeof value === "string" && !value.includes(",")) {
      return value;
    }
    return typeof value === "string" ? value.split(",").map((ip) => ip.trim()) : value;
  }).find((ip) => {
    if (ip === null || typeof ip === "undefined")
      return false;
    return isIp(ip);
  });
  return ipAddress ?? null;
}
function parseForwardedHeader(value) {
  if (!value)
    return null;
  for (let part of value.split(";")) {
    if (part.startsWith("for="))
      return part.slice(4);
    continue;
  }
  return null;
}
function generateRandomBytesHex(length) {
  return crypto2.randomBytes(length).toString("hex").toLowerCase();
}
function tracer() {
  if (!tracerInstance) {
    throw new Error("Tracer not initialized");
  }
  return tracerInstance;
}
function startInstrumentation(config) {
  if (tracerInstance)
    return;
  tracerInstance = new Tracer({
    spanExporter: new SpanExporter(config),
    metricExporter: new MetricExporter(config)
  });
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isDeferredData(value) {
  return value && typeof value === "object" && typeof value.data === "object" && typeof value.unlistenAbortSignal === "function" && typeof value.controller === "object" && typeof value.abortPromise === "object" && typeof Array.isArray(value.valueKeys) && value.subscribers instanceof Set && value.pendingKeysSet instanceof Set;
}
function match2(input, target) {
  if (typeof input === "string") {
    return input === target;
  } else {
    return input.test(target);
  }
}
async function getClientAttributes(headers) {
  const keyValueHeaders = Object.fromEntries(headers.entries());
  const result = await UAParser(keyValueHeaders).withClientHints();
  return {
    [
      "browser.name"
      /* BrowserName */
    ]: result.browser.name ?? "",
    [
      "browser.version"
      /* BrowserVersion */
    ]: result.browser.version ?? "",
    [
      "browser.major"
      /* BrowserMajor */
    ]: result.browser.major ?? "",
    [
      "device.model"
      /* DeviceModel */
    ]: result.device.model ?? "",
    [
      "device.vendor"
      /* DeviceVendor */
    ]: result.device.vendor ?? "",
    [
      "engine.name"
      /* EngineName */
    ]: result.engine.name ?? "",
    [
      "engine.version"
      /* EngineVersion */
    ]: result.engine.version ?? "",
    [
      "os.name"
      /* OsName */
    ]: result.os.name ?? "",
    [
      "os.version"
      /* OsVersion */
    ]: result.os.version ?? ""
  };
}
function getCurrentUtcHour() {
  const now = /* @__PURE__ */ new Date();
  return now.getUTCHours();
}
function deobfuscate(input) {
  if (true)
    return JSON.parse(input);
  function rotateArray(arr, n) {
    const prevIndex = n - 1 < 0 ? arr.length - 1 : n - 1;
    const nextPart = arr.slice(n + 1).concat(arr.slice(0, prevIndex));
    return [arr[n], arr[prevIndex]].concat(nextPart);
  }
  const possibleShifts = rotateArray(
    Array.from(Array(24), (_, i) => i),
    getCurrentUtcHour()
  );
  for (const shift of possibleShifts) {
    const attempt = input.split("").map((char) => String.fromCharCode(char.charCodeAt(0) - shift)).join("");
    try {
      return JSON.parse(attempt);
    } catch (e) {
    }
  }
  return void 0;
}
function toRegexpRouteMap(routeMap) {
  if (regexpRouteMap)
    return regexpRouteMap;
  const entries = Object.entries(routeMap);
  regexpRouteMap = Object.fromEntries(
    entries.map(([key, value]) => {
      let route = value;
      let paths = [];
      const visited = /* @__PURE__ */ new Set();
      while (route) {
        paths = [route.path || "", ...paths];
        if (!route.parentId || visited.has(route.parentId))
          break;
        visited.add(route.parentId);
        route = routeMap[route.parentId];
      }
      const regexp = pathToRegexp(paths.join("/").replace(/\*/g, ":splat*"));
      return [
        key,
        {
          ...value,
          path: paths.join("/"),
          regexp
        }
      ];
    })
  );
  return regexpRouteMap;
}
function getRemixAttributes({
  routeMap,
  path,
  version
}) {
  const found = Object.values(toRegexpRouteMap(routeMap)).find(({ regexp, id }) => {
    if (id === "root")
      return false;
    return regexp.test(path);
  });
  if (!found)
    return {
      [
        "app.version"
        /* AppVersion */
      ]: version,
      [
        "remix.route_id"
        /* RemixRouteId */
      ]: "<unknown>",
      [
        "remix.route_path"
        /* RemixRoutePath */
      ]: "<unknown>"
    };
  return {
    [
      "remix.route_id"
      /* RemixRouteId */
    ]: found.id,
    [
      "remix.route_path"
      /* RemixRoutePath */
    ]: found.path ?? "<unknown>",
    [
      "app.version"
      /* AppVersion */
    ]: version
  };
}
function loader() {
  return new Response(METRONOME_WEB_VITALS, {
    headers: {
      "content-type": "application/javascript; charset=UTF-8",
      "cache-control": "public, max-age=31536000, immutable"
    }
  });
}
function registerMetronome(routes3, config) {
  if (!config.apiKey) {
    console.warn("Metronome: apiKey is required to enable Metronome");
    return routes3;
  }
  const routeMap = {};
  for (const [routeId, route] of Object.entries(routes3)) {
    routeMap[routeId] = {
      id: routeId,
      parentId: route.parentId,
      path: route.path
    };
    const newRoute = { ...route, module: { ...route.module } };
    const wrapperOptions = {
      routeId,
      routePath: route.path,
      config
    };
    if (route.module.action) {
      newRoute.module.action = wrapRemixFunction(route.module.action, {
        type: "action",
        ...wrapperOptions
      });
    }
    if (route.module.loader) {
      newRoute.module.loader = wrapRemixFunction(route.module.loader, {
        type: "loader",
        ...wrapperOptions
      });
    }
    routes3[routeId] = newRoute;
  }
  const baseUrl = "__metronome";
  routes3[baseUrl] = {
    id: baseUrl,
    parentId: void 0,
    path: baseUrl,
    index: void 0,
    caseSensitive: void 0,
    module: createClientReportRouteModule({ routeMap, config })
  };
  routes3[`${baseUrl}/web-vitals.$version`] = {
    id: `${baseUrl}/web-vitals.$version`,
    parentId: void 0,
    path: `${baseUrl}/web-vitals/:version`,
    index: void 0,
    caseSensitive: void 0,
    module: webVitalsModule_exports
  };
  return routes3;
}
var __defProp2, __export2, METRONOME_VERSION, METRONOME_WEB_VITALS, METRONOME_METRICS_VERSION, headerNames, isIp, Metric, Exporter, MetricExporter, SpanEvent, kind, Span, SpanExporter, tracerInstance, Tracer, wrapRemixFunction, regexpRouteMap, BrowserAttributesSchema, WebVitalSchema, PageviewSchema, ClientErrorSchema, createClientReportRouteModule, webVitalsModule_exports, webVitalsModule_default;
var init_server = __esm({
  "../../../packages/metronome/dist/esm/server.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_async_local_storage();
    init_async_local_storage();
    init_ua_parser();
    init_lib();
    init_dist();
    init_lib();
    __defProp2 = Object.defineProperty;
    __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    METRONOME_VERSION = "8.3.0";
    METRONOME_WEB_VITALS = 'var webVitals=function(e){"use strict";var n,t,r,i,o,a=-1,c=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n))}),!0)},u=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},s=function(){var e=u();return e&&e.activationStart||0},f=function(e,n){var t=u(),r="navigate";a>=0?r="back-forward-cache":t&&(document.prerendering||s()>0?r="prerender":document.wasDiscarded?r="restore":t.type&&(r=t.type.replace(/_/g,"-")));return{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},d=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries())}))}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},l=function(e,n,t,r){var i,o;return function(a){n.value>=0&&(a||r)&&((o=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=o,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n))}},v=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}))},p=function(e){var n=function(n){"pagehide"!==n.type&&"hidden"!==document.visibilityState||e(n)};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},m=function(e){var n=!1;return function(t){n||(e(t),n=!0)}},h=-1,g=function(){return"hidden"!==document.visibilityState||document.prerendering?1/0:0},T=function(e){"hidden"===document.visibilityState&&h>-1&&(h="visibilitychange"===e.type?e.timeStamp:0,E())},y=function(){addEventListener("visibilitychange",T,!0),addEventListener("prerenderingchange",T,!0)},E=function(){removeEventListener("visibilitychange",T,!0),removeEventListener("prerenderingchange",T,!0)},C=function(){return h<0&&(h=g(),y(),c((function(){setTimeout((function(){h=g(),y()}),0)}))),{get firstHiddenTime(){return h}}},L=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e()},w=[1800,3e3],S=function(e,n){n=n||{},L((function(){var t,r=C(),i=f("FCP"),o=d("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(o.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-s(),0),i.entries.push(e),t(!0)))}))}));o&&(t=l(e,i,w,n.reportAllChanges),c((function(r){i=f("FCP"),t=l(e,i,w,n.reportAllChanges),v((function(){i.value=performance.now()-r.timeStamp,t(!0)}))})))}))},b=[.1,.25],P=function(e,n){n=n||{},S(m((function(){var t,r=f("CLS",0),i=0,o=[],a=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=o[0],t=o[o.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,o.push(e)):(i=e.value,o=[e])}})),i>r.value&&(r.value=i,r.entries=o,t())},u=d("layout-shift",a);u&&(t=l(e,r,b,n.reportAllChanges),p((function(){a(u.takeRecords()),t(!0)})),c((function(){i=0,r=f("CLS",0),t=l(e,r,b,n.reportAllChanges),v((function(){return t()}))})),setTimeout(t,0))})))},I={passive:!0,capture:!0},F=new Date,A=function(e,i){n||(n=i,t=e,r=new Date,k(removeEventListener),D())},D=function(){if(t>=0&&t<r-F){var e={entryType:"first-input",name:n.type,target:n.target,cancelable:n.cancelable,startTime:n.timeStamp,processingStart:n.timeStamp+t};i.forEach((function(n){n(e)})),i=[]}},M=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){A(e,n),i()},r=function(){i()},i=function(){removeEventListener("pointerup",t,I),removeEventListener("pointercancel",r,I)};addEventListener("pointerup",t,I),addEventListener("pointercancel",r,I)}(n,e):A(n,e)}},k=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,M,I)}))},B=[100,300],x=function(e,r){r=r||{},L((function(){var o,a=C(),u=f("FID"),s=function(e){e.startTime<a.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),o(!0))},v=function(e){e.forEach(s)},h=d("first-input",v);o=l(e,u,B,r.reportAllChanges),h&&p(m((function(){v(h.takeRecords()),h.disconnect()}))),h&&c((function(){var a;u=f("FID"),o=l(e,u,B,r.reportAllChanges),i=[],t=-1,n=null,k(addEventListener),a=s,i.push(a),D()}))}))},N=0,R=1/0,H=0,O=function(e){e.forEach((function(e){e.interactionId&&(R=Math.min(R,e.interactionId),H=Math.max(H,e.interactionId),N=H?(H-R)/7+1:0)}))},q=function(){return o?N:performance.interactionCount||0},j=function(){"interactionCount"in performance||o||(o=d("event",O,{type:"event",buffered:!0,durationThreshold:0}))},V=[200,500],_=0,z=function(){return q()-_},G=[],J={},K=function(e){var n=G[G.length-1],t=J[e.interactionId];if(t||G.length<10||e.duration>n.latency){if(t)t.entries.push(e),t.latency=Math.max(t.latency,e.duration);else{var r={id:e.interactionId,latency:e.duration,entries:[e]};J[r.id]=r,G.push(r)}G.sort((function(e,n){return n.latency-e.latency})),G.splice(10).forEach((function(e){delete J[e.id]}))}},Q=function(e,n){n=n||{},L((function(){var t;j();var r,i=f("INP"),o=function(e){e.forEach((function(e){(e.interactionId&&K(e),"first-input"===e.entryType)&&(!G.some((function(n){return n.entries.some((function(n){return e.duration===n.duration&&e.startTime===n.startTime}))}))&&K(e))}));var n,t=(n=Math.min(G.length-1,Math.floor(z()/50)),G[n]);t&&t.latency!==i.value&&(i.value=t.latency,i.entries=t.entries,r())},a=d("event",o,{durationThreshold:null!==(t=n.durationThreshold)&&void 0!==t?t:40});r=l(e,i,V,n.reportAllChanges),a&&("PerformanceEventTiming"in window&&"interactionId"in PerformanceEventTiming.prototype&&a.observe({type:"first-input",buffered:!0}),p((function(){o(a.takeRecords()),i.value<0&&z()>0&&(i.value=0,i.entries=[]),r(!0)})),c((function(){G=[],_=q(),i=f("INP"),r=l(e,i,V,n.reportAllChanges)})))}))},U=[2500,4e3],W={},X=function(e,n){n=n||{},L((function(){var t,r=C(),i=f("LCP"),o=function(e){var n=e[e.length-1];n&&n.startTime<r.firstHiddenTime&&(i.value=Math.max(n.startTime-s(),0),i.entries=[n],t())},a=d("largest-contentful-paint",o);if(a){t=l(e,i,U,n.reportAllChanges);var u=m((function(){W[i.id]||(o(a.takeRecords()),a.disconnect(),W[i.id]=!0,t(!0))}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return setTimeout(u,0)}),!0)})),p(u),c((function(r){i=f("LCP"),t=l(e,i,U,n.reportAllChanges),v((function(){i.value=performance.now()-r.timeStamp,W[i.id]=!0,t(!0)}))}))}}))},Y=[800,1800],Z=function e(n){document.prerendering?L((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0)},$=function(e,n){n=n||{};var t=f("TTFB"),r=l(e,t,Y,n.reportAllChanges);Z((function(){var i=u();if(i){var o=i.responseStart;if(o<=0||o>performance.now())return;t.value=Math.max(o-s(),0),t.entries=[i],r(!0),c((function(){t=f("TTFB",0),(r=l(e,t,Y,n.reportAllChanges))(!0)}))}}))};return e.CLSThresholds=b,e.FCPThresholds=w,e.FIDThresholds=B,e.INPThresholds=V,e.LCPThresholds=U,e.TTFBThresholds=Y,e.getCLS=P,e.getFCP=S,e.getFID=x,e.getINP=Q,e.getLCP=X,e.getTTFB=$,e.onCLS=P,e.onFCP=S,e.onFID=x,e.onINP=Q,e.onLCP=X,e.onTTFB=$,e}({});\n';
    METRONOME_METRICS_VERSION = "v5";
    headerNames = [
      "X-Client-IP",
      "X-Forwarded-For",
      "HTTP-X-Forwarded-For",
      "Fly-Client-IP",
      "CF-Connecting-IP",
      "Fastly-Client-Ip",
      "True-Client-Ip",
      "X-Real-IP",
      "X-Cluster-Client-IP",
      "X-Forwarded",
      "Forwarded-For",
      "Forwarded",
      "DO-Connecting-IP",
      "oxygen-buyer-ip"
    ];
    isIp = (input) => {
      const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,7}:|(?:[A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,5}(?::[A-Fa-f0-9]{1,4}){1,2}|(?:[A-Fa-f0-9]{1,4}:){1,4}(?::[A-Fa-f0-9]{1,4}){1,3}|(?:[A-Fa-f0-9]{1,4}:){1,3}(?::[A-Fa-f0-9]{1,4}){1,4}|(?:[A-Fa-f0-9]{1,4}:){1,2}(?::[A-Fa-f0-9]{1,4}){1,5}|[A-Fa-f0-9]{1,4}:(?:(?::[A-Fa-f0-9]{1,4}){1,6})|:(?:(?::[A-Fa-f0-9]{1,4}){1,7}|:)|fe80:(?::[A-Fa-f0-9]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[A-Fa-f0-9]{1,4}:){1,4}:(?:(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
      return ipRegex.test(input);
    };
    Metric = class {
      constructor(name, options) {
        this.name = name;
        this.unit = "";
        this.type = "counter";
        this.attributes = {};
        this.value = 0;
        this.onRecordCallbacks = [];
        this.isDisposed = false;
        this.id = options?.id ?? generateRandomBytesHex(8);
        this.unit = options?.unit ?? "";
        this.type = options?.type ?? "counter";
        this.attributes = options?.attributes ?? {};
        this.timestamp = Date.now();
      }
      record(value, attributes) {
        if (this.isDisposed) {
          throw new Error("Metric is disposed, cannot record.");
        }
        this.value = value;
        this.attributes = { ...this.attributes, ...attributes };
        this.onRecordCallbacks.forEach((handler) => handler(this));
        this.onRecordCallbacks = [];
        return this;
      }
      add(value, attributes) {
        if (this.isDisposed) {
          throw new Error("Metric is disposed, cannot add.");
        }
        this.value += value;
        this.attributes = { ...this.attributes, ...attributes };
        this.onRecordCallbacks.forEach((handler) => handler(this));
        this.onRecordCallbacks = [];
        return this;
      }
      dispose() {
        this.isDisposed = true;
        this.onRecordCallbacks = [];
      }
      addOnRecordListener(callback) {
        this.onRecordCallbacks.push(callback);
      }
      toJSON() {
        return {
          id: this.id,
          type: this.type,
          name: this.name,
          attributes: Object.fromEntries(
            Object.entries(this.attributes).map(([key, value]) => [key, `${value}`])
          ),
          value: this.value,
          unit: this.unit,
          timestamp: this.timestamp
        };
      }
    };
    Exporter = class {
      constructor(config) {
        this.config = config;
        this.exportables = [];
      }
      flush() {
        return Promise.all(this.exportables).then(() => {
          this.exportables = [];
        });
      }
      export(exportable) {
        if (!this.config.apiKey) {
          console.log("Metronome: Cannot export: No API key provided");
          return;
        }
        const url = new URL(this.pathname, this.config.endpoint);
        const data = JSON.stringify([exportable], (_, v) => {
          return typeof v === "bigint" ? v.toString() : v;
        });
        if (this.config.debug)
          console.log(`Metronome: Sending metric data to metronome: 
${data}`);
        const promise = fetch(url, {
          body: data,
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": this.config.apiKey }
        });
        this.exportables.push(promise);
        try {
          promise.catch((error) => {
            if (this.config.debug) {
              console.error(`Metronome: Metric data was not sent to metronome`);
              console.error(error);
            }
          });
        } catch (error) {
          if (this.config.debug) {
            console.error(`Metronome: Metric data was not sent to metronome`);
            console.error(error);
          }
        }
      }
    };
    MetricExporter = class extends Exporter {
      constructor() {
        super(...arguments);
        this.pathname = `telemetry/${METRONOME_METRICS_VERSION}/metrics`;
      }
    };
    SpanEvent = class {
      constructor(name, options) {
        this.name = name;
        this.attributes = {};
        this.timestamp = options?.timestamp ?? Date.now();
        this.attributes = options?.attributes ?? {};
      }
      setAttribute(key, value) {
        this.attributes[key] = value;
      }
      getAttributes() {
        return this.attributes;
      }
      getName() {
        return this.name;
      }
      toJSON() {
        return {
          name: this.name,
          attributes: Object.fromEntries(
            Object.entries(this.attributes).map(([key, value]) => [key, `${value}`])
          ),
          timestamp: this.timestamp
        };
      }
    };
    kind = {
      server: 1,
      client: 2,
      producer: 3,
      consumer: 4,
      internal: 5
    };
    Span = class {
      constructor(name, options) {
        this.name = name;
        this.attributes = {};
        this.events = [];
        this.context = { traceId: "" };
        this.onEndCallbacks = [];
        this.id = generateRandomBytesHex(8);
        this.attributes = options?.attributes ?? {};
        this.startTime = options?.startTime ?? Date.now();
        this.endTime = this.startTime;
        const traceId = options?.context?.traceId ?? generateRandomBytesHex(16);
        this.kind = options?.kind ?? "internal";
        this.context.traceId = traceId;
      }
      setAttribute(key, value) {
        if (value === void 0)
          return;
        this.attributes[key] = value;
      }
      setAttributes(attributes) {
        this.attributes = { ...this.attributes, ...attributes };
      }
      end() {
        this.endTime = Date.now();
        this.onEndCallbacks.forEach((handler) => handler(this));
        this.onEndCallbacks = [];
      }
      addOnEndListener(callback) {
        this.onEndCallbacks.push(callback);
      }
      getContext() {
        return this.context;
      }
      addEvent(name, attributes, timestamp) {
        this.events.push(new SpanEvent(name, { attributes, timestamp }));
      }
      recordException(exception) {
        const event = new SpanEvent("exception");
        if (exception.code) {
          event.setAttribute("exception.code", exception.code);
        }
        if (exception.name) {
          event.setAttribute("exception.type", exception.name);
        }
        if (exception.message) {
          event.setAttribute("exception.message", exception.message);
        }
        if (exception.stack) {
          event.setAttribute("exception.stacktrace", exception.stack);
        }
        this.events.push(event);
      }
      toObject() {
        return {
          id: this.id,
          name: this.name,
          attributes: this.attributes,
          events: this.events,
          context: this.context,
          startTime: this.startTime,
          endTime: this.endTime
        };
      }
      toJSON() {
        return {
          id: this.id,
          name: this.name,
          kind: kind[this.kind],
          // Convert all the attributes to string
          attributes: Object.fromEntries(
            Object.entries(this.attributes).map(([key, value]) => [key, `${value}`])
          ),
          events: this.events,
          context: this.context,
          startTime: this.startTime,
          endTime: this.endTime
        };
      }
    };
    SpanExporter = class extends Exporter {
      constructor() {
        super(...arguments);
        this.pathname = `telemetry/${METRONOME_METRICS_VERSION}/spans`;
      }
    };
    Tracer = class {
      constructor(options) {
        this.spanExporter = options.spanExporter;
        this.metricExporter = options.metricExporter;
      }
      async flush() {
        await Promise.all([this.spanExporter.flush(), this.metricExporter.flush()]);
      }
      startActiveSpan(name, options, callback) {
        const span = new Span(name, {
          attributes: options?.attributes,
          context: { traceId: options?.traceId },
          kind: "server"
        });
        span.addOnEndListener(() => this.exportSpan(span));
        return callback(span);
      }
      startSpan(name, options) {
        const span = new Span(name, options);
        span.addOnEndListener(() => this.exportSpan(span));
        return span;
      }
      createHistogram(name, options) {
        const metric = new Metric(name, {
          type: "histogram",
          ...options ?? {}
        });
        metric.addOnRecordListener(() => this.exportMetric(metric));
        return metric;
      }
      createCounter(name, options) {
        const metric = new Metric(name, { type: "counter", ...options ?? {} });
        metric.addOnRecordListener(() => this.exportMetric(metric));
        return metric;
      }
      exportSpan(span) {
        this.spanExporter.export(span);
      }
      exportMetric(metric) {
        this.metricExporter.export(metric);
      }
    };
    wrapRemixFunction = (remixFunction, options) => {
      const isCloudflare = Object.keys(options.config.remixPackages).some(
        (key) => key.includes("cloudflare")
      );
      startInstrumentation(options.config);
      return async (...args) => {
        const requestStore = asyncLocalStorage.getStore();
        const [{ request, context }] = args;
        const cloudflareWaitUntil = context?.cloudflare?.waitUntil;
        if (isCloudflare && !cloudflareWaitUntil) {
          console.warn(
            "Metronome: cloudflare prop was not found in the context, this route might not be instrumented as waitUntil is not available."
          );
        }
        if (request.method.toLowerCase() === "head")
          return remixFunction(...args);
        const ignoredPathnames = options.config.ignoredPathnames ?? ["/healthcheck"];
        const shouldIgnoreRouteByPathname = ignoredPathnames.some((value) => {
          const { pathname } = new URL(
            request.url,
            `http://${request.headers.get("host") ?? "localhost"}`
          );
          return match2(value, pathname ?? "");
        });
        const ignoredRoutes = options.config.ignoredRoutes ?? [];
        const shouldIgnoreRouteByRouteId = ignoredRoutes.some((value) => match2(value, options.routeId));
        if (shouldIgnoreRouteByPathname || shouldIgnoreRouteByRouteId) {
          if (requestStore) {
            requestStore.doNotTrack = true;
            requestStore.doNotTrackErrors = true;
          }
          return remixFunction(...args);
        }
        const ip = getIp(request) ?? "0.0.0.0";
        const clientAttributes = await getClientAttributes(request.headers);
        const attributes = {
          [
            "http.method"
            /* HttpMethod */
          ]: request.method.toUpperCase(),
          [
            "url.full"
            /* UrlFull */
          ]: request.url,
          [
            "metronome.version"
            /* MetronomeVersion */
          ]: METRONOME_VERSION,
          [
            "app.version"
            /* AppVersion */
          ]: options.config.version ?? "",
          [
            "client.address"
            /* ClientAddress */
          ]: ip,
          [
            "user_agent.original"
            /* UserAgentOriginal */
          ]: request.headers.get("user-agent") ?? "",
          [
            "remix.route_id"
            /* RemixRouteId */
          ]: options.routeId,
          [
            "remix.route_path"
            /* RemixRoutePath */
          ]: options.routePath ?? "",
          [
            "remix.function"
            /* RemixFunction */
          ]: options.type,
          [
            "metronome.adapter"
            /* MetronomeAdapter */
          ]: "vite",
          [
            "http.pathname"
            /* HttpPathname */
          ]: new URL(
            request.url,
            `http://${request.headers.get("host") ?? "localhost"}`
          ).pathname,
          ...options.config.remixPackages,
          ...clientAttributes
        };
        if (requestStore) {
          requestStore.requestResolvedAttributes = {
            "app.version": options.config.version ?? "",
            ...options.config.remixPackages
          };
        }
        return tracer().startActiveSpan(
          options.type,
          { attributes, traceId: requestStore?.traceId },
          async (span) => {
            return asyncLocalStorage.run({ traceId: span.getContext().traceId }, async () => {
              try {
                const result = await remixFunction(...args);
                const remixFunctionStore = asyncLocalStorage.getStore();
                if (requestStore) {
                  requestStore.doNotTrack = remixFunctionStore?.doNotTrack ?? false;
                  requestStore.doNotTrackErrors = remixFunctionStore?.doNotTrackErrors ?? false;
                }
                if (isResponse(result)) {
                  span.setAttribute("http.status_code", result.status);
                } else if (isDeferredData(result)) {
                  span.setAttribute("http.status_code", result.init?.status ?? 200);
                  span.setAttribute("remix.deferred", true);
                } else {
                  span.setAttribute("http.status_code", 200);
                }
                if (!requestStore?.doNotTrack) {
                  span.end();
                  cloudflareWaitUntil?.(tracer().flush());
                }
                return result;
              } catch (throwable) {
                span.setAttribute("app.errored", true);
                if (isResponse(throwable)) {
                  span.setAttribute("http.status_code", throwable.status);
                  span.setAttribute("remix.thrown_response", true);
                  if (throwable.status >= 400) {
                    span.setAttribute("error.type", throwable.status);
                    span.recordException({
                      code: throwable.status,
                      name: throwable.statusText
                    });
                  }
                } else {
                  span.setAttribute("error.type", throwable.name);
                  span.recordException(throwable);
                }
                if (!requestStore?.doNotTrackErrors) {
                  span.end();
                  cloudflareWaitUntil?.(tracer().flush());
                }
                throw throwable;
              }
            });
          }
        );
      };
    };
    BrowserAttributesSchema = z.object({
      pathname: z.string(),
      screen: z.string(),
      referrer: z.string(),
      hostname: z.string(),
      language: z.string(),
      connection: z.string(),
      deviceCategory: z.string(),
      url: z.string()
    });
    WebVitalSchema = z.object({
      name: z.literal("web-vital"),
      timestamp: z.number(),
      metric: z.object({
        id: z.string(),
        name: z.enum(["CLS", "FID", "TTFB", "LCP", "FCP", "INP"]),
        value: z.number(),
        rating: z.enum(["good", "needs-improvement", "poor"]),
        navigationType: z.enum([
          "navigate",
          "reload",
          "back-forward",
          "back-forward-cache",
          "prerender",
          "restore"
        ])
      })
    }).merge(BrowserAttributesSchema);
    PageviewSchema = z.object({
      name: z.literal("pageview"),
      timestamp: z.number()
    }).merge(BrowserAttributesSchema);
    ClientErrorSchema = z.object({
      name: z.literal("client-error"),
      timestamp: z.number(),
      error: z.object({
        name: z.string().optional(),
        message: z.string(),
        stack: z.string(),
        filename: z.string(),
        lineno: z.number(),
        colno: z.number()
      })
    }).merge(BrowserAttributesSchema);
    createClientReportRouteModule = ({
      routeMap,
      config
    }) => {
      const action2 = async ({ request, context }) => {
        startInstrumentation(config);
        const events = deobfuscate(await request.text());
        const ip = getIp(request) ?? "0.0.0.0";
        if (!events) {
          if (config.debug) {
            console.warn("Metronome: couldn't process events");
          }
          return new Response(null, { status: 204 });
        }
        const result = z.array(z.any()).safeParse(events);
        if (!result.success) {
          if (config.debug) {
            console.warn("Metronome: Invalid event(s)", JSON.stringify(events));
          }
          return new Response(null, { status: 204 });
        }
        const clientAttributes = await getClientAttributes(request.headers);
        result.data.forEach((incoming) => {
          const remixAttributes = getRemixAttributes({
            routeMap,
            version: config.version,
            path: incoming.pathname
          });
          const wvResult = WebVitalSchema.safeParse(incoming);
          if (wvResult.success) {
            const { data } = wvResult;
            const metric = tracer().createHistogram(data.metric.name, { id: data.metric.id });
            metric.record(data.metric.value, {
              [
                "web_vital.name"
                /* WebVitalName */
              ]: data.metric.name,
              [
                "web_vital.rating"
                /* WebVitalRating */
              ]: data.metric.rating,
              [
                "web_vital.navigation_type"
                /* WebVitalNavigationType */
              ]: data.metric.navigationType,
              [
                "metronome.version"
                /* MetronomeVersion */
              ]: METRONOME_VERSION,
              [
                "client.address"
                /* ClientAddress */
              ]: ip,
              [
                "user_agent.original"
                /* UserAgentOriginal */
              ]: request.headers.get("user-agent") ?? "",
              [
                "http.pathname"
                /* HttpPathname */
              ]: data.pathname,
              [
                "url.full"
                /* UrlFull */
              ]: data.url,
              [
                "app.hostname"
                /* AppHostname */
              ]: data.hostname,
              [
                "client.referrer"
                /* ClientReferrer */
              ]: data.referrer,
              [
                "client.screen"
                /* ClientScreen */
              ]: data.screen,
              [
                "client.language"
                /* ClientLanguage */
              ]: data.language,
              [
                "client.connection"
                /* ClientConnection */
              ]: data.connection,
              [
                "client.device_category"
                /* ClientDeviceCategory */
              ]: data.deviceCategory,
              ...remixAttributes,
              ...clientAttributes,
              ...config.remixPackages
            }).dispose();
            return;
          }
          const pvResult = PageviewSchema.safeParse(incoming);
          if (pvResult.success) {
            const metric = tracer().createCounter("pageview");
            const url = new URL(pvResult.data.url);
            metric.add(1, {
              [
                "metronome.version"
                /* MetronomeVersion */
              ]: METRONOME_VERSION,
              [
                "client.address"
                /* ClientAddress */
              ]: ip,
              [
                "user_agent.original"
                /* UserAgentOriginal */
              ]: request.headers.get("user-agent") ?? "",
              [
                "url.query"
                /* UrlQuery */
              ]: url.search,
              [
                "client.screen"
                /* ClientScreen */
              ]: pvResult.data.screen,
              [
                "client.referrer"
                /* ClientReferrer */
              ]: pvResult.data.referrer,
              [
                "app.hostname"
                /* AppHostname */
              ]: url.hostname,
              [
                "client.language"
                /* ClientLanguage */
              ]: pvResult.data.language,
              [
                "client.connection"
                /* ClientConnection */
              ]: pvResult.data.connection,
              [
                "client.device_category"
                /* ClientDeviceCategory */
              ]: pvResult.data.deviceCategory,
              [
                "http.pathname"
                /* HttpPathname */
              ]: pvResult.data.pathname,
              ...remixAttributes,
              ...clientAttributes,
              ...config.remixPackages
            }).dispose();
            return;
          }
          const ceResult = ClientErrorSchema.safeParse(incoming);
          if (ceResult.success) {
            const { data } = ceResult;
            const span = tracer().startSpan("client_error", {
              kind: "client",
              attributes: {
                [
                  "metronome.version"
                  /* MetronomeVersion */
                ]: METRONOME_VERSION,
                [
                  "client.address"
                  /* ClientAddress */
                ]: ip,
                [
                  "user_agent.original"
                  /* UserAgentOriginal */
                ]: request.headers.get("user-agent") ?? "",
                ...remixAttributes,
                ...clientAttributes,
                ...config.remixPackages
              }
            });
            span.addEvent(
              "exception",
              {
                [
                  "exception.type"
                  /* ExceptionType */
                ]: data.error.name || "Error",
                [
                  "exception.escaped"
                  /* ExceptionEscaped */
                ]: false,
                [
                  "exception.stacktrace"
                  /* ExceptionStacktrace */
                ]: data.error.stack,
                [
                  "exception.message"
                  /* ExceptionMessage */
                ]: data.error.message,
                [
                  "exception.filename"
                  /* ExceptionFilename */
                ]: data.error.filename,
                [
                  "exception.lineno"
                  /* ExceptionLineno */
                ]: data.error.lineno,
                [
                  "exception.colno"
                  /* ExceptionColno */
                ]: data.error.colno
              },
              data.timestamp
            );
            span.end();
            return;
          }
        });
        return new Response(null, { status: 204 });
      };
      return { action: action2, default: void 0 };
    };
    webVitalsModule_exports = {};
    __export2(webVitalsModule_exports, {
      default: () => webVitalsModule_default,
      loader: () => loader
    });
    webVitalsModule_default = void 0;
  }
});

// ../../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var l = Symbol.for("react.element");
    var n = Symbol.for("react.portal");
    var p = Symbol.for("react.fragment");
    var q = Symbol.for("react.strict_mode");
    var r = Symbol.for("react.profiler");
    var t = Symbol.for("react.provider");
    var u = Symbol.for("react.context");
    var v = Symbol.for("react.forward_ref");
    var w = Symbol.for("react.suspense");
    var x = Symbol.for("react.memo");
    var y = Symbol.for("react.lazy");
    var z2 = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a)
        return null;
      a = z2 && a[z2] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b)
        for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
          J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g)
        c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps)
        for (d in g = a.defaultProps, g)
          void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape2(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape2("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k)
        a = null;
      var h = false;
      if (null === a)
        h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
      if (h)
        return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
      else if (f = A(a), "function" === typeof f)
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k)
        throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a)
        return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status)
            a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status)
            a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status)
        return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a))
        throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f)
        d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = function() {
      throw Error("act(...) is not supported in production builds of React.");
    };
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.2.0";
  }
});

// ../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var require_react = __commonJS({
  "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    if (true) {
      module.exports = require_react_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var f = require_react();
    var k = Symbol.for("react.element");
    var l = Symbol.for("react.fragment");
    var m = Object.prototype.hasOwnProperty;
    var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a)
        m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps)
        for (b in a = c.defaultProps, a)
          void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    exports.Fragment = l;
    exports.jsx = q;
    exports.jsxs = q;
  }
});

// ../../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    if (true) {
      module.exports = require_react_jsx_runtime_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/.pnpm/scheduler@0.23.0/node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS({
  "../../../node_modules/.pnpm/scheduler@0.23.0/node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    function f(a, b) {
      var c = a.length;
      a.push(b);
      a:
        for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b))
            a[d] = b, a[c] = e, c = d;
          else
            break a;
        }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length)
        return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a:
          for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c))
              n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c))
              a[d] = x, a[n] = c, d = n;
            else
              break a;
          }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var l;
    var p;
    var q;
    var r = [];
    var t = [];
    var u = 1;
    var v = null;
    var y = 3;
    var z2 = false;
    var A = false;
    var B = false;
    var D = "function" === typeof setTimeout ? setTimeout : null;
    var E = "function" === typeof clearTimeout ? clearTimeout : null;
    var F = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a) {
      for (var b = h(t); null !== b; ) {
        if (null === b.callback)
          k(t);
        else if (b.startTime <= a)
          k(t), b.sortIndex = b.expirationTime, f(r, b);
        else
          break;
        b = h(t);
      }
    }
    function H(a) {
      B = false;
      G(a);
      if (!A)
        if (null !== h(r))
          A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
    }
    function J(a, b) {
      A = false;
      B && (B = false, E(L), L = -1);
      z2 = true;
      var c = y;
      try {
        G(b);
        for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
          var d = v.callback;
          if ("function" === typeof d) {
            v.callback = null;
            y = v.priorityLevel;
            var e = d(v.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v.callback = e : v === h(r) && k(r);
            G(b);
          } else
            k(r);
          v = h(r);
        }
        if (null !== v)
          var w = true;
        else {
          var m = h(t);
          null !== m && K(H, m.startTime - b);
          w = false;
        }
        return w;
      } finally {
        v = null, y = c, z2 = false;
      }
    }
    var N = false;
    var O = null;
    var L = -1;
    var P = 5;
    var Q = -1;
    function M() {
      return exports.unstable_now() - Q < P ? false : true;
    }
    function R() {
      if (null !== O) {
        var a = exports.unstable_now();
        Q = a;
        var b = true;
        try {
          b = O(true, a);
        } finally {
          b ? S() : (N = false, O = null);
        }
      } else
        N = false;
    }
    var S;
    if ("function" === typeof F)
      S = function() {
        F(R);
      };
    else if ("undefined" !== typeof MessageChannel) {
      T = new MessageChannel(), U = T.port2;
      T.port1.onmessage = R;
      S = function() {
        U.postMessage(null);
      };
    } else
      S = function() {
        D(R, 0);
      };
    var T;
    var U;
    function I(a) {
      O = a;
      N || (N = true, S());
    }
    function K(a, b) {
      L = D(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A || z2 || (A = true, I(J));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r);
    };
    exports.unstable_next = function(a) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y;
      }
      var c = y;
      y = b;
      try {
        return a();
      } finally {
        y = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y;
      y = a;
      try {
        return b();
      } finally {
        y = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z2 || (A = true, I(J)));
      return a;
    };
    exports.unstable_shouldYield = M;
    exports.unstable_wrapCallback = function(a) {
      var b = y;
      return function() {
        var c = y;
        y = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y = c;
        }
      };
    };
  }
});

// ../../../node_modules/.pnpm/scheduler@0.23.0/node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "../../../node_modules/.pnpm/scheduler@0.23.0/node_modules/scheduler/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    if (true) {
      module.exports = require_scheduler_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/cjs/react-dom.production.min.js
var require_react_dom_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var aa = require_react();
    var ca = require_scheduler();
    function p(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var da = /* @__PURE__ */ new Set();
    var ea = {};
    function fa(a, b) {
      ha(a, b);
      ha(a + "Capture", b);
    }
    function ha(a, b) {
      ea[a] = b;
      for (a = 0; a < b.length; a++)
        da.add(b[a]);
    }
    var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
    var ja = Object.prototype.hasOwnProperty;
    var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var la = {};
    var ma = {};
    function oa(a) {
      if (ja.call(ma, a))
        return true;
      if (ja.call(la, a))
        return false;
      if (ka.test(a))
        return ma[a] = true;
      la[a] = true;
      return false;
    }
    function pa(a, b, c, d) {
      if (null !== c && 0 === c.type)
        return false;
      switch (typeof b) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d)
            return false;
          if (null !== c)
            return !c.acceptsBooleans;
          a = a.toLowerCase().slice(0, 5);
          return "data-" !== a && "aria-" !== a;
        default:
          return false;
      }
    }
    function qa(a, b, c, d) {
      if (null === b || "undefined" === typeof b || pa(a, b, c, d))
        return true;
      if (d)
        return false;
      if (null !== c)
        switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
      return false;
    }
    function v(a, b, c, d, e, f, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = e;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = f;
      this.removeEmptyString = g;
    }
    var z2 = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z2[a] = new v(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z2[b] = new v(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z2[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z2[a] = new v(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z2[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z2[a] = new v(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      z2[a] = new v(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z2[a] = new v(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z2[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ra = /[\-:]([a-z])/g;
    function sa(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ra,
        sa
      );
      z2[b] = new v(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ra, sa);
      z2[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ra, sa);
      z2[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z2[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
    });
    z2.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z2[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
    });
    function ta(a, b, c, d) {
      var e = z2.hasOwnProperty(b) ? z2[b] : null;
      if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1])
        qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
    }
    var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var va = Symbol.for("react.element");
    var wa = Symbol.for("react.portal");
    var ya = Symbol.for("react.fragment");
    var za = Symbol.for("react.strict_mode");
    var Aa = Symbol.for("react.profiler");
    var Ba = Symbol.for("react.provider");
    var Ca = Symbol.for("react.context");
    var Da = Symbol.for("react.forward_ref");
    var Ea = Symbol.for("react.suspense");
    var Fa = Symbol.for("react.suspense_list");
    var Ga = Symbol.for("react.memo");
    var Ha = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    Symbol.for("react.debug_trace_mode");
    var Ia = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden");
    Symbol.for("react.cache");
    Symbol.for("react.tracing_marker");
    var Ja = Symbol.iterator;
    function Ka(a) {
      if (null === a || "object" !== typeof a)
        return null;
      a = Ja && a[Ja] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var A = Object.assign;
    var La;
    function Ma(a) {
      if (void 0 === La)
        try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
      return "\n" + La + a;
    }
    var Na = false;
    function Oa(a, b) {
      if (!a || Na)
        return "";
      Na = true;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b)
          if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
        else {
          try {
            throw Error();
          } catch (l) {
            d = l;
          }
          a();
        }
      } catch (l) {
        if (l && d && "string" === typeof l.stack) {
          for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
            h--;
          for (; 1 <= g && 0 <= h; g--, h--)
            if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
        }
      } finally {
        Na = false, Error.prepareStackTrace = c;
      }
      return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
    }
    function Pa(a) {
      switch (a.tag) {
        case 5:
          return Ma(a.type);
        case 16:
          return Ma("Lazy");
        case 13:
          return Ma("Suspense");
        case 19:
          return Ma("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a = Oa(a.type, false), a;
        case 11:
          return a = Oa(a.type.render, false), a;
        case 1:
          return a = Oa(a.type, true), a;
        default:
          return "";
      }
    }
    function Qa(a) {
      if (null == a)
        return null;
      if ("function" === typeof a)
        return a.displayName || a.name || null;
      if ("string" === typeof a)
        return a;
      switch (a) {
        case ya:
          return "Fragment";
        case wa:
          return "Portal";
        case Aa:
          return "Profiler";
        case za:
          return "StrictMode";
        case Ea:
          return "Suspense";
        case Fa:
          return "SuspenseList";
      }
      if ("object" === typeof a)
        switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
      return null;
    }
    function Ra(a) {
      var b = a.type;
      switch (a.tag) {
        case 24:
          return "Cache";
        case 9:
          return (b.displayName || "Context") + ".Consumer";
        case 10:
          return (b._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 5:
          return b;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Qa(b);
        case 8:
          return b === za ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if ("function" === typeof b)
            return b.displayName || b.name || null;
          if ("string" === typeof b)
            return b;
      }
      return null;
    }
    function Sa(a) {
      switch (typeof a) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return a;
        case "object":
          return a;
        default:
          return "";
      }
    }
    function Ta(a) {
      var b = a.type;
      return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
    }
    function Ua(a) {
      var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
      if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
        var e = c.get, f = c.set;
        Object.defineProperty(a, b, { configurable: true, get: function() {
          return e.call(this);
        }, set: function(a2) {
          d = "" + a2;
          f.call(this, a2);
        } });
        Object.defineProperty(a, b, { enumerable: c.enumerable });
        return { getValue: function() {
          return d;
        }, setValue: function(a2) {
          d = "" + a2;
        }, stopTracking: function() {
          a._valueTracker = null;
          delete a[b];
        } };
      }
    }
    function Va(a) {
      a._valueTracker || (a._valueTracker = Ua(a));
    }
    function Wa(a) {
      if (!a)
        return false;
      var b = a._valueTracker;
      if (!b)
        return true;
      var c = b.getValue();
      var d = "";
      a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
      a = d;
      return a !== c ? (b.setValue(a), true) : false;
    }
    function Xa(a) {
      a = a || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof a)
        return null;
      try {
        return a.activeElement || a.body;
      } catch (b) {
        return a.body;
      }
    }
    function Ya(a, b) {
      var c = b.checked;
      return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
    }
    function Za(a, b) {
      var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
      c = Sa(null != b.value ? b.value : c);
      a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
    }
    function ab(a, b) {
      b = b.checked;
      null != b && ta(a, "checked", b, false);
    }
    function bb(a, b) {
      ab(a, b);
      var c = Sa(b.value), d = b.type;
      if (null != c)
        if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c)
            a.value = "" + c;
        } else
          a.value !== "" + c && (a.value = "" + c);
      else if ("submit" === d || "reset" === d) {
        a.removeAttribute("value");
        return;
      }
      b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
      null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
    }
    function db(a, b, c) {
      if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
        var d = b.type;
        if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
          return;
        b = "" + a._wrapperState.initialValue;
        c || b === a.value || (a.value = b);
        a.defaultValue = b;
      }
      c = a.name;
      "" !== c && (a.name = "");
      a.defaultChecked = !!a._wrapperState.initialChecked;
      "" !== c && (a.name = c);
    }
    function cb(a, b, c) {
      if ("number" !== b || Xa(a.ownerDocument) !== a)
        null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
    }
    var eb = Array.isArray;
    function fb(a, b, c, d) {
      a = a.options;
      if (b) {
        b = {};
        for (var e = 0; e < c.length; e++)
          b["$" + c[e]] = true;
        for (c = 0; c < a.length; c++)
          e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
      } else {
        c = "" + Sa(c);
        b = null;
        for (e = 0; e < a.length; e++) {
          if (a[e].value === c) {
            a[e].selected = true;
            d && (a[e].defaultSelected = true);
            return;
          }
          null !== b || a[e].disabled || (b = a[e]);
        }
        null !== b && (b.selected = true);
      }
    }
    function gb(a, b) {
      if (null != b.dangerouslySetInnerHTML)
        throw Error(p(91));
      return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
    }
    function hb(a, b) {
      var c = b.value;
      if (null == c) {
        c = b.children;
        b = b.defaultValue;
        if (null != c) {
          if (null != b)
            throw Error(p(92));
          if (eb(c)) {
            if (1 < c.length)
              throw Error(p(93));
            c = c[0];
          }
          b = c;
        }
        null == b && (b = "");
        c = b;
      }
      a._wrapperState = { initialValue: Sa(c) };
    }
    function ib(a, b) {
      var c = Sa(b.value), d = Sa(b.defaultValue);
      null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
      null != d && (a.defaultValue = "" + d);
    }
    function jb(a) {
      var b = a.textContent;
      b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
    }
    function kb(a) {
      switch (a) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function lb(a, b) {
      return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
    }
    var mb;
    var nb = function(a) {
      return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
        MSApp.execUnsafeLocalFunction(function() {
          return a(b, c, d, e);
        });
      } : a;
    }(function(a, b) {
      if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
        a.innerHTML = b;
      else {
        mb = mb || document.createElement("div");
        mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
        for (b = mb.firstChild; a.firstChild; )
          a.removeChild(a.firstChild);
        for (; b.firstChild; )
          a.appendChild(b.firstChild);
      }
    });
    function ob(a, b) {
      if (b) {
        var c = a.firstChild;
        if (c && c === a.lastChild && 3 === c.nodeType) {
          c.nodeValue = b;
          return;
        }
      }
      a.textContent = b;
    }
    var pb = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var qb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(pb).forEach(function(a) {
      qb.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        pb[b] = pb[a];
      });
    });
    function rb(a, b, c) {
      return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
    }
    function sb(a, b) {
      a = a.style;
      for (var c in b)
        if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
    }
    var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
    function ub(a, b) {
      if (b) {
        if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
          throw Error(p(137, a));
        if (null != b.dangerouslySetInnerHTML) {
          if (null != b.children)
            throw Error(p(60));
          if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML))
            throw Error(p(61));
        }
        if (null != b.style && "object" !== typeof b.style)
          throw Error(p(62));
      }
    }
    function vb(a, b) {
      if (-1 === a.indexOf("-"))
        return "string" === typeof b.is;
      switch (a) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var wb = null;
    function xb(a) {
      a = a.target || a.srcElement || window;
      a.correspondingUseElement && (a = a.correspondingUseElement);
      return 3 === a.nodeType ? a.parentNode : a;
    }
    var yb = null;
    var zb = null;
    var Ab = null;
    function Bb(a) {
      if (a = Cb(a)) {
        if ("function" !== typeof yb)
          throw Error(p(280));
        var b = a.stateNode;
        b && (b = Db(b), yb(a.stateNode, a.type, b));
      }
    }
    function Eb(a) {
      zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
    }
    function Fb() {
      if (zb) {
        var a = zb, b = Ab;
        Ab = zb = null;
        Bb(a);
        if (b)
          for (a = 0; a < b.length; a++)
            Bb(b[a]);
      }
    }
    function Gb(a, b) {
      return a(b);
    }
    function Hb() {
    }
    var Ib = false;
    function Jb(a, b, c) {
      if (Ib)
        return a(b, c);
      Ib = true;
      try {
        return Gb(a, b, c);
      } finally {
        if (Ib = false, null !== zb || null !== Ab)
          Hb(), Fb();
      }
    }
    function Kb(a, b) {
      var c = a.stateNode;
      if (null === c)
        return null;
      var d = Db(c);
      if (null === d)
        return null;
      c = d[b];
      a:
        switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
      if (a)
        return null;
      if (c && "function" !== typeof c)
        throw Error(p(231, b, typeof c));
      return c;
    }
    var Lb = false;
    if (ia)
      try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
    var Mb;
    function Nb(a, b, c, d, e, f, g, h, k) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        b.apply(c, l);
      } catch (m) {
        this.onError(m);
      }
    }
    var Ob = false;
    var Pb = null;
    var Qb = false;
    var Rb = null;
    var Sb = { onError: function(a) {
      Ob = true;
      Pb = a;
    } };
    function Tb(a, b, c, d, e, f, g, h, k) {
      Ob = false;
      Pb = null;
      Nb.apply(Sb, arguments);
    }
    function Ub(a, b, c, d, e, f, g, h, k) {
      Tb.apply(this, arguments);
      if (Ob) {
        if (Ob) {
          var l = Pb;
          Ob = false;
          Pb = null;
        } else
          throw Error(p(198));
        Qb || (Qb = true, Rb = l);
      }
    }
    function Vb(a) {
      var b = a, c = a;
      if (a.alternate)
        for (; b.return; )
          b = b.return;
      else {
        a = b;
        do
          b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
        while (a);
      }
      return 3 === b.tag ? c : null;
    }
    function Wb(a) {
      if (13 === a.tag) {
        var b = a.memoizedState;
        null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
        if (null !== b)
          return b.dehydrated;
      }
      return null;
    }
    function Xb(a) {
      if (Vb(a) !== a)
        throw Error(p(188));
    }
    function Yb(a) {
      var b = a.alternate;
      if (!b) {
        b = Vb(a);
        if (null === b)
          throw Error(p(188));
        return b !== a ? null : a;
      }
      for (var c = a, d = b; ; ) {
        var e = c.return;
        if (null === e)
          break;
        var f = e.alternate;
        if (null === f) {
          d = e.return;
          if (null !== d) {
            c = d;
            continue;
          }
          break;
        }
        if (e.child === f.child) {
          for (f = e.child; f; ) {
            if (f === c)
              return Xb(e), a;
            if (f === d)
              return Xb(e), b;
            f = f.sibling;
          }
          throw Error(p(188));
        }
        if (c.return !== d.return)
          c = e, d = f;
        else {
          for (var g = false, h = e.child; h; ) {
            if (h === c) {
              g = true;
              c = e;
              d = f;
              break;
            }
            if (h === d) {
              g = true;
              d = e;
              c = f;
              break;
            }
            h = h.sibling;
          }
          if (!g) {
            for (h = f.child; h; ) {
              if (h === c) {
                g = true;
                c = f;
                d = e;
                break;
              }
              if (h === d) {
                g = true;
                d = f;
                c = e;
                break;
              }
              h = h.sibling;
            }
            if (!g)
              throw Error(p(189));
          }
        }
        if (c.alternate !== d)
          throw Error(p(190));
      }
      if (3 !== c.tag)
        throw Error(p(188));
      return c.stateNode.current === c ? a : b;
    }
    function Zb(a) {
      a = Yb(a);
      return null !== a ? $b(a) : null;
    }
    function $b(a) {
      if (5 === a.tag || 6 === a.tag)
        return a;
      for (a = a.child; null !== a; ) {
        var b = $b(a);
        if (null !== b)
          return b;
        a = a.sibling;
      }
      return null;
    }
    var ac = ca.unstable_scheduleCallback;
    var bc = ca.unstable_cancelCallback;
    var cc = ca.unstable_shouldYield;
    var dc = ca.unstable_requestPaint;
    var B = ca.unstable_now;
    var ec = ca.unstable_getCurrentPriorityLevel;
    var fc = ca.unstable_ImmediatePriority;
    var gc = ca.unstable_UserBlockingPriority;
    var hc = ca.unstable_NormalPriority;
    var ic = ca.unstable_LowPriority;
    var jc = ca.unstable_IdlePriority;
    var kc = null;
    var lc = null;
    function mc(a) {
      if (lc && "function" === typeof lc.onCommitFiberRoot)
        try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
    }
    var oc = Math.clz32 ? Math.clz32 : nc;
    var pc = Math.log;
    var qc = Math.LN2;
    function nc(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
    }
    var rc = 64;
    var sc = 4194304;
    function tc(a) {
      switch (a & -a) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return a & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return a & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return a;
      }
    }
    function uc(a, b) {
      var c = a.pendingLanes;
      if (0 === c)
        return 0;
      var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
      if (0 !== g) {
        var h = g & ~e;
        0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
      } else
        g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
      if (0 === d)
        return 0;
      if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240)))
        return b;
      0 !== (d & 4) && (d |= c & 16);
      b = a.entangledLanes;
      if (0 !== b)
        for (a = a.entanglements, b &= d; 0 < b; )
          c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
      return d;
    }
    function vc(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 4:
          return b + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return b + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function wc(a, b) {
      for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
        var g = 31 - oc(f), h = 1 << g, k = e[g];
        if (-1 === k) {
          if (0 === (h & c) || 0 !== (h & d))
            e[g] = vc(h, b);
        } else
          k <= b && (a.expiredLanes |= h);
        f &= ~h;
      }
    }
    function xc(a) {
      a = a.pendingLanes & -1073741825;
      return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
    }
    function yc() {
      var a = rc;
      rc <<= 1;
      0 === (rc & 4194240) && (rc = 64);
      return a;
    }
    function zc(a) {
      for (var b = [], c = 0; 31 > c; c++)
        b.push(a);
      return b;
    }
    function Ac(a, b, c) {
      a.pendingLanes |= b;
      536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
      a = a.eventTimes;
      b = 31 - oc(b);
      a[b] = c;
    }
    function Bc(a, b) {
      var c = a.pendingLanes & ~b;
      a.pendingLanes = b;
      a.suspendedLanes = 0;
      a.pingedLanes = 0;
      a.expiredLanes &= b;
      a.mutableReadLanes &= b;
      a.entangledLanes &= b;
      b = a.entanglements;
      var d = a.eventTimes;
      for (a = a.expirationTimes; 0 < c; ) {
        var e = 31 - oc(c), f = 1 << e;
        b[e] = 0;
        d[e] = -1;
        a[e] = -1;
        c &= ~f;
      }
    }
    function Cc(a, b) {
      var c = a.entangledLanes |= b;
      for (a = a.entanglements; c; ) {
        var d = 31 - oc(c), e = 1 << d;
        e & b | a[d] & b && (a[d] |= b);
        c &= ~e;
      }
    }
    var C = 0;
    function Dc(a) {
      a &= -a;
      return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
    }
    var Ec;
    var Fc;
    var Gc;
    var Hc;
    var Ic;
    var Jc = false;
    var Kc = [];
    var Lc = null;
    var Mc = null;
    var Nc = null;
    var Oc = /* @__PURE__ */ new Map();
    var Pc = /* @__PURE__ */ new Map();
    var Qc = [];
    var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function Sc(a, b) {
      switch (a) {
        case "focusin":
        case "focusout":
          Lc = null;
          break;
        case "dragenter":
        case "dragleave":
          Mc = null;
          break;
        case "mouseover":
        case "mouseout":
          Nc = null;
          break;
        case "pointerover":
        case "pointerout":
          Oc.delete(b.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Pc.delete(b.pointerId);
      }
    }
    function Tc(a, b, c, d, e, f) {
      if (null === a || a.nativeEvent !== f)
        return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
      a.eventSystemFlags |= d;
      b = a.targetContainers;
      null !== e && -1 === b.indexOf(e) && b.push(e);
      return a;
    }
    function Uc(a, b, c, d, e) {
      switch (b) {
        case "focusin":
          return Lc = Tc(Lc, a, b, c, d, e), true;
        case "dragenter":
          return Mc = Tc(Mc, a, b, c, d, e), true;
        case "mouseover":
          return Nc = Tc(Nc, a, b, c, d, e), true;
        case "pointerover":
          var f = e.pointerId;
          Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
          return true;
        case "gotpointercapture":
          return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
      }
      return false;
    }
    function Vc(a) {
      var b = Wc(a.target);
      if (null !== b) {
        var c = Vb(b);
        if (null !== c) {
          if (b = c.tag, 13 === b) {
            if (b = Wb(c), null !== b) {
              a.blockedOn = b;
              Ic(a.priority, function() {
                Gc(c);
              });
              return;
            }
          } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
            a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a.blockedOn = null;
    }
    function Xc(a) {
      if (null !== a.blockedOn)
        return false;
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (null === c) {
          c = a.nativeEvent;
          var d = new c.constructor(c.type, c);
          wb = d;
          c.target.dispatchEvent(d);
          wb = null;
        } else
          return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
        b.shift();
      }
      return true;
    }
    function Zc(a, b, c) {
      Xc(a) && c.delete(b);
    }
    function $c() {
      Jc = false;
      null !== Lc && Xc(Lc) && (Lc = null);
      null !== Mc && Xc(Mc) && (Mc = null);
      null !== Nc && Xc(Nc) && (Nc = null);
      Oc.forEach(Zc);
      Pc.forEach(Zc);
    }
    function ad(a, b) {
      a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
    }
    function bd(a) {
      function b(b2) {
        return ad(b2, a);
      }
      if (0 < Kc.length) {
        ad(Kc[0], a);
        for (var c = 1; c < Kc.length; c++) {
          var d = Kc[c];
          d.blockedOn === a && (d.blockedOn = null);
        }
      }
      null !== Lc && ad(Lc, a);
      null !== Mc && ad(Mc, a);
      null !== Nc && ad(Nc, a);
      Oc.forEach(b);
      Pc.forEach(b);
      for (c = 0; c < Qc.length; c++)
        d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
      for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); )
        Vc(c), null === c.blockedOn && Qc.shift();
    }
    var cd = ua.ReactCurrentBatchConfig;
    var dd = true;
    function ed(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 1, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function gd(a, b, c, d) {
      var e = C, f = cd.transition;
      cd.transition = null;
      try {
        C = 4, fd(a, b, c, d);
      } finally {
        C = e, cd.transition = f;
      }
    }
    function fd(a, b, c, d) {
      if (dd) {
        var e = Yc(a, b, c, d);
        if (null === e)
          hd(a, b, d, id, c), Sc(a, d);
        else if (Uc(e, a, b, c, d))
          d.stopPropagation();
        else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
          for (; null !== e; ) {
            var f = Cb(e);
            null !== f && Ec(f);
            f = Yc(a, b, c, d);
            null === f && hd(a, b, d, id, c);
            if (f === e)
              break;
            e = f;
          }
          null !== e && d.stopPropagation();
        } else
          hd(a, b, d, null, c);
      }
    }
    var id = null;
    function Yc(a, b, c, d) {
      id = null;
      a = xb(d);
      a = Wc(a);
      if (null !== a)
        if (b = Vb(a), null === b)
          a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a)
            return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated)
            return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else
          b !== a && (a = null);
      id = a;
      return null;
    }
    function jd(a) {
      switch (a) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (ec()) {
            case fc:
              return 1;
            case gc:
              return 4;
            case hc:
            case ic:
              return 16;
            case jc:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var kd = null;
    var ld = null;
    var md = null;
    function nd() {
      if (md)
        return md;
      var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
      for (a = 0; a < c && b[a] === e[a]; a++)
        ;
      var g = c - a;
      for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
        ;
      return md = e.slice(a, 1 < d ? 1 - d : void 0);
    }
    function od(a) {
      var b = a.keyCode;
      "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
      10 === a && (a = 13);
      return 32 <= a || 13 === a ? a : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a) {
      function b(b2, d, e, f, g) {
        this._reactName = b2;
        this._targetInst = e;
        this.type = d;
        this.nativeEvent = f;
        this.target = g;
        this.currentTarget = null;
        for (var c in a)
          a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
        this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      A(b.prototype, { preventDefault: function() {
        this.defaultPrevented = true;
        var a2 = this.nativeEvent;
        a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a2 = this.nativeEvent;
        a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd });
      return b;
    }
    var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
      return a.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0 };
    var td = rd(sd);
    var ud = A({}, sd, { view: 0, detail: 0 });
    var vd = rd(ud);
    var wd;
    var xd;
    var yd;
    var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    }, movementX: function(a) {
      if ("movementX" in a)
        return a.movementX;
      a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
      return wd;
    }, movementY: function(a) {
      return "movementY" in a ? a.movementY : xd;
    } });
    var Bd = rd(Ad);
    var Cd = A({}, Ad, { dataTransfer: 0 });
    var Dd = rd(Cd);
    var Ed = A({}, ud, { relatedTarget: 0 });
    var Fd = rd(Ed);
    var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
    var Hd = rd(Gd);
    var Id = A({}, sd, { clipboardData: function(a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    } });
    var Jd = rd(Id);
    var Kd = A({}, sd, { data: 0 });
    var Ld = rd(Kd);
    var Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
    function Pd(a) {
      var b = this.nativeEvent;
      return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = A({}, ud, { key: function(a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if ("Unidentified" !== b)
          return b;
      }
      return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
      return "keypress" === a.type ? od(a) : 0;
    }, keyCode: function(a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }, which: function(a) {
      return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    } });
    var Rd = rd(Qd);
    var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
    var Td = rd(Sd);
    var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
    var Vd = rd(Ud);
    var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
    var Xd = rd(Wd);
    var Yd = A({}, Ad, {
      deltaX: function(a) {
        return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
      },
      deltaY: function(a) {
        return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var Zd = rd(Yd);
    var $d = [9, 13, 27, 32];
    var ae = ia && "CompositionEvent" in window;
    var be = null;
    ia && "documentMode" in document && (be = document.documentMode);
    var ce = ia && "TextEvent" in window && !be;
    var de = ia && (!ae || be && 8 < be && 11 >= be);
    var ee = String.fromCharCode(32);
    var fe = false;
    function ge(a, b) {
      switch (a) {
        case "keyup":
          return -1 !== $d.indexOf(b.keyCode);
        case "keydown":
          return 229 !== b.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he(a) {
      a = a.detail;
      return "object" === typeof a && "data" in a ? a.data : null;
    }
    var ie = false;
    function je(a, b) {
      switch (a) {
        case "compositionend":
          return he(b);
        case "keypress":
          if (32 !== b.which)
            return null;
          fe = true;
          return ee;
        case "textInput":
          return a = b.data, a === ee && fe ? null : a;
        default:
          return null;
      }
    }
    function ke(a, b) {
      if (ie)
        return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
      switch (a) {
        case "paste":
          return null;
        case "keypress":
          if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
            if (b.char && 1 < b.char.length)
              return b.char;
            if (b.which)
              return String.fromCharCode(b.which);
          }
          return null;
        case "compositionend":
          return de && "ko" !== b.locale ? null : b.data;
        default:
          return null;
      }
    }
    var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
    function me(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
    }
    function ne(a, b, c, d) {
      Eb(d);
      b = oe(b, "onChange");
      0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
    }
    var pe = null;
    var qe = null;
    function re(a) {
      se(a, 0);
    }
    function te(a) {
      var b = ue(a);
      if (Wa(b))
        return a;
    }
    function ve(a, b) {
      if ("change" === a)
        return b;
    }
    var we = false;
    if (ia) {
      if (ia) {
        ye = "oninput" in document;
        if (!ye) {
          ze = document.createElement("div");
          ze.setAttribute("oninput", "return;");
          ye = "function" === typeof ze.oninput;
        }
        xe = ye;
      } else
        xe = false;
      we = xe && (!document.documentMode || 9 < document.documentMode);
    }
    var xe;
    var ye;
    var ze;
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a) {
      if ("value" === a.propertyName && te(qe)) {
        var b = [];
        ne(b, qe, a, xb(a));
        Jb(re, b);
      }
    }
    function Ce(a, b, c) {
      "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
    }
    function De(a) {
      if ("selectionchange" === a || "keyup" === a || "keydown" === a)
        return te(qe);
    }
    function Ee(a, b) {
      if ("click" === a)
        return te(b);
    }
    function Fe(a, b) {
      if ("input" === a || "change" === a)
        return te(b);
    }
    function Ge(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var He = "function" === typeof Object.is ? Object.is : Ge;
    function Ie(a, b) {
      if (He(a, b))
        return true;
      if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
        return false;
      var c = Object.keys(a), d = Object.keys(b);
      if (c.length !== d.length)
        return false;
      for (d = 0; d < c.length; d++) {
        var e = c[d];
        if (!ja.call(b, e) || !He(a[e], b[e]))
          return false;
      }
      return true;
    }
    function Je(a) {
      for (; a && a.firstChild; )
        a = a.firstChild;
      return a;
    }
    function Ke(a, b) {
      var c = Je(a);
      a = 0;
      for (var d; c; ) {
        if (3 === c.nodeType) {
          d = a + c.textContent.length;
          if (a <= b && d >= b)
            return { node: c, offset: b - a };
          a = d;
        }
        a: {
          for (; c; ) {
            if (c.nextSibling) {
              c = c.nextSibling;
              break a;
            }
            c = c.parentNode;
          }
          c = void 0;
        }
        c = Je(c);
      }
    }
    function Le(a, b) {
      return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
    }
    function Me() {
      for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
        try {
          var c = "string" === typeof b.contentWindow.location.href;
        } catch (d) {
          c = false;
        }
        if (c)
          a = b.contentWindow;
        else
          break;
        b = Xa(a.document);
      }
      return b;
    }
    function Ne(a) {
      var b = a && a.nodeName && a.nodeName.toLowerCase();
      return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
    }
    function Oe(a) {
      var b = Me(), c = a.focusedElem, d = a.selectionRange;
      if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
        if (null !== d && Ne(c)) {
          if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c)
            c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
          else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
            a = a.getSelection();
            var e = c.textContent.length, f = Math.min(d.start, e);
            d = void 0 === d.end ? f : Math.min(d.end, e);
            !a.extend && f > d && (e = d, d = f, f = e);
            e = Ke(c, f);
            var g = Ke(
              c,
              d
            );
            e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
          }
        }
        b = [];
        for (a = c; a = a.parentNode; )
          1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
        "function" === typeof c.focus && c.focus();
        for (c = 0; c < b.length; c++)
          a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
    var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
    var Qe = null;
    var Re = null;
    var Se = null;
    var Te = false;
    function Ue(a, b, c) {
      var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
      Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
    }
    function Ve(a, b) {
      var c = {};
      c[a.toLowerCase()] = b.toLowerCase();
      c["Webkit" + a] = "webkit" + b;
      c["Moz" + a] = "moz" + b;
      return c;
    }
    var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
    var Xe = {};
    var Ye = {};
    ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
    function Ze(a) {
      if (Xe[a])
        return Xe[a];
      if (!We[a])
        return a;
      var b = We[a], c;
      for (c in b)
        if (b.hasOwnProperty(c) && c in Ye)
          return Xe[a] = b[c];
      return a;
    }
    var $e = Ze("animationend");
    var af = Ze("animationiteration");
    var bf = Ze("animationstart");
    var cf = Ze("transitionend");
    var df = /* @__PURE__ */ new Map();
    var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ff(a, b) {
      df.set(a, b);
      fa(b, [a]);
    }
    for (gf = 0; gf < ef.length; gf++) {
      hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
      ff(jf, "on" + kf);
    }
    var hf;
    var jf;
    var kf;
    var gf;
    ff($e, "onAnimationEnd");
    ff(af, "onAnimationIteration");
    ff(bf, "onAnimationStart");
    ff("dblclick", "onDoubleClick");
    ff("focusin", "onFocus");
    ff("focusout", "onBlur");
    ff(cf, "onTransitionEnd");
    ha("onMouseEnter", ["mouseout", "mouseover"]);
    ha("onMouseLeave", ["mouseout", "mouseover"]);
    ha("onPointerEnter", ["pointerout", "pointerover"]);
    ha("onPointerLeave", ["pointerout", "pointerover"]);
    fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
    function nf(a, b, c) {
      var d = a.type || "unknown-event";
      a.currentTarget = c;
      Ub(d, b, void 0, a);
      a.currentTarget = null;
    }
    function se(a, b) {
      b = 0 !== (b & 4);
      for (var c = 0; c < a.length; c++) {
        var d = a[c], e = d.event;
        d = d.listeners;
        a: {
          var f = void 0;
          if (b)
            for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped())
                break a;
              nf(e, h, l);
              f = k;
            }
          else
            for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped())
                break a;
              nf(e, h, l);
              f = k;
            }
        }
      }
      if (Qb)
        throw a = Rb, Qb = false, Rb = null, a;
    }
    function D(a, b) {
      var c = b[of];
      void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
      var d = a + "__bubble";
      c.has(d) || (pf(b, a, 2, false), c.add(d));
    }
    function qf(a, b, c) {
      var d = 0;
      b && (d |= 4);
      pf(c, a, d, b);
    }
    var rf = "_reactListening" + Math.random().toString(36).slice(2);
    function sf(a) {
      if (!a[rf]) {
        a[rf] = true;
        da.forEach(function(b2) {
          "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
        });
        var b = 9 === a.nodeType ? a : a.ownerDocument;
        null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
      }
    }
    function pf(a, b, c, d) {
      switch (jd(b)) {
        case 1:
          var e = ed;
          break;
        case 4:
          e = gd;
          break;
        default:
          e = fd;
      }
      c = e.bind(null, b, c, a);
      e = void 0;
      !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
      d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
    }
    function hd(a, b, c, d, e) {
      var f = d;
      if (0 === (b & 1) && 0 === (b & 2) && null !== d)
        a:
          for (; ; ) {
            if (null === d)
              return;
            var g = d.tag;
            if (3 === g || 4 === g) {
              var h = d.stateNode.containerInfo;
              if (h === e || 8 === h.nodeType && h.parentNode === e)
                break;
              if (4 === g)
                for (g = d.return; null !== g; ) {
                  var k = g.tag;
                  if (3 === k || 4 === k) {
                    if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                      return;
                  }
                  g = g.return;
                }
              for (; null !== h; ) {
                g = Wc(h);
                if (null === g)
                  return;
                k = g.tag;
                if (5 === k || 6 === k) {
                  d = f = g;
                  continue a;
                }
                h = h.parentNode;
              }
            }
            d = d.return;
          }
      Jb(function() {
        var d2 = f, e2 = xb(c), g2 = [];
        a: {
          var h2 = df.get(a);
          if (void 0 !== h2) {
            var k2 = td, n = a;
            switch (a) {
              case "keypress":
                if (0 === od(c))
                  break a;
              case "keydown":
              case "keyup":
                k2 = Rd;
                break;
              case "focusin":
                n = "focus";
                k2 = Fd;
                break;
              case "focusout":
                n = "blur";
                k2 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k2 = Fd;
                break;
              case "click":
                if (2 === c.button)
                  break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k2 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k2 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k2 = Vd;
                break;
              case $e:
              case af:
              case bf:
                k2 = Hd;
                break;
              case cf:
                k2 = Xd;
                break;
              case "scroll":
                k2 = vd;
                break;
              case "wheel":
                k2 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k2 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k2 = Td;
            }
            var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
            t = [];
            for (var w = d2, u; null !== w; ) {
              u = w;
              var F = u.stateNode;
              5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
              if (J)
                break;
              w = w.return;
            }
            0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
          }
        }
        if (0 === (b & 7)) {
          a: {
            h2 = "mouseover" === a || "pointerover" === a;
            k2 = "mouseout" === a || "pointerout" === a;
            if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf]))
              break a;
            if (k2 || h2) {
              h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
              if (k2) {
                if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag))
                  n = null;
              } else
                k2 = null, n = d2;
              if (k2 !== n) {
                t = Bd;
                F = "onMouseLeave";
                x = "onMouseEnter";
                w = "mouse";
                if ("pointerout" === a || "pointerover" === a)
                  t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                J = null == k2 ? h2 : ue(k2);
                u = null == n ? h2 : ue(n);
                h2 = new t(F, w + "leave", k2, c, e2);
                h2.target = J;
                h2.relatedTarget = u;
                F = null;
                Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                J = F;
                if (k2 && n)
                  b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u))
                      w++;
                    u = 0;
                    for (F = x; F; F = vf(F))
                      u++;
                    for (; 0 < w - u; )
                      t = vf(t), w--;
                    for (; 0 < u - w; )
                      x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate)
                        break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                else
                  t = null;
                null !== k2 && wf(g2, h2, k2, t, false);
                null !== n && null !== J && wf(g2, J, n, t, true);
              }
            }
          }
          a: {
            h2 = d2 ? ue(d2) : window;
            k2 = h2.nodeName && h2.nodeName.toLowerCase();
            if ("select" === k2 || "input" === k2 && "file" === h2.type)
              var na = ve;
            else if (me(h2))
              if (we)
                na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
            else
              (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
            if (na && (na = na(a, d2))) {
              ne(g2, na, c, e2);
              break a;
            }
            xa && xa(a, h2, d2);
            "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
          }
          xa = d2 ? ue(d2) : window;
          switch (a) {
            case "focusin":
              if (me(xa) || "true" === xa.contentEditable)
                Qe = xa, Re = d2, Se = null;
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = false;
              Ue(g2, c, e2);
              break;
            case "selectionchange":
              if (Pe)
                break;
            case "keydown":
            case "keyup":
              Ue(g2, c, e2);
          }
          var $a;
          if (ae)
            b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
          else
            ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
          ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
          if ($a = ce ? je(a, c) : ke(a, c))
            d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
        }
        se(g2, b);
      });
    }
    function tf(a, b, c) {
      return { instance: a, listener: b, currentTarget: c };
    }
    function oe(a, b) {
      for (var c = b + "Capture", d = []; null !== a; ) {
        var e = a, f = e.stateNode;
        5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
        a = a.return;
      }
      return d;
    }
    function vf(a) {
      if (null === a)
        return null;
      do
        a = a.return;
      while (a && 5 !== a.tag);
      return a ? a : null;
    }
    function wf(a, b, c, d, e) {
      for (var f = b._reactName, g = []; null !== c && c !== d; ) {
        var h = c, k = h.alternate, l = h.stateNode;
        if (null !== k && k === d)
          break;
        5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
        c = c.return;
      }
      0 !== g.length && a.push({ event: b, listeners: g });
    }
    var xf = /\r\n?/g;
    var yf = /\u0000|\uFFFD/g;
    function zf(a) {
      return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
    }
    function Af(a, b, c) {
      b = zf(b);
      if (zf(a) !== b && c)
        throw Error(p(425));
    }
    function Bf() {
    }
    var Cf = null;
    var Df = null;
    function Ef(a, b) {
      return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
    }
    var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
    var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
    var Hf = "function" === typeof Promise ? Promise : void 0;
    var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
      return Hf.resolve(null).then(a).catch(If);
    } : Ff;
    function If(a) {
      setTimeout(function() {
        throw a;
      });
    }
    function Kf(a, b) {
      var c = b, d = 0;
      do {
        var e = c.nextSibling;
        a.removeChild(c);
        if (e && 8 === e.nodeType)
          if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else
            "$" !== c && "$?" !== c && "$!" !== c || d++;
        c = e;
      } while (c);
      bd(b);
    }
    function Lf(a) {
      for (; null != a; a = a.nextSibling) {
        var b = a.nodeType;
        if (1 === b || 3 === b)
          break;
        if (8 === b) {
          b = a.data;
          if ("$" === b || "$!" === b || "$?" === b)
            break;
          if ("/$" === b)
            return null;
        }
      }
      return a;
    }
    function Mf(a) {
      a = a.previousSibling;
      for (var b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("$" === c || "$!" === c || "$?" === c) {
            if (0 === b)
              return a;
            b--;
          } else
            "/$" === c && b++;
        }
        a = a.previousSibling;
      }
      return null;
    }
    var Nf = Math.random().toString(36).slice(2);
    var Of = "__reactFiber$" + Nf;
    var Pf = "__reactProps$" + Nf;
    var uf = "__reactContainer$" + Nf;
    var of = "__reactEvents$" + Nf;
    var Qf = "__reactListeners$" + Nf;
    var Rf = "__reactHandles$" + Nf;
    function Wc(a) {
      var b = a[Of];
      if (b)
        return b;
      for (var c = a.parentNode; c; ) {
        if (b = c[uf] || c[Of]) {
          c = b.alternate;
          if (null !== b.child || null !== c && null !== c.child)
            for (a = Mf(a); null !== a; ) {
              if (c = a[Of])
                return c;
              a = Mf(a);
            }
          return b;
        }
        a = c;
        c = a.parentNode;
      }
      return null;
    }
    function Cb(a) {
      a = a[Of] || a[uf];
      return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
    }
    function ue(a) {
      if (5 === a.tag || 6 === a.tag)
        return a.stateNode;
      throw Error(p(33));
    }
    function Db(a) {
      return a[Pf] || null;
    }
    var Sf = [];
    var Tf = -1;
    function Uf(a) {
      return { current: a };
    }
    function E(a) {
      0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
    }
    function G(a, b) {
      Tf++;
      Sf[Tf] = a.current;
      a.current = b;
    }
    var Vf = {};
    var H = Uf(Vf);
    var Wf = Uf(false);
    var Xf = Vf;
    function Yf(a, b) {
      var c = a.type.contextTypes;
      if (!c)
        return Vf;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
        return d.__reactInternalMemoizedMaskedChildContext;
      var e = {}, f;
      for (f in c)
        e[f] = b[f];
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }
    function Zf(a) {
      a = a.childContextTypes;
      return null !== a && void 0 !== a;
    }
    function $f() {
      E(Wf);
      E(H);
    }
    function ag(a, b, c) {
      if (H.current !== Vf)
        throw Error(p(168));
      G(H, b);
      G(Wf, c);
    }
    function bg(a, b, c) {
      var d = a.stateNode;
      b = b.childContextTypes;
      if ("function" !== typeof d.getChildContext)
        return c;
      d = d.getChildContext();
      for (var e in d)
        if (!(e in b))
          throw Error(p(108, Ra(a) || "Unknown", e));
      return A({}, c, d);
    }
    function cg(a) {
      a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
      Xf = H.current;
      G(H, a);
      G(Wf, Wf.current);
      return true;
    }
    function dg(a, b, c) {
      var d = a.stateNode;
      if (!d)
        throw Error(p(169));
      c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
      G(Wf, c);
    }
    var eg = null;
    var fg = false;
    var gg = false;
    function hg(a) {
      null === eg ? eg = [a] : eg.push(a);
    }
    function ig(a) {
      fg = true;
      hg(a);
    }
    function jg() {
      if (!gg && null !== eg) {
        gg = true;
        var a = 0, b = C;
        try {
          var c = eg;
          for (C = 1; a < c.length; a++) {
            var d = c[a];
            do
              d = d(true);
            while (null !== d);
          }
          eg = null;
          fg = false;
        } catch (e) {
          throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
        } finally {
          C = b, gg = false;
        }
      }
      return null;
    }
    var kg = [];
    var lg = 0;
    var mg = null;
    var ng = 0;
    var og = [];
    var pg = 0;
    var qg = null;
    var rg = 1;
    var sg = "";
    function tg(a, b) {
      kg[lg++] = ng;
      kg[lg++] = mg;
      mg = a;
      ng = b;
    }
    function ug(a, b, c) {
      og[pg++] = rg;
      og[pg++] = sg;
      og[pg++] = qg;
      qg = a;
      var d = rg;
      a = sg;
      var e = 32 - oc(d) - 1;
      d &= ~(1 << e);
      c += 1;
      var f = 32 - oc(b) + e;
      if (30 < f) {
        var g = e - e % 5;
        f = (d & (1 << g) - 1).toString(32);
        d >>= g;
        e -= g;
        rg = 1 << 32 - oc(b) + e | c << e | d;
        sg = f + a;
      } else
        rg = 1 << f | c << e | d, sg = a;
    }
    function vg(a) {
      null !== a.return && (tg(a, 1), ug(a, 1, 0));
    }
    function wg(a) {
      for (; a === mg; )
        mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
      for (; a === qg; )
        qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
    }
    var xg = null;
    var yg = null;
    var I = false;
    var zg = null;
    function Ag(a, b) {
      var c = Bg(5, null, null, 0);
      c.elementType = "DELETED";
      c.stateNode = b;
      c.return = a;
      b = a.deletions;
      null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
    }
    function Cg(a, b) {
      switch (a.tag) {
        case 5:
          var c = a.type;
          b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
          return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
        case 6:
          return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
        case 13:
          return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
        default:
          return false;
      }
    }
    function Dg(a) {
      return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
    }
    function Eg(a) {
      if (I) {
        var b = yg;
        if (b) {
          var c = b;
          if (!Cg(a, b)) {
            if (Dg(a))
              throw Error(p(418));
            b = Lf(c.nextSibling);
            var d = xg;
            b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
          }
        } else {
          if (Dg(a))
            throw Error(p(418));
          a.flags = a.flags & -4097 | 2;
          I = false;
          xg = a;
        }
      }
    }
    function Fg(a) {
      for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
        a = a.return;
      xg = a;
    }
    function Gg(a) {
      if (a !== xg)
        return false;
      if (!I)
        return Fg(a), I = true, false;
      var b;
      (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
      if (b && (b = yg)) {
        if (Dg(a))
          throw Hg(), Error(p(418));
        for (; b; )
          Ag(a, b), b = Lf(b.nextSibling);
      }
      Fg(a);
      if (13 === a.tag) {
        a = a.memoizedState;
        a = null !== a ? a.dehydrated : null;
        if (!a)
          throw Error(p(317));
        a: {
          a = a.nextSibling;
          for (b = 0; a; ) {
            if (8 === a.nodeType) {
              var c = a.data;
              if ("/$" === c) {
                if (0 === b) {
                  yg = Lf(a.nextSibling);
                  break a;
                }
                b--;
              } else
                "$" !== c && "$!" !== c && "$?" !== c || b++;
            }
            a = a.nextSibling;
          }
          yg = null;
        }
      } else
        yg = xg ? Lf(a.stateNode.nextSibling) : null;
      return true;
    }
    function Hg() {
      for (var a = yg; a; )
        a = Lf(a.nextSibling);
    }
    function Ig() {
      yg = xg = null;
      I = false;
    }
    function Jg(a) {
      null === zg ? zg = [a] : zg.push(a);
    }
    var Kg = ua.ReactCurrentBatchConfig;
    function Lg(a, b) {
      if (a && a.defaultProps) {
        b = A({}, b);
        a = a.defaultProps;
        for (var c in a)
          void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    var Mg = Uf(null);
    var Ng = null;
    var Og = null;
    var Pg = null;
    function Qg() {
      Pg = Og = Ng = null;
    }
    function Rg(a) {
      var b = Mg.current;
      E(Mg);
      a._currentValue = b;
    }
    function Sg(a, b, c) {
      for (; null !== a; ) {
        var d = a.alternate;
        (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
        if (a === c)
          break;
        a = a.return;
      }
    }
    function Tg(a, b) {
      Ng = a;
      Pg = Og = null;
      a = a.dependencies;
      null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = true), a.firstContext = null);
    }
    function Vg(a) {
      var b = a._currentValue;
      if (Pg !== a)
        if (a = { context: a, memoizedValue: b, next: null }, null === Og) {
          if (null === Ng)
            throw Error(p(308));
          Og = a;
          Ng.dependencies = { lanes: 0, firstContext: a };
        } else
          Og = Og.next = a;
      return b;
    }
    var Wg = null;
    function Xg(a) {
      null === Wg ? Wg = [a] : Wg.push(a);
    }
    function Yg(a, b, c, d) {
      var e = b.interleaved;
      null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);
      b.interleaved = c;
      return Zg(a, d);
    }
    function Zg(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      null !== c && (c.lanes |= b);
      c = a;
      for (a = a.return; null !== a; )
        a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
      return 3 === c.tag ? c.stateNode : null;
    }
    var $g = false;
    function ah(a) {
      a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
    }
    function bh(a, b) {
      a = a.updateQueue;
      b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
    }
    function ch(a, b) {
      return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
    }
    function dh(a, b, c) {
      var d = a.updateQueue;
      if (null === d)
        return null;
      d = d.shared;
      if (0 !== (K & 2)) {
        var e = d.pending;
        null === e ? b.next = b : (b.next = e.next, e.next = b);
        d.pending = b;
        return Zg(a, c);
      }
      e = d.interleaved;
      null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);
      d.interleaved = b;
      return Zg(a, c);
    }
    function eh(a, b, c) {
      b = b.updateQueue;
      if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    function fh(a, b) {
      var c = a.updateQueue, d = a.alternate;
      if (null !== d && (d = d.updateQueue, c === d)) {
        var e = null, f = null;
        c = c.firstBaseUpdate;
        if (null !== c) {
          do {
            var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
            null === f ? e = f = g : f = f.next = g;
            c = c.next;
          } while (null !== c);
          null === f ? e = f = b : f = f.next = b;
        } else
          e = f = b;
        c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
        a.updateQueue = c;
        return;
      }
      a = c.lastBaseUpdate;
      null === a ? c.firstBaseUpdate = b : a.next = b;
      c.lastBaseUpdate = b;
    }
    function gh(a, b, c, d) {
      var e = a.updateQueue;
      $g = false;
      var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
      if (null !== h) {
        e.shared.pending = null;
        var k = h, l = k.next;
        k.next = null;
        null === g ? f = l : g.next = l;
        g = k;
        var m = a.alternate;
        null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
      }
      if (null !== f) {
        var q = e.baseState;
        g = 0;
        m = l = k = null;
        h = f;
        do {
          var r = h.lane, y = h.eventTime;
          if ((d & r) === r) {
            null !== m && (m = m.next = {
              eventTime: y,
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            });
            a: {
              var n = a, t = h;
              r = b;
              y = c;
              switch (t.tag) {
                case 1:
                  n = t.payload;
                  if ("function" === typeof n) {
                    q = n.call(y, q, r);
                    break a;
                  }
                  q = n;
                  break a;
                case 3:
                  n.flags = n.flags & -65537 | 128;
                case 0:
                  n = t.payload;
                  r = "function" === typeof n ? n.call(y, q, r) : n;
                  if (null === r || void 0 === r)
                    break a;
                  q = A({}, q, r);
                  break a;
                case 2:
                  $g = true;
              }
            }
            null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
          } else
            y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
          h = h.next;
          if (null === h)
            if (h = e.shared.pending, null === h)
              break;
            else
              r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
        } while (1);
        null === m && (k = q);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = m;
        b = e.shared.interleaved;
        if (null !== b) {
          e = b;
          do
            g |= e.lane, e = e.next;
          while (e !== b);
        } else
          null === f && (e.shared.lanes = 0);
        hh |= g;
        a.lanes = g;
        a.memoizedState = q;
      }
    }
    function ih(a, b, c) {
      a = b.effects;
      b.effects = null;
      if (null !== a)
        for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e)
              throw Error(p(191, e));
            e.call(d);
          }
        }
    }
    var jh = new aa.Component().refs;
    function kh(a, b, c, d) {
      b = a.memoizedState;
      c = c(d, b);
      c = null === c || void 0 === c ? b : A({}, b, c);
      a.memoizedState = c;
      0 === a.lanes && (a.updateQueue.baseState = c);
    }
    var nh = { isMounted: function(a) {
      return (a = a._reactInternals) ? Vb(a) === a : false;
    }, enqueueSetState: function(a, b, c) {
      a = a._reactInternals;
      var d = L(), e = lh(a), f = ch(d, e);
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = dh(a, f, e);
      null !== b && (mh(b, a, e, d), eh(b, a, e));
    }, enqueueReplaceState: function(a, b, c) {
      a = a._reactInternals;
      var d = L(), e = lh(a), f = ch(d, e);
      f.tag = 1;
      f.payload = b;
      void 0 !== c && null !== c && (f.callback = c);
      b = dh(a, f, e);
      null !== b && (mh(b, a, e, d), eh(b, a, e));
    }, enqueueForceUpdate: function(a, b) {
      a = a._reactInternals;
      var c = L(), d = lh(a), e = ch(c, d);
      e.tag = 2;
      void 0 !== b && null !== b && (e.callback = b);
      b = dh(a, e, d);
      null !== b && (mh(b, a, d, c), eh(b, a, d));
    } };
    function oh(a, b, c, d, e, f, g) {
      a = a.stateNode;
      return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
    }
    function ph(a, b, c) {
      var d = false, e = Vf;
      var f = b.contextType;
      "object" === typeof f && null !== f ? f = Vg(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
      b = new b(c, f);
      a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
      b.updater = nh;
      a.stateNode = b;
      b._reactInternals = a;
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
      return b;
    }
    function qh(a, b, c, d) {
      a = b.state;
      "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
      "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
      b.state !== a && nh.enqueueReplaceState(b, b.state, null);
    }
    function rh(a, b, c, d) {
      var e = a.stateNode;
      e.props = c;
      e.state = a.memoizedState;
      e.refs = jh;
      ah(a);
      var f = b.contextType;
      "object" === typeof f && null !== f ? e.context = Vg(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
      e.state = a.memoizedState;
      f = b.getDerivedStateFromProps;
      "function" === typeof f && (kh(a, b, f, c), e.state = a.memoizedState);
      "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);
      "function" === typeof e.componentDidMount && (a.flags |= 4194308);
    }
    function sh(a, b, c) {
      a = c.ref;
      if (null !== a && "function" !== typeof a && "object" !== typeof a) {
        if (c._owner) {
          c = c._owner;
          if (c) {
            if (1 !== c.tag)
              throw Error(p(309));
            var d = c.stateNode;
          }
          if (!d)
            throw Error(p(147, a));
          var e = d, f = "" + a;
          if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f)
            return b.ref;
          b = function(a2) {
            var b2 = e.refs;
            b2 === jh && (b2 = e.refs = {});
            null === a2 ? delete b2[f] : b2[f] = a2;
          };
          b._stringRef = f;
          return b;
        }
        if ("string" !== typeof a)
          throw Error(p(284));
        if (!c._owner)
          throw Error(p(290, a));
      }
      return a;
    }
    function th(a, b) {
      a = Object.prototype.toString.call(b);
      throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
    }
    function uh(a) {
      var b = a._init;
      return b(a._payload);
    }
    function vh(a) {
      function b(b2, c2) {
        if (a) {
          var d2 = b2.deletions;
          null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
        }
      }
      function c(c2, d2) {
        if (!a)
          return null;
        for (; null !== d2; )
          b(c2, d2), d2 = d2.sibling;
        return null;
      }
      function d(a2, b2) {
        for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
          null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
        return a2;
      }
      function e(a2, b2) {
        a2 = wh(a2, b2);
        a2.index = 0;
        a2.sibling = null;
        return a2;
      }
      function f(b2, c2, d2) {
        b2.index = d2;
        if (!a)
          return b2.flags |= 1048576, c2;
        d2 = b2.alternate;
        if (null !== d2)
          return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
        b2.flags |= 2;
        return c2;
      }
      function g(b2) {
        a && null === b2.alternate && (b2.flags |= 2);
        return b2;
      }
      function h(a2, b2, c2, d2) {
        if (null === b2 || 6 !== b2.tag)
          return b2 = xh(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function k(a2, b2, c2, d2) {
        var f2 = c2.type;
        if (f2 === ya)
          return m(a2, b2, c2.props.children, d2, c2.key);
        if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && uh(f2) === b2.type))
          return d2 = e(b2, c2.props), d2.ref = sh(a2, b2, c2), d2.return = a2, d2;
        d2 = yh(c2.type, c2.key, c2.props, null, a2.mode, d2);
        d2.ref = sh(a2, b2, c2);
        d2.return = a2;
        return d2;
      }
      function l(a2, b2, c2, d2) {
        if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
          return b2 = zh(c2, a2.mode, d2), b2.return = a2, b2;
        b2 = e(b2, c2.children || []);
        b2.return = a2;
        return b2;
      }
      function m(a2, b2, c2, d2, f2) {
        if (null === b2 || 7 !== b2.tag)
          return b2 = Ah(c2, a2.mode, d2, f2), b2.return = a2, b2;
        b2 = e(b2, c2);
        b2.return = a2;
        return b2;
      }
      function q(a2, b2, c2) {
        if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
          return b2 = xh("" + b2, a2.mode, c2), b2.return = a2, b2;
        if ("object" === typeof b2 && null !== b2) {
          switch (b2.$$typeof) {
            case va:
              return c2 = yh(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = sh(a2, null, b2), c2.return = a2, c2;
            case wa:
              return b2 = zh(b2, a2.mode, c2), b2.return = a2, b2;
            case Ha:
              var d2 = b2._init;
              return q(a2, d2(b2._payload), c2);
          }
          if (eb(b2) || Ka(b2))
            return b2 = Ah(b2, a2.mode, c2, null), b2.return = a2, b2;
          th(a2, b2);
        }
        return null;
      }
      function r(a2, b2, c2, d2) {
        var e2 = null !== b2 ? b2.key : null;
        if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
          return null !== e2 ? null : h(a2, b2, "" + c2, d2);
        if ("object" === typeof c2 && null !== c2) {
          switch (c2.$$typeof) {
            case va:
              return c2.key === e2 ? k(a2, b2, c2, d2) : null;
            case wa:
              return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            case Ha:
              return e2 = c2._init, r(
                a2,
                b2,
                e2(c2._payload),
                d2
              );
          }
          if (eb(c2) || Ka(c2))
            return null !== e2 ? null : m(a2, b2, c2, d2, null);
          th(a2, c2);
        }
        return null;
      }
      function y(a2, b2, c2, d2, e2) {
        if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
          return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
        if ("object" === typeof d2 && null !== d2) {
          switch (d2.$$typeof) {
            case va:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
            case wa:
              return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            case Ha:
              var f2 = d2._init;
              return y(a2, b2, c2, f2(d2._payload), e2);
          }
          if (eb(d2) || Ka(d2))
            return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
          th(b2, d2);
        }
        return null;
      }
      function n(e2, g2, h2, k2) {
        for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
          u.index > w ? (x = u, u = null) : x = u.sibling;
          var n2 = r(e2, u, h2[w], k2);
          if (null === n2) {
            null === u && (u = x);
            break;
          }
          a && u && null === n2.alternate && b(e2, u);
          g2 = f(n2, g2, w);
          null === m2 ? l2 = n2 : m2.sibling = n2;
          m2 = n2;
          u = x;
        }
        if (w === h2.length)
          return c(e2, u), I && tg(e2, w), l2;
        if (null === u) {
          for (; w < h2.length; w++)
            u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
          I && tg(e2, w);
          return l2;
        }
        for (u = d(e2, u); w < h2.length; w++)
          x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
        a && u.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w);
        return l2;
      }
      function t(e2, g2, h2, k2) {
        var l2 = Ka(h2);
        if ("function" !== typeof l2)
          throw Error(p(150));
        h2 = l2.call(h2);
        if (null == h2)
          throw Error(p(151));
        for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
          m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
          var t2 = r(e2, m2, n2.value, k2);
          if (null === t2) {
            null === m2 && (m2 = x);
            break;
          }
          a && m2 && null === t2.alternate && b(e2, m2);
          g2 = f(t2, g2, w);
          null === u ? l2 = t2 : u.sibling = t2;
          u = t2;
          m2 = x;
        }
        if (n2.done)
          return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
        if (null === m2) {
          for (; !n2.done; w++, n2 = h2.next())
            n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          I && tg(e2, w);
          return l2;
        }
        for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next())
          n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
        a && m2.forEach(function(a2) {
          return b(e2, a2);
        });
        I && tg(e2, w);
        return l2;
      }
      function J(a2, d2, f2, h2) {
        "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
        if ("object" === typeof f2 && null !== f2) {
          switch (f2.$$typeof) {
            case va:
              a: {
                for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                  if (l2.key === k2) {
                    k2 = f2.type;
                    if (k2 === ya) {
                      if (7 === l2.tag) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props.children);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                    } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && uh(k2) === l2.type) {
                      c(a2, l2.sibling);
                      d2 = e(l2, f2.props);
                      d2.ref = sh(a2, l2, f2);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    c(a2, l2);
                    break;
                  } else
                    b(a2, l2);
                  l2 = l2.sibling;
                }
                f2.type === ya ? (d2 = Ah(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = yh(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = sh(a2, d2, f2), h2.return = a2, a2 = h2);
              }
              return g(a2);
            case wa:
              a: {
                for (l2 = f2.key; null !== d2; ) {
                  if (d2.key === l2)
                    if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                  else
                    b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = zh(f2, a2.mode, h2);
                d2.return = a2;
                a2 = d2;
              }
              return g(a2);
            case Ha:
              return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
          }
          if (eb(f2))
            return n(a2, d2, f2, h2);
          if (Ka(f2))
            return t(a2, d2, f2, h2);
          th(a2, f2);
        }
        return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = xh(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
      }
      return J;
    }
    var Bh = vh(true);
    var Ch = vh(false);
    var Dh = {};
    var Eh = Uf(Dh);
    var Fh = Uf(Dh);
    var Gh = Uf(Dh);
    function Hh(a) {
      if (a === Dh)
        throw Error(p(174));
      return a;
    }
    function Ih(a, b) {
      G(Gh, b);
      G(Fh, a);
      G(Eh, Dh);
      a = b.nodeType;
      switch (a) {
        case 9:
        case 11:
          b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
          break;
        default:
          a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
      }
      E(Eh);
      G(Eh, b);
    }
    function Jh() {
      E(Eh);
      E(Fh);
      E(Gh);
    }
    function Kh(a) {
      Hh(Gh.current);
      var b = Hh(Eh.current);
      var c = lb(b, a.type);
      b !== c && (G(Fh, a), G(Eh, c));
    }
    function Lh(a) {
      Fh.current === a && (E(Eh), E(Fh));
    }
    var M = Uf(0);
    function Mh(a) {
      for (var b = a; null !== b; ) {
        if (13 === b.tag) {
          var c = b.memoizedState;
          if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
            return b;
        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
          if (0 !== (b.flags & 128))
            return b;
        } else if (null !== b.child) {
          b.child.return = b;
          b = b.child;
          continue;
        }
        if (b === a)
          break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a)
            return null;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
      return null;
    }
    var Nh = [];
    function Oh() {
      for (var a = 0; a < Nh.length; a++)
        Nh[a]._workInProgressVersionPrimary = null;
      Nh.length = 0;
    }
    var Ph = ua.ReactCurrentDispatcher;
    var Qh = ua.ReactCurrentBatchConfig;
    var Rh = 0;
    var N = null;
    var O = null;
    var P = null;
    var Sh = false;
    var Th = false;
    var Uh = 0;
    var Vh = 0;
    function Q() {
      throw Error(p(321));
    }
    function Wh(a, b) {
      if (null === b)
        return false;
      for (var c = 0; c < b.length && c < a.length; c++)
        if (!He(a[c], b[c]))
          return false;
      return true;
    }
    function Xh(a, b, c, d, e, f) {
      Rh = f;
      N = b;
      b.memoizedState = null;
      b.updateQueue = null;
      b.lanes = 0;
      Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
      a = c(d, e);
      if (Th) {
        f = 0;
        do {
          Th = false;
          Uh = 0;
          if (25 <= f)
            throw Error(p(301));
          f += 1;
          P = O = null;
          b.updateQueue = null;
          Ph.current = $h;
          a = c(d, e);
        } while (Th);
      }
      Ph.current = ai;
      b = null !== O && null !== O.next;
      Rh = 0;
      P = O = N = null;
      Sh = false;
      if (b)
        throw Error(p(300));
      return a;
    }
    function bi() {
      var a = 0 !== Uh;
      Uh = 0;
      return a;
    }
    function ci() {
      var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
      null === P ? N.memoizedState = P = a : P = P.next = a;
      return P;
    }
    function di() {
      if (null === O) {
        var a = N.alternate;
        a = null !== a ? a.memoizedState : null;
      } else
        a = O.next;
      var b = null === P ? N.memoizedState : P.next;
      if (null !== b)
        P = b, O = a;
      else {
        if (null === a)
          throw Error(p(310));
        O = a;
        a = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };
        null === P ? N.memoizedState = P = a : P = P.next = a;
      }
      return P;
    }
    function ei(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function fi(a) {
      var b = di(), c = b.queue;
      if (null === c)
        throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = O, e = d.baseQueue, f = c.pending;
      if (null !== f) {
        if (null !== e) {
          var g = e.next;
          e.next = f.next;
          f.next = g;
        }
        d.baseQueue = e = f;
        c.pending = null;
      }
      if (null !== e) {
        f = e.next;
        d = d.baseState;
        var h = g = null, k = null, l = f;
        do {
          var m = l.lane;
          if ((Rh & m) === m)
            null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
          else {
            var q = {
              lane: m,
              action: l.action,
              hasEagerState: l.hasEagerState,
              eagerState: l.eagerState,
              next: null
            };
            null === k ? (h = k = q, g = d) : k = k.next = q;
            N.lanes |= m;
            hh |= m;
          }
          l = l.next;
        } while (null !== l && l !== f);
        null === k ? g = d : k.next = h;
        He(d, b.memoizedState) || (Ug = true);
        b.memoizedState = d;
        b.baseState = g;
        b.baseQueue = k;
        c.lastRenderedState = d;
      }
      a = c.interleaved;
      if (null !== a) {
        e = a;
        do
          f = e.lane, N.lanes |= f, hh |= f, e = e.next;
        while (e !== a);
      } else
        null === e && (c.lanes = 0);
      return [b.memoizedState, c.dispatch];
    }
    function gi(a) {
      var b = di(), c = b.queue;
      if (null === c)
        throw Error(p(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch, e = c.pending, f = b.memoizedState;
      if (null !== e) {
        c.pending = null;
        var g = e = e.next;
        do
          f = a(f, g.action), g = g.next;
        while (g !== e);
        He(f, b.memoizedState) || (Ug = true);
        b.memoizedState = f;
        null === b.baseQueue && (b.baseState = f);
        c.lastRenderedState = f;
      }
      return [f, d];
    }
    function hi() {
    }
    function ii(a, b) {
      var c = N, d = di(), e = b(), f = !He(d.memoizedState, e);
      f && (d.memoizedState = e, Ug = true);
      d = d.queue;
      ji(ki.bind(null, c, d, a), [a]);
      if (d.getSnapshot !== b || f || null !== P && P.memoizedState.tag & 1) {
        c.flags |= 2048;
        li(9, mi.bind(null, c, d, e, b), void 0, null);
        if (null === R)
          throw Error(p(349));
        0 !== (Rh & 30) || ni(c, b, e);
      }
      return e;
    }
    function ni(a, b, c) {
      a.flags |= 16384;
      a = { getSnapshot: b, value: c };
      b = N.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
    }
    function mi(a, b, c, d) {
      b.value = c;
      b.getSnapshot = d;
      oi(b) && pi(a);
    }
    function ki(a, b, c) {
      return c(function() {
        oi(b) && pi(a);
      });
    }
    function oi(a) {
      var b = a.getSnapshot;
      a = a.value;
      try {
        var c = b();
        return !He(a, c);
      } catch (d) {
        return true;
      }
    }
    function pi(a) {
      var b = Zg(a, 1);
      null !== b && mh(b, a, 1, -1);
    }
    function qi(a) {
      var b = ci();
      "function" === typeof a && (a = a());
      b.memoizedState = b.baseState = a;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a };
      b.queue = a;
      a = a.dispatch = ri.bind(null, N, a);
      return [b.memoizedState, a];
    }
    function li(a, b, c, d) {
      a = { tag: a, create: b, destroy: c, deps: d, next: null };
      b = N.updateQueue;
      null === b ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
      return a;
    }
    function si() {
      return di().memoizedState;
    }
    function ti(a, b, c, d) {
      var e = ci();
      N.flags |= a;
      e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);
    }
    function ui(a, b, c, d) {
      var e = di();
      d = void 0 === d ? null : d;
      var f = void 0;
      if (null !== O) {
        var g = O.memoizedState;
        f = g.destroy;
        if (null !== d && Wh(d, g.deps)) {
          e.memoizedState = li(b, c, f, d);
          return;
        }
      }
      N.flags |= a;
      e.memoizedState = li(1 | b, c, f, d);
    }
    function vi(a, b) {
      return ti(8390656, 8, a, b);
    }
    function ji(a, b) {
      return ui(2048, 8, a, b);
    }
    function wi(a, b) {
      return ui(4, 2, a, b);
    }
    function xi(a, b) {
      return ui(4, 4, a, b);
    }
    function yi(a, b) {
      if ("function" === typeof b)
        return a = a(), b(a), function() {
          b(null);
        };
      if (null !== b && void 0 !== b)
        return a = a(), b.current = a, function() {
          b.current = null;
        };
    }
    function zi(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ui(4, 4, yi.bind(null, b, a), c);
    }
    function Ai() {
    }
    function Bi(a, b) {
      var c = di();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Wh(b, d[1]))
        return d[0];
      c.memoizedState = [a, b];
      return a;
    }
    function Ci(a, b) {
      var c = di();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Wh(b, d[1]))
        return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    }
    function Di(a, b, c) {
      if (0 === (Rh & 21))
        return a.baseState && (a.baseState = false, Ug = true), a.memoizedState = c;
      He(c, b) || (c = yc(), N.lanes |= c, hh |= c, a.baseState = true);
      return b;
    }
    function Ei(a, b) {
      var c = C;
      C = 0 !== c && 4 > c ? c : 4;
      a(true);
      var d = Qh.transition;
      Qh.transition = {};
      try {
        a(false), b();
      } finally {
        C = c, Qh.transition = d;
      }
    }
    function Fi() {
      return di().memoizedState;
    }
    function Gi(a, b, c) {
      var d = lh(a);
      c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (Hi(a))
        Ii(b, c);
      else if (c = Yg(a, b, c, d), null !== c) {
        var e = L();
        mh(c, a, d, e);
        Ji(c, b, d);
      }
    }
    function ri(a, b, c) {
      var d = lh(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
      if (Hi(a))
        Ii(b, e);
      else {
        var f = a.alternate;
        if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f))
          try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, Xg(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
        c = Yg(a, b, e, d);
        null !== c && (e = L(), mh(c, a, d, e), Ji(c, b, d));
      }
    }
    function Hi(a) {
      var b = a.alternate;
      return a === N || null !== b && b === N;
    }
    function Ii(a, b) {
      Th = Sh = true;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
    function Ji(a, b, c) {
      if (0 !== (c & 4194240)) {
        var d = b.lanes;
        d &= a.pendingLanes;
        c |= d;
        b.lanes = c;
        Cc(a, c);
      }
    }
    var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: false };
    var Yh = { readContext: Vg, useCallback: function(a, b) {
      ci().memoizedState = [a, void 0 === b ? null : b];
      return a;
    }, useContext: Vg, useEffect: vi, useImperativeHandle: function(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ti(
        4194308,
        4,
        yi.bind(null, b, a),
        c
      );
    }, useLayoutEffect: function(a, b) {
      return ti(4194308, 4, a, b);
    }, useInsertionEffect: function(a, b) {
      return ti(4, 2, a, b);
    }, useMemo: function(a, b) {
      var c = ci();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    }, useReducer: function(a, b, c) {
      var d = ci();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
      d.queue = a;
      a = a.dispatch = Gi.bind(null, N, a);
      return [d.memoizedState, a];
    }, useRef: function(a) {
      var b = ci();
      a = { current: a };
      return b.memoizedState = a;
    }, useState: qi, useDebugValue: Ai, useDeferredValue: function(a) {
      return ci().memoizedState = a;
    }, useTransition: function() {
      var a = qi(false), b = a[0];
      a = Ei.bind(null, a[1]);
      ci().memoizedState = a;
      return [b, a];
    }, useMutableSource: function() {
    }, useSyncExternalStore: function(a, b, c) {
      var d = N, e = ci();
      if (I) {
        if (void 0 === c)
          throw Error(p(407));
        c = c();
      } else {
        c = b();
        if (null === R)
          throw Error(p(349));
        0 !== (Rh & 30) || ni(d, b, c);
      }
      e.memoizedState = c;
      var f = { value: c, getSnapshot: b };
      e.queue = f;
      vi(ki.bind(
        null,
        d,
        f,
        a
      ), [a]);
      d.flags |= 2048;
      li(9, mi.bind(null, d, f, c, b), void 0, null);
      return c;
    }, useId: function() {
      var a = ci(), b = R.identifierPrefix;
      if (I) {
        var c = sg;
        var d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Uh++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else
        c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    }, unstable_isNewReconciler: false };
    var Zh = {
      readContext: Vg,
      useCallback: Bi,
      useContext: Vg,
      useEffect: ji,
      useImperativeHandle: zi,
      useInsertionEffect: wi,
      useLayoutEffect: xi,
      useMemo: Ci,
      useReducer: fi,
      useRef: si,
      useState: function() {
        return fi(ei);
      },
      useDebugValue: Ai,
      useDeferredValue: function(a) {
        var b = di();
        return Di(b, O.memoizedState, a);
      },
      useTransition: function() {
        var a = fi(ei)[0], b = di().memoizedState;
        return [a, b];
      },
      useMutableSource: hi,
      useSyncExternalStore: ii,
      useId: Fi,
      unstable_isNewReconciler: false
    };
    var $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
      return gi(ei);
    }, useDebugValue: Ai, useDeferredValue: function(a) {
      var b = di();
      return null === O ? b.memoizedState = a : Di(b, O.memoizedState, a);
    }, useTransition: function() {
      var a = gi(ei)[0], b = di().memoizedState;
      return [a, b];
    }, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
    function Ki(a, b) {
      try {
        var c = "", d = b;
        do
          c += Pa(d), d = d.return;
        while (d);
        var e = c;
      } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
      }
      return { value: a, source: b, stack: e, digest: null };
    }
    function Li(a, b, c) {
      return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
    }
    function Mi(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function() {
          throw c;
        });
      }
    }
    var Ni = "function" === typeof WeakMap ? WeakMap : Map;
    function Oi(a, b, c) {
      c = ch(-1, c);
      c.tag = 3;
      c.payload = { element: null };
      var d = b.value;
      c.callback = function() {
        Pi || (Pi = true, Qi = d);
        Mi(a, b);
      };
      return c;
    }
    function Ri(a, b, c) {
      c = ch(-1, c);
      c.tag = 3;
      var d = a.type.getDerivedStateFromError;
      if ("function" === typeof d) {
        var e = b.value;
        c.payload = function() {
          return d(e);
        };
        c.callback = function() {
          Mi(a, b);
        };
      }
      var f = a.stateNode;
      null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
        Mi(a, b);
        "function" !== typeof d && (null === Si ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
        var c2 = b.stack;
        this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
      });
      return c;
    }
    function Ti(a, b, c) {
      var d = a.pingCache;
      if (null === d) {
        d = a.pingCache = new Ni();
        var e = /* @__PURE__ */ new Set();
        d.set(b, e);
      } else
        e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
      e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));
    }
    function Vi(a) {
      do {
        var b;
        if (b = 13 === a.tag)
          b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
        if (b)
          return a;
        a = a.return;
      } while (null !== a);
      return null;
    }
    function Wi(a, b, c, d, e) {
      if (0 === (a.mode & 1))
        return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;
      a.flags |= 65536;
      a.lanes = e;
      return a;
    }
    var Xi = ua.ReactCurrentOwner;
    var Ug = false;
    function Yi(a, b, c, d) {
      b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);
    }
    function Zi(a, b, c, d, e) {
      c = c.render;
      var f = b.ref;
      Tg(b, e);
      d = Xh(a, b, c, d, f, e);
      c = bi();
      if (null !== a && !Ug)
        return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
      I && c && vg(b);
      b.flags |= 1;
      Yi(a, b, d, e);
      return b.child;
    }
    function aj(a, b, c, d, e) {
      if (null === a) {
        var f = c.type;
        if ("function" === typeof f && !bj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps)
          return b.tag = 15, b.type = f, cj(a, b, f, d, e);
        a = yh(c.type, null, d, b, b.mode, e);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      f = a.child;
      if (0 === (a.lanes & e)) {
        var g = f.memoizedProps;
        c = c.compare;
        c = null !== c ? c : Ie;
        if (c(g, d) && a.ref === b.ref)
          return $i(a, b, e);
      }
      b.flags |= 1;
      a = wh(f, d);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    function cj(a, b, c, d, e) {
      if (null !== a) {
        var f = a.memoizedProps;
        if (Ie(f, d) && a.ref === b.ref)
          if (Ug = false, b.pendingProps = d = f, 0 !== (a.lanes & e))
            0 !== (a.flags & 131072) && (Ug = true);
          else
            return b.lanes = a.lanes, $i(a, b, e);
      }
      return dj(a, b, c, d, e);
    }
    function ej(a, b, c) {
      var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
      if ("hidden" === d.mode)
        if (0 === (b.mode & 1))
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= c;
        else {
          if (0 === (c & 1073741824))
            return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(fj, gj), gj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(fj, gj);
          gj |= d;
        }
      else
        null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(fj, gj), gj |= d;
      Yi(a, b, e, c);
      return b.child;
    }
    function hj(a, b) {
      var c = b.ref;
      if (null === a && null !== c || null !== a && a.ref !== c)
        b.flags |= 512, b.flags |= 2097152;
    }
    function dj(a, b, c, d, e) {
      var f = Zf(c) ? Xf : H.current;
      f = Yf(b, f);
      Tg(b, e);
      c = Xh(a, b, c, d, f, e);
      d = bi();
      if (null !== a && !Ug)
        return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
      I && d && vg(b);
      b.flags |= 1;
      Yi(a, b, c, e);
      return b.child;
    }
    function ij(a, b, c, d, e) {
      if (Zf(c)) {
        var f = true;
        cg(b);
      } else
        f = false;
      Tg(b, e);
      if (null === b.stateNode)
        jj(a, b), ph(b, c, d), rh(b, c, d, e), d = true;
      else if (null === a) {
        var g = b.stateNode, h = b.memoizedProps;
        g.props = h;
        var k = g.context, l = c.contextType;
        "object" === typeof l && null !== l ? l = Vg(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
        var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
        q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && qh(b, g, d, l);
        $g = false;
        var r = b.memoizedState;
        g.state = r;
        gh(b, d, g, e);
        k = b.memoizedState;
        h !== d || r !== k || Wf.current || $g ? ("function" === typeof m && (kh(b, c, m, d), k = b.memoizedState), (h = $g || oh(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
      } else {
        g = b.stateNode;
        bh(a, b);
        h = b.memoizedProps;
        l = b.type === b.elementType ? h : Lg(b.type, h);
        g.props = l;
        q = b.pendingProps;
        r = g.context;
        k = c.contextType;
        "object" === typeof k && null !== k ? k = Vg(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
        var y = c.getDerivedStateFromProps;
        (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && qh(b, g, d, k);
        $g = false;
        r = b.memoizedState;
        g.state = r;
        gh(b, d, g, e);
        var n = b.memoizedState;
        h !== q || r !== n || Wf.current || $g ? ("function" === typeof y && (kh(b, c, y, d), n = b.memoizedState), (l = $g || oh(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
      }
      return kj(a, b, c, d, f, e);
    }
    function kj(a, b, c, d, e, f) {
      hj(a, b);
      var g = 0 !== (b.flags & 128);
      if (!d && !g)
        return e && dg(b, c, false), $i(a, b, f);
      d = b.stateNode;
      Xi.current = b;
      var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
      b.flags |= 1;
      null !== a && g ? (b.child = Bh(b, a.child, null, f), b.child = Bh(b, null, h, f)) : Yi(a, b, h, f);
      b.memoizedState = d.state;
      e && dg(b, c, true);
      return b.child;
    }
    function lj(a) {
      var b = a.stateNode;
      b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
      Ih(a, b.containerInfo);
    }
    function mj(a, b, c, d, e) {
      Ig();
      Jg(e);
      b.flags |= 256;
      Yi(a, b, c, d);
      return b.child;
    }
    var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
    function oj(a) {
      return { baseLanes: a, cachePool: null, transitions: null };
    }
    function pj(a, b, c) {
      var d = b.pendingProps, e = M.current, f = false, g = 0 !== (b.flags & 128), h;
      (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
      if (h)
        f = true, b.flags &= -129;
      else if (null === a || null !== a.memoizedState)
        e |= 1;
      G(M, e & 1);
      if (null === a) {
        Eg(b);
        a = b.memoizedState;
        if (null !== a && (a = a.dehydrated, null !== a))
          return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
        g = d.children;
        a = d.fallback;
        return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = qj(g, d, 0, null), a = Ah(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = oj(c), b.memoizedState = nj, a) : rj(b, g);
      }
      e = a.memoizedState;
      if (null !== e && (h = e.dehydrated, null !== h))
        return sj(a, b, g, d, h, e, c);
      if (f) {
        f = d.fallback;
        g = b.mode;
        e = a.child;
        h = e.sibling;
        var k = { mode: "hidden", children: d.children };
        0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = wh(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
        null !== h ? f = wh(h, f) : (f = Ah(f, g, c, null), f.flags |= 2);
        f.return = b;
        d.return = b;
        d.sibling = f;
        b.child = d;
        d = f;
        f = b.child;
        g = a.child.memoizedState;
        g = null === g ? oj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
        f.memoizedState = g;
        f.childLanes = a.childLanes & ~c;
        b.memoizedState = nj;
        return d;
      }
      f = a.child;
      a = f.sibling;
      d = wh(f, { mode: "visible", children: d.children });
      0 === (b.mode & 1) && (d.lanes = c);
      d.return = b;
      d.sibling = null;
      null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
      b.child = d;
      b.memoizedState = null;
      return d;
    }
    function rj(a, b) {
      b = qj({ mode: "visible", children: b }, a.mode, 0, null);
      b.return = a;
      return a.child = b;
    }
    function tj(a, b, c, d) {
      null !== d && Jg(d);
      Bh(b, a.child, null, c);
      a = rj(b, b.pendingProps.children);
      a.flags |= 2;
      b.memoizedState = null;
      return a;
    }
    function sj(a, b, c, d, e, f, g) {
      if (c) {
        if (b.flags & 256)
          return b.flags &= -257, d = Li(Error(p(422))), tj(a, b, g, d);
        if (null !== b.memoizedState)
          return b.child = a.child, b.flags |= 128, null;
        f = d.fallback;
        e = b.mode;
        d = qj({ mode: "visible", children: d.children }, e, 0, null);
        f = Ah(f, e, g, null);
        f.flags |= 2;
        d.return = b;
        f.return = b;
        d.sibling = f;
        b.child = d;
        0 !== (b.mode & 1) && Bh(b, a.child, null, g);
        b.child.memoizedState = oj(g);
        b.memoizedState = nj;
        return f;
      }
      if (0 === (b.mode & 1))
        return tj(a, b, g, null);
      if ("$!" === e.data) {
        d = e.nextSibling && e.nextSibling.dataset;
        if (d)
          var h = d.dgst;
        d = h;
        f = Error(p(419));
        d = Li(f, d, void 0);
        return tj(a, b, g, d);
      }
      h = 0 !== (g & a.childLanes);
      if (Ug || h) {
        d = R;
        if (null !== d) {
          switch (g & -g) {
            case 4:
              e = 2;
              break;
            case 16:
              e = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              e = 32;
              break;
            case 536870912:
              e = 268435456;
              break;
            default:
              e = 0;
          }
          e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
          0 !== e && e !== f.retryLane && (f.retryLane = e, Zg(a, e), mh(d, a, e, -1));
        }
        uj();
        d = Li(Error(p(421)));
        return tj(a, b, g, d);
      }
      if ("$?" === e.data)
        return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), e._reactRetry = b, null;
      a = f.treeContext;
      yg = Lf(e.nextSibling);
      xg = b;
      I = true;
      zg = null;
      null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
      b = rj(b, d.children);
      b.flags |= 4096;
      return b;
    }
    function wj(a, b, c) {
      a.lanes |= b;
      var d = a.alternate;
      null !== d && (d.lanes |= b);
      Sg(a.return, b, c);
    }
    function xj(a, b, c, d, e) {
      var f = a.memoizedState;
      null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
    }
    function yj(a, b, c) {
      var d = b.pendingProps, e = d.revealOrder, f = d.tail;
      Yi(a, b, d.children, c);
      d = M.current;
      if (0 !== (d & 2))
        d = d & 1 | 2, b.flags |= 128;
      else {
        if (null !== a && 0 !== (a.flags & 128))
          a:
            for (a = b.child; null !== a; ) {
              if (13 === a.tag)
                null !== a.memoizedState && wj(a, c, b);
              else if (19 === a.tag)
                wj(a, c, b);
              else if (null !== a.child) {
                a.child.return = a;
                a = a.child;
                continue;
              }
              if (a === b)
                break a;
              for (; null === a.sibling; ) {
                if (null === a.return || a.return === b)
                  break a;
                a = a.return;
              }
              a.sibling.return = a.return;
              a = a.sibling;
            }
        d &= 1;
      }
      G(M, d);
      if (0 === (b.mode & 1))
        b.memoizedState = null;
      else
        switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; )
              a = c.alternate, null !== a && null === Mh(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            xj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Mh(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            xj(b, true, c, null, f);
            break;
          case "together":
            xj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
      return b.child;
    }
    function jj(a, b) {
      0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
    }
    function $i(a, b, c) {
      null !== a && (b.dependencies = a.dependencies);
      hh |= b.lanes;
      if (0 === (c & b.childLanes))
        return null;
      if (null !== a && b.child !== a.child)
        throw Error(p(153));
      if (null !== b.child) {
        a = b.child;
        c = wh(a, a.pendingProps);
        b.child = c;
        for (c.return = b; null !== a.sibling; )
          a = a.sibling, c = c.sibling = wh(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    function zj(a, b, c) {
      switch (b.tag) {
        case 3:
          lj(b);
          Ig();
          break;
        case 5:
          Kh(b);
          break;
        case 1:
          Zf(b.type) && cg(b);
          break;
        case 4:
          Ih(b, b.stateNode.containerInfo);
          break;
        case 10:
          var d = b.type._context, e = b.memoizedProps.value;
          G(Mg, d._currentValue);
          d._currentValue = e;
          break;
        case 13:
          d = b.memoizedState;
          if (null !== d) {
            if (null !== d.dehydrated)
              return G(M, M.current & 1), b.flags |= 128, null;
            if (0 !== (c & b.child.childLanes))
              return pj(a, b, c);
            G(M, M.current & 1);
            a = $i(a, b, c);
            return null !== a ? a.sibling : null;
          }
          G(M, M.current & 1);
          break;
        case 19:
          d = 0 !== (c & b.childLanes);
          if (0 !== (a.flags & 128)) {
            if (d)
              return yj(a, b, c);
            b.flags |= 128;
          }
          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          G(M, M.current);
          if (d)
            break;
          else
            return null;
        case 22:
        case 23:
          return b.lanes = 0, ej(a, b, c);
      }
      return $i(a, b, c);
    }
    var Aj;
    var Bj;
    var Cj;
    var Dj;
    Aj = function(a, b) {
      for (var c = b.child; null !== c; ) {
        if (5 === c.tag || 6 === c.tag)
          a.appendChild(c.stateNode);
        else if (4 !== c.tag && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b)
          break;
        for (; null === c.sibling; ) {
          if (null === c.return || c.return === b)
            return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    };
    Bj = function() {
    };
    Cj = function(a, b, c, d) {
      var e = a.memoizedProps;
      if (e !== d) {
        a = b.stateNode;
        Hh(Eh.current);
        var f = null;
        switch (c) {
          case "input":
            e = Ya(a, e);
            d = Ya(a, d);
            f = [];
            break;
          case "select":
            e = A({}, e, { value: void 0 });
            d = A({}, d, { value: void 0 });
            f = [];
            break;
          case "textarea":
            e = gb(a, e);
            d = gb(a, d);
            f = [];
            break;
          default:
            "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
        }
        ub(c, d);
        var g;
        c = null;
        for (l in e)
          if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l])
            if ("style" === l) {
              var h = e[l];
              for (g in h)
                h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
            } else
              "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
        for (l in d) {
          var k = d[l];
          h = null != e ? e[l] : void 0;
          if (d.hasOwnProperty(l) && k !== h && (null != k || null != h))
            if ("style" === l)
              if (h) {
                for (g in h)
                  !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
                for (g in k)
                  k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
              } else
                c || (f || (f = []), f.push(
                  l,
                  c
                )), c = k;
            else
              "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
        }
        c && (f = f || []).push("style", c);
        var l = f;
        if (b.updateQueue = l)
          b.flags |= 4;
      }
    };
    Dj = function(a, b, c, d) {
      c !== d && (b.flags |= 4);
    };
    function Ej(a, b) {
      if (!I)
        switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; )
              null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; )
              null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
    }
    function S(a) {
      var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
      if (b)
        for (var e = a.child; null !== e; )
          c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
      else
        for (e = a.child; null !== e; )
          c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
      a.subtreeFlags |= d;
      a.childLanes = c;
      return b;
    }
    function Fj(a, b, c) {
      var d = b.pendingProps;
      wg(b);
      switch (b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return S(b), null;
        case 1:
          return Zf(b.type) && $f(), S(b), null;
        case 3:
          d = b.stateNode;
          Jh();
          E(Wf);
          E(H);
          Oh();
          d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
          if (null === a || null === a.child)
            Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Gj(zg), zg = null));
          Bj(a, b);
          S(b);
          return null;
        case 5:
          Lh(b);
          var e = Hh(Gh.current);
          c = b.type;
          if (null !== a && null != b.stateNode)
            Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          else {
            if (!d) {
              if (null === b.stateNode)
                throw Error(p(166));
              S(b);
              return null;
            }
            a = Hh(Eh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.type;
              var f = b.memoizedProps;
              d[Of] = b;
              d[Pf] = f;
              a = 0 !== (b.mode & 1);
              switch (c) {
                case "dialog":
                  D("cancel", d);
                  D("close", d);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", d);
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++)
                    D(lf[e], d);
                  break;
                case "source":
                  D("error", d);
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    d
                  );
                  D("load", d);
                  break;
                case "details":
                  D("toggle", d);
                  break;
                case "input":
                  Za(d, f);
                  D("invalid", d);
                  break;
                case "select":
                  d._wrapperState = { wasMultiple: !!f.multiple };
                  D("invalid", d);
                  break;
                case "textarea":
                  hb(d, f), D("invalid", d);
              }
              ub(c, f);
              e = null;
              for (var g in f)
                if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
              switch (c) {
                case "input":
                  Va(d);
                  db(d, f, true);
                  break;
                case "textarea":
                  Va(d);
                  jb(d);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  "function" === typeof f.onClick && (d.onclick = Bf);
              }
              d = e;
              b.updateQueue = d;
              null !== d && (b.flags |= 4);
            } else {
              g = 9 === e.nodeType ? e : e.ownerDocument;
              "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
              "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
              a[Of] = b;
              a[Pf] = d;
              Aj(a, b, false, false);
              b.stateNode = a;
              a: {
                g = vb(c, d);
                switch (c) {
                  case "dialog":
                    D("cancel", a);
                    D("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++)
                      D(lf[e], a);
                    e = d;
                    break;
                  case "source":
                    D("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      a
                    );
                    D("load", a);
                    e = d;
                    break;
                  case "details":
                    D("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    D("invalid", a);
                    break;
                  case "option":
                    e = d;
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = A({}, d, { value: void 0 });
                    D("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    D("invalid", a);
                    break;
                  default:
                    e = d;
                }
                ub(c, e);
                h = e;
                for (f in h)
                  if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                switch (c) {
                  case "input":
                    Va(a);
                    db(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f = d.value;
                    null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                      a,
                      !!d.multiple,
                      d.defaultValue,
                      true
                    );
                    break;
                  default:
                    "function" === typeof e.onClick && (a.onclick = Bf);
                }
                switch (c) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    d = !!d.autoFocus;
                    break a;
                  case "img":
                    d = true;
                    break a;
                  default:
                    d = false;
                }
              }
              d && (b.flags |= 4);
            }
            null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
          }
          S(b);
          return null;
        case 6:
          if (a && null != b.stateNode)
            Dj(a, b, a.memoizedProps, d);
          else {
            if ("string" !== typeof d && null === b.stateNode)
              throw Error(p(166));
            c = Hh(Gh.current);
            Hh(Eh.current);
            if (Gg(b)) {
              d = b.stateNode;
              c = b.memoizedProps;
              d[Of] = b;
              if (f = d.nodeValue !== c) {
                if (a = xg, null !== a)
                  switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
              }
              f && (b.flags |= 4);
            } else
              d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
          }
          S(b);
          return null;
        case 13:
          E(M);
          d = b.memoizedState;
          if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
            if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
              Hg(), Ig(), b.flags |= 98560, f = false;
            else if (f = Gg(b), null !== d && null !== d.dehydrated) {
              if (null === a) {
                if (!f)
                  throw Error(p(318));
                f = b.memoizedState;
                f = null !== f ? f.dehydrated : null;
                if (!f)
                  throw Error(p(317));
                f[Of] = b;
              } else
                Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
              S(b);
              f = false;
            } else
              null !== zg && (Gj(zg), zg = null), f = true;
            if (!f)
              return b.flags & 65536 ? b : null;
          }
          if (0 !== (b.flags & 128))
            return b.lanes = c, b;
          d = null !== d;
          d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M.current & 1) ? 0 === T && (T = 3) : uj()));
          null !== b.updateQueue && (b.flags |= 4);
          S(b);
          return null;
        case 4:
          return Jh(), Bj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
        case 10:
          return Rg(b.type._context), S(b), null;
        case 17:
          return Zf(b.type) && $f(), S(b), null;
        case 19:
          E(M);
          f = b.memoizedState;
          if (null === f)
            return S(b), null;
          d = 0 !== (b.flags & 128);
          g = f.rendering;
          if (null === g)
            if (d)
              Ej(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128))
                for (a = b.child; null !== a; ) {
                  g = Mh(a);
                  if (null !== g) {
                    b.flags |= 128;
                    Ej(f, false);
                    d = g.updateQueue;
                    null !== d && (b.updateQueue = d, b.flags |= 4);
                    b.subtreeFlags = 0;
                    d = c;
                    for (c = b.child; null !== c; )
                      f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                    G(M, M.current & 1 | 2);
                    return b.child;
                  }
                  a = a.sibling;
                }
              null !== f.tail && B() > Hj && (b.flags |= 128, d = true, Ej(f, false), b.lanes = 4194304);
            }
          else {
            if (!d)
              if (a = Mh(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Ej(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I)
                  return S(b), null;
              } else
                2 * B() - f.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, d = true, Ej(f, false), b.lanes = 4194304);
            f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
          }
          if (null !== f.tail)
            return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = M.current, G(M, d ? c & 1 | 2 : c & 1), b;
          S(b);
          return null;
        case 22:
        case 23:
          return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(p(156, b.tag));
    }
    function Jj(a, b) {
      wg(b);
      switch (b.tag) {
        case 1:
          return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 3:
          return Jh(), E(Wf), E(H), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
        case 5:
          return Lh(b), null;
        case 13:
          E(M);
          a = b.memoizedState;
          if (null !== a && null !== a.dehydrated) {
            if (null === b.alternate)
              throw Error(p(340));
            Ig();
          }
          a = b.flags;
          return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
        case 19:
          return E(M), null;
        case 4:
          return Jh(), null;
        case 10:
          return Rg(b.type._context), null;
        case 22:
        case 23:
          return Ij(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Kj = false;
    var U = false;
    var Lj = "function" === typeof WeakSet ? WeakSet : Set;
    var V = null;
    function Mj(a, b) {
      var c = a.ref;
      if (null !== c)
        if ("function" === typeof c)
          try {
            c(null);
          } catch (d) {
            W(a, b, d);
          }
        else
          c.current = null;
    }
    function Nj(a, b, c) {
      try {
        c();
      } catch (d) {
        W(a, b, d);
      }
    }
    var Oj = false;
    function Pj(a, b) {
      Cf = dd;
      a = Me();
      if (Ne(a)) {
        if ("selectionStart" in a)
          var c = { start: a.selectionStart, end: a.selectionEnd };
        else
          a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b:
                for (; ; ) {
                  for (var y; ; ) {
                    q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                    q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                    3 === q.nodeType && (g += q.nodeValue.length);
                    if (null === (y = q.firstChild))
                      break;
                    r = q;
                    q = y;
                  }
                  for (; ; ) {
                    if (q === a)
                      break b;
                    r === c && ++l === e && (h = g);
                    r === f && ++m === d && (k = g);
                    if (null !== (y = q.nextSibling))
                      break;
                    q = r;
                    r = q.parentNode;
                  }
                  q = y;
                }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else
              c = null;
          }
        c = c || { start: 0, end: 0 };
      } else
        c = null;
      Df = { focusedElem: a, selectionRange: c };
      dd = false;
      for (V = b; null !== V; )
        if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a)
          a.return = b, V = a;
        else
          for (; null !== V; ) {
            b = V;
            try {
              var n = b.alternate;
              if (0 !== (b.flags & 1024))
                switch (b.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (null !== n) {
                      var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Lg(b.type, t), J);
                      x.__reactInternalSnapshotBeforeUpdate = w;
                    }
                    break;
                  case 3:
                    var u = b.stateNode.containerInfo;
                    1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(p(163));
                }
            } catch (F) {
              W(b, b.return, F);
            }
            a = b.sibling;
            if (null !== a) {
              a.return = b.return;
              V = a;
              break;
            }
            V = b.return;
          }
      n = Oj;
      Oj = false;
      return n;
    }
    function Qj(a, b, c) {
      var d = b.updateQueue;
      d = null !== d ? d.lastEffect : null;
      if (null !== d) {
        var e = d = d.next;
        do {
          if ((e.tag & a) === a) {
            var f = e.destroy;
            e.destroy = void 0;
            void 0 !== f && Nj(b, c, f);
          }
          e = e.next;
        } while (e !== d);
      }
    }
    function Rj(a, b) {
      b = b.updateQueue;
      b = null !== b ? b.lastEffect : null;
      if (null !== b) {
        var c = b = b.next;
        do {
          if ((c.tag & a) === a) {
            var d = c.create;
            c.destroy = d();
          }
          c = c.next;
        } while (c !== b);
      }
    }
    function Sj(a) {
      var b = a.ref;
      if (null !== b) {
        var c = a.stateNode;
        switch (a.tag) {
          case 5:
            a = c;
            break;
          default:
            a = c;
        }
        "function" === typeof b ? b(a) : b.current = a;
      }
    }
    function Tj(a) {
      var b = a.alternate;
      null !== b && (a.alternate = null, Tj(b));
      a.child = null;
      a.deletions = null;
      a.sibling = null;
      5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
      a.stateNode = null;
      a.return = null;
      a.dependencies = null;
      a.memoizedProps = null;
      a.memoizedState = null;
      a.pendingProps = null;
      a.stateNode = null;
      a.updateQueue = null;
    }
    function Uj(a) {
      return 5 === a.tag || 3 === a.tag || 4 === a.tag;
    }
    function Vj(a) {
      a:
        for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Uj(a.return))
              return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2)
              continue a;
            if (null === a.child || 4 === a.tag)
              continue a;
            else
              a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2))
            return a.stateNode;
        }
    }
    function Wj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d)
        a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
      else if (4 !== d && (a = a.child, null !== a))
        for (Wj(a, b, c), a = a.sibling; null !== a; )
          Wj(a, b, c), a = a.sibling;
    }
    function Xj(a, b, c) {
      var d = a.tag;
      if (5 === d || 6 === d)
        a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
      else if (4 !== d && (a = a.child, null !== a))
        for (Xj(a, b, c), a = a.sibling; null !== a; )
          Xj(a, b, c), a = a.sibling;
    }
    var X = null;
    var Yj = false;
    function Zj(a, b, c) {
      for (c = c.child; null !== c; )
        ak(a, b, c), c = c.sibling;
    }
    function ak(a, b, c) {
      if (lc && "function" === typeof lc.onCommitFiberUnmount)
        try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
      switch (c.tag) {
        case 5:
          U || Mj(c, b);
        case 6:
          var d = X, e = Yj;
          X = null;
          Zj(a, b, c);
          X = d;
          Yj = e;
          null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
          break;
        case 18:
          null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
          break;
        case 4:
          d = X;
          e = Yj;
          X = c.stateNode.containerInfo;
          Yj = true;
          Zj(a, b, c);
          X = d;
          Yj = e;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
            e = d = d.next;
            do {
              var f = e, g = f.destroy;
              f = f.tag;
              void 0 !== g && (0 !== (f & 2) ? Nj(c, b, g) : 0 !== (f & 4) && Nj(c, b, g));
              e = e.next;
            } while (e !== d);
          }
          Zj(a, b, c);
          break;
        case 1:
          if (!U && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
            try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
          Zj(a, b, c);
          break;
        case 21:
          Zj(a, b, c);
          break;
        case 22:
          c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Zj(a, b, c), U = d) : Zj(a, b, c);
          break;
        default:
          Zj(a, b, c);
      }
    }
    function bk(a) {
      var b = a.updateQueue;
      if (null !== b) {
        a.updateQueue = null;
        var c = a.stateNode;
        null === c && (c = a.stateNode = new Lj());
        b.forEach(function(b2) {
          var d = ck.bind(null, a, b2);
          c.has(b2) || (c.add(b2), b2.then(d, d));
        });
      }
    }
    function dk(a, b) {
      var c = b.deletions;
      if (null !== c)
        for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a:
              for (; null !== h; ) {
                switch (h.tag) {
                  case 5:
                    X = h.stateNode;
                    Yj = false;
                    break a;
                  case 3:
                    X = h.stateNode.containerInfo;
                    Yj = true;
                    break a;
                  case 4:
                    X = h.stateNode.containerInfo;
                    Yj = true;
                    break a;
                }
                h = h.return;
              }
            if (null === X)
              throw Error(p(160));
            ak(f, g, e);
            X = null;
            Yj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
      if (b.subtreeFlags & 12854)
        for (b = b.child; null !== b; )
          ek(b, a), b = b.sibling;
    }
    function ek(a, b) {
      var c = a.alternate, d = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          dk(b, a);
          fk(a);
          if (d & 4) {
            try {
              Qj(3, a, a.return), Rj(3, a);
            } catch (t) {
              W(a, a.return, t);
            }
            try {
              Qj(5, a, a.return);
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 1:
          dk(b, a);
          fk(a);
          d & 512 && null !== c && Mj(c, c.return);
          break;
        case 5:
          dk(b, a);
          fk(a);
          d & 512 && null !== c && Mj(c, c.return);
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              ob(e, "");
            } catch (t) {
              W(a, a.return, t);
            }
          }
          if (d & 4 && (e = a.stateNode, null != e)) {
            var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
            a.updateQueue = null;
            if (null !== k)
              try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
          }
          break;
        case 6:
          dk(b, a);
          fk(a);
          if (d & 4) {
            if (null === a.stateNode)
              throw Error(p(162));
            e = a.stateNode;
            f = a.memoizedProps;
            try {
              e.nodeValue = f;
            } catch (t) {
              W(a, a.return, t);
            }
          }
          break;
        case 3:
          dk(b, a);
          fk(a);
          if (d & 4 && null !== c && c.memoizedState.isDehydrated)
            try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
          break;
        case 4:
          dk(b, a);
          fk(a);
          break;
        case 13:
          dk(b, a);
          fk(a);
          e = a.child;
          e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B()));
          d & 4 && bk(a);
          break;
        case 22:
          m = null !== c && null !== c.memoizedState;
          a.mode & 1 ? (U = (l = U) || m, dk(b, a), U = l) : dk(b, a);
          fk(a);
          if (d & 8192) {
            l = null !== a.memoizedState;
            if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1))
              for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Qj(4, r, r.return);
                      break;
                    case 1:
                      Mj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Mj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        hk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : hk(q);
                }
                m = m.sibling;
              }
            a:
              for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m)
                    try {
                      q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                    } catch (t) {
                      W(a, a.return, t);
                    }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a)
                  break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a)
                    break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
          }
          break;
        case 19:
          dk(b, a);
          fk(a);
          d & 4 && bk(a);
          break;
        case 21:
          break;
        default:
          dk(
            b,
            a
          ), fk(a);
      }
    }
    function fk(a) {
      var b = a.flags;
      if (b & 2) {
        try {
          a: {
            for (var c = a.return; null !== c; ) {
              if (Uj(c)) {
                var d = c;
                break a;
              }
              c = c.return;
            }
            throw Error(p(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (ob(e, ""), d.flags &= -33);
              var f = Vj(a);
              Xj(a, f, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo, h = Vj(a);
              Wj(a, h, g);
              break;
            default:
              throw Error(p(161));
          }
        } catch (k) {
          W(a, a.return, k);
        }
        a.flags &= -3;
      }
      b & 4096 && (a.flags &= -4097);
    }
    function ik(a, b, c) {
      V = a;
      jk(a, b, c);
    }
    function jk(a, b, c) {
      for (var d = 0 !== (a.mode & 1); null !== V; ) {
        var e = V, f = e.child;
        if (22 === e.tag && d) {
          var g = null !== e.memoizedState || Kj;
          if (!g) {
            var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
            h = Kj;
            var l = U;
            Kj = g;
            if ((U = k) && !l)
              for (V = e; null !== V; )
                g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k ? (k.return = g, V = k) : kk(e);
            for (; null !== f; )
              V = f, jk(f, b, c), f = f.sibling;
            V = e;
            Kj = h;
            U = l;
          }
          lk(a, b, c);
        } else
          0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : lk(a, b, c);
      }
    }
    function lk(a) {
      for (; null !== V; ) {
        var b = V;
        if (0 !== (b.flags & 8772)) {
          var c = b.alternate;
          try {
            if (0 !== (b.flags & 8772))
              switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Rj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U)
                    if (null === c)
                      d.componentDidMount();
                    else {
                      var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);
                      d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                    }
                  var f = b.updateQueue;
                  null !== f && ih(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child)
                      switch (b.child.tag) {
                        case 5:
                          c = b.child.stateNode;
                          break;
                        case 1:
                          c = b.child.stateNode;
                      }
                    ih(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
            U || b.flags & 512 && Sj(b);
          } catch (r) {
            W(b, b.return, r);
          }
        }
        if (b === a) {
          V = null;
          break;
        }
        c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function hk(a) {
      for (; null !== V; ) {
        var b = V;
        if (b === a) {
          V = null;
          break;
        }
        var c = b.sibling;
        if (null !== c) {
          c.return = b.return;
          V = c;
          break;
        }
        V = b.return;
      }
    }
    function kk(a) {
      for (; null !== V; ) {
        var b = V;
        try {
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              var c = b.return;
              try {
                Rj(4, b);
              } catch (k) {
                W(b, c, k);
              }
              break;
            case 1:
              var d = b.stateNode;
              if ("function" === typeof d.componentDidMount) {
                var e = b.return;
                try {
                  d.componentDidMount();
                } catch (k) {
                  W(b, e, k);
                }
              }
              var f = b.return;
              try {
                Sj(b);
              } catch (k) {
                W(b, f, k);
              }
              break;
            case 5:
              var g = b.return;
              try {
                Sj(b);
              } catch (k) {
                W(b, g, k);
              }
          }
        } catch (k) {
          W(b, b.return, k);
        }
        if (b === a) {
          V = null;
          break;
        }
        var h = b.sibling;
        if (null !== h) {
          h.return = b.return;
          V = h;
          break;
        }
        V = b.return;
      }
    }
    var mk = Math.ceil;
    var nk = ua.ReactCurrentDispatcher;
    var ok = ua.ReactCurrentOwner;
    var pk = ua.ReactCurrentBatchConfig;
    var K = 0;
    var R = null;
    var Y = null;
    var Z = 0;
    var gj = 0;
    var fj = Uf(0);
    var T = 0;
    var qk = null;
    var hh = 0;
    var rk = 0;
    var sk = 0;
    var tk = null;
    var uk = null;
    var gk = 0;
    var Hj = Infinity;
    var vk = null;
    var Pi = false;
    var Qi = null;
    var Si = null;
    var wk = false;
    var xk = null;
    var yk = 0;
    var zk = 0;
    var Ak = null;
    var Bk = -1;
    var Ck = 0;
    function L() {
      return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();
    }
    function lh(a) {
      if (0 === (a.mode & 1))
        return 1;
      if (0 !== (K & 2) && 0 !== Z)
        return Z & -Z;
      if (null !== Kg.transition)
        return 0 === Ck && (Ck = yc()), Ck;
      a = C;
      if (0 !== a)
        return a;
      a = window.event;
      a = void 0 === a ? 16 : jd(a.type);
      return a;
    }
    function mh(a, b, c, d) {
      if (50 < zk)
        throw zk = 0, Ak = null, Error(p(185));
      Ac(a, c, d);
      if (0 === (K & 2) || a !== R)
        a === R && (0 === (K & 2) && (rk |= c), 4 === T && Dk(a, Z)), Ek(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Hj = B() + 500, fg && jg());
    }
    function Ek(a, b) {
      var c = a.callbackNode;
      wc(a, b);
      var d = uc(a, a === R ? Z : 0);
      if (0 === d)
        null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
      else if (b = d & -d, a.callbackPriority !== b) {
        null != c && bc(c);
        if (1 === b)
          0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
        else {
          switch (Dc(d)) {
            case 1:
              c = fc;
              break;
            case 4:
              c = gc;
              break;
            case 16:
              c = hc;
              break;
            case 536870912:
              c = jc;
              break;
            default:
              c = hc;
          }
          c = Gk(c, Hk.bind(null, a));
        }
        a.callbackPriority = b;
        a.callbackNode = c;
      }
    }
    function Hk(a, b) {
      Bk = -1;
      Ck = 0;
      if (0 !== (K & 6))
        throw Error(p(327));
      var c = a.callbackNode;
      if (Ik() && a.callbackNode !== c)
        return null;
      var d = uc(a, a === R ? Z : 0);
      if (0 === d)
        return null;
      if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
        b = Jk(a, d);
      else {
        b = d;
        var e = K;
        K |= 2;
        var f = Kk();
        if (R !== a || Z !== b)
          vk = null, Hj = B() + 500, Lk(a, b);
        do
          try {
            Mk();
            break;
          } catch (h) {
            Nk(a, h);
          }
        while (1);
        Qg();
        nk.current = f;
        K = e;
        null !== Y ? b = 0 : (R = null, Z = 0, b = T);
      }
      if (0 !== b) {
        2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));
        if (1 === b)
          throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
        if (6 === b)
          Dk(a, d);
        else {
          e = a.current.alternate;
          if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Ok(a, f))), 1 === b))
            throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
          a.finishedWork = e;
          a.finishedLanes = d;
          switch (b) {
            case 0:
            case 1:
              throw Error(p(345));
            case 2:
              Qk(a, uk, vk);
              break;
            case 3:
              Dk(a, d);
              if ((d & 130023424) === d && (b = gk + 500 - B(), 10 < b)) {
                if (0 !== uc(a, 0))
                  break;
                e = a.suspendedLanes;
                if ((e & d) !== d) {
                  L();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);
                break;
              }
              Qk(a, uk, vk);
              break;
            case 4:
              Dk(a, d);
              if ((d & 4194240) === d)
                break;
              b = a.eventTimes;
              for (e = -1; 0 < d; ) {
                var g = 31 - oc(d);
                f = 1 << g;
                g = b[g];
                g > e && (e = g);
                d &= ~f;
              }
              d = e;
              d = B() - d;
              d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
              if (10 < d) {
                a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);
                break;
              }
              Qk(a, uk, vk);
              break;
            case 5:
              Qk(a, uk, vk);
              break;
            default:
              throw Error(p(329));
          }
        }
      }
      Ek(a, B());
      return a.callbackNode === c ? Hk.bind(null, a) : null;
    }
    function Ok(a, b) {
      var c = tk;
      a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);
      a = Jk(a, b);
      2 !== a && (b = uk, uk = c, null !== b && Gj(b));
      return a;
    }
    function Gj(a) {
      null === uk ? uk = a : uk.push.apply(uk, a);
    }
    function Pk(a) {
      for (var b = a; ; ) {
        if (b.flags & 16384) {
          var c = b.updateQueue;
          if (null !== c && (c = c.stores, null !== c))
            for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e))
                  return false;
              } catch (g) {
                return false;
              }
            }
        }
        c = b.child;
        if (b.subtreeFlags & 16384 && null !== c)
          c.return = b, b = c;
        else {
          if (b === a)
            break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a)
              return true;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
      }
      return true;
    }
    function Dk(a, b) {
      b &= ~sk;
      b &= ~rk;
      a.suspendedLanes |= b;
      a.pingedLanes &= ~b;
      for (a = a.expirationTimes; 0 < b; ) {
        var c = 31 - oc(b), d = 1 << c;
        a[c] = -1;
        b &= ~d;
      }
    }
    function Fk(a) {
      if (0 !== (K & 6))
        throw Error(p(327));
      Ik();
      var b = uc(a, 0);
      if (0 === (b & 1))
        return Ek(a, B()), null;
      var c = Jk(a, b);
      if (0 !== a.tag && 2 === c) {
        var d = xc(a);
        0 !== d && (b = d, c = Ok(a, d));
      }
      if (1 === c)
        throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B()), c;
      if (6 === c)
        throw Error(p(345));
      a.finishedWork = a.current.alternate;
      a.finishedLanes = b;
      Qk(a, uk, vk);
      Ek(a, B());
      return null;
    }
    function Rk(a, b) {
      var c = K;
      K |= 1;
      try {
        return a(b);
      } finally {
        K = c, 0 === K && (Hj = B() + 500, fg && jg());
      }
    }
    function Sk(a) {
      null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();
      var b = K;
      K |= 1;
      var c = pk.transition, d = C;
      try {
        if (pk.transition = null, C = 1, a)
          return a();
      } finally {
        C = d, pk.transition = c, K = b, 0 === (K & 6) && jg();
      }
    }
    function Ij() {
      gj = fj.current;
      E(fj);
    }
    function Lk(a, b) {
      a.finishedWork = null;
      a.finishedLanes = 0;
      var c = a.timeoutHandle;
      -1 !== c && (a.timeoutHandle = -1, Gf(c));
      if (null !== Y)
        for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              Jh();
              E(Wf);
              E(H);
              Oh();
              break;
            case 5:
              Lh(d);
              break;
            case 4:
              Jh();
              break;
            case 13:
              E(M);
              break;
            case 19:
              E(M);
              break;
            case 10:
              Rg(d.type._context);
              break;
            case 22:
            case 23:
              Ij();
          }
          c = c.return;
        }
      R = a;
      Y = a = wh(a.current, null);
      Z = gj = b;
      T = 0;
      qk = null;
      sk = rk = hh = 0;
      uk = tk = null;
      if (null !== Wg) {
        for (b = 0; b < Wg.length; b++)
          if (c = Wg[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
        Wg = null;
      }
      return a;
    }
    function Nk(a, b) {
      do {
        var c = Y;
        try {
          Qg();
          Ph.current = ai;
          if (Sh) {
            for (var d = N.memoizedState; null !== d; ) {
              var e = d.queue;
              null !== e && (e.pending = null);
              d = d.next;
            }
            Sh = false;
          }
          Rh = 0;
          P = O = N = null;
          Th = false;
          Uh = 0;
          ok.current = null;
          if (null === c || null === c.return) {
            T = 1;
            qk = b;
            Y = null;
            break;
          }
          a: {
            var f = a, g = c.return, h = c, k = b;
            b = Z;
            h.flags |= 32768;
            if (null !== k && "object" === typeof k && "function" === typeof k.then) {
              var l = k, m = h, q = m.tag;
              if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                var r = m.alternate;
                r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
              }
              var y = Vi(g);
              if (null !== y) {
                y.flags &= -257;
                Wi(y, g, h, f, b);
                y.mode & 1 && Ti(f, l, b);
                b = y;
                k = l;
                var n = b.updateQueue;
                if (null === n) {
                  var t = /* @__PURE__ */ new Set();
                  t.add(k);
                  b.updateQueue = t;
                } else
                  n.add(k);
                break a;
              } else {
                if (0 === (b & 1)) {
                  Ti(f, l, b);
                  uj();
                  break a;
                }
                k = Error(p(426));
              }
            } else if (I && h.mode & 1) {
              var J = Vi(g);
              if (null !== J) {
                0 === (J.flags & 65536) && (J.flags |= 256);
                Wi(J, g, h, f, b);
                Jg(Ki(k, h));
                break a;
              }
            }
            f = k = Ki(k, h);
            4 !== T && (T = 2);
            null === tk ? tk = [f] : tk.push(f);
            f = g;
            do {
              switch (f.tag) {
                case 3:
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var x = Oi(f, k, b);
                  fh(f, x);
                  break a;
                case 1:
                  h = k;
                  var w = f.type, u = f.stateNode;
                  if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Si || !Si.has(u)))) {
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var F = Ri(f, h, b);
                    fh(f, F);
                    break a;
                  }
              }
              f = f.return;
            } while (null !== f);
          }
          Tk(c);
        } catch (na) {
          b = na;
          Y === c && null !== c && (Y = c = c.return);
          continue;
        }
        break;
      } while (1);
    }
    function Kk() {
      var a = nk.current;
      nk.current = ai;
      return null === a ? ai : a;
    }
    function uj() {
      if (0 === T || 3 === T || 2 === T)
        T = 4;
      null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z);
    }
    function Jk(a, b) {
      var c = K;
      K |= 2;
      var d = Kk();
      if (R !== a || Z !== b)
        vk = null, Lk(a, b);
      do
        try {
          Uk();
          break;
        } catch (e) {
          Nk(a, e);
        }
      while (1);
      Qg();
      K = c;
      nk.current = d;
      if (null !== Y)
        throw Error(p(261));
      R = null;
      Z = 0;
      return T;
    }
    function Uk() {
      for (; null !== Y; )
        Vk(Y);
    }
    function Mk() {
      for (; null !== Y && !cc(); )
        Vk(Y);
    }
    function Vk(a) {
      var b = Wk(a.alternate, a, gj);
      a.memoizedProps = a.pendingProps;
      null === b ? Tk(a) : Y = b;
      ok.current = null;
    }
    function Tk(a) {
      var b = a;
      do {
        var c = b.alternate;
        a = b.return;
        if (0 === (b.flags & 32768)) {
          if (c = Fj(c, b, gj), null !== c) {
            Y = c;
            return;
          }
        } else {
          c = Jj(c, b);
          if (null !== c) {
            c.flags &= 32767;
            Y = c;
            return;
          }
          if (null !== a)
            a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
          else {
            T = 6;
            Y = null;
            return;
          }
        }
        b = b.sibling;
        if (null !== b) {
          Y = b;
          return;
        }
        Y = b = a;
      } while (null !== b);
      0 === T && (T = 5);
    }
    function Qk(a, b, c) {
      var d = C, e = pk.transition;
      try {
        pk.transition = null, C = 1, Xk(a, b, c, d);
      } finally {
        pk.transition = e, C = d;
      }
      return null;
    }
    function Xk(a, b, c, d) {
      do
        Ik();
      while (null !== xk);
      if (0 !== (K & 6))
        throw Error(p(327));
      c = a.finishedWork;
      var e = a.finishedLanes;
      if (null === c)
        return null;
      a.finishedWork = null;
      a.finishedLanes = 0;
      if (c === a.current)
        throw Error(p(177));
      a.callbackNode = null;
      a.callbackPriority = 0;
      var f = c.lanes | c.childLanes;
      Bc(a, f);
      a === R && (Y = R = null, Z = 0);
      0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = true, Gk(hc, function() {
        Ik();
        return null;
      }));
      f = 0 !== (c.flags & 15990);
      if (0 !== (c.subtreeFlags & 15990) || f) {
        f = pk.transition;
        pk.transition = null;
        var g = C;
        C = 1;
        var h = K;
        K |= 4;
        ok.current = null;
        Pj(a, c);
        ek(c, a);
        Oe(Df);
        dd = !!Cf;
        Df = Cf = null;
        a.current = c;
        ik(c, a, e);
        dc();
        K = h;
        C = g;
        pk.transition = f;
      } else
        a.current = c;
      wk && (wk = false, xk = a, yk = e);
      f = a.pendingLanes;
      0 === f && (Si = null);
      mc(c.stateNode, d);
      Ek(a, B());
      if (null !== b)
        for (d = a.onRecoverableError, c = 0; c < b.length; c++)
          e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
      if (Pi)
        throw Pi = false, a = Qi, Qi = null, a;
      0 !== (yk & 1) && 0 !== a.tag && Ik();
      f = a.pendingLanes;
      0 !== (f & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
      jg();
      return null;
    }
    function Ik() {
      if (null !== xk) {
        var a = Dc(yk), b = pk.transition, c = C;
        try {
          pk.transition = null;
          C = 16 > a ? 16 : a;
          if (null === xk)
            var d = false;
          else {
            a = xk;
            xk = null;
            yk = 0;
            if (0 !== (K & 6))
              throw Error(p(331));
            var e = K;
            K |= 4;
            for (V = a.current; null !== V; ) {
              var f = V, g = f.child;
              if (0 !== (V.flags & 16)) {
                var h = f.deletions;
                if (null !== h) {
                  for (var k = 0; k < h.length; k++) {
                    var l = h[k];
                    for (V = l; null !== V; ) {
                      var m = V;
                      switch (m.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Qj(8, m, f);
                      }
                      var q = m.child;
                      if (null !== q)
                        q.return = m, V = q;
                      else
                        for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Tj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                    }
                  }
                  var n = f.alternate;
                  if (null !== n) {
                    var t = n.child;
                    if (null !== t) {
                      n.child = null;
                      do {
                        var J = t.sibling;
                        t.sibling = null;
                        t = J;
                      } while (null !== t);
                    }
                  }
                  V = f;
                }
              }
              if (0 !== (f.subtreeFlags & 2064) && null !== g)
                g.return = f, V = g;
              else
                b:
                  for (; null !== V; ) {
                    f = V;
                    if (0 !== (f.flags & 2048))
                      switch (f.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Qj(9, f, f.return);
                      }
                    var x = f.sibling;
                    if (null !== x) {
                      x.return = f.return;
                      V = x;
                      break b;
                    }
                    V = f.return;
                  }
            }
            var w = a.current;
            for (V = w; null !== V; ) {
              g = V;
              var u = g.child;
              if (0 !== (g.subtreeFlags & 2064) && null !== u)
                u.return = g, V = u;
              else
                b:
                  for (g = w; null !== V; ) {
                    h = V;
                    if (0 !== (h.flags & 2048))
                      try {
                        switch (h.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Rj(9, h);
                        }
                      } catch (na) {
                        W(h, h.return, na);
                      }
                    if (h === g) {
                      V = null;
                      break b;
                    }
                    var F = h.sibling;
                    if (null !== F) {
                      F.return = h.return;
                      V = F;
                      break b;
                    }
                    V = h.return;
                  }
            }
            K = e;
            jg();
            if (lc && "function" === typeof lc.onPostCommitFiberRoot)
              try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
            d = true;
          }
          return d;
        } finally {
          C = c, pk.transition = b;
        }
      }
      return false;
    }
    function Yk(a, b, c) {
      b = Ki(c, b);
      b = Oi(a, b, 1);
      a = dh(a, b, 1);
      b = L();
      null !== a && (Ac(a, 1, b), Ek(a, b));
    }
    function W(a, b, c) {
      if (3 === a.tag)
        Yk(a, a, c);
      else
        for (; null !== b; ) {
          if (3 === b.tag) {
            Yk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
              a = Ki(c, a);
              a = Ri(b, a, 1);
              b = dh(b, a, 1);
              a = L();
              null !== b && (Ac(b, 1, a), Ek(b, a));
              break;
            }
          }
          b = b.return;
        }
    }
    function Ui(a, b, c) {
      var d = a.pingCache;
      null !== d && d.delete(b);
      b = L();
      a.pingedLanes |= a.suspendedLanes & c;
      R === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - gk ? Lk(a, 0) : sk |= c);
      Ek(a, b);
    }
    function Zk(a, b) {
      0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
      var c = L();
      a = Zg(a, b);
      null !== a && (Ac(a, b, c), Ek(a, c));
    }
    function vj(a) {
      var b = a.memoizedState, c = 0;
      null !== b && (c = b.retryLane);
      Zk(a, c);
    }
    function ck(a, b) {
      var c = 0;
      switch (a.tag) {
        case 13:
          var d = a.stateNode;
          var e = a.memoizedState;
          null !== e && (c = e.retryLane);
          break;
        case 19:
          d = a.stateNode;
          break;
        default:
          throw Error(p(314));
      }
      null !== d && d.delete(b);
      Zk(a, c);
    }
    var Wk;
    Wk = function(a, b, c) {
      if (null !== a)
        if (a.memoizedProps !== b.pendingProps || Wf.current)
          Ug = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128))
            return Ug = false, zj(a, b, c);
          Ug = 0 !== (a.flags & 131072) ? true : false;
        }
      else
        Ug = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
      b.lanes = 0;
      switch (b.tag) {
        case 2:
          var d = b.type;
          jj(a, b);
          a = b.pendingProps;
          var e = Yf(b, H.current);
          Tg(b, c);
          e = Xh(null, b, d, a, e, c);
          var f = bi();
          b.flags |= 1;
          "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Yi(null, b, e, c), b = b.child);
          return b;
        case 16:
          d = b.elementType;
          a: {
            jj(a, b);
            a = b.pendingProps;
            e = d._init;
            d = e(d._payload);
            b.type = d;
            e = b.tag = $k(d);
            a = Lg(d, a);
            switch (e) {
              case 0:
                b = dj(null, b, d, a, c);
                break a;
              case 1:
                b = ij(null, b, d, a, c);
                break a;
              case 11:
                b = Zi(null, b, d, a, c);
                break a;
              case 14:
                b = aj(null, b, d, Lg(d.type, a), c);
                break a;
            }
            throw Error(p(
              306,
              d,
              ""
            ));
          }
          return b;
        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);
        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);
        case 3:
          a: {
            lj(b);
            if (null === a)
              throw Error(p(387));
            d = b.pendingProps;
            f = b.memoizedState;
            e = f.element;
            bh(a, b);
            gh(b, d, null, c);
            var g = b.memoizedState;
            d = g.element;
            if (f.isDehydrated)
              if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ki(Error(p(423)), b);
                b = mj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ki(Error(p(424)), b);
                b = mj(a, b, d, c, e);
                break a;
              } else
                for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Ch(b, null, d, c), b.child = c; c; )
                  c.flags = c.flags & -3 | 4096, c = c.sibling;
            else {
              Ig();
              if (d === e) {
                b = $i(a, b, c);
                break a;
              }
              Yi(a, b, d, c);
            }
            b = b.child;
          }
          return b;
        case 5:
          return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), hj(a, b), Yi(a, b, g, c), b.child;
        case 6:
          return null === a && Eg(b), null;
        case 13:
          return pj(a, b, c);
        case 4:
          return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), b.child;
        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);
        case 7:
          return Yi(a, b, b.pendingProps, c), b.child;
        case 8:
          return Yi(a, b, b.pendingProps.children, c), b.child;
        case 12:
          return Yi(a, b, b.pendingProps.children, c), b.child;
        case 10:
          a: {
            d = b.type._context;
            e = b.pendingProps;
            f = b.memoizedProps;
            g = e.value;
            G(Mg, d._currentValue);
            d._currentValue = g;
            if (null !== f)
              if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = $i(a, b, c);
                  break a;
                }
              } else
                for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                  var h = f.dependencies;
                  if (null !== h) {
                    g = f.child;
                    for (var k = h.firstContext; null !== k; ) {
                      if (k.context === d) {
                        if (1 === f.tag) {
                          k = ch(-1, c & -c);
                          k.tag = 2;
                          var l = f.updateQueue;
                          if (null !== l) {
                            l = l.shared;
                            var m = l.pending;
                            null === m ? k.next = k : (k.next = m.next, m.next = k);
                            l.pending = k;
                          }
                        }
                        f.lanes |= c;
                        k = f.alternate;
                        null !== k && (k.lanes |= c);
                        Sg(
                          f.return,
                          c,
                          b
                        );
                        h.lanes |= c;
                        break;
                      }
                      k = k.next;
                    }
                  } else if (10 === f.tag)
                    g = f.type === b.type ? null : f.child;
                  else if (18 === f.tag) {
                    g = f.return;
                    if (null === g)
                      throw Error(p(341));
                    g.lanes |= c;
                    h = g.alternate;
                    null !== h && (h.lanes |= c);
                    Sg(g, c, b);
                    g = f.sibling;
                  } else
                    g = f.child;
                  if (null !== g)
                    g.return = f;
                  else
                    for (g = f; null !== g; ) {
                      if (g === b) {
                        g = null;
                        break;
                      }
                      f = g.sibling;
                      if (null !== f) {
                        f.return = g.return;
                        g = f;
                        break;
                      }
                      g = g.return;
                    }
                  f = g;
                }
            Yi(a, b, e.children, c);
            b = b.child;
          }
          return b;
        case 9:
          return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, Yi(a, b, d, c), b.child;
        case 14:
          return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);
        case 15:
          return cj(a, b, b.type, b.pendingProps, c);
        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, Tg(b, c), ph(b, d, e), rh(b, d, e, c), kj(null, b, d, true, a, c);
        case 19:
          return yj(a, b, c);
        case 22:
          return ej(a, b, c);
      }
      throw Error(p(156, b.tag));
    };
    function Gk(a, b) {
      return ac(a, b);
    }
    function al(a, b, c, d) {
      this.tag = a;
      this.key = c;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function Bg(a, b, c, d) {
      return new al(a, b, c, d);
    }
    function bj(a) {
      a = a.prototype;
      return !(!a || !a.isReactComponent);
    }
    function $k(a) {
      if ("function" === typeof a)
        return bj(a) ? 1 : 0;
      if (void 0 !== a && null !== a) {
        a = a.$$typeof;
        if (a === Da)
          return 11;
        if (a === Ga)
          return 14;
      }
      return 2;
    }
    function wh(a, b) {
      var c = a.alternate;
      null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
      c.flags = a.flags & 14680064;
      c.childLanes = a.childLanes;
      c.lanes = a.lanes;
      c.child = a.child;
      c.memoizedProps = a.memoizedProps;
      c.memoizedState = a.memoizedState;
      c.updateQueue = a.updateQueue;
      b = a.dependencies;
      c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
      c.sibling = a.sibling;
      c.index = a.index;
      c.ref = a.ref;
      return c;
    }
    function yh(a, b, c, d, e, f) {
      var g = 2;
      d = a;
      if ("function" === typeof a)
        bj(a) && (g = 1);
      else if ("string" === typeof a)
        g = 5;
      else
        a:
          switch (a) {
            case ya:
              return Ah(c.children, e, f, b);
            case za:
              g = 8;
              e |= 8;
              break;
            case Aa:
              return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
            case Ea:
              return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
            case Fa:
              return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
            case Ia:
              return qj(c, e, f, b);
            default:
              if ("object" === typeof a && null !== a)
                switch (a.$$typeof) {
                  case Ba:
                    g = 10;
                    break a;
                  case Ca:
                    g = 9;
                    break a;
                  case Da:
                    g = 11;
                    break a;
                  case Ga:
                    g = 14;
                    break a;
                  case Ha:
                    g = 16;
                    d = null;
                    break a;
                }
              throw Error(p(130, null == a ? a : typeof a, ""));
          }
      b = Bg(g, c, b, e);
      b.elementType = a;
      b.type = d;
      b.lanes = f;
      return b;
    }
    function Ah(a, b, c, d) {
      a = Bg(7, a, d, b);
      a.lanes = c;
      return a;
    }
    function qj(a, b, c, d) {
      a = Bg(22, a, d, b);
      a.elementType = Ia;
      a.lanes = c;
      a.stateNode = { isHidden: false };
      return a;
    }
    function xh(a, b, c) {
      a = Bg(6, a, null, b);
      a.lanes = c;
      return a;
    }
    function zh(a, b, c) {
      b = Bg(4, null !== a.children ? a.children : [], a.key, b);
      b.lanes = c;
      b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
      return b;
    }
    function bl(a, b, c, d, e) {
      this.tag = b;
      this.containerInfo = a;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.pendingContext = this.context = null;
      this.callbackPriority = 0;
      this.eventTimes = zc(0);
      this.expirationTimes = zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = zc(0);
      this.identifierPrefix = d;
      this.onRecoverableError = e;
      this.mutableSourceEagerHydrationData = null;
    }
    function cl(a, b, c, d, e, f, g, h, k) {
      a = new bl(a, b, c, h, k);
      1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
      f = Bg(3, null, null, b);
      a.current = f;
      f.stateNode = a;
      f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
      ah(f);
      return a;
    }
    function dl(a, b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
    }
    function el(a) {
      if (!a)
        return Vf;
      a = a._reactInternals;
      a: {
        if (Vb(a) !== a || 1 !== a.tag)
          throw Error(p(170));
        var b = a;
        do {
          switch (b.tag) {
            case 3:
              b = b.stateNode.context;
              break a;
            case 1:
              if (Zf(b.type)) {
                b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          b = b.return;
        } while (null !== b);
        throw Error(p(171));
      }
      if (1 === a.tag) {
        var c = a.type;
        if (Zf(c))
          return bg(a, c, b);
      }
      return b;
    }
    function fl(a, b, c, d, e, f, g, h, k) {
      a = cl(c, d, true, a, e, f, g, h, k);
      a.context = el(null);
      c = a.current;
      d = L();
      e = lh(c);
      f = ch(d, e);
      f.callback = void 0 !== b && null !== b ? b : null;
      dh(c, f, e);
      a.current.lanes = e;
      Ac(a, e, d);
      Ek(a, d);
      return a;
    }
    function gl(a, b, c, d) {
      var e = b.current, f = L(), g = lh(e);
      c = el(c);
      null === b.context ? b.context = c : b.pendingContext = c;
      b = ch(f, g);
      b.payload = { element: a };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      a = dh(e, b, g);
      null !== a && (mh(a, e, g, f), eh(a, e, g));
      return g;
    }
    function hl(a) {
      a = a.current;
      if (!a.child)
        return null;
      switch (a.child.tag) {
        case 5:
          return a.child.stateNode;
        default:
          return a.child.stateNode;
      }
    }
    function il(a, b) {
      a = a.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        var c = a.retryLane;
        a.retryLane = 0 !== c && c < b ? c : b;
      }
    }
    function jl(a, b) {
      il(a, b);
      (a = a.alternate) && il(a, b);
    }
    function kl() {
      return null;
    }
    var ll = "function" === typeof reportError ? reportError : function(a) {
      console.error(a);
    };
    function ml(a) {
      this._internalRoot = a;
    }
    nl.prototype.render = ml.prototype.render = function(a) {
      var b = this._internalRoot;
      if (null === b)
        throw Error(p(409));
      gl(a, b, null, null);
    };
    nl.prototype.unmount = ml.prototype.unmount = function() {
      var a = this._internalRoot;
      if (null !== a) {
        this._internalRoot = null;
        var b = a.containerInfo;
        Sk(function() {
          gl(null, a, null, null);
        });
        b[uf] = null;
      }
    };
    function nl(a) {
      this._internalRoot = a;
    }
    nl.prototype.unstable_scheduleHydration = function(a) {
      if (a) {
        var b = Hc();
        a = { blockedOn: null, target: a, priority: b };
        for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++)
          ;
        Qc.splice(c, 0, a);
        0 === c && Vc(a);
      }
    };
    function ol(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
    }
    function pl(a) {
      return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
    }
    function ql() {
    }
    function rl(a, b, c, d, e) {
      if (e) {
        if ("function" === typeof d) {
          var f = d;
          d = function() {
            var a2 = hl(g);
            f.call(a2);
          };
        }
        var g = fl(b, d, a, 0, null, false, false, "", ql);
        a._reactRootContainer = g;
        a[uf] = g.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Sk();
        return g;
      }
      for (; e = a.lastChild; )
        a.removeChild(e);
      if ("function" === typeof d) {
        var h = d;
        d = function() {
          var a2 = hl(k);
          h.call(a2);
        };
      }
      var k = cl(a, 0, false, null, null, false, false, "", ql);
      a._reactRootContainer = k;
      a[uf] = k.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Sk(function() {
        gl(b, k, c, d);
      });
      return k;
    }
    function sl(a, b, c, d, e) {
      var f = c._reactRootContainer;
      if (f) {
        var g = f;
        if ("function" === typeof e) {
          var h = e;
          e = function() {
            var a2 = hl(g);
            h.call(a2);
          };
        }
        gl(b, g, a, e);
      } else
        g = rl(c, b, a, e, d);
      return hl(g);
    }
    Ec = function(a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          if (b.current.memoizedState.isDehydrated) {
            var c = tc(b.pendingLanes);
            0 !== c && (Cc(b, c | 1), Ek(b, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));
          }
          break;
        case 13:
          Sk(function() {
            var b2 = Zg(a, 1);
            if (null !== b2) {
              var c2 = L();
              mh(b2, a, 1, c2);
            }
          }), jl(a, 1);
      }
    };
    Fc = function(a) {
      if (13 === a.tag) {
        var b = Zg(a, 134217728);
        if (null !== b) {
          var c = L();
          mh(b, a, 134217728, c);
        }
        jl(a, 134217728);
      }
    };
    Gc = function(a) {
      if (13 === a.tag) {
        var b = lh(a), c = Zg(a, b);
        if (null !== c) {
          var d = L();
          mh(c, a, b, d);
        }
        jl(a, b);
      }
    };
    Hc = function() {
      return C;
    };
    Ic = function(a, b) {
      var c = C;
      try {
        return C = a, b();
      } finally {
        C = c;
      }
    };
    yb = function(a, b, c) {
      switch (b) {
        case "input":
          bb(a, c);
          b = c.name;
          if ("radio" === c.type && null != b) {
            for (c = a; c.parentNode; )
              c = c.parentNode;
            c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
            for (b = 0; b < c.length; b++) {
              var d = c[b];
              if (d !== a && d.form === a.form) {
                var e = Db(d);
                if (!e)
                  throw Error(p(90));
                Wa(d);
                bb(d, e);
              }
            }
          }
          break;
        case "textarea":
          ib(a, c);
          break;
        case "select":
          b = c.value, null != b && fb(a, !!c.multiple, b, false);
      }
    };
    Gb = Rk;
    Hb = Sk;
    var tl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Rk] };
    var ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
    var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
      a = Zb(a);
      return null === a ? null : a.stateNode;
    }, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!wl.isDisabled && wl.supportsFiber)
        try {
          kc = wl.inject(vl), lc = wl;
        } catch (a) {
        }
    }
    var wl;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
    exports.createPortal = function(a, b) {
      var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!ol(b))
        throw Error(p(200));
      return dl(a, b, null, c);
    };
    exports.createRoot = function(a, b) {
      if (!ol(a))
        throw Error(p(299));
      var c = false, d = "", e = ll;
      null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
      b = cl(a, 1, false, null, null, c, false, d, e);
      a[uf] = b.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      return new ml(b);
    };
    exports.findDOMNode = function(a) {
      if (null == a)
        return null;
      if (1 === a.nodeType)
        return a;
      var b = a._reactInternals;
      if (void 0 === b) {
        if ("function" === typeof a.render)
          throw Error(p(188));
        a = Object.keys(a).join(",");
        throw Error(p(268, a));
      }
      a = Zb(b);
      a = null === a ? null : a.stateNode;
      return a;
    };
    exports.flushSync = function(a) {
      return Sk(a);
    };
    exports.hydrate = function(a, b, c) {
      if (!pl(b))
        throw Error(p(200));
      return sl(null, a, b, true, c);
    };
    exports.hydrateRoot = function(a, b, c) {
      if (!ol(a))
        throw Error(p(405));
      var d = null != c && c.hydratedSources || null, e = false, f = "", g = ll;
      null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
      b = fl(b, null, a, 1, null != c ? c : null, e, false, f, g);
      a[uf] = b.current;
      sf(a);
      if (d)
        for (a = 0; a < d.length; a++)
          c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
            c,
            e
          );
      return new nl(b);
    };
    exports.render = function(a, b, c) {
      if (!pl(b))
        throw Error(p(200));
      return sl(null, a, b, false, c);
    };
    exports.unmountComponentAtNode = function(a) {
      if (!pl(a))
        throw Error(p(40));
      return a._reactRootContainer ? (Sk(function() {
        sl(null, null, a, false, function() {
          a._reactRootContainer = null;
          a[uf] = null;
        });
      }), true) : false;
    };
    exports.unstable_batchedUpdates = Rk;
    exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
      if (!pl(c))
        throw Error(p(200));
      if (null == a || void 0 === a._reactInternals)
        throw Error(p(38));
      return sl(a, b, c, false, d);
    };
    exports.version = "18.2.0-next-9e3b772b8-20220608";
  }
});

// ../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/.pnpm/react-router@6.22.3_react@18.2.0/node_modules/react-router/dist/umd/react-router.production.min.js
var require_react_router_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-router@6.22.3_react@18.2.0/node_modules/react-router/dist/umd/react-router.production.min.js"(exports, module) {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(exports, require_react(), require_router_cjs()) : "function" == typeof define && define.amd ? define(["exports", "react", "@remix-run/router"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).ReactRouter = {}, e.React, e.RemixRouter);
    }(exports, function(e, t, r) {
      "use strict";
      function n(e2) {
        if (e2 && e2.__esModule)
          return e2;
        var t2 = /* @__PURE__ */ Object.create(null);
        return e2 && Object.keys(e2).forEach(function(r2) {
          if ("default" !== r2) {
            var n2 = Object.getOwnPropertyDescriptor(e2, r2);
            Object.defineProperty(t2, r2, n2.get ? n2 : { enumerable: true, get: function() {
              return e2[r2];
            } });
          }
        }), t2.default = e2, Object.freeze(t2);
      }
      var a = n(t);
      function o() {
        return o = Object.assign ? Object.assign.bind() : function(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var r2 = arguments[t2];
            for (var n2 in r2)
              Object.prototype.hasOwnProperty.call(r2, n2) && (e2[n2] = r2[n2]);
          }
          return e2;
        }, o.apply(this, arguments);
      }
      const i = a.createContext(null), u = a.createContext(null), l = a.createContext(null), s = a.createContext(null), c = a.createContext(null), d = a.createContext({ outlet: null, matches: [], isDataRoute: false }), p = a.createContext(null);
      function f() {
        return null != a.useContext(c);
      }
      function m() {
        return f() || r.UNSAFE_invariant(false), a.useContext(c).location;
      }
      function v(e2) {
        a.useContext(s).static || a.useLayoutEffect(e2);
      }
      function h() {
        let { isDataRoute: e2 } = a.useContext(d);
        return e2 ? function() {
          let { router: e3 } = O(_.UseNavigateStable), t2 = j(N.UseNavigateStable), r2 = a.useRef(false);
          return v(() => {
            r2.current = true;
          }), a.useCallback(function(n2, a2) {
            void 0 === a2 && (a2 = {}), r2.current && ("number" == typeof n2 ? e3.navigate(n2) : e3.navigate(n2, o({ fromRouteId: t2 }, a2)));
          }, [e3, t2]);
        }() : function() {
          f() || r.UNSAFE_invariant(false);
          let e3 = a.useContext(i), { basename: t2, future: n2, navigator: o2 } = a.useContext(s), { matches: u2 } = a.useContext(d), { pathname: l2 } = m(), c2 = JSON.stringify(r.UNSAFE_getResolveToMatches(u2, n2.v7_relativeSplatPath)), p2 = a.useRef(false);
          return v(() => {
            p2.current = true;
          }), a.useCallback(function(n3, a2) {
            if (void 0 === a2 && (a2 = {}), !p2.current)
              return;
            if ("number" == typeof n3)
              return void o2.go(n3);
            let i2 = r.resolveTo(n3, JSON.parse(c2), l2, "path" === a2.relative);
            null == e3 && "/" !== t2 && (i2.pathname = "/" === i2.pathname ? t2 : r.joinPaths([t2, i2.pathname])), (a2.replace ? o2.replace : o2.push)(i2, a2.state, a2);
          }, [t2, o2, c2, l2, e3]);
        }();
      }
      const E = a.createContext(null);
      function g(e2) {
        let t2 = a.useContext(d).outlet;
        return t2 ? a.createElement(E.Provider, { value: e2 }, t2) : t2;
      }
      function y(e2, t2) {
        let { relative: n2 } = void 0 === t2 ? {} : t2, { future: o2 } = a.useContext(s), { matches: i2 } = a.useContext(d), { pathname: u2 } = m(), l2 = JSON.stringify(r.UNSAFE_getResolveToMatches(i2, o2.v7_relativeSplatPath));
        return a.useMemo(() => r.resolveTo(e2, JSON.parse(l2), u2, "path" === n2), [e2, l2, u2, n2]);
      }
      function b(e2, t2) {
        return R(e2, t2);
      }
      function R(e2, t2, n2, i2) {
        f() || r.UNSAFE_invariant(false);
        let { navigator: u2 } = a.useContext(s), { matches: l2 } = a.useContext(d), p2 = l2[l2.length - 1], v2 = p2 ? p2.params : {};
        !p2 || p2.pathname;
        let h2 = p2 ? p2.pathnameBase : "/";
        p2 && p2.route;
        let E2, g2 = m();
        if (t2) {
          var y2;
          let e3 = "string" == typeof t2 ? r.parsePath(t2) : t2;
          "/" === h2 || (null == (y2 = e3.pathname) ? void 0 : y2.startsWith(h2)) || r.UNSAFE_invariant(false), E2 = e3;
        } else
          E2 = g2;
        let b2 = E2.pathname || "/", R2 = b2;
        if ("/" !== h2) {
          let e3 = h2.replace(/^\//, "").split("/");
          R2 = "/" + b2.replace(/^\//, "").split("/").slice(e3.length).join("/");
        }
        let P2 = r.matchRoutes(e2, { pathname: R2 }), x2 = U(P2 && P2.map((e3) => Object.assign({}, e3, { params: Object.assign({}, v2, e3.params), pathname: r.joinPaths([h2, u2.encodeLocation ? u2.encodeLocation(e3.pathname).pathname : e3.pathname]), pathnameBase: "/" === e3.pathnameBase ? h2 : r.joinPaths([h2, u2.encodeLocation ? u2.encodeLocation(e3.pathnameBase).pathname : e3.pathnameBase]) })), l2, n2, i2);
        return t2 && x2 ? a.createElement(c.Provider, { value: { location: o({ pathname: "/", search: "", hash: "", state: null, key: "default" }, E2), navigationType: r.Action.Pop } }, x2) : x2;
      }
      function P() {
        let e2 = F(), t2 = r.isRouteErrorResponse(e2) ? e2.status + " " + e2.statusText : e2 instanceof Error ? e2.message : JSON.stringify(e2), n2 = e2 instanceof Error ? e2.stack : null, o2 = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
        return a.createElement(a.Fragment, null, a.createElement("h2", null, "Unexpected Application Error!"), a.createElement("h3", { style: { fontStyle: "italic" } }, t2), n2 ? a.createElement("pre", { style: o2 }, n2) : null, null);
      }
      const x = a.createElement(P, null);
      class C extends a.Component {
        constructor(e2) {
          super(e2), this.state = { location: e2.location, revalidation: e2.revalidation, error: e2.error };
        }
        static getDerivedStateFromError(e2) {
          return { error: e2 };
        }
        static getDerivedStateFromProps(e2, t2) {
          return t2.location !== e2.location || "idle" !== t2.revalidation && "idle" === e2.revalidation ? { error: e2.error, location: e2.location, revalidation: e2.revalidation } : { error: void 0 !== e2.error ? e2.error : t2.error, location: t2.location, revalidation: e2.revalidation || t2.revalidation };
        }
        componentDidCatch(e2, t2) {
          console.error("React Router caught the following error during render", e2, t2);
        }
        render() {
          return void 0 !== this.state.error ? a.createElement(d.Provider, { value: this.props.routeContext }, a.createElement(p.Provider, { value: this.state.error, children: this.props.component })) : this.props.children;
        }
      }
      function S(e2) {
        let { routeContext: t2, match: r2, children: n2 } = e2, o2 = a.useContext(i);
        return o2 && o2.static && o2.staticContext && (r2.route.errorElement || r2.route.ErrorBoundary) && (o2.staticContext._deepestRenderedBoundaryId = r2.route.id), a.createElement(d.Provider, { value: t2 }, n2);
      }
      function U(e2, t2, n2, o2) {
        var i2;
        if (void 0 === t2 && (t2 = []), void 0 === n2 && (n2 = null), void 0 === o2 && (o2 = null), null == e2) {
          var u2;
          if (null == (u2 = n2) || !u2.errors)
            return null;
          e2 = n2.matches;
        }
        let l2 = e2, s2 = null == (i2 = n2) ? void 0 : i2.errors;
        if (null != s2) {
          let e3 = l2.findIndex((e4) => e4.route.id && (null == s2 ? void 0 : s2[e4.route.id]));
          e3 >= 0 || r.UNSAFE_invariant(false), l2 = l2.slice(0, Math.min(l2.length, e3 + 1));
        }
        let c2 = false, d2 = -1;
        if (n2 && o2 && o2.v7_partialHydration)
          for (let e3 = 0; e3 < l2.length; e3++) {
            let t3 = l2[e3];
            if ((t3.route.HydrateFallback || t3.route.hydrateFallbackElement) && (d2 = e3), t3.route.id) {
              let { loaderData: e4, errors: r2 } = n2, a2 = t3.route.loader && void 0 === e4[t3.route.id] && (!r2 || void 0 === r2[t3.route.id]);
              if (t3.route.lazy || a2) {
                c2 = true, l2 = d2 >= 0 ? l2.slice(0, d2 + 1) : [l2[0]];
                break;
              }
            }
          }
        return l2.reduceRight((e3, r2, o3) => {
          let i3, u3 = false, p2 = null, f2 = null;
          var m2;
          n2 && (i3 = s2 && r2.route.id ? s2[r2.route.id] : void 0, p2 = r2.route.errorElement || x, c2 && (d2 < 0 && 0 === o3 ? (m2 = "route-fallback", B[m2] || (B[m2] = true), u3 = true, f2 = null) : d2 === o3 && (u3 = true, f2 = r2.route.hydrateFallbackElement || null)));
          let v2 = t2.concat(l2.slice(0, o3 + 1)), h2 = () => {
            let t3;
            return t3 = i3 ? p2 : u3 ? f2 : r2.route.Component ? a.createElement(r2.route.Component, null) : r2.route.element ? r2.route.element : e3, a.createElement(S, { match: r2, routeContext: { outlet: e3, matches: v2, isDataRoute: null != n2 }, children: t3 });
          };
          return n2 && (r2.route.ErrorBoundary || r2.route.errorElement || 0 === o3) ? a.createElement(C, { location: n2.location, revalidation: n2.revalidation, component: p2, error: i3, children: h2(), routeContext: { outlet: null, matches: v2, isDataRoute: true } }) : h2();
        }, null);
      }
      var _ = function(e2) {
        return e2.UseBlocker = "useBlocker", e2.UseRevalidator = "useRevalidator", e2.UseNavigateStable = "useNavigate", e2;
      }(_ || {}), N = function(e2) {
        return e2.UseBlocker = "useBlocker", e2.UseLoaderData = "useLoaderData", e2.UseActionData = "useActionData", e2.UseRouteError = "useRouteError", e2.UseNavigation = "useNavigation", e2.UseRouteLoaderData = "useRouteLoaderData", e2.UseMatches = "useMatches", e2.UseRevalidator = "useRevalidator", e2.UseNavigateStable = "useNavigate", e2.UseRouteId = "useRouteId", e2;
      }(N || {});
      function O(e2) {
        let t2 = a.useContext(i);
        return t2 || r.UNSAFE_invariant(false), t2;
      }
      function A(e2) {
        let t2 = a.useContext(u);
        return t2 || r.UNSAFE_invariant(false), t2;
      }
      function j(e2) {
        let t2 = function(e3) {
          let t3 = a.useContext(d);
          return t3 || r.UNSAFE_invariant(false), t3;
        }(), n2 = t2.matches[t2.matches.length - 1];
        return n2.route.id || r.UNSAFE_invariant(false), n2.route.id;
      }
      function F() {
        var e2;
        let t2 = a.useContext(p), r2 = A(N.UseRouteError), n2 = j(N.UseRouteError);
        return void 0 !== t2 ? t2 : null == (e2 = r2.errors) ? void 0 : e2[n2];
      }
      function D() {
        let e2 = a.useContext(l);
        return null == e2 ? void 0 : e2._data;
      }
      let k = 0;
      const B = {};
      const L = a.startTransition;
      function M(e2) {
        let { routes: t2, future: r2, state: n2 } = e2;
        return R(t2, void 0, n2, r2);
      }
      function T(e2) {
        r.UNSAFE_invariant(false);
      }
      function I(e2) {
        let { basename: t2 = "/", children: n2 = null, location: i2, navigationType: u2 = r.Action.Pop, navigator: l2, static: d2 = false, future: p2 } = e2;
        f() && r.UNSAFE_invariant(false);
        let m2 = t2.replace(/^\/*/, "/"), v2 = a.useMemo(() => ({ basename: m2, navigator: l2, static: d2, future: o({ v7_relativeSplatPath: false }, p2) }), [m2, p2, l2, d2]);
        "string" == typeof i2 && (i2 = r.parsePath(i2));
        let { pathname: h2 = "/", search: E2 = "", hash: g2 = "", state: y2 = null, key: b2 = "default" } = i2, R2 = a.useMemo(() => {
          let e3 = r.stripBasename(h2, m2);
          return null == e3 ? null : { location: { pathname: e3, search: E2, hash: g2, state: y2, key: b2 }, navigationType: u2 };
        }, [m2, h2, E2, g2, y2, b2, u2]);
        return null == R2 ? null : a.createElement(s.Provider, { value: v2 }, a.createElement(c.Provider, { children: n2, value: R2 }));
      }
      var H = function(e2) {
        return e2[e2.pending = 0] = "pending", e2[e2.success = 1] = "success", e2[e2.error = 2] = "error", e2;
      }(H || {});
      const w = new Promise(() => {
      });
      class J extends a.Component {
        constructor(e2) {
          super(e2), this.state = { error: null };
        }
        static getDerivedStateFromError(e2) {
          return { error: e2 };
        }
        componentDidCatch(e2, t2) {
          console.error("<Await> caught the following error during render", e2, t2);
        }
        render() {
          let { children: e2, errorElement: t2, resolve: n2 } = this.props, o2 = null, i2 = H.pending;
          if (n2 instanceof Promise)
            if (this.state.error) {
              i2 = H.error;
              let e3 = this.state.error;
              o2 = Promise.reject().catch(() => {
              }), Object.defineProperty(o2, "_tracked", { get: () => true }), Object.defineProperty(o2, "_error", { get: () => e3 });
            } else
              n2._tracked ? (o2 = n2, i2 = void 0 !== o2._error ? H.error : void 0 !== o2._data ? H.success : H.pending) : (i2 = H.pending, Object.defineProperty(n2, "_tracked", { get: () => true }), o2 = n2.then((e3) => Object.defineProperty(n2, "_data", { get: () => e3 }), (e3) => Object.defineProperty(n2, "_error", { get: () => e3 })));
          else
            i2 = H.success, o2 = Promise.resolve(), Object.defineProperty(o2, "_tracked", { get: () => true }), Object.defineProperty(o2, "_data", { get: () => n2 });
          if (i2 === H.error && o2._error instanceof r.AbortedDeferredError)
            throw w;
          if (i2 === H.error && !t2)
            throw o2._error;
          if (i2 === H.error)
            return a.createElement(l.Provider, { value: o2, children: t2 });
          if (i2 === H.success)
            return a.createElement(l.Provider, { value: o2, children: e2 });
          throw o2;
        }
      }
      function z2(e2) {
        let { children: t2 } = e2, r2 = D(), n2 = "function" == typeof t2 ? t2(r2) : t2;
        return a.createElement(a.Fragment, null, n2);
      }
      function q(e2, t2) {
        void 0 === t2 && (t2 = []);
        let n2 = [];
        return a.Children.forEach(e2, (e3, o2) => {
          if (!a.isValidElement(e3))
            return;
          let i2 = [...t2, o2];
          if (e3.type === a.Fragment)
            return void n2.push.apply(n2, q(e3.props.children, i2));
          e3.type !== T && r.UNSAFE_invariant(false), e3.props.index && e3.props.children && r.UNSAFE_invariant(false);
          let u2 = { id: e3.props.id || i2.join("-"), caseSensitive: e3.props.caseSensitive, element: e3.props.element, Component: e3.props.Component, index: e3.props.index, path: e3.props.path, loader: e3.props.loader, action: e3.props.action, errorElement: e3.props.errorElement, ErrorBoundary: e3.props.ErrorBoundary, hasErrorBoundary: null != e3.props.ErrorBoundary || null != e3.props.errorElement, shouldRevalidate: e3.props.shouldRevalidate, handle: e3.props.handle, lazy: e3.props.lazy };
          e3.props.children && (u2.children = q(e3.props.children, i2)), n2.push(u2);
        }), n2;
      }
      function V(e2) {
        let t2 = { hasErrorBoundary: null != e2.ErrorBoundary || null != e2.errorElement };
        return e2.Component && Object.assign(t2, { element: a.createElement(e2.Component), Component: void 0 }), e2.HydrateFallback && Object.assign(t2, { hydrateFallbackElement: a.createElement(e2.HydrateFallback), HydrateFallback: void 0 }), e2.ErrorBoundary && Object.assign(t2, { errorElement: a.createElement(e2.ErrorBoundary), ErrorBoundary: void 0 }), t2;
      }
      Object.defineProperty(e, "AbortedDeferredError", { enumerable: true, get: function() {
        return r.AbortedDeferredError;
      } }), Object.defineProperty(e, "NavigationType", { enumerable: true, get: function() {
        return r.Action;
      } }), Object.defineProperty(e, "createPath", { enumerable: true, get: function() {
        return r.createPath;
      } }), Object.defineProperty(e, "defer", { enumerable: true, get: function() {
        return r.defer;
      } }), Object.defineProperty(e, "generatePath", { enumerable: true, get: function() {
        return r.generatePath;
      } }), Object.defineProperty(e, "isRouteErrorResponse", { enumerable: true, get: function() {
        return r.isRouteErrorResponse;
      } }), Object.defineProperty(e, "json", { enumerable: true, get: function() {
        return r.json;
      } }), Object.defineProperty(e, "matchPath", { enumerable: true, get: function() {
        return r.matchPath;
      } }), Object.defineProperty(e, "matchRoutes", { enumerable: true, get: function() {
        return r.matchRoutes;
      } }), Object.defineProperty(e, "parsePath", { enumerable: true, get: function() {
        return r.parsePath;
      } }), Object.defineProperty(e, "redirect", { enumerable: true, get: function() {
        return r.redirect;
      } }), Object.defineProperty(e, "redirectDocument", { enumerable: true, get: function() {
        return r.redirectDocument;
      } }), Object.defineProperty(e, "resolvePath", { enumerable: true, get: function() {
        return r.resolvePath;
      } }), e.Await = function(e2) {
        let { children: t2, errorElement: r2, resolve: n2 } = e2;
        return a.createElement(J, { resolve: n2, errorElement: r2 }, a.createElement(z2, null, t2));
      }, e.MemoryRouter = function(e2) {
        let { basename: t2, children: n2, initialEntries: o2, initialIndex: i2, future: u2 } = e2, l2 = a.useRef();
        null == l2.current && (l2.current = r.createMemoryHistory({ initialEntries: o2, initialIndex: i2, v5Compat: true }));
        let s2 = l2.current, [c2, d2] = a.useState({ action: s2.action, location: s2.location }), { v7_startTransition: p2 } = u2 || {}, f2 = a.useCallback((e3) => {
          p2 && L ? L(() => d2(e3)) : d2(e3);
        }, [d2, p2]);
        return a.useLayoutEffect(() => s2.listen(f2), [s2, f2]), a.createElement(I, { basename: t2, children: n2, location: c2.location, navigationType: c2.action, navigator: s2, future: u2 });
      }, e.Navigate = function(e2) {
        let { to: t2, replace: n2, state: o2, relative: i2 } = e2;
        f() || r.UNSAFE_invariant(false);
        let { future: u2, static: l2 } = a.useContext(s), { matches: c2 } = a.useContext(d), { pathname: p2 } = m(), v2 = h(), E2 = r.resolveTo(t2, r.UNSAFE_getResolveToMatches(c2, u2.v7_relativeSplatPath), p2, "path" === i2), g2 = JSON.stringify(E2);
        return a.useEffect(() => v2(JSON.parse(g2), { replace: n2, state: o2, relative: i2 }), [v2, g2, i2, n2, o2]), null;
      }, e.Outlet = function(e2) {
        return g(e2.context);
      }, e.Route = T, e.Router = I, e.RouterProvider = function(e2) {
        let { fallbackElement: t2, router: r2, future: n2 } = e2, [o2, l2] = a.useState(r2.state), { v7_startTransition: s2 } = n2 || {}, c2 = a.useCallback((e3) => {
          s2 && L ? L(() => l2(e3)) : l2(e3);
        }, [l2, s2]);
        a.useLayoutEffect(() => r2.subscribe(c2), [r2, c2]), a.useEffect(() => {
        }, []);
        let d2 = a.useMemo(() => ({ createHref: r2.createHref, encodeLocation: r2.encodeLocation, go: (e3) => r2.navigate(e3), push: (e3, t3, n3) => r2.navigate(e3, { state: t3, preventScrollReset: null == n3 ? void 0 : n3.preventScrollReset }), replace: (e3, t3, n3) => r2.navigate(e3, { replace: true, state: t3, preventScrollReset: null == n3 ? void 0 : n3.preventScrollReset }) }), [r2]), p2 = r2.basename || "/", f2 = a.useMemo(() => ({ router: r2, navigator: d2, static: false, basename: p2 }), [r2, d2, p2]);
        return a.createElement(a.Fragment, null, a.createElement(i.Provider, { value: f2 }, a.createElement(u.Provider, { value: o2 }, a.createElement(I, { basename: p2, location: o2.location, navigationType: o2.historyAction, navigator: d2, future: { v7_relativeSplatPath: r2.future.v7_relativeSplatPath } }, o2.initialized || r2.future.v7_partialHydration ? a.createElement(M, { routes: r2.routes, future: r2.future, state: o2 }) : t2))), null);
      }, e.Routes = function(e2) {
        let { children: t2, location: r2 } = e2;
        return b(q(t2), r2);
      }, e.UNSAFE_DataRouterContext = i, e.UNSAFE_DataRouterStateContext = u, e.UNSAFE_LocationContext = c, e.UNSAFE_NavigationContext = s, e.UNSAFE_RouteContext = d, e.UNSAFE_mapRouteProperties = V, e.UNSAFE_useRouteId = function() {
        return j(N.UseRouteId);
      }, e.UNSAFE_useRoutesImpl = R, e.createMemoryRouter = function(e2, t2) {
        return r.createRouter({ basename: null == t2 ? void 0 : t2.basename, future: o({}, null == t2 ? void 0 : t2.future, { v7_prependBasename: true }), history: r.createMemoryHistory({ initialEntries: null == t2 ? void 0 : t2.initialEntries, initialIndex: null == t2 ? void 0 : t2.initialIndex }), hydrationData: null == t2 ? void 0 : t2.hydrationData, routes: e2, mapRouteProperties: V }).initialize();
      }, e.createRoutesFromChildren = q, e.createRoutesFromElements = q, e.renderMatches = function(e2) {
        return U(e2);
      }, e.useActionData = function() {
        let e2 = A(N.UseActionData), t2 = j(N.UseLoaderData);
        return e2.actionData ? e2.actionData[t2] : void 0;
      }, e.useAsyncError = function() {
        let e2 = a.useContext(l);
        return null == e2 ? void 0 : e2._error;
      }, e.useAsyncValue = D, e.useBlocker = function(e2) {
        let { router: t2, basename: n2 } = O(_.UseBlocker), i2 = A(N.UseBlocker), [u2, l2] = a.useState(""), s2 = a.useCallback((t3) => {
          if ("function" != typeof e2)
            return !!e2;
          if ("/" === n2)
            return e2(t3);
          let { currentLocation: a2, nextLocation: i3, historyAction: u3 } = t3;
          return e2({ currentLocation: o({}, a2, { pathname: r.stripBasename(a2.pathname, n2) || a2.pathname }), nextLocation: o({}, i3, { pathname: r.stripBasename(i3.pathname, n2) || i3.pathname }), historyAction: u3 });
        }, [n2, e2]);
        return a.useEffect(() => {
          let e3 = String(++k);
          return l2(e3), () => t2.deleteBlocker(e3);
        }, [t2]), a.useEffect(() => {
          "" !== u2 && t2.getBlocker(u2, s2);
        }, [t2, u2, s2]), u2 && i2.blockers.has(u2) ? i2.blockers.get(u2) : r.IDLE_BLOCKER;
      }, e.useHref = function(e2, t2) {
        let { relative: n2 } = void 0 === t2 ? {} : t2;
        f() || r.UNSAFE_invariant(false);
        let { basename: o2, navigator: i2 } = a.useContext(s), { hash: u2, pathname: l2, search: c2 } = y(e2, { relative: n2 }), d2 = l2;
        return "/" !== o2 && (d2 = "/" === l2 ? o2 : r.joinPaths([o2, l2])), i2.createHref({ pathname: d2, search: c2, hash: u2 });
      }, e.useInRouterContext = f, e.useLoaderData = function() {
        let e2 = A(N.UseLoaderData), t2 = j(N.UseLoaderData);
        if (!e2.errors || null == e2.errors[t2])
          return e2.loaderData[t2];
        console.error("You cannot `useLoaderData` in an errorElement (routeId: " + t2 + ")");
      }, e.useLocation = m, e.useMatch = function(e2) {
        f() || r.UNSAFE_invariant(false);
        let { pathname: t2 } = m();
        return a.useMemo(() => r.matchPath(e2, t2), [t2, e2]);
      }, e.useMatches = function() {
        let { matches: e2, loaderData: t2 } = A(N.UseMatches);
        return a.useMemo(() => e2.map((e3) => r.UNSAFE_convertRouteMatchToUiMatch(e3, t2)), [e2, t2]);
      }, e.useNavigate = h, e.useNavigation = function() {
        return A(N.UseNavigation).navigation;
      }, e.useNavigationType = function() {
        return a.useContext(c).navigationType;
      }, e.useOutlet = g, e.useOutletContext = function() {
        return a.useContext(E);
      }, e.useParams = function() {
        let { matches: e2 } = a.useContext(d), t2 = e2[e2.length - 1];
        return t2 ? t2.params : {};
      }, e.useResolvedPath = y, e.useRevalidator = function() {
        let e2 = O(_.UseRevalidator), t2 = A(N.UseRevalidator);
        return a.useMemo(() => ({ revalidate: e2.router.revalidate, state: t2.revalidation }), [e2.router.revalidate, t2.revalidation]);
      }, e.useRouteError = F, e.useRouteLoaderData = function(e2) {
        return A(N.UseRouteLoaderData).loaderData[e2];
      }, e.useRoutes = b, Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// ../../../node_modules/.pnpm/react-router@6.22.3_react@18.2.0/node_modules/react-router/dist/main.js
var require_main = __commonJS({
  "../../../node_modules/.pnpm/react-router@6.22.3_react@18.2.0/node_modules/react-router/dist/main.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    if (true) {
      module.exports = require_react_router_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/.pnpm/react-router-dom@6.22.3_react-dom@18.2.0_react@18.2.0/node_modules/react-router-dom/dist/umd/react-router-dom.production.min.js
var require_react_router_dom_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-router-dom@6.22.3_react-dom@18.2.0_react@18.2.0/node_modules/react-router-dom/dist/umd/react-router-dom.production.min.js"(exports, module) {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? t(exports, require_react(), require_react_dom(), require_main(), require_router_cjs()) : "function" == typeof define && define.amd ? define(["exports", "react", "react-dom", "react-router", "@remix-run/router"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).ReactRouterDOM = {}, e.React, e.ReactDOM, e.ReactRouter, e.RemixRouter);
    }(exports, function(e, t, n, r, o) {
      "use strict";
      function a(e2) {
        if (e2 && e2.__esModule)
          return e2;
        var t2 = /* @__PURE__ */ Object.create(null);
        return e2 && Object.keys(e2).forEach(function(n2) {
          if ("default" !== n2) {
            var r2 = Object.getOwnPropertyDescriptor(e2, n2);
            Object.defineProperty(t2, n2, r2.get ? r2 : { enumerable: true, get: function() {
              return e2[n2];
            } });
          }
        }), t2.default = e2, Object.freeze(t2);
      }
      var i = a(t), u = a(n);
      function s() {
        return s = Object.assign ? Object.assign.bind() : function(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2)
              Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
          }
          return e2;
        }, s.apply(this, arguments);
      }
      function c(e2, t2) {
        if (null == e2)
          return {};
        var n2, r2, o2 = {}, a2 = Object.keys(e2);
        for (r2 = 0; r2 < a2.length; r2++)
          n2 = a2[r2], t2.indexOf(n2) >= 0 || (o2[n2] = e2[n2]);
        return o2;
      }
      const l = "get", f = "application/x-www-form-urlencoded";
      function d(e2) {
        return null != e2 && "string" == typeof e2.tagName;
      }
      function m(e2) {
        return void 0 === e2 && (e2 = ""), new URLSearchParams("string" == typeof e2 || Array.isArray(e2) || e2 instanceof URLSearchParams ? e2 : Object.keys(e2).reduce((t2, n2) => {
          let r2 = e2[n2];
          return t2.concat(Array.isArray(r2) ? r2.map((e3) => [n2, e3]) : [[n2, r2]]);
        }, []));
      }
      let p = null;
      const b = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
      function h(e2) {
        return null == e2 || b.has(e2) ? e2 : null;
      }
      function v(e2, t2) {
        let n2, r2, a2, i2, u2;
        if (d(s2 = e2) && "form" === s2.tagName.toLowerCase()) {
          let u3 = e2.getAttribute("action");
          r2 = u3 ? o.stripBasename(u3, t2) : null, n2 = e2.getAttribute("method") || l, a2 = h(e2.getAttribute("enctype")) || f, i2 = new FormData(e2);
        } else if (function(e3) {
          return d(e3) && "button" === e3.tagName.toLowerCase();
        }(e2) || function(e3) {
          return d(e3) && "input" === e3.tagName.toLowerCase();
        }(e2) && ("submit" === e2.type || "image" === e2.type)) {
          let u3 = e2.form;
          if (null == u3)
            throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
          let s3 = e2.getAttribute("formaction") || u3.getAttribute("action");
          if (r2 = s3 ? o.stripBasename(s3, t2) : null, n2 = e2.getAttribute("formmethod") || u3.getAttribute("method") || l, a2 = h(e2.getAttribute("formenctype")) || h(u3.getAttribute("enctype")) || f, i2 = new FormData(u3, e2), !function() {
            if (null === p)
              try {
                new FormData(document.createElement("form"), 0), p = false;
              } catch (e3) {
                p = true;
              }
            return p;
          }()) {
            let { name: t3, type: n3, value: r3 } = e2;
            if ("image" === n3) {
              let e3 = t3 ? t3 + "." : "";
              i2.append(e3 + "x", "0"), i2.append(e3 + "y", "0");
            } else
              t3 && i2.append(t3, r3);
          }
        } else {
          if (d(e2))
            throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
          n2 = l, r2 = null, a2 = f, u2 = e2;
        }
        var s2;
        return i2 && "text/plain" === a2 && (u2 = i2, i2 = void 0), { action: r2, method: n2.toLowerCase(), encType: a2, formData: i2, body: u2 };
      }
      const y = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], g = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], w = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"];
      try {
        window.__reactRouterVersion = "6";
      } catch (e2) {
      }
      function R() {
        var e2;
        let t2 = null == (e2 = window) ? void 0 : e2.__staticRouterHydrationData;
        return t2 && t2.errors && (t2 = s({}, t2, { errors: S(t2.errors) })), t2;
      }
      function S(e2) {
        if (!e2)
          return null;
        let t2 = Object.entries(e2), n2 = {};
        for (let [e3, r2] of t2)
          if (r2 && "RouteErrorResponse" === r2.__type)
            n2[e3] = new o.UNSAFE_ErrorResponseImpl(r2.status, r2.statusText, r2.data, true === r2.internal);
          else if (r2 && "Error" === r2.__type) {
            if (r2.__subType) {
              let t3 = window[r2.__subType];
              if ("function" == typeof t3)
                try {
                  let o2 = new t3(r2.message);
                  o2.stack = "", n2[e3] = o2;
                } catch (e4) {
                }
            }
            if (null == n2[e3]) {
              let t3 = new Error(r2.message);
              t3.stack = "", n2[e3] = t3;
            }
          } else
            n2[e3] = r2;
        return n2;
      }
      const E = i.createContext({ isTransitioning: false }), P = i.createContext(/* @__PURE__ */ new Map()), _ = i.startTransition, O = u.flushSync, C = i.useId;
      function x(e2) {
        O ? O(e2) : e2();
      }
      class A {
        constructor() {
          this.status = "pending", this.promise = new Promise((e2, t2) => {
            this.resolve = (t3) => {
              "pending" === this.status && (this.status = "resolved", e2(t3));
            }, this.reject = (e3) => {
              "pending" === this.status && (this.status = "rejected", t2(e3));
            };
          });
        }
      }
      function j(e2) {
        let { routes: t2, future: n2, state: o2 } = e2;
        return r.UNSAFE_useRoutesImpl(t2, void 0, o2, n2);
      }
      const N = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement, F = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, L = i.forwardRef(function(e2, t2) {
        let n2, { onClick: a2, relative: u2, reloadDocument: l2, replace: f2, state: d2, target: m2, to: p2, preventScrollReset: b2, unstable_viewTransition: h2 } = e2, v2 = c(e2, y), { basename: g2 } = i.useContext(r.UNSAFE_NavigationContext), w2 = false;
        if ("string" == typeof p2 && F.test(p2) && (n2 = p2, N))
          try {
            let e3 = new URL(window.location.href), t3 = p2.startsWith("//") ? new URL(e3.protocol + p2) : new URL(p2), n3 = o.stripBasename(t3.pathname, g2);
            t3.origin === e3.origin && null != n3 ? p2 = n3 + t3.search + t3.hash : w2 = true;
          } catch (e3) {
          }
        let R2 = r.useHref(p2, { relative: u2 }), S2 = H(p2, { replace: f2, state: d2, target: m2, preventScrollReset: b2, relative: u2, unstable_viewTransition: h2 });
        return i.createElement("a", s({}, v2, { href: n2 || R2, onClick: w2 || l2 ? a2 : function(e3) {
          a2 && a2(e3), e3.defaultPrevented || S2(e3);
        }, ref: t2, target: m2 }));
      }), T = i.forwardRef(function(e2, t2) {
        let { "aria-current": n2 = "page", caseSensitive: a2 = false, className: u2 = "", end: l2 = false, style: f2, to: d2, unstable_viewTransition: m2, children: p2 } = e2, b2 = c(e2, g), h2 = r.useResolvedPath(d2, { relative: b2.relative }), v2 = r.useLocation(), y2 = i.useContext(r.UNSAFE_DataRouterStateContext), { navigator: w2, basename: R2 } = i.useContext(r.UNSAFE_NavigationContext), S2 = null != y2 && J(h2) && true === m2, E2 = w2.encodeLocation ? w2.encodeLocation(h2).pathname : h2.pathname, P2 = v2.pathname, _2 = y2 && y2.navigation && y2.navigation.location ? y2.navigation.location.pathname : null;
        a2 || (P2 = P2.toLowerCase(), _2 = _2 ? _2.toLowerCase() : null, E2 = E2.toLowerCase()), _2 && R2 && (_2 = o.stripBasename(_2, R2) || _2);
        const O2 = "/" !== E2 && E2.endsWith("/") ? E2.length - 1 : E2.length;
        let C2, x2 = P2 === E2 || !l2 && P2.startsWith(E2) && "/" === P2.charAt(O2), A2 = null != _2 && (_2 === E2 || !l2 && _2.startsWith(E2) && "/" === _2.charAt(E2.length)), j2 = { isActive: x2, isPending: A2, isTransitioning: S2 }, N2 = x2 ? n2 : void 0;
        C2 = "function" == typeof u2 ? u2(j2) : [u2, x2 ? "active" : null, A2 ? "pending" : null, S2 ? "transitioning" : null].filter(Boolean).join(" ");
        let F2 = "function" == typeof f2 ? f2(j2) : f2;
        return i.createElement(L, s({}, b2, { "aria-current": N2, className: C2, ref: t2, style: F2, to: d2, unstable_viewTransition: m2 }), "function" == typeof p2 ? p2(j2) : p2);
      }), U = i.forwardRef((e2, t2) => {
        let { fetcherKey: n2, navigate: r2, reloadDocument: o2, replace: a2, state: u2, method: f2 = l, action: d2, onSubmit: m2, relative: p2, preventScrollReset: b2, unstable_viewTransition: h2 } = e2, v2 = c(e2, w), y2 = V(), g2 = z2(d2, { relative: p2 }), R2 = "get" === f2.toLowerCase() ? "get" : "post";
        return i.createElement("form", s({ ref: t2, method: R2, action: g2, onSubmit: o2 ? m2 : (e3) => {
          if (m2 && m2(e3), e3.defaultPrevented)
            return;
          e3.preventDefault();
          let t3 = e3.nativeEvent.submitter, o3 = (null == t3 ? void 0 : t3.getAttribute("formmethod")) || f2;
          y2(t3 || e3.currentTarget, { fetcherKey: n2, method: o3, navigate: r2, replace: a2, state: u2, relative: p2, preventScrollReset: b2, unstable_viewTransition: h2 });
        } }, v2));
      });
      var D = function(e2) {
        return e2.UseScrollRestoration = "useScrollRestoration", e2.UseSubmit = "useSubmit", e2.UseSubmitFetcher = "useSubmitFetcher", e2.UseFetcher = "useFetcher", e2.useViewTransitionState = "useViewTransitionState", e2;
      }(D || {}), k = function(e2) {
        return e2.UseFetcher = "useFetcher", e2.UseFetchers = "useFetchers", e2.UseScrollRestoration = "useScrollRestoration", e2;
      }(k || {});
      function M(e2) {
        let t2 = i.useContext(r.UNSAFE_DataRouterContext);
        return t2 || o.UNSAFE_invariant(false), t2;
      }
      function B(e2) {
        let t2 = i.useContext(r.UNSAFE_DataRouterStateContext);
        return t2 || o.UNSAFE_invariant(false), t2;
      }
      function H(e2, t2) {
        let { target: n2, replace: o2, state: a2, preventScrollReset: u2, relative: s2, unstable_viewTransition: c2 } = void 0 === t2 ? {} : t2, l2 = r.useNavigate(), f2 = r.useLocation(), d2 = r.useResolvedPath(e2, { relative: s2 });
        return i.useCallback((t3) => {
          if (function(e3, t4) {
            return !(0 !== e3.button || t4 && "_self" !== t4 || function(e4) {
              return !!(e4.metaKey || e4.altKey || e4.ctrlKey || e4.shiftKey);
            }(e3));
          }(t3, n2)) {
            t3.preventDefault();
            let n3 = void 0 !== o2 ? o2 : r.createPath(f2) === r.createPath(d2);
            l2(e2, { replace: n3, state: a2, preventScrollReset: u2, relative: s2, unstable_viewTransition: c2 });
          }
        }, [f2, l2, d2, o2, a2, n2, e2, u2, s2, c2]);
      }
      let K = 0, I = () => "__" + String(++K) + "__";
      function V() {
        let { router: e2 } = M(D.UseSubmit), { basename: t2 } = i.useContext(r.UNSAFE_NavigationContext), n2 = r.UNSAFE_useRouteId();
        return i.useCallback(function(r2, o2) {
          void 0 === o2 && (o2 = {}), function() {
            if ("undefined" == typeof document)
              throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
          }();
          let { action: a2, method: i2, encType: u2, formData: s2, body: c2 } = v(r2, t2);
          if (false === o2.navigate) {
            let t3 = o2.fetcherKey || I();
            e2.fetch(t3, n2, o2.action || a2, { preventScrollReset: o2.preventScrollReset, formData: s2, body: c2, formMethod: o2.method || i2, formEncType: o2.encType || u2, unstable_flushSync: o2.unstable_flushSync });
          } else
            e2.navigate(o2.action || a2, { preventScrollReset: o2.preventScrollReset, formData: s2, body: c2, formMethod: o2.method || i2, formEncType: o2.encType || u2, replace: o2.replace, state: o2.state, fromRouteId: n2, unstable_flushSync: o2.unstable_flushSync, unstable_viewTransition: o2.unstable_viewTransition });
        }, [e2, t2, n2]);
      }
      function z2(e2, t2) {
        let { relative: n2 } = void 0 === t2 ? {} : t2, { basename: a2 } = i.useContext(r.UNSAFE_NavigationContext), u2 = i.useContext(r.UNSAFE_RouteContext);
        u2 || o.UNSAFE_invariant(false);
        let [c2] = u2.matches.slice(-1), l2 = s({}, r.useResolvedPath(e2 || ".", { relative: n2 })), f2 = r.useLocation();
        if (null == e2) {
          l2.search = f2.search;
          let e3 = new URLSearchParams(l2.search);
          e3.has("index") && "" === e3.get("index") && (e3.delete("index"), l2.search = e3.toString() ? "?" + e3.toString() : "");
        }
        return e2 && "." !== e2 || !c2.route.index || (l2.search = l2.search ? l2.search.replace(/^\?/, "?index&") : "?index"), "/" !== a2 && (l2.pathname = "/" === l2.pathname ? a2 : o.joinPaths([a2, l2.pathname])), r.createPath(l2);
      }
      const q = "react-router-scroll-positions";
      let W = {};
      function Y(e2) {
        let { getKey: t2, storageKey: n2 } = void 0 === e2 ? {} : e2, { router: a2 } = M(D.UseScrollRestoration), { restoreScrollPosition: u2, preventScrollReset: c2 } = B(k.UseScrollRestoration), { basename: l2 } = i.useContext(r.UNSAFE_NavigationContext), f2 = r.useLocation(), d2 = r.useMatches(), m2 = r.useNavigation();
        i.useEffect(() => (window.history.scrollRestoration = "manual", () => {
          window.history.scrollRestoration = "auto";
        }), []), function(e3, t3) {
          let { capture: n3 } = t3 || {};
          i.useEffect(() => {
            let t4 = null != n3 ? { capture: n3 } : void 0;
            return window.addEventListener("pagehide", e3, t4), () => {
              window.removeEventListener("pagehide", e3, t4);
            };
          }, [e3, n3]);
        }(i.useCallback(() => {
          if ("idle" === m2.state) {
            let e3 = (t2 ? t2(f2, d2) : null) || f2.key;
            W[e3] = window.scrollY;
          }
          try {
            sessionStorage.setItem(n2 || q, JSON.stringify(W));
          } catch (e3) {
          }
          window.history.scrollRestoration = "auto";
        }, [n2, t2, m2.state, f2, d2])), "undefined" != typeof document && (i.useLayoutEffect(() => {
          try {
            let e3 = sessionStorage.getItem(n2 || q);
            e3 && (W = JSON.parse(e3));
          } catch (e3) {
          }
        }, [n2]), i.useLayoutEffect(() => {
          let e3 = t2 && "/" !== l2 ? (e4, n4) => t2(s({}, e4, { pathname: o.stripBasename(e4.pathname, l2) || e4.pathname }), n4) : t2, n3 = null == a2 ? void 0 : a2.enableScrollRestoration(W, () => window.scrollY, e3);
          return () => n3 && n3();
        }, [a2, l2, t2]), i.useLayoutEffect(() => {
          if (false !== u2)
            if ("number" != typeof u2) {
              if (f2.hash) {
                let e3 = document.getElementById(decodeURIComponent(f2.hash.slice(1)));
                if (e3)
                  return void e3.scrollIntoView();
              }
              true !== c2 && window.scrollTo(0, 0);
            } else
              window.scrollTo(0, u2);
        }, [f2, u2, c2]));
      }
      function J(e2, t2) {
        void 0 === t2 && (t2 = {});
        let n2 = i.useContext(E);
        null == n2 && o.UNSAFE_invariant(false);
        let { basename: a2 } = M(D.useViewTransitionState), u2 = r.useResolvedPath(e2, { relative: t2.relative });
        if (!n2.isTransitioning)
          return false;
        let s2 = o.stripBasename(n2.currentLocation.pathname, a2) || n2.currentLocation.pathname, c2 = o.stripBasename(n2.nextLocation.pathname, a2) || n2.nextLocation.pathname;
        return null != o.matchPath(u2.pathname, c2) || null != o.matchPath(u2.pathname, s2);
      }
      Object.defineProperty(e, "AbortedDeferredError", { enumerable: true, get: function() {
        return r.AbortedDeferredError;
      } }), Object.defineProperty(e, "Await", { enumerable: true, get: function() {
        return r.Await;
      } }), Object.defineProperty(e, "MemoryRouter", { enumerable: true, get: function() {
        return r.MemoryRouter;
      } }), Object.defineProperty(e, "Navigate", { enumerable: true, get: function() {
        return r.Navigate;
      } }), Object.defineProperty(e, "NavigationType", { enumerable: true, get: function() {
        return r.NavigationType;
      } }), Object.defineProperty(e, "Outlet", { enumerable: true, get: function() {
        return r.Outlet;
      } }), Object.defineProperty(e, "Route", { enumerable: true, get: function() {
        return r.Route;
      } }), Object.defineProperty(e, "Router", { enumerable: true, get: function() {
        return r.Router;
      } }), Object.defineProperty(e, "Routes", { enumerable: true, get: function() {
        return r.Routes;
      } }), Object.defineProperty(e, "UNSAFE_DataRouterContext", { enumerable: true, get: function() {
        return r.UNSAFE_DataRouterContext;
      } }), Object.defineProperty(e, "UNSAFE_DataRouterStateContext", { enumerable: true, get: function() {
        return r.UNSAFE_DataRouterStateContext;
      } }), Object.defineProperty(e, "UNSAFE_LocationContext", { enumerable: true, get: function() {
        return r.UNSAFE_LocationContext;
      } }), Object.defineProperty(e, "UNSAFE_NavigationContext", { enumerable: true, get: function() {
        return r.UNSAFE_NavigationContext;
      } }), Object.defineProperty(e, "UNSAFE_RouteContext", { enumerable: true, get: function() {
        return r.UNSAFE_RouteContext;
      } }), Object.defineProperty(e, "UNSAFE_useRouteId", { enumerable: true, get: function() {
        return r.UNSAFE_useRouteId;
      } }), Object.defineProperty(e, "createMemoryRouter", { enumerable: true, get: function() {
        return r.createMemoryRouter;
      } }), Object.defineProperty(e, "createPath", { enumerable: true, get: function() {
        return r.createPath;
      } }), Object.defineProperty(e, "createRoutesFromChildren", { enumerable: true, get: function() {
        return r.createRoutesFromChildren;
      } }), Object.defineProperty(e, "createRoutesFromElements", { enumerable: true, get: function() {
        return r.createRoutesFromElements;
      } }), Object.defineProperty(e, "defer", { enumerable: true, get: function() {
        return r.defer;
      } }), Object.defineProperty(e, "generatePath", { enumerable: true, get: function() {
        return r.generatePath;
      } }), Object.defineProperty(e, "isRouteErrorResponse", { enumerable: true, get: function() {
        return r.isRouteErrorResponse;
      } }), Object.defineProperty(e, "json", { enumerable: true, get: function() {
        return r.json;
      } }), Object.defineProperty(e, "matchPath", { enumerable: true, get: function() {
        return r.matchPath;
      } }), Object.defineProperty(e, "matchRoutes", { enumerable: true, get: function() {
        return r.matchRoutes;
      } }), Object.defineProperty(e, "parsePath", { enumerable: true, get: function() {
        return r.parsePath;
      } }), Object.defineProperty(e, "redirect", { enumerable: true, get: function() {
        return r.redirect;
      } }), Object.defineProperty(e, "redirectDocument", { enumerable: true, get: function() {
        return r.redirectDocument;
      } }), Object.defineProperty(e, "renderMatches", { enumerable: true, get: function() {
        return r.renderMatches;
      } }), Object.defineProperty(e, "resolvePath", { enumerable: true, get: function() {
        return r.resolvePath;
      } }), Object.defineProperty(e, "useActionData", { enumerable: true, get: function() {
        return r.useActionData;
      } }), Object.defineProperty(e, "useAsyncError", { enumerable: true, get: function() {
        return r.useAsyncError;
      } }), Object.defineProperty(e, "useAsyncValue", { enumerable: true, get: function() {
        return r.useAsyncValue;
      } }), Object.defineProperty(e, "useBlocker", { enumerable: true, get: function() {
        return r.useBlocker;
      } }), Object.defineProperty(e, "useHref", { enumerable: true, get: function() {
        return r.useHref;
      } }), Object.defineProperty(e, "useInRouterContext", { enumerable: true, get: function() {
        return r.useInRouterContext;
      } }), Object.defineProperty(e, "useLoaderData", { enumerable: true, get: function() {
        return r.useLoaderData;
      } }), Object.defineProperty(e, "useLocation", { enumerable: true, get: function() {
        return r.useLocation;
      } }), Object.defineProperty(e, "useMatch", { enumerable: true, get: function() {
        return r.useMatch;
      } }), Object.defineProperty(e, "useMatches", { enumerable: true, get: function() {
        return r.useMatches;
      } }), Object.defineProperty(e, "useNavigate", { enumerable: true, get: function() {
        return r.useNavigate;
      } }), Object.defineProperty(e, "useNavigation", { enumerable: true, get: function() {
        return r.useNavigation;
      } }), Object.defineProperty(e, "useNavigationType", { enumerable: true, get: function() {
        return r.useNavigationType;
      } }), Object.defineProperty(e, "useOutlet", { enumerable: true, get: function() {
        return r.useOutlet;
      } }), Object.defineProperty(e, "useOutletContext", { enumerable: true, get: function() {
        return r.useOutletContext;
      } }), Object.defineProperty(e, "useParams", { enumerable: true, get: function() {
        return r.useParams;
      } }), Object.defineProperty(e, "useResolvedPath", { enumerable: true, get: function() {
        return r.useResolvedPath;
      } }), Object.defineProperty(e, "useRevalidator", { enumerable: true, get: function() {
        return r.useRevalidator;
      } }), Object.defineProperty(e, "useRouteError", { enumerable: true, get: function() {
        return r.useRouteError;
      } }), Object.defineProperty(e, "useRouteLoaderData", { enumerable: true, get: function() {
        return r.useRouteLoaderData;
      } }), Object.defineProperty(e, "useRoutes", { enumerable: true, get: function() {
        return r.useRoutes;
      } }), e.BrowserRouter = function(e2) {
        let { basename: t2, children: n2, future: a2, window: u2 } = e2, s2 = i.useRef();
        null == s2.current && (s2.current = o.createBrowserHistory({ window: u2, v5Compat: true }));
        let c2 = s2.current, [l2, f2] = i.useState({ action: c2.action, location: c2.location }), { v7_startTransition: d2 } = a2 || {}, m2 = i.useCallback((e3) => {
          d2 && _ ? _(() => f2(e3)) : f2(e3);
        }, [f2, d2]);
        return i.useLayoutEffect(() => c2.listen(m2), [c2, m2]), i.createElement(r.Router, { basename: t2, children: n2, location: l2.location, navigationType: l2.action, navigator: c2, future: a2 });
      }, e.Form = U, e.HashRouter = function(e2) {
        let { basename: t2, children: n2, future: a2, window: u2 } = e2, s2 = i.useRef();
        null == s2.current && (s2.current = o.createHashHistory({ window: u2, v5Compat: true }));
        let c2 = s2.current, [l2, f2] = i.useState({ action: c2.action, location: c2.location }), { v7_startTransition: d2 } = a2 || {}, m2 = i.useCallback((e3) => {
          d2 && _ ? _(() => f2(e3)) : f2(e3);
        }, [f2, d2]);
        return i.useLayoutEffect(() => c2.listen(m2), [c2, m2]), i.createElement(r.Router, { basename: t2, children: n2, location: l2.location, navigationType: l2.action, navigator: c2, future: a2 });
      }, e.Link = L, e.NavLink = T, e.RouterProvider = function(e2) {
        let { fallbackElement: t2, router: n2, future: o2 } = e2, [a2, u2] = i.useState(n2.state), [s2, c2] = i.useState(), [l2, f2] = i.useState({ isTransitioning: false }), [d2, m2] = i.useState(), [p2, b2] = i.useState(), [h2, v2] = i.useState(), y2 = i.useRef(/* @__PURE__ */ new Map()), { v7_startTransition: g2 } = o2 || {}, w2 = i.useCallback((e3) => {
          g2 ? function(e4) {
            _ ? _(e4) : e4();
          }(e3) : e3();
        }, [g2]), R2 = i.useCallback((e3, t3) => {
          let { deletedFetchers: r2, unstable_flushSync: o3, unstable_viewTransitionOpts: a3 } = t3;
          r2.forEach((e4) => y2.current.delete(e4)), e3.fetchers.forEach((e4, t4) => {
            void 0 !== e4.data && y2.current.set(t4, e4.data);
          });
          let i2 = null == n2.window || "function" != typeof n2.window.document.startViewTransition;
          if (a3 && !i2) {
            if (o3) {
              x(() => {
                p2 && (d2 && d2.resolve(), p2.skipTransition()), f2({ isTransitioning: true, flushSync: true, currentLocation: a3.currentLocation, nextLocation: a3.nextLocation });
              });
              let t4 = n2.window.document.startViewTransition(() => {
                x(() => u2(e3));
              });
              return t4.finished.finally(() => {
                x(() => {
                  m2(void 0), b2(void 0), c2(void 0), f2({ isTransitioning: false });
                });
              }), void x(() => b2(t4));
            }
            p2 ? (d2 && d2.resolve(), p2.skipTransition(), v2({ state: e3, currentLocation: a3.currentLocation, nextLocation: a3.nextLocation })) : (c2(e3), f2({ isTransitioning: true, flushSync: false, currentLocation: a3.currentLocation, nextLocation: a3.nextLocation }));
          } else
            o3 ? x(() => u2(e3)) : w2(() => u2(e3));
        }, [n2.window, p2, d2, y2, w2]);
        i.useLayoutEffect(() => n2.subscribe(R2), [n2, R2]), i.useEffect(() => {
          l2.isTransitioning && !l2.flushSync && m2(new A());
        }, [l2]), i.useEffect(() => {
          if (d2 && s2 && n2.window) {
            let e3 = s2, t3 = d2.promise, r2 = n2.window.document.startViewTransition(async () => {
              w2(() => u2(e3)), await t3;
            });
            r2.finished.finally(() => {
              m2(void 0), b2(void 0), c2(void 0), f2({ isTransitioning: false });
            }), b2(r2);
          }
        }, [w2, s2, d2, n2.window]), i.useEffect(() => {
          d2 && s2 && a2.location.key === s2.location.key && d2.resolve();
        }, [d2, p2, a2.location, s2]), i.useEffect(() => {
          !l2.isTransitioning && h2 && (c2(h2.state), f2({ isTransitioning: true, flushSync: false, currentLocation: h2.currentLocation, nextLocation: h2.nextLocation }), v2(void 0));
        }, [l2.isTransitioning, h2]), i.useEffect(() => {
        }, []);
        let S2 = i.useMemo(() => ({ createHref: n2.createHref, encodeLocation: n2.encodeLocation, go: (e3) => n2.navigate(e3), push: (e3, t3, r2) => n2.navigate(e3, { state: t3, preventScrollReset: null == r2 ? void 0 : r2.preventScrollReset }), replace: (e3, t3, r2) => n2.navigate(e3, { replace: true, state: t3, preventScrollReset: null == r2 ? void 0 : r2.preventScrollReset }) }), [n2]), O2 = n2.basename || "/", C2 = i.useMemo(() => ({ router: n2, navigator: S2, static: false, basename: O2 }), [n2, S2, O2]);
        return i.createElement(i.Fragment, null, i.createElement(r.UNSAFE_DataRouterContext.Provider, { value: C2 }, i.createElement(r.UNSAFE_DataRouterStateContext.Provider, { value: a2 }, i.createElement(P.Provider, { value: y2.current }, i.createElement(E.Provider, { value: l2 }, i.createElement(r.Router, { basename: O2, location: a2.location, navigationType: a2.historyAction, navigator: S2, future: { v7_relativeSplatPath: n2.future.v7_relativeSplatPath } }, a2.initialized || n2.future.v7_partialHydration ? i.createElement(j, { routes: n2.routes, future: n2.future, state: a2 }) : t2))))), null);
      }, e.ScrollRestoration = function(e2) {
        let { getKey: t2, storageKey: n2 } = e2;
        return Y({ getKey: t2, storageKey: n2 }), null;
      }, e.UNSAFE_FetchersContext = P, e.UNSAFE_ViewTransitionContext = E, e.UNSAFE_useScrollRestoration = Y, e.createBrowserRouter = function(e2, t2) {
        return o.createRouter({ basename: null == t2 ? void 0 : t2.basename, future: s({}, null == t2 ? void 0 : t2.future, { v7_prependBasename: true }), history: o.createBrowserHistory({ window: null == t2 ? void 0 : t2.window }), hydrationData: (null == t2 ? void 0 : t2.hydrationData) || R(), routes: e2, mapRouteProperties: r.UNSAFE_mapRouteProperties, window: null == t2 ? void 0 : t2.window }).initialize();
      }, e.createHashRouter = function(e2, t2) {
        return o.createRouter({ basename: null == t2 ? void 0 : t2.basename, future: s({}, null == t2 ? void 0 : t2.future, { v7_prependBasename: true }), history: o.createHashHistory({ window: null == t2 ? void 0 : t2.window }), hydrationData: (null == t2 ? void 0 : t2.hydrationData) || R(), routes: e2, mapRouteProperties: r.UNSAFE_mapRouteProperties, window: null == t2 ? void 0 : t2.window }).initialize();
      }, e.createSearchParams = m, e.unstable_HistoryRouter = function(e2) {
        let { basename: t2, children: n2, future: o2, history: a2 } = e2, [u2, s2] = i.useState({ action: a2.action, location: a2.location }), { v7_startTransition: c2 } = o2 || {}, l2 = i.useCallback((e3) => {
          c2 && _ ? _(() => s2(e3)) : s2(e3);
        }, [s2, c2]);
        return i.useLayoutEffect(() => a2.listen(l2), [a2, l2]), i.createElement(r.Router, { basename: t2, children: n2, location: u2.location, navigationType: u2.action, navigator: a2, future: o2 });
      }, e.unstable_usePrompt = function(e2) {
        let { when: t2, message: n2 } = e2, o2 = r.useBlocker(t2);
        i.useEffect(() => {
          if ("blocked" === o2.state) {
            window.confirm(n2) ? setTimeout(o2.proceed, 0) : o2.reset();
          }
        }, [o2, n2]), i.useEffect(() => {
          "blocked" !== o2.state || t2 || o2.reset();
        }, [o2, t2]);
      }, e.unstable_useViewTransitionState = J, e.useBeforeUnload = function(e2, t2) {
        let { capture: n2 } = t2 || {};
        i.useEffect(() => {
          let t3 = null != n2 ? { capture: n2 } : void 0;
          return window.addEventListener("beforeunload", e2, t3), () => {
            window.removeEventListener("beforeunload", e2, t3);
          };
        }, [e2, n2]);
      }, e.useFetcher = function(e2) {
        var t2;
        let { key: n2 } = void 0 === e2 ? {} : e2, { router: a2 } = M(D.UseFetcher), u2 = B(k.UseFetcher), c2 = i.useContext(P), l2 = i.useContext(r.UNSAFE_RouteContext), f2 = null == (t2 = l2.matches[l2.matches.length - 1]) ? void 0 : t2.route.id;
        c2 || o.UNSAFE_invariant(false), l2 || o.UNSAFE_invariant(false), null == f2 && o.UNSAFE_invariant(false);
        let d2 = C ? C() : "", [m2, p2] = i.useState(n2 || d2);
        n2 && n2 !== m2 ? p2(n2) : m2 || p2(I()), i.useEffect(() => (a2.getFetcher(m2), () => {
          a2.deleteFetcher(m2);
        }), [a2, m2]);
        let b2 = i.useCallback((e3, t3) => {
          f2 || o.UNSAFE_invariant(false), a2.fetch(m2, f2, e3, t3);
        }, [m2, f2, a2]), h2 = V(), v2 = i.useCallback((e3, t3) => {
          h2(e3, s({}, t3, { navigate: false, fetcherKey: m2 }));
        }, [m2, h2]), y2 = i.useMemo(() => i.forwardRef((e3, t3) => i.createElement(U, s({}, e3, { navigate: false, fetcherKey: m2, ref: t3 }))), [m2]), g2 = u2.fetchers.get(m2) || o.IDLE_FETCHER, w2 = c2.get(m2);
        return i.useMemo(() => s({ Form: y2, submit: v2, load: b2 }, g2, { data: w2 }), [y2, v2, b2, g2, w2]);
      }, e.useFetchers = function() {
        let e2 = B(k.UseFetchers);
        return Array.from(e2.fetchers.entries()).map((e3) => {
          let [t2, n2] = e3;
          return s({}, n2, { key: t2 });
        });
      }, e.useFormAction = z2, e.useLinkClickHandler = H, e.useSearchParams = function(e2) {
        let t2 = i.useRef(m(e2)), n2 = i.useRef(false), o2 = r.useLocation(), a2 = i.useMemo(() => function(e3, t3) {
          let n3 = m(e3);
          return t3 && t3.forEach((e4, r2) => {
            n3.has(r2) || t3.getAll(r2).forEach((e5) => {
              n3.append(r2, e5);
            });
          }), n3;
        }(o2.search, n2.current ? null : t2.current), [o2.search]), u2 = r.useNavigate(), s2 = i.useCallback((e3, t3) => {
          const r2 = m("function" == typeof e3 ? e3(a2) : e3);
          n2.current = true, u2("?" + r2, t3);
        }, [u2, a2]);
        return [a2, s2];
      }, e.useSubmit = V, Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// ../../../node_modules/.pnpm/react-router-dom@6.22.3_react-dom@18.2.0_react@18.2.0/node_modules/react-router-dom/dist/main.js
var require_main2 = __commonJS({
  "../../../node_modules/.pnpm/react-router-dom@6.22.3_react-dom@18.2.0_react@18.2.0/node_modules/react-router-dom/dist/main.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    if (true) {
      module.exports = require_react_router_dom_production_min();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var init_rollupPluginBabelHelpers = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/invariant.js
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
var init_invariant = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/invariant.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    if (window.__remixContext.isSpaMode && // @ts-expect-error
    typeof import.meta.hot !== "undefined") {
      console.error(`Error loading route module \`${route.module}\`:`, error);
      throw error;
    }
    window.location.reload();
    return new Promise(() => {
    });
  }
}
var init_routeModules = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/routeModules.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/links.js
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match3) => {
    var _module$links;
    let module = routeModules[match3.route.id];
    let route = manifest.routes[match3.route.id];
    return [route.css ? route.css.map((href) => ({
      rel: "stylesheet",
      href
    })) : [], (module === null || module === void 0 ? void 0 : (_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || []];
  }).flat(2);
  let preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(matches.map(async (match3) => {
    let mod = await loadRouteModule(manifest.routes[match3.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }));
  return dedupeLinkDescriptors(links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
    ...link,
    rel: "prefetch",
    as: "style"
  } : {
    ...link,
    rel: "prefetch"
  }));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode2) {
  let path = parsePathPatch(page);
  let isNew = (match3, index) => {
    if (!currentMatches[index])
      return true;
    return match3.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match3, index) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match3.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match3.params["*"]
    );
  };
  let newMatches = mode2 === "data" && location.search !== path.search ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match3, index) => {
      let manifestRoute = manifest.routes[match3.route.id];
      if (!manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match3, index) || matchPathChanged(match3, index)) {
        return true;
      }
      if (match3.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match3.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match3.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    })
  ) : nextMatches.filter((match3, index) => {
    let manifestRoute = manifest.routes[match3.route.id];
    return (mode2 === "assets" || manifestRoute.hasLoader) && (isNew(match3, index) || matchPathChanged(match3, index));
  });
  return newMatches;
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match3) => manifest.routes[match3.route.id].hasLoader).map((match3) => {
    let {
      pathname,
      search
    } = path;
    let searchParams = new URLSearchParams(search);
    searchParams.set("_data", match3.route.id);
    return `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match3) => {
    let route = manifestPatch.routes[match3.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match3) => {
    let route = manifest.routes[match3.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({
        key,
        link: descriptor
      });
    }
    return deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = (0, import_react_router_dom.parsePath)(href);
  if (path.search === void 0)
    path.search = "";
  return path;
}
var import_react_router_dom;
var init_links = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/links.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    import_react_router_dom = __toESM(require_main2());
    init_routeModules();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/markup.js
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match3) => ESCAPE_LOOKUP[match3]);
}
function createHtml(html) {
  return {
    __html: html
  };
}
var ESCAPE_LOOKUP, ESCAPE_REGEX;
var init_markup = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/markup.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/components.js
function useDataRouterContext() {
  let context = React.useContext(import_react_router_dom2.UNSAFE_DataRouterContext);
  invariant(context, "You must render this element inside a <DataRouterContext.Provider> element");
  return context;
}
function useDataRouterStateContext() {
  let context = React.useContext(import_react_router_dom2.UNSAFE_DataRouterStateContext);
  invariant(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
  return context;
}
function useRemixContext() {
  let context = React.useContext(RemixContext);
  invariant(context, "You must render this element inside a <Remix> element");
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React.useState(false);
  let {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps;
  let ref = React.useRef(null);
  React.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      if (ref.current)
        observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(true);
    }
  };
  let cancelIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    }
  };
  React.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  return [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode2) {
  if (isSpaMode2 && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id]);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
function Links() {
  let {
    isSpaMode: isSpaMode2,
    manifest,
    routeModules,
    criticalCss
  } = useRemixContext();
  let {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let keyedLinks = React.useMemo(() => getKeyedLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, criticalCss ? /* @__PURE__ */ React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: criticalCss
    }
  }) : null, keyedLinks.map(({
    key,
    link
  }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ React.createElement(PrefetchPageLinks, _extends({
    key
  }, link)) : /* @__PURE__ */ React.createElement("link", _extends({
    key
  }, link))));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext();
  let matches = React.useMemo(() => (0, import_react_router_dom2.matchRoutes)(router.routes, page, router.basename), [router.routes, page, router.basename]);
  if (!matches) {
    console.warn(`Tried to prefetch ${page} but no routes matched.`);
    return null;
  }
  return /* @__PURE__ */ React.createElement(PrefetchPageLinksImpl, _extends({
    page,
    matches
  }, dataLinkProps));
}
function useKeyedPrefetchLinks(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React.useState([]);
  React.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then((links) => {
      if (!interrupted) {
        setKeyedPrefetchLinks(links);
      }
    });
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = (0, import_react_router_dom2.useLocation)();
  let {
    manifest
  } = useRemixContext();
  let {
    matches
  } = useDataRouterStateContext();
  let newMatchesForData = React.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]);
  let newMatchesForAssets = React.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]);
  let dataHrefs = React.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]);
  let moduleHrefs = React.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React.createElement("link", _extends({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React.createElement("link", _extends({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), keyedPrefetchLinks.map(({
    key,
    link
  }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React.createElement("link", _extends({
      key
    }, link))
  )));
}
function Meta() {
  let {
    isSpaMode: isSpaMode2,
    routeModules
  } = useRemixContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = (0, import_react_router_dom2.useLocation)();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta2 = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match3 = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match3;
    if (routeModule !== null && routeModule !== void 0 && routeModule.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error("The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta");
    }
    match3.meta = routeMeta;
    matches[i] = match3;
    meta2 = [...routeMeta];
    leafMeta = meta2;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let {
        tagName,
        ...rest
      } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`);
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ React.createElement(Comp, _extends({
        key: JSON.stringify(rest)
      }, rest));
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ React.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ??= metaProps.charset;
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ React.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json2 = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ React.createElement("script", {
          key: `script:ld+json:${json2}`,
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: json2
          }
        });
      } catch (err) {
        return null;
      }
    }
    return /* @__PURE__ */ React.createElement("meta", _extends({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
function Await(props) {
  return /* @__PURE__ */ React.createElement(import_react_router_dom2.Await, props);
}
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError,
    isSpaMode: isSpaMode2
  } = useRemixContext();
  let {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext();
  let {
    matches: routerMatches
  } = useDataRouterStateContext();
  let navigation = (0, import_react_router_dom2.useNavigation)();
  let matches = getActiveMatches(routerMatches, null, isSpaMode2);
  React.useEffect(() => {
    isHydrated = true;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    if (serializeError && error instanceof Error) {
      toSerialize = serializeError(error);
    } else {
      toSerialize = error;
    }
    return `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  };
  let serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml(serializedData)})`;
  };
  let serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    if (serializeError && error instanceof Error) {
      toSerialize = serializeError(error);
    } else {
      toSerialize = error;
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  };
  let serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml(serializedData)})`;
  };
  let deferredScripts = [];
  let initialScripts = React.useMemo(() => {
    var _manifest$hmr;
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};` : " ";
    let activeDeferreds = staticContext === null || staticContext === void 0 ? void 0 : staticContext.activeDeferreds;
    contextScript += !activeDeferreds ? "" : ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", false ? "    x=new Error(e.message);\n    x.stack=e.stack;" : '    x=new Error("Unexpected Server Error");\n    x.stack=undefined;', "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay === "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", false ? "    x=new Error(e.message);\n    x.stack=e.stack;" : '    x=new Error("Unexpected Server Error");\n    x.stack=undefined;', "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join("\n") + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys);
      let promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key)) {
          deferredScripts.push(/* @__PURE__ */ React.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          }));
          return `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        } else {
          let trackedPromise = deferredData.data[key];
          if (typeof trackedPromise._error !== "undefined") {
            return serializePreResolvedErrorImp(key, trackedPromise._error);
          } else {
            return serializePreresolvedDataImp(routeId, key, trackedPromise._data);
          }
        }
      }).join(",\n");
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join("\n") + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "");
    let routeModulesScript = !isStatic ? " " : `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}import ${JSON.stringify(manifest.url)};
${matches.map((match3, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match3.route.id].module)};`).join("\n")}
window.__remixRouteModules = {${matches.map((match3, index) => `${JSON.stringify(match3.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("script", _extends({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React.createElement("script", _extends({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: true
    })));
  }, []);
  if (!isStatic && typeof __remixContext === "object" && __remixContext.a) {
    for (let i = 0; i < __remixContext.a; i++) {
      deferredScripts.push(/* @__PURE__ */ React.createElement(DeferredHydrationScript, {
        key: i,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
    }
  }
  let nextMatches = React.useMemo(() => {
    if (navigation.location) {
      let matches2 = (0, import_react_router_dom2.matchRoutes)(router.routes, navigation.location, router.basename);
      invariant(matches2, `No routes match path "${navigation.location.pathname}"`);
      return matches2;
    }
    return [];
  }, [navigation.location, router.routes, router.basename]);
  let routePreloads = matches.concat(nextMatches).map((match3) => {
    let route = manifest.routes[match3.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1);
  let preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("link", {
    rel: "modulepreload",
    href: manifest.url,
    crossOrigin: props.crossOrigin
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe(preloads).map((path) => /* @__PURE__ */ React.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError
}) {
  if (typeof document === "undefined" && deferredData && dataKey && routeId) {
    invariant(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`);
  }
  return /* @__PURE__ */ React.createElement(React.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document === "undefined" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document === "undefined" && deferredData && dataKey && routeId ? /* @__PURE__ */ React.createElement(Await, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError
    }),
    children: (data) => {
      return /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: serializeData(routeId, dataKey, data)
        }
      }));
    }
  }) : /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
    async: true,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError
}) {
  let error = (0, import_react_router_dom2.useAsyncError)();
  return /* @__PURE__ */ React.createElement("script", _extends({}, scriptProps, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: serializeError(routeId, dataKey, error)
    }
  }));
}
function dedupe(array) {
  return [...new Set(array)];
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var React, import_react_router_dom2, RemixContext, ABSOLUTE_URL_REGEX, NavLink, Link, isHydrated;
var init_components = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/components.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_rollupPluginBabelHelpers();
    React = __toESM(require_react());
    import_react_router_dom2 = __toESM(require_main2());
    init_invariant();
    init_links();
    init_markup();
    RemixContext = /* @__PURE__ */ React.createContext(void 0);
    RemixContext.displayName = "Remix";
    ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    NavLink = /* @__PURE__ */ React.forwardRef(({
      to,
      prefetch = "none",
      ...props
    }, forwardedRef) => {
      let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
      let href = (0, import_react_router_dom2.useHref)(to);
      let [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_react_router_dom2.NavLink, _extends({}, props, prefetchHandlers, {
        ref: mergeRefs(forwardedRef, ref),
        to
      })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React.createElement(PrefetchPageLinks, {
        page: href
      }) : null);
    });
    NavLink.displayName = "NavLink";
    Link = /* @__PURE__ */ React.forwardRef(({
      to,
      prefetch = "none",
      ...props
    }, forwardedRef) => {
      let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
      let href = (0, import_react_router_dom2.useHref)(to);
      let [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_react_router_dom2.Link, _extends({}, props, prefetchHandlers, {
        ref: mergeRefs(forwardedRef, ref),
        to
      })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React.createElement(PrefetchPageLinks, {
        page: href
      }) : null);
    });
    Link.displayName = "Link";
    isHydrated = false;
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/errorBoundaries.js
function RemixRootDefaultErrorBoundary({
  error
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ React2.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `
    }
  });
  if ((0, import_react_router_dom3.isRouteErrorResponse)(error)) {
    return /* @__PURE__ */ React2.createElement(BoundaryShell, {
      title: "Unhandled Thrown Response!"
    }, /* @__PURE__ */ React2.createElement("h1", {
      style: {
        fontSize: "24px"
      }
    }, error.status, " ", error.statusText), heyDeveloper);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React2.createElement(BoundaryShell, {
    title: "Application Error!"
  }, /* @__PURE__ */ React2.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ React2.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, errorInstance.stack), heyDeveloper);
}
function BoundaryShell({
  title,
  renderScripts,
  children
}) {
  var _routeModules$root;
  let {
    routeModules
  } = useRemixContext();
  if ((_routeModules$root = routeModules.root) !== null && _routeModules$root !== void 0 && _routeModules$root.Layout) {
    return children;
  }
  return /* @__PURE__ */ React2.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React2.createElement("head", null, /* @__PURE__ */ React2.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ React2.createElement("title", null, title)), /* @__PURE__ */ React2.createElement("body", null, /* @__PURE__ */ React2.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, children, renderScripts ? /* @__PURE__ */ React2.createElement(Scripts, null) : null)));
}
var React2, import_react_router_dom3, RemixErrorBoundary;
var init_errorBoundaries = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/errorBoundaries.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    React2 = __toESM(require_react());
    import_react_router_dom3 = __toESM(require_main2());
    init_components();
    RemixErrorBoundary = class extends React2.Component {
      constructor(props) {
        super(props);
        this.state = {
          error: props.error || null,
          location: props.location
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      static getDerivedStateFromProps(props, state) {
        if (state.location !== props.location) {
          return {
            error: props.error || null,
            location: props.location
          };
        }
        return {
          error: props.error || state.error,
          location: state.location
        };
      }
      render() {
        if (this.state.error) {
          return /* @__PURE__ */ React2.createElement(RemixRootDefaultErrorBoundary, {
            error: this.state.error
          });
        } else {
          return this.props.children;
        }
      }
    };
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/fallback.js
function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ React3.createElement(BoundaryShell, {
    title: "Loading...",
    renderScripts: true
  }, /* @__PURE__ */ React3.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            `
    }
  }));
}
var React3;
var init_fallback = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/fallback.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    React3 = __toESM(require_react());
    init_errorBoundaries();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/routes.js
function groupRoutesByParentId(manifest) {
  let routes3 = {};
  Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    if (!routes3[parentId]) {
      routes3[parentId] = [];
    }
    routes3[parentId].push(route);
  });
  return routes3;
}
function getRouteComponents(route, routeModule, isSpaMode2) {
  let Component2 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode2 || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ React4.createElement(RemixRootDefaultErrorBoundary, {
    error: (0, import_react_router_dom4.useRouteError)()
  }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component2 ? {
        element: /* @__PURE__ */ React4.createElement(routeModule.Layout, null, /* @__PURE__ */ React4.createElement(Component2, null))
      } : {
        Component: Component2
      },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ React4.createElement(routeModule.Layout, null, /* @__PURE__ */ React4.createElement(ErrorBoundary, null))
      } : {
        ErrorBoundary
      },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ React4.createElement(routeModule.Layout, null, /* @__PURE__ */ React4.createElement(HydrateFallback, null))
      } : {
        HydrateFallback
      }
    };
  }
  return {
    Component: Component2,
    ErrorBoundary,
    HydrateFallback
  };
}
function createServerRoutes(manifest, routeModules, future2, isSpaMode2, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({
  Component: () => null
})) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant(routeModule, "No `routeModule` available to create server routes");
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode2),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode2 ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need action/shouldRevalidate on these routes since they're
      // for a static render
    };
    let children = createServerRoutes(manifest, routeModules, future2, isSpaMode2, route.id, routesByParentId, spaModeLazyPromise);
    if (children.length > 0)
      dataRoute.children = children;
    return dataRoute;
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null)
    return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(route, routeModule, isSpaMode2) {
  return isSpaMode2 && route.id !== "root" || routeModule.clientLoader != null && (routeModule.clientLoader.hydrate === true || route.hasLoader !== true);
}
var React4, import_react_router_dom4;
var init_routes = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/routes.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    React4 = __toESM(require_react());
    import_react_router_dom4 = __toESM(require_main2());
    init_errorBoundaries();
    init_fallback();
    init_invariant();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/scroll-restoration.js
function ScrollRestoration({
  getKey,
  ...props
}) {
  let {
    isSpaMode: isSpaMode2
  } = useRemixContext();
  let location = (0, import_react_router_dom5.useLocation)();
  let matches = (0, import_react_router_dom5.useMatches)();
  (0, import_react_router_dom5.UNSAFE_useScrollRestoration)({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React5.useMemo(
    () => {
      if (!getKey)
        return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (isSpaMode2) {
    return null;
  }
  let restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React5.createElement("script", _extends({}, props, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}
var React5, import_react_router_dom5, STORAGE_KEY;
var init_scroll_restoration = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/scroll-restoration.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_rollupPluginBabelHelpers();
    React5 = __toESM(require_react());
    import_react_router_dom5 = __toESM(require_main2());
    init_components();
    STORAGE_KEY = "positions";
  }
});

// ../../../node_modules/.pnpm/react-router-dom@6.22.3_react-dom@18.2.0_react@18.2.0/node_modules/react-router-dom/server.js
var require_server2 = __commonJS({
  "../../../node_modules/.pnpm/react-router-dom@6.22.3_react-dom@18.2.0_react@18.2.0/node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React7 = require_react();
    var router = require_router_cjs();
    var reactRouter = require_main();
    var reactRouterDom = require_main2();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React7);
    function StaticRouter({
      basename: basename2,
      children,
      location: locationProp = "/",
      future: future2
    }) {
      if (typeof locationProp === "string") {
        locationProp = reactRouterDom.parsePath(locationProp);
      }
      let action2 = router.Action.Pop;
      let location = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      };
      let staticNavigator = getStatelessNavigator();
      return /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: basename2,
        children,
        location,
        navigationType: action2,
        navigator: staticNavigator,
        future: future2,
        static: true
      });
    }
    function StaticRouterProvider2({
      context,
      router: router$1,
      hydrate = true,
      nonce
    }) {
      !(router$1 && context) ? false ? router.UNSAFE_invariant(false, "You must provide `router` and `context` to <StaticRouterProvider>") : router.UNSAFE_invariant(false) : void 0;
      let dataRouterContext = {
        router: router$1,
        navigator: getStatelessNavigator(),
        static: true,
        staticContext: context,
        basename: context.basename || "/"
      };
      let fetchersContext = /* @__PURE__ */ new Map();
      let hydrateScript = "";
      if (hydrate !== false) {
        let data = {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors)
        };
        let json2 = htmlEscape(JSON.stringify(JSON.stringify(data)));
        hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json2});`;
      }
      let {
        state
      } = dataRouterContext.router;
      return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterContext.Provider, {
        value: dataRouterContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterStateContext.Provider, {
        value: state
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_FetchersContext.Provider, {
        value: fetchersContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_ViewTransitionContext.Provider, {
        value: {
          isTransitioning: false
        }
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: dataRouterContext.basename,
        location: state.location,
        navigationType: state.historyAction,
        navigator: dataRouterContext.navigator,
        static: dataRouterContext.static,
        future: {
          v7_relativeSplatPath: router$1.future.v7_relativeSplatPath
        }
      }, /* @__PURE__ */ React__namespace.createElement(DataRoutes, {
        routes: router$1.routes,
        future: router$1.future,
        state
      })))))), hydrateScript ? /* @__PURE__ */ React__namespace.createElement("script", {
        suppressHydrationWarning: true,
        nonce,
        dangerouslySetInnerHTML: {
          __html: hydrateScript
        }
      }) : null);
    }
    function DataRoutes({
      routes: routes3,
      future: future2,
      state
    }) {
      return reactRouter.UNSAFE_useRoutesImpl(routes3, void 0, state, future2);
    }
    function serializeErrors(errors) {
      if (!errors)
        return null;
      let entries = Object.entries(errors);
      let serialized = {};
      for (let [key, val] of entries) {
        if (router.isRouteErrorResponse(val)) {
          serialized[key] = {
            ...val,
            __type: "RouteErrorResponse"
          };
        } else if (val instanceof Error) {
          serialized[key] = {
            message: val.message,
            __type: "Error",
            // If this is a subclass (i.e., ReferenceError), send up the type so we
            // can re-create the same type during hydration.
            ...val.name !== "Error" ? {
              __subType: val.name
            } : {}
          };
        } else {
          serialized[key] = val;
        }
      }
      return serialized;
    }
    function getStatelessNavigator() {
      return {
        createHref,
        encodeLocation,
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
        },
        forward() {
          throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
        }
      };
    }
    function createStaticHandler(routes3, opts) {
      return router.createStaticHandler(routes3, {
        ...opts,
        mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
      });
    }
    function createStaticRouter2(routes3, context, opts = {}) {
      let manifest = {};
      let dataRoutes = router.UNSAFE_convertRoutesToDataRoutes(routes3, reactRouter.UNSAFE_mapRouteProperties, void 0, manifest);
      let matches = context.matches.map((match3) => {
        let route = manifest[match3.route.id] || match3.route;
        return {
          ...match3,
          route
        };
      });
      let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
      return {
        get basename() {
          return context.basename;
        },
        get future() {
          return {
            v7_fetcherPersist: false,
            v7_normalizeFormMethod: false,
            v7_partialHydration: opts.future?.v7_partialHydration === true,
            v7_prependBasename: false,
            v7_relativeSplatPath: opts.future?.v7_relativeSplatPath === true
          };
        },
        get state() {
          return {
            historyAction: router.Action.Pop,
            location: context.location,
            matches,
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: context.errors,
            initialized: true,
            navigation: router.IDLE_NAVIGATION,
            restoreScrollPosition: null,
            preventScrollReset: false,
            revalidation: "idle",
            fetchers: /* @__PURE__ */ new Map(),
            blockers: /* @__PURE__ */ new Map()
          };
        },
        get routes() {
          return dataRoutes;
        },
        get window() {
          return void 0;
        },
        initialize() {
          throw msg("initialize");
        },
        subscribe() {
          throw msg("subscribe");
        },
        enableScrollRestoration() {
          throw msg("enableScrollRestoration");
        },
        navigate() {
          throw msg("navigate");
        },
        fetch() {
          throw msg("fetch");
        },
        revalidate() {
          throw msg("revalidate");
        },
        createHref,
        encodeLocation,
        getFetcher() {
          return router.IDLE_FETCHER;
        },
        deleteFetcher() {
          throw msg("deleteFetcher");
        },
        dispose() {
          throw msg("dispose");
        },
        getBlocker() {
          return router.IDLE_BLOCKER;
        },
        deleteBlocker() {
          throw msg("deleteBlocker");
        },
        _internalFetchControllers: /* @__PURE__ */ new Map(),
        _internalActiveDeferreds: /* @__PURE__ */ new Map(),
        _internalSetRoutes() {
          throw msg("_internalSetRoutes");
        }
      };
    }
    function createHref(to) {
      return typeof to === "string" ? to : reactRouterDom.createPath(to);
    }
    function encodeLocation(to) {
      let href = typeof to === "string" ? to : reactRouterDom.createPath(to);
      href = href.replace(/ $/, "%20");
      let encoded = ABSOLUTE_URL_REGEX2.test(href) ? new URL(href) : new URL(href, "http://localhost");
      return {
        pathname: encoded.pathname,
        search: encoded.search,
        hash: encoded.hash
      };
    }
    var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    var ESCAPE_LOOKUP2 = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    var ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
    function htmlEscape(str) {
      return str.replace(ESCAPE_REGEX2, (match3) => ESCAPE_LOOKUP2[match3]);
    }
    exports.StaticRouter = StaticRouter;
    exports.StaticRouterProvider = StaticRouterProvider2;
    exports.createStaticHandler = createStaticHandler;
    exports.createStaticRouter = createStaticRouter2;
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/server.js
function RemixServer({
  context,
  url,
  abortDelay
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let {
    manifest,
    routeModules,
    criticalCss,
    serverHandoffString
  } = context;
  let routes3 = createServerRoutes(manifest.routes, routeModules, context.future, context.isSpaMode);
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match3 of context.staticHandlerContext.matches) {
    let routeId = match3.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && shouldHydrateRouteLoader(manifestRoute, route, context.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      context.staticHandlerContext.loaderData[routeId] = void 0;
    }
  }
  let router = (0, import_server.createStaticRouter)(routes3, context.staticHandlerContext, {
    future: {
      v7_partialHydration: true,
      v7_relativeSplatPath: context.future.v3_relativeSplatPath
    }
  });
  return /* @__PURE__ */ React6.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      criticalCss,
      serverHandoffString,
      future: context.future,
      isSpaMode: context.isSpaMode,
      serializeError: context.serializeError,
      abortDelay
    }
  }, /* @__PURE__ */ React6.createElement(RemixErrorBoundary, {
    location: router.state.location
  }, /* @__PURE__ */ React6.createElement(import_server.StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: false
  })));
}
var React6, import_server;
var init_server2 = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/server.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    React6 = __toESM(require_react());
    import_server = __toESM(require_server2());
    init_components();
    init_errorBoundaries();
    init_routes();
  }
});

// ../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/index.js
var import_react_router_dom6;
var init_esm2 = __esm({
  "../../../node_modules/.pnpm/@remix-run+react@2.8.1_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist/esm/index.js"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    import_react_router_dom6 = __toESM(require_main2());
    init_components();
    init_scroll_restoration();
    init_server2();
  }
});

// ../../../node_modules/.pnpm/isbot@4.4.0/node_modules/isbot/index.mjs
function isbot(userAgent) {
  if (typeof usedPattern === "undefined") {
    try {
      usedPattern = new RegExp(fullPattern, "i");
    } catch (error) {
      usedPattern = naivePattern;
    }
  }
  return Boolean(userAgent) && usedPattern.test(userAgent);
}
var fullPattern, naivePattern, usedPattern;
var init_isbot = __esm({
  "../../../node_modules/.pnpm/isbot@4.4.0/node_modules/isbot/index.mjs"() {
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    fullPattern = " daum[ /]| deusu/| yadirectfetcher|(?:^| )site|(?:^|[^g])news|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bot(?:[^\\w]|_|$)|(?<! ya(?:yandex)?)search|(?<!(?:lib))http|(?<![hg]m)score|@[a-z]|\\(at\\)[a-z]|\\[at\\][a-z]|^12345|^<|^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(\\.\\d+)?(?:\\.\\d{1,10})?)?(?:,|$)|^[^ ]{50,}$|^active|^ad muncher|^amaya|^anglesharp/|^avsdevicesdk/|^bidtellect/|^biglotron|^bot|^btwebclient/|^clamav[ /]|^client/|^cobweb/|^coccoc|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^facebook|^fdm[ /]\\d|^getright/|^gozilla/|^hatena|^hobbit|^hotzonu|^hwcdn/|^jeode/|^jetty/|^jigsaw|^linkdex|^metauri|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d \\(compatible;?\\)$|^mozilla/\\d\\.\\d \\w*$|^navermailapp|^netsurf|^nuclei|^offline explorer|^php|^postman|^postrank|^python|^rank|^read|^reed|^rest|^serf|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^tumblr/|^user-agent:|^valid|^venus/fedoraplanet|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|adbeat\\.com|appinsights|archive|ask jeeves/teoma|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check|chrome-lighthouse|chromeframe|classifier|cloud|crawl|cryptoapi|dareboost|datanyze|dataprovider|dejaclick|dmbrowser|download|evc-batch/|feed|firephp|freesafeip|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|inspect|iplabel|ips-agent|java(?!;)|library|mail\\.ru/|manager|monitor|neustar wpm|nutch|offbyone|optimize|pageburst|parser|perl|phantom|pingdom|powermarks|preview|proxy|ptst[ /]\\d|reader|reputation|resolver|retriever|rexx;|rigor|robot|rss|scan|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|stumbleupon\\.com|supercleaner|synapse|synthetic|torrent|trace|transcoder|twingly recon|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|wordpress|zgrab";
    naivePattern = /bot|spider|crawl|http|lighthouse/i;
  }
});

// ../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/cjs/react-dom-server-legacy.browser.production.min.js
var require_react_dom_server_legacy_browser_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/cjs/react-dom-server-legacy.browser.production.min.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var aa = require_react();
    function l(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var p = Object.prototype.hasOwnProperty;
    var fa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var ha = {};
    var ia = {};
    function ja(a) {
      if (p.call(ia, a))
        return true;
      if (p.call(ha, a))
        return false;
      if (fa.test(a))
        return ia[a] = true;
      ha[a] = true;
      return false;
    }
    function r(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = f;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = e;
      this.removeEmptyString = g;
    }
    var t = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      t[a] = new r(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      t[b] = new r(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      t[a] = new r(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      t[a] = new r(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      t[a] = new r(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      t[a] = new r(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      t[a] = new r(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      t[a] = new r(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      t[a] = new r(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ka = /[\-:]([a-z])/g;
    function la(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ka,
        la
      );
      t[b] = new r(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ka, la);
      t[b] = new r(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ka, la);
      t[b] = new r(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      t[a] = new r(a, 1, false, a.toLowerCase(), null, false, false);
    });
    t.xlinkHref = new r("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      t[a] = new r(a, 1, false, a.toLowerCase(), null, true, true);
    });
    var u = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var ma = ["Webkit", "ms", "Moz", "O"];
    Object.keys(u).forEach(function(a) {
      ma.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        u[b] = u[a];
      });
    });
    var na = /["'&<>]/;
    function v(a) {
      if ("boolean" === typeof a || "number" === typeof a)
        return "" + a;
      a = "" + a;
      var b = na.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d));
          f = d + 1;
          c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var oa = /([A-Z])/g;
    var pa = /^ms-/;
    var qa = Array.isArray;
    function w(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function ra(a, b, c) {
      switch (b) {
        case "select":
          return w(1, null != c.value ? c.value : c.defaultValue);
        case "svg":
          return w(2, null);
        case "math":
          return w(3, null);
        case "foreignObject":
          return w(1, null);
        case "table":
          return w(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return w(5, null);
        case "colgroup":
          return w(7, null);
        case "tr":
          return w(6, null);
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode ? w(1, null) : a;
    }
    var sa = /* @__PURE__ */ new Map();
    function ta(a, b, c) {
      if ("object" !== typeof c)
        throw Error(l(62));
      b = true;
      for (var d in c)
        if (p.call(c, d)) {
          var f = c[d];
          if (null != f && "boolean" !== typeof f && "" !== f) {
            if (0 === d.indexOf("--")) {
              var e = v(d);
              f = v(("" + f).trim());
            } else {
              e = d;
              var g = sa.get(e);
              void 0 !== g ? e = g : (g = v(e.replace(oa, "-$1").toLowerCase().replace(pa, "-ms-")), sa.set(e, g), e = g);
              f = "number" === typeof f ? 0 === f || p.call(u, d) ? "" + f : f + "px" : v(("" + f).trim());
            }
            b ? (b = false, a.push(' style="', e, ":", f)) : a.push(";", e, ":", f);
          }
        }
      b || a.push('"');
    }
    function x(a, b, c, d) {
      switch (c) {
        case "style":
          ta(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || "o" !== c[0] && "O" !== c[0] || "n" !== c[1] && "N" !== c[1]) {
        if (b = t.hasOwnProperty(c) ? t[c] : null, null !== b) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans)
                return;
          }
          c = b.attributeName;
          switch (b.type) {
            case 3:
              d && a.push(" ", c, '=""');
              break;
            case 4:
              true === d ? a.push(" ", c, '=""') : false !== d && a.push(" ", c, '="', v(d), '"');
              break;
            case 5:
              isNaN(d) || a.push(" ", c, '="', v(d), '"');
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(" ", c, '="', v(d), '"');
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(" ", c, '="', v(d), '"');
          }
        } else if (ja(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b)
                return;
          }
          a.push(" ", c, '="', v(d), '"');
        }
      }
    }
    function y(a, b, c) {
      if (null != b) {
        if (null != c)
          throw Error(l(60));
        if ("object" !== typeof b || !("__html" in b))
          throw Error(l(61));
        b = b.__html;
        null !== b && void 0 !== b && a.push("" + b);
      }
    }
    function ua(a) {
      var b = "";
      aa.Children.forEach(a, function(a2) {
        null != a2 && (b += a2);
      });
      return b;
    }
    function va(a, b, c, d) {
      a.push(A(c));
      var f = c = null, e;
      for (e in b)
        if (p.call(b, e)) {
          var g = b[e];
          if (null != g)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                x(a, d, e, g);
            }
        }
      a.push(">");
      y(a, f, c);
      return "string" === typeof c ? (a.push(v(c)), null) : c;
    }
    var wa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var xa = /* @__PURE__ */ new Map();
    function A(a) {
      var b = xa.get(a);
      if (void 0 === b) {
        if (!wa.test(a))
          throw Error(l(65, a));
        b = "<" + a;
        xa.set(a, b);
      }
      return b;
    }
    function ya(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(A("select"));
          var e = null, g = null;
          for (n in c)
            if (p.call(c, n)) {
              var h = c[n];
              if (null != h)
                switch (n) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    x(a, d, n, h);
                }
            }
          a.push(">");
          y(a, g, e);
          return e;
        case "option":
          g = f.selectedValue;
          a.push(A("option"));
          var k = h = null, m = null;
          var n = null;
          for (e in c)
            if (p.call(c, e)) {
              var q = c[e];
              if (null != q)
                switch (e) {
                  case "children":
                    h = q;
                    break;
                  case "selected":
                    m = q;
                    break;
                  case "dangerouslySetInnerHTML":
                    n = q;
                    break;
                  case "value":
                    k = q;
                  default:
                    x(a, d, e, q);
                }
            }
          if (null != g)
            if (c = null !== k ? "" + k : ua(h), qa(g))
              for (d = 0; d < g.length; d++) {
                if ("" + g[d] === c) {
                  a.push(' selected=""');
                  break;
                }
              }
            else
              "" + g === c && a.push(' selected=""');
          else
            m && a.push(' selected=""');
          a.push(">");
          y(a, n, h);
          return h;
        case "textarea":
          a.push(A("textarea"));
          n = g = e = null;
          for (h in c)
            if (p.call(c, h) && (k = c[h], null != k))
              switch (h) {
                case "children":
                  n = k;
                  break;
                case "value":
                  e = k;
                  break;
                case "defaultValue":
                  g = k;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(l(91));
                default:
                  x(
                    a,
                    d,
                    h,
                    k
                  );
              }
          null === e && null !== g && (e = g);
          a.push(">");
          if (null != n) {
            if (null != e)
              throw Error(l(92));
            if (qa(n) && 1 < n.length)
              throw Error(l(93));
            e = "" + n;
          }
          "string" === typeof e && "\n" === e[0] && a.push("\n");
          null !== e && a.push(v("" + e));
          return null;
        case "input":
          a.push(A("input"));
          k = n = h = e = null;
          for (g in c)
            if (p.call(c, g) && (m = c[g], null != m))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(399, "input"));
                case "defaultChecked":
                  k = m;
                  break;
                case "defaultValue":
                  h = m;
                  break;
                case "checked":
                  n = m;
                  break;
                case "value":
                  e = m;
                  break;
                default:
                  x(a, d, g, m);
              }
          null !== n ? x(a, d, "checked", n) : null !== k && x(a, d, "checked", k);
          null !== e ? x(a, d, "value", e) : null !== h && x(a, d, "value", h);
          a.push("/>");
          return null;
        case "menuitem":
          a.push(A("menuitem"));
          for (var C in c)
            if (p.call(c, C) && (e = c[C], null != e))
              switch (C) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(400));
                default:
                  x(a, d, C, e);
              }
          a.push(">");
          return null;
        case "title":
          a.push(A("title"));
          e = null;
          for (q in c)
            if (p.call(c, q) && (g = c[q], null != g))
              switch (q) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(l(434));
                default:
                  x(a, d, q, g);
              }
          a.push(">");
          return e;
        case "listing":
        case "pre":
          a.push(A(b));
          g = e = null;
          for (k in c)
            if (p.call(c, k) && (h = c[k], null != h))
              switch (k) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  x(a, d, k, h);
              }
          a.push(">");
          if (null != g) {
            if (null != e)
              throw Error(l(60));
            if ("object" !== typeof g || !("__html" in g))
              throw Error(l(61));
            c = g.__html;
            null !== c && void 0 !== c && ("string" === typeof c && 0 < c.length && "\n" === c[0] ? a.push("\n", c) : a.push("" + c));
          }
          "string" === typeof e && "\n" === e[0] && a.push("\n");
          return e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(A(b));
          for (var D in c)
            if (p.call(c, D) && (e = c[D], null != e))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(399, b));
                default:
                  x(a, d, D, e);
              }
          a.push("/>");
          return null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return va(
            a,
            c,
            b,
            d
          );
        case "html":
          return 0 === f.insertionMode && a.push("<!DOCTYPE html>"), va(a, c, b, d);
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is)
            return va(a, c, b, d);
          a.push(A(b));
          g = e = null;
          for (m in c)
            if (p.call(c, m) && (h = c[m], null != h))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  ta(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  ja(m) && "function" !== typeof h && "symbol" !== typeof h && a.push(" ", m, '="', v(h), '"');
              }
          a.push(">");
          y(a, g, e);
          return e;
      }
    }
    function za(a, b, c) {
      a.push('<!--$?--><template id="');
      if (null === c)
        throw Error(l(395));
      a.push(c);
      return a.push('"></template>');
    }
    function Aa(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return a.push('<div hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 2:
          return a.push('<svg aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 3:
          return a.push('<math aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 4:
          return a.push('<table hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 5:
          return a.push('<table hidden><tbody id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 6:
          return a.push('<table hidden><tr id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 7:
          return a.push('<table hidden><colgroup id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        default:
          throw Error(l(397));
      }
    }
    function Ba(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return a.push("</div>");
        case 2:
          return a.push("</svg>");
        case 3:
          return a.push("</math>");
        case 4:
          return a.push("</table>");
        case 5:
          return a.push("</tbody></table>");
        case 6:
          return a.push("</tr></table>");
        case 7:
          return a.push("</colgroup></table>");
        default:
          throw Error(l(397));
      }
    }
    var Ca = /[<\u2028\u2029]/g;
    function Da(a) {
      return JSON.stringify(a).replace(Ca, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    function Ea(a, b) {
      b = void 0 === b ? "" : b;
      return { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b + "P:", segmentPrefix: b + "S:", boundaryPrefix: b + "B:", idPrefix: b, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: a };
    }
    function Fa(a, b, c, d) {
      if (c.generateStaticMarkup)
        return a.push(v(b)), false;
      "" === b ? a = d : (d && a.push("<!-- -->"), a.push(v(b)), a = true);
      return a;
    }
    var B = Object.assign;
    var Ga = Symbol.for("react.element");
    var Ha = Symbol.for("react.portal");
    var Ia = Symbol.for("react.fragment");
    var Ja = Symbol.for("react.strict_mode");
    var Ka = Symbol.for("react.profiler");
    var La = Symbol.for("react.provider");
    var Ma = Symbol.for("react.context");
    var Na = Symbol.for("react.forward_ref");
    var Oa = Symbol.for("react.suspense");
    var Pa = Symbol.for("react.suspense_list");
    var Qa = Symbol.for("react.memo");
    var Ra = Symbol.for("react.lazy");
    var Sa = Symbol.for("react.scope");
    var Ta = Symbol.for("react.debug_trace_mode");
    var Ua = Symbol.for("react.legacy_hidden");
    var Va = Symbol.for("react.default_value");
    var Wa = Symbol.iterator;
    function Xa(a) {
      if (null == a)
        return null;
      if ("function" === typeof a)
        return a.displayName || a.name || null;
      if ("string" === typeof a)
        return a;
      switch (a) {
        case Ia:
          return "Fragment";
        case Ha:
          return "Portal";
        case Ka:
          return "Profiler";
        case Ja:
          return "StrictMode";
        case Oa:
          return "Suspense";
        case Pa:
          return "SuspenseList";
      }
      if ("object" === typeof a)
        switch (a.$$typeof) {
          case Ma:
            return (a.displayName || "Context") + ".Consumer";
          case La:
            return (a._context.displayName || "Context") + ".Provider";
          case Na:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Qa:
            return b = a.displayName || null, null !== b ? b : Xa(a.type) || "Memo";
          case Ra:
            b = a._payload;
            a = a._init;
            try {
              return Xa(a(b));
            } catch (c) {
            }
        }
      return null;
    }
    var Ya = {};
    function Za(a, b) {
      a = a.contextTypes;
      if (!a)
        return Ya;
      var c = {}, d;
      for (d in a)
        c[d] = b[d];
      return c;
    }
    var E = null;
    function F(a, b) {
      if (a !== b) {
        a.context._currentValue2 = a.parentValue;
        a = a.parent;
        var c = b.parent;
        if (null === a) {
          if (null !== c)
            throw Error(l(401));
        } else {
          if (null === c)
            throw Error(l(401));
          F(a, c);
        }
        b.context._currentValue2 = b.value;
      }
    }
    function $a(a) {
      a.context._currentValue2 = a.parentValue;
      a = a.parent;
      null !== a && $a(a);
    }
    function ab(a) {
      var b = a.parent;
      null !== b && ab(b);
      a.context._currentValue2 = a.value;
    }
    function bb(a, b) {
      a.context._currentValue2 = a.parentValue;
      a = a.parent;
      if (null === a)
        throw Error(l(402));
      a.depth === b.depth ? F(a, b) : bb(a, b);
    }
    function cb(a, b) {
      var c = b.parent;
      if (null === c)
        throw Error(l(402));
      a.depth === c.depth ? F(a, c) : cb(a, c);
      b.context._currentValue2 = b.value;
    }
    function G(a) {
      var b = E;
      b !== a && (null === b ? ab(a) : null === a ? $a(b) : b.depth === a.depth ? F(b, a) : b.depth > a.depth ? bb(b, a) : cb(b, a), E = a);
    }
    var db = { isMounted: function() {
      return false;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals;
      null !== a.queue && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals;
      a.replace = true;
      a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function eb(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null;
      a.updater = db;
      a.props = c;
      a.state = f;
      var e = { queue: [], replace: false };
      a._reactInternals = e;
      var g = b.contextType;
      a.context = "object" === typeof g && null !== g ? g._currentValue2 : d;
      g = b.getDerivedStateFromProps;
      "function" === typeof g && (g = g(c, f), f = null === g || void 0 === g ? f : B({}, f, g), a.state = f);
      if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a.getSnapshotBeforeUpdate && ("function" === typeof a.UNSAFE_componentWillMount || "function" === typeof a.componentWillMount))
        if (b = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), b !== a.state && db.enqueueReplaceState(a, a.state, null), null !== e.queue && 0 < e.queue.length)
          if (b = e.queue, g = e.replace, e.queue = null, e.replace = false, g && 1 === b.length)
            a.state = b[0];
          else {
            e = g ? b[0] : a.state;
            f = true;
            for (g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = "function" === typeof h ? h.call(a, e, c, d) : h;
              null != h && (f ? (f = false, e = B({}, e, h)) : B(e, h));
            }
            a.state = e;
          }
        else
          e.queue = null;
    }
    var fb = { id: 1, overflow: "" };
    function gb(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - H(d) - 1;
      d &= ~(1 << f);
      c += 1;
      var e = 32 - H(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        e = (d & (1 << g) - 1).toString(32);
        d >>= g;
        f -= g;
        return { id: 1 << 32 - H(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var H = Math.clz32 ? Math.clz32 : hb;
    var ib = Math.log;
    var jb = Math.LN2;
    function hb(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (ib(a) / jb | 0) | 0;
    }
    function kb(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var lb = "function" === typeof Object.is ? Object.is : kb;
    var I = null;
    var ob = null;
    var J = null;
    var K = null;
    var L = false;
    var M = false;
    var N = 0;
    var O = null;
    var P = 0;
    function Q() {
      if (null === I)
        throw Error(l(321));
      return I;
    }
    function pb() {
      if (0 < P)
        throw Error(l(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function qb() {
      null === K ? null === J ? (L = false, J = K = pb()) : (L = true, K = J) : null === K.next ? (L = false, K = K.next = pb()) : (L = true, K = K.next);
      return K;
    }
    function rb() {
      ob = I = null;
      M = false;
      J = null;
      P = 0;
      K = O = null;
    }
    function sb(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function tb(a, b, c) {
      I = Q();
      K = qb();
      if (L) {
        var d = K.queue;
        b = d.dispatch;
        if (null !== O && (c = O.get(d), void 0 !== c)) {
          O.delete(d);
          d = K.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (null !== c);
          K.memoizedState = d;
          return [d, b];
        }
        return [K.memoizedState, b];
      }
      a = a === sb ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
      K.memoizedState = a;
      a = K.queue = { last: null, dispatch: null };
      a = a.dispatch = ub.bind(null, I, a);
      return [K.memoizedState, a];
    }
    function vb(a, b) {
      I = Q();
      K = qb();
      b = void 0 === b ? null : b;
      if (null !== K) {
        var c = K.memoizedState;
        if (null !== c && null !== b) {
          var d = c[1];
          a:
            if (null === d)
              d = false;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!lb(b[f], d[f])) {
                  d = false;
                  break a;
                }
              d = true;
            }
          if (d)
            return c[0];
        }
      }
      a = a();
      K.memoizedState = [a, b];
      return a;
    }
    function ub(a, b, c) {
      if (25 <= P)
        throw Error(l(301));
      if (a === I)
        if (M = true, a = { action: c, next: null }, null === O && (O = /* @__PURE__ */ new Map()), c = O.get(b), void 0 === c)
          O.set(b, a);
        else {
          for (b = c; null !== b.next; )
            b = b.next;
          b.next = a;
        }
    }
    function wb() {
      throw Error(l(394));
    }
    function R() {
    }
    var xb = { readContext: function(a) {
      return a._currentValue2;
    }, useContext: function(a) {
      Q();
      return a._currentValue2;
    }, useMemo: vb, useReducer: tb, useRef: function(a) {
      I = Q();
      K = qb();
      var b = K.memoizedState;
      return null === b ? (a = { current: a }, K.memoizedState = a) : b;
    }, useState: function(a) {
      return tb(sb, a);
    }, useInsertionEffect: R, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return vb(function() {
        return a;
      }, b);
    }, useImperativeHandle: R, useEffect: R, useDebugValue: R, useDeferredValue: function(a) {
      Q();
      return a;
    }, useTransition: function() {
      Q();
      return [
        false,
        wb
      ];
    }, useId: function() {
      var a = ob.treeContext;
      var b = a.overflow;
      a = a.id;
      a = (a & ~(1 << 32 - H(a) - 1)).toString(32) + b;
      var c = S;
      if (null === c)
        throw Error(l(404));
      b = N++;
      a = ":" + c.idPrefix + "R" + a;
      0 < b && (a += "H" + b.toString(32));
      return a + ":";
    }, useMutableSource: function(a, b) {
      Q();
      return b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (void 0 === c)
        throw Error(l(407));
      return c();
    } };
    var S = null;
    var yb = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function zb(a) {
      console.error(a);
      return null;
    }
    function T() {
    }
    function Ab(a, b, c, d, f, e, g, h, k) {
      var m = [], n = /* @__PURE__ */ new Set();
      b = { destination: null, responseState: b, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: n, pingedTasks: m, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f ? zb : f, onAllReady: void 0 === e ? T : e, onShellReady: void 0 === g ? T : g, onShellError: void 0 === h ? T : h, onFatalError: void 0 === k ? T : k };
      c = U(b, 0, null, c, false, false);
      c.parentFlushed = true;
      a = Bb(b, a, null, c, n, Ya, null, fb);
      m.push(a);
      return b;
    }
    function Bb(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++;
      null === c ? a.pendingRootTasks++ : c.pendingTasks++;
      var k = { node: b, ping: function() {
        var b2 = a.pingedTasks;
        b2.push(k);
        1 === b2.length && Cb(a);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      f.add(k);
      return k;
    }
    function U(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function V(a, b) {
      a = a.onError(b);
      if (null != a && "string" !== typeof a)
        throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function W(a, b) {
      var c = a.onShellError;
      c(b);
      c = a.onFatalError;
      c(b);
      null !== a.destination ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
    }
    function Db(a, b, c, d, f) {
      I = {};
      ob = b;
      N = 0;
      for (a = c(d, f); M; )
        M = false, N = 0, P += 1, K = null, a = c(d, f);
      rb();
      return a;
    }
    function Eb(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (null !== e && void 0 !== e) {
        var g = b.legacyContext;
        if ("function" !== typeof c.getChildContext)
          d = g;
        else {
          c = c.getChildContext();
          for (var h in c)
            if (!(h in e))
              throw Error(l(108, Xa(d) || "Unknown", h));
          d = B({}, g, c);
        }
        b.legacyContext = d;
        X(a, b, f);
        b.legacyContext = g;
      } else
        X(a, b, f);
    }
    function Fb(a, b) {
      if (a && a.defaultProps) {
        b = B({}, b);
        a = a.defaultProps;
        for (var c in a)
          void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Gb(a, b, c, d, f) {
      if ("function" === typeof c)
        if (c.prototype && c.prototype.isReactComponent) {
          f = Za(c, b.legacyContext);
          var e = c.contextType;
          e = new c(d, "object" === typeof e && null !== e ? e._currentValue2 : f);
          eb(e, c, d, f);
          Eb(a, b, e, c);
        } else {
          e = Za(c, b.legacyContext);
          f = Db(a, b, c, d, e);
          var g = 0 !== N;
          if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof)
            eb(f, c, d, e), Eb(a, b, f, c);
          else if (g) {
            d = b.treeContext;
            b.treeContext = gb(d, 1, 0);
            try {
              X(a, b, f);
            } finally {
              b.treeContext = d;
            }
          } else
            X(a, b, f);
        }
      else if ("string" === typeof c) {
        f = b.blockedSegment;
        e = ya(f.chunks, c, d, a.responseState, f.formatContext);
        f.lastPushedText = false;
        g = f.formatContext;
        f.formatContext = ra(g, c, d);
        Hb(a, b, e);
        f.formatContext = g;
        switch (c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push("</", c, ">");
        }
        f.lastPushedText = false;
      } else {
        switch (c) {
          case Ua:
          case Ta:
          case Ja:
          case Ka:
          case Ia:
            X(a, b, d.children);
            return;
          case Pa:
            X(a, b, d.children);
            return;
          case Sa:
            throw Error(l(343));
          case Oa:
            a: {
              c = b.blockedBoundary;
              f = b.blockedSegment;
              e = d.fallback;
              d = d.children;
              g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, k = U(a, f.chunks.length, h, f.formatContext, false, false);
              f.children.push(k);
              f.lastPushedText = false;
              var m = U(a, 0, null, f.formatContext, false, false);
              m.parentFlushed = true;
              b.blockedBoundary = h;
              b.blockedSegment = m;
              try {
                if (Hb(
                  a,
                  b,
                  d
                ), a.responseState.generateStaticMarkup || m.lastPushedText && m.textEmbedded && m.chunks.push("<!-- -->"), m.status = 1, Y(h, m), 0 === h.pendingTasks)
                  break a;
              } catch (n) {
                m.status = 4, h.forceClientRender = true, h.errorDigest = V(a, n);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Bb(a, e, c, k, g, b.legacyContext, b.context, b.treeContext);
              a.pingedTasks.push(b);
            }
            return;
        }
        if ("object" === typeof c && null !== c)
          switch (c.$$typeof) {
            case Na:
              d = Db(a, b, c.render, d, f);
              if (0 !== N) {
                c = b.treeContext;
                b.treeContext = gb(c, 1, 0);
                try {
                  X(a, b, d);
                } finally {
                  b.treeContext = c;
                }
              } else
                X(a, b, d);
              return;
            case Qa:
              c = c.type;
              d = Fb(c, d);
              Gb(a, b, c, d, f);
              return;
            case La:
              f = d.children;
              c = c._context;
              d = d.value;
              e = c._currentValue2;
              c._currentValue2 = d;
              g = E;
              E = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c, parentValue: e, value: d };
              b.context = d;
              X(a, b, f);
              a = E;
              if (null === a)
                throw Error(l(403));
              d = a.parentValue;
              a.context._currentValue2 = d === Va ? a.context._defaultValue : d;
              a = E = a.parent;
              b.context = a;
              return;
            case Ma:
              d = d.children;
              d = d(c._currentValue2);
              X(a, b, d);
              return;
            case Ra:
              f = c._init;
              c = f(c._payload);
              d = Fb(c, d);
              Gb(
                a,
                b,
                c,
                d,
                void 0
              );
              return;
          }
        throw Error(l(130, null == c ? c : typeof c, ""));
      }
    }
    function X(a, b, c) {
      b.node = c;
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case Ga:
            Gb(a, b, c.type, c.props, c.ref);
            return;
          case Ha:
            throw Error(l(257));
          case Ra:
            var d = c._init;
            c = d(c._payload);
            X(a, b, c);
            return;
        }
        if (qa(c)) {
          Ib(a, b, c);
          return;
        }
        null === c || "object" !== typeof c ? d = null : (d = Wa && c[Wa] || c["@@iterator"], d = "function" === typeof d ? d : null);
        if (d && (d = d.call(c))) {
          c = d.next();
          if (!c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            Ib(a, b, f);
          }
          return;
        }
        a = Object.prototype.toString.call(c);
        throw Error(l(31, "[object Object]" === a ? "object with keys {" + Object.keys(c).join(", ") + "}" : a));
      }
      "string" === typeof c ? (d = b.blockedSegment, d.lastPushedText = Fa(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : "number" === typeof c && (d = b.blockedSegment, d.lastPushedText = Fa(b.blockedSegment.chunks, "" + c, a.responseState, d.lastPushedText));
    }
    function Ib(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = gb(e, d, f);
        try {
          Hb(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function Hb(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return X(a, b, c);
      } catch (k) {
        if (rb(), "object" === typeof k && null !== k && "function" === typeof k.then) {
          c = k;
          var g = b.blockedSegment, h = U(a, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
          g.children.push(h);
          g.lastPushedText = false;
          a = Bb(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
          c.then(a, a);
          b.blockedSegment.formatContext = d;
          b.legacyContext = f;
          b.context = e;
          G(e);
        } else
          throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, G(e), k;
      }
    }
    function Jb(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment;
      a.status = 3;
      Kb(this, b, a);
    }
    function Lb(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3;
      null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a = void 0 === c ? Error(l(432)) : c, d.errorDigest = b.onError(a), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return Lb(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (d = b.onAllReady, d()));
    }
    function Y(a, b) {
      if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
        var c = b.children[0];
        c.id = b.id;
        c.parentFlushed = true;
        1 === c.status && Y(a, c);
      } else
        a.completedSegments.push(b);
    }
    function Kb(a, b, c) {
      if (null === b) {
        if (c.parentFlushed) {
          if (null !== a.completedRootSegment)
            throw Error(l(389));
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--;
        0 === a.pendingRootTasks && (a.onShellError = T, b = a.onShellReady, b());
      } else
        b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c.parentFlushed && 1 === c.status && Y(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(Jb, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && 1 === c.status && (Y(b, c), 1 === b.completedSegments.length && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--;
      0 === a.allPendingTasks && (a = a.onAllReady, a());
    }
    function Cb(a) {
      if (2 !== a.status) {
        var b = E, c = yb.current;
        yb.current = xb;
        var d = S;
        S = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e];
            var h = a, k = g.blockedSegment;
            if (0 === k.status) {
              G(g.context);
              try {
                X(h, g, g.node), h.responseState.generateStaticMarkup || k.lastPushedText && k.textEmbedded && k.chunks.push("<!-- -->"), g.abortSet.delete(g), k.status = 1, Kb(h, g.blockedBoundary, k);
              } catch (z2) {
                if (rb(), "object" === typeof z2 && null !== z2 && "function" === typeof z2.then) {
                  var m = g.ping;
                  z2.then(m, m);
                } else {
                  g.abortSet.delete(g);
                  k.status = 4;
                  var n = g.blockedBoundary, q = z2, C = V(h, q);
                  null === n ? W(h, q) : (n.pendingTasks--, n.forceClientRender || (n.forceClientRender = true, n.errorDigest = C, n.parentFlushed && h.clientRenderedBoundaries.push(n)));
                  h.allPendingTasks--;
                  if (0 === h.allPendingTasks) {
                    var D = h.onAllReady;
                    D();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e);
          null !== a.destination && Mb(a, a.destination);
        } catch (z2) {
          V(a, z2), W(a, z2);
        } finally {
          S = d, yb.current = c, c === xb && G(b);
        }
      }
    }
    function Z(a, b, c) {
      c.parentFlushed = true;
      switch (c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          c.lastPushedText = false;
          c.textEmbedded = false;
          a = a.responseState;
          b.push('<template id="');
          b.push(a.placeholderPrefix);
          a = d.toString(16);
          b.push(a);
          return b.push('"></template>');
        case 1:
          c.status = 2;
          var f = true;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++)
              b.push(d[e]);
            f = Nb(a, b, f);
          }
          for (; e < d.length - 1; e++)
            b.push(d[e]);
          e < d.length && (f = b.push(d[e]));
          return f;
        default:
          throw Error(l(390));
      }
    }
    function Nb(a, b, c) {
      var d = c.boundary;
      if (null === d)
        return Z(a, b, c);
      d.parentFlushed = true;
      if (d.forceClientRender)
        return a.responseState.generateStaticMarkup || (d = d.errorDigest, b.push("<!--$!-->"), b.push("<template"), d && (b.push(' data-dgst="'), d = v(d), b.push(d), b.push('"')), b.push("></template>")), Z(a, b, c), a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->"), a;
      if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++;
        0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState;
        var e = f.nextSuspenseID++;
        f = f.boundaryPrefix + e.toString(16);
        d = d.id = f;
        za(b, a.responseState, d);
        Z(a, b, c);
        return b.push("<!--/$-->");
      }
      if (d.byteSize > a.progressiveChunkSize)
        return d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), za(b, a.responseState, d.id), Z(a, b, c), b.push("<!--/$-->");
      a.responseState.generateStaticMarkup || b.push("<!--$-->");
      c = d.completedSegments;
      if (1 !== c.length)
        throw Error(l(391));
      Nb(a, b, c[0]);
      a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->");
      return a;
    }
    function Ob(a, b, c) {
      Aa(b, a.responseState, c.formatContext, c.id);
      Nb(a, b, c);
      return Ba(b, c.formatContext);
    }
    function Pb(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        Qb(a, b, c, d[f]);
      d.length = 0;
      a = a.responseState;
      d = c.id;
      c = c.rootSegmentID;
      b.push(a.startInlineScript);
      a.sentCompleteBoundaryFunction ? b.push('$RC("') : (a.sentCompleteBoundaryFunction = true, b.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
      if (null === d)
        throw Error(l(395));
      c = c.toString(16);
      b.push(d);
      b.push('","');
      b.push(a.segmentPrefix);
      b.push(c);
      return b.push('")<\/script>');
    }
    function Qb(a, b, c, d) {
      if (2 === d.status)
        return true;
      var f = d.id;
      if (-1 === f) {
        if (-1 === (d.id = c.rootSegmentID))
          throw Error(l(392));
        return Ob(a, b, d);
      }
      Ob(a, b, d);
      a = a.responseState;
      b.push(a.startInlineScript);
      a.sentCompleteSegmentFunction ? b.push('$RS("') : (a.sentCompleteSegmentFunction = true, b.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));
      b.push(a.segmentPrefix);
      f = f.toString(16);
      b.push(f);
      b.push('","');
      b.push(a.placeholderPrefix);
      b.push(f);
      return b.push('")<\/script>');
    }
    function Mb(a, b) {
      try {
        var c = a.completedRootSegment;
        if (null !== c && 0 === a.pendingRootTasks) {
          Nb(a, b, c);
          a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++)
            b.push(d[c]);
          c < d.length && b.push(d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, k = g.id, m = g.errorDigest, n = g.errorMessage, q = g.errorComponentStack;
          d.push(h.startInlineScript);
          h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = true, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'));
          if (null === k)
            throw Error(l(395));
          d.push(k);
          d.push('"');
          if (m || n || q) {
            d.push(",");
            var C = Da(m || "");
            d.push(C);
          }
          if (n || q) {
            d.push(",");
            var D = Da(n || "");
            d.push(D);
          }
          if (q) {
            d.push(",");
            var z2 = Da(q);
            d.push(z2);
          }
          if (!d.push(")<\/script>")) {
            a.destination = null;
            e++;
            f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var ba = a.completedBoundaries;
        for (e = 0; e < ba.length; e++)
          if (!Pb(a, b, ba[e])) {
            a.destination = null;
            e++;
            ba.splice(0, e);
            return;
          }
        ba.splice(0, e);
        var ca = a.partialBoundaries;
        for (e = 0; e < ca.length; e++) {
          var mb = ca[e];
          a: {
            f = a;
            g = b;
            var da = mb.completedSegments;
            for (h = 0; h < da.length; h++)
              if (!Qb(f, g, mb, da[h])) {
                h++;
                da.splice(0, h);
                var nb = false;
                break a;
              }
            da.splice(0, h);
            nb = true;
          }
          if (!nb) {
            a.destination = null;
            e++;
            ca.splice(0, e);
            return;
          }
        }
        ca.splice(0, e);
        var ea = a.completedBoundaries;
        for (e = 0; e < ea.length; e++)
          if (!Pb(a, b, ea[e])) {
            a.destination = null;
            e++;
            ea.splice(0, e);
            return;
          }
        ea.splice(0, e);
      } finally {
        0 === a.allPendingTasks && 0 === a.pingedTasks.length && 0 === a.clientRenderedBoundaries.length && 0 === a.completedBoundaries.length && b.push(null);
      }
    }
    function Rb(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return Lb(c2, a, b);
        });
        c.clear();
        null !== a.destination && Mb(a, a.destination);
      } catch (d) {
        V(a, d), W(a, d);
      }
    }
    function Sb() {
    }
    function Tb(a, b, c, d) {
      var f = false, e = null, g = "", h = { push: function(a2) {
        null !== a2 && (g += a2);
        return true;
      }, destroy: function(a2) {
        f = true;
        e = a2;
      } }, k = false;
      a = Ab(a, Ea(c, b ? b.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, Infinity, Sb, void 0, function() {
        k = true;
      }, void 0, void 0);
      Cb(a);
      Rb(a, d);
      if (1 === a.status)
        a.status = 2, h.destroy(a.fatalError);
      else if (2 !== a.status && null === a.destination) {
        a.destination = h;
        try {
          Mb(a, h);
        } catch (m) {
          V(a, m), W(a, m);
        }
      }
      if (f)
        throw e;
      if (!k)
        throw Error(l(426));
      return g;
    }
    exports.renderToNodeStream = function() {
      throw Error(l(207));
    };
    exports.renderToStaticMarkup = function(a, b) {
      return Tb(a, b, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
    };
    exports.renderToStaticNodeStream = function() {
      throw Error(l(208));
    };
    exports.renderToString = function(a, b) {
      return Tb(a, b, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
    };
    exports.version = "18.2.0";
  }
});

// ../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js
var require_react_dom_server_browser_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var aa = require_react();
    function k(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var l = null;
    var n = 0;
    function p(a, b) {
      if (0 !== b.length)
        if (512 < b.length)
          0 < n && (a.enqueue(new Uint8Array(l.buffer, 0, n)), l = new Uint8Array(512), n = 0), a.enqueue(b);
        else {
          var c = l.length - n;
          c < b.length && (0 === c ? a.enqueue(l) : (l.set(b.subarray(0, c), n), a.enqueue(l), b = b.subarray(c)), l = new Uint8Array(512), n = 0);
          l.set(b, n);
          n += b.length;
        }
    }
    function t(a, b) {
      p(a, b);
      return true;
    }
    function ba(a) {
      l && 0 < n && (a.enqueue(new Uint8Array(l.buffer, 0, n)), l = null, n = 0);
    }
    var ca = new TextEncoder();
    function u(a) {
      return ca.encode(a);
    }
    function w(a) {
      return ca.encode(a);
    }
    function da(a, b) {
      "function" === typeof a.error ? a.error(b) : a.close();
    }
    var x = Object.prototype.hasOwnProperty;
    var ea = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var fa = {};
    var ha = {};
    function ia(a) {
      if (x.call(ha, a))
        return true;
      if (x.call(fa, a))
        return false;
      if (ea.test(a))
        return ha[a] = true;
      fa[a] = true;
      return false;
    }
    function y(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = f;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = e;
      this.removeEmptyString = g;
    }
    var z2 = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z2[a] = new y(a, 0, false, a, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z2[b] = new y(b, 1, false, a[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z2[a] = new y(a, 2, false, a.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z2[a] = new y(a, 2, false, a, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z2[a] = new y(a, 3, false, a.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z2[a] = new y(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function(a) {
      z2[a] = new y(a, 4, false, a, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z2[a] = new y(a, 6, false, a, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z2[a] = new y(a, 5, false, a.toLowerCase(), null, false, false);
    });
    var ja = /[\-:]([a-z])/g;
    function ka(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ja,
        ka
      );
      z2[b] = new y(b, 1, false, a, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ja, ka);
      z2[b] = new y(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ja, ka);
      z2[b] = new y(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z2[a] = new y(a, 1, false, a.toLowerCase(), null, false, false);
    });
    z2.xlinkHref = new y("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z2[a] = new y(a, 1, false, a.toLowerCase(), null, true, true);
    });
    var B = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var la = ["Webkit", "ms", "Moz", "O"];
    Object.keys(B).forEach(function(a) {
      la.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        B[b] = B[a];
      });
    });
    var oa = /["'&<>]/;
    function C(a) {
      if ("boolean" === typeof a || "number" === typeof a)
        return "" + a;
      a = "" + a;
      var b = oa.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d));
          f = d + 1;
          c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var pa = /([A-Z])/g;
    var qa = /^ms-/;
    var ra = Array.isArray;
    var sa = w("<script>");
    var ta = w("<\/script>");
    var ua = w('<script src="');
    var va = w('<script type="module" src="');
    var wa = w('" async=""><\/script>');
    var xa = /(<\/|<)(s)(cript)/gi;
    function ya(a, b, c, d) {
      return "" + b + ("s" === c ? "\\u0073" : "\\u0053") + d;
    }
    function za(a, b, c, d, f) {
      a = void 0 === a ? "" : a;
      b = void 0 === b ? sa : w('<script nonce="' + C(b) + '">');
      var e = [];
      void 0 !== c && e.push(b, u(("" + c).replace(xa, ya)), ta);
      if (void 0 !== d)
        for (c = 0; c < d.length; c++)
          e.push(ua, u(C(d[c])), wa);
      if (void 0 !== f)
        for (d = 0; d < f.length; d++)
          e.push(va, u(C(f[d])), wa);
      return { bootstrapChunks: e, startInlineScript: b, placeholderPrefix: w(a + "P:"), segmentPrefix: w(a + "S:"), boundaryPrefix: a + "B:", idPrefix: a, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false };
    }
    function D(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function Aa(a) {
      return D("http://www.w3.org/2000/svg" === a ? 2 : "http://www.w3.org/1998/Math/MathML" === a ? 3 : 0, null);
    }
    function Ba(a, b, c) {
      switch (b) {
        case "select":
          return D(1, null != c.value ? c.value : c.defaultValue);
        case "svg":
          return D(2, null);
        case "math":
          return D(3, null);
        case "foreignObject":
          return D(1, null);
        case "table":
          return D(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return D(5, null);
        case "colgroup":
          return D(7, null);
        case "tr":
          return D(6, null);
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode ? D(1, null) : a;
    }
    var Ca = w("<!-- -->");
    function Da(a, b, c, d) {
      if ("" === b)
        return d;
      d && a.push(Ca);
      a.push(u(C(b)));
      return true;
    }
    var Ea = /* @__PURE__ */ new Map();
    var Fa = w(' style="');
    var Ga = w(":");
    var Ha = w(";");
    function Ia(a, b, c) {
      if ("object" !== typeof c)
        throw Error(k(62));
      b = true;
      for (var d in c)
        if (x.call(c, d)) {
          var f = c[d];
          if (null != f && "boolean" !== typeof f && "" !== f) {
            if (0 === d.indexOf("--")) {
              var e = u(C(d));
              f = u(C(("" + f).trim()));
            } else {
              e = d;
              var g = Ea.get(e);
              void 0 !== g ? e = g : (g = w(C(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-"))), Ea.set(e, g), e = g);
              f = "number" === typeof f ? 0 === f || x.call(B, d) ? u("" + f) : u(f + "px") : u(C(("" + f).trim()));
            }
            b ? (b = false, a.push(Fa, e, Ga, f)) : a.push(Ha, e, Ga, f);
          }
        }
      b || a.push(E);
    }
    var H = w(" ");
    var I = w('="');
    var E = w('"');
    var Ja = w('=""');
    function J(a, b, c, d) {
      switch (c) {
        case "style":
          Ia(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || "o" !== c[0] && "O" !== c[0] || "n" !== c[1] && "N" !== c[1]) {
        if (b = z2.hasOwnProperty(c) ? z2[c] : null, null !== b) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans)
                return;
          }
          c = u(b.attributeName);
          switch (b.type) {
            case 3:
              d && a.push(H, c, Ja);
              break;
            case 4:
              true === d ? a.push(H, c, Ja) : false !== d && a.push(H, c, I, u(C(d)), E);
              break;
            case 5:
              isNaN(d) || a.push(H, c, I, u(C(d)), E);
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(H, c, I, u(C(d)), E);
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(H, c, I, u(C(d)), E);
          }
        } else if (ia(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b)
                return;
          }
          a.push(H, u(c), I, u(C(d)), E);
        }
      }
    }
    var K = w(">");
    var Ka = w("/>");
    function L(a, b, c) {
      if (null != b) {
        if (null != c)
          throw Error(k(60));
        if ("object" !== typeof b || !("__html" in b))
          throw Error(k(61));
        b = b.__html;
        null !== b && void 0 !== b && a.push(u("" + b));
      }
    }
    function La(a) {
      var b = "";
      aa.Children.forEach(a, function(a2) {
        null != a2 && (b += a2);
      });
      return b;
    }
    var Ma = w(' selected=""');
    function Na(a, b, c, d) {
      a.push(M(c));
      var f = c = null, e;
      for (e in b)
        if (x.call(b, e)) {
          var g = b[e];
          if (null != g)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                J(a, d, e, g);
            }
        }
      a.push(K);
      L(a, f, c);
      return "string" === typeof c ? (a.push(u(C(c))), null) : c;
    }
    var Oa = w("\n");
    var Pa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var Qa = /* @__PURE__ */ new Map();
    function M(a) {
      var b = Qa.get(a);
      if (void 0 === b) {
        if (!Pa.test(a))
          throw Error(k(65, a));
        b = w("<" + a);
        Qa.set(a, b);
      }
      return b;
    }
    var Ra = w("<!DOCTYPE html>");
    function Sa(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(M("select"));
          var e = null, g = null;
          for (r in c)
            if (x.call(c, r)) {
              var h = c[r];
              if (null != h)
                switch (r) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    J(a, d, r, h);
                }
            }
          a.push(K);
          L(a, g, e);
          return e;
        case "option":
          g = f.selectedValue;
          a.push(M("option"));
          var m = h = null, q = null;
          var r = null;
          for (e in c)
            if (x.call(c, e)) {
              var v = c[e];
              if (null != v)
                switch (e) {
                  case "children":
                    h = v;
                    break;
                  case "selected":
                    q = v;
                    break;
                  case "dangerouslySetInnerHTML":
                    r = v;
                    break;
                  case "value":
                    m = v;
                  default:
                    J(a, d, e, v);
                }
            }
          if (null != g)
            if (c = null !== m ? "" + m : La(h), ra(g))
              for (d = 0; d < g.length; d++) {
                if ("" + g[d] === c) {
                  a.push(Ma);
                  break;
                }
              }
            else
              "" + g === c && a.push(Ma);
          else
            q && a.push(Ma);
          a.push(K);
          L(a, r, h);
          return h;
        case "textarea":
          a.push(M("textarea"));
          r = g = e = null;
          for (h in c)
            if (x.call(c, h) && (m = c[h], null != m))
              switch (h) {
                case "children":
                  r = m;
                  break;
                case "value":
                  e = m;
                  break;
                case "defaultValue":
                  g = m;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(k(91));
                default:
                  J(a, d, h, m);
              }
          null === e && null !== g && (e = g);
          a.push(K);
          if (null != r) {
            if (null != e)
              throw Error(k(92));
            if (ra(r) && 1 < r.length)
              throw Error(k(93));
            e = "" + r;
          }
          "string" === typeof e && "\n" === e[0] && a.push(Oa);
          null !== e && a.push(u(C("" + e)));
          return null;
        case "input":
          a.push(M("input"));
          m = r = h = e = null;
          for (g in c)
            if (x.call(c, g) && (q = c[g], null != q))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(399, "input"));
                case "defaultChecked":
                  m = q;
                  break;
                case "defaultValue":
                  h = q;
                  break;
                case "checked":
                  r = q;
                  break;
                case "value":
                  e = q;
                  break;
                default:
                  J(a, d, g, q);
              }
          null !== r ? J(
            a,
            d,
            "checked",
            r
          ) : null !== m && J(a, d, "checked", m);
          null !== e ? J(a, d, "value", e) : null !== h && J(a, d, "value", h);
          a.push(Ka);
          return null;
        case "menuitem":
          a.push(M("menuitem"));
          for (var A in c)
            if (x.call(c, A) && (e = c[A], null != e))
              switch (A) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(400));
                default:
                  J(a, d, A, e);
              }
          a.push(K);
          return null;
        case "title":
          a.push(M("title"));
          e = null;
          for (v in c)
            if (x.call(c, v) && (g = c[v], null != g))
              switch (v) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(k(434));
                default:
                  J(a, d, v, g);
              }
          a.push(K);
          return e;
        case "listing":
        case "pre":
          a.push(M(b));
          g = e = null;
          for (m in c)
            if (x.call(c, m) && (h = c[m], null != h))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  J(a, d, m, h);
              }
          a.push(K);
          if (null != g) {
            if (null != e)
              throw Error(k(60));
            if ("object" !== typeof g || !("__html" in g))
              throw Error(k(61));
            c = g.__html;
            null !== c && void 0 !== c && ("string" === typeof c && 0 < c.length && "\n" === c[0] ? a.push(Oa, u(c)) : a.push(u("" + c)));
          }
          "string" === typeof e && "\n" === e[0] && a.push(Oa);
          return e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(M(b));
          for (var F in c)
            if (x.call(c, F) && (e = c[F], null != e))
              switch (F) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(399, b));
                default:
                  J(a, d, F, e);
              }
          a.push(Ka);
          return null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return Na(a, c, b, d);
        case "html":
          return 0 === f.insertionMode && a.push(Ra), Na(a, c, b, d);
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is)
            return Na(a, c, b, d);
          a.push(M(b));
          g = e = null;
          for (q in c)
            if (x.call(c, q) && (h = c[q], null != h))
              switch (q) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  Ia(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  ia(q) && "function" !== typeof h && "symbol" !== typeof h && a.push(H, u(q), I, u(C(h)), E);
              }
          a.push(K);
          L(a, g, e);
          return e;
      }
    }
    var Ta = w("</");
    var Ua = w(">");
    var Va = w('<template id="');
    var Wa = w('"></template>');
    var Xa = w("<!--$-->");
    var Ya = w('<!--$?--><template id="');
    var Za = w('"></template>');
    var $a = w("<!--$!-->");
    var ab = w("<!--/$-->");
    var bb = w("<template");
    var cb = w('"');
    var db = w(' data-dgst="');
    w(' data-msg="');
    w(' data-stck="');
    var eb = w("></template>");
    function fb(a, b, c) {
      p(a, Ya);
      if (null === c)
        throw Error(k(395));
      p(a, c);
      return t(a, Za);
    }
    var gb = w('<div hidden id="');
    var hb = w('">');
    var ib = w("</div>");
    var jb = w('<svg aria-hidden="true" style="display:none" id="');
    var kb = w('">');
    var lb = w("</svg>");
    var mb = w('<math aria-hidden="true" style="display:none" id="');
    var nb = w('">');
    var ob = w("</math>");
    var pb = w('<table hidden id="');
    var qb = w('">');
    var rb = w("</table>");
    var sb = w('<table hidden><tbody id="');
    var tb = w('">');
    var ub = w("</tbody></table>");
    var vb = w('<table hidden><tr id="');
    var wb = w('">');
    var xb = w("</tr></table>");
    var yb = w('<table hidden><colgroup id="');
    var zb = w('">');
    var Ab = w("</colgroup></table>");
    function Bb(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return p(a, gb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, hb);
        case 2:
          return p(a, jb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, kb);
        case 3:
          return p(a, mb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, nb);
        case 4:
          return p(a, pb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, qb);
        case 5:
          return p(a, sb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, tb);
        case 6:
          return p(a, vb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, wb);
        case 7:
          return p(
            a,
            yb
          ), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, zb);
        default:
          throw Error(k(397));
      }
    }
    function Cb(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return t(a, ib);
        case 2:
          return t(a, lb);
        case 3:
          return t(a, ob);
        case 4:
          return t(a, rb);
        case 5:
          return t(a, ub);
        case 6:
          return t(a, xb);
        case 7:
          return t(a, Ab);
        default:
          throw Error(k(397));
      }
    }
    var Db = w('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("');
    var Eb = w('$RS("');
    var Gb = w('","');
    var Hb = w('")<\/script>');
    var Ib = w('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("');
    var Jb = w('$RC("');
    var Kb = w('","');
    var Lb = w('")<\/script>');
    var Mb = w('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("');
    var Nb = w('$RX("');
    var Ob = w('"');
    var Pb = w(")<\/script>");
    var Qb = w(",");
    var Rb = /[<\u2028\u2029]/g;
    function Sb(a) {
      return JSON.stringify(a).replace(Rb, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    var N = Object.assign;
    var Tb = Symbol.for("react.element");
    var Ub = Symbol.for("react.portal");
    var Vb = Symbol.for("react.fragment");
    var Wb = Symbol.for("react.strict_mode");
    var Xb = Symbol.for("react.profiler");
    var Yb = Symbol.for("react.provider");
    var Zb = Symbol.for("react.context");
    var $b = Symbol.for("react.forward_ref");
    var ac = Symbol.for("react.suspense");
    var bc = Symbol.for("react.suspense_list");
    var cc = Symbol.for("react.memo");
    var dc = Symbol.for("react.lazy");
    var ec = Symbol.for("react.scope");
    var fc = Symbol.for("react.debug_trace_mode");
    var gc = Symbol.for("react.legacy_hidden");
    var hc = Symbol.for("react.default_value");
    var ic = Symbol.iterator;
    function jc(a) {
      if (null == a)
        return null;
      if ("function" === typeof a)
        return a.displayName || a.name || null;
      if ("string" === typeof a)
        return a;
      switch (a) {
        case Vb:
          return "Fragment";
        case Ub:
          return "Portal";
        case Xb:
          return "Profiler";
        case Wb:
          return "StrictMode";
        case ac:
          return "Suspense";
        case bc:
          return "SuspenseList";
      }
      if ("object" === typeof a)
        switch (a.$$typeof) {
          case Zb:
            return (a.displayName || "Context") + ".Consumer";
          case Yb:
            return (a._context.displayName || "Context") + ".Provider";
          case $b:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case cc:
            return b = a.displayName || null, null !== b ? b : jc(a.type) || "Memo";
          case dc:
            b = a._payload;
            a = a._init;
            try {
              return jc(a(b));
            } catch (c) {
            }
        }
      return null;
    }
    var kc = {};
    function lc(a, b) {
      a = a.contextTypes;
      if (!a)
        return kc;
      var c = {}, d;
      for (d in a)
        c[d] = b[d];
      return c;
    }
    var O = null;
    function P(a, b) {
      if (a !== b) {
        a.context._currentValue = a.parentValue;
        a = a.parent;
        var c = b.parent;
        if (null === a) {
          if (null !== c)
            throw Error(k(401));
        } else {
          if (null === c)
            throw Error(k(401));
          P(a, c);
        }
        b.context._currentValue = b.value;
      }
    }
    function mc(a) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      null !== a && mc(a);
    }
    function nc(a) {
      var b = a.parent;
      null !== b && nc(b);
      a.context._currentValue = a.value;
    }
    function oc(a, b) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      if (null === a)
        throw Error(k(402));
      a.depth === b.depth ? P(a, b) : oc(a, b);
    }
    function pc(a, b) {
      var c = b.parent;
      if (null === c)
        throw Error(k(402));
      a.depth === c.depth ? P(a, c) : pc(a, c);
      b.context._currentValue = b.value;
    }
    function Q(a) {
      var b = O;
      b !== a && (null === b ? nc(a) : null === a ? mc(b) : b.depth === a.depth ? P(b, a) : b.depth > a.depth ? oc(b, a) : pc(b, a), O = a);
    }
    var qc = { isMounted: function() {
      return false;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals;
      null !== a.queue && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals;
      a.replace = true;
      a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function rc(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null;
      a.updater = qc;
      a.props = c;
      a.state = f;
      var e = { queue: [], replace: false };
      a._reactInternals = e;
      var g = b.contextType;
      a.context = "object" === typeof g && null !== g ? g._currentValue : d;
      g = b.getDerivedStateFromProps;
      "function" === typeof g && (g = g(c, f), f = null === g || void 0 === g ? f : N({}, f, g), a.state = f);
      if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a.getSnapshotBeforeUpdate && ("function" === typeof a.UNSAFE_componentWillMount || "function" === typeof a.componentWillMount))
        if (b = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), b !== a.state && qc.enqueueReplaceState(a, a.state, null), null !== e.queue && 0 < e.queue.length)
          if (b = e.queue, g = e.replace, e.queue = null, e.replace = false, g && 1 === b.length)
            a.state = b[0];
          else {
            e = g ? b[0] : a.state;
            f = true;
            for (g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = "function" === typeof h ? h.call(a, e, c, d) : h;
              null != h && (f ? (f = false, e = N({}, e, h)) : N(e, h));
            }
            a.state = e;
          }
        else
          e.queue = null;
    }
    var sc = { id: 1, overflow: "" };
    function tc(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - uc(d) - 1;
      d &= ~(1 << f);
      c += 1;
      var e = 32 - uc(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        e = (d & (1 << g) - 1).toString(32);
        d >>= g;
        f -= g;
        return { id: 1 << 32 - uc(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var uc = Math.clz32 ? Math.clz32 : vc;
    var wc = Math.log;
    var xc = Math.LN2;
    function vc(a) {
      a >>>= 0;
      return 0 === a ? 32 : 31 - (wc(a) / xc | 0) | 0;
    }
    function yc(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var zc = "function" === typeof Object.is ? Object.is : yc;
    var R = null;
    var Ac = null;
    var Bc = null;
    var S = null;
    var T = false;
    var Cc = false;
    var U = 0;
    var V = null;
    var Dc = 0;
    function W() {
      if (null === R)
        throw Error(k(321));
      return R;
    }
    function Ec() {
      if (0 < Dc)
        throw Error(k(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function Fc() {
      null === S ? null === Bc ? (T = false, Bc = S = Ec()) : (T = true, S = Bc) : null === S.next ? (T = false, S = S.next = Ec()) : (T = true, S = S.next);
      return S;
    }
    function Gc() {
      Ac = R = null;
      Cc = false;
      Bc = null;
      Dc = 0;
      S = V = null;
    }
    function Hc(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function Ic(a, b, c) {
      R = W();
      S = Fc();
      if (T) {
        var d = S.queue;
        b = d.dispatch;
        if (null !== V && (c = V.get(d), void 0 !== c)) {
          V.delete(d);
          d = S.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (null !== c);
          S.memoizedState = d;
          return [d, b];
        }
        return [S.memoizedState, b];
      }
      a = a === Hc ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
      S.memoizedState = a;
      a = S.queue = { last: null, dispatch: null };
      a = a.dispatch = Jc.bind(null, R, a);
      return [S.memoizedState, a];
    }
    function Kc(a, b) {
      R = W();
      S = Fc();
      b = void 0 === b ? null : b;
      if (null !== S) {
        var c = S.memoizedState;
        if (null !== c && null !== b) {
          var d = c[1];
          a:
            if (null === d)
              d = false;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!zc(b[f], d[f])) {
                  d = false;
                  break a;
                }
              d = true;
            }
          if (d)
            return c[0];
        }
      }
      a = a();
      S.memoizedState = [a, b];
      return a;
    }
    function Jc(a, b, c) {
      if (25 <= Dc)
        throw Error(k(301));
      if (a === R)
        if (Cc = true, a = { action: c, next: null }, null === V && (V = /* @__PURE__ */ new Map()), c = V.get(b), void 0 === c)
          V.set(b, a);
        else {
          for (b = c; null !== b.next; )
            b = b.next;
          b.next = a;
        }
    }
    function Lc() {
      throw Error(k(394));
    }
    function Mc() {
    }
    var Oc = { readContext: function(a) {
      return a._currentValue;
    }, useContext: function(a) {
      W();
      return a._currentValue;
    }, useMemo: Kc, useReducer: Ic, useRef: function(a) {
      R = W();
      S = Fc();
      var b = S.memoizedState;
      return null === b ? (a = { current: a }, S.memoizedState = a) : b;
    }, useState: function(a) {
      return Ic(Hc, a);
    }, useInsertionEffect: Mc, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return Kc(function() {
        return a;
      }, b);
    }, useImperativeHandle: Mc, useEffect: Mc, useDebugValue: Mc, useDeferredValue: function(a) {
      W();
      return a;
    }, useTransition: function() {
      W();
      return [false, Lc];
    }, useId: function() {
      var a = Ac.treeContext;
      var b = a.overflow;
      a = a.id;
      a = (a & ~(1 << 32 - uc(a) - 1)).toString(32) + b;
      var c = Nc;
      if (null === c)
        throw Error(k(404));
      b = U++;
      a = ":" + c.idPrefix + "R" + a;
      0 < b && (a += "H" + b.toString(32));
      return a + ":";
    }, useMutableSource: function(a, b) {
      W();
      return b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (void 0 === c)
        throw Error(k(407));
      return c();
    } };
    var Nc = null;
    var Pc = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function Qc(a) {
      console.error(a);
      return null;
    }
    function X() {
    }
    function Rc(a, b, c, d, f, e, g, h, m) {
      var q = [], r = /* @__PURE__ */ new Set();
      b = { destination: null, responseState: b, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: r, pingedTasks: q, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f ? Qc : f, onAllReady: void 0 === e ? X : e, onShellReady: void 0 === g ? X : g, onShellError: void 0 === h ? X : h, onFatalError: void 0 === m ? X : m };
      c = Sc(b, 0, null, c, false, false);
      c.parentFlushed = true;
      a = Tc(b, a, null, c, r, kc, null, sc);
      q.push(a);
      return b;
    }
    function Tc(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++;
      null === c ? a.pendingRootTasks++ : c.pendingTasks++;
      var m = { node: b, ping: function() {
        var b2 = a.pingedTasks;
        b2.push(m);
        1 === b2.length && Uc(a);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      f.add(m);
      return m;
    }
    function Sc(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function Y(a, b) {
      a = a.onError(b);
      if (null != a && "string" !== typeof a)
        throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function Vc(a, b) {
      var c = a.onShellError;
      c(b);
      c = a.onFatalError;
      c(b);
      null !== a.destination ? (a.status = 2, da(a.destination, b)) : (a.status = 1, a.fatalError = b);
    }
    function Wc(a, b, c, d, f) {
      R = {};
      Ac = b;
      U = 0;
      for (a = c(d, f); Cc; )
        Cc = false, U = 0, Dc += 1, S = null, a = c(d, f);
      Gc();
      return a;
    }
    function Xc(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (null !== e && void 0 !== e) {
        var g = b.legacyContext;
        if ("function" !== typeof c.getChildContext)
          d = g;
        else {
          c = c.getChildContext();
          for (var h in c)
            if (!(h in e))
              throw Error(k(108, jc(d) || "Unknown", h));
          d = N({}, g, c);
        }
        b.legacyContext = d;
        Z(a, b, f);
        b.legacyContext = g;
      } else
        Z(a, b, f);
    }
    function Yc(a, b) {
      if (a && a.defaultProps) {
        b = N({}, b);
        a = a.defaultProps;
        for (var c in a)
          void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Zc(a, b, c, d, f) {
      if ("function" === typeof c)
        if (c.prototype && c.prototype.isReactComponent) {
          f = lc(c, b.legacyContext);
          var e = c.contextType;
          e = new c(d, "object" === typeof e && null !== e ? e._currentValue : f);
          rc(e, c, d, f);
          Xc(a, b, e, c);
        } else {
          e = lc(c, b.legacyContext);
          f = Wc(a, b, c, d, e);
          var g = 0 !== U;
          if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof)
            rc(f, c, d, e), Xc(a, b, f, c);
          else if (g) {
            d = b.treeContext;
            b.treeContext = tc(d, 1, 0);
            try {
              Z(a, b, f);
            } finally {
              b.treeContext = d;
            }
          } else
            Z(a, b, f);
        }
      else if ("string" === typeof c) {
        f = b.blockedSegment;
        e = Sa(f.chunks, c, d, a.responseState, f.formatContext);
        f.lastPushedText = false;
        g = f.formatContext;
        f.formatContext = Ba(g, c, d);
        $c(a, b, e);
        f.formatContext = g;
        switch (c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push(Ta, u(c), Ua);
        }
        f.lastPushedText = false;
      } else {
        switch (c) {
          case gc:
          case fc:
          case Wb:
          case Xb:
          case Vb:
            Z(a, b, d.children);
            return;
          case bc:
            Z(a, b, d.children);
            return;
          case ec:
            throw Error(k(343));
          case ac:
            a: {
              c = b.blockedBoundary;
              f = b.blockedSegment;
              e = d.fallback;
              d = d.children;
              g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, m = Sc(a, f.chunks.length, h, f.formatContext, false, false);
              f.children.push(m);
              f.lastPushedText = false;
              var q = Sc(a, 0, null, f.formatContext, false, false);
              q.parentFlushed = true;
              b.blockedBoundary = h;
              b.blockedSegment = q;
              try {
                if ($c(
                  a,
                  b,
                  d
                ), q.lastPushedText && q.textEmbedded && q.chunks.push(Ca), q.status = 1, ad(h, q), 0 === h.pendingTasks)
                  break a;
              } catch (r) {
                q.status = 4, h.forceClientRender = true, h.errorDigest = Y(a, r);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Tc(a, e, c, m, g, b.legacyContext, b.context, b.treeContext);
              a.pingedTasks.push(b);
            }
            return;
        }
        if ("object" === typeof c && null !== c)
          switch (c.$$typeof) {
            case $b:
              d = Wc(a, b, c.render, d, f);
              if (0 !== U) {
                c = b.treeContext;
                b.treeContext = tc(c, 1, 0);
                try {
                  Z(a, b, d);
                } finally {
                  b.treeContext = c;
                }
              } else
                Z(a, b, d);
              return;
            case cc:
              c = c.type;
              d = Yc(c, d);
              Zc(a, b, c, d, f);
              return;
            case Yb:
              f = d.children;
              c = c._context;
              d = d.value;
              e = c._currentValue;
              c._currentValue = d;
              g = O;
              O = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c, parentValue: e, value: d };
              b.context = d;
              Z(a, b, f);
              a = O;
              if (null === a)
                throw Error(k(403));
              d = a.parentValue;
              a.context._currentValue = d === hc ? a.context._defaultValue : d;
              a = O = a.parent;
              b.context = a;
              return;
            case Zb:
              d = d.children;
              d = d(c._currentValue);
              Z(a, b, d);
              return;
            case dc:
              f = c._init;
              c = f(c._payload);
              d = Yc(c, d);
              Zc(a, b, c, d, void 0);
              return;
          }
        throw Error(k(
          130,
          null == c ? c : typeof c,
          ""
        ));
      }
    }
    function Z(a, b, c) {
      b.node = c;
      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case Tb:
            Zc(a, b, c.type, c.props, c.ref);
            return;
          case Ub:
            throw Error(k(257));
          case dc:
            var d = c._init;
            c = d(c._payload);
            Z(a, b, c);
            return;
        }
        if (ra(c)) {
          bd(a, b, c);
          return;
        }
        null === c || "object" !== typeof c ? d = null : (d = ic && c[ic] || c["@@iterator"], d = "function" === typeof d ? d : null);
        if (d && (d = d.call(c))) {
          c = d.next();
          if (!c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            bd(a, b, f);
          }
          return;
        }
        a = Object.prototype.toString.call(c);
        throw Error(k(31, "[object Object]" === a ? "object with keys {" + Object.keys(c).join(", ") + "}" : a));
      }
      "string" === typeof c ? (d = b.blockedSegment, d.lastPushedText = Da(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : "number" === typeof c && (d = b.blockedSegment, d.lastPushedText = Da(b.blockedSegment.chunks, "" + c, a.responseState, d.lastPushedText));
    }
    function bd(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = tc(e, d, f);
        try {
          $c(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function $c(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return Z(a, b, c);
      } catch (m) {
        if (Gc(), "object" === typeof m && null !== m && "function" === typeof m.then) {
          c = m;
          var g = b.blockedSegment, h = Sc(a, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
          g.children.push(h);
          g.lastPushedText = false;
          a = Tc(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
          c.then(a, a);
          b.blockedSegment.formatContext = d;
          b.legacyContext = f;
          b.context = e;
          Q(e);
        } else
          throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, Q(e), m;
      }
    }
    function cd(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment;
      a.status = 3;
      dd(this, b, a);
    }
    function ed(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3;
      null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.close())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a = void 0 === c ? Error(k(432)) : c, d.errorDigest = b.onError(a), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return ed(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (d = b.onAllReady, d()));
    }
    function ad(a, b) {
      if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
        var c = b.children[0];
        c.id = b.id;
        c.parentFlushed = true;
        1 === c.status && ad(a, c);
      } else
        a.completedSegments.push(b);
    }
    function dd(a, b, c) {
      if (null === b) {
        if (c.parentFlushed) {
          if (null !== a.completedRootSegment)
            throw Error(k(389));
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--;
        0 === a.pendingRootTasks && (a.onShellError = X, b = a.onShellReady, b());
      } else
        b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c.parentFlushed && 1 === c.status && ad(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(cd, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && 1 === c.status && (ad(b, c), 1 === b.completedSegments.length && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--;
      0 === a.allPendingTasks && (a = a.onAllReady, a());
    }
    function Uc(a) {
      if (2 !== a.status) {
        var b = O, c = Pc.current;
        Pc.current = Oc;
        var d = Nc;
        Nc = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e];
            var h = a, m = g.blockedSegment;
            if (0 === m.status) {
              Q(g.context);
              try {
                Z(h, g, g.node), m.lastPushedText && m.textEmbedded && m.chunks.push(Ca), g.abortSet.delete(g), m.status = 1, dd(h, g.blockedBoundary, m);
              } catch (G) {
                if (Gc(), "object" === typeof G && null !== G && "function" === typeof G.then) {
                  var q = g.ping;
                  G.then(q, q);
                } else {
                  g.abortSet.delete(g);
                  m.status = 4;
                  var r = g.blockedBoundary, v = G, A = Y(h, v);
                  null === r ? Vc(h, v) : (r.pendingTasks--, r.forceClientRender || (r.forceClientRender = true, r.errorDigest = A, r.parentFlushed && h.clientRenderedBoundaries.push(r)));
                  h.allPendingTasks--;
                  if (0 === h.allPendingTasks) {
                    var F = h.onAllReady;
                    F();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e);
          null !== a.destination && fd(a, a.destination);
        } catch (G) {
          Y(a, G), Vc(a, G);
        } finally {
          Nc = d, Pc.current = c, c === Oc && Q(b);
        }
      }
    }
    function gd(a, b, c) {
      c.parentFlushed = true;
      switch (c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          c.lastPushedText = false;
          c.textEmbedded = false;
          a = a.responseState;
          p(b, Va);
          p(b, a.placeholderPrefix);
          a = u(d.toString(16));
          p(b, a);
          return t(b, Wa);
        case 1:
          c.status = 2;
          var f = true;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++)
              p(b, d[e]);
            f = hd(a, b, f);
          }
          for (; e < d.length - 1; e++)
            p(b, d[e]);
          e < d.length && (f = t(b, d[e]));
          return f;
        default:
          throw Error(k(390));
      }
    }
    function hd(a, b, c) {
      var d = c.boundary;
      if (null === d)
        return gd(a, b, c);
      d.parentFlushed = true;
      if (d.forceClientRender)
        d = d.errorDigest, t(b, $a), p(b, bb), d && (p(b, db), p(b, u(C(d))), p(b, cb)), t(b, eb), gd(a, b, c);
      else if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++;
        0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState;
        var e = f.nextSuspenseID++;
        f = w(f.boundaryPrefix + e.toString(16));
        d = d.id = f;
        fb(b, a.responseState, d);
        gd(a, b, c);
      } else if (d.byteSize > a.progressiveChunkSize)
        d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), fb(b, a.responseState, d.id), gd(a, b, c);
      else {
        t(b, Xa);
        c = d.completedSegments;
        if (1 !== c.length)
          throw Error(k(391));
        hd(a, b, c[0]);
      }
      return t(b, ab);
    }
    function id(a, b, c) {
      Bb(b, a.responseState, c.formatContext, c.id);
      hd(a, b, c);
      return Cb(b, c.formatContext);
    }
    function jd(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        kd(a, b, c, d[f]);
      d.length = 0;
      a = a.responseState;
      d = c.id;
      c = c.rootSegmentID;
      p(b, a.startInlineScript);
      a.sentCompleteBoundaryFunction ? p(b, Jb) : (a.sentCompleteBoundaryFunction = true, p(b, Ib));
      if (null === d)
        throw Error(k(395));
      c = u(c.toString(16));
      p(b, d);
      p(b, Kb);
      p(b, a.segmentPrefix);
      p(b, c);
      return t(b, Lb);
    }
    function kd(a, b, c, d) {
      if (2 === d.status)
        return true;
      var f = d.id;
      if (-1 === f) {
        if (-1 === (d.id = c.rootSegmentID))
          throw Error(k(392));
        return id(a, b, d);
      }
      id(a, b, d);
      a = a.responseState;
      p(b, a.startInlineScript);
      a.sentCompleteSegmentFunction ? p(b, Eb) : (a.sentCompleteSegmentFunction = true, p(b, Db));
      p(b, a.segmentPrefix);
      f = u(f.toString(16));
      p(b, f);
      p(b, Gb);
      p(b, a.placeholderPrefix);
      p(b, f);
      return t(b, Hb);
    }
    function fd(a, b) {
      l = new Uint8Array(512);
      n = 0;
      try {
        var c = a.completedRootSegment;
        if (null !== c && 0 === a.pendingRootTasks) {
          hd(a, b, c);
          a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++)
            p(b, d[c]);
          c < d.length && t(b, d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, m = g.id, q = g.errorDigest, r = g.errorMessage, v = g.errorComponentStack;
          p(d, h.startInlineScript);
          h.sentClientRenderFunction ? p(d, Nb) : (h.sentClientRenderFunction = true, p(
            d,
            Mb
          ));
          if (null === m)
            throw Error(k(395));
          p(d, m);
          p(d, Ob);
          if (q || r || v)
            p(d, Qb), p(d, u(Sb(q || "")));
          if (r || v)
            p(d, Qb), p(d, u(Sb(r || "")));
          v && (p(d, Qb), p(d, u(Sb(v))));
          if (!t(d, Pb)) {
            a.destination = null;
            e++;
            f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var A = a.completedBoundaries;
        for (e = 0; e < A.length; e++)
          if (!jd(a, b, A[e])) {
            a.destination = null;
            e++;
            A.splice(0, e);
            return;
          }
        A.splice(0, e);
        ba(b);
        l = new Uint8Array(512);
        n = 0;
        var F = a.partialBoundaries;
        for (e = 0; e < F.length; e++) {
          var G = F[e];
          a: {
            f = a;
            g = b;
            var ma = G.completedSegments;
            for (h = 0; h < ma.length; h++)
              if (!kd(
                f,
                g,
                G,
                ma[h]
              )) {
                h++;
                ma.splice(0, h);
                var Fb = false;
                break a;
              }
            ma.splice(0, h);
            Fb = true;
          }
          if (!Fb) {
            a.destination = null;
            e++;
            F.splice(0, e);
            return;
          }
        }
        F.splice(0, e);
        var na = a.completedBoundaries;
        for (e = 0; e < na.length; e++)
          if (!jd(a, b, na[e])) {
            a.destination = null;
            e++;
            na.splice(0, e);
            return;
          }
        na.splice(0, e);
      } finally {
        ba(b), 0 === a.allPendingTasks && 0 === a.pingedTasks.length && 0 === a.clientRenderedBoundaries.length && 0 === a.completedBoundaries.length && b.close();
      }
    }
    function ld(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return ed(c2, a, b);
        });
        c.clear();
        null !== a.destination && fd(a, a.destination);
      } catch (d) {
        Y(a, d), Vc(a, d);
      }
    }
    exports.renderToReadableStream = function(a, b) {
      return new Promise(function(c, d) {
        var f, e, g = new Promise(function(a2, b2) {
          e = a2;
          f = b2;
        }), h = Rc(a, za(b ? b.identifierPrefix : void 0, b ? b.nonce : void 0, b ? b.bootstrapScriptContent : void 0, b ? b.bootstrapScripts : void 0, b ? b.bootstrapModules : void 0), Aa(b ? b.namespaceURI : void 0), b ? b.progressiveChunkSize : void 0, b ? b.onError : void 0, e, function() {
          var a2 = new ReadableStream({ type: "bytes", pull: function(a3) {
            if (1 === h.status)
              h.status = 2, da(a3, h.fatalError);
            else if (2 !== h.status && null === h.destination) {
              h.destination = a3;
              try {
                fd(h, a3);
              } catch (A) {
                Y(h, A), Vc(h, A);
              }
            }
          }, cancel: function() {
            ld(h);
          } }, { highWaterMark: 0 });
          a2.allReady = g;
          c(a2);
        }, function(a2) {
          g.catch(function() {
          });
          d(a2);
        }, f);
        if (b && b.signal) {
          var m = b.signal, q = function() {
            ld(h, m.reason);
            m.removeEventListener("abort", q);
          };
          m.addEventListener("abort", q);
        }
        Uc(h);
      });
    };
    exports.version = "18.2.0";
  }
});

// ../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/server.browser.js
var require_server_browser = __commonJS({
  "../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/server.browser.js"(exports) {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    var l;
    var s;
    if (true) {
      l = require_react_dom_server_legacy_browser_production_min();
      s = require_react_dom_server_browser_production_min();
    } else {
      l = null;
      s = null;
    }
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToNodeStream = l.renderToNodeStream;
    exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
    exports.renderToReadableStream = s.renderToReadableStream;
  }
});

// ../build/server/index.js
var server_exports = {};
__export(server_exports, {
  assets: () => serverManifest,
  assetsBuildDirectory: () => assetsBuildDirectory,
  basename: () => basename,
  entry: () => entry,
  future: () => future,
  isSpaMode: () => isSpaMode,
  metronome: () => metronome,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes2
});
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const body = await (0, import_server4.renderToReadableStream)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemixServer, { context: remixContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
function obfuscate(inputObj) {
  return JSON.stringify(inputObj);
}
function useQueue() {
  const intervalId = (0, import_react2.useRef)(void 0);
  const report = (0, import_react2.useCallback)(() => {
    if (window.__metronomeQueue.length === 0 || window.__metronomeDoNotTrack) {
      return;
    }
    const str = obfuscate(window.__metronomeQueue);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/__metronome", str);
    } else {
      fetch("/__metronome", { body: str, method: "POST", keepalive: true });
    }
    window.__metronomeQueue = [];
  }, []);
  (0, import_react2.useEffect)(() => {
    const visibilityChangeHandler = () => {
      if (document.visibilityState === "hidden") {
        report();
      }
    };
    addEventListener("visibilitychange", visibilityChangeHandler);
    addEventListener("pagehide", report);
    addEventListener("beforeunload", report);
    intervalId.current = setInterval(report, 5e3);
    return () => {
      removeEventListener("visibilitychange", visibilityChangeHandler);
      removeEventListener("pagehide", report);
      removeEventListener("beforeunload", report);
      clearInterval(intervalId.current);
      report();
    };
  }, []);
  const enqueue = (0, import_react2.useCallback)((event) => {
    window.__metronomeQueue.push(event);
  }, []);
  return { enqueue };
}
function useGetBrowserData() {
  const location = (0, import_react_router_dom6.useLocation)();
  const useGetBrowserData2 = (0, import_react2.useCallback)(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const minWidth = 768;
    const hasTouchSupport = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    let deviceCategory = "desktop";
    if (hasTouchSupport) {
      const hasSmallScreen = window.screen.width < minWidth;
      deviceCategory = hasSmallScreen ? "mobile" : "tablet";
    }
    return {
      pathname: location.pathname ?? "",
      url: window.location.href,
      hostname: window.location.hostname,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      connection: (connection == null ? void 0 : connection.effectiveType) || "unknown",
      deviceCategory
    };
  }, [location]);
  return useGetBrowserData2;
}
function useWebVitals(enqueue) {
  const getBrowserData = useGetBrowserData();
  const [webVitalScriptLoaded, setWebVitalScriptLoaded] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const handleOnLoad = () => {
      window._webVitals = window.webVitals;
      setWebVitalScriptLoaded(true);
    };
    const script = document.createElement("script");
    script.src = `/__metronome/web-vitals/metronome-${METRONOME_VERSION2}.js`;
    script.onload = handleOnLoad;
    document.head.appendChild(script);
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!webVitalScriptLoaded || typeof window._webVitals === "undefined")
      return;
    function enqueueWebVital(metric) {
      const webVitalMetric = {
        name: "web-vital",
        timestamp: Date.now(),
        metric: {
          id: metric.id,
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          navigationType: metric.navigationType
        },
        ...getBrowserData()
      };
      enqueue(webVitalMetric);
    }
    window._webVitals.onFCP(enqueueWebVital);
    window._webVitals.onLCP(enqueueWebVital);
    window._webVitals.onFID(enqueueWebVital);
    window._webVitals.onCLS(enqueueWebVital);
    window._webVitals.onTTFB(enqueueWebVital);
    window._webVitals.onINP(enqueueWebVital);
  }, [webVitalScriptLoaded]);
}
function useWebAnalytics(enqueue) {
  const lastLocationKey = (0, import_react2.useRef)();
  const location = (0, import_react_router_dom6.useLocation)();
  const getBrowserData = useGetBrowserData();
  (0, import_react2.useEffect)(() => {
    const { key } = location;
    if (lastLocationKey.current === key)
      return;
    const pageviewMetric = {
      name: "pageview",
      timestamp: Date.now(),
      ...getBrowserData()
    };
    enqueue(pageviewMetric);
    lastLocationKey.current = key;
  }, [location, getBrowserData]);
}
function useClientErrors(enqueue) {
  const getBrowserData = useGetBrowserData();
  const mounted = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(() => {
    if (mounted.current)
      return;
    function eventHandler(event) {
      const { message, filename, lineno, colno, error } = event;
      const { stack } = error;
      enqueue({
        name: "client-error",
        timestamp: Date.now(),
        error: { name: error.name, message, filename, lineno, colno, stack },
        ...getBrowserData()
      });
    }
    window.addEventListener("error", eventHandler);
    mounted.current = true;
    return () => {
      window.removeEventListener("error", eventHandler);
    };
  }, [getBrowserData, enqueue]);
}
function Layout({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
    ] })
  ] });
}
function throwMe() {
  throw new Error("throwMe");
}
async function loader$4() {
  return { project: { id: "1" } };
}
async function action$3() {
  return { baz: "qux" };
}
function Index$3() {
  (0, import_react2.useEffect)(() => {
    setTimeout(() => {
      thisThrows();
    }, 1e3);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "client error" });
}
function loader$3() {
  return { health: "ok" };
}
async function loader$2() {
  return { project: { id: "1" } };
}
async function action$2() {
  return { baz: "qux" };
}
function Index$2() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "project.$id" });
}
async function loader$1({ request }) {
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  return (0, import_cloudflare2.json)({ message: "Hello World!" }, { headers: { "x-foo": "bar" } });
}
async function action$1() {
  return (0, import_cloudflare2.json)({ foo: "Bar" });
}
function Index$1() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Welcome to Remix" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/blog", rel: "noreferrer", children: "15m Quickstart Blog Tutorial" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { target: "_blank", href: "https://remix.run/tutorials/jokes", rel: "noreferrer", children: "Deep Dive Jokes App Tutorial" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }) })
    ] })
  ] });
}
async function loader2() {
  throw new Error("error" + Date.now());
}
async function action() {
  throw new Error("error" + Date.now());
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "error" });
}
var import_jsx_runtime, import_server4, import_react2, import_cloudflare2, entryServer, METRONOME_VERSION2, MetronomeInstrumentation, withMetronome, root, route0, thisThrows, meta$3, route1, route2, meta$2, route3, meta$1, route4, meta, route5, serverManifest, mode, assetsBuildDirectory, basename, future, isSpaMode, publicPath, entry, metronome, routes2;
var init_server3 = __esm({
  "../build/server/index.js"() {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_server();
    import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
    init_esm2();
    init_isbot();
    import_server4 = __toESM(require_server_browser(), 1);
    import_react2 = __toESM(require_react(), 1);
    import_cloudflare2 = __toESM(require_dist2(), 1);
    entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: handleRequest
    }, Symbol.toStringTag, { value: "Module" }));
    if (typeof window !== "undefined") {
      window.__metronomeQueue = window.__metronomeQueue ?? [];
      window.__metronomeDoNotTrack = window.__metronomeDoNotTrack ?? false;
    }
    METRONOME_VERSION2 = "8.3.0";
    MetronomeInstrumentation = () => {
      const { enqueue } = useQueue();
      useWebVitals(enqueue);
      useWebAnalytics(enqueue);
      useClientErrors(enqueue);
      return null;
    };
    MetronomeInstrumentation.displayName = "MetronomeInstrumentation";
    withMetronome = false ? (App2) => {
      return function Metronome(props) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App2, { ...props });
      };
    } : (App2) => {
      return function Metronome(props) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetronomeInstrumentation, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App2, { ...props })
        ] });
      };
    };
    root = withMetronome(function App() {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_router_dom6.Outlet, {});
    });
    route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      Layout,
      default: root
    }, Symbol.toStringTag, { value: "Module" }));
    thisThrows = () => {
      console.log("thisThrows");
      throwMe();
    };
    meta$3 = () => {
      return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
    };
    route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      action: action$3,
      default: Index$3,
      loader: loader$4,
      meta: meta$3
    }, Symbol.toStringTag, { value: "Module" }));
    route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      loader: loader$3
    }, Symbol.toStringTag, { value: "Module" }));
    meta$2 = () => {
      return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
    };
    route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      action: action$2,
      default: Index$2,
      loader: loader$2,
      meta: meta$2
    }, Symbol.toStringTag, { value: "Module" }));
    meta$1 = () => {
      return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
    };
    route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      action: action$1,
      default: Index$1,
      loader: loader$1,
      meta: meta$1
    }, Symbol.toStringTag, { value: "Module" }));
    meta = () => {
      return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
    };
    route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      action,
      default: Index,
      loader: loader2,
      meta
    }, Symbol.toStringTag, { value: "Module" }));
    serverManifest = { "entry": { "module": "/assets/entry.client-Fq01g0GH.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-BjiumUbx.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-jRJnnWRI.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-BjiumUbx.js"], "css": [] }, "routes/error-client": { "id": "routes/error-client", "parentId": "root", "path": "error-client", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/error-client-yvFzYJwp.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/healthcheck": { "id": "routes/healthcheck", "parentId": "root", "path": "healthcheck", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/healthcheck-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/project.$id": { "id": "routes/project.$id", "parentId": "root", "path": "project/:id", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/project._id-Do-r6ocA.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D_UUquDl.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/error": { "id": "routes/error", "parentId": "root", "path": "error", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/error-mlQBhIgC.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] } }, "url": "/assets/manifest-8a83910f.js", "version": "8a83910f" };
    mode = "production";
    assetsBuildDirectory = "build/client";
    basename = "/";
    future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
    isSpaMode = false;
    publicPath = "/";
    entry = { module: entryServer };
    metronome = { "debug": true, "unstable_sourcemaps": true, "endpoint": "https://test.metronome.sh", "apiKey": "ak_ppl6NKtAJ98thNay5RILU66syWPSBpFkmvyspFMT", "remixPackages": { "package.remix.cloudflare": "^2.8.1", "package.remix.cloudflare-pages": "^2.8.1", "package.remix.react": "^2.8.1", "package.react": "^18.2.0", "package.react-dom": "^18.2.0" }, "version": "8a83910f" };
    routes2 = registerMetronome({
      "root": {
        id: "root",
        parentId: void 0,
        path: "",
        index: void 0,
        caseSensitive: void 0,
        module: route0
      },
      "routes/error-client": {
        id: "routes/error-client",
        parentId: "root",
        path: "error-client",
        index: void 0,
        caseSensitive: void 0,
        module: route1
      },
      "routes/healthcheck": {
        id: "routes/healthcheck",
        parentId: "root",
        path: "healthcheck",
        index: void 0,
        caseSensitive: void 0,
        module: route2
      },
      "routes/project.$id": {
        id: "routes/project.$id",
        parentId: "root",
        path: "project/:id",
        index: void 0,
        caseSensitive: void 0,
        module: route3
      },
      "routes/_index": {
        id: "routes/_index",
        parentId: "root",
        path: void 0,
        index: true,
        caseSensitive: void 0,
        module: route4
      },
      "routes/error": {
        id: "routes/error",
        parentId: "root",
        path: "error",
        index: void 0,
        caseSensitive: void 0,
        module: route5
      }
    }, metronome);
  }
});

// [[path]].ts
var onRequest;
var init_path = __esm({
  "[[path]].ts"() {
    "use strict";
    init_functionsRoutes_0_01815167057982614();
    init_modules_watch_stub();
    init_esm();
    init_server3();
    onRequest = createPagesFunctionHandler({ build: server_exports });
  }
});

// ../.wrangler/tmp/pages-ZnMvqy/functionsRoutes-0.01815167057982614.mjs
var routes;
var init_functionsRoutes_0_01815167057982614 = __esm({
  "../.wrangler/tmp/pages-ZnMvqy/functionsRoutes-0.01815167057982614.mjs"() {
    "use strict";
    init_path();
    routes = [
      {
        routePath: "/:path*",
        mountPath: "/",
        method: "",
        middlewares: [],
        modules: [onRequest]
      }
    ];
  }
});

// ../../../node_modules/.pnpm/wrangler@3.48.0_@cloudflare+workers-types@4.20240405.0/node_modules/wrangler/templates/pages-template-worker.ts
init_functionsRoutes_0_01815167057982614();
init_modules_watch_stub();
init_dist();
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);
export {
  pages_template_worker_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@remix-run/server-runtime/dist/warnings.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/cookies.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/formData.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/router/dist/router.cjs.js:
  (**
   * @remix-run/router v1.15.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/mode.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/errors.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/responses.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/entry.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/headers.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/invariant.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/routeMatching.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/data.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/routes.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/markup.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/serverHandoff.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/dev.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/server.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/sessions.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/sessions/cookieStorage.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/sessions/memoryStorage.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/upload/errors.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/upload/memoryUploadHandler.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/index.js:
  (**
   * @remix-run/server-runtime v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/crypto.js:
  (**
   * @remix-run/cloudflare v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/implementations.js:
  (**
   * @remix-run/cloudflare v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/sessions/workersKVStorage.js:
  (**
   * @remix-run/cloudflare v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare/dist/index.js:
  (**
   * @remix-run/cloudflare v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare-pages/dist/esm/worker.js:
  (**
   * @remix-run/cloudflare-pages v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/cloudflare-pages/dist/esm/index.js:
  (**
   * @remix-run/cloudflare-pages v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/umd/react-router.production.min.js:
  (**
   * React Router v6.22.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/main.js:
  (**
   * React Router v6.22.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/umd/react-router-dom.production.min.js:
  (**
   * React Router DOM v6.22.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/main.js:
  (**
   * React Router DOM v6.22.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/fallback.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.8.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.browser.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.production.min.js:
  (**
   * @license React
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=index.js.map
