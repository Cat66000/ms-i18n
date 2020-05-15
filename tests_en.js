/* eslint-disable no-undef */
/**
 * Dependencies.
 */

if (typeof require !== "undefined") {
	expect = require("expect.js");
	ms = new (require("./"))();
}

// Strings

describe("ms.format(string)", () => {
	it("should not throw an error", () => {
		expect(() => {
			ms.format("1m");
		}).to.not.throwError();
	});

	it("should preserve ms", () => {
		expect(ms.format("100")).to.be(100);
	});

	it("should convert from m to ms", () => {
		expect(ms.format("1m")).to.be(60000);
	});

	it("should convert from h to ms", () => {
		expect(ms.format("1h")).to.be(3600000);
	});

	it("should convert d to ms", () => {
		expect(ms.format("2d")).to.be(172800000);
	});

	it("should convert w to ms", () => {
		expect(ms.format("3w")).to.be(1814400000);
	});

	it("should convert s to ms", () => {
		expect(ms.format("1s")).to.be(1000);
	});

	it("should convert ms to ms", () => {
		expect(ms.format("100ms")).to.be(100);
	});

	it("should work with decimals", () => {
		expect(ms.format("1.5h")).to.be(5400000);
	});

	it("should work with multiple spaces", () => {
		expect(ms.format("1   s")).to.be(1000);
	});

	it("should return NaN if invalid", () => {
		expect(isNaN(ms.format("☃"))).to.be(true);
		expect(isNaN(ms.format("10-.5"))).to.be(true);
	});

	it("should be case-insensitive", () => {
		expect(ms.format("1.5H")).to.be(5400000);
	});

	it("should work with numbers starting with .", () => {
		expect(ms.format(".5ms")).to.be(0.5);
	});

	it("should work with negative integers", () => {
		expect(ms.format("-100ms")).to.be(-100);
	});

	it("should work with negative decimals", () => {
		expect(ms.format("-1.5h")).to.be(-5400000);
		expect(ms.format("-10.5h")).to.be(-37800000);
	});

	it('should work with negative decimals starting with "."', () => {
		expect(ms.format("-.5h")).to.be(-1800000);
	});
});

// Long strings

describe("ms.format(long string)", () => {
	it("should not throw an error", () => {
		expect(() => {
			ms.format("53 milliseconds");
		}).to.not.throwError();
	});

	it("should convert milliseconds to ms", () => {
		expect(ms.format("53 milliseconds")).to.be(53);
	});

	it("should convert msecs to ms", () => {
		expect(ms.format("17 msecs")).to.be(17);
	});

	it("should convert sec to ms", () => {
		expect(ms.format("1 sec")).to.be(1000);
	});

	it("should convert from min to ms", () => {
		expect(ms.format("1 min")).to.be(60000);
	});

	it("should convert from hr to ms", () => {
		expect(ms.format("1 hr")).to.be(3600000);
	});

	it("should convert days to ms", () => {
		expect(ms.format("2 days")).to.be(172800000);
	});

	it("should work with decimals", () => {
		expect(ms.format("1.5 hours")).to.be(5400000);
	});

	it("should work with negative integers", () => {
		expect(ms.format("-100 milliseconds")).to.be(-100);
	});

	it("should work with negative decimals", () => {
		expect(ms.format("-1.5 hours")).to.be(-5400000);
	});

	it('should work with negative decimals starting with "."', () => {
		expect(ms.format("-.5 hr")).to.be(-1800000);
	});
});

// Numbers

describe("ms.format(number, { long: true })", () => {
	it("should not throw an error", () => {
		expect(() => {
			ms.format(500, { long: true });
		}).to.not.throwError();
	});

	it("should support milliseconds", () => {
		expect(ms.format(500, { long: true })).to.be("500 milliseconds");

		expect(ms.format(-500, { long: true })).to.be("-500 milliseconds");
	});

	it("should support seconds", () => {
		expect(ms.format(1000, { long: true })).to.be("1 second");
		expect(ms.format(1200, { long: true })).to.be("1 second");
		expect(ms.format(10000, { long: true })).to.be("10 seconds");

		expect(ms.format(-1000, { long: true })).to.be("-1 second");
		expect(ms.format(-1200, { long: true })).to.be("-1 second");
		expect(ms.format(-10000, { long: true })).to.be("-10 seconds");
	});

	it("should support minutes", () => {
		expect(ms.format(60 * 1000, { long: true })).to.be("1 minute");
		expect(ms.format(60 * 1200, { long: true })).to.be("1 minute");
		expect(ms.format(60 * 10000, { long: true })).to.be("10 minutes");

		expect(ms.format(-1 * 60 * 1000, { long: true })).to.be("-1 minute");
		expect(ms.format(-1 * 60 * 1200, { long: true })).to.be("-1 minute");
		expect(ms.format(-1 * 60 * 10000, { long: true })).to.be("-10 minutes");
	});

	it("should support hours", () => {
		expect(ms.format(60 * 60 * 1000, { long: true })).to.be("1 hour");
		expect(ms.format(60 * 60 * 1200, { long: true })).to.be("1 hour");
		expect(ms.format(60 * 60 * 10000, { long: true })).to.be("10 hours");

		expect(ms.format(-1 * 60 * 60 * 1000, { long: true })).to.be("-1 hour");
		expect(ms.format(-1 * 60 * 60 * 1200, { long: true })).to.be("-1 hour");
		expect(ms.format(-1 * 60 * 60 * 10000, { long: true })).to.be("-10 hours");
	});

	it("should support days", () => {
		expect(ms.format(24 * 60 * 60 * 1000, { long: true })).to.be("1 day");
		expect(ms.format(24 * 60 * 60 * 1200, { long: true })).to.be("1 day");
		expect(ms.format(24 * 60 * 60 * 10000, { long: true })).to.be("10 days");

		expect(ms.format(-1 * 24 * 60 * 60 * 1000, { long: true })).to.be("-1 day");
		expect(ms.format(-1 * 24 * 60 * 60 * 1200, { long: true })).to.be("-1 day");
		expect(ms.format(-1 * 24 * 60 * 60 * 10000, { long: true })).to.be("-10 days");
	});

	it("should round", () => {
		expect(ms.format(234234234, { long: true })).to.be("3 days");

		expect(ms.format(-234234234, { long: true })).to.be("-3 days");
	});
});

// Numbers

describe("ms.format(number)", () => {
	it("should not throw an error", () => {
		expect(() => {
			ms.format(500);
		}).to.not.throwError();
	});

	it("should support milliseconds", () => {
		expect(ms.format(500)).to.be("500ms");

		expect(ms.format(-500)).to.be("-500ms");
	});

	it("should support seconds", () => {
		expect(ms.format(1000)).to.be("1s");
		expect(ms.format(10000)).to.be("10s");

		expect(ms.format(-1000)).to.be("-1s");
		expect(ms.format(-10000)).to.be("-10s");
	});

	it("should support minutes", () => {
		expect(ms.format(60 * 1000)).to.be("1m");
		expect(ms.format(60 * 10000)).to.be("10m");

		expect(ms.format(-1 * 60 * 1000)).to.be("-1m");
		expect(ms.format(-1 * 60 * 10000)).to.be("-10m");
	});

	it("should support hours", () => {
		expect(ms.format(60 * 60 * 1000)).to.be("1h");
		expect(ms.format(60 * 60 * 10000)).to.be("10h");

		expect(ms.format(-1 * 60 * 60 * 1000)).to.be("-1h");
		expect(ms.format(-1 * 60 * 60 * 10000)).to.be("-10h");
	});

	it("should support days", () => {
		expect(ms.format(24 * 60 * 60 * 1000)).to.be("1d");
		expect(ms.format(24 * 60 * 60 * 10000)).to.be("10d");

		expect(ms.format(-1 * 24 * 60 * 60 * 1000)).to.be("-1d");
		expect(ms.format(-1 * 24 * 60 * 60 * 10000)).to.be("-10d");
	});

	it("should round", () => {
		expect(ms.format(234234234)).to.be("3d");

		expect(ms.format(-234234234)).to.be("-3d");
	});
});

// Invalid inputs

describe("ms.format(invalid inputs)", () => {
	it('should throw an error, when ms.format("")', () => {
		expect(() => {
			ms.format("");
		}).to.throwError();
	});

	it("should throw an error, when ms.format(undefined)", () => {
		expect(() => {
			ms.format(undefined);
		}).to.throwError();
	});

	it("should throw an error, when ms.format(null)", () => {
		expect(() => {
			ms.format(null);
		}).to.throwError();
	});

	it("should throw an error, when ms.format([])", () => {
		expect(() => {
			ms.format([]);
		}).to.throwError();
	});

	it("should throw an error, when ms.format({})", () => {
		expect(() => {
			ms.format({});
		}).to.throwError();
	});

	it("should throw an error, when ms.format(NaN)", () => {
		expect(() => {
			ms.format(NaN);
		}).to.throwError();
	});

	it("should throw an error, when ms.format(Infinity)", () => {
		expect(() => {
			ms.format(Infinity);
		}).to.throwError();
	});

	it("should throw an error, when ms.format(-Infinity)", () => {
		expect(() => {
			ms.format(-Infinity);
		}).to.throwError();
	});
});
