class EN {

    constructor(client) {
        this.client = client;

        this.name = "en";

        this.dShortStr = "d";
        this.hShortStr = "h";
        this.mShortStr = "m";
        this.sShortStr = "s";
        this.msShortStr = "ms";

        this.dLongStr = "day";
        this.hLongStr = "hour";
        this.mLongStr = "minute";
        this.sLongStr = "second";
        this.msLongStr = "millisecond";
    }

    parse(str) {
        str = String(str);
        if (str.length > 100) {
            return;
        }
        const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            str
        );

        if (!match) return;

        const n = parseFloat(match[1]),
            type = (match[2] || 'ms').toLowerCase();

        switch (type) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
                return n * this.client.y;
            case 'weeks':
            case 'week':
            case 'w':
                return n * this.client.w;
            case 'days':
            case 'day':
            case 'd':
                return n * this.client.d;
            case 'hours':
            case 'hour':
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
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
                return n * this.client.s;
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

}

module.exports = EN;
