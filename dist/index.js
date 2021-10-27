var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
import React, { useRef, useEffect, createContext, useLayoutEffect, useState, useCallback, forwardRef, memo, useContext } from "react";
import "react-dom";
var isType$2 = function(type) {
  return function(obj) {
    return getType(obj) === "[object " + type + "]";
  };
};
var getType = function(obj) {
  return Object.prototype.toString.call(obj);
};
var isFn$2 = function(val) {
  return typeof val === "function";
};
var isArr$2 = Array.isArray;
var isPlainObj$1 = isType$2("Object");
var isStr$1 = isType$2("String");
var isBool = isType$2("Boolean");
var isNum$1 = isType$2("Number");
var isNumberLike$1 = function(index) {
  return isNum$1(index) || /^\d+$/.test(index);
};
var isObj$1 = function(val) {
  return typeof val === "object";
};
var toArr$1 = function(val) {
  return isArr$2(val) ? val : val ? [val] : [];
};
function each(val, iterator, revert) {
  if (isArr$2(val) || isStr$1(val)) {
    if (revert) {
      for (var i = val.length - 1; i >= 0; i--) {
        if (iterator(val[i], i) === false) {
          return;
        }
      }
    } else {
      for (var i = 0; i < val.length; i++) {
        if (iterator(val[i], i) === false) {
          return;
        }
      }
    }
  } else if (isObj$1(val)) {
    var key = void 0;
    for (key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        if (iterator(val[key], key) === false) {
          return;
        }
      }
    }
  }
}
function globalSelf$1() {
  try {
    if (typeof self !== "undefined") {
      return self;
    }
  } catch (e2) {
  }
  try {
    if (typeof window !== "undefined") {
      return window;
    }
  } catch (e2) {
  }
  try {
    if (typeof global !== "undefined") {
      return global;
    }
  } catch (e2) {
  }
  return Function("return this")();
}
var globalThisPolyfill$1 = globalSelf$1();
var instOf = function(value, cls) {
  if (isFn$2(cls))
    return value instanceof cls;
  if (isStr$1(cls))
    return globalThisPolyfill$1[cls] ? value instanceof globalThisPolyfill$1[cls] : false;
  return false;
};
var isArray$1 = isArr$2;
var keyList$1 = Object.keys;
var hasProp$1 = Object.prototype.hasOwnProperty;
function equal(a, b2) {
  if (a === b2) {
    return true;
  }
  if (a && b2 && typeof a === "object" && typeof b2 === "object") {
    var arrA = isArray$1(a);
    var arrB = isArray$1(b2);
    var i = void 0;
    var length_1;
    var key = void 0;
    if (arrA && arrB) {
      length_1 = a.length;
      if (length_1 !== b2.length) {
        return false;
      }
      for (i = length_1; i-- !== 0; ) {
        if (!equal(a[i], b2[i])) {
          return false;
        }
      }
      return true;
    }
    if (arrA !== arrB) {
      return false;
    }
    var momentA = a && a._isAMomentObject;
    var momentB = b2 && b2._isAMomentObject;
    if (momentA !== momentB)
      return false;
    if (momentA && momentB)
      return a.isSame(b2);
    var immutableA = a && a.toJS;
    var immutableB = b2 && b2.toJS;
    if (immutableA !== immutableB)
      return false;
    if (immutableA)
      return a.is ? a.is(b2) : a === b2;
    var dateA = instOf(a, "Date");
    var dateB = instOf(b2, "Date");
    if (dateA !== dateB) {
      return false;
    }
    if (dateA && dateB) {
      return a.getTime() === b2.getTime();
    }
    var regexpA = instOf(a, "RegExp");
    var regexpB = instOf(b2, "RegExp");
    if (regexpA !== regexpB) {
      return false;
    }
    if (regexpA && regexpB) {
      return a.toString() === b2.toString();
    }
    var urlA = instOf(a, "URL");
    var urlB = instOf(b2, "URL");
    if (urlA !== urlB) {
      return false;
    }
    if (urlA && urlB) {
      return a.href === b2.href;
    }
    var schemaA = a && a.toJSON;
    var schemaB = b2 && b2.toJSON;
    if (schemaA !== schemaB)
      return false;
    if (schemaA && schemaB)
      return equal(a.toJSON(), b2.toJSON());
    var keys = keyList$1(a);
    length_1 = keys.length;
    if (length_1 !== keyList$1(b2).length) {
      return false;
    }
    for (i = length_1; i-- !== 0; ) {
      if (!hasProp$1.call(b2, keys[i])) {
        return false;
      }
    }
    for (i = length_1; i-- !== 0; ) {
      key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      } else {
        if (!equal(a[key], b2[key])) {
          return false;
        }
      }
    }
    return true;
  }
  return a !== a && b2 !== b2;
}
var isEqual$1 = function exportedEqual(a, b2) {
  try {
    return equal(a, b2);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
      console.warn("Warning: react-fast-compare does not handle circular references.", error.name, error.message);
      return false;
    }
    throw error;
  }
};
var __assign$k = globalThis && globalThis.__assign || function() {
  __assign$k = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$k.apply(this, arguments);
};
var clone = function(values) {
  if (Array.isArray(values)) {
    var res_1 = [];
    values.forEach(function(item) {
      res_1.push(clone(item));
    });
    return res_1;
  } else if (isPlainObj$1(values)) {
    if ("$$typeof" in values && "_owner" in values) {
      return values;
    }
    if (values["_isAMomentObject"]) {
      return values;
    }
    if (values["_isJSONSchemaObject"]) {
      return values;
    }
    if (isFn$2(values["toJS"])) {
      return values["toJS"]();
    }
    if (isFn$2(values["toJSON"])) {
      return values["toJSON"]();
    }
    var res = {};
    for (var key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        res[key] = clone(values[key]);
      }
    }
    return res;
  } else {
    return values;
  }
};
var has = Object.prototype.hasOwnProperty;
var toString$1 = Object.prototype.toString;
var isValid$4 = function(val) {
  return val !== void 0 && val !== null;
};
function isEmpty(val, strict) {
  if (strict === void 0) {
    strict = false;
  }
  if (val == null) {
    return true;
  }
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return false;
  }
  if (typeof val === "string") {
    return val.length === 0;
  }
  if (typeof val === "function") {
    return val.length === 0;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return true;
    }
    for (var i = 0; i < val.length; i++) {
      if (strict) {
        if (val[i] !== void 0 && val[i] !== null) {
          return false;
        }
      } else {
        if (val[i] !== void 0 && val[i] !== null && val[i] !== "" && val[i] !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  if (instOf(val, "Error")) {
    return val.message === "";
  }
  if (val.toString === toString$1) {
    switch (val.toString()) {
      case "[object File]":
      case "[object Map]":
      case "[object Set]": {
        return val.size === 0;
      }
      case "[object Object]": {
        for (var key in val) {
          if (has.call(val, key)) {
            return false;
          }
        }
        return true;
      }
    }
  }
  return false;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$j = function() {
  __assign$j = Object.assign || function __assign2(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$j.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.splitRegexp, splitRegexp = _a2 === void 0 ? DEFAULT_SPLIT_REGEXP : _a2, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function pascalCaseTransform(input, index) {
  var firstChar = input.charAt(0);
  var lowerChars = input.substr(1).toLowerCase();
  if (index > 0 && firstChar >= "0" && firstChar <= "9") {
    return "_" + firstChar + lowerChars;
  }
  return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign$j({
    delimiter: "",
    transform: pascalCaseTransform
  }, options));
}
var ansiRegex = function() {
  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"].join("|");
  return new RegExp(pattern, "g");
};
var regex = "[\uD800-\uDBFF][\uDC00-\uDFFF]";
var astralRegex = function(opts) {
  return opts && opts.exact ? new RegExp("^" + regex + "$") : new RegExp(regex, "g");
};
var stripAnsi = function(input) {
  return typeof input === "string" ? input.replace(ansiRegex(), "") : input;
};
var stringLength = function(input) {
  return stripAnsi(input).replace(astralRegex(), " ").length;
};
var __assign$i = globalThis && globalThis.__assign || function() {
  __assign$i = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$i.apply(this, arguments);
};
var ContextType = function(flag, props) {
  return __assign$i({
    flag
  }, props);
};
var bracketContext = ContextType("[]");
var bracketArrayContext = ContextType("[\\d]");
var bracketDContext = ContextType("[[]]");
var parenContext = ContextType("()");
var braceContext = ContextType("{}");
var destructorContext = ContextType("{x}");
var __assign$h = globalThis && globalThis.__assign || function() {
  __assign$h = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$h.apply(this, arguments);
};
var TokenType = function(flag, props) {
  return __assign$h({
    flag
  }, props);
};
var nameTok = TokenType("name", {
  expectNext: function(next) {
    if (this.includesContext(destructorContext)) {
      return next === nameTok || next === commaTok || next === bracketRTok || next === braceRTok || next === colonTok;
    }
    return next === dotTok || next === commaTok || next === eofTok || next === bracketRTok || next === parenRTok || next === colonTok || next === expandTok || next === bracketLTok;
  }
});
var starTok = TokenType("*", {
  expectNext: function(next) {
    return next === dotTok || next === parenLTok || next === bracketLTok || next === eofTok || next === commaTok || next === parenRTok;
  }
});
var dbStarTok = TokenType("**", {
  expectNext: function(next) {
    return next === dotTok || next === parenLTok || next === bracketLTok || next === eofTok || next === commaTok || next === parenRTok;
  }
});
var dotTok = TokenType(".", {
  expectNext: function(next) {
    return next === dotTok || next === nameTok || next === bracketDLTok || next === starTok || next === dbStarTok || next === bracketLTok || next === braceLTok || next === eofTok;
  },
  expectPrev: function(prev) {
    return prev === dotTok || prev === nameTok || prev === bracketDRTok || prev === starTok || prev === parenRTok || prev === bracketRTok || prev === expandTok || prev === braceRTok;
  }
});
var bangTok = TokenType("!", {
  expectNext: function(next) {
    return next === nameTok || next === bracketDLTok;
  }
});
var colonTok = TokenType(":", {
  expectNext: function(next) {
    if (this.includesContext(destructorContext)) {
      return next === nameTok || next === braceLTok || next === bracketLTok;
    }
    return next === nameTok || next === bracketDLTok || next === bracketRTok;
  }
});
var braceLTok = TokenType("{", {
  expectNext: function(next) {
    return next === nameTok;
  },
  expectPrev: function(prev) {
    if (this.includesContext(destructorContext)) {
      return prev === colonTok || prev === commaTok || prev === bracketLTok;
    }
    return prev === dotTok || prev === colonTok || prev === parenLTok;
  },
  updateContext: function() {
    this.state.context.push(braceContext);
  }
});
var braceRTok = TokenType("}", {
  expectNext: function(next) {
    if (this.includesContext(destructorContext)) {
      return next === commaTok || next === braceRTok || next === eofTok || next === bracketRTok;
    }
    return next === dotTok || next === eofTok || next === commaTok;
  },
  expectPrev: function(prev) {
    return prev === nameTok || prev === braceRTok || prev === bracketRTok;
  },
  updateContext: function() {
    this.state.context.pop(braceContext);
  }
});
var bracketLTok = TokenType("[", {
  expectNext: function(next) {
    if (this.includesContext(destructorContext)) {
      return next === nameTok || next === bracketLTok || next === braceLTok || next === bracketRTok;
    }
    return next === nameTok || next === bracketDLTok || next === colonTok || next === bracketLTok || next === ignoreTok || next === bracketRTok;
  },
  expectPrev: function(prev) {
    if (this.includesContext(destructorContext)) {
      return prev === colonTok || prev === commaTok || prev === bracketLTok;
    }
    return prev === starTok || prev === bracketLTok || prev === dotTok || prev === nameTok || prev === parenLTok || prev == commaTok;
  },
  updateContext: function() {
    this.state.context.push(bracketContext);
  }
});
var bracketRTok = TokenType("]", {
  expectNext: function(next) {
    if (this.includesContext(destructorContext)) {
      return next === commaTok || next === braceRTok || next === bracketRTok || next === eofTok;
    }
    return next === dotTok || next === eofTok || next === commaTok || next === parenRTok || next === bracketRTok;
  },
  updateContext: function() {
    if (this.includesContext(bracketArrayContext))
      return;
    if (!this.includesContext(bracketContext))
      throw this.unexpect();
    this.state.context.pop();
  }
});
var bracketDLTok = TokenType("[[", {
  updateContext: function() {
    this.state.context.push(bracketDContext);
  }
});
var bracketDRTok = TokenType("]]", {
  updateContext: function() {
    if (this.curContext() !== bracketDContext)
      throw this.unexpect();
    this.state.context.pop();
  }
});
var parenLTok = TokenType("(", {
  expectNext: function(next) {
    return next === nameTok || next === bracketDLTok || next === braceLTok || next === bangTok || next === bracketLTok;
  },
  expectPrev: function(prev) {
    return prev === starTok;
  },
  updateContext: function() {
    this.state.context.push(parenContext);
  }
});
var parenRTok = TokenType(")", {
  expectNext: function(next) {
    return next === dotTok || next === eofTok || next === commaTok || next === parenRTok;
  },
  updateContext: function() {
    if (this.curContext() !== parenContext)
      throw this.unexpect();
    this.state.context.pop();
  }
});
var commaTok = TokenType(",", {
  expectNext: function(next) {
    return next === nameTok || next === bracketDLTok || next === bracketLTok || next === braceLTok;
  }
});
var ignoreTok = TokenType("ignore", {
  expectNext: function(next) {
    return next === bracketDRTok;
  },
  expectPrev: function(prev) {
    return prev == bracketDLTok;
  }
});
var expandTok = TokenType("expandTok", {
  expectNext: function(next) {
    return next === dotTok || next === eofTok || next === commaTok || next === parenRTok;
  }
});
var eofTok = TokenType("eof");
var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var fullCharCodeAtPos = function(input, pos) {
  if (String.fromCharCode)
    return input.codePointAt(pos);
  var code = input.charCodeAt(pos);
  if (code <= 55295 || code >= 57344)
    return code;
  var next = input.charCodeAt(pos + 1);
  return (code << 10) + next - 56613888;
};
var isRewordCode = function(code) {
  return code === 42 || code === 46 || code === 33 || code === 91 || code === 93 || code === 40 || code === 41 || code === 44 || code === 58 || code === 126 || code === 123 || code === 125;
};
var getError = function(message, props) {
  var err = new Error(message);
  Object.assign(err, props);
  return err;
};
var slice = function(string, start, end) {
  var str = "";
  for (var i = start; i < end; i++) {
    var ch = string.charAt(i);
    if (ch !== "\\") {
      str += ch;
    }
  }
  return str;
};
var Tokenizer = function() {
  function Tokenizer2(input) {
    this.input = input;
    this.state = {
      context: [],
      type: null,
      pos: 0
    };
    this.type_ = null;
  }
  Tokenizer2.prototype.curContext = function() {
    return this.state.context[this.state.context.length - 1];
  };
  Tokenizer2.prototype.includesContext = function(context) {
    for (var len = this.state.context.length - 1; len >= 0; len--) {
      if (this.state.context[len] === context) {
        return true;
      }
    }
    return false;
  };
  Tokenizer2.prototype.unexpect = function(type) {
    type = type || this.state.type;
    return getError('Unexpect token "' + type.flag + '" in ' + this.state.pos + " char.", {
      pos: this.state.pos
    });
  };
  Tokenizer2.prototype.expectNext = function(type, next) {
    if (type && type.expectNext) {
      if (next && !type.expectNext.call(this, next)) {
        throw getError('Unexpect token "' + next.flag + '" token should not be behind "' + type.flag + '" token.(' + this.state.pos + "th char)", {
          pos: this.state.pos
        });
      }
    }
  };
  Tokenizer2.prototype.expectPrev = function(type, prev) {
    if (type && type.expectPrev) {
      if (prev && !type.expectPrev.call(this, prev)) {
        throw getError('Unexpect token "' + type.flag + '" should not be behind "' + prev.flag + '"(' + this.state.pos + "th char).", {
          pos: this.state.pos
        });
      }
    }
  };
  Tokenizer2.prototype.match = function(type) {
    return this.state.type === type;
  };
  Tokenizer2.prototype.skipSpace = function() {
    if (this.curContext() === bracketDContext)
      return;
    loop:
      while (this.state.pos < this.input.length) {
        var ch = this.input.charCodeAt(this.state.pos);
        switch (ch) {
          case 32:
          case 160:
            ++this.state.pos;
            break;
          case 13:
            if (this.input.charCodeAt(this.state.pos + 1) === 10) {
              ++this.state.pos;
            }
          case 10:
          case 8232:
          case 8233:
            ++this.state.pos;
            break;
          default:
            if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
              ++this.state.pos;
            } else {
              break loop;
            }
        }
      }
  };
  Tokenizer2.prototype.next = function() {
    this.type_ = this.state.type;
    if (this.input.length <= this.state.pos) {
      return this.finishToken(eofTok);
    }
    this.skipSpace();
    this.readToken(this.getCode(), this.state.pos > 0 ? this.getCode(this.state.pos - 1) : -Infinity);
  };
  Tokenizer2.prototype.getCode = function(pos) {
    if (pos === void 0) {
      pos = this.state.pos;
    }
    return fullCharCodeAtPos(this.input, pos);
  };
  Tokenizer2.prototype.eat = function(type) {
    if (this.match(type)) {
      this.next();
      return true;
    } else {
      return false;
    }
  };
  Tokenizer2.prototype.readKeyWord = function() {
    var startPos = this.state.pos, string = "";
    while (true) {
      var code = this.getCode();
      var prevCode = this.getCode(this.state.pos - 1);
      if (this.input.length === this.state.pos) {
        string = slice(this.input, startPos, this.state.pos + 1);
        break;
      }
      if (!isRewordCode(code) || prevCode === 92) {
        if (code === 32 || code === 160 || code === 10 || code === 8232 || code === 8233) {
          string = slice(this.input, startPos, this.state.pos);
          break;
        }
        if (code === 13 && this.input.charCodeAt(this.state.pos + 1) === 10) {
          string = slice(this.input, startPos, this.state.pos);
          break;
        }
        if (code > 8 && code < 14 || code >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(code))) {
          string = slice(this.input, startPos, this.state.pos);
          break;
        }
        this.state.pos++;
      } else {
        string = slice(this.input, startPos, this.state.pos);
        break;
      }
    }
    this.finishToken(nameTok, string);
  };
  Tokenizer2.prototype.readIngoreString = function() {
    var startPos = this.state.pos, prevCode, string = "";
    while (true) {
      var code = this.getCode();
      if (this.state.pos >= this.input.length)
        break;
      if ((code === 91 || code === 93) && prevCode === 92) {
        this.state.pos++;
        prevCode = "";
      } else if (code == 93 && prevCode === 93) {
        string = this.input.slice(startPos, this.state.pos - 1).replace(/\\([\[\]])/g, "$1");
        this.state.pos++;
        break;
      } else {
        this.state.pos++;
        prevCode = code;
      }
    }
    this.finishToken(ignoreTok, string);
    this.finishToken(bracketDRTok);
  };
  Tokenizer2.prototype.finishToken = function(type, value) {
    var preType = this.state.type;
    this.state.type = type;
    if (value !== void 0)
      this.state.value = value;
    this.expectNext(preType, type);
    this.expectPrev(type, preType);
    if (type.updateContext) {
      type.updateContext.call(this, preType);
    }
  };
  Tokenizer2.prototype.readToken = function(code, prevCode) {
    if (prevCode === 92) {
      return this.readKeyWord();
    }
    if (this.input.length <= this.state.pos) {
      this.finishToken(eofTok);
    } else if (this.curContext() === bracketDContext) {
      this.readIngoreString();
    } else if (code === 123) {
      this.state.pos++;
      this.finishToken(braceLTok);
    } else if (code === 125) {
      this.state.pos++;
      this.finishToken(braceRTok);
    } else if (code === 42) {
      this.state.pos++;
      if (this.getCode() === 42) {
        this.state.pos++;
        return this.finishToken(dbStarTok);
      }
      this.finishToken(starTok);
    } else if (code === 33) {
      this.state.pos++;
      this.finishToken(bangTok);
    } else if (code === 46) {
      this.state.pos++;
      this.finishToken(dotTok);
    } else if (code === 91) {
      this.state.pos++;
      if (this.getCode() === 91) {
        this.state.pos++;
        return this.finishToken(bracketDLTok);
      }
      this.finishToken(bracketLTok);
    } else if (code === 126) {
      this.state.pos++;
      this.finishToken(expandTok);
    } else if (code === 93) {
      this.state.pos++;
      this.finishToken(bracketRTok);
    } else if (code === 40) {
      this.state.pos++;
      this.finishToken(parenLTok);
    } else if (code === 41) {
      this.state.pos++;
      this.finishToken(parenRTok);
    } else if (code === 44) {
      this.state.pos++;
      this.finishToken(commaTok);
    } else if (code === 58) {
      this.state.pos++;
      this.finishToken(colonTok);
    } else {
      this.readKeyWord();
    }
  };
  return Tokenizer2;
}();
var isType$1 = function(type) {
  return function(obj) {
    return obj && obj.type === type;
  };
};
var isIdentifier = isType$1("Identifier");
var isIgnoreExpression = isType$1("IgnoreExpression");
var isDotOperator = isType$1("DotOperator");
var isWildcardOperator = isType$1("WildcardOperator");
var isExpandOperator = isType$1("ExpandOperator");
var isGroupExpression = isType$1("GroupExpression");
var isRangeExpression = isType$1("RangeExpression");
var isDestructorExpression = isType$1("DestructorExpression");
var isObjectPattern = isType$1("ObjectPattern");
var isArrayPattern = isType$1("ArrayPattern");
var toString = Object.prototype.toString;
var isType = function(type) {
  return function(obj) {
    return toString.call(obj) === "[object " + type + "]";
  };
};
var isFn$1 = isType("Function");
var isArr$1 = Array.isArray || isType("Array");
var isStr = isType("String");
var isNum = isType("Number");
var isObj = function(val) {
  return typeof val === "object";
};
var isRegExp = isType("RegExp");
var isNumberLike = function(t2) {
  return isNum(t2) || /^(\d+)(\.\d+)?$/.test(t2);
};
var isArray = isArr$1;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var toArr = function(val) {
  return Array.isArray(val) ? val : val !== void 0 ? [val] : [];
};
var isEqual = function(a, b2) {
  if (a === b2) {
    return true;
  }
  if (a && b2 && typeof a === "object" && typeof b2 === "object") {
    var arrA = isArray(a);
    var arrB = isArray(b2);
    var i = void 0;
    var length_1;
    var key = void 0;
    if (arrA && arrB) {
      length_1 = a.length;
      if (length_1 !== b2.length) {
        return false;
      }
      for (i = length_1; i-- !== 0; ) {
        if (!isEqual(a[i], b2[i])) {
          return false;
        }
      }
      return true;
    }
    if (arrA !== arrB) {
      return false;
    }
    var keys = keyList(a);
    length_1 = keys.length;
    if (length_1 !== keyList(b2).length) {
      return false;
    }
    for (i = length_1; i-- !== 0; ) {
      if (!hasProp.call(b2, keys[i])) {
        return false;
      }
    }
    for (i = length_1; i-- !== 0; ) {
      key = keys[i];
      if (!isEqual(a[key], b2[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b2 !== b2;
};
var isSegmentEqual = function(a, b2) {
  a = typeof a === "symbol" ? a : "" + a;
  b2 = typeof b2 === "symbol" ? b2 : "" + b2;
  return a === b2;
};
var DestructorCache = new Map();
var isValid$3 = function(val) {
  return val !== void 0 && val !== null;
};
var getDestructor = function(source) {
  return DestructorCache.get(source);
};
var setDestructor = function(source, rules) {
  DestructorCache.set(source, rules);
};
var parseDestructorRules = function(node) {
  var rules = [];
  if (isObjectPattern(node)) {
    var index_1 = 0;
    node.properties.forEach(function(child) {
      rules[index_1] = {
        path: []
      };
      rules[index_1].key = child.key.value;
      rules[index_1].path.push(child.key.value);
      if (isIdentifier(child.value)) {
        rules[index_1].key = child.value.value;
      }
      var basePath = rules[index_1].path;
      var childRules = parseDestructorRules(child.value);
      var k2 = index_1;
      childRules.forEach(function(rule) {
        if (rules[k2]) {
          rules[k2].key = rule.key;
          rules[k2].path = basePath.concat(rule.path);
        } else {
          rules[k2] = {
            key: rule.key,
            path: basePath.concat(rule.path)
          };
        }
        k2++;
      });
      if (k2 > index_1) {
        index_1 = k2;
      } else {
        index_1++;
      }
    });
    return rules;
  } else if (isArrayPattern(node)) {
    var index_2 = 0;
    node.elements.forEach(function(child, key) {
      rules[index_2] = {
        path: []
      };
      rules[index_2].key = key;
      rules[index_2].path.push(key);
      if (isIdentifier(child)) {
        rules[index_2].key = child.value;
      }
      var basePath = rules[index_2].path;
      var childRules = parseDestructorRules(child);
      var k2 = index_2;
      childRules.forEach(function(rule) {
        if (rules[k2]) {
          rules[k2].key = rule.key;
          rules[k2].path = basePath.concat(rule.path);
        } else {
          rules[k2] = {
            key: rule.key,
            path: basePath.concat(rule.path)
          };
        }
        k2++;
      });
      if (k2 > index_2) {
        index_2 = k2;
      } else {
        index_2++;
      }
    });
    return rules;
  }
  if (isDestructorExpression(node)) {
    return parseDestructorRules(node.value);
  }
  return rules;
};
var setInByDestructor = function(source, rules, value, mutators) {
  rules.forEach(function(_a2) {
    var key = _a2.key, path = _a2.path;
    mutators.setIn([key], source, mutators.getIn(path, value));
  });
};
var getInByDestructor = function(source, rules, mutators) {
  var response = {};
  if (rules.length) {
    if (isNum(rules[0].path[0])) {
      response = [];
    }
  }
  source = isValid$3(source) ? source : {};
  rules.forEach(function(_a2) {
    var key = _a2.key, path = _a2.path;
    mutators.setIn(path, response, source[key]);
  });
  return response;
};
var deleteInByDestructor = function(source, rules, mutators) {
  rules.forEach(function(_a2) {
    var key = _a2.key;
    mutators.deleteIn([key], source);
  });
};
var existInByDestructor = function(source, rules, start, mutators) {
  return rules.every(function(_a2) {
    var key = _a2.key;
    return mutators.existIn([key], source, start);
  });
};
var __extends$5 = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var createTreeBySegments = function(segments, afterNode) {
  if (segments === void 0) {
    segments = [];
  }
  var segLen = segments.length;
  var build = function(start) {
    if (start === void 0) {
      start = 0;
    }
    var after = start < segLen - 1 ? build(start + 1) : afterNode;
    var dot = after && {
      type: "DotOperator",
      after
    };
    return {
      type: "Identifier",
      value: segments[start],
      after: dot
    };
  };
  return build();
};
var calculate = function(a, b2, operator) {
  if (isNumberLike(a) && isNumberLike(b2)) {
    if (operator === "+")
      return String(Number(a) + Number(b2));
    if (operator === "-")
      return String(Number(a) - Number(b2));
    if (operator === "*")
      return String(Number(a) * Number(b2));
    if (operator === "/")
      return String(Number(a) / Number(b2));
  } else {
    if (operator === "+")
      return String(a) + String(b2);
    if (operator === "-")
      return "NaN";
    if (operator === "*")
      return "NaN";
    if (operator === "/")
      return "NaN";
  }
  return String(Number(b2));
};
var Parser = function(_super) {
  __extends$5(Parser2, _super);
  function Parser2(input, base) {
    var _this = _super.call(this, input) || this;
    _this.base = base;
    return _this;
  }
  Parser2.prototype.parse = function() {
    var node;
    this.data = {
      segments: []
    };
    if (!this.eat(eofTok)) {
      this.next();
      node = this.parseAtom(this.state.type);
    }
    this.data.tree = node;
    return node;
  };
  Parser2.prototype.append = function(parent, node) {
    if (parent && node) {
      parent.after = node;
    }
  };
  Parser2.prototype.parseAtom = function(type) {
    switch (type) {
      case braceLTok:
      case bracketLTok:
        if (this.includesContext(destructorContext)) {
          if (type === braceLTok) {
            return this.parseObjectPattern();
          } else {
            return this.parseArrayPattern();
          }
        }
        return this.parseDestructorExpression();
      case nameTok:
        return this.parseIdentifier();
      case expandTok:
        return this.parseExpandOperator();
      case dbStarTok:
      case starTok:
        return this.parseWildcardOperator();
      case bracketDLTok:
        return this.parseIgnoreExpression();
      case dotTok:
        return this.parseDotOperator();
    }
  };
  Parser2.prototype.pushSegments = function(key) {
    this.data.segments.push(key);
  };
  Parser2.prototype.parseIdentifier = function() {
    var node = {
      type: "Identifier",
      value: this.state.value
    };
    var hasNotInDestructor = !this.includesContext(destructorContext) && !this.isMatchPattern && !this.isWildMatchPattern;
    this.next();
    if (this.includesContext(bracketArrayContext)) {
      if (this.state.type !== bracketRTok) {
        throw this.unexpect();
      } else {
        this.state.context.pop();
        this.next();
      }
    } else if (hasNotInDestructor) {
      this.pushSegments(node.value);
    }
    if (this.state.type === bracketLTok) {
      this.next();
      if (this.state.type !== nameTok) {
        throw this.unexpect();
      }
      this.state.context.push(bracketArrayContext);
      var isNumberKey = false;
      if (/^\d+$/.test(this.state.value)) {
        isNumberKey = true;
      }
      var value = this.state.value;
      this.pushSegments(isNumberKey ? Number(value) : value);
      var after = this.parseAtom(this.state.type);
      if (isNumberKey) {
        after.arrayIndex = true;
      }
      this.append(node, after);
    } else {
      this.append(node, this.parseAtom(this.state.type));
    }
    return node;
  };
  Parser2.prototype.parseExpandOperator = function() {
    var node = {
      type: "ExpandOperator"
    };
    this.isMatchPattern = true;
    this.isWildMatchPattern = true;
    this.data.segments = [];
    this.next();
    this.append(node, this.parseAtom(this.state.type));
    return node;
  };
  Parser2.prototype.parseWildcardOperator = function() {
    var node = {
      type: "WildcardOperator"
    };
    if (this.state.type === dbStarTok) {
      node.optional = true;
    }
    this.isMatchPattern = true;
    this.isWildMatchPattern = true;
    this.data.segments = [];
    this.next();
    if (this.state.type === parenLTok) {
      node.filter = this.parseGroupExpression(node);
    } else if (this.state.type === bracketLTok) {
      node.filter = this.parseRangeExpression(node);
    }
    this.append(node, this.parseAtom(this.state.type));
    return node;
  };
  Parser2.prototype.parseDestructorExpression = function() {
    var _this = this;
    var node = {
      type: "DestructorExpression"
    };
    this.state.context.push(destructorContext);
    var startPos = this.state.pos - 1;
    node.value = this.state.type === braceLTok ? this.parseObjectPattern() : this.parseArrayPattern();
    var endPos = this.state.pos;
    this.state.context.pop();
    node.source = this.input.substring(startPos, endPos).replace(/\[\s*([\+\-\*\/])?\s*([^,\]\s]*)\s*\]/, function(match, operator, target) {
      if (_this.relative !== void 0) {
        if (operator) {
          if (target) {
            return calculate(_this.relative, target, operator);
          } else {
            return calculate(_this.relative, 1, operator);
          }
        } else {
          if (target) {
            return calculate(_this.relative, target, "+");
          } else {
            return String(_this.relative);
          }
        }
      }
      return match;
    }).replace(/\s*\.\s*/g, "").replace(/\s*/g, "");
    if (this.relative === void 0) {
      setDestructor(node.source, parseDestructorRules(node));
    }
    this.relative = void 0;
    this.pushSegments(node.source);
    this.next();
    this.append(node, this.parseAtom(this.state.type));
    return node;
  };
  Parser2.prototype.parseArrayPattern = function() {
    var node = {
      type: "ArrayPattern",
      elements: []
    };
    this.next();
    node.elements = this.parseArrayPatternElements();
    return node;
  };
  Parser2.prototype.parseArrayPatternElements = function() {
    var nodes = [];
    while (this.state.type !== bracketRTok && this.state.type !== eofTok) {
      nodes.push(this.parseAtom(this.state.type));
      if (this.state.type === bracketRTok) {
        if (this.includesContext(destructorContext)) {
          this.next();
        }
        return nodes;
      }
      this.next();
    }
    return nodes;
  };
  Parser2.prototype.parseObjectPattern = function() {
    var node = {
      type: "ObjectPattern",
      properties: []
    };
    this.next();
    node.properties = this.parseObjectProperties();
    return node;
  };
  Parser2.prototype.parseObjectProperties = function() {
    var nodes = [];
    while (this.state.type !== braceRTok && this.state.type !== eofTok) {
      var node = {
        type: "ObjectPatternProperty",
        key: this.parseAtom(this.state.type)
      };
      nodes.push(node);
      if (this.state.type === colonTok) {
        this.next();
        node.value = this.parseAtom(this.state.type);
      }
      if (this.state.type === braceRTok) {
        if (this.includesContext(destructorContext)) {
          this.next();
        }
        return nodes;
      }
      this.next();
    }
    return nodes;
  };
  Parser2.prototype.parseDotOperator = function() {
    var node = {
      type: "DotOperator"
    };
    var prevToken = this.type_;
    if (!prevToken && this.base) {
      if (this.base.isMatchPattern) {
        throw new Error("Base path must be an absolute path.");
      }
      this.data.segments = this.base.toArr();
      while (this.state.type === dotTok) {
        this.relative = this.data.segments.pop();
        this.next();
      }
      return createTreeBySegments(this.data.segments.slice(), this.parseAtom(this.state.type));
    } else {
      this.next();
    }
    this.append(node, this.parseAtom(this.state.type));
    return node;
  };
  Parser2.prototype.parseIgnoreExpression = function() {
    this.next();
    var value = String(this.state.value).replace(/\s*/g, "");
    var node = {
      type: "IgnoreExpression",
      value
    };
    this.pushSegments(value);
    this.next();
    this.append(node, this.parseAtom(this.state.type));
    this.next();
    return node;
  };
  Parser2.prototype.parseGroupExpression = function(parent) {
    var node = {
      type: "GroupExpression",
      value: []
    };
    this.isMatchPattern = true;
    this.data.segments = [];
    this.next();
    loop:
      while (true) {
        switch (this.state.type) {
          case commaTok:
            this.next();
            break;
          case bangTok:
            node.isExclude = true;
            this.haveExcludePattern = true;
            this.next();
            break;
          case eofTok:
            break loop;
          case parenRTok:
            break loop;
          default:
            node.value.push(this.parseAtom(this.state.type));
        }
      }
    this.next();
    this.append(parent, this.parseAtom(this.state.type));
    return node;
  };
  Parser2.prototype.parseRangeExpression = function(parent) {
    var node = {
      type: "RangeExpression"
    };
    this.next();
    this.isMatchPattern = true;
    this.data.segments = [];
    var start = false, hasColon = false;
    loop:
      while (true) {
        switch (this.state.type) {
          case colonTok:
            hasColon = true;
            start = true;
            this.next();
            break;
          case bracketRTok:
            if (!hasColon && !node.end) {
              node.end = node.start;
            }
            break loop;
          case commaTok:
            throw this.unexpect();
          case eofTok:
            break loop;
          default:
            if (!start) {
              node.start = this.parseAtom(this.state.type);
            } else {
              node.end = this.parseAtom(this.state.type);
            }
        }
      }
    this.next();
    this.append(parent, this.parseAtom(this.state.type));
    return node;
  };
  return Parser2;
}(Tokenizer);
var isValid$2 = function(val) {
  return val !== void 0 && val !== null && val !== "";
};
var Matcher = function() {
  function Matcher2(tree, record) {
    var _this = this;
    this.matchNext = function(node, path) {
      return node.after ? _this.matchAtom(path, node.after) : isValid$2(path[_this.pos]);
    };
    this.tree = tree;
    this.pos = 0;
    this.excluding = false;
    this.record = record;
    this.stack = [];
  }
  Matcher2.prototype.currentElement = function(path) {
    return String(path[this.pos] || "").replace(/\s*/g, "");
  };
  Matcher2.prototype.recordMatch = function(match) {
    var _this = this;
    return function() {
      var result = match();
      if (result) {
        if (_this.record && _this.record.score !== void 0) {
          _this.record.score++;
        }
      }
      return result;
    };
  };
  Matcher2.prototype.matchIdentifier = function(path, node) {
    var _this = this;
    this.tail = node;
    if (isValid$2(path[this.pos + 1]) && !node.after) {
      if (this.stack.length) {
        for (var i = this.stack.length - 1; i >= 0; i--) {
          if (!this.stack[i].after || !this.stack[i].filter) {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    var current;
    var next = function() {
      return _this.matchNext(node, path);
    };
    if (isExpandOperator(node.after)) {
      current = this.recordMatch(function() {
        return node.value === String(path[_this.pos]).substring(0, node.value.length);
      });
    } else {
      current = this.recordMatch(function() {
        return isEqual(String(node.value), String(path[_this.pos]));
      });
    }
    if (this.excluding) {
      if (node.after) {
        if (this.pos < path.length) {
          return current() && next();
        } else {
          if (node.after && isWildcardOperator(node.after.after)) {
            return true;
          }
          return false;
        }
      } else {
        if (this.pos >= path.length) {
          return true;
        }
        return current();
      }
    }
    return current() && next();
  };
  Matcher2.prototype.matchIgnoreExpression = function(path, node) {
    return isEqual(node.value, this.currentElement(path)) && this.matchNext(node, path);
  };
  Matcher2.prototype.matchDestructorExpression = function(path, node) {
    return isEqual(node.source, this.currentElement(path)) && this.matchNext(node, path);
  };
  Matcher2.prototype.matchExpandOperator = function(path, node) {
    return this.matchAtom(path, node.after);
  };
  Matcher2.prototype.matchWildcardOperator = function(path, node) {
    this.tail = node;
    this.stack.push(node);
    var matched = false;
    if (node.filter) {
      if (node.after) {
        matched = this.matchAtom(path, node.filter) && this.matchAtom(path, node.after);
      } else {
        matched = this.matchAtom(path, node.filter);
      }
    } else if (node.optional) {
      matched = true;
    } else {
      matched = this.matchNext(node, path);
    }
    this.stack.pop();
    return matched;
  };
  Matcher2.prototype.matchGroupExpression = function(path, node) {
    var _this = this;
    var current = this.pos;
    this.excluding = !!node.isExclude;
    var method = this.excluding ? "every" : "some";
    var result = toArr(node.value)[method](function(_node) {
      _this.pos = current;
      return _this.excluding ? !_this.matchAtom(path, _node) : _this.matchAtom(path, _node);
    });
    this.excluding = false;
    return result;
  };
  Matcher2.prototype.matchRangeExpression = function(path, node) {
    if (node.start) {
      if (node.end) {
        return path[this.pos] >= parseInt(node.start.value) && path[this.pos] <= parseInt(node.end.value);
      } else {
        return path[this.pos] >= parseInt(node.start.value);
      }
    } else {
      if (node.end) {
        return path[this.pos] <= parseInt(node.end.value);
      } else {
        return true;
      }
    }
  };
  Matcher2.prototype.matchDotOperator = function(path, node) {
    this.pos++;
    return this.matchNext(node, path);
  };
  Matcher2.prototype.matchAtom = function(path, node) {
    if (!node) {
      if (this.stack.length > 0)
        return true;
      if (isValid$2(path[this.pos + 1]))
        return false;
      if (this.pos == path.length - 1)
        return true;
    }
    if (isIdentifier(node)) {
      return this.matchIdentifier(path, node);
    } else if (isIgnoreExpression(node)) {
      return this.matchIgnoreExpression(path, node);
    } else if (isDestructorExpression(node)) {
      return this.matchDestructorExpression(path, node);
    } else if (isExpandOperator(node)) {
      return this.matchExpandOperator(path, node);
    } else if (isWildcardOperator(node)) {
      return this.matchWildcardOperator(path, node);
    } else if (isGroupExpression(node)) {
      return this.matchGroupExpression(path, node);
    } else if (isRangeExpression(node)) {
      return this.matchRangeExpression(path, node);
    } else if (isDotOperator(node)) {
      return this.matchDotOperator(path, node);
    }
    return true;
  };
  Matcher2.prototype.match = function(path) {
    var matched = this.matchAtom(path, this.tree);
    if (!this.tail)
      return {
        matched: false
      };
    if (this.tail == this.tree && isWildcardOperator(this.tail)) {
      return {
        matched: true
      };
    }
    return {
      matched,
      record: this.record
    };
  };
  Matcher2.matchSegments = function(source, target, record) {
    var pos = 0;
    if (source.length !== target.length)
      return false;
    var match = function(pos2) {
      var current = function() {
        var res = isSegmentEqual(source[pos2], target[pos2]);
        if (record && record.score !== void 0) {
          record.score++;
        }
        return res;
      };
      var next = function() {
        return pos2 < source.length - 1 ? match(pos2 + 1) : true;
      };
      return current() && next();
    };
    return {
      matched: match(pos),
      record
    };
  };
  return Matcher2;
}();
var __read$8 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __spreadArray$5 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var pathCache = new Map();
var isMatcher = Symbol("PATH_MATCHER");
var isValid$1 = function(val) {
  return val !== void 0 && val !== null;
};
var isAssignable = function(val) {
  return typeof val === "object" || typeof val === "function";
};
var isNumberIndex = function(val) {
  return isStr(val) ? /^\d+$/.test(val) : isNum(val);
};
var getIn$1 = function(segments, source) {
  for (var i = 0; i < segments.length; i++) {
    var index = segments[i];
    var rules = getDestructor(index);
    if (!rules) {
      if (!isValid$1(source)) {
        if (i !== segments.length - 1) {
          return source;
        }
        break;
      }
      source = source[index];
    } else {
      source = getInByDestructor(source, rules, {
        setIn,
        getIn: getIn$1
      });
      break;
    }
  }
  return source;
};
var setIn = function(segments, source, value) {
  for (var i = 0; i < segments.length; i++) {
    var index = segments[i];
    var rules = getDestructor(index);
    if (!rules) {
      if (!isValid$1(source) || !isAssignable(source))
        return;
      if (isArr$1(source) && !isNumberIndex(index)) {
        return;
      }
      if (!isValid$1(source[index])) {
        if (value === void 0) {
          return;
        }
        if (i < segments.length - 1) {
          source[index] = isNum(segments[i + 1]) ? [] : {};
        }
      }
      if (i === segments.length - 1) {
        source[index] = value;
      }
      source = source[index];
    } else {
      setInByDestructor(source, rules, value, {
        setIn,
        getIn: getIn$1
      });
      break;
    }
  }
};
var deleteIn = function(segments, source) {
  for (var i = 0; i < segments.length; i++) {
    var index = segments[i];
    var rules = getDestructor(index);
    if (!rules) {
      if (i === segments.length - 1 && isValid$1(source)) {
        delete source[index];
        return;
      }
      if (!isValid$1(source) || !isAssignable(source))
        return;
      source = source[index];
      if (!isObj(source)) {
        return;
      }
    } else {
      deleteInByDestructor(source, rules, {
        setIn,
        getIn: getIn$1,
        deleteIn
      });
      break;
    }
  }
};
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var existIn = function(segments, source, start) {
  if (start instanceof Path) {
    start = start.length;
  }
  for (var i = start; i < segments.length; i++) {
    var index = segments[i];
    var rules = getDestructor(index);
    if (!rules) {
      if (i === segments.length - 1) {
        return hasOwnProperty$3.call(source, index);
      }
      if (!isValid$1(source) || !isAssignable(source))
        return false;
      source = source[index];
      if (!isObj(source)) {
        return false;
      }
    } else {
      return existInByDestructor(source, rules, start, {
        setIn,
        getIn: getIn$1,
        deleteIn,
        existIn
      });
    }
  }
};
var parse = function(pattern, base) {
  if (pattern instanceof Path) {
    return {
      entire: pattern.entire,
      segments: pattern.segments.slice(),
      isRegExp: false,
      isWildMatchPattern: pattern.isWildMatchPattern,
      isMatchPattern: pattern.isMatchPattern,
      haveExcludePattern: pattern.haveExcludePattern,
      tree: pattern.tree
    };
  } else if (isStr(pattern)) {
    if (!pattern)
      return {
        entire: "",
        segments: [],
        isRegExp: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false
      };
    var parser = new Parser(pattern, Path.parse(base));
    var tree = parser.parse();
    if (!parser.isMatchPattern) {
      var segments = parser.data.segments;
      return {
        entire: segments.join("."),
        segments,
        tree,
        isRegExp: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false
      };
    } else {
      return {
        entire: pattern,
        segments: [],
        isRegExp: false,
        isWildMatchPattern: parser.isWildMatchPattern,
        haveExcludePattern: parser.haveExcludePattern,
        isMatchPattern: true,
        tree
      };
    }
  } else if (isFn$1(pattern) && pattern[isMatcher]) {
    return parse(pattern["path"]);
  } else if (isArr$1(pattern)) {
    return {
      entire: pattern.join("."),
      segments: pattern.reduce(function(buf, key) {
        return buf.concat(parseString(key));
      }, []),
      isRegExp: false,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: false
    };
  } else if (isRegExp(pattern)) {
    return {
      entire: pattern,
      segments: [],
      isRegExp: true,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: true
    };
  } else {
    return {
      entire: "",
      isRegExp: false,
      segments: pattern !== void 0 ? [pattern] : [],
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: false
    };
  }
};
var parseString = function(source) {
  if (isStr(source)) {
    source = source.replace(/\s*/g, "");
    try {
      var _a2 = parse(source), segments = _a2.segments, isMatchPattern = _a2.isMatchPattern;
      return !isMatchPattern ? segments : source;
    } catch (e2) {
      return source;
    }
  } else if (source instanceof Path) {
    return source.segments;
  }
  return source;
};
var Path = function() {
  function Path2(input, base) {
    var _this = this;
    this.concat = function() {
      var _a3;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be concat");
      }
      var path = new Path2("");
      path.segments = (_a3 = _this.segments).concat.apply(_a3, __spreadArray$5([], __read$8(args.map(function(s) {
        return parseString(s);
      })), false));
      path.entire = path.segments.join(".");
      return path;
    };
    this.slice = function(start, end) {
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be slice");
      }
      var path = new Path2("");
      path.segments = _this.segments.slice(start, end);
      path.entire = path.segments.join(".");
      return path;
    };
    this.push = function() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      return _this.concat.apply(_this, __spreadArray$5([], __read$8(items), false));
    };
    this.pop = function() {
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be pop");
      }
      return new Path2(_this.segments.slice(0, _this.segments.length - 1));
    };
    this.splice = function(start, deleteCount) {
      var items = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        items[_i - 2] = arguments[_i];
      }
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be splice");
      }
      items = items.reduce(function(buf, item) {
        return buf.concat(parseString(item));
      }, []);
      var segments_ = _this.segments.slice();
      segments_.splice.apply(segments_, __spreadArray$5([start, deleteCount], __read$8(items), false));
      return new Path2(segments_);
    };
    this.forEach = function(callback) {
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be each");
      }
      _this.segments.forEach(callback);
    };
    this.map = function(callback) {
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be map");
      }
      return _this.segments.map(callback);
    };
    this.reduce = function(callback, initial) {
      if (_this.isMatchPattern || _this.isRegExp) {
        throw new Error(_this.entire + " cannot be reduce");
      }
      return _this.segments.reduce(callback, initial);
    };
    this.parent = function() {
      return _this.slice(0, _this.length - 1);
    };
    this.includes = function(pattern) {
      var _a3 = Path2.parse(pattern), entire2 = _a3.entire, segments2 = _a3.segments, isMatchPattern2 = _a3.isMatchPattern;
      var cache = _this.includesCache.get(entire2);
      if (cache !== void 0)
        return cache;
      var cacheWith = function(value) {
        _this.includesCache.set(entire2, value);
        return value;
      };
      if (_this.isMatchPattern) {
        if (!isMatchPattern2) {
          return cacheWith(_this.match(segments2));
        } else {
          throw new Error(_this.entire + " cannot be used to match " + entire2);
        }
      }
      if (isMatchPattern2) {
        throw new Error(_this.entire + " cannot be used to match " + entire2);
      }
      if (segments2.length > _this.segments.length)
        return cacheWith(false);
      for (var i = 0; i < segments2.length; i++) {
        if (!isEqual(String(segments2[i]), String(_this.segments[i]))) {
          return cacheWith(false);
        }
      }
      return cacheWith(true);
    };
    this.transform = function(regexp, callback) {
      if (!isFn$1(callback))
        return "";
      if (_this.isMatchPattern) {
        throw new Error(_this.entire + " cannot be transformed");
      }
      var args = _this.segments.reduce(function(buf, key) {
        return new RegExp(regexp).test(key) ? buf.concat(key) : buf;
      }, []);
      return callback.apply(void 0, __spreadArray$5([], __read$8(args), false));
    };
    this.match = function(pattern) {
      var _a3, _b;
      var path = Path2.parse(pattern);
      var cache = _this.matchCache.get(path.entire);
      if (cache !== void 0) {
        if (cache.record && cache.record.score !== void 0) {
          _this.matchScore = cache.record.score;
        }
        return cache.matched;
      }
      var cacheWith = function(value) {
        _this.matchCache.set(path.entire, value);
        return value;
      };
      if (path.isMatchPattern) {
        if (_this.isMatchPattern) {
          throw new Error(path.entire + " cannot match " + _this.entire);
        } else {
          _this.matchScore = 0;
          return cacheWith(path.match(_this.segments));
        }
      } else {
        if (_this.isMatchPattern) {
          if (_this.isRegExp) {
            try {
              return (_b = (_a3 = _this["entire"]) === null || _a3 === void 0 ? void 0 : _a3["test"]) === null || _b === void 0 ? void 0 : _b.call(_a3, path.entire);
            } finally {
              _this.entire.lastIndex = 0;
            }
          }
          var record = {
            score: 0
          };
          var result = cacheWith(new Matcher(_this.tree, record).match(path.segments));
          _this.matchScore = record.score;
          return result.matched;
        } else {
          var record = {
            score: 0
          };
          var result = cacheWith(Matcher.matchSegments(_this.segments, path.segments, record));
          _this.matchScore = record.score;
          return result.matched;
        }
      }
    };
    this.matchAliasGroup = function(name, alias) {
      var namePath = Path2.parse(name);
      var aliasPath = Path2.parse(alias);
      var nameMatched = _this.match(namePath);
      var nameMatchedScore = _this.matchScore;
      var aliasMatched = _this.match(aliasPath);
      var aliasMatchedScore = _this.matchScore;
      if (_this.haveExcludePattern) {
        if (nameMatchedScore >= aliasMatchedScore) {
          return nameMatched;
        } else {
          return aliasMatched;
        }
      } else {
        return nameMatched || aliasMatched;
      }
    };
    this.existIn = function(source, start) {
      if (start === void 0) {
        start = 0;
      }
      return existIn(_this.segments, source, start);
    };
    this.getIn = function(source) {
      return getIn$1(_this.segments, source);
    };
    this.setIn = function(source, value) {
      setIn(_this.segments, source, value);
      return source;
    };
    this.deleteIn = function(source) {
      deleteIn(_this.segments, source);
      return source;
    };
    this.ensureIn = function(source, defaults) {
      var results = _this.getIn(source);
      if (results === void 0) {
        _this.setIn(source, defaults);
        return _this.getIn(source);
      }
      return results;
    };
    var _a2 = parse(input, base), tree = _a2.tree, segments = _a2.segments, entire = _a2.entire, isRegExp2 = _a2.isRegExp, isMatchPattern = _a2.isMatchPattern, isWildMatchPattern = _a2.isWildMatchPattern, haveExcludePattern = _a2.haveExcludePattern;
    this.entire = entire;
    this.segments = segments;
    this.isMatchPattern = isMatchPattern;
    this.isWildMatchPattern = isWildMatchPattern;
    this.isRegExp = isRegExp2;
    this.haveExcludePattern = haveExcludePattern;
    this.tree = tree;
    this.matchCache = new Map();
    this.includesCache = new Map();
  }
  Path2.prototype.toString = function() {
    var _a2;
    return (_a2 = this.entire) === null || _a2 === void 0 ? void 0 : _a2.toString();
  };
  Path2.prototype.toArr = function() {
    var _a2;
    return (_a2 = this.segments) === null || _a2 === void 0 ? void 0 : _a2.slice();
  };
  Object.defineProperty(Path2.prototype, "length", {
    get: function() {
      return this.segments.length;
    },
    enumerable: false,
    configurable: true
  });
  Path2.match = function(pattern) {
    var path = Path2.parse(pattern);
    var matcher = function(target) {
      return path.match(target);
    };
    matcher[isMatcher] = true;
    matcher.path = path;
    return matcher;
  };
  Path2.isPathPattern = function(target) {
    if (isStr(target) || isArr$1(target) || isRegExp(target) || isFn$1(target) && target[isMatcher]) {
      return true;
    }
    return false;
  };
  Path2.transform = function(pattern, regexp, callback) {
    return Path2.parse(pattern).transform(regexp, callback);
  };
  Path2.parse = function(path, base) {
    if (path === void 0) {
      path = "";
    }
    if (path instanceof Path2) {
      var found = pathCache.get(path.entire);
      if (found) {
        return found;
      } else {
        pathCache.set(path.entire, path);
        return path;
      }
    } else if (path && path[isMatcher]) {
      return Path2.parse(path["path"]);
    } else {
      var key_ = base ? Path2.parse(base) : "";
      var key = path + ":" + key_;
      var found = pathCache.get(key);
      if (found) {
        return found;
      } else {
        path = new Path2(path, base);
        pathCache.set(key, path);
        return path;
      }
    }
  };
  Path2.getIn = function(source, pattern) {
    var path = Path2.parse(pattern);
    return path.getIn(source);
  };
  Path2.setIn = function(source, pattern, value) {
    var path = Path2.parse(pattern);
    return path.setIn(source, value);
  };
  Path2.deleteIn = function(source, pattern) {
    var path = Path2.parse(pattern);
    return path.deleteIn(source);
  };
  Path2.existIn = function(source, pattern, start) {
    var path = Path2.parse(pattern);
    return path.existIn(source, start);
  };
  Path2.ensureIn = function(source, pattern, defaultValue) {
    var path = Path2.parse(pattern);
    return path.ensureIn(source, defaultValue);
  };
  return Path2;
}();
var Subscribable = function() {
  function Subscribable2() {
    var _this = this;
    this.subscribers = {
      index: 0
    };
    this.subscribe = function(callback) {
      if (isFn$2(callback)) {
        var index = _this.subscribers.index + 1;
        _this.subscribers[index] = callback;
        _this.subscribers.index++;
        return index;
      }
    };
    this.unsubscribe = function(index) {
      if (_this.subscribers[index]) {
        delete _this.subscribers[index];
      } else if (!index) {
        _this.subscribers = {
          index: 0
        };
      }
    };
    this.notify = function(payload, silent) {
      if (_this.subscription) {
        if (_this.subscription && isFn$2(_this.subscription.notify)) {
          if (_this.subscription.notify.call(_this, payload) === false) {
            return;
          }
        }
      }
      if (silent)
        return;
      var filter = function(payload2) {
        if (_this.subscription && isFn$2(_this.subscription.filter)) {
          return _this.subscription.filter.call(_this, payload2);
        }
        return payload2;
      };
      each(_this.subscribers, function(callback) {
        if (isFn$2(callback))
          callback(filter(payload));
      });
    };
  }
  return Subscribable2;
}();
function defaultIsMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
}
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  if (options.clone !== false && options.isMergeableObject(value)) {
    return deepmerge(emptyTarget(value), value, options);
  }
  return value;
}
function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}
function getKeys(target) {
  if (!isValid$4(target))
    return [];
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options) {
  var destination = options.assign ? target || {} : {};
  if (!options.isMergeableObject(target))
    return target;
  if (!options.assign) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (!target[key]) {
      destination[key] = source[key];
    }
    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}
function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject;
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
var merge = deepmerge;
var IDX = 36, HEX = "";
while (IDX--)
  HEX += IDX.toString(36);
function uid(len) {
  var str = "", num = len || 11;
  while (num--)
    str += HEX[Math.random() * 36 | 0];
  return str;
}
var isMap = function(val) {
  return val && val instanceof Map;
};
var isSet = function(val) {
  return val && val instanceof Set;
};
var isWeakMap = function(val) {
  return val && val instanceof WeakMap;
};
var isWeakSet = function(val) {
  return val && val instanceof WeakSet;
};
var isFn = function(val) {
  return typeof val === "function";
};
var isArr = Array.isArray;
var isPlainObj = function(val) {
  return Object.prototype.toString.call(val) === "[object Object]";
};
var isValid = function(val) {
  return val !== null && val !== void 0;
};
var isCollectionType = function(target) {
  return isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target);
};
var isNormalType = function(target) {
  return isPlainObj(target) || isArr(target);
};
var toArray = function(value) {
  return Array.isArray(value) ? value : value !== void 0 && value !== null ? [value] : [];
};
var ArraySet = function() {
  function ArraySet2(value) {
    if (value === void 0) {
      value = [];
    }
    this.value = value;
  }
  ArraySet2.prototype.add = function(item) {
    if (!this.has(item)) {
      this.value.push(item);
    }
  };
  ArraySet2.prototype.has = function(item) {
    return this.value.indexOf(item) > -1;
  };
  ArraySet2.prototype.delete = function(item) {
    var index = this.value.indexOf(item);
    if (index > -1) {
      this.value.splice(index, 1);
    }
  };
  ArraySet2.prototype.forEach = function(callback) {
    if (this.value.length === 0)
      return;
    for (var index = 0, len = this.value.length; index < len; index++) {
      callback(this.value[index]);
    }
  };
  ArraySet2.prototype.forEachDelete = function(callback) {
    if (this.value.length === 0)
      return;
    for (var index = 0; index < this.value.length; index++) {
      var item = this.value[index];
      this.value.splice(index, 1);
      callback(item);
      index--;
    }
  };
  ArraySet2.prototype.clear = function() {
    this.value.length = 0;
  };
  return ArraySet2;
}();
var ProxyRaw = new WeakMap();
var RawProxy = new WeakMap();
var RawShallowProxy = new WeakMap();
var RawNode = new WeakMap();
var RawReactionsMap = new WeakMap();
var ReactionStack = [];
var BatchCount = {
  value: 0
};
var UntrackCount = {
  value: 0
};
var BatchScope = {
  value: false
};
var PendingReactions = new ArraySet();
var PendingScopeReactions = new ArraySet();
var BatchEndpoints = new ArraySet();
var MakeObservableSymbol = Symbol("MakeObservableSymbol");
var ObserverListeners = new ArraySet();
var ITERATION_KEY = Symbol("iteration key");
var addRawReactionsMap = function(target, key, reaction2) {
  var reactionsMap = RawReactionsMap.get(target);
  if (reactionsMap) {
    var reactions = reactionsMap.get(key);
    if (reactions) {
      reactions.add(reaction2);
    } else {
      reactionsMap.set(key, new ArraySet([reaction2]));
    }
    return reactionsMap;
  } else {
    var reactionsMap_1 = new Map([[key, new ArraySet([reaction2])]]);
    RawReactionsMap.set(target, reactionsMap_1);
    return reactionsMap_1;
  }
};
var addReactionsMapToReaction = function(reaction2, reactionsMap) {
  var bindSet = reaction2._reactionsSet;
  if (bindSet) {
    bindSet.add(reactionsMap);
  } else {
    reaction2._reactionsSet = new ArraySet([reactionsMap]);
  }
  return bindSet;
};
var getReactionsFromTargetKey = function(target, key) {
  var reactionsMap = RawReactionsMap.get(target);
  var reactions = [];
  if (reactionsMap) {
    var map = reactionsMap.get(key);
    if (map) {
      map.forEach(function(reaction2) {
        if (reactions.indexOf(reaction2) === -1) {
          reactions.push(reaction2);
        }
      });
    }
  }
  return reactions;
};
var runReactions = function(target, key) {
  var reactions = getReactionsFromTargetKey(target, key);
  var prevUntrackCount = UntrackCount.value;
  UntrackCount.value = 0;
  for (var i = 0, len = reactions.length; i < len; i++) {
    var reaction2 = reactions[i];
    if (reaction2._isComputed) {
      reaction2._scheduler(reaction2);
    } else if (isScopeBatching()) {
      PendingScopeReactions.add(reaction2);
    } else if (isBatching()) {
      PendingReactions.add(reaction2);
    } else {
      if (isFn(reaction2._scheduler)) {
        reaction2._scheduler(reaction2);
      } else {
        reaction2();
      }
    }
  }
  UntrackCount.value = prevUntrackCount;
};
var notifyObservers = function(operation) {
  ObserverListeners.forEach(function(fn) {
    return fn(operation);
  });
};
var bindTargetKeyWithCurrentReaction = function(operation) {
  var key = operation.key, type = operation.type, target = operation.target;
  if (type === "iterate") {
    key = ITERATION_KEY;
  }
  var current = ReactionStack[ReactionStack.length - 1];
  if (isUntracking())
    return;
  if (current) {
    addReactionsMapToReaction(current, addRawReactionsMap(target, key, current));
  }
};
var bindComputedReactions = function(reaction2) {
  if (isFn(reaction2)) {
    var current = ReactionStack[ReactionStack.length - 1];
    if (current) {
      var computes = current._computesSet;
      if (computes) {
        computes.add(reaction2);
      } else {
        current._computesSet = new ArraySet([reaction2]);
      }
    }
  }
};
var runReactionsFromTargetKey = function(operation) {
  var key = operation.key, type = operation.type, target = operation.target, oldTarget = operation.oldTarget;
  notifyObservers(operation);
  if (type === "clear") {
    oldTarget.forEach(function(_, key2) {
      runReactions(target, key2);
    });
  } else {
    runReactions(target, key);
  }
  if (type === "add" || type === "delete" || type === "clear") {
    var newKey = Array.isArray(target) ? "length" : ITERATION_KEY;
    runReactions(target, newKey);
  }
};
var hasRunningReaction = function() {
  return ReactionStack.length > 0;
};
var releaseBindingReactions = function(reaction2) {
  var _a2;
  (_a2 = reaction2._reactionsSet) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(reactionsMap) {
    reactionsMap.forEach(function(reactions) {
      reactions.delete(reaction2);
    });
  });
  PendingReactions.delete(reaction2);
  PendingScopeReactions.delete(reaction2);
  delete reaction2._reactionsSet;
};
var suspendComputedReactions = function(current) {
  var _a2;
  (_a2 = current._computesSet) === null || _a2 === void 0 ? void 0 : _a2.forEach(function(reaction2) {
    var reactions = getReactionsFromTargetKey(reaction2._context, reaction2._property);
    if (reactions.length === 0) {
      disposeBindingReactions(reaction2);
      reaction2._dirty = true;
    }
  });
};
var disposeBindingReactions = function(reaction2) {
  reaction2._disposed = true;
  releaseBindingReactions(reaction2);
  suspendComputedReactions(reaction2);
};
var batchStart = function() {
  BatchCount.value++;
};
var batchEnd = function() {
  BatchCount.value--;
  if (BatchCount.value === 0) {
    var prevUntrackCount = UntrackCount.value;
    UntrackCount.value = 0;
    executePendingReactions();
    executeBatchEndpoints();
    UntrackCount.value = prevUntrackCount;
  }
};
var batchScopeStart = function() {
  BatchScope.value = true;
};
var batchScopeEnd = function() {
  var prevUntrackCount = UntrackCount.value;
  BatchScope.value = false;
  UntrackCount.value = 0;
  PendingScopeReactions.forEachDelete(function(reaction2) {
    if (isFn(reaction2._scheduler)) {
      reaction2._scheduler(reaction2);
    } else {
      reaction2();
    }
  });
  UntrackCount.value = prevUntrackCount;
};
var untrackStart = function() {
  UntrackCount.value++;
};
var untrackEnd = function() {
  UntrackCount.value--;
};
var isBatching = function() {
  return BatchCount.value > 0;
};
var isScopeBatching = function() {
  return BatchScope.value;
};
var isUntracking = function() {
  return UntrackCount.value > 0;
};
var executePendingReactions = function() {
  PendingReactions.forEachDelete(function(reaction2) {
    if (isFn(reaction2._scheduler)) {
      reaction2._scheduler(reaction2);
    } else {
      reaction2();
    }
  });
};
var executeBatchEndpoints = function() {
  BatchEndpoints.forEachDelete(function(callback) {
    callback();
  });
};
var hasDepsChange = function(newDeps, oldDeps) {
  if (newDeps === oldDeps)
    return false;
  if (newDeps.length !== oldDeps.length)
    return true;
  if (newDeps.some(function(value, index) {
    return value !== oldDeps[index];
  }))
    return true;
  return false;
};
var disposeEffects = function(reaction2) {
  if (reaction2._effects) {
    try {
      batchStart();
      reaction2._effects.queue.forEach(function(item) {
        if (!item || !item.dispose)
          return;
        item.dispose();
      });
    } finally {
      batchEnd();
    }
  }
};
var RAW_TYPE = Symbol("RAW_TYPE");
var OBSERVABLE_TYPE = Symbol("OBSERVABLE_TYPE");
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var isObservable = function(target) {
  return ProxyRaw.has(target);
};
var isAnnotation = function(target) {
  return target && !!target[MakeObservableSymbol];
};
var isSupportObservable = function(target) {
  if (!isValid(target))
    return false;
  if (isArr(target))
    return true;
  if (isPlainObj(target)) {
    if (target[RAW_TYPE]) {
      return false;
    }
    if (target[OBSERVABLE_TYPE]) {
      return true;
    }
    if ("$$typeof" in target && "_owner" in target) {
      return false;
    }
    if (target["_isAMomentObject"]) {
      return false;
    }
    if (target["_isJSONSchemaObject"]) {
      return false;
    }
    if (isFn(target["toJS"])) {
      return false;
    }
    if (isFn(target["toJSON"])) {
      return false;
    }
    return true;
  }
  if (isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target))
    return true;
  return false;
};
var toJS = function(values) {
  var visited = new WeakSet();
  var _toJS = function(values2) {
    if (visited.has(values2)) {
      return values2;
    }
    if (values2 && values2[RAW_TYPE])
      return values2;
    if (isArr(values2)) {
      if (isObservable(values2)) {
        visited.add(values2);
        var res_1 = [];
        values2.forEach(function(item) {
          res_1.push(_toJS(item));
        });
        visited.delete(values2);
        return res_1;
      }
    } else if (isPlainObj(values2)) {
      if (isObservable(values2)) {
        visited.add(values2);
        var res = {};
        for (var key in values2) {
          if (hasOwnProperty$2.call(values2, key)) {
            res[key] = _toJS(values2[key]);
          }
        }
        visited.delete(values2);
        return res;
      }
    }
    return values2;
  };
  return _toJS(values);
};
var __read$7 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __spreadArray$4 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
var wellKnownSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(function(key) {
  return Symbol[key];
}).filter(function(value) {
  return typeof value === "symbol";
}));
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function findObservable(target, key, value) {
  var observableObj = RawProxy.get(value);
  if (observableObj) {
    return observableObj;
  }
  if (!isObservable(value) && isSupportObservable(value)) {
    return createObservable(target, key, value);
  }
  return value;
}
function patchIterator(target, key, iterator, isEntries) {
  var originalNext = iterator.next;
  iterator.next = function() {
    var _a2 = originalNext.call(iterator), done = _a2.done, value = _a2.value;
    if (!done) {
      if (isEntries) {
        value[1] = findObservable(target, key, value[1]);
      } else {
        value = findObservable(target, key, value);
      }
    }
    return {
      done,
      value
    };
  };
  return iterator;
}
var instrumentations = (_a = {
  has: function(key) {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      key,
      type: "has"
    });
    return proto.has.apply(target, arguments);
  },
  get: function(key) {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      key,
      type: "get"
    });
    return findObservable(target, key, proto.get.apply(target, arguments));
  },
  add: function(key) {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    var hadKey = proto.has.call(target, key);
    var result = proto.add.apply(target, arguments);
    if (!hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        value: key,
        type: "add"
      });
    }
    return result;
  },
  set: function(key, value) {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    var hadKey = proto.has.call(target, key);
    var oldValue = proto.get.call(target, key);
    var result = proto.set.apply(target, arguments);
    if (!hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        value,
        type: "add"
      });
    } else if (value !== oldValue) {
      runReactionsFromTargetKey({
        target,
        key,
        value,
        oldValue,
        type: "set"
      });
    }
    return result;
  },
  delete: function(key) {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    var hadKey = proto.has.call(target, key);
    var oldValue = proto.get ? proto.get.call(target, key) : void 0;
    var result = proto.delete.apply(target, arguments);
    if (hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        oldValue,
        type: "delete"
      });
    }
    return result;
  },
  clear: function() {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    var hadItems = target.size !== 0;
    var oldTarget = target instanceof Map ? new Map(target) : new Set(target);
    var result = proto.clear.apply(target, arguments);
    if (hadItems) {
      runReactionsFromTargetKey({
        target,
        oldTarget,
        type: "clear"
      });
    }
    return result;
  },
  forEach: function(cb) {
    var _a2;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      type: "iterate"
    });
    var wrappedCb = function(value, key) {
      var args2 = [];
      for (var _i2 = 2; _i2 < arguments.length; _i2++) {
        args2[_i2 - 2] = arguments[_i2];
      }
      return cb.apply(void 0, __spreadArray$4([findObservable(target, key, value), key], __read$7(args2), false));
    };
    return (_a2 = proto.forEach).call.apply(_a2, __spreadArray$4([target, wrappedCb], __read$7(args), false));
  },
  keys: function() {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      type: "iterate"
    });
    return proto.keys.apply(target, arguments);
  },
  values: function() {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      type: "iterate"
    });
    var iterator = proto.values.apply(target, arguments);
    return patchIterator(target, "", iterator, false);
  },
  entries: function() {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      type: "iterate"
    });
    var iterator = proto.entries.apply(target, arguments);
    return patchIterator(target, "", iterator, true);
  }
}, _a[Symbol.iterator] = function() {
  var target = ProxyRaw.get(this);
  var proto = Reflect.getPrototypeOf(this);
  bindTargetKeyWithCurrentReaction({
    target,
    type: "iterate"
  });
  var iterator = proto[Symbol.iterator].apply(target, arguments);
  return patchIterator(target, "", iterator, target instanceof Map);
}, Object.defineProperty(_a, "size", {
  get: function() {
    var target = ProxyRaw.get(this);
    var proto = Reflect.getPrototypeOf(this);
    bindTargetKeyWithCurrentReaction({
      target,
      type: "iterate"
    });
    return Reflect.get(proto, "size", target);
  },
  enumerable: false,
  configurable: true
}), _a);
var collectionHandlers = {
  get: function(target, key, receiver) {
    target = hasOwnProperty$1.call(instrumentations, key) ? instrumentations : target;
    return Reflect.get(target, key, receiver);
  }
};
var baseHandlers = {
  get: function(target, key, receiver) {
    var result = target[key];
    if (typeof key === "symbol" && wellKnownSymbols.has(key)) {
      return result;
    }
    bindTargetKeyWithCurrentReaction({
      target,
      key,
      receiver,
      type: "get"
    });
    var observableResult = RawProxy.get(result);
    if (observableResult) {
      return observableResult;
    }
    if (!isObservable(result) && isSupportObservable(result)) {
      var descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!descriptor || !(descriptor.writable === false && descriptor.configurable === false)) {
        return createObservable(target, key, result);
      }
    }
    return result;
  },
  has: function(target, key) {
    var result = Reflect.has(target, key);
    bindTargetKeyWithCurrentReaction({
      target,
      key,
      type: "has"
    });
    return result;
  },
  ownKeys: function(target) {
    var keys = Reflect.ownKeys(target);
    bindTargetKeyWithCurrentReaction({
      target,
      type: "iterate"
    });
    return keys;
  },
  set: function(target, key, value, receiver) {
    var hadKey = hasOwnProperty$1.call(target, key);
    var newValue = createObservable(target, key, value);
    var oldValue = target[key];
    target[key] = newValue;
    if (!hadKey) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
        oldValue,
        receiver,
        type: "add"
      });
    } else if (value !== oldValue) {
      runReactionsFromTargetKey({
        target,
        key,
        value: newValue,
        oldValue,
        receiver,
        type: "set"
      });
    }
    return true;
  },
  deleteProperty: function(target, key) {
    var oldValue = target[key];
    delete target[key];
    runReactionsFromTargetKey({
      target,
      key,
      oldValue,
      type: "delete"
    });
    return true;
  }
};
var DataChange = function() {
  function DataChange2(operation, node) {
    this.key = operation.key;
    this.type = operation.type;
    this.value = operation.value;
    this.oldValue = operation.oldValue;
    this.path = node.path.concat(operation.key);
  }
  return DataChange2;
}();
var DataNode = function() {
  function DataNode2(target, key, value) {
    this.target = target;
    this.key = key;
    this.value = value;
  }
  Object.defineProperty(DataNode2.prototype, "path", {
    get: function() {
      if (!this.parent)
        return this.key ? [this.key] : [];
      return this.parent.path.concat(this.key);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataNode2.prototype, "targetRaw", {
    get: function() {
      return ProxyRaw.get(this.target) || this.target;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DataNode2.prototype, "parent", {
    get: function() {
      if (!this.target)
        return;
      return RawNode.get(this.targetRaw);
    },
    enumerable: false,
    configurable: true
  });
  DataNode2.prototype.isEqual = function(node) {
    if (this.key) {
      return node.targetRaw === this.targetRaw && node.key === this.key;
    }
    return node.value === this.value;
  };
  DataNode2.prototype.contains = function(node) {
    if (node === this)
      return true;
    var parent = node.parent;
    while (!!parent) {
      if (this.isEqual(parent))
        return true;
      parent = parent.parent;
    }
    return false;
  };
  return DataNode2;
}();
var buildDataTree = function(target, key, value) {
  var currentNode = RawNode.get(ProxyRaw.get(value) || value);
  if (currentNode)
    return currentNode;
  RawNode.set(value, new DataNode(target, key, value));
};
var createNormalProxy = function(target, shallow2) {
  var proxy = new Proxy(target, baseHandlers);
  ProxyRaw.set(proxy, target);
  if (shallow2) {
    RawShallowProxy.set(target, proxy);
  } else {
    RawProxy.set(target, proxy);
  }
  return proxy;
};
var createCollectionProxy = function(target, shallow2) {
  var proxy = new Proxy(target, collectionHandlers);
  ProxyRaw.set(proxy, target);
  if (shallow2) {
    RawShallowProxy.set(target, proxy);
  } else {
    RawProxy.set(target, proxy);
  }
  return proxy;
};
var createShallowProxy = function(target) {
  if (isNormalType(target))
    return createNormalProxy(target, true);
  if (isCollectionType(target))
    return createCollectionProxy(target, true);
  return target;
};
var createObservable = function(target, key, value, shallow2) {
  if (typeof value !== "object")
    return value;
  var raw = ProxyRaw.get(value);
  if (!!raw) {
    var node = RawNode.get(raw);
    node.key = key;
    return value;
  }
  if (!isSupportObservable(value))
    return value;
  if (target) {
    var parentRaw = ProxyRaw.get(target) || target;
    var isShallowParent = RawShallowProxy.get(parentRaw);
    if (isShallowParent)
      return value;
  }
  buildDataTree(target, key, value);
  if (shallow2)
    return createShallowProxy(value);
  if (isNormalType(value))
    return createNormalProxy(value);
  if (isCollectionType(value))
    return createCollectionProxy(value);
  return value;
};
var createAnnotation = function(maker) {
  var annotation = function(target) {
    return maker({
      value: target
    });
  };
  if (isFn(maker)) {
    annotation[MakeObservableSymbol] = maker;
  }
  return annotation;
};
var getObservableMaker = function(target) {
  if (target[MakeObservableSymbol]) {
    if (!target[MakeObservableSymbol][MakeObservableSymbol]) {
      return target[MakeObservableSymbol];
    }
    return getObservableMaker(target[MakeObservableSymbol]);
  }
};
var createBoundaryFunction = function(start, end) {
  function boundary(fn) {
    var results;
    try {
      start();
      if (isFn(fn)) {
        results = fn();
      }
    } finally {
      end();
    }
    return results;
  }
  boundary.bound = createBindFunction(boundary);
  return boundary;
};
var createBindFunction = function(boundary) {
  function bind(callback, context) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return boundary(function() {
        return callback.apply(context, args);
      });
    };
  }
  return bind;
};
var createBoundaryAnnotation = function(start, end) {
  var boundary = createBoundaryFunction(start, end);
  var annotation = createAnnotation(function(_a2) {
    var target = _a2.target, key = _a2.key;
    target[key] = boundary.bound(target[key], target);
    return target;
  });
  boundary[MakeObservableSymbol] = annotation;
  boundary.bound[MakeObservableSymbol] = annotation;
  return boundary;
};
var batch = createBoundaryAnnotation(batchStart, batchEnd);
batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd);
batch.endpoint = function(callback) {
  if (!isFn(callback))
    return;
  if (BatchCount.value === 0) {
    callback();
  } else {
    BatchEndpoints.add(callback);
  }
};
var action = createBoundaryAnnotation(function() {
  batchStart();
  untrackStart();
}, function() {
  untrackEnd();
  batchEnd();
});
action.scope = createBoundaryAnnotation(function() {
  batchScopeStart();
  untrackStart();
}, function() {
  untrackEnd();
  batchScopeEnd();
});
createBoundaryFunction(untrackStart, untrackEnd);
var observable$1 = createAnnotation(function(_a2) {
  var target = _a2.target, key = _a2.key, value = _a2.value;
  var store = {
    value: createObservable(target, key, target ? target[key] : value)
  };
  function get() {
    bindTargetKeyWithCurrentReaction({
      target,
      key,
      type: "get"
    });
    return store.value;
  }
  function set(value2) {
    var oldValue = store.value;
    value2 = createObservable(target, key, value2);
    store.value = value2;
    if (oldValue === value2)
      return;
    runReactionsFromTargetKey({
      target,
      key,
      type: "set",
      oldValue,
      value: value2
    });
  }
  if (target) {
    Object.defineProperty(target, key, {
      set,
      get,
      enumerable: true,
      configurable: false
    });
    return target;
  }
  return store.value;
});
var box = createAnnotation(function(_a2) {
  var target = _a2.target, key = _a2.key, value = _a2.value;
  var store = {
    value: target ? target[key] : value
  };
  var proxy = {
    set,
    get
  };
  ProxyRaw.set(proxy, store);
  RawProxy.set(store, proxy);
  buildDataTree(target, key, store);
  function get() {
    bindTargetKeyWithCurrentReaction({
      target: store,
      key,
      type: "get"
    });
    return store.value;
  }
  function set(value2) {
    var oldValue = store.value;
    store.value = value2;
    if (oldValue !== value2) {
      runReactionsFromTargetKey({
        target: store,
        key,
        type: "set",
        oldValue,
        value: value2
      });
    }
  }
  if (target) {
    Object.defineProperty(target, key, {
      value: proxy,
      enumerable: true,
      configurable: false,
      writable: false
    });
    return target;
  }
  return proxy;
});
var ref = createAnnotation(function(_a2) {
  var target = _a2.target, key = _a2.key, value = _a2.value;
  var store = {
    value: target ? target[key] : value
  };
  var proxy = {};
  var context = target ? target : store;
  var property = target ? key : "value";
  buildDataTree(target, key, store);
  ProxyRaw.set(proxy, store);
  RawProxy.set(store, proxy);
  function get() {
    bindTargetKeyWithCurrentReaction({
      target: context,
      key: property,
      type: "get"
    });
    return store.value;
  }
  function set(value2) {
    var oldValue = store.value;
    store.value = value2;
    if (oldValue !== value2) {
      runReactionsFromTargetKey({
        target: context,
        key: property,
        type: "set",
        oldValue,
        value: value2
      });
    }
  }
  if (target) {
    Object.defineProperty(target, key, {
      get,
      set,
      enumerable: true,
      configurable: false
    });
    return target;
  } else {
    Object.defineProperty(proxy, "value", {
      set,
      get
    });
  }
  return proxy;
});
var shallow = createAnnotation(function(_a2) {
  var target = _a2.target, key = _a2.key, value = _a2.value;
  var store = {
    value: createObservable(target, key, target ? target[key] : value, true)
  };
  function get() {
    bindTargetKeyWithCurrentReaction({
      target,
      key,
      type: "get"
    });
    return store.value;
  }
  function set(value2) {
    var oldValue = store.value;
    value2 = createObservable(target, key, value2, true);
    store.value = value2;
    if (oldValue === value2)
      return;
    runReactionsFromTargetKey({
      target,
      key,
      type: "set",
      oldValue,
      value: value2
    });
  }
  if (target) {
    Object.defineProperty(target, key, {
      set,
      get,
      enumerable: true,
      configurable: false
    });
    return target;
  }
  return store.value;
});
var computed = createAnnotation(function(_a2) {
  var target = _a2.target, key = _a2.key, value = _a2.value;
  var store = {};
  var proxy = {};
  var context = target ? target : store;
  var property = target ? key : "value";
  var getter = getGetter(context);
  var setter = getSetter(context);
  function getGetter(target2) {
    if (!target2) {
      if (value === null || value === void 0 ? void 0 : value.get)
        return value === null || value === void 0 ? void 0 : value.get;
      return value;
    }
    var descriptor = Object.getOwnPropertyDescriptor(target2, property);
    if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get)
      return descriptor.get;
    return getGetter(Object.getPrototypeOf(target2));
  }
  function getSetter(target2) {
    if (!target2) {
      if (value === null || value === void 0 ? void 0 : value.set)
        return value === null || value === void 0 ? void 0 : value.set;
      return;
    }
    var descriptor = Object.getOwnPropertyDescriptor(target2, property);
    if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.set)
      return descriptor.set;
    return getSetter(Object.getPrototypeOf(target2));
  }
  function compute() {
    var _a3;
    store.value = (_a3 = getter === null || getter === void 0 ? void 0 : getter.call) === null || _a3 === void 0 ? void 0 : _a3.call(getter, context);
  }
  function reaction2() {
    if (ReactionStack.indexOf(reaction2) === -1) {
      try {
        ReactionStack.push(reaction2);
        compute();
      } finally {
        ReactionStack.pop();
      }
    }
  }
  reaction2._name = "ComputedReaction";
  reaction2._scheduler = function() {
    reaction2._dirty = true;
    batchStart();
    runReactionsFromTargetKey({
      target: context,
      key: property,
      value: store.value,
      type: "set"
    });
    batchEnd();
  };
  reaction2._isComputed = true;
  reaction2._dirty = true;
  reaction2._context = context;
  reaction2._property = property;
  ProxyRaw.set(proxy, store);
  RawProxy.set(store, proxy);
  buildDataTree(target, key, store);
  function get() {
    if (hasRunningReaction()) {
      bindComputedReactions(reaction2);
    }
    if (!isUntracking()) {
      if (reaction2._dirty) {
        reaction2();
        reaction2._dirty = false;
      }
    } else {
      compute();
    }
    bindTargetKeyWithCurrentReaction({
      target: context,
      key: property,
      type: "get"
    });
    return store.value;
  }
  function set(value2) {
    var _a3;
    try {
      batchStart();
      (_a3 = setter === null || setter === void 0 ? void 0 : setter.call) === null || _a3 === void 0 ? void 0 : _a3.call(setter, context, value2);
    } finally {
      batchEnd();
    }
  }
  if (target) {
    Object.defineProperty(target, key, {
      get,
      set,
      enumerable: true,
      configurable: false
    });
    return target;
  } else {
    Object.defineProperty(proxy, "value", {
      set,
      get
    });
  }
  return proxy;
});
function observable(target) {
  return createObservable(null, null, target);
}
observable.box = box;
observable.ref = ref;
observable.deep = observable$1;
observable.shallow = shallow;
observable.computed = computed;
observable[MakeObservableSymbol] = observable$1;
function define(target, annotations) {
  if (isObservable(target))
    return target;
  if (!isSupportObservable(target))
    return target;
  buildDataTree(void 0, void 0, target);
  ProxyRaw.set(target, target);
  RawProxy.set(target, target);
  for (var key in annotations) {
    var annotation = annotations[key];
    if (isAnnotation(annotation)) {
      getObservableMaker(annotation)({
        target,
        key
      });
    }
  }
  return target;
}
var __assign$g = globalThis && globalThis.__assign || function() {
  __assign$g = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$g.apply(this, arguments);
};
var autorun = function(tracker, name) {
  if (name === void 0) {
    name = "AutoRun";
  }
  var reaction2 = function() {
    if (!isFn(tracker))
      return;
    if (reaction2._boundary > 0)
      return;
    if (ReactionStack.indexOf(reaction2) === -1) {
      releaseBindingReactions(reaction2);
      try {
        batchStart();
        ReactionStack.push(reaction2);
        tracker();
      } finally {
        ReactionStack.pop();
        reaction2._boundary++;
        batchEnd();
        reaction2._boundary = 0;
        reaction2._memos.cursor = 0;
        reaction2._effects.cursor = 0;
      }
    }
  };
  var cleanRefs = function() {
    reaction2._memos = {
      queue: [],
      cursor: 0
    };
    reaction2._effects = {
      queue: [],
      cursor: 0
    };
  };
  reaction2._boundary = 0;
  reaction2._name = name;
  cleanRefs();
  reaction2();
  return function() {
    disposeBindingReactions(reaction2);
    disposeEffects(reaction2);
    cleanRefs();
  };
};
autorun.memo = function(callback, dependencies) {
  if (!isFn(callback))
    return;
  var current = ReactionStack[ReactionStack.length - 1];
  if (!current || !current._memos)
    throw new Error("autorun.memo must used in autorun function body.");
  var deps = toArray(dependencies || []);
  var id = current._memos.cursor++;
  var old = current._memos.queue[id];
  if (!old || hasDepsChange(deps, old.deps)) {
    var value = callback();
    current._memos.queue[id] = {
      value,
      deps
    };
    return value;
  }
  return old.value;
};
autorun.effect = function(callback, dependencies) {
  if (!isFn(callback))
    return;
  var current = ReactionStack[ReactionStack.length - 1];
  if (!current || !current._effects)
    throw new Error("autorun.effect must used in autorun function body.");
  var effects = current._effects;
  var deps = toArray(dependencies || [{}]);
  var id = effects.cursor++;
  var old = effects.queue[id];
  if (!old || hasDepsChange(deps, old.deps)) {
    Promise.resolve(0).then(function() {
      if (current._disposed)
        return;
      var dispose = callback();
      if (isFn(dispose)) {
        effects.queue[id].dispose = dispose;
      }
    });
    effects.queue[id] = {
      deps
    };
  }
};
var reaction = function(tracker, subscriber, options) {
  var realOptions = __assign$g({
    name: "Reaction"
  }, options);
  var value = {};
  var dirtyCheck = function() {
    if (isFn(realOptions.equals))
      return !realOptions.equals(value.oldValue, value.currentValue);
    return value.oldValue !== value.currentValue;
  };
  var fireAction = function() {
    try {
      batchStart();
      if (isFn(subscriber))
        subscriber(value.currentValue, value.oldValue);
    } finally {
      batchEnd();
    }
  };
  var reaction2 = function() {
    if (ReactionStack.indexOf(reaction2) === -1) {
      releaseBindingReactions(reaction2);
      try {
        ReactionStack.push(reaction2);
        value.currentValue = tracker();
      } finally {
        ReactionStack.pop();
      }
    }
  };
  reaction2._scheduler = function(looping) {
    looping();
    if (dirtyCheck())
      fireAction();
    value.oldValue = value.currentValue;
  };
  reaction2._name = realOptions.name;
  reaction2();
  value.oldValue = value.currentValue;
  if (realOptions.fireImmediately) {
    fireAction();
  }
  return function() {
    disposeBindingReactions(reaction2);
  };
};
var Tracker = function() {
  function Tracker2(scheduler, name) {
    var _this = this;
    if (name === void 0) {
      name = "TrackerReaction";
    }
    this.track = function(tracker) {
      if (!isFn(tracker))
        return _this.results;
      if (_this.track._boundary > 0)
        return;
      if (ReactionStack.indexOf(_this.track) === -1) {
        try {
          batchStart();
          ReactionStack.push(_this.track);
          _this.results = tracker();
        } finally {
          ReactionStack.pop();
          _this.track._boundary++;
          batchEnd();
          _this.track._boundary = 0;
        }
      }
      return _this.results;
    };
    this.dispose = function() {
      disposeBindingReactions(_this.track);
    };
    this.track._scheduler = function(callback) {
      if (_this.track._boundary === 0)
        _this.dispose();
      if (isFn(callback))
        scheduler(callback);
    };
    this.track._name = name;
    this.track._boundary = 0;
  }
  return Tracker2;
}();
var observe = function(target, observer2, deep) {
  if (deep === void 0) {
    deep = true;
  }
  var addListener = function(target2) {
    var raw = ProxyRaw.get(target2) || target2;
    var node = RawNode.get(raw);
    var listener = function(operation) {
      var targetRaw = ProxyRaw.get(operation.target) || operation.target;
      var targetNode = RawNode.get(targetRaw);
      if (deep) {
        if (node.contains(targetNode)) {
          observer2(new DataChange(operation, targetNode));
          return;
        }
      }
      if (node === targetNode || node.targetRaw === targetRaw && node.key === operation.key) {
        observer2(new DataChange(operation, targetNode));
      }
    };
    if (node && isFn(observer2)) {
      ObserverListeners.add(listener);
    }
    return function() {
      ObserverListeners.delete(listener);
    };
  };
  if (target && typeof target !== "object")
    throw Error("Can not observe " + typeof target + " type.");
  return addListener(target);
};
var LifeCycle = function() {
  function LifeCycle2() {
    var _this = this;
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      params[_i] = arguments[_i];
    }
    this.buildListener = function(params2) {
      return function(payload, ctx) {
        var _this2 = this;
        for (var index = 0; index < params2.length; index++) {
          var item = params2[index];
          if (isFn$2(item)) {
            item.call(this, payload, ctx);
          } else if (isStr$1(item) && isFn$2(params2[index + 1])) {
            if (item === payload.type) {
              params2[index + 1].call(this, payload.payload, ctx);
            }
            index++;
          } else {
            each(item, function(handler, type) {
              if (isFn$2(handler) && isStr$1(type)) {
                if (type === payload.type) {
                  handler.call(_this2, payload.payload, ctx);
                  return false;
                }
              }
            });
          }
        }
      };
    };
    this.notify = function(type, payload, ctx) {
      if (isStr$1(type)) {
        _this.listener.call(ctx, {
          type,
          payload
        }, ctx);
      }
    };
    this.listener = this.buildListener(params);
  }
  return LifeCycle2;
}();
var __extends$4 = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var Heart = function(_super) {
  __extends$4(Heart2, _super);
  function Heart2(_a2) {
    var _b = _a2 === void 0 ? {} : _a2, lifecycles = _b.lifecycles, context = _b.context;
    var _this = _super.call(this) || this;
    _this.lifecycles = [];
    _this.outerLifecycles = new Map();
    _this.buildLifeCycles = function(lifecycles2) {
      return lifecycles2.reduce(function(buf, item) {
        if (item instanceof LifeCycle) {
          return buf.concat(item);
        } else {
          if (isArr$2(item)) {
            return _this.buildLifeCycles(item);
          } else if (typeof item === "object") {
            _this.context = item;
            return buf;
          }
          return buf;
        }
      }, []);
    };
    _this.addLifeCycles = function(id, lifecycles2) {
      if (lifecycles2 === void 0) {
        lifecycles2 = [];
      }
      var observers = _this.buildLifeCycles(lifecycles2);
      if (observers.length) {
        _this.outerLifecycles.set(id, observers);
      }
    };
    _this.hasLifeCycles = function(id) {
      return _this.outerLifecycles.has(id);
    };
    _this.removeLifeCycles = function(id) {
      _this.outerLifecycles.delete(id);
    };
    _this.setLifeCycles = function(lifecycles2) {
      if (lifecycles2 === void 0) {
        lifecycles2 = [];
      }
      _this.lifecycles = _this.buildLifeCycles(lifecycles2);
    };
    _this.publish = function(type, payload, context2) {
      if (isStr$1(type)) {
        _this.lifecycles.forEach(function(lifecycle) {
          lifecycle.notify(type, payload, context2 || _this.context);
        });
        _this.outerLifecycles.forEach(function(lifecycles2) {
          lifecycles2.forEach(function(lifecycle) {
            lifecycle.notify(type, payload, context2 || _this.context);
          });
        });
        _this.notify({
          type,
          payload
        });
      }
    };
    _this.clear = function() {
      _this.lifecycles = [];
      _this.outerLifecycles.clear();
      _this.unsubscribe();
    };
    _this.lifecycles = _this.buildLifeCycles(lifecycles || []);
    _this.context = context;
    return _this;
  }
  return Heart2;
}(Subscribable);
var isForm = function(node) {
  return node instanceof Form;
};
var isGeneralField = function(node) {
  return node instanceof Field$1 || node instanceof VoidField;
};
var isArrayField = function(node) {
  return node instanceof ArrayField;
};
var isObjectField = function(node) {
  return node instanceof ObjectField;
};
var isVoidField = function(node) {
  return node instanceof VoidField;
};
var isFormState = function(state) {
  if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
    return false;
  return (state === null || state === void 0 ? void 0 : state.displayName) === "Form";
};
var isFieldState = function(state) {
  if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
    return false;
  return (state === null || state === void 0 ? void 0 : state.displayName) === "Field";
};
var isArrayFieldState = function(state) {
  if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
    return false;
  return (state === null || state === void 0 ? void 0 : state.displayName) === "ArrayField";
};
var isObjectFieldState = function(state) {
  if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
    return false;
  return (state === null || state === void 0 ? void 0 : state.displayName) === "ObjectField";
};
var isQuery = function(query) {
  return query && query instanceof Query;
};
var Graph = function() {
  function Graph2(form) {
    var _this = this;
    this.getGraph = function() {
      var graph = {};
      graph[""] = _this.form.getState();
      each(_this.form.fields, function(field, identifier) {
        graph[identifier] = field.getState();
      });
      return graph;
    };
    this.setGraph = function(graph) {
      var form2 = _this.form;
      var createField = function(identifier, state) {
        var address = Path.parse(identifier);
        var name = address.segments[address.segments.length - 1];
        var basePath = address.parent();
        if (isFieldState(state)) {
          return _this.form.createField({
            name,
            basePath
          });
        } else if (isArrayFieldState(state)) {
          return _this.form.createArrayField({
            name,
            basePath
          });
        } else if (isObjectFieldState(state)) {
          return _this.form.createObjectField({
            name,
            basePath
          });
        } else {
          return _this.form.createVoidField({
            name,
            basePath
          });
        }
      };
      each(graph, function(state, address) {
        if (isFormState(state)) {
          form2.setState(state);
        } else {
          var field = form2.fields[address];
          if (field) {
            field.setState(state);
          } else {
            createField(address, state).setState(state);
          }
        }
      });
    };
    this.form = form;
    define(this, {
      setGraph: batch
    });
  }
  return Graph2;
}();
var output = function(field, taker) {
  if (!field)
    return;
  if (isFn$2(taker)) {
    return taker(field, field.address);
  }
  return field;
};
var Query = function() {
  function Query2(props) {
    var _this = this;
    this.addresses = [];
    this.pattern = Path.parse(props.pattern, props.base);
    this.form = props.form;
    if (!this.pattern.isMatchPattern) {
      var identifier = this.pattern.toString();
      var index = this.form.indexes.get(identifier);
      var absoluteField = this.form.fields[identifier];
      var indexField = this.form.fields[index];
      if (absoluteField) {
        this.addresses = [identifier];
      } else if (indexField) {
        this.addresses = [index];
      }
    } else {
      each(this.form.fields, function(field, address) {
        if (field.match(_this.pattern)) {
          _this.addresses.push(address);
        }
      });
    }
  }
  Query2.prototype.take = function(taker) {
    return output(this.form.fields[this.addresses[0]], taker);
  };
  Query2.prototype.map = function(iterator) {
    var _this = this;
    return this.addresses.map(function(address) {
      return output(_this.form.fields[address], iterator);
    });
  };
  Query2.prototype.forEach = function(iterator) {
    var _this = this;
    return this.addresses.forEach(function(address) {
      return output(_this.form.fields[address], iterator);
    });
  };
  Query2.prototype.reduce = function(reducer, initial) {
    var _this = this;
    return this.addresses.reduce(function(value, address) {
      return output(_this.form.fields[address], function(field, address2) {
        return reducer(value, field, address2);
      });
    }, initial);
  };
  Query2.prototype.get = function(key) {
    var results = this.take();
    if (results) {
      return results[key];
    }
  };
  Query2.prototype.getIn = function(pattern) {
    return Path.getIn(this.take(), pattern);
  };
  Query2.prototype.value = function() {
    return this.form.getValuesIn(this.pattern);
  };
  Query2.prototype.initialValue = function() {
    return this.form.getInitialValuesIn(this.pattern);
  };
  return Query2;
}();
var isValidateResult = function(obj) {
  return !!obj["type"] && !!obj["message"];
};
var getIn = Path.getIn;
var self$1 = globalThisPolyfill$1;
var defaultLanguage = "en";
var getBrowserlanguage = function() {
  if (!self$1.navigator) {
    return defaultLanguage;
  }
  return self$1.navigator.browserlanguage || self$1.navigator.language || defaultLanguage;
};
var registry$1 = {
  locales: {
    messages: {},
    language: getBrowserlanguage()
  },
  formats: {},
  rules: {},
  template: null
};
var getISOCode = function(language) {
  var isoCode = registry$1.locales.language;
  var lang = lowerCase(language);
  if (registry$1.locales.messages[language]) {
    return language;
  }
  each(registry$1.locales.messages, function(messages, key) {
    var target = lowerCase(key);
    if (target.indexOf(lang) > -1 || lang.indexOf(target) > -1) {
      isoCode = key;
      return false;
    }
  });
  return isoCode;
};
var getLocaleByPath = function(path, lang) {
  if (lang === void 0) {
    lang = registry$1.locales.language;
  }
  return getIn(registry$1.locales.messages, getISOCode(lang) + "." + path);
};
var getValidateLocale = function(path) {
  var message = getLocaleByPath(path);
  return message || getLocaleByPath("pattern") || getLocaleByPath("pattern", defaultLanguage);
};
var getValidateMessageTemplateEngine = function() {
  return registry$1.template;
};
var getValidateFormats = function(key) {
  return key ? registry$1.formats[key] : registry$1.formats;
};
var getValidateRules = function(key) {
  return key ? registry$1.rules[key] : registry$1.rules;
};
var registerValidateLocale = function(locale) {
  registry$1.locales.messages = merge(registry$1.locales.messages, locale);
};
var registerValidateRules = function(rules) {
  each(rules, function(rule, key) {
    if (isFn$2(rule)) {
      registry$1.rules[key] = rule;
    }
  });
};
var registerValidateFormats = function(formats2) {
  each(formats2, function(pattern, key) {
    if (isStr$1(pattern) || pattern instanceof RegExp) {
      registry$1.formats[key] = new RegExp(pattern);
    }
  });
};
var render = function(result, rules) {
  var message = result.message;
  if (isStr$1(result.message)) {
    var template = getValidateMessageTemplateEngine();
    if (isFn$2(template)) {
      result.message = template(message, rules);
    }
    result.message = result.message.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function(_, $0) {
      return Path.getIn(rules, $0);
    });
  }
  return result;
};
var __assign$f = globalThis && globalThis.__assign || function() {
  __assign$f = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$f.apply(this, arguments);
};
var __awaiter$4 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$4 = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    },
    trys: [],
    ops: []
  }, f2, y2, t2, g2;
  return g2 = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t2[1]) {
              _.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _.label < t2[2]) {
              _.label = t2[2];
              _.ops.push(op);
              break;
            }
            if (t2[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var getRuleMessage = function(rule, type) {
  if (rule.format) {
    return rule.message || getValidateLocale(rule.format);
  }
  return rule.message || getValidateLocale(type);
};
var parseValidatorDescription = function(description) {
  var rules = {};
  if (isStr$1(description)) {
    rules.format = description;
  } else if (isFn$2(description)) {
    rules.validator = description;
  } else {
    rules = Object.assign(rules, description);
  }
  rules.triggerType = rules.triggerType || "onInput";
  return rules;
};
var parseValidatorDescriptions = function(validator) {
  var array = isArr$2(validator) ? validator : [validator];
  return array.map(function(description) {
    return parseValidatorDescription(description);
  });
};
var parseIValidatorRules = function(rules) {
  var rulesKeys = Object.keys(rules || {}).sort(function(key) {
    return key === "validator" ? 1 : -1;
  });
  var getContext = function(context, value) {
    return __assign$f(__assign$f({
      value
    }, rules), context);
  };
  var createValidate = function(callback, message) {
    return function(value, context) {
      return __awaiter$4(void 0, void 0, void 0, function() {
        var context_, results, e_1;
        return __generator$4(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              context_ = getContext(context, value);
              _a2.label = 1;
            case 1:
              _a2.trys.push([1, 3, , 4]);
              return [
                4,
                callback(value, __assign$f(__assign$f({}, rules), {
                  message
                }), context_, function(message2, scope) {
                  var _a3;
                  return (_a3 = render({
                    type: "error",
                    message: message2
                  }, __assign$f(__assign$f({}, context_), scope))) === null || _a3 === void 0 ? void 0 : _a3.message;
                })
              ];
            case 2:
              results = _a2.sent();
              if (isBool(results)) {
                if (!results) {
                  return [
                    2,
                    render({
                      type: "error",
                      message
                    }, context_)
                  ];
                }
                return [
                  2,
                  {
                    type: "error",
                    message: void 0
                  }
                ];
              } else if (results) {
                if (isValidateResult(results)) {
                  return [
                    2,
                    render(results, context_)
                  ];
                }
                return [
                  2,
                  render({
                    type: "error",
                    message: results
                  }, context_)
                ];
              }
              return [
                2,
                {
                  type: "error",
                  message: void 0
                }
              ];
            case 3:
              e_1 = _a2.sent();
              return [
                2,
                {
                  type: "error",
                  message: (e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1
                }
              ];
            case 4:
              return [
                2
              ];
          }
        });
      });
    };
  };
  return rulesKeys.reduce(function(buf, key) {
    var callback = getValidateRules(key);
    return callback ? buf.concat(createValidate(callback, getRuleMessage(rules, key))) : buf;
  }, []);
};
var parseValidator = function(validator, options) {
  if (options === void 0) {
    options = {};
  }
  var array = isArr$2(validator) ? validator : [validator];
  var results = [];
  return array.reduce(function(buf, description) {
    var rules = parseValidatorDescription(description);
    if ((options === null || options === void 0 ? void 0 : options.triggerType) && options.triggerType !== rules.triggerType)
      return buf;
    return rules ? buf.concat(parseIValidatorRules(rules)) : buf;
  }, results);
};
var locales = {
  en: {
    pattern: "This field is invalid",
    invalid: "This field is invalid",
    required: "The field value is required",
    number: "The field value is not a number",
    integer: "The field value is not an integer number",
    url: "The field value is a invalid url",
    email: "The field value is not a email format",
    ipv6: "The field value is not a ipv6 format",
    ipv4: "The field value is not a ipv4 format",
    idcard: "The field value is not an idcard format",
    qq: "The field value is not a qq number format",
    phone: "The field value is not a phone number format",
    money: "The field value is not a currency format",
    zh: "The field value is not a chinese string",
    date: "The field value is not a valid date format",
    zip: "The field value is not a zip format",
    len: "The length or number of entries must be {{len}}",
    min: "The length or number of entries must be at least {{min}}",
    minLength: "The length or number of entries must be at least {{minLength}}",
    minItems: "The length or number of entries must be at least {{minItems}}",
    maximum: "The field value cannot be greater than {{maximum}}",
    exclusiveMaximum: "The field value must be less than {{exclusiveMaximum}}",
    minimum: "The field value cannot be less than {{minimum}}",
    exclusiveMinimum: "The field value must be greater than {{exclusiveMinimum}}",
    max: "The field length or number of entries must be at most {{max}}",
    maxLength: "The field length or number of entries must be at most {{maxLength}}",
    maxItems: "The field length or number of entries must be at most {{maxItems}}",
    whitespace: "This field value cannot be blank string.",
    enum: "The field value must be one of {{enum}}",
    const: "The field value must be equal to {{const}}",
    multipleOf: "The field value must be divisible by {{multipleOf}}",
    maxProperties: "The number of field properties cannot be greater than {{maxProperties}}",
    minProperties: "The number of field properties cannot be less than {{maxProperties}}",
    uniqueItems: "Array elements are not unique"
  },
  zh: {
    pattern: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u5B57\u6BB5",
    invalid: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u5B57\u6BB5",
    required: "\u8BE5\u5B57\u6BB5\u662F\u5FC5\u586B\u5B57\u6BB5",
    number: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u6570\u5B57",
    integer: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u6574\u578B\u6570\u5B57",
    url: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684url",
    email: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u90AE\u7BB1\u683C\u5F0F",
    ipv6: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684ipv6\u683C\u5F0F",
    ipv4: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684ipv4\u683C\u5F0F",
    idcard: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u8EAB\u4EFD\u8BC1\u683C\u5F0F",
    qq: "\u8BE5\u5B57\u6BB5\u4E0D\u7B26\u5408QQ\u53F7\u683C\u5F0F",
    phone: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u6709\u6548\u7684\u624B\u673A\u53F7",
    money: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u6709\u6548\u8D27\u5E01\u683C\u5F0F",
    zh: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u4E2D\u6587\u5B57\u7B26\u4E32",
    date: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u65E5\u671F\u683C\u5F0F",
    zip: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u90AE\u7F16\u683C\u5F0F",
    len: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u5FC5\u987B\u4E3A{{len}}",
    min: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5C0F\u4E8E{{min}}",
    minLength: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5C0F\u4E8E{{minLength}}",
    minItems: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5C0F\u4E8E{{minItems}}",
    max: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5927\u4E8E{{max}}",
    maxLength: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5927\u4E8E{{maxLength}}",
    maxItems: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5927\u4E8E{{maxItems}}",
    maximum: "\u6570\u503C\u4E0D\u80FD\u5927\u4E8E{{maximum}}",
    exclusiveMaximum: "\u6570\u503C\u5FC5\u987B\u5C0F\u4E8E{{exclusiveMaximum}}",
    minimum: "\u6570\u503C\u4E0D\u80FD\u5C0F\u4E8E{{minimum}}",
    exclusiveMinimum: "\u6570\u503C\u5FC5\u987B\u5927\u4E8E{{exclusiveMinimum}}",
    whitespace: "\u4E0D\u80FD\u4E3A\u7EAF\u7A7A\u767D\u5B57\u7B26\u4E32",
    enum: "\u5B57\u6BB5\u503C\u5FC5\u987B\u4E3A{{enum}}\u5176\u4E2D\u4E00\u4E2A",
    const: "\u5B57\u6BB5\u503C\u5FC5\u987B\u7B49\u4E8E{{const}}",
    multipleOf: "\u5B57\u6BB5\u503C\u4E0D\u80FD\u88AB{{multipleOf}}\u6574\u9664",
    maxProperties: "\u5B57\u6BB5\u5C5E\u6027\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E{{maxProperties}}",
    minProperties: "\u5B57\u6BB5\u5C5E\u6027\u6570\u91CF\u4E0D\u80FD\u5C0F\u4E8E{{minProperties}}",
    uniqueItems: "\u6570\u7EC4\u5143\u7D20\u4E0D\u552F\u4E00"
  },
  "en-US": {
    pattern: "This field is invalid",
    invalid: "This field is invalid",
    required: "The field value is required",
    number: "The field value is not a number",
    integer: "The field value is not an integer number",
    url: "The field value is a invalid url",
    email: "The field value is not a email format",
    ipv6: "The field value is not a ipv6 format",
    ipv4: "The field value is not a ipv4 format",
    idcard: "The field value is not an idcard format",
    qq: "The field value is not a qq number format",
    phone: "The field value is not a phone number format",
    money: "The field value is not a currency format",
    zh: "The field value is not a chinese string",
    date: "The field value is not a valid date format",
    zip: "The field value is not a zip format",
    len: "The length or number of entries must be {{len}}",
    min: "The length or number of entries must be at least {{min}}",
    minLength: "The length or number of entries must be at least {{minLength}}",
    minItems: "The length or number of entries must be at least {{minItems}}",
    maximum: "The field value cannot be greater than {{maximum}}",
    exclusiveMaximum: "The field value must be less than {{exclusiveMaximum}}",
    minimum: "The field value cannot be less than {{minimum}}",
    exclusiveMinimum: "The field value must be greater than {{exclusiveMinimum}}",
    max: "The field length or number of entries must be at most {{max}}",
    maxLength: "The field length or number of entries must be at most {{maxLength}}",
    maxItems: "The field length or number of entries must be at most {{maxItems}}",
    whitespace: "This field value cannot be blank string.",
    enum: "The field value must be one of {{enum}}",
    const: "The field value must be equal to {{const}}",
    multipleOf: "The field value must be divisible by {{multipleOf}}",
    maxProperties: "The number of field properties cannot be greater than {{maxProperties}}",
    minProperties: "The number of field properties cannot be less than {{maxProperties}}",
    uniqueItems: "Array elements are not unique"
  },
  "zh-CN": {
    pattern: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u5B57\u6BB5",
    invalid: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u5B57\u6BB5",
    required: "\u8BE5\u5B57\u6BB5\u662F\u5FC5\u586B\u5B57\u6BB5",
    number: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u6570\u5B57",
    integer: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u6574\u578B\u6570\u5B57",
    url: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684url",
    email: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u90AE\u7BB1\u683C\u5F0F",
    ipv6: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684ipv6\u683C\u5F0F",
    ipv4: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684ipv4\u683C\u5F0F",
    idcard: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u8EAB\u4EFD\u8BC1\u683C\u5F0F",
    qq: "\u8BE5\u5B57\u6BB5\u4E0D\u7B26\u5408QQ\u53F7\u683C\u5F0F",
    phone: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u6709\u6548\u7684\u624B\u673A\u53F7",
    money: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u6709\u6548\u8D27\u5E01\u683C\u5F0F",
    zh: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u4E2D\u6587\u5B57\u7B26\u4E32",
    date: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u65E5\u671F\u683C\u5F0F",
    zip: "\u8BE5\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u90AE\u7F16\u683C\u5F0F",
    len: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u5FC5\u987B\u4E3A{{len}}",
    min: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5C0F\u4E8E{{min}}",
    minLength: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5C0F\u4E8E{{minLength}}",
    minItems: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5C0F\u4E8E{{minItems}}",
    maxLength: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5927\u4E8E{{maxLength}}",
    maxItems: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5927\u4E8E{{maxItems}}",
    max: "\u957F\u5EA6\u6216\u6761\u76EE\u6570\u4E0D\u80FD\u5927\u4E8E{{max}}",
    maximum: "\u6570\u503C\u4E0D\u80FD\u5927\u4E8E{{maximum}}",
    exclusiveMaximum: "\u6570\u503C\u5FC5\u987B\u5C0F\u4E8E{{exclusiveMaximum}}",
    minimum: "\u6570\u503C\u4E0D\u80FD\u5C0F\u4E8E{{minimum}}",
    exclusiveMinimum: "\u6570\u503C\u5FC5\u987B\u5927\u4E8E{{exclusiveMinimum}}",
    whitespace: "\u4E0D\u80FD\u4E3A\u7EAF\u7A7A\u767D\u5B57\u7B26\u4E32",
    enum: "\u5B57\u6BB5\u503C\u5FC5\u987B\u4E3A{{enum}}\u5176\u4E2D\u4E00\u4E2A",
    const: "\u5B57\u6BB5\u503C\u5FC5\u987B\u7B49\u4E8E{{const}}",
    multipleOf: "\u5B57\u6BB5\u503C\u4E0D\u80FD\u88AB{{multipleOf}}\u6574\u9664",
    maxProperties: "\u5B57\u6BB5\u5C5E\u6027\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E{{maxProperties}}",
    minProperties: "\u5B57\u6BB5\u5C5E\u6027\u6570\u91CF\u4E0D\u80FD\u5C0F\u4E8E{{minProperties}}",
    uniqueItems: "\u6570\u7EC4\u5143\u7D20\u4E0D\u552F\u4E00"
  },
  "zh-TW": {
    pattern: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u4E00\u500B\u5408\u6CD5\u7684\u5B57\u6BB5",
    invalid: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u4E00\u500B\u5408\u6CD5\u7684\u5B57\u6BB5",
    required: "\u8A72\u5B57\u6BB5\u662F\u5FC5\u586B\u5B57\u6BB5",
    number: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u6578\u5B57",
    integer: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u6574\u578B\u6578\u5B57",
    url: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684url",
    email: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u90F5\u7BB1\u683C\u5F0F",
    ipv6: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684ipv6\u683C\u5F0F",
    ipv4: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684ipv4\u683C\u5F0F",
    idcard: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u8EAB\u4EFD\u8B49\u683C\u5F0F",
    qq: "\u8A72\u5B57\u6BB5\u4E0D\u7B26\u5408QQ\u865F\u683C\u5F0F",
    phone: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u6709\u6548\u7684\u624B\u6A5F\u865F",
    money: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u6709\u6548\u8CA8\u5E63\u683C\u5F0F",
    zh: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u4E2D\u6587\u5B57\u7B26\u4E32",
    date: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u65E5\u671F\u683C\u5F0F",
    zip: "\u8A72\u5B57\u6BB5\u4E0D\u662F\u5408\u6CD5\u7684\u90F5\u7DE8\u683C\u5F0F",
    len: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u5FC5\u9808\u70BA{{len}}",
    min: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u4E0D\u80FD\u5C0F\u65BC{{min}}",
    minItems: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u4E0D\u80FD\u5C0F\u65BC{{minItems}}",
    minLength: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u4E0D\u80FD\u5C0F\u65BC{{minLength}}",
    max: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u4E0D\u80FD\u5927\u65BC{{max}}",
    maxItems: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u4E0D\u80FD\u5927\u65BC{{maxItems}}",
    maxLength: "\u9577\u5EA6\u6216\u689D\u76EE\u6578\u4E0D\u80FD\u5927\u65BC{{maxLength}}",
    maximum: "\u6578\u503C\u4E0D\u80FD\u5927\u65BC{{maximum}}",
    exclusiveMaximum: "\u6578\u503C\u5FC5\u9808\u5C0F\u65BC{{exclusiveMaximum}}",
    minimum: "\u6578\u503C\u4E0D\u80FD\u5C0F\u65BC{{minimum}}",
    exclusiveMinimum: "\u6578\u503C\u5FC5\u9808\u5927\u65BC{{exclusiveMinimum}}",
    whitespace: "\u4E0D\u80FD\u70BA\u7D14\u7A7A\u767D\u5B57\u7B26\u4E32",
    enum: "\u5B57\u6BB5\u503C\u5FC5\u9808\u70BA{{enum}}\u5176\u4E2D\u4E00\u500B",
    const: "\u5B57\u6BB5\u503C\u5FC5\u9808\u7B49\u65BC{{const}}",
    multipleOf: "\u5B57\u6BB5\u503C\u4E0D\u80FD\u88AB{{multipleOf}}\u6574\u9664",
    maxProperties: "\u5B57\u6BB5\u5C6C\u6027\u6578\u91CF\u4E0D\u80FD\u5927\u65BC{{maxProperties}}",
    minProperties: "\u5B57\u6BB5\u5C6C\u6027\u6578\u91CF\u4E0D\u80FD\u5C0F\u65BC{{minProperties}}",
    uniqueItems: "\u6578\u7D44\u5143\u7D20\u4E0D\u552F\u4E00"
  },
  ja: {
    url: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u7121\u52B9\u306AURL\u3067\u3059",
    whitespace: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u3092\u7A7A\u306E\u6587\u5B57\u5217\u306B\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002",
    zh: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u4E2D\u56FD\u8A9E\u306E\u6587\u5B57\u5217\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    zip: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306Fzip\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    date: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u6709\u52B9\u306A\u65E5\u4ED8\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    email: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u30E1\u30FC\u30EB\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    exclusiveMaximum: "\u5024\u306F{{exclusiveMaximum}}\u672A\u6E80\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    exclusiveMinimum: "\u5024\u306F{{exclusiveMinimum}}\u3088\u308A\u5927\u304D\u3044\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    idcard: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306FID\u30AB\u30FC\u30C9\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    integer: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u6574\u6570\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    ipv4: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306FIPv4\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    ipv6: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306FIPv6\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    len: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F{{len}}\u3067\u306A\u3051\u308C\u3070\u306A\u308A\u307E\u305B\u3093",
    max: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F\u6700\u5927{{max}}\u3067\u306A\u3051\u308C\u3070\u306A\u308A\u307E\u305B\u3093",
    maxItems: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F\u6700\u5927{{maxItems}}\u3067\u306A\u3051\u308C\u3070\u306A\u308A\u307E\u305B\u3093",
    maxLength: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F\u6700\u5927{{maxLength}}\u3067\u306A\u3051\u308C\u3070\u306A\u308A\u307E\u305B\u3093",
    maximum: "\u5024\u306F{{\u6700\u5927}}\u3092\u8D85\u3048\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093",
    min: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F\u3001\u5C11\u306A\u304F\u3068\u3082{{min}}\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    minItems: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F\u3001\u5C11\u306A\u304F\u3068\u3082{{minItems}}\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    minLength: "\u30A8\u30F3\u30C8\u30EA\u306E\u9577\u3055\u307E\u305F\u306F\u6570\u306F\u3001\u5C11\u306A\u304F\u3068\u3082{{minLength}}\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    minimum: "\u5024\u306F{{minimum}}\u4EE5\u4E0A\u306B\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    money: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u901A\u8CA8\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    number: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u6570\u5024\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    pattern: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u3069\u306E\u30D1\u30BF\u30FC\u30F3\u3068\u3082\u4E00\u81F4\u3057\u307E\u305B\u3093",
    invalid: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u3069\u306E\u30D1\u30BF\u30FC\u30F3\u3068\u3082\u4E00\u81F4\u3057\u307E\u305B\u3093",
    phone: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306F\u96FB\u8A71\u756A\u53F7\u306E\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    qq: "\u3053\u306E\u30D5\u30A3\u30FC\u30EB\u30C9\u306Fqq\u6570\u5024\u5F62\u5F0F\u3067\u306F\u3042\u308A\u307E\u305B\u3093",
    required: "\u3053\u306E\u9805\u76EE\u306F\u5FC5\u9808\u3067\u3059",
    enum: "\u30D5\u30A3\u30FC\u30EB\u30C9\u5024\u306F{{enum}}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059",
    cons: "\u30D5\u30A3\u30FC\u30EB\u30C9\u5024\u306F{{const}}\u3068\u7B49\u3057\u304F\u306A\u3051\u308C\u3070\u306A\u308A\u307E\u305B\u3093",
    multipleOf: "\u30D5\u30A3\u30FC\u30EB\u30C9\u5024\u3092{{multipleOf}}\u3067\u5272\u308A\u5207\u308C\u306A\u3044",
    maxProperties: "\u30D5\u30A3\u30FC\u30EB\u30C9\u30D7\u30ED\u30D1\u30C6\u30A3\u306E\u6570\u306F{{maxProperties}}\u3092\u8D85\u3048\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093",
    minProperties: "\u30D5\u30A3\u30FC\u30EB\u30C9\u30D7\u30ED\u30D1\u30C6\u30A3\u306E\u6570\u306F{{minProperties}}\u672A\u6E80\u306B\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093",
    uniqueItems: "\u914D\u5217\u8981\u7D20\u306F\u4E00\u610F\u3067\u306F\u3042\u308A\u307E\u305B\u3093"
  }
};
var formats = {
  url: new RegExp("^(?:(?:(?:https?|ftp|rtmp):)?//)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:22[0-3]|2[01]\\d|[1-9]\\d?|1\\d\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){2}(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]\\d?))|(?:(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)*(?:\\.(?:[a-z\\u00a1-\\uffff_]{2,})))(?::\\d{2,5})?(?:/?\\S*)?$"),
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  ipv4: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,
  number: /^[+-]?\d+(\.\d+)?$/,
  integer: /^[+-]?\d+$/,
  qq: /^(\+?[1-9]\d*|0)$/,
  phone: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,
  idcard: /^\d{15}$|^\d{17}(\d|x|X)$/,
  money: /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/,
  zh: /^[\u4e00-\u9fa5]+$/,
  date: /^[0-9]+[./-][0-9]+[./-][0-9]+\s*(?:[0-9]+\s*:\s*[0-9]+\s*:\s*[0-9]+)?$/,
  zip: /^[0-9]{6}$/
};
var __assign$e = globalThis && globalThis.__assign || function() {
  __assign$e = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$e.apply(this, arguments);
};
var __awaiter$3 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$3 = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    },
    trys: [],
    ops: []
  }, f2, y2, t2, g2;
  return g2 = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t2[1]) {
              _.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _.label < t2[2]) {
              _.label = t2[2];
              _.ops.push(op);
              break;
            }
            if (t2[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __read$6 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __spreadArray$3 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var isValidateEmpty = function(value) {
  var _a2;
  if (isArr$2(value)) {
    for (var i = 0; i < value.length; i++) {
      if (isValid$4(value[i]))
        return false;
    }
    return true;
  } else {
    if (value === null || value === void 0 ? void 0 : value.getCurrentContent) {
      return !((_a2 = value.getCurrentContent()) === null || _a2 === void 0 ? void 0 : _a2.hasText());
    }
    return isEmpty(value);
  }
};
var getLength = function(value) {
  return isStr$1(value) ? stringLength(value) : value ? value.length : 0;
};
var extendSameRules = function(rules, names) {
  each(names, function(realName, name) {
    rules[name] = function(value, rule) {
      var _a2;
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      return rules[realName].apply(rules, __spreadArray$3([value, __assign$e(__assign$e({}, rule), (_a2 = {}, _a2[realName] = rule[name], _a2))], __read$6(args), false));
    };
  });
};
var RULES = {
  format: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    return !new RegExp(getValidateFormats(rule.format) || "").test(value) ? rule.message : "";
  },
  required: function(value, rule) {
    if (rule.required === false)
      return "";
    return isValidateEmpty(value) ? rule.message : "";
  },
  max: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    var length = isNum$1(value) ? value : getLength(value);
    var max = Number(rule.max);
    return length > max ? rule.message : "";
  },
  min: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    var length = isNum$1(value) ? value : getLength(value);
    var min = Number(rule.min);
    return length < min ? rule.message : "";
  },
  exclusiveMaximum: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    var length = isNum$1(value) ? value : getLength(value);
    var max = Number(rule.exclusiveMaximum);
    return length >= max ? rule.message : "";
  },
  exclusiveMinimum: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    var length = isNum$1(value) ? value : getLength(value);
    var min = Number(rule.exclusiveMinimum);
    return length <= min ? rule.message : "";
  },
  len: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    var length = getLength(value);
    var len = Number(rule.len);
    return length !== len ? rule.message : "";
  },
  pattern: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    return !new RegExp(rule.pattern).test(value) ? rule.message : "";
  },
  validator: function(value, rule, context, format) {
    return __awaiter$3(this, void 0, void 0, function() {
      var response;
      return __generator$3(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!isFn$2(rule.validator))
              return [
                3,
                2
              ];
            return [
              4,
              Promise.resolve(rule.validator(value, rule, context, format))
            ];
          case 1:
            response = _a2.sent();
            if (isBool(response)) {
              return [
                2,
                !response ? rule.message : ""
              ];
            } else {
              return [
                2,
                response
              ];
            }
          case 2:
            throw new Error("The rule's validator property must be a function.");
        }
      });
    });
  },
  whitespace: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    if (rule.whitespace) {
      return /^\s+$/.test(value) ? rule.message : "";
    }
  },
  enum: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    var enums = toArr$1(rule.enum);
    return enums.indexOf(value) === -1 ? rule.message : "";
  },
  const: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    return rule.const !== value ? rule.message : "";
  },
  multipleOf: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    return Number(value) % Number(rule.multipleOf) !== 0 ? rule.message : "";
  },
  uniqueItems: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    value = toArr$1(value);
    return value.some(function(item, index) {
      for (var i = 0; i < value.length; i++) {
        if (i !== index && !isEqual$1(value[i], item)) {
          return false;
        }
      }
      return true;
    }) ? "" : rule.message;
  },
  maxProperties: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    return Object.keys(value || {}).length <= Number(rule.maxProperties) ? "" : rule.message;
  },
  minProperties: function(value, rule) {
    if (isValidateEmpty(value))
      return "";
    return Object.keys(value || {}).length >= Number(rule.minProperties) ? "" : rule.message;
  }
};
extendSameRules(RULES, {
  maximum: "max",
  minimum: "min",
  maxItems: "max",
  minItems: "min",
  maxLength: "max",
  minLength: "min"
});
var __awaiter$2 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$2 = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    },
    trys: [],
    ops: []
  }, f2, y2, t2, g2;
  return g2 = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t2[1]) {
              _.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _.label < t2[2]) {
              _.label = t2[2];
              _.ops.push(op);
              break;
            }
            if (t2[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
registerValidateRules(RULES);
registerValidateLocale(locales);
registerValidateFormats(formats);
var validate = function(value, validator, options) {
  return __awaiter$2(void 0, void 0, void 0, function() {
    var validates, results, i, result, type, message;
    return __generator$2(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          validates = parseValidator(validator, options);
          results = {
            error: [],
            success: [],
            warning: []
          };
          i = 0;
          _a2.label = 1;
        case 1:
          if (!(i < validates.length))
            return [
              3,
              4
            ];
          return [
            4,
            validates[i](value, options === null || options === void 0 ? void 0 : options.context)
          ];
        case 2:
          result = _a2.sent();
          type = result.type, message = result.message;
          results[type] = results[type] || [];
          if (message) {
            results[type].push(message);
            if (options === null || options === void 0 ? void 0 : options.validateFirst)
              return [
                3,
                4
              ];
          }
          _a2.label = 3;
        case 3:
          i++;
          return [
            3,
            1
          ];
        case 4:
          return [
            2,
            results
          ];
      }
    });
  });
};
var LifeCycleTypes;
(function(LifeCycleTypes2) {
  LifeCycleTypes2["ON_FORM_INIT"] = "onFormInit";
  LifeCycleTypes2["ON_FORM_MOUNT"] = "onFormMount";
  LifeCycleTypes2["ON_FORM_UNMOUNT"] = "onFormUnmount";
  LifeCycleTypes2["ON_FORM_INPUT_CHANGE"] = "onFormInputChange";
  LifeCycleTypes2["ON_FORM_VALUES_CHANGE"] = "onFormValuesChange";
  LifeCycleTypes2["ON_FORM_INITIAL_VALUES_CHANGE"] = "onFormInitialValuesChange";
  LifeCycleTypes2["ON_FORM_SUBMIT"] = "onFormSubmit";
  LifeCycleTypes2["ON_FORM_RESET"] = "onFormReset";
  LifeCycleTypes2["ON_FORM_SUBMIT_START"] = "onFormSubmitStart";
  LifeCycleTypes2["ON_FORM_SUBMITTING"] = "onFormSubmitting";
  LifeCycleTypes2["ON_FORM_SUBMIT_END"] = "onFormSubmitEnd";
  LifeCycleTypes2["ON_FORM_SUBMIT_VALIDATE_START"] = "onFormSubmitValidateStart";
  LifeCycleTypes2["ON_FORM_SUBMIT_VALIDATE_SUCCESS"] = "onFormSubmitValidateSuccess";
  LifeCycleTypes2["ON_FORM_SUBMIT_VALIDATE_FAILED"] = "onFormSubmitValidateFailed";
  LifeCycleTypes2["ON_FORM_SUBMIT_VALIDATE_END"] = "onFormSubmitValidateEnd";
  LifeCycleTypes2["ON_FORM_SUBMIT_SUCCESS"] = "onFormSubmitSuccess";
  LifeCycleTypes2["ON_FORM_SUBMIT_FAILED"] = "onFormSubmitFailed";
  LifeCycleTypes2["ON_FORM_VALIDATE_START"] = "onFormValidateStart";
  LifeCycleTypes2["ON_FORM_VALIDATING"] = "onFormValidating";
  LifeCycleTypes2["ON_FORM_VALIDATE_SUCCESS"] = "onFormValidateSuccess";
  LifeCycleTypes2["ON_FORM_VALIDATE_FAILED"] = "onFormValidateFailed";
  LifeCycleTypes2["ON_FORM_VALIDATE_END"] = "onFormValidateEnd";
  LifeCycleTypes2["ON_FORM_GRAPH_CHANGE"] = "onFormGraphChange";
  LifeCycleTypes2["ON_FORM_LOADING"] = "onFormLoading";
  LifeCycleTypes2["ON_FIELD_INIT"] = "onFieldInit";
  LifeCycleTypes2["ON_FIELD_INPUT_VALUE_CHANGE"] = "onFieldInputValueChange";
  LifeCycleTypes2["ON_FIELD_VALUE_CHANGE"] = "onFieldValueChange";
  LifeCycleTypes2["ON_FIELD_INITIAL_VALUE_CHANGE"] = "onFieldInitialValueChange";
  LifeCycleTypes2["ON_FIELD_SUBMIT"] = "onFieldSubmit";
  LifeCycleTypes2["ON_FIELD_SUBMIT_START"] = "onFieldSubmitStart";
  LifeCycleTypes2["ON_FIELD_SUBMITTING"] = "onFieldSubmitting";
  LifeCycleTypes2["ON_FIELD_SUBMIT_END"] = "onFieldSubmitEnd";
  LifeCycleTypes2["ON_FIELD_SUBMIT_VALIDATE_START"] = "onFieldSubmitValidateStart";
  LifeCycleTypes2["ON_FIELD_SUBMIT_VALIDATE_SUCCESS"] = "onFieldSubmitValidateSuccess";
  LifeCycleTypes2["ON_FIELD_SUBMIT_VALIDATE_FAILED"] = "onFieldSubmitValidateFailed";
  LifeCycleTypes2["ON_FIELD_SUBMIT_VALIDATE_END"] = "onFieldSubmitValidateEnd";
  LifeCycleTypes2["ON_FIELD_SUBMIT_SUCCESS"] = "onFieldSubmitSuccess";
  LifeCycleTypes2["ON_FIELD_SUBMIT_FAILED"] = "onFieldSubmitFailed";
  LifeCycleTypes2["ON_FIELD_VALIDATE_START"] = "onFieldValidateStart";
  LifeCycleTypes2["ON_FIELD_VALIDATING"] = "onFieldValidating";
  LifeCycleTypes2["ON_FIELD_VALIDATE_SUCCESS"] = "onFieldValidateSuccess";
  LifeCycleTypes2["ON_FIELD_VALIDATE_FAILED"] = "onFieldValidateFailed";
  LifeCycleTypes2["ON_FIELD_VALIDATE_END"] = "onFieldValidateEnd";
  LifeCycleTypes2["ON_FIELD_LOADING"] = "onFieldLoading";
  LifeCycleTypes2["ON_FIELD_RESET"] = "onFieldReset";
  LifeCycleTypes2["ON_FIELD_MOUNT"] = "onFieldMount";
  LifeCycleTypes2["ON_FIELD_UNMOUNT"] = "onFieldUnmount";
})(LifeCycleTypes || (LifeCycleTypes = {}));
var ReservedProperties = {
  form: true,
  parent: true,
  props: true,
  caches: true,
  requests: true,
  disposers: true,
  heart: true,
  graph: true,
  indexes: true,
  fields: true,
  lifecycles: true,
  originValues: true,
  componentType: true,
  componentProps: true,
  decoratorType: true,
  decoratorProps: true
};
var RESPONSE_REQUEST_DURATION = 100;
var GlobalState = {
  lifecycles: [],
  context: [],
  effectStart: false,
  effectEnd: false,
  initializing: false
};
var NumberIndexReg = /^\.(\d+)/;
var __assign$d = globalThis && globalThis.__assign || function() {
  __assign$d = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$d.apply(this, arguments);
};
var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$1 = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    },
    trys: [],
    ops: []
  }, f2, y2, t2, g2;
  return g2 = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t2[1]) {
              _.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _.label < t2[2]) {
              _.label = t2[2];
              _.ops.push(op);
              break;
            }
            if (t2[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var isHTMLInputEvent = function(event, stopPropagation) {
  var _a2;
  if (stopPropagation === void 0) {
    stopPropagation = true;
  }
  if (event === null || event === void 0 ? void 0 : event.target) {
    if (isValid$4(event.target.value) || isValid$4(event.target.checked))
      return true;
    if (event.target.tagName && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA" && event.target.tagName !== "SELECT") {
      return false;
    }
    if (stopPropagation)
      (_a2 = event.stopPropagation) === null || _a2 === void 0 ? void 0 : _a2.call(event);
    return true;
  }
  return false;
};
var getValuesFromEvent = function(args) {
  return args.map(function(event) {
    if (event === null || event === void 0 ? void 0 : event.target) {
      if (isValid$4(event.target.value))
        return event.target.value;
      if (isValid$4(event.target.checked))
        return event.target.checked;
      return;
    }
    return event;
  });
};
var buildFieldPath = function(field) {
  var prevArray = false;
  return field.address.reduce(function(path, key, index) {
    var currentPath = path.concat([key]);
    var currentAddress = field.address.slice(0, index + 1);
    var current = field.form.fields[currentAddress.toString()];
    if (prevArray) {
      prevArray = false;
      return path;
    }
    if (index >= field.address.length - 1) {
      if (isVoidField(field)) {
        return currentPath;
      }
      return currentPath;
    }
    if (isVoidField(current)) {
      var parentAddress = field.address.slice(0, index);
      var parent_1 = field.form.fields[parentAddress.toString()];
      if (isArrayField(parent_1) && isNumberLike$1(key)) {
        prevArray = true;
        return currentPath;
      }
      return path;
    } else {
      prevArray = false;
    }
    return currentPath;
  }, new Path(""));
};
var buildNodeIndexes = function(field, address) {
  field.address = Path.parse(address);
  field.path = buildFieldPath(field);
  field.form.indexes.set(field.path.toString(), field.address.toString());
  return field;
};
var patchFieldStates = function(target, patches) {
  patches.forEach(function(_a2) {
    var _b;
    var type = _a2.type, address = _a2.address, oldAddress = _a2.oldAddress, payload = _a2.payload;
    if (type === "remove") {
      (_b = target[address]) === null || _b === void 0 ? void 0 : _b.dispose();
      delete target[address];
    } else if (type === "update") {
      if (payload) {
        target[address] = payload;
        if (target[oldAddress] === payload)
          delete target[oldAddress];
      }
      if (address && payload) {
        buildNodeIndexes(payload, address);
      }
    }
  });
};
var patchFormValues = function(form, path, source) {
  var update = function(path2, source2) {
    if (path2.length) {
      form.setValuesIn(path2, clone(source2));
    } else {
      Object.assign(form.values, clone(source2));
    }
  };
  var patch = function(source2, path2) {
    if (path2 === void 0) {
      path2 = [];
    }
    var targetValue = form.getValuesIn(path2);
    var targetField = form.query(path2).take();
    if (allowAssignDefaultValue(targetValue, source2)) {
      update(path2, source2);
    } else {
      if (isEmpty(source2))
        return;
      if (GlobalState.initializing)
        return;
      if (isPlainObj$1(targetValue) && isPlainObj$1(source2)) {
        each(source2, function(value, key) {
          patch(value, path2.concat(key));
        });
      } else {
        if (targetField) {
          if (!isVoidField(targetField) && !targetField.modified) {
            update(path2, source2);
          }
        } else if (form.initialized) {
          update(path2, source2);
        }
      }
    }
  };
  patch(source, path);
};
var matchFeedback = function(search, feedback) {
  if (!search || !feedback)
    return false;
  if (search.type && search.type !== feedback.type)
    return false;
  if (search.code && search.code !== feedback.code)
    return false;
  if (search.path && feedback.path) {
    if (!Path.parse(search.path).match(feedback.path))
      return false;
  }
  if (search.address && feedback.address) {
    if (!Path.parse(search.address).match(feedback.address))
      return false;
  }
  if (search.triggerType && search.triggerType !== feedback.triggerType)
    return false;
  return true;
};
var queryFeedbacks = function(field, search) {
  return field.feedbacks.filter(function(feedback) {
    var _a2, _b, _c;
    if (!((_a2 = feedback.messages) === null || _a2 === void 0 ? void 0 : _a2.length))
      return false;
    return matchFeedback(search, __assign$d(__assign$d({}, feedback), {
      address: (_b = field.address) === null || _b === void 0 ? void 0 : _b.toString(),
      path: (_c = field.path) === null || _c === void 0 ? void 0 : _c.toString()
    }));
  });
};
var queryFeedbackMessages = function(field, search) {
  return queryFeedbacks(field, search).reduce(function(buf, info) {
    return isEmpty(info.messages) ? buf : buf.concat(info.messages);
  }, []);
};
var updateFeedback = function(field, feedback) {
  if (!feedback)
    return;
  return batch(function() {
    var _a2, _b;
    if (!field.feedbacks.length) {
      if (!((_a2 = feedback.messages) === null || _a2 === void 0 ? void 0 : _a2.length)) {
        return;
      }
      field.feedbacks = [feedback];
    } else {
      var searched_1 = queryFeedbacks(field, feedback);
      if (searched_1.length) {
        field.feedbacks = field.feedbacks.reduce(function(buf, item) {
          var _a3;
          if (searched_1.includes(item)) {
            if ((_a3 = feedback.messages) === null || _a3 === void 0 ? void 0 : _a3.length) {
              item.messages = feedback.messages;
              return buf.concat(item);
            } else {
              return buf;
            }
          } else {
            return buf.concat(item);
          }
        }, []);
        return;
      } else if ((_b = feedback.messages) === null || _b === void 0 ? void 0 : _b.length) {
        field.feedbacks = field.feedbacks.concat(feedback);
      }
    }
  });
};
var validateToFeedbacks = function(field, triggerType) {
  return __awaiter$1(void 0, void 0, void 0, function() {
    var results;
    return __generator$1(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          return [
            4,
            validate(field.value, field.validator, {
              triggerType,
              validateFirst: field.props.validateFirst || field.form.props.validateFirst,
              context: field
            })
          ];
        case 1:
          results = _a2.sent();
          batch(function() {
            each(results, function(messages, type) {
              field.setFeedback({
                triggerType,
                type,
                code: pascalCase("validate-" + type),
                messages
              });
            });
          });
          return [
            2,
            results
          ];
      }
    });
  });
};
var setValidatorRule = function(field, name, value) {
  var _a2, _b, _c, _d;
  if (!isValid$4(value))
    return;
  var hasRule = parseValidatorDescriptions(field.validator).some(function(desc) {
    return name in desc;
  });
  var rule = (_a2 = {}, _a2[name] = value, _a2);
  if (hasRule) {
    if (isArr$2(field.validator)) {
      field.validator = field.validator.map(function(desc) {
        if (Object.prototype.hasOwnProperty.call(desc, name)) {
          desc[name] = value;
          return desc;
        }
        return desc;
      });
    } else if (isPlainObj$1(field.validator)) {
      field.validator[name] = value;
    } else {
      field.validator = (_b = {}, _b[name] = value, _b);
    }
  } else {
    if (isArr$2(field.validator)) {
      if (name === "required") {
        field.validator.unshift(rule);
      } else {
        field.validator.push(rule);
      }
    } else if (isPlainObj$1(field.validator)) {
      field.validator[name] = value;
    } else if (field.validator) {
      if (name === "required") {
        field.validator = [(_c = {}, _c[name] = value, _c), field.validator];
      } else {
        field.validator = [field.validator, (_d = {}, _d[name] = value, _d)];
      }
    } else {
      field.validator = [rule];
    }
  }
};
var spliceArrayState = function(field, props) {
  var _a2 = __assign$d({
    startIndex: 0,
    deleteCount: 0,
    insertCount: 0
  }, props), startIndex = _a2.startIndex, deleteCount = _a2.deleteCount, insertCount = _a2.insertCount;
  var address = field.address.toString();
  var addrLength = address.length;
  var fields = field.form.fields;
  var fieldPatches = [];
  var offset = insertCount - deleteCount;
  var isArrayChildren = function(identifier) {
    return identifier.indexOf(address) === 0 && identifier.length > addrLength;
  };
  var isAfterNode = function(identifier) {
    var _a3;
    var afterStr = identifier.substring(addrLength);
    var number = (_a3 = afterStr.match(NumberIndexReg)) === null || _a3 === void 0 ? void 0 : _a3[1];
    if (number === void 0)
      return false;
    var index = Number(number);
    return index > startIndex + deleteCount - 1;
  };
  var isInsertNode = function(identifier) {
    var _a3;
    var afterStr = identifier.substring(addrLength);
    var number = (_a3 = afterStr.match(NumberIndexReg)) === null || _a3 === void 0 ? void 0 : _a3[1];
    if (number === void 0)
      return false;
    var index = Number(number);
    return index >= startIndex && index < startIndex + insertCount;
  };
  var isDeleteNode = function(identifier) {
    var _a3;
    var preStr = identifier.substring(0, addrLength);
    var afterStr = identifier.substring(addrLength);
    var number = (_a3 = afterStr.match(NumberIndexReg)) === null || _a3 === void 0 ? void 0 : _a3[1];
    if (number === void 0)
      return false;
    var index = Number(number);
    return index >= startIndex && !fields["" + preStr + afterStr.replace(/^\.\d+/, "." + (index + deleteCount))];
  };
  var moveIndex = function(identifier) {
    var _a3;
    if (offset === 0)
      return identifier;
    var preStr = identifier.substring(0, addrLength);
    var afterStr = identifier.substring(addrLength);
    var number = (_a3 = afterStr.match(NumberIndexReg)) === null || _a3 === void 0 ? void 0 : _a3[1];
    if (number === void 0)
      return identifier;
    var index = Number(number) + offset;
    return "" + preStr + afterStr.replace(/^\.\d+/, "." + index);
  };
  batch(function() {
    each(fields, function(field2, identifier) {
      if (isArrayChildren(identifier)) {
        if (isAfterNode(identifier)) {
          var newIdentifier = moveIndex(identifier);
          fieldPatches.push({
            type: "update",
            address: newIdentifier,
            oldAddress: identifier,
            payload: field2
          });
        }
        if (isInsertNode(identifier) || isDeleteNode(identifier)) {
          fieldPatches.push({
            type: "remove",
            address: identifier
          });
        }
      }
    });
    patchFieldStates(fields, fieldPatches);
  });
  field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
};
var exchangeArrayState = function(field, props) {
  var _a2 = __assign$d({
    fromIndex: 0,
    toIndex: 0
  }, props), fromIndex = _a2.fromIndex, toIndex = _a2.toIndex;
  var address = field.address.toString();
  var fields = field.form.fields;
  var addrLength = address.length;
  var fieldPatches = [];
  var isArrayChildren = function(identifier) {
    return identifier.indexOf(address) === 0 && identifier.length > addrLength;
  };
  var isFromOrToNode = function(identifier) {
    var _a3;
    var afterStr = identifier.substring(addrLength);
    var number = (_a3 = afterStr.match(NumberIndexReg)) === null || _a3 === void 0 ? void 0 : _a3[1];
    if (number === void 0)
      return false;
    var index = Number(number);
    return index === toIndex || index === fromIndex;
  };
  var moveIndex = function(identifier) {
    var preStr = identifier.substring(0, addrLength);
    var afterStr = identifier.substring(addrLength);
    var number = afterStr.match(NumberIndexReg)[1];
    var current = Number(number);
    var index = current;
    if (index === fromIndex) {
      index = toIndex;
    } else {
      index = fromIndex;
    }
    return "" + preStr + afterStr.replace(/^\.\d+/, "." + index);
  };
  batch(function() {
    each(fields, function(field2, identifier) {
      if (isArrayChildren(identifier)) {
        if (isFromOrToNode(identifier)) {
          var newIdentifier = moveIndex(identifier);
          fieldPatches.push({
            type: "update",
            address: newIdentifier,
            oldAddress: identifier,
            payload: field2
          });
          if (!fields[newIdentifier]) {
            fieldPatches.push({
              type: "remove",
              address: identifier
            });
          }
        }
      }
    });
    patchFieldStates(fields, fieldPatches);
  });
  field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
};
var cleanupArrayChildren = function(field, start) {
  var address = field.address.toString();
  var fields = field.form.fields;
  var isArrayChildren = function(identifier) {
    return identifier.indexOf(address) === 0 && identifier.length > address.length;
  };
  var isNeedCleanup = function(identifier) {
    var _a2;
    var afterStr = identifier.slice(address.length);
    var number = (_a2 = afterStr.match(NumberIndexReg)) === null || _a2 === void 0 ? void 0 : _a2[1];
    if (number === void 0)
      return false;
    var index = Number(number);
    return index >= start;
  };
  batch(function() {
    each(fields, function(field2, identifier) {
      if (isArrayChildren(identifier) && isNeedCleanup(identifier)) {
        field2.destroy();
      }
    });
  });
};
var cleanupObjectChildren = function(field, keys) {
  if (keys.length === 0)
    return;
  var address = field.address.toString();
  var fields = field.form.fields;
  var isObjectChildren = function(identifier) {
    return identifier.indexOf(address) === 0 && identifier.length > address.length;
  };
  var isNeedCleanup = function(identifier) {
    var _a2;
    var afterStr = identifier.slice(address.length);
    var key = (_a2 = afterStr.match(/^\.([^.]+)/)) === null || _a2 === void 0 ? void 0 : _a2[1];
    if (key === void 0)
      return false;
    return keys.includes(key);
  };
  batch(function() {
    each(fields, function(field2, identifier) {
      if (isObjectChildren(identifier) && isNeedCleanup(identifier)) {
        field2.destroy();
      }
    });
  });
};
var initFieldUpdate = batch.scope.bound(function(field) {
  var form = field.form;
  var updates = Path.ensureIn(form, "requests.updates", []);
  var indexes = Path.ensureIn(form, "requests.updateIndexes", {});
  for (var index = 0; index < updates.length; index++) {
    var _a2 = updates[index], pattern = _a2.pattern, callbacks = _a2.callbacks;
    var removed = false;
    if (field.match(pattern)) {
      callbacks.forEach(function(callback) {
        field.setState(callback);
      });
      if (!pattern.isWildMatchPattern && !pattern.isMatchPattern) {
        updates.splice(index--, 1);
        removed = true;
      }
    }
    if (!removed) {
      indexes[pattern.toString()] = index;
    } else {
      delete indexes[pattern.toString()];
    }
  }
});
var subscribeUpdate = function(form, pattern, callback) {
  var updates = Path.ensureIn(form, "requests.updates", []);
  var indexes = Path.ensureIn(form, "requests.updateIndexes", {});
  var id = pattern.toString();
  var current = indexes[id];
  if (isValid$4(current)) {
    if (updates[current] && !updates[current].callbacks.some(function(fn) {
      return fn.toString() === callback.toString() ? fn === callback : false;
    })) {
      updates[current].callbacks.push(callback);
    }
  } else {
    indexes[id] = updates.length;
    updates.push({
      pattern,
      callbacks: [callback]
    });
  }
};
var setModelState = function(model, setter) {
  if (!model)
    return;
  var isSkipProperty = function(key) {
    if (key === "address" || key === "path")
      return true;
    if (key === "valid" || key === "invalid")
      return true;
    if (key === "componentType" || key === "componentProps")
      return true;
    if (key === "decoratorType" || key === "decoratorProps")
      return true;
    if (key === "validateStatus")
      return true;
    if (key === "errors" || key === "warnings" || key === "successes")
      return true;
    if ((key === "display" || key === "visible" || key === "hidden") && "selfDisplay" in setter && !isValid$4(setter.selfDisplay)) {
      return true;
    }
    if ((key === "pattern" || key === "editable" || key === "disabled" || key === "readOnly" || key === "readPretty") && "selfPattern" in setter && !isValid$4(setter.selfPattern)) {
      return true;
    }
    return false;
  };
  if (isFn$2(setter)) {
    setter(model);
  } else {
    Object.keys(setter || {}).forEach(function(key) {
      var value = setter[key];
      if (isFn$2(value))
        return;
      if (ReservedProperties[key])
        return;
      if (isSkipProperty(key))
        return;
      model[key] = value;
    });
  }
  return model;
};
var getModelState = function(model, getter) {
  if (isFn$2(getter)) {
    return getter(model);
  } else {
    return Object.keys(model || {}).reduce(function(buf, key) {
      var value = model[key];
      if (isFn$2(value)) {
        return buf;
      }
      if (ReservedProperties[key])
        return buf;
      if (key === "address" || key === "path") {
        buf[key] = value.toString();
        return buf;
      }
      buf[key] = toJS(value);
      return buf;
    }, {});
  }
};
var createStateSetter = function(model) {
  return batch.bound(function(state) {
    return setModelState(model, state);
  });
};
var createStateGetter = function(model) {
  return function(getter) {
    return getModelState(model, getter);
  };
};
var createBatchStateSetter = function(form) {
  return batch.bound(function(pattern, payload) {
    if (isQuery(pattern)) {
      pattern.forEach(function(field) {
        field.setState(payload);
      });
    } else if (isGeneralField(pattern)) {
      pattern.setState(payload);
    } else {
      var matchCount_1 = 0, path = Path.parse(pattern);
      form.query(path).forEach(function(field) {
        field.setState(payload);
        matchCount_1++;
      });
      if (matchCount_1 === 0 || path.isWildMatchPattern) {
        subscribeUpdate(form, path, payload);
      }
    }
  });
};
var createBatchStateGetter = function(form) {
  return function(pattern, payload) {
    if (isQuery(pattern)) {
      return pattern.take(payload);
    } else if (isGeneralField(pattern)) {
      return pattern.getState(payload);
    } else {
      return form.query(pattern).take(function(field) {
        return field.getState(payload);
      });
    }
  };
};
var triggerFormInitialValuesChange = function(form, change) {
  var path = change.path;
  if (path[path.length - 1] === "length")
    return;
  if (path[0] === "initialValues") {
    if (change.type === "add" || change.type === "set") {
      patchFormValues(form, path.slice(1), change.value);
    }
    if (form.initialized) {
      form.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE);
    }
  }
};
var triggerFormValuesChange = function(form, change) {
  var path = change.path;
  if (path[path.length - 1] === "length")
    return;
  if (path[0] === "values" && form.initialized) {
    form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE);
  }
};
var notify = function(target, formType, fieldType) {
  if (isForm(target)) {
    target.notify(formType);
  } else {
    target.notify(fieldType);
  }
};
var setValidating = function(target, validating) {
  clearTimeout(target.requests.validate);
  if (validating) {
    target.requests.validate = setTimeout(function() {
      batch(function() {
        target.validating = validating;
        notify(target, LifeCycleTypes.ON_FORM_VALIDATING, LifeCycleTypes.ON_FIELD_VALIDATING);
      });
    }, RESPONSE_REQUEST_DURATION);
    notify(target, LifeCycleTypes.ON_FORM_VALIDATE_START, LifeCycleTypes.ON_FIELD_VALIDATE_START);
  } else {
    if (target.validating !== validating) {
      target.validating = validating;
    }
    notify(target, LifeCycleTypes.ON_FORM_VALIDATE_END, LifeCycleTypes.ON_FIELD_VALIDATE_END);
  }
};
var setSubmitting = function(target, submitting) {
  clearTimeout(target.requests.submit);
  if (submitting) {
    target.requests.submit = setTimeout(function() {
      batch(function() {
        target.submitting = submitting;
        notify(target, LifeCycleTypes.ON_FORM_SUBMITTING, LifeCycleTypes.ON_FIELD_SUBMITTING);
      });
    }, RESPONSE_REQUEST_DURATION);
    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FIELD_SUBMIT_START);
  } else {
    if (target.submitting !== submitting) {
      target.submitting = submitting;
    }
    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_END, LifeCycleTypes.ON_FIELD_SUBMIT_END);
  }
};
var setLoading = function(target, loading) {
  clearTimeout(target.requests.loading);
  if (loading) {
    target.requests.loading = setTimeout(function() {
      batch(function() {
        target.loading = loading;
        notify(target, LifeCycleTypes.ON_FORM_LOADING, LifeCycleTypes.ON_FIELD_LOADING);
      });
    }, RESPONSE_REQUEST_DURATION);
  } else if (target.loading !== loading) {
    target.loading = loading;
  }
};
var batchSubmit = function(target, onSubmit) {
  return __awaiter$1(void 0, void 0, void 0, function() {
    var getValues, results, e_2;
    return __generator$1(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          getValues = function(target2) {
            if (isForm(target2)) {
              return toJS(target2.values);
            }
            return toJS(target2.value);
          };
          target.setSubmitting(true);
          _a2.label = 1;
        case 1:
          _a2.trys.push([1, 3, , 4]);
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START);
          return [
            4,
            target.validate()
          ];
        case 2:
          _a2.sent();
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS);
          return [
            3,
            4
          ];
        case 3:
          _a2.sent();
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED);
          return [
            3,
            4
          ];
        case 4:
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END);
          _a2.label = 5;
        case 5:
          _a2.trys.push([5, 9, , 10]);
          if (target.invalid) {
            throw target.errors;
          }
          if (!isFn$2(onSubmit))
            return [
              3,
              7
            ];
          return [
            4,
            onSubmit(getValues(target))
          ];
        case 6:
          results = _a2.sent();
          return [
            3,
            8
          ];
        case 7:
          results = getValues(target);
          _a2.label = 8;
        case 8:
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS, LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS);
          return [
            3,
            10
          ];
        case 9:
          e_2 = _a2.sent();
          target.setSubmitting(false);
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT_FAILED, LifeCycleTypes.ON_FIELD_SUBMIT_FAILED);
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT);
          throw e_2;
        case 10:
          target.setSubmitting(false);
          notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT);
          return [
            2,
            results
          ];
      }
    });
  });
};
var batchValidate = function(target, pattern, triggerType) {
  return __awaiter$1(void 0, void 0, void 0, function() {
    var tasks;
    return __generator$1(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          if (isForm(target))
            target.setValidating(true);
          else {
            if (target.pattern !== "editable" || target.display !== "visible" || target.unmounted)
              return [
                2
              ];
          }
          tasks = [];
          target.query(pattern).forEach(function(field) {
            if (!isVoidField(field)) {
              tasks.push(validateSelf(field, triggerType, field === target));
            }
          });
          return [
            4,
            Promise.all(tasks)
          ];
        case 1:
          _a2.sent();
          if (isForm(target))
            target.setValidating(false);
          if (target.invalid) {
            notify(target, LifeCycleTypes.ON_FORM_VALIDATE_FAILED, LifeCycleTypes.ON_FIELD_VALIDATE_FAILED);
            throw target.errors;
          }
          notify(target, LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS, LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS);
          return [
            2
          ];
      }
    });
  });
};
var batchReset = function(target, pattern, options) {
  return __awaiter$1(void 0, void 0, void 0, function() {
    var tasks;
    return __generator$1(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          tasks = [];
          target.query(pattern).forEach(function(field) {
            if (!isVoidField(field)) {
              tasks.push(resetSelf(field, options, target === field));
            }
          });
          notify(target, LifeCycleTypes.ON_FORM_RESET, LifeCycleTypes.ON_FIELD_RESET);
          return [
            4,
            Promise.all(tasks)
          ];
        case 1:
          _a2.sent();
          return [
            2
          ];
      }
    });
  });
};
var validateSelf = batch.bound(function(target, triggerType, noEmit) {
  if (noEmit === void 0) {
    noEmit = false;
  }
  return __awaiter$1(void 0, void 0, void 0, function() {
    var start, end, allTriggerTypes, results_1, i, payload, results;
    return __generator$1(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          start = function() {
            setValidating(target, true);
          };
          end = function() {
            setValidating(target, false);
            if (noEmit)
              return;
            if (target.selfValid) {
              target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS);
            } else {
              target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED);
            }
          };
          if (target.pattern !== "editable" || target.display !== "visible" || target.unmounted)
            return [
              2,
              {}
            ];
          start();
          if (!!triggerType)
            return [
              3,
              5
            ];
          allTriggerTypes = parseValidatorDescriptions(target.validator).map(function(desc) {
            return desc.triggerType;
          });
          results_1 = {};
          i = 0;
          _a2.label = 1;
        case 1:
          if (!(i < allTriggerTypes.length))
            return [
              3,
              4
            ];
          return [
            4,
            validateToFeedbacks(target, allTriggerTypes[i])
          ];
        case 2:
          payload = _a2.sent();
          each(payload, function(result, key) {
            results_1[key] = results_1[key] || [];
            results_1[key] = results_1[key].concat(result);
          });
          _a2.label = 3;
        case 3:
          i++;
          return [
            3,
            1
          ];
        case 4:
          end();
          return [
            2,
            results_1
          ];
        case 5:
          return [
            4,
            validateToFeedbacks(target, triggerType)
          ];
        case 6:
          results = _a2.sent();
          end();
          return [
            2,
            results
          ];
      }
    });
  });
});
var resetSelf = batch.bound(function(target, options, noEmit) {
  if (noEmit === void 0) {
    noEmit = false;
  }
  return __awaiter$1(void 0, void 0, void 0, function() {
    return __generator$1(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          target.modified = false;
          target.visited = false;
          target.feedbacks = [];
          target.inputValue = void 0;
          target.inputValues = [];
          if (options === null || options === void 0 ? void 0 : options.forceClear) {
            if (isArrayField(target)) {
              target.value = [];
            } else if (isObjectField(target)) {
              target.value = {};
            } else {
              target.value = void 0;
            }
          } else if (isValid$4(target.value)) {
            target.value = toJS(target.initialValue);
          }
          if (!noEmit) {
            target.notify(LifeCycleTypes.ON_FIELD_RESET);
          }
          if (!(options === null || options === void 0 ? void 0 : options.validate))
            return [
              3,
              2
            ];
          return [
            4,
            validateSelf(target)
          ];
        case 1:
          return [
            2,
            _a2.sent()
          ];
        case 2:
          return [
            2
          ];
      }
    });
  });
});
var getValidFormValues = function(values) {
  if (isObservable(values))
    return values;
  return clone(values || {});
};
var getValidFieldDefaultValue = function(value, initialValue) {
  if (allowAssignDefaultValue(value, initialValue))
    return initialValue;
  return value;
};
var allowAssignDefaultValue = function(target, source) {
  var isEmptyTarget = isEmpty(target);
  var isEmptySource = isEmpty(source);
  var isValidTarget = isValid$4(target);
  var isValidSource = isValid$4(source);
  if (!isValidTarget) {
    if (isValidSource) {
      return true;
    }
    return false;
  }
  if (isEmptyTarget) {
    if (isEmptySource) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};
var createReactions = function(field) {
  var reactions = toArr$1(field.props.reactions);
  field.form.addEffects(field, function() {
    reactions.forEach(function(reaction2) {
      if (isFn$2(reaction2)) {
        field.disposers.push(autorun(batch.scope.bound(function() {
          return reaction2(field);
        })));
      }
    });
  });
};
var initializeStart = function() {
  GlobalState.initializing = true;
};
var initializeEnd = function() {
  batch.endpoint(function() {
    GlobalState.initializing = false;
  });
};
var BaseField = function() {
  function BaseField2() {
    var _this = this;
    this.disposers = [];
    this.setTitle = function(title) {
      _this.title = title;
    };
    this.setDescription = function(description) {
      _this.description = description;
    };
    this.setDisplay = function(type) {
      _this.display = type;
    };
    this.setPattern = function(type) {
      _this.pattern = type;
    };
    this.setComponent = function(component, props) {
      if (component) {
        _this.componentType = component;
      }
      if (props) {
        _this.componentProps = _this.componentProps || {};
        Object.assign(_this.componentProps, props);
      }
    };
    this.setComponentProps = function(props) {
      if (props) {
        _this.componentProps = _this.componentProps || {};
        Object.assign(_this.componentProps, props);
      }
    };
    this.setDecorator = function(component, props) {
      if (component) {
        _this.decoratorType = component;
      }
      if (props) {
        _this.decoratorProps = _this.decoratorProps || {};
        Object.assign(_this.decoratorProps, props);
      }
    };
    this.setDecoratorProps = function(props) {
      if (props) {
        _this.decoratorProps = _this.decoratorProps || {};
        Object.assign(_this.decoratorProps, props);
      }
    };
    this.onInit = function() {
      _this.initialized = true;
      initFieldUpdate(_this);
      _this.notify(LifeCycleTypes.ON_FIELD_INIT);
    };
    this.onMount = function() {
      _this.mounted = true;
      _this.unmounted = false;
      _this.notify(LifeCycleTypes.ON_FIELD_MOUNT);
    };
    this.onUnmount = function() {
      _this.mounted = false;
      _this.unmounted = true;
      _this.notify(LifeCycleTypes.ON_FIELD_UNMOUNT);
    };
    this.query = function(pattern) {
      return new Query({
        pattern,
        base: _this.address,
        form: _this.form
      });
    };
    this.notify = function(type, payload) {
      return _this.form.notify(type, payload !== null && payload !== void 0 ? payload : _this);
    };
    this.dispose = function() {
      _this.disposers.forEach(function(dispose) {
        dispose();
      });
      _this.form.removeEffects(_this);
    };
    this.destroy = function() {
      _this.dispose();
      delete _this.form.fields[_this.address.toString()];
    };
    this.match = function(pattern) {
      return Path.parse(pattern).matchAliasGroup(_this.address, _this.path);
    };
  }
  BaseField2.prototype.makeIndexes = function(address) {
    this.form.fields[address.toString()] = this;
    buildNodeIndexes(this, address);
  };
  Object.defineProperty(BaseField2.prototype, "component", {
    get: function() {
      return [this.componentType, this.componentProps];
    },
    set: function(value) {
      var component = toArr$1(value);
      this.componentType = component[0];
      this.componentProps = component[1] || {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "decorator", {
    get: function() {
      return [this.decoratorType, this.decoratorProps];
    },
    set: function(value) {
      var decorator = toArr$1(value);
      this.decoratorType = decorator[0];
      this.decoratorProps = decorator[1] || {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "parent", {
    get: function() {
      var parent = this.address.parent();
      var identifier = parent.toString();
      while (!this.form.fields[identifier]) {
        parent = parent.parent();
        identifier = parent.toString();
        if (!identifier)
          return;
      }
      return this.form.fields[identifier];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "display", {
    get: function() {
      var _a2;
      var parentDisplay = (_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.display;
      if (parentDisplay && parentDisplay !== "visible") {
        if (this.selfDisplay && this.selfDisplay !== "visible")
          return this.selfDisplay;
        return parentDisplay;
      }
      if (isValid$4(this.selfDisplay))
        return this.selfDisplay;
      return parentDisplay || this.form.display || "visible";
    },
    set: function(display) {
      this.selfDisplay = display;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "pattern", {
    get: function() {
      var _a2;
      var parentPattern = (_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.pattern;
      if (isValid$4(this.selfPattern))
        return this.selfPattern;
      return parentPattern || this.form.pattern || "editable";
    },
    set: function(pattern) {
      this.selfPattern = pattern;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "editable", {
    get: function() {
      return this.pattern === "editable";
    },
    set: function(editable) {
      if (!isValid$4(editable))
        return;
      if (editable) {
        this.pattern = "editable";
      } else {
        this.pattern = "readPretty";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "disabled", {
    get: function() {
      return this.pattern === "disabled";
    },
    set: function(disabled) {
      if (!isValid$4(disabled))
        return;
      if (disabled) {
        this.pattern = "disabled";
      } else {
        this.pattern = "editable";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "readOnly", {
    get: function() {
      return this.pattern === "readOnly";
    },
    set: function(readOnly) {
      if (!isValid$4(readOnly))
        return;
      if (readOnly) {
        this.pattern = "readOnly";
      } else {
        this.pattern = "editable";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "readPretty", {
    get: function() {
      return this.pattern === "readPretty";
    },
    set: function(readPretty) {
      if (!isValid$4(readPretty))
        return;
      if (readPretty) {
        this.pattern = "readPretty";
      } else {
        this.pattern = "editable";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "hidden", {
    get: function() {
      return this.display === "hidden";
    },
    set: function(hidden) {
      if (!isValid$4(hidden))
        return;
      if (hidden) {
        this.display = "hidden";
      } else {
        this.display = "visible";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BaseField2.prototype, "visible", {
    get: function() {
      return this.display === "visible";
    },
    set: function(visible) {
      if (!isValid$4(visible))
        return;
      if (visible) {
        this.display = "visible";
      } else {
        this.display = "none";
      }
    },
    enumerable: false,
    configurable: true
  });
  return BaseField2;
}();
var __extends$3 = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    },
    trys: [],
    ops: []
  }, f2, y2, t2, g2;
  return g2 = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t2[1]) {
              _.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _.label < t2[2]) {
              _.label = t2[2];
              _.ops.push(op);
              break;
            }
            if (t2[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __read$5 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var Field$1 = function(_super) {
  __extends$3(Field2, _super);
  function Field2(address, props, form, designable) {
    var _this = _super.call(this) || this;
    _this.displayName = "Field";
    _this.caches = {};
    _this.requests = {};
    _this.setDataSource = function(dataSource) {
      _this.dataSource = dataSource;
    };
    _this.setFeedback = function(feedback) {
      updateFeedback(_this, feedback);
    };
    _this.setSelfErrors = function(messages) {
      _this.selfErrors = messages;
    };
    _this.setSelfWarnings = function(messages) {
      _this.selfWarnings = messages;
    };
    _this.setSelfSuccesses = function(messages) {
      _this.selfSuccesses = messages;
    };
    _this.setValidator = function(validator) {
      _this.validator = validator;
    };
    _this.setValidatorRule = function(name, value) {
      setValidatorRule(_this, name, value);
    };
    _this.setRequired = function(required) {
      _this.required = required;
    };
    _this.setValue = function(value) {
      _this.value = value;
    };
    _this.setInitialValue = function(initialValue) {
      _this.initialValue = initialValue;
    };
    _this.setLoading = function(loading) {
      setLoading(_this, loading);
    };
    _this.setValidating = function(validating) {
      setValidating(_this, validating);
    };
    _this.setSubmitting = function(submitting) {
      setSubmitting(_this, submitting);
    };
    _this.setState = createStateSetter(_this);
    _this.getState = createStateGetter(_this);
    _this.onInput = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(_this, void 0, void 0, function() {
        var values, value;
        var _a2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if ((_a2 = args[0]) === null || _a2 === void 0 ? void 0 : _a2.target) {
                if (!isHTMLInputEvent(args[0]))
                  return [
                    2
                  ];
              }
              values = getValuesFromEvent(args);
              value = values[0];
              this.caches.inputting = true;
              this.inputValue = value;
              this.inputValues = values;
              this.value = value;
              this.modified = true;
              this.form.modified = true;
              this.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE);
              this.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form);
              return [
                4,
                validateSelf(this, "onInput")
              ];
            case 1:
              _b.sent();
              this.caches.inputting = false;
              return [
                2
              ];
          }
        });
      });
    };
    _this.onFocus = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(_this, void 0, void 0, function() {
        var _a2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if ((_a2 = args[0]) === null || _a2 === void 0 ? void 0 : _a2.target) {
                if (!isHTMLInputEvent(args[0], false))
                  return [
                    2
                  ];
              }
              this.active = true;
              this.visited = true;
              return [
                4,
                validateSelf(this, "onFocus")
              ];
            case 1:
              _b.sent();
              return [
                2
              ];
          }
        });
      });
    };
    _this.onBlur = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(_this, void 0, void 0, function() {
        var _a2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if ((_a2 = args[0]) === null || _a2 === void 0 ? void 0 : _a2.target) {
                if (!isHTMLInputEvent(args[0], false))
                  return [
                    2
                  ];
              }
              this.active = false;
              return [
                4,
                validateSelf(this, "onBlur")
              ];
            case 1:
              _b.sent();
              return [
                2
              ];
          }
        });
      });
    };
    _this.validate = function(triggerType) {
      return batchValidate(_this, _this.address + ".**", triggerType);
    };
    _this.submit = function(onSubmit) {
      return batchSubmit(_this, onSubmit);
    };
    _this.reset = function(options) {
      return batchReset(_this, _this.address + ".**", options);
    };
    _this.queryFeedbacks = function(search) {
      return queryFeedbacks(_this, search);
    };
    _this.form = form;
    _this.props = props;
    _this.designable = designable;
    initializeStart();
    _this.makeIndexes(address);
    _this.initialize();
    _this.makeObservable();
    _this.makeReactive();
    _this.onInit();
    initializeEnd();
    return _this;
  }
  Field2.prototype.initialize = function() {
    this.initialized = false;
    this.loading = false;
    this.validating = false;
    this.submitting = false;
    this.modified = false;
    this.active = false;
    this.visited = false;
    this.mounted = false;
    this.unmounted = false;
    this.inputValues = [];
    this.inputValue = null;
    this.feedbacks = [];
    this.title = this.props.title;
    this.description = this.props.description;
    this.display = this.props.display;
    this.pattern = this.props.pattern;
    this.editable = this.props.editable;
    this.disabled = this.props.disabled;
    this.readOnly = this.props.readOnly;
    this.readPretty = this.props.readPretty;
    this.visible = this.props.visible;
    this.hidden = this.props.hidden;
    this.dataSource = this.props.dataSource;
    this.validator = this.props.validator;
    this.required = this.props.required;
    this.content = this.props.content;
    this.value = getValidFieldDefaultValue(this.props.value, this.props.initialValue);
    this.initialValue = this.props.initialValue;
    this.data = this.props.data;
    this.decorator = toArr$1(this.props.decorator);
    this.component = toArr$1(this.props.component);
  };
  Field2.prototype.makeObservable = function() {
    if (this.designable)
      return;
    define(this, {
      title: observable.ref,
      description: observable.ref,
      dataSource: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      loading: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      modified: observable.ref,
      active: observable.ref,
      visited: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      inputValue: observable.ref,
      inputValues: observable.ref,
      decoratorType: observable.ref,
      componentType: observable.ref,
      content: observable.ref,
      decoratorProps: observable,
      componentProps: observable,
      validator: observable.shallow,
      feedbacks: observable.shallow,
      data: observable.shallow,
      component: observable.computed,
      decorator: observable.computed,
      errors: observable.computed,
      warnings: observable.computed,
      successes: observable.computed,
      valid: observable.computed,
      invalid: observable.computed,
      selfErrors: observable.computed,
      selfWarnings: observable.computed,
      selfSuccesses: observable.computed,
      selfValid: observable.computed,
      selfInvalid: observable.computed,
      validateStatus: observable.computed,
      value: observable.computed,
      initialValue: observable.computed,
      display: observable.computed,
      pattern: observable.computed,
      required: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      disabled: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      editable: observable.computed,
      setDisplay: action,
      setTitle: action,
      setDescription: action,
      setDataSource: action,
      setValue: action,
      setPattern: action,
      setInitialValue: action,
      setLoading: action,
      setValidating: action,
      setFeedback: action,
      setSelfErrors: action,
      setSelfWarnings: action,
      setSelfSuccesses: action,
      setValidator: action,
      setRequired: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      validate: action,
      reset: action,
      onInit: batch,
      onInput: batch,
      onMount: batch,
      onUnmount: batch,
      onFocus: batch,
      onBlur: batch
    });
  };
  Field2.prototype.makeReactive = function() {
    var _this = this;
    if (this.designable)
      return;
    this.disposers.push(reaction(function() {
      return _this.value;
    }, function(value) {
      _this.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE);
      if (isValid$4(value) && _this.modified && !_this.caches.inputting) {
        validateSelf(_this);
      }
    }), reaction(function() {
      return _this.initialValue;
    }, function() {
      _this.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE);
    }), reaction(function() {
      return _this.display;
    }, function(display) {
      if (display === "visible") {
        if (isEmpty(_this.value)) {
          _this.setValue(_this.caches.value);
          _this.caches.value = void 0;
        }
      } else {
        _this.caches.value = toJS(_this.value);
        if (display === "none") {
          _this.form.deleteValuesIn(_this.path);
        }
      }
      if (display === "none" || display === "hidden") {
        _this.setFeedback({
          type: "error",
          messages: []
        });
      }
    }), reaction(function() {
      return [_this.pattern, _this.unmounted];
    }, function(_a2) {
      var _b = __read$5(_a2, 2), pattern = _b[0], unmounted = _b[1];
      if (pattern !== "editable" || unmounted) {
        _this.setFeedback({
          type: "error",
          messages: []
        });
      }
    }));
    createReactions(this);
  };
  Object.defineProperty(Field2.prototype, "selfErrors", {
    get: function() {
      return queryFeedbackMessages(this, {
        type: "error"
      });
    },
    set: function(messages) {
      this.setFeedback({
        type: "error",
        code: "EffectError",
        messages
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "errors", {
    get: function() {
      return this.form.queryFeedbacks({
        address: this.address + ".**",
        type: "error"
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "selfWarnings", {
    get: function() {
      return queryFeedbackMessages(this, {
        type: "warning"
      });
    },
    set: function(messages) {
      this.setFeedback({
        type: "warning",
        code: "EffectWarning",
        messages
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "warnings", {
    get: function() {
      return this.form.queryFeedbacks({
        address: this.address + ".**",
        type: "warning"
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "selfSuccesses", {
    get: function() {
      return queryFeedbackMessages(this, {
        type: "success"
      });
    },
    set: function(messages) {
      this.setFeedback({
        type: "success",
        code: "EffectSuccess",
        messages
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "successes", {
    get: function() {
      return this.form.queryFeedbacks({
        address: this.address + ".**",
        type: "success"
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "selfValid", {
    get: function() {
      return !this.selfErrors.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "valid", {
    get: function() {
      return !this.errors.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "selfInvalid", {
    get: function() {
      return !this.selfValid;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "invalid", {
    get: function() {
      return !this.valid;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "value", {
    get: function() {
      return this.form.getValuesIn(this.path);
    },
    set: function(value) {
      if (!this.initialized) {
        if (this.display === "none") {
          this.caches.value = value;
          return;
        }
        if (!allowAssignDefaultValue(this.value, value) && !this.designable) {
          return;
        }
      }
      this.form.setValuesIn(this.path, value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "initialValue", {
    get: function() {
      return this.form.getInitialValuesIn(this.path);
    },
    set: function(initialValue) {
      if (!this.initialized) {
        if (!allowAssignDefaultValue(this.initialValue, initialValue) && !this.designable) {
          return;
        }
      }
      this.form.setInitialValuesIn(this.path, initialValue);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "required", {
    get: function() {
      return parseValidatorDescriptions(this.validator).some(function(desc) {
        return desc.required;
      });
    },
    set: function(required) {
      if (this.required === required)
        return;
      this.setValidatorRule("required", required);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field2.prototype, "validateStatus", {
    get: function() {
      if (this.validating)
        return "validating";
      if (this.selfInvalid)
        return "error";
      if (this.selfWarnings.length)
        return "warning";
      if (this.selfSuccesses.length)
        return "success";
    },
    enumerable: false,
    configurable: true
  });
  return Field2;
}(BaseField);
var __read$4 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __spreadArray$2 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var createEffectHook = function(type, callback) {
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (GlobalState.effectStart) {
      GlobalState.lifecycles.push(new LifeCycle(type, function(payload, ctx) {
        if (isFn$2(callback)) {
          callback.apply(void 0, __spreadArray$2([payload, ctx], __read$4(GlobalState.context), false)).apply(void 0, __spreadArray$2([], __read$4(args), false));
        }
      }));
    } else {
      throw new Error("Effect hooks cannot be used in asynchronous function body");
    }
  };
};
var createEffectContext = function(defaultValue) {
  var index;
  return {
    provide: function(value) {
      if (GlobalState.effectStart) {
        index = GlobalState.context.length;
        GlobalState.context[index] = isValid$4(value) ? value : defaultValue;
      } else {
        throw new Error("Provide method cannot be used in asynchronous function body");
      }
    },
    consume: function() {
      if (!GlobalState.effectStart) {
        throw new Error("Consume method cannot be used in asynchronous function body");
      }
      return GlobalState.context[index];
    }
  };
};
var FormEffectContext = createEffectContext();
var runEffects = function(context) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  GlobalState.lifecycles = [];
  GlobalState.context = [];
  GlobalState.effectStart = true;
  GlobalState.effectEnd = false;
  if (isForm(context)) {
    FormEffectContext.provide(context);
  }
  args.forEach(function(effects) {
    if (isFn$2(effects)) {
      effects(context);
    }
  });
  GlobalState.context = [];
  GlobalState.effectStart = false;
  GlobalState.effectEnd = true;
  return GlobalState.lifecycles;
};
var __extends$2 = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var __read$3 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __spreadArray$1 = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var ArrayField = function(_super) {
  __extends$2(ArrayField2, _super);
  function ArrayField2(address, props, form, designable) {
    var _this = _super.call(this, address, props, form, designable) || this;
    _this.displayName = "ArrayField";
    _this.push = function() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      return action(function() {
        var _a2;
        if (!isArr$2(_this.value)) {
          _this.value = [];
        }
        (_a2 = _this.value).push.apply(_a2, __spreadArray$1([], __read$3(items), false));
        return _this.onInput(_this.value);
      });
    };
    _this.pop = function() {
      if (!isArr$2(_this.value))
        return;
      return action(function() {
        var index = _this.value.length - 1;
        spliceArrayState(_this, {
          startIndex: index,
          deleteCount: 1
        });
        _this.value.pop();
        return _this.onInput(_this.value);
      });
    };
    _this.insert = function(index) {
      var items = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
      }
      return action(function() {
        var _a2;
        if (!isArr$2(_this.value)) {
          _this.value = [];
        }
        spliceArrayState(_this, {
          startIndex: index,
          insertCount: items.length
        });
        (_a2 = _this.value).splice.apply(_a2, __spreadArray$1([index, 0], __read$3(items), false));
        return _this.onInput(_this.value);
      });
    };
    _this.remove = function(index) {
      if (!isArr$2(_this.value))
        return;
      return action(function() {
        spliceArrayState(_this, {
          startIndex: index,
          deleteCount: 1
        });
        _this.value.splice(index, 1);
        return _this.onInput(_this.value);
      });
    };
    _this.shift = function() {
      if (!isArr$2(_this.value))
        return;
      return action(function() {
        _this.value.shift();
        return _this.onInput(_this.value);
      });
    };
    _this.unshift = function() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      return action(function() {
        var _a2;
        if (!isArr$2(_this.value)) {
          _this.value = [];
        }
        spliceArrayState(_this, {
          startIndex: 0,
          insertCount: items.length
        });
        (_a2 = _this.value).unshift.apply(_a2, __spreadArray$1([], __read$3(items), false));
        return _this.onInput(_this.value);
      });
    };
    _this.move = function(fromIndex, toIndex) {
      if (!isArr$2(_this.value))
        return;
      if (fromIndex === toIndex)
        return;
      return action(function() {
        var fromItem = _this.value[fromIndex];
        _this.value.splice(fromIndex, 1);
        _this.value.splice(toIndex, 0, fromItem);
        exchangeArrayState(_this, {
          fromIndex,
          toIndex
        });
        return _this.onInput(_this.value);
      });
    };
    _this.moveUp = function(index) {
      if (!isArr$2(_this.value))
        return;
      return _this.move(index, index - 1 < 0 ? _this.value.length - 1 : index - 1);
    };
    _this.moveDown = function(index) {
      if (!isArr$2(_this.value))
        return;
      return _this.move(index, index + 1 >= _this.value.length ? 0 : index + 1);
    };
    _this.makeAutoCleanable();
    return _this;
  }
  ArrayField2.prototype.makeAutoCleanable = function() {
    var _this = this;
    this.disposers.push(reaction(function() {
      var _a2;
      return (_a2 = _this.value) === null || _a2 === void 0 ? void 0 : _a2.length;
    }, function(newLength, oldLength) {
      if (oldLength && !newLength) {
        cleanupArrayChildren(_this, 0);
      } else if (newLength < oldLength) {
        cleanupArrayChildren(_this, newLength);
      }
    }));
  };
  return ArrayField2;
}(Field$1);
var __extends$1 = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var ObjectField = function(_super) {
  __extends$1(ObjectField2, _super);
  function ObjectField2(address, props, form, designable) {
    var _this = _super.call(this, address, props, form, designable) || this;
    _this.displayName = "ObjectField";
    _this.additionalProperties = [];
    _this.addProperty = function(key, value) {
      _this.form.setValuesIn(_this.path.concat(key), value);
      _this.additionalProperties.push(key);
      return _this.onInput(_this.value);
    };
    _this.removeProperty = function(key) {
      _this.form.deleteValuesIn(_this.path.concat(key));
      _this.additionalProperties.splice(_this.additionalProperties.indexOf(key), 1);
      return _this.onInput(_this.value);
    };
    _this.existProperty = function(key) {
      return _this.form.existValuesIn(_this.path.concat(key));
    };
    _this.makeAutoCleanable();
    return _this;
  }
  ObjectField2.prototype.makeAutoCleanable = function() {
    var _this = this;
    this.disposers.push(reaction(function() {
      return Object.keys(_this.value || {});
    }, function(newKeys) {
      var filterKeys = _this.additionalProperties.filter(function(key) {
        return !newKeys.includes(key);
      });
      cleanupObjectChildren(_this, filterKeys);
    }));
  };
  return ObjectField2;
}(Field$1);
var __extends = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var VoidField = function(_super) {
  __extends(VoidField2, _super);
  function VoidField2(address, props, form, designable) {
    var _this = _super.call(this) || this;
    _this.displayName = "VoidField";
    _this.setState = createStateSetter(_this);
    _this.getState = createStateGetter(_this);
    _this.form = form;
    _this.props = props;
    _this.designable = designable;
    initializeStart();
    _this.makeIndexes(address);
    _this.initialize();
    _this.makeObservable();
    _this.makeReactive();
    _this.onInit();
    initializeEnd();
    return _this;
  }
  VoidField2.prototype.initialize = function() {
    this.mounted = false;
    this.unmounted = false;
    this.initialized = false;
    this.title = this.props.title;
    this.description = this.props.description;
    this.pattern = this.props.pattern;
    this.display = this.props.display;
    this.hidden = this.props.hidden;
    this.editable = this.props.editable;
    this.disabled = this.props.disabled;
    this.readOnly = this.props.readOnly;
    this.readPretty = this.props.readPretty;
    this.visible = this.props.visible;
    this.content = this.props.content;
    this.data = this.props.data;
    this.decorator = toArr$1(this.props.decorator);
    this.component = toArr$1(this.props.component);
  };
  VoidField2.prototype.makeObservable = function() {
    if (this.designable)
      return;
    define(this, {
      title: observable.ref,
      description: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      decoratorType: observable.ref,
      componentType: observable.ref,
      content: observable.ref,
      data: observable.shallow,
      decoratorProps: observable,
      componentProps: observable,
      display: observable.computed,
      pattern: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      disabled: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      editable: observable.computed,
      component: observable.computed,
      decorator: observable.computed,
      setTitle: action,
      setDescription: action,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      onInit: batch,
      onMount: batch,
      onUnmount: batch
    });
  };
  VoidField2.prototype.makeReactive = function() {
    if (this.designable)
      return;
    createReactions(this);
  };
  return VoidField2;
}(BaseField);
var __assign$c = globalThis && globalThis.__assign || function() {
  __assign$c = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$c.apply(this, arguments);
};
var DEV_TOOLS_HOOK = "__FORMILY_DEV_TOOLS_HOOK__";
var Form = function() {
  function Form2(props) {
    var _this = this;
    this.displayName = "Form";
    this.fields = {};
    this.requests = {};
    this.indexes = new Map();
    this.disposers = [];
    this.createField = function(props2) {
      var address = Path.parse(props2.basePath).concat(props2.name);
      var identifier = address.toString();
      if (!identifier)
        return;
      if (!_this.fields[identifier] || _this.props.designable) {
        batch(function() {
          new Field$1(address, props2, _this, _this.props.designable);
        });
        _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
      }
      return _this.fields[identifier];
    };
    this.createArrayField = function(props2) {
      var address = Path.parse(props2.basePath).concat(props2.name);
      var identifier = address.toString();
      if (!identifier)
        return;
      if (!_this.fields[identifier] || _this.props.designable) {
        batch(function() {
          new ArrayField(address, __assign$c(__assign$c({}, props2), {
            value: isArr$2(props2.value) ? props2.value : []
          }), _this, _this.props.designable);
        });
        _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
      }
      return _this.fields[identifier];
    };
    this.createObjectField = function(props2) {
      var address = Path.parse(props2.basePath).concat(props2.name);
      var identifier = address.toString();
      if (!identifier)
        return;
      if (!_this.fields[identifier] || _this.props.designable) {
        batch(function() {
          new ObjectField(address, __assign$c(__assign$c({}, props2), {
            value: isObj$1(props2.value) ? props2.value : {}
          }), _this, _this.props.designable);
        });
        _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
      }
      return _this.fields[identifier];
    };
    this.createVoidField = function(props2) {
      var address = Path.parse(props2.basePath).concat(props2.name);
      var identifier = address.toString();
      if (!identifier)
        return;
      if (!_this.fields[identifier] || _this.props.designable) {
        batch(function() {
          new VoidField(address, props2, _this, _this.props.designable);
        });
        _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
      }
      return _this.fields[identifier];
    };
    this.setValues = function(values, strategy) {
      if (strategy === void 0) {
        strategy = "merge";
      }
      if (!isPlainObj$1(values))
        return;
      if (strategy === "merge" || strategy === "deepMerge") {
        _this.values = merge(_this.values, values, {
          arrayMerge: function(target, source) {
            return source;
          }
        });
      } else if (strategy === "shallowMerge") {
        _this.values = Object.assign(_this.values, values);
      } else {
        _this.values = values;
      }
    };
    this.setInitialValues = function(initialValues, strategy) {
      if (strategy === void 0) {
        strategy = "merge";
      }
      if (!isPlainObj$1(initialValues))
        return;
      if (strategy === "merge" || strategy === "deepMerge") {
        _this.initialValues = merge(_this.initialValues, initialValues, {
          arrayMerge: function(target, source) {
            return source;
          }
        });
      } else if (strategy === "shallowMerge") {
        _this.initialValues = Object.assign(_this.initialValues, initialValues);
      } else {
        _this.initialValues = initialValues;
      }
    };
    this.setValuesIn = function(pattern, value) {
      Path.setIn(_this.values, pattern, value);
    };
    this.deleteValuesIn = function(pattern) {
      Path.deleteIn(_this.values, pattern);
    };
    this.existValuesIn = function(pattern) {
      return Path.existIn(_this.values, pattern);
    };
    this.getValuesIn = function(pattern) {
      return Path.getIn(_this.values, pattern);
    };
    this.setInitialValuesIn = function(pattern, initialValue) {
      Path.setIn(_this.initialValues, pattern, initialValue);
    };
    this.deleteInitialValuesIn = function(pattern) {
      Path.deleteIn(_this.initialValues, pattern);
    };
    this.existInitialValuesIn = function(pattern) {
      return Path.existIn(_this.initialValues, pattern);
    };
    this.getInitialValuesIn = function(pattern) {
      return Path.getIn(_this.initialValues, pattern);
    };
    this.setLoading = function(loading) {
      setLoading(_this, loading);
    };
    this.setSubmitting = function(submitting) {
      setSubmitting(_this, submitting);
    };
    this.setValidating = function(validating) {
      setValidating(_this, validating);
    };
    this.setDisplay = function(display) {
      _this.display = display;
    };
    this.setPattern = function(pattern) {
      _this.pattern = pattern;
    };
    this.addEffects = function(id, effects) {
      if (!_this.heart.hasLifeCycles(id)) {
        _this.heart.addLifeCycles(id, runEffects(_this, effects));
      }
    };
    this.removeEffects = function(id) {
      _this.heart.removeLifeCycles(id);
    };
    this.setEffects = function(effects) {
      _this.heart.setLifeCycles(runEffects(_this, effects));
    };
    this.clearErrors = function(pattern) {
      if (pattern === void 0) {
        pattern = "*";
      }
      _this.query(pattern).forEach(function(field) {
        if (!isVoidField(field)) {
          field.setFeedback({
            type: "error",
            messages: []
          });
        }
      });
    };
    this.clearWarnings = function(pattern) {
      if (pattern === void 0) {
        pattern = "*";
      }
      _this.query(pattern).forEach(function(field) {
        if (!isVoidField(field)) {
          field.setFeedback({
            type: "warning",
            messages: []
          });
        }
      });
    };
    this.clearSuccesses = function(pattern) {
      if (pattern === void 0) {
        pattern = "*";
      }
      _this.query(pattern).forEach(function(field) {
        if (!isVoidField(field)) {
          field.setFeedback({
            type: "success",
            messages: []
          });
        }
      });
    };
    this.query = function(pattern) {
      return new Query({
        pattern,
        base: "",
        form: _this
      });
    };
    this.queryFeedbacks = function(search) {
      return _this.query(search.address || search.path || "*").reduce(function(messages, field) {
        if (isVoidField(field))
          return messages;
        return messages.concat(field.queryFeedbacks(search).map(function(feedback) {
          return __assign$c(__assign$c({}, feedback), {
            address: field.address.toString(),
            path: field.path.toString()
          });
        }).filter(function(feedback) {
          return feedback.messages.length > 0;
        }));
      }, []);
    };
    this.notify = function(type, payload) {
      _this.heart.publish(type, payload !== null && payload !== void 0 ? payload : _this);
    };
    this.subscribe = function(subscriber) {
      return _this.heart.subscribe(subscriber);
    };
    this.unsubscribe = function(id) {
      _this.heart.unsubscribe(id);
    };
    this.onInit = function() {
      _this.initialized = true;
      _this.notify(LifeCycleTypes.ON_FORM_INIT);
    };
    this.onMount = function() {
      _this.mounted = true;
      _this.notify(LifeCycleTypes.ON_FORM_MOUNT);
      if (globalThisPolyfill$1[DEV_TOOLS_HOOK] && !_this.props.designable) {
        globalThisPolyfill$1[DEV_TOOLS_HOOK].inject(_this.id, _this);
      }
    };
    this.onUnmount = function() {
      _this.notify(LifeCycleTypes.ON_FORM_UNMOUNT);
      _this.query("*").forEach(function(field) {
        return field.destroy();
      });
      _this.disposers.forEach(function(dispose) {
        return dispose();
      });
      _this.unmounted = true;
      _this.indexes.clear();
      _this.heart.clear();
      if (globalThisPolyfill$1[DEV_TOOLS_HOOK] && !_this.props.designable) {
        globalThisPolyfill$1[DEV_TOOLS_HOOK].unmount(_this.id);
      }
    };
    this.setState = createStateSetter(this);
    this.getState = createStateGetter(this);
    this.setFormState = createStateSetter(this);
    this.getFormState = createStateGetter(this);
    this.setFieldState = createBatchStateSetter(this);
    this.getFieldState = createBatchStateGetter(this);
    this.getFormGraph = function() {
      return _this.graph.getGraph();
    };
    this.setFormGraph = function(graph) {
      _this.graph.setGraph(graph);
    };
    this.clearFormGraph = function(pattern) {
      if (pattern === void 0) {
        pattern = "*";
      }
      _this.query(pattern).forEach(function(field) {
        field.destroy();
      });
    };
    this.validate = function(pattern) {
      if (pattern === void 0) {
        pattern = "*";
      }
      return batchValidate(_this, pattern);
    };
    this.submit = function(onSubmit) {
      return batchSubmit(_this, onSubmit);
    };
    this.reset = function(pattern, options) {
      if (pattern === void 0) {
        pattern = "*";
      }
      return batchReset(_this, pattern, options);
    };
    this.initialize(props);
    this.makeObservable();
    this.makeReactive();
    this.makeValues();
    this.onInit();
  }
  Form2.prototype.initialize = function(props) {
    this.id = uid();
    this.props = __assign$c({}, props);
    this.initialized = false;
    this.submitting = false;
    this.validating = false;
    this.loading = false;
    this.modified = false;
    this.mounted = false;
    this.unmounted = false;
    this.display = this.props.display || "visible";
    this.pattern = this.props.pattern || "editable";
    this.editable = this.props.editable;
    this.disabled = this.props.disabled;
    this.readOnly = this.props.readOnly;
    this.readPretty = this.props.readPretty;
    this.visible = this.props.visible;
    this.hidden = this.props.hidden;
    this.graph = new Graph(this);
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this
    });
  };
  Form2.prototype.makeValues = function() {
    this.values = getValidFormValues(this.props.values);
    this.initialValues = getValidFormValues(this.props.initialValues);
  };
  Form2.prototype.makeObservable = function() {
    define(this, {
      fields: observable.shallow,
      initialized: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      loading: observable.ref,
      modified: observable.ref,
      pattern: observable.ref,
      display: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      values: observable,
      initialValues: observable,
      valid: observable.computed,
      invalid: observable.computed,
      errors: observable.computed,
      warnings: observable.computed,
      successes: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      editable: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      disabled: observable.computed,
      setValues: action,
      setValuesIn: action,
      setInitialValues: action,
      setInitialValuesIn: action,
      setPattern: action,
      setDisplay: action,
      setState: action,
      deleteInitialValuesIn: action,
      deleteValuesIn: action,
      setSubmitting: action,
      setValidating: action,
      setFormGraph: action,
      clearFormGraph: action,
      reset: action,
      submit: action,
      validate: action,
      onMount: batch,
      onUnmount: batch,
      onInit: batch
    });
  };
  Form2.prototype.makeReactive = function() {
    var _this = this;
    this.disposers.push(observe(this, function(change) {
      triggerFormInitialValuesChange(_this, change);
      triggerFormValuesChange(_this, change);
    }, true));
  };
  Object.defineProperty(Form2.prototype, "valid", {
    get: function() {
      return !this.invalid;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "invalid", {
    get: function() {
      return this.errors.length > 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "errors", {
    get: function() {
      return this.queryFeedbacks({
        type: "error"
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "warnings", {
    get: function() {
      return this.queryFeedbacks({
        type: "warning"
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "successes", {
    get: function() {
      return this.queryFeedbacks({
        type: "success"
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "lifecycles", {
    get: function() {
      return runEffects(this, this.props.effects);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "hidden", {
    get: function() {
      return this.display === "hidden";
    },
    set: function(hidden) {
      if (!isValid$4(hidden))
        return;
      if (hidden) {
        this.display = "hidden";
      } else {
        this.display = "visible";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "visible", {
    get: function() {
      return this.display === "visible";
    },
    set: function(visible) {
      if (!isValid$4(visible))
        return;
      if (visible) {
        this.display = "visible";
      } else {
        this.display = "none";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "editable", {
    get: function() {
      return this.pattern === "editable";
    },
    set: function(editable) {
      if (!isValid$4(editable))
        return;
      if (editable) {
        this.pattern = "editable";
      } else {
        this.pattern = "readPretty";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "readOnly", {
    get: function() {
      return this.pattern === "readOnly";
    },
    set: function(readOnly) {
      if (!isValid$4(readOnly))
        return;
      if (readOnly) {
        this.pattern = "readOnly";
      } else {
        this.pattern = "editable";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "disabled", {
    get: function() {
      return this.pattern === "disabled";
    },
    set: function(disabled) {
      if (!isValid$4(disabled))
        return;
      if (disabled) {
        this.pattern = "disabled";
      } else {
        this.pattern = "editable";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form2.prototype, "readPretty", {
    get: function() {
      return this.pattern === "readPretty";
    },
    set: function(readPretty) {
      if (!isValid$4(readPretty))
        return;
      if (readPretty) {
        this.pattern = "readPretty";
      } else {
        this.pattern = "editable";
      }
    },
    enumerable: false,
    configurable: true
  });
  return Form2;
}();
function createFormEffect(type) {
  return createEffectHook(type, function(form) {
    return function(callback) {
      batch(function() {
        callback(form);
      });
    };
  });
}
createFormEffect(LifeCycleTypes.ON_FORM_INIT);
createFormEffect(LifeCycleTypes.ON_FORM_MOUNT);
createFormEffect(LifeCycleTypes.ON_FORM_UNMOUNT);
createFormEffect(LifeCycleTypes.ON_FORM_VALUES_CHANGE);
createFormEffect(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE);
createFormEffect(LifeCycleTypes.ON_FORM_INPUT_CHANGE);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT);
createFormEffect(LifeCycleTypes.ON_FORM_RESET);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_START);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_END);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_FAILED);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED);
createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END);
createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_START);
createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS);
createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_FAILED);
createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_END);
createFormEffect(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
createFormEffect(LifeCycleTypes.ON_FORM_LOADING);
function createFieldEffect(type) {
  return createEffectHook(type, function(field, form) {
    return function(pattern, callback) {
      if (Path.parse(pattern).matchAliasGroup(field.address, field.path)) {
        batch(function() {
          callback(field, form);
        });
      }
    };
  });
}
createFieldEffect(LifeCycleTypes.ON_FIELD_INIT);
createFieldEffect(LifeCycleTypes.ON_FIELD_MOUNT);
createFieldEffect(LifeCycleTypes.ON_FIELD_UNMOUNT);
createFieldEffect(LifeCycleTypes.ON_FIELD_VALUE_CHANGE);
createFieldEffect(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE);
createFieldEffect(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE);
createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_START);
createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_END);
createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATING);
createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED);
createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_START);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_END);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_FAILED);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS);
createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED);
createFieldEffect(LifeCycleTypes.ON_FIELD_RESET);
createFieldEffect(LifeCycleTypes.ON_FIELD_LOADING);
var __assign$b = globalThis && globalThis.__assign || function() {
  __assign$b = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$b.apply(this, arguments);
};
globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __assign$a = globalThis && globalThis.__assign || function() {
  __assign$a = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$a.apply(this, arguments);
};
var polyfills = {};
var registerPolyfills = function(version, patch) {
  if (version && isFn$2(patch)) {
    polyfills[version] = polyfills[version] || [];
    polyfills[version].push(patch);
  }
};
var __assign$9 = globalThis && globalThis.__assign || function() {
  __assign$9 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$9.apply(this, arguments);
};
globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var VOID_COMPONENTS = ["card", "block", "grid-col", "grid-row", "grid", "layout", "step", "tab", "text-box"];
var TYPE_DEFAULT_COMPONENTS = {};
var transformCondition = function(condition) {
  if (isStr$1(condition)) {
    return condition.replace(/\$value/, "$self.value");
  }
};
var transformXLinkage = function(linkages) {
  if (isArr$2(linkages)) {
    return linkages.reduce(function(buf, item) {
      if (!item)
        return buf;
      if (item.type === "value:visible") {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fulfill: {
            state: {
              visible: true
            }
          },
          otherwise: {
            state: {
              visible: false
            }
          }
        });
      } else if (item.type === "value:schema") {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fulfill: {
            schema: SpecificationV1Polyfill(__assign$9({
              version: "1.0"
            }, item.schema))
          },
          otherwise: {
            schema: SpecificationV1Polyfill(__assign$9({
              version: "1.0"
            }, item.otherwise))
          }
        });
      } else if (item.type === "value:state") {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fulfill: {
            state: item.state
          },
          otherwise: {
            state: item.otherwise
          }
        });
      }
    }, []);
  }
  return [];
};
var SpecificationV1Polyfill = function(schema) {
  if (isValid$4(schema["editable"])) {
    schema["x-editable"] = schema["x-editable"] || schema["editable"];
    delete schema["editable"];
  }
  if (isValid$4(schema["visible"])) {
    schema["x-visible"] = schema["x-visible"] || schema["visible"];
    delete schema["visible"];
  }
  if (isValid$4(schema["display"])) {
    schema["x-display"] = schema["x-display"] || (schema["display"] ? "visible" : "hidden");
    delete schema["display"];
  }
  if (isValid$4(schema["x-props"])) {
    schema["x-decorator-props"] = schema["x-decorator-props"] || schema["x-props"];
    delete schema["display"];
  }
  if (schema["x-linkages"]) {
    schema["x-reactions"] = toArr$1(schema["x-reactions"]).concat(transformXLinkage(schema["x-linkages"]));
    delete schema["x-linkages"];
  }
  if (schema["x-component"]) {
    if (VOID_COMPONENTS.some(function(component) {
      return lowerCase(component) === lowerCase(schema["x-component"]);
    })) {
      schema["type"] = "void";
    }
  } else {
    if (TYPE_DEFAULT_COMPONENTS[schema["type"]]) {
      schema["x-component"] = TYPE_DEFAULT_COMPONENTS[schema["type"]];
    }
  }
  if (!schema["x-decorator"] && schema["type"] !== "void" && schema["type"] !== "object") {
    schema["x-decorator"] = schema["x-decorator"] || "FormItem";
  }
  if (schema["x-rules"]) {
    schema["x-validator"] = [].concat(schema["x-validator"] || []).concat(schema["x-rules"]);
  }
  return schema;
};
registerPolyfills("1.0", SpecificationV1Polyfill);
var useAttach = function(target) {
  var oldTargetRef = useRef(null);
  useEffect(function() {
    if (oldTargetRef.current && target !== oldTargetRef.current) {
      oldTargetRef.current.onUnmount();
    }
    oldTargetRef.current = target;
    target.onMount();
    return function() {
      target.onUnmount();
    };
  }, [target]);
  return target;
};
var jsxRuntime = {
  exports: {}
};
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols$1) {
      symbols = getOwnPropertySymbols$1(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$1 = React, g$1 = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h$1 = Symbol.for;
  g$1 = h$1("react.element");
  reactJsxRuntime_production_min.Fragment = h$1("react.fragment");
}
var m$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n$1 = Object.prototype.hasOwnProperty, p$1 = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function q$1(c2, a, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a.key !== void 0 && (e2 = "" + a.key);
  a.ref !== void 0 && (l2 = a.ref);
  for (b2 in a)
    n$1.call(a, b2) && !p$1.hasOwnProperty(b2) && (d2[b2] = a[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a = c2.defaultProps, a)
      d2[b2] === void 0 && (d2[b2] = a[b2]);
  return {
    $$typeof: g$1,
    type: c2,
    key: e2,
    ref: l2,
    props: d2,
    _owner: m$1.current
  };
}
reactJsxRuntime_production_min.jsx = q$1;
reactJsxRuntime_production_min.jsxs = q$1;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
var createContextCleaner = function() {
  var contexts = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    contexts[_i] = arguments[_i];
  }
  return function(_a2) {
    var children = _a2.children;
    return contexts.reduce(function(buf, ctx) {
      return /* @__PURE__ */ jsx(ctx.Provider, {
        value: void 0,
        children: buf
      });
    }, children);
  };
};
var FormContext = createContext(null);
var FieldContext = createContext(null);
var SchemaMarkupContext = createContext(null);
var SchemaContext = createContext(null);
var SchemaExpressionScopeContext = createContext(null);
var SchemaOptionsContext = createContext(null);
createContextCleaner(FieldContext, SchemaMarkupContext, SchemaContext, SchemaExpressionScopeContext, SchemaOptionsContext);
var reactIs$1 = {
  exports: {}
};
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = typeof Symbol === "function" && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if (typeof a === "object" && a !== null) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h;
};
reactIs_production_min.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === e || a === m || a === g || a === f || a === p || a === q || typeof a === "object" && a !== null && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;
{
  reactIs$1.exports = reactIs_production_min;
}
var reactIs = reactIs$1.exports;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e2) {
        }
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;
function globalSelf() {
  try {
    if (typeof self !== "undefined") {
      return self;
    }
  } catch (e2) {
  }
  try {
    if (typeof window !== "undefined") {
      return window;
    }
  } catch (e2) {
  }
  try {
    if (typeof global !== "undefined") {
      return global;
    }
  } catch (e2) {
  }
  return Function("return this")();
}
var globalThisPolyfill = globalSelf();
var registry = globalThisPolyfill["FinalizationRegistry"] && new globalThisPolyfill["FinalizationRegistry"](function(token) {
  var _a2;
  return (_a2 = token === null || token === void 0 ? void 0 : token.clean) === null || _a2 === void 0 ? void 0 : _a2.call(token);
});
var GarbageCollector = function() {
  function GarbageCollector2(clean, expireTime) {
    if (expireTime === void 0) {
      expireTime = 1e4;
    }
    this.token = {
      clean
    };
    this.expireTime = expireTime;
  }
  GarbageCollector2.prototype.open = function(target) {
    var _this = this;
    if (registry) {
      registry.register(target, this.token, this.token);
    } else {
      this.request = setTimeout(function() {
        var _a2, _b;
        (_b = (_a2 = _this.token) === null || _a2 === void 0 ? void 0 : _a2.clean) === null || _b === void 0 ? void 0 : _b.call(_a2);
      }, this.expireTime);
    }
  };
  GarbageCollector2.prototype.close = function() {
    if (registry) {
      registry.unregister(this.token);
    } else {
      clearTimeout(this.request);
    }
  };
  return GarbageCollector2;
}();
var immediate = function(callback) {
  var disposed = false;
  Promise.resolve(0).then(function() {
    if (disposed) {
      disposed = false;
      return;
    }
    callback();
  });
  return function() {
    disposed = true;
  };
};
var useDidUpdate = function(callback) {
  var request = useRef(null);
  request.current = immediate(callback);
  useLayoutEffect(function() {
    request.current();
    callback();
  });
};
var __read$2 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var EMPTY_ARRAY = [];
var RENDER_COUNT = {
  value: 0
};
var RENDER_QUEUE = new Set();
function useForceUpdate() {
  var _a2 = __read$2(useState([]), 2), setState = _a2[1];
  var unMountRef = useRef(false);
  useEffect(function() {
    unMountRef.current = false;
    return function() {
      unMountRef.current = true;
    };
  }, EMPTY_ARRAY);
  var update = useCallback(function() {
    if (unMountRef.current)
      return;
    setState([]);
  }, EMPTY_ARRAY);
  var scheduler = useCallback(function() {
    if (RENDER_COUNT.value === 0) {
      update();
    } else {
      RENDER_QUEUE.add(update);
    }
  }, EMPTY_ARRAY);
  RENDER_COUNT.value++;
  useDidUpdate(function() {
    if (RENDER_COUNT.value > 0) {
      RENDER_COUNT.value--;
    }
    if (RENDER_COUNT.value === 0) {
      RENDER_QUEUE.forEach(function(update2) {
        RENDER_QUEUE.delete(update2);
        update2();
      });
    }
  });
  return scheduler;
}
var __read$1 = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var ObjectToBeRetainedByReact = function() {
  function ObjectToBeRetainedByReact2() {
  }
  return ObjectToBeRetainedByReact2;
}();
function objectToBeRetainedByReactFactory() {
  return new ObjectToBeRetainedByReact();
}
var useObserver = function(view, options) {
  var forceUpdate = useForceUpdate();
  var unMountRef = React.useRef(false);
  var trackerRef = React.useRef(null);
  var gcRef = React.useRef();
  var _a2 = __read$1(React.useState(objectToBeRetainedByReactFactory), 1), objectRetainedByReact = _a2[0];
  if (!trackerRef.current) {
    trackerRef.current = new Tracker(function() {
      if (typeof (options === null || options === void 0 ? void 0 : options.scheduler) === "function") {
        options.scheduler(forceUpdate);
      } else {
        forceUpdate();
      }
    }, options === null || options === void 0 ? void 0 : options.displayName);
  }
  if (!gcRef.current) {
    gcRef.current = new GarbageCollector(function() {
      if (trackerRef.current) {
        trackerRef.current.dispose();
      }
    });
    gcRef.current.open(objectRetainedByReact);
  }
  React.useEffect(function() {
    unMountRef.current = false;
    gcRef.current.close();
    return function() {
      unMountRef.current = true;
      if (trackerRef.current) {
        trackerRef.current.dispose();
        trackerRef.current = null;
      }
    };
  }, []);
  return trackerRef.current.track(view);
};
var __assign$8 = globalThis && globalThis.__assign || function() {
  __assign$8 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$8.apply(this, arguments);
};
function observer(component, options) {
  var realOptions = __assign$8({
    forwardRef: false
  }, options);
  var wrappedComponent = realOptions.forwardRef ? forwardRef(function(props, ref2) {
    return useObserver(function() {
      return component(__assign$8(__assign$8({}, props), {
        ref: ref2
      }));
    }, realOptions);
  }) : function(props) {
    return useObserver(function() {
      return component(props);
    }, realOptions);
  };
  var memoComponent = memo(wrappedComponent);
  hoistNonReactStatics_cjs(memoComponent, component);
  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName;
  }
  return memoComponent;
}
observer(function(props) {
  var children = typeof props.children === "function" ? props.children() : props.children;
  return /* @__PURE__ */ jsx(Fragment, {
    children
  });
});
var useForm = function() {
  return useContext(FormContext);
};
var useField = function() {
  return useContext(FieldContext);
};
var __assign$7 = globalThis && globalThis.__assign || function() {
  __assign$7 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$7.apply(this, arguments);
};
var FormConsumer = observer(function(props) {
  var children = isFn$2(props.children) ? props.children(useForm()) : null;
  return /* @__PURE__ */ jsx(Fragment, {
    children
  });
});
FormConsumer.displayName = "FormConsumer";
var __assign$6 = globalThis && globalThis.__assign || function() {
  __assign$6 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$6.apply(this, arguments);
};
var __read = globalThis && globalThis.__read || function(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = {
      error
    };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var mergeChildren = function(children, content) {
  if (!children && !content)
    return;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [children, content]
  });
};
var renderChildren = function(children) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return isFn$2(children) ? children.apply(void 0, __spreadArray([], __read(args), false)) : children;
};
var ReactiveInternal = function(props) {
  var _a2;
  var options = useContext(SchemaOptionsContext);
  if (!props.field) {
    return /* @__PURE__ */ jsx(Fragment, {
      children: renderChildren(props.children)
    });
  }
  var field = props.field;
  var content = mergeChildren(renderChildren(props.children, field, field.form), (_a2 = field.content) !== null && _a2 !== void 0 ? _a2 : field.component[1].children);
  if (field.display !== "visible")
    return null;
  var renderDecorator = function(children) {
    var _a3;
    if (!field.decorator[0]) {
      return /* @__PURE__ */ jsx(Fragment, {
        children
      });
    }
    (_a3 = Path.getIn(options === null || options === void 0 ? void 0 : options.components, field.decorator[0])) !== null && _a3 !== void 0 ? _a3 : field.decorator[0];
    return /* @__PURE__ */ jsx("finalComponent", __spreadProps(__spreadValues({}, toJS(field.decorator[1])), {
      children
    }));
  };
  var renderComponent = function() {
    var _a3, _b, _c, _d;
    if (!field.component[0])
      return content;
    var value = !isVoidField(field) ? field.value : void 0;
    var onChange = !isVoidField(field) ? function() {
      var _a4, _b2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      field.onInput.apply(field, __spreadArray([], __read(args), false));
      (_b2 = (_a4 = field.component[1]) === null || _a4 === void 0 ? void 0 : _a4.onChange) === null || _b2 === void 0 ? void 0 : _b2.call.apply(_b2, __spreadArray([_a4], __read(args), false));
    } : (_a3 = field.component[1]) === null || _a3 === void 0 ? void 0 : _a3.onChange;
    var onFocus = !isVoidField(field) ? function() {
      var _a4, _b2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      field.onFocus.apply(field, __spreadArray([], __read(args), false));
      (_b2 = (_a4 = field.component[1]) === null || _a4 === void 0 ? void 0 : _a4.onFocus) === null || _b2 === void 0 ? void 0 : _b2.call.apply(_b2, __spreadArray([_a4], __read(args), false));
    } : (_b = field.component[1]) === null || _b === void 0 ? void 0 : _b.onFocus;
    var onBlur = !isVoidField(field) ? function() {
      var _a4, _b2;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      field.onBlur.apply(field, __spreadArray([], __read(args), false));
      (_b2 = (_a4 = field.component[1]) === null || _a4 === void 0 ? void 0 : _a4.onBlur) === null || _b2 === void 0 ? void 0 : _b2.call.apply(_b2, __spreadArray([_a4], __read(args), false));
    } : (_c = field.component[1]) === null || _c === void 0 ? void 0 : _c.onBlur;
    var disabled = !isVoidField(field) ? field.pattern === "disabled" || field.pattern === "readPretty" : void 0;
    var readOnly = !isVoidField(field) ? field.pattern === "readOnly" : void 0;
    (_d = Path.getIn(options === null || options === void 0 ? void 0 : options.components, field.component[0])) !== null && _d !== void 0 ? _d : field.component[0];
    return /* @__PURE__ */ jsx("finalComponent", __spreadProps(__spreadValues({}, __assign$6(__assign$6({
      disabled,
      readOnly
    }, toJS(field.component[1])), {
      value,
      onChange,
      onFocus,
      onBlur
    })), {
      children: content
    }));
  };
  return renderDecorator(renderComponent());
};
ReactiveInternal.displayName = "ReactiveField";
var ReactiveField = observer(ReactiveInternal, {
  forwardRef: true
});
var __assign$5 = globalThis && globalThis.__assign || function() {
  __assign$5 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$5.apply(this, arguments);
};
var __assign$4 = globalThis && globalThis.__assign || function() {
  __assign$4 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$4.apply(this, arguments);
};
var __assign$3 = globalThis && globalThis.__assign || function() {
  __assign$3 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$3.apply(this, arguments);
};
var __assign$2 = globalThis && globalThis.__assign || function() {
  __assign$2 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$2.apply(this, arguments);
};
var Field = function(props) {
  var form = useForm();
  var parent = useField();
  var field = useAttach(form.createField(__assign$2({
    basePath: parent === null || parent === void 0 ? void 0 : parent.address
  }, props)));
  return React.createElement(FieldContext.Provider, {
    value: field
  }, React.createElement(ReactiveField, {
    field
  }, props.children));
};
Field.displayName = "Field";
var __assign$1 = globalThis && globalThis.__assign || function() {
  __assign$1 = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign$1.apply(this, arguments);
};
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
console.log(Field);
