import { BLACK, WHITE } from './defs';

export default class Piece {
	constructor (color, pos = null) {
		this.color = color;
		this.pos = pos;
		this.isPromoted = false;
	}

	getLegalMoves (board) {
	}
}