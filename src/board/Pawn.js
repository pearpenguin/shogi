import Piece from './Piece';
import { DIR } from './defs';

export default class Pawn extends Piece {

	/* Pawn can only move up */
	getLegalMoves (board) {
		let directions = [DIR.UP];

		return this.computeLegalMoves(board, directions);
	}
}
