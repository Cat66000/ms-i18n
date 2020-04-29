/* eslint-disable no-undef */
/**
 * Dependencies.
 */

if (typeof require !== 'undefined') {
  expect = require('expect.js');
  ms = new (require('./'))("de");
}

// strings

describe('ms.format(string)', () => {
  it('should not thow an error', () => {
    expect(() => {
      ms.format('1m');
    }).to.not.throwError();
  });

  it('should preserve ms', () => {
    expect(ms.format('100')).to.be(100);
  });

  it('should convert from min to ms', () => {
    expect(ms.format('1min')).to.be(60000);
  });

  it('should convert from h to ms', () => {
    expect(ms.format('1h')).to.be(3600000);
  });

  it('should convert d to ms', () => {
    expect(ms.format('2d')).to.be(172800000);
  });

  it('should convert w to ms', () => {
    expect(ms.format('3w')).to.be(1814400000);
  });

  it('should convert s to ms', () => {
    expect(ms.format('1s')).to.be(1000);
  });

  it('should convert ms to ms', () => {
    expect(ms.format('100ms')).to.be(100);
  });

  it('should work with decimals', () => {
    expect(ms.format('1.5h')).to.be(5400000);
  });

  it('should work with multiple spaces', () => {
    expect(ms.format('1   s')).to.be(1000);
  });

  it('should return NaN if invalid', () => {
    expect(isNaN(ms.format('☃'))).to.be(true);
    expect(isNaN(ms.format('10-.5'))).to.be(true);
  });

  it('should be case-insensitive', () => {
    expect(ms.format('1.5H')).to.be(5400000);
  });

  it('should work with numbers starting with .', () => {
    expect(ms.format('.5ms')).to.be(0.5);
  });

  it('should work with negative integers', () => {
    expect(ms.format('-100ms')).to.be(-100);
  });

  it('should work with negative decimals', () => {
    expect(ms.format('-1.5h')).to.be(-5400000);
    expect(ms.format('-10.5h')).to.be(-37800000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(ms.format('-.5h')).to.be(-1800000);
  });
});

// long strings

describe('ms.format(long string)', () => {
  it('should not thow an error', () => {
    expect(() => {
      ms.format('53 Millisekunden');
    }).to.not.throwError();
  });

  it('should convert Millisekunden to ms', () => {
    expect(ms.format('53 Millisekunden')).to.be(53);
  });

  it('should convert ms to ms', () => {
    expect(ms.format('17 ms')).to.be(17);
  });

  it('should convert s to ms', () => {
    expect(ms.format('1 s')).to.be(1000);
  });

  it('should convert from min to ms', () => {
    expect(ms.format('1 min')).to.be(60000);
  });

  it('should convert from h to ms', () => {
    expect(ms.format('1 h')).to.be(3600000);
  });

  it('should convert Tage to ms', () => {
    expect(ms.format('2 Tage')).to.be(172800000);
  });

  it('should work with decimals', () => {
    expect(ms.format('1.5 Stunden')).to.be(5400000);
  });

  it('should work with negative integers', () => {
    expect(ms.format('-100 Millisekunden')).to.be(-100);
  });

  it('should work with negative decimals', () => {
    expect(ms.format('-1.5 Stunden')).to.be(-5400000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(ms.format('-.5 h')).to.be(-1800000);
  });
});

// numbers

describe('ms.format(number, { long: true })', () => {
  it('should not thow an error', () => {
    expect(() => {
      ms.format(500, { long: true });
    }).to.not.throwError();
  });

  it('should support Millisekunden', () => {
    expect(ms.format(500, { long: true })).to.be('500 Millisekunden');

    expect(ms.format(-500, { long: true })).to.be('-500 Millisekunden');
  });

  it('should support Sekunden', () => {
    expect(ms.format(1000, { long: true })).to.be('1 Sekunde');
    expect(ms.format(1200, { long: true })).to.be('1 Sekunde');
    expect(ms.format(10000, { long: true })).to.be('10 Sekunden');

    expect(ms.format(-1000, { long: true })).to.be('-1 Sekunde');
    expect(ms.format(-1200, { long: true })).to.be('-1 Sekunde');
    expect(ms.format(-10000, { long: true })).to.be('-10 Sekunden');
  });

  it('should support Minuten', () => {
    expect(ms.format(60 * 1000, { long: true })).to.be('1 Minute');
    expect(ms.format(60 * 1200, { long: true })).to.be('1 Minute');
    expect(ms.format(60 * 10000, { long: true })).to.be('10 Minuten');

    expect(ms.format(-1 * 60 * 1000, { long: true })).to.be('-1 Minute');
    expect(ms.format(-1 * 60 * 1200, { long: true })).to.be('-1 Minute');
    expect(ms.format(-1 * 60 * 10000, { long: true })).to.be('-10 Minuten');
  });

  it('should support Stunden', () => {
    expect(ms.format(60 * 60 * 1000, { long: true })).to.be('1 Stunde');
    expect(ms.format(60 * 60 * 1200, { long: true })).to.be('1 Stunde');
    expect(ms.format(60 * 60 * 10000, { long: true })).to.be('10 Stunden');

    expect(ms.format(-1 * 60 * 60 * 1000, { long: true })).to.be('-1 Stunde');
    expect(ms.format(-1 * 60 * 60 * 1200, { long: true })).to.be('-1 Stunde');
    expect(ms.format(-1 * 60 * 60 * 10000, { long: true })).to.be('-10 Stunden');
  });

  it('should support Tage', () => {
    expect(ms.format(24 * 60 * 60 * 1000, { long: true })).to.be('1 Tag');
    expect(ms.format(24 * 60 * 60 * 1200, { long: true })).to.be('1 Tag');
    expect(ms.format(24 * 60 * 60 * 10000, { long: true })).to.be('10 Tage');

    expect(ms.format(-1 * 24 * 60 * 60 * 1000, { long: true })).to.be('-1 Tag');
    expect(ms.format(-1 * 24 * 60 * 60 * 1200, { long: true })).to.be('-1 Tag');
    expect(ms.format(-1 * 24 * 60 * 60 * 10000, { long: true })).to.be('-10 Tage');
  });

  it('should round', () => {
    expect(ms.format(234234234, { long: true })).to.be('3 Tage');

    expect(ms.format(-234234234, { long: true })).to.be('-3 Tage');
  });
});

// numbers

describe('ms.format(number)', () => {
  it('should not thow an error', () => {
    expect(() => {
      ms.format(500);
    }).to.not.throwError();
  });

  it('should support Millisekunden', () => {
    expect(ms.format(500)).to.be('500ms');

    expect(ms.format(-500)).to.be('-500ms');
  });

  it('should support Sekunden', () => {
    expect(ms.format(1000)).to.be('1s');
    expect(ms.format(10000)).to.be('10s');

    expect(ms.format(-1000)).to.be('-1s');
    expect(ms.format(-10000)).to.be('-10s');
  });

  it('should support Minuten', () => {
    expect(ms.format(60 * 1000)).to.be('1min');
    expect(ms.format(60 * 10000)).to.be('10min');

    expect(ms.format(-1 * 60 * 1000)).to.be('-1min');
    expect(ms.format(-1 * 60 * 10000)).to.be('-10min');
  });

  it('should support Stunden', () => {
    expect(ms.format(60 * 60 * 1000)).to.be('1h');
    expect(ms.format(60 * 60 * 10000)).to.be('10h');

    expect(ms.format(-1 * 60 * 60 * 1000)).to.be('-1h');
    expect(ms.format(-1 * 60 * 60 * 10000)).to.be('-10h');
  });

  it('should support Tage', () => {
    expect(ms.format(24 * 60 * 60 * 1000)).to.be('1d');
    expect(ms.format(24 * 60 * 60 * 10000)).to.be('10d');

    expect(ms.format(-1 * 24 * 60 * 60 * 1000)).to.be('-1d');
    expect(ms.format(-1 * 24 * 60 * 60 * 10000)).to.be('-10d');
  });

  it('should round', () => {
    expect(ms.format(234234234)).to.be('3d');

    expect(ms.format(-234234234)).to.be('-3d');
  });
});

// invalid inputs

describe('ms.format(invalid inputs)', () => {
  it('should thow an error, when ms.format("")', () => {
    expect(() => {
      ms.format('');
    }).to.throwError();
  });

  it('should thow an error, when ms.format(undefined)', () => {
    expect(() => {
      ms.format(undefined);
    }).to.throwError();
  });

  it('should thow an error, when ms.format(null)', () => {
    expect(() => {
      ms.format(null);
    }).to.throwError();
  });

  it('should thow an error, when ms.format([])', () => {
    expect(() => {
      ms.format([]);
    }).to.throwError();
  });

  it('should thow an error, when ms.format({})', () => {
    expect(() => {
      ms.format({});
    }).to.throwError();
  });

  it('should thow an error, when ms.format(NaN)', () => {
    expect(() => {
      ms.format(NaN);
    }).to.throwError();
  });

  it('should thow an error, when ms.format(Infinity)', () => {
    expect(() => {
      ms.format(Infinity);
    }).to.throwError();
  });

  it('should thow an error, when ms.format(-Infinity)', () => {
    expect(() => {
      ms.format(-Infinity);
    }).to.throwError();
  });
});
