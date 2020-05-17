class FR {
	constructor(client) {
		this.client = client;

		this.isoCode = 'fr';
		this.englishName = 'french';
		this.name = 'français';

		this.dShortStr = 'j';
		this.hShortStr = 'h';
		this.mShortStr = 'm';
		this.sShortStr = 's';
		this.msShortStr = 'ms';

		this.dLongStr = 'jour';
		this.hLongStr = 'heure';
		this.mLongStr = 'minute';
		this.sLongStr = 'seconde';
		this.msLongStr = 'milliseconde';
	}

	/**
	 * Pluralization helper.
	 */

	plural(ms, msAbs, n, name) {
		const isPlural = msAbs >= n * 1.5;
		return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`;
	}

	match(str) {
		return /^(-?(?:\d+)?\.?\d+) *(millisecondes?|msecs?|ms|secondes?|secs?|s|minutes?|mins?|m|heures?|hrs?|h|jours?|j|semaines?|sems?|années?|ans?|a)?$/i.exec(
			str
		);
	}

	switch(type, n) {
		switch (type) {
			case 'années':
			case 'année':
			case 'ans':
			case 'an':
			case 'a':
				return n * this.client.y;
			case 'semaines':
			case 'semaine':
			case 'sems':
			case 'sem':
				return n * this.client.w;
			case 'jours':
			case 'jour':
			case 'j':
				return n * this.client.d;
			case 'heures':
			case 'heure':
			case 'hrs':
			case 'hr':
			case 'h':
				return n * this.client.h;
			case 'minutes':
			case 'minute':
			case 'mins':
			case 'min':
			case 'm':
				return n * this.client.m;
			case 'secondes':
			case 'seconde':
			case 'secs':
			case 'sec':
			case 's':
				return n * this.client.s;
			case 'millisecondes':
			case 'milliseconde':
			case 'msecs':
			case 'msec':
			case 'ms':
				return n;
			default:
				return undefined;
		}
	}
}

module.exports = FR;
