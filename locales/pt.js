class ES {

    constructor(client) {
        this.client = client;

        this.isoCode = "es";
        this.englishName = "portuguese";
        this.name = "português";

        this.dShortStr = "d";
        this.hShortStr = "h";
        this.mShortStr = "m";
        this.sShortStr = "s";
        this.msShortStr = "ms";

        this.dLongStr = "dia";
        this.hLongStr = "hora";
        this.mLongStr = "minuto";
        this.sLongStr = "segundo";
        this.msLongStr = "milissegundo";
    }

    /**
     * Pluralization helper.
     */

    plural(ms, msAbs, n, name) {
        const isPlural = msAbs >= n * 1.5;
        return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`;
    }

    parse(str) {
        str = String(str);
        if (str.length > 100) {
            return;
        }

        const match = /^(-?(?:\d+)?\.?\d+) *(milissegundos?|msegs?|ms|segundos?|segs?|s|minutos?|mins?|m|horas?|hrs?|h|dias?|d|semanas?|sems?|anos?|a)?$/i.exec(
            str
        );

        if (!match) return;

        const n = parseFloat(match[1]),
            type = (match[2] || "ms").toLowerCase();
        switch (type) {
            case "anos":
            case "ano":
            case "an":
            case "a":
                return n * this.client.y;
            case "semanas":
            case "semana":
            case "sems":
            case "sem":
                return n * this.client.w;
            case "dias":
            case "dia":
            case "d":
                return n * this.client.d;
            case "horas":
            case "hora":
            case "hrs":
            case "hr":
            case "h":
                return n * this.client.h;
            case "minutos":
            case "minuto":
            case "mins":
            case "min":
            case "m":
                return n * this.client.m;
            case "segundos":
            case "segundo":
            case "segs":
            case "seg":
            case "s":
                return n * this.client.s;
            case "milissegundos":
            case "milissegundo":
            case "msegs":
            case "mseg":
            case "ms":
                return n;
            default:
                return undefined;
        }
    }

}

module.exports = ES;
