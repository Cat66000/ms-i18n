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
        return `${Math.round(ms / n)} ${name}${isPlural ? name.endsWith("e") ? "n" : "e" : ""}`;
    }

    match(str) {
        return /^(-?(?:\d+)?\.?\d+) *(millisekunden?|ms|sekunden?|s|minuten?|min|m|stunden?|h|tage?|t|d|wochen?|w|jahre?|a)?$/i.exec(
            str.toLowerCase()
        );
    }

    switch(type, n) {
        switch (type) {
            case "jahre":
            case "jahr":
            case "a":
                return n * this.client.y;
            case "wochen":
            case "woche":
            case "w":
                return n * this.client.w;
            case "tage":
            case "tag":
            case "t":
            case "d":
                return n * this.client.d;
            case "stunden":
            case "stunde":
            case "h":
                return n * this.client.h;
            case "minuten":
            case "minute":
            case "min":
            case "m":
                return n * this.client.m;
            case "sekunden":
            case "sekunde":
            case "s":
                return n * this.client.s;
            case "millisekunden":
            case "millisekunde":
            case "ms":
                return n;
            default:
                return undefined;
        }
    }

}

module.exports = DE;
