const assert = require('assert');
const { test } = require('node:test');

const Calculator = require('../src/calculator');

// TODO: write your test cases here to kill mutants
test("Test Calculator's cal", () => {
	assert.strictEqual(62, Calculator.main(1, 2, 3, 4, 2012));
	assert.strictEqual(0, Calculator.main(1, 1, 1, 1, 2012));
	assert.strictEqual(0, Calculator.main(12, 1, 12, 1, 10000));
	assert.strictEqual(88, Calculator.main(1, 2, 3, 31, 2023));
	assert.strictEqual(60, Calculator.main(1, 31, 3, 31, 2000));
	assert.strictEqual(57, Calculator.main(1, 4, 3, 2, 1));
	assert.strictEqual(28, Calculator.main(2, 1, 3, 1, 100));
	
	const testcases = [
			{ param: [1, 31, 3, 31, -1], expected: 'invalid year'},
			{ param: [1, 31, 3, 31, 10001], expected: 'invalid year'},
			{ param: [13, 31, 13, 31, 2012], expected: 'invalid month1'},
			{ param: [0, 31, 13, 31, 2012], expected: 'invalid month1'},
			{ param: [1, 31, 13, 31, 2012], expected: 'invalid month2'},
			{ param: [1, 0, 0, 31, 2012], expected: 'invalid month2'},
			{ param: [1, 32, 1, 3, 2012], expected: 'invalid day1'},
			{ param: [1, 0, 1, 3, 2012], expected: 'invalid day1'},
			{ param: [1, 31, 1, 32, 2012], expected: 'invalid day2'},
			{ param: [1, 31, 2, 0, 2012], expected: 'invalid day2'},
			{ param: [5, 2, 3, 4, 2012], expected: 'month1 must be less than month2'},
			{ param: [1, 31, 1, 32, 2012], expected: 'invalid day2'},
			{ param: [1, 31, 1, 29, 2012], expected: 'day1 must be less than day2 if month1 is equal to month2'},
		]
	for (const tc of testcases) {
			assert.throws(() => {
				Calculator.main.apply(this, tc.param)
				}, { 
					name : 'Error', 
					message: tc.expected
			});
		}
});