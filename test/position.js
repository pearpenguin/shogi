const assert = require('chai').assert;
const position = require('../src/board/position');
const defs = require('../src/board/defs');

/* Test assumes an invariant board representation */
describe('position', function () {

	describe('.isValid', function () {
		it('should return true if within the board boundaries', function() {
			//Assuming zero-based array
			assert.isTrue(position.isValid(0));
			assert.isTrue(position.isValid(defs.BOARD_SIZE - 1));
		});
		it('should return false if position is outside boundaries', function() {
			assert.isFalse(position.isValid(-1), '-1');
			assert.isFalse(position.isValid(defs.BOARD_SIZE), defs.BOARD_SIZE);
		});
		it('should return false if given position is null', function() {
			assert.isFalse(position.isValid(null));
		});
		it('should return false if given position is undefined', function() {
			assert.isFalse(position.isValid(undefined));
		});
	});

	describe('.toIdx', function () {
		it('should return a valid board array index given a position notation', function () {
			assert.strictEqual(position.toIdx(1, 'a'), 0);
			assert.strictEqual(position.toIdx(9, 'a'), 8);
			assert.strictEqual(position.toIdx(1, 'i'), 72);
			assert.strictEqual(position.toIdx(9, 'i'), 80);
		});
		it('should throw an error when given an invalid position notation', function () {
			assert.throws(function () {
				position.toIdx(0, 'a');
			}, Error);
			assert.throws(function () {
				position.toIdx(10, 'a');
			}, Error);
			assert.throws(function () {
				position.toIdx(0, '@');
			}, Error);
			assert.throws(function () {
				position.toIdx(10, 'i');
			}, Error);
		});
	});

	describe('.directions', function () {
		it('should return new position index in the specified direction (if valid)', function () {
			for (let i = 0; i < defs.BOARD_SIZE; i++) {
				//Northest row
				if (i < defs.NUM_COLS) {
					assert.strictEqual(position.north(i), null, `pos == ${i}`);
				}
				else {
					assert.isNumber(position.north(i), `pos == ${i}`);
				}
				//Southest row
				if (i < defs.BOARD_SIZE && i >= defs.BOARD_SIZE - defs.NUM_COLS) {
					assert.strictEqual(position.south(i), null, `pos == ${i}`);
				}
				else {
					assert.isNumber(position.south(i), `pos == ${i}`);
				}
				//East-most row
				if (i % defs.NUM_COLS === 0) {
					assert.strictEqual(position.east(i), null, `pos == ${i}`);
				}
				else {
					assert.isNumber(position.east(i), `pos == ${i}`);
				}
				//West-most row
				if (i % defs.NUM_COLS === defs.NUM_COLS - 1) {
					assert.strictEqual(position.west(i), null, `pos == ${i}`);
				}
				else {
					assert.isNumber(position.west(i), `pos == ${i}`);
				}
			}
		})
	});
});
