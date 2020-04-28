class ES {

    constructor(client) {
        this.client = client;

        this.isoCode = "es";
        this.englishName = "spanish";
        this.name = "español";

        this.dShortStr = "d";
        this.hShortStr = "h";
        this.mShortStr = "m";
        this.sShortStr = "s";
        this.msShortStr = "ms";

        this.dLongStr = "día";
        this.hLongStr = "hora";
        this.mLongStr = "minuto";
        this.sLongStr = "segundo";
        this.msLongStr = "milisegundo";
    }

    /**
     * Pluralization helper.
     */

    plural(ms, msAbs, n, name) {
        const isPlural = msAbs >= n * 1.5;
        return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`;
    }

    match(str) {
        return /^(-?(?:\d+)?\.?\d+) *(milisegundos?|msegs?|ms|segundos?|segs?|s|minutos?|mins?|m|horas?|hrs?|h|d\u00edas?|dias?|d|semanas?|sems?|a\u00f1os?|anos?|a)?$/i.exec(
            str
        );
    }

    switch(type, n) {
        switch (type) {
            case "a\u00f1os":
            case "anos":
            case "a\u00f1o":
            case "ano":
            case "a":
                return n * this.client.y;
            case "semanas":
            case "semana":
            case "sems":
            case "sem":
                return n * this.client.w;
            case "d\u00edas":
            case "dias":
            case "d\u00eda":
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
            case "milisegundos":
            case "milisegundo":
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
