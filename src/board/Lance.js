import Piece from './Piece';
import { DIR, INFINITE } from './defs';

export default class Lance extends Piece {

	/* Moves any number of steps UP */
	getLegalMoves (board) {
		return this.computeLegalMoves(board, [ DIR.UP ], INFINITE);
	}
}
