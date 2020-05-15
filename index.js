/**
 * Symbols.
 */

const _fmtShort = Symbol("fmtShort"),
	_fmtLong = Symbol("fmtLong"),
	_locale = Symbol("locale"),
	_parse = Symbol("parse");

class MS {
	constructor(locale = "en") {
		locale = locale.toString();

		try {
			this[_locale] = new (require(`./langs/${locale.toLowerCase()}.js`))(this);
		} catch (e) {
			throw new Error(e);
		}

		this.langIsoCode = this[_locale].isoCode;
		this.langEnglishName = this[_locale].englishName;
		this.langName = this[_locale].name;

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
		if (type === "string" && val.length > 0) {
			return this[_parse](val);
		} else if (type === "number" && isFinite(val)) {
			return options.long ? this[_fmtLong](val) : this[_fmtShort](val);
		}
		throw new Error(
			`ms-i18n: val is not a non-empty string or a valid number. val=${JSON.stringify(val)}`
		);
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
			return `${Math.round(ms / this.d)}${this[_locale].dShortStr}`;
		}
		if (msAbs >= this.h) {
			return `${Math.round(ms / this.h)}${this[_locale].hShortStr}`;
		}
		if (msAbs >= this.m) {
			return `${Math.round(ms / this.m)}${this[_locale].mShortStr}`;
		}
		if (msAbs >= this.s) {
			return `${Math.round(ms / this.s)}${this[_locale].sShortStr}`;
		}

		return `${ms}${this[_locale].msShortStr}`;
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
			return this[_locale].plural(ms, msAbs, this.d, this[_locale].dLongStr);
		}
		if (msAbs >= this.h) {
			return this[_locale].plural(ms, msAbs, this.h, this[_locale].hLongStr);
		}
		if (msAbs >= this.m) {
			return this[_locale].plural(ms, msAbs, this.m, this[_locale].mLongStr);
		}
		if (msAbs >= this.s) {
			return this[_locale].plural(ms, msAbs, this.s, this[_locale].sLongStr);
		}
		return this[_locale].plural(ms, msAbs, 1, this[_locale].msLongStr);
	}

	[_parse](str) {
		str = String(str);
		if (str.length > 100) {
			return;
		}

		const match = this[_locale].match(str);

		if (!match) {
			return;
		}

		const n = parseFloat(match[1]),
			type = (match[2] || "ms").toLowerCase();

		return this[_locale].switch(type, n);
	}
}

module.exports = MS;
