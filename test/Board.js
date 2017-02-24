const assert = require('chai').assert;
const Board = require('../src/board/Board').default;

/* Test assumes an invariant board representation */
describe('Board', function () {
	it('should initialize the shogi game board', function () {
		let board = new Board();
	});
});
