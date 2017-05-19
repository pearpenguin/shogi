const assert = require('chai').assert;
const utils = require('../src/utils/utils');
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
	let board;
	beforeEach(function () {
		board = new Board();
	})

	describe('piece movement rules', function () {
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
					let king = new King(COLOR.BLACK);
					board.putPiece(king, p.toIdx(5, 'e'));
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
					let gold = new Gold(COLOR.BLACK);
					board.putPiece(gold, p.toIdx(5, 'e'));
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
					let gold = new Gold(COLOR.WHITE);
					board.putPiece(gold, p.toIdx(5, 'e'));
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
					let silver = new Silver(COLOR.BLACK);
					board.putPiece(silver, p.toIdx(5, 'e'));
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
					let silver = new Silver(COLOR.WHITE);
					board.putPiece(silver, p.toIdx(5, 'e'));
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
					let knight = new Knight(COLOR.BLACK);
					board.putPiece(knight, p.toIdx(4, 'e'));
					assert.sameMembers(knight.getLegalMoves(board), legalMoves);
				});
			});
			describe("White knight's legal moves on an empty board", function () {
				let legalMoves = [
					p.toIdx(3, 'g'), p.toIdx(5, 'g'),
				];
				it('should be able to move like a knight in western chess', function () {
					let knight = new Knight(COLOR.WHITE);
					board.putPiece(knight, p.toIdx(4, 'e'));
					assert.sameMembers(knight.getLegalMoves(board), legalMoves);
				});
			});
		});

		/* TODO: test legal moves for lance, rook, bishop in situation where
		 * opponent's pieces are in the way */
		describe('Lance', function () {
			describe("Black lance's legal moves on an empty board", function () {
				let legalMoves = [
					p.toIdx(9, 'a'), p.toIdx(9, 'b'), p.toIdx(9, 'c'),
					p.toIdx(9, 'd'), p.toIdx(9, 'e'), p.toIdx(9, 'f'),
					p.toIdx(9, 'g'), p.toIdx(9, 'h'),
				];
				it('should be able to move up any number of steps', function () {
					let lance = new Lance(COLOR.BLACK);
					board.putPiece(lance, p.toIdx(9, 'i'));
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
					let lance = new Lance(COLOR.WHITE);
					board.putPiece(lance, p.toIdx(9, 'a'));
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
					let bishop = new Bishop(COLOR.BLACK);
					board.putPiece(bishop, p.toIdx(5, 'e'));
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
					let rook = new Rook(COLOR.BLACK);
					board.putPiece(rook, p.toIdx(5, 'e'));
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
					let pawn = new Pawn(COLOR.BLACK);
					board.putPiece(pawn, p.toIdx(5, 'e'));
					assert.sameMembers(pawn.getLegalMoves(board), legalMoves);
				});
			});

			describe("White pawn's legal moves on an empty board", function () {
				let legalMoves = [
					p.toIdx(5, 'f'),
				];
				it('should be able to move up one step', function () {
					let pawn = new Pawn(COLOR.WHITE);
					board.putPiece(pawn, p.toIdx(5, 'e'));
					assert.sameMembers(pawn.getLegalMoves(board), legalMoves);
				});
			});
		});
	});

	describe('promotion rules', function () {
		beforeEach(function () {
			board.clearBoard();
		});

		it('should let black pieces promote in rows a to c', function () {
			let squares = [
				p.toIdx(9, 'c'), 
				p.toIdx(1, 'c'), 
				p.toIdx(9, 'b'),
				p.toIdx(1, 'a')
			];
			squares.forEach((square) => {
				board.clearBoard();
				let pawn = new Pawn(COLOR.BLACK);
				board.putPiece(pawn, square);
				assert.isTrue(pawn.promote());
				assert.isTrue(pawn.isPromoted);
			});
		});

		it('should not let black pieces promote in rows d to i', function () {
			let squares = [
				p.toIdx(9, 'd'), 
				p.toIdx(1, 'e'), 
				p.toIdx(9, 'h'),
				p.toIdx(1, 'i')
			];
			squares.forEach((square) => {
				board.clearBoard();
				let pawn = new Pawn(COLOR.BLACK);
				board.putPiece(pawn, square);
				assert.isFalse(pawn.promote());
				assert.isFalse(pawn.isPromoted);
			});
		});

		it('should let white pieces promote in rows g to i', function () {
			let squares = [
				p.toIdx(9, 'g'), 
				p.toIdx(1, 'g'), 
				p.toIdx(9, 'h'),
				p.toIdx(1, 'i')
			];
			squares.forEach((square) => {
				board.clearBoard();
				let pawn = new Pawn(COLOR.WHITE);
				board.putPiece(pawn, square);
				assert.isTrue(pawn.promote());
				assert.isTrue(pawn.isPromoted);
			});
		});

		it('should not let black pieces promote in rows a to f', function () {
			let squares = [
				p.toIdx(9, 'a'), 
				p.toIdx(1, 'b'), 
				p.toIdx(9, 'e'),
				p.toIdx(1, 'f')
			];
			squares.forEach((square) => {
				board.clearBoard();
				let pawn = new Pawn(COLOR.WHITE);
				board.putPiece(pawn, square);
				assert.isFalse(pawn.promote());
				assert.isFalse(pawn.isPromoted);
			});
		});

		describe('King is not promotable', function () {
			it('should not let king promote', function () {
				let king = new King(COLOR.BLACK);
				board.putPiece(king, p.toIdx(5, 'c'));
				assert.isFalse(king.promote());
				assert.isFalse(king.isPromoted);
			});
		});

		describe('Gold is not promotable', function () {
			it('should not let Gold promote', function () {
				let gold = new Gold(COLOR.BLACK);
				board.putPiece(gold, p.toIdx(5, 'c'));
				assert.isFalse(gold.promote());
				assert.isFalse(gold.isPromoted);
			});
		});
	});

	describe('.move', function () {
		let bishop; 
		let dest = p.toIdx(4, 'd');
		beforeEach(function () {
			bishop = new Bishop(COLOR.BLACK);
			board.clearBoard();
			board.putPiece(bishop, p.toIdx(5, 'e'));
		});

		it('should move a piece to an empty destination if legal', function () {
			assert.isTrue(board.move(bishop, dest));
			assert.strictEqual(board.getPiece(dest), bishop);			
		});
		it('should return false on an illegal move', function () {
			assert.isFalse(board.move(bishop, p.toIdx(4, 'e')));
		});
		it('should capture an opposing piece and put it in own resevoir in demoted status', function () {
			let pawn = new Pawn(COLOR.WHITE);
			pawn.isPromoted = true;
			board.putPiece(pawn, dest);
			assert.isTrue(board.move(bishop, dest));
			assert.strictEqual(board.getPiece(dest), bishop);
			assert.includeMembers(board.getResevoir(COLOR.BLACK), [pawn]);
			assert.isFalse(pawn.isPromoted);
		});
		it('should promote a piece if it is in promotion zone '
		 + 'and no legal moves are available', function () {
			let pawn = new Pawn(COLOR.BLACK);
			board.putPiece(pawn, p.toIdx(1, 'b'));
			board.move(pawn, p.toIdx(1, 'a'));
			assert.isTrue(pawn.isPromoted);
		});
	});

	describe('.computeAttack', function () {
		it ('should return the squares that the specified pieces are attacking', function () {
			let b1 = new Bishop(COLOR.BLACK, p.toIdx(5, 'e'));
			let p1 = new Pawn(COLOR.BLACK, p.toIdx(4, 'e'));
			let p2 = new Pawn(COLOR.BLACK, p.toIdx(3, 'g'));
			let p3 = new Pawn(COLOR.BLACK, p.toIdx(7, 'g'));
			let attackers = [b1, p1, p2, p3];
			attackers.forEach((piece) => {
				board.putPiece(piece, piece.pos);
			})
			board.putPiece(new Pawn(COLOR.WHITE), p.toIdx(4, 'd'));
			board.putPiece(new Pawn(COLOR.WHITE), p.toIdx(7, 'c'));

			let expected = utils.createDblArray(defs.BOARD_SIZE);
			expected[p.toIdx(4, 'd')] = [b1, p1];
			expected[p.toIdx(6, 'd')] = [b1];
			expected[p.toIdx(7, 'c')] = [b1];
			expected[p.toIdx(4, 'f')] = [b1];
			expected[p.toIdx(6, 'f')] = [b1];
			expected[p.toIdx(3, 'f')] = [p2];
			expected[p.toIdx(7, 'f')] = [p3];
			let actual = board.computeAttack(attackers);
			for (let i = 0; i < defs.BOARD_SIZE; i++) {
				assert.isArray(actual[i]);
				assert.sameMembers(actual[i], expected[i], `i = ${i}`);
			}
		});
	});

	describe('.isCheckmate', function () {

		let king = new King(COLOR.WHITE, p.toIdx(5, 'a'));
		it('should return true when the King cannot avoid being captured on its next turn', function () {
			debugger;
			board.addPiece(king);
			board.addPiece(new Silver(COLOR.BLACK, p.toIdx(5, 'c')));
			assert.isFalse(board.isCheckmate(king));

			board.addPiece(new Gold(COLOR.BLACK, p.toIdx(5, 'b')));
			assert.isTrue(board.isCheckmate(king));

			/* TODO: generate tests from tsume shogi database for thorough testing*/
		});
	});
});
