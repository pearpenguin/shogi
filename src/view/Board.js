import m from 'mithril';
import Board from '../board/Board';
import { NUM_COLS, BOARD_SIZE } from '../board/defs';
import '../css/board.scss';

export default {
	board: new Board(),
	view () {
		/* Construct rows */
		let rows = [];
		let squares = this.board.getBoard().map((piece, pos) => {
			return m('div', pos);
		});
		for (let i = 0; i < BOARD_SIZE; i += NUM_COLS) {
			//Correct orientation for black player (TODO: white player orientation)
			let row = squares.slice(i, i+9).reverse();
			rows.push(m('div', {class: 'board-grid__row'}, row));
		}
		return m('div', {class: 'board-grid'}, rows);
	},
};