/**
 * Symbols.
 */
const _plural = Symbol("plural");
const _parse = Symbol("parse");
const _fmtShort = Symbol("fmtShort");
const _fmtLong = Symbol("fmtLong");

class MS {

  constructor(lang = "en") {
    // this.lang = require(`./langs/${lang}.json`);

    /**
     * Helpers.
     */

    this.s = 1000;
    this.m = this.s * 60;
    this.h = this.m * 60;
    this.d = this.h * 24;
    this.w = this.d * 7;
    this.y = this.d * 365.25;
  }

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  format(val, options) {
    options = options || {};
    const type = typeof val;
    if (type === 'string' && val.length > 0) {
      return this[_parse](val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? this[_fmtLong](val) : this[_fmtShort](val);
    }
    throw new Error(
      `val is not a non-empty string or a valid number. val=${
      JSON.stringify(val)}`
    );
  }
  /**
   * Pluralization helper.
   */

  [_plural](ms, msAbs, n, name) {
    const isPlural = msAbs >= n * 1.5;
    return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`;
  }

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  [_parse](str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    const n = parseFloat(match[1]);
    const type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * this.y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * this.w;
      case 'days':
      case 'day':
      case 'd':
        return n * this.d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * this.h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * this.m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * this.s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }
  /**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

  [_fmtShort](ms) {
    const msAbs = Math.abs(ms);
    if (msAbs >= this.d) {
      return `${Math.round(ms / this.d)}d`;
    }
    if (msAbs >= this.h) {
      return `${Math.round(ms / this.h)}h`;
    }
    if (msAbs >= this.m) {
      return `${Math.round(ms / this.m)}m`;
    }
    if (msAbs >= this.s) {
      return `${Math.round(ms / this.s)}s`;
    }
    return `${ms}ms`;
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  [_fmtLong](ms) {
    const msAbs = Math.abs(ms);
    if (msAbs >= this.d) {
      return this[_plural](ms, msAbs, this.d, 'day');
    }
    if (msAbs >= this.h) {
      return this[_plural](ms, msAbs, this.h, 'hour');
    }
    if (msAbs >= this.m) {
      return this[_plural](ms, msAbs, this.m, 'minute');
    }
    if (msAbs >= this.s) {
      return this[_plural](ms, msAbs, this.s, 'second');
    }
    return `${ms} ms`;
  }

}

module.exports = MS;
