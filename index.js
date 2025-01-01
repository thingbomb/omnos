/**
 * Caches the result of an asynchronous function based on its arguments.
 *
 * @param {Function} fn - The asynchronous function to memoize.
 * @returns {any} - Returns the cached result if available, otherwise calls the function and returns the result.
 */
function memo(fn) {
  const cache = new Map();
  return async function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const promise = fn(...args);
    cache.set(key, promise);
    try {
      const result = await promise;
      cache.set(key, result);
      return result;
    } catch (error) {
      cache.delete(key);
      throw error;
    }
  };
}

const colorCodes = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",

  brightBlack: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",

  bgBrightBlack: "\x1b[100m",
  bgBrightRed: "\x1b[101m",
  bgBrightGreen: "\x1b[102m",
  bgBrightYellow: "\x1b[103m",
  bgBrightBlue: "\x1b[104m",
  bgBrightMagenta: "\x1b[105m",
  bgBrightCyan: "\x1b[106m",
  bgBrightWhite: "\x1b[107m",
};

function createColorFunctions(colorCodes) {
  const colorFunctions = {};
  Object.keys(colorCodes).forEach((key) => {
    colorFunctions[key] = (text) =>
      `${colorCodes[key]}${text}${colorCodes.reset}`;
  });
  return colorFunctions;
}

const colors = createColorFunctions(colorCodes);

/**
 * Randomly shuffles the elements of an array.
 *
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Delays the execution of an asynchronous function.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} - A promise that resolves after the specified delay.
 */
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Merges arrays or objects together. Throws an error if there are mixed types.
 *
 * @param {...Object} objects - The objects or arrays to merge.
 * @returns {Object|Array} - The merged array or object.
 * @throws {Error} - If the input contains mixed types (arrays and objects).
 */
function merge(...objects) {
  const firstType = Array.isArray(objects[0])
    ? "array"
    : typeof objects[0] === "object" && objects[0] !== null
    ? "object"
    : null;
  if (!firstType) {
    throw new Error("Cannot merge non-array, non-object values.");
  }
  const allSameType = objects.every((item) => {
    return (
      (Array.isArray(item) && firstType === "array") ||
      (typeof item === "object" && item !== null && firstType === "object")
    );
  });
  if (!allSameType) {
    throw new Error("Cannot merge mixed types: arrays and objects.");
  }
  if (firstType === "array") {
    return objects.reduce((acc, object) => acc.concat(object), []);
  }
  if (firstType === "object") {
    return Object.assign({}, ...objects);
  }
}

/**
 * Capitalize a string.
 *
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Benchmark a function.
 *
 * @param {Function} fn
 * @returns {number}
 */
async function time(fn) {
  const start = Date.now();
  await fn();
  return Date.now() - start;
}

export { memo, shuffle, colors, delay, merge, capitalize, time };
