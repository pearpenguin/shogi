const assert = require('chai').assert;
const p = require('../src/board/position');
const Board = require('../src/board/Board').default;
const King = require('../src/board/King').default;
const Gold = require('../src/board/Gold').default;
const Silver = require('../src/board/Silver').default;
const Knight = require('../src/board/Knight').default;
const Lance = require('../src/board/Lance').default;
const Bishop = require('../src/board/Bishop').default;
const Rook = require('../src/board/Rook').default;
const Pawn = require('../src/board/Pawn').default;
const defs = require('../src/board/defs');
const COLOR = defs.COLOR;

/* Tests assumes an invariant board representation */
describe('Board', function () {
	let board = new Board();
	beforeEach(function () {
		board.clearBoard();
	});

	describe('King', function () {
		describe("Black King's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(4, 'd'), p.toIdx(5, 'd'), p.toIdx(6, 'd'),
				p.toIdx(4, 'e'), p.toIdx(6, 'e'),
				p.toIdx(4, 'f'), p.toIdx(5, 'f'), p.toIdx(6, 'f'),
			];
			it('should be able to move one step in any direction', function () {
				let king = new King(COLOR.BLACK, p.toIdx(5, 'e'));
				board.putPiece(king);
				assert.sameMembers(king.getLegalMoves(board), legalMoves)
			});
		});

		describe("Black King's legal moves on a new board", function () {
			it('should only have 4h, 5h, 6h as legal moves', function () {
				board.initBoard();
				let king = board.getPiece(p.toIdx(5, 'i'));
				let legalMoves = [
					p.toIdx(4, 'h'), p.toIdx(5, 'h'), p.toIdx(6, 'h'),
				]
				assert.sameMembers(king.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Gold', function () {
		describe("Black gold's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(4, 'd'), p.toIdx(5, 'd'), p.toIdx(6, 'd'),
				p.toIdx(4, 'e'), p.toIdx(6, 'e'),
				p.toIdx(5, 'f'),
			];
			it('should be able to move one step in any direction ' +
				'except downleft and downright', function () {
				let gold = new Gold(COLOR.BLACK, p.toIdx(5, 'e'));
				board.putPiece(gold);
				assert.sameMembers(gold.getLegalMoves(board), legalMoves);
			});
		});
		describe("White gold's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(5, 'd'),
				p.toIdx(4, 'e'), p.toIdx(6, 'e'),
				p.toIdx(4, 'f'), p.toIdx(5, 'f'), p.toIdx(6, 'f'),
			];
			it('should be able to move one step in any direction ' +
				'except downleft and downright', function () {
				let gold = new Gold(COLOR.WHITE, p.toIdx(5, 'e'));
				board.putPiece(gold);
				assert.sameMembers(gold.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Silver', function () {
		describe("Black silver's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(4, 'd'), p.toIdx(5, 'd'), p.toIdx(6, 'd'),
				p.toIdx(4, 'f'), p.toIdx(6, 'f'),
			];
			it('should be able to move one step in any direction ' +
				'except left, right, and down', function () {
				let silver = new Silver(COLOR.BLACK, p.toIdx(5, 'e'));
				board.putPiece(silver);
				assert.sameMembers(silver.getLegalMoves(board), legalMoves);
			});
		});
		describe("White silver's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(4, 'd'), p.toIdx(6, 'd'),
				p.toIdx(4, 'f'), p.toIdx(5, 'f'), p.toIdx(6, 'f'),
			];
			it('should be able to move one step in any direction ' +
				'except left, right, and down', function () {
				let silver = new Silver(COLOR.WHITE, p.toIdx(5, 'e'));
				board.putPiece(silver);
				assert.sameMembers(silver.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Knight', function () {
		describe("Black knight's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(3, 'c'), p.toIdx(5, 'c'),
			];
			it('should be able to move like a knight in western chess', function () {
				let knight = new Knight(COLOR.BLACK, p.toIdx(4, 'e'));
				board.putPiece(knight);
				assert.sameMembers(knight.getLegalMoves(board), legalMoves);
			});
		});
		describe("White knight's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(3, 'g'), p.toIdx(5, 'g'),
			];
			it('should be able to move like a knight in western chess', function () {
				let knight = new Knight(COLOR.WHITE, p.toIdx(4, 'e'));
				board.putPiece(knight);
				assert.sameMembers(knight.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Lance', function () {
		describe("Black lance's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(9, 'a'), p.toIdx(9, 'b'), p.toIdx(9, 'c'),
				p.toIdx(9, 'd'), p.toIdx(9, 'e'), p.toIdx(9, 'f'),
				p.toIdx(9, 'g'), p.toIdx(9, 'h'),
			];
			it('should be able to move up any number of steps', function () {
				let lance = new Lance(COLOR.BLACK, p.toIdx(9, 'i'));
				board.putPiece(lance);
				assert.sameMembers(lance.getLegalMoves(board), legalMoves);
			});
		});
		describe("White lance's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(9, 'b'), p.toIdx(9, 'c'),
				p.toIdx(9, 'd'), p.toIdx(9, 'e'), p.toIdx(9, 'f'),
				p.toIdx(9, 'g'), p.toIdx(9, 'h'), p.toIdx(9, 'i'),
			];
			it('should be able to move up any number of steps', function () {
				let lance = new Lance(COLOR.WHITE, p.toIdx(9, 'a'));
				board.putPiece(lance);
				assert.sameMembers(lance.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Bishop', function () {
		describe("Black bishop's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(6, 'd'), p.toIdx(7, 'c'), p.toIdx(8, 'b'), p.toIdx(9, 'a'),
				p.toIdx(6, 'f'), p.toIdx(7, 'g'), p.toIdx(8, 'h'), p.toIdx(9, 'i'),
				p.toIdx(4, 'd'), p.toIdx(3, 'c'), p.toIdx(2, 'b'), p.toIdx(1, 'a'),
				p.toIdx(4, 'f'), p.toIdx(3, 'g'), p.toIdx(2, 'h'), p.toIdx(1, 'i'),
			];
			it('should be able to move like a bishop in western chess', function () {
				let bishop = new Bishop(COLOR.BLACK, p.toIdx(5, 'e'));
				board.putPiece(bishop);
				assert.sameMembers(bishop.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Rook', function () {
		describe("Black rook's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(5, 'd'), p.toIdx(5, 'c'), p.toIdx(5, 'b'), p.toIdx(5, 'a'),
				p.toIdx(5, 'f'), p.toIdx(5, 'g'), p.toIdx(5, 'h'), p.toIdx(5, 'i'),
				p.toIdx(6, 'e'), p.toIdx(7, 'e'), p.toIdx(8, 'e'), p.toIdx(9, 'e'),
				p.toIdx(4, 'e'), p.toIdx(3, 'e'), p.toIdx(2, 'e'), p.toIdx(1, 'e'),
			];
			it('should be able to move like a rook in western chess', function () {
				let rook = new Rook(COLOR.BLACK, p.toIdx(5, 'e'));
				board.putPiece(rook);
				assert.sameMembers(rook.getLegalMoves(board), legalMoves);
			});
		});
	});

	describe('Pawn', function () {
		describe("Black pawn's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(5, 'd'),
			];
			it('should be able to move up one step', function () {
				let pawn = new Pawn(COLOR.BLACK, p.toIdx(5, 'e'));
				board.putPiece(pawn);
				assert.sameMembers(pawn.getLegalMoves(board), legalMoves);
			});
		});

		describe("White pawn's legal moves on an empty board", function () {
			let legalMoves = [
				p.toIdx(5, 'f'),
			];
			it('should be able to move up one step', function () {
				let pawn = new Pawn(COLOR.WHITE, p.toIdx(5, 'e'));
				board.putPiece(pawn);
				assert.sameMembers(pawn.getLegalMoves(board), legalMoves);
			});
		});
	});
});
