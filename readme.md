# ms-i18n

[Cat66's Discord server](https://discord.gg/c2XXr5J)

A fork of [ms](https://www.npmjs.com/package/ms) that supports multiple languages (also named as locales).

Use this package to easily convert various time formats to milliseconds.

## Examples

### Initialising

```js
const MSi18n = require("ms-i18n");

// replace language with "en" (english), "fr" (french) or "es" (spanish);
const ms = new MSi18n(language) 

// You can also do it like this (much simpler) :

// replace language with "en" (english), "fr" (french) or "es" (spanish);
const ms = new (require("ms-i18n"))(language); 
```

### Basic usage

Note : These examples are only for the english language (it may change in the future)

```js
ms.format('2 days');    // 172800000
ms.format('1d');        // 86400000
ms.format('10h');       // 36000000
ms.format('2.5 hrs');   // 9000000
ms.format('2h');        // 7200000
ms.format('1m');        // 60000
ms.format('5s');        // 5000
ms.format('1y');        // 31557600000
ms.format('100');       // 100
ms.format('-3 days');   // -259200000
ms.format('-1h');       // -3600000
ms.format('-200');      // -200
```

### Convert from Milliseconds

```js
ms.format(60000);                   // "1m"
ms.format(2 * 60000);               // "2m"
ms.format(-3 * 60000);              // "-3m"
ms.format(ms.format('10 hours'));   // "10h"
```

### Time Format Written-Out

```js
ms.format(60000, { long: true });                   // "1 minute"
ms.format(2 * 60000, { long: true });               // "2 minutes"
ms.format(-3 * 60000, { long: true });              // "-3 minutes"
ms.format(ms.format('10 hours'), { long: true });   // "10 hours"
```

### Lang-related properties

```js
// Returns the ISO 639-1 code for this lang
ms.langIsoCode

 // Returns the name of the lang, in the lang itself
ms.langName

// Returns the english name for this lang
ms.langEnglishName
```

## Features

- Works only with [Node.js](https://nodejs.org) actually, but in the future we will make it works with browser
- If a number is supplied, a string with a unit is returned
- If a string that contains the number is supplied, it returns it as a number (e.g.: it returns `100` for `'100'`)
- If you pass a string with a number and a valid unit, the number of equivalent milliseconds is returned

## Caught a bug / want to add language that isn't available ?

**If you know how to fork :**

1. [Fork](https://help.github.com/articles/fork-a-repo/) this [repository](https://github.com/Cat66000/ms-i18n) to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of ms-i18n, just link it to the dependencies: `npm link ms-i18n`. Instead of the default one from npm, Node.js will now use your clone of ms-i18n!

As always, you can run the tests using: `npm test`

**If you don't know how to fork :**

You can still create an [issue](https://github.com/Cat66000/ms-i18n/issues) in the repository