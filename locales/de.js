class DE {

    constructor(client) {
        this.client = client;

        this.name = "de";

        this.dShortStr = "d";
        this.hShortStr = "h";
        this.mShortStr = "min";
        this.sShortStr = "s";
        this.msShortStr = "ms";

        this.dLongStr = "Tag";
        this.hLongStr = "Stunde";
        this.mLongStr = "Minute";
        this.sLongStr = "Sekunde";
        this.msLongStr = "Millisekunde";
    }

    /**
     * Pluralization helper.
     */

    plural(ms, msAbs, n, name) {
        const isPlural = msAbs >= n * 1.5;
        return `${Math.round(ms / n)} ${name}${isPlural ? (name.endsWith('e') ? 'n' : 'e') : ''}`;
    }

    parse(str) {
        str = String(str);
        if (str.length > 100) {
            return;
        }
        const match = /^(-?(?:\d+)?\.?\d+) *(millisekunden?|ms|sekunden?|s|minuten?|min|stunden?|h|tage?|d|wochen?|jahre?|a)?$/i.exec(
            str
        );

        if (!match) return;

        const n = parseFloat(match[1]),
            type = (match[2] || 'ms').toLowerCase();

        switch (type) {
            case 'jahre':
            case 'jahr':
            case 'a':
                return n * this.client.y;
            case 'wochen':
            case 'woche':
                return n * this.client.w;
            case 'tage':
            case 'tag':
            case 'd':
                return n * this.client.d;
            case 'stunden':
            case 'stunde':
            case 'h':
                return n * this.client.h;
            case 'minuten':
            case 'minute':
            case 'min':
                return n * this.client.m;
            case 'sekunden':
            case 'sekunde':
            case 's':
                return n * this.client.s;
            case 'millisekunden':
            case 'millisekunde':
            case 'ms':
                return n;
            default:
                return undefined;
        }
    }

}

module.exports = DE;
