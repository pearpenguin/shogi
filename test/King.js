const assert = require('chai').assert;
const position = require('../src/board/position');
const Board = require('../src/board/Board').default;
const King = require('../src/board/King').default;

/* Test assumes an invariant board representation */
describe('King', function () {
	describe("Black King's legal moves on a new board", function () {
		it('should only have 4h, 5h, 6h as legal moves', function () {
			let board = new Board();
			let king = board.getPiece(position.toIdx(5, 'i'));
			let moves = king.getLegalMoves(board);
			let legalMoves = [
				position.toIdx(4, 'h'),
				position.toIdx(5, 'h'),
				position.toIdx(6, 'h'),
			]
			assert.sameMembers(moves, legalMoves)
		});
	});
});
