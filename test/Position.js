import assert from 'assert';
import Position from '../src/board/Position';
import { BOARD_SIZE, NUM_COLS, NUM_ROWS } from '../src/board/defs';

/* Test assumes an invariant board representation */
describe('Position', function () {

	it('should be within the board boundaries', function() {
		//Assuming zero-based array
		assert.throws(function () {
			new Position(-1);
		}, Error);
		assert.throws(function () {
			new Position(BOARD_SIZE);
		}, Error);
	});

	describe('.directions', function () {
		it('should return new Position in the specified direction (if valid)', function () {
			let p;
			for (let i = 0; i < BOARD_SIZE; i++) {
				p = new Position(i);
				//Northest row
				if (i < NUM_COLS) {
					assert.equal(p.north(), null, `i == ${i}`);
				}
				else {
					assert.ok(p.north() instanceof Position, `i == ${i}`);
				}
				//Southest row
				if (i < BOARD_SIZE && i >= BOARD_SIZE - NUM_COLS) {
					assert.equal(p.south(), null, `i == ${i}`);
				}
				else {
					assert.ok(p.south() instanceof Position, `i == ${i}`);
				}
				//East-most row
				if (i % NUM_COLS === 0) {
					assert.equal(p.east(), null, `i == ${i}`);
				}
				else {
					assert.ok(p.east() instanceof Position, `i == ${i}`);
				}
				//West-most row
				if (i % NUM_COLS === NUM_COLS - 1) {
					assert.equal(p.west(), null, `i == ${i}`);
				}
				else {
					assert.ok(p.west() instanceof Position, `i == ${i}`);
				}
			}
		})
	});
});
