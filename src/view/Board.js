import m from 'mithril';
import Board from '../board/Board';
import { NUM_COLS, BOARD_SIZE, COLOR } from '../board/defs';
import '../css/board.scss';
import Piece from './Piece';

export default {
	board: null,
	player: null,
	selectedPiece: null,
	legalMoves: [],
	setSelectedPiece (piece) {
		this.selectedPiece = piece;
		this.legalMoves = this.selectedPiece.getLegalMoves(this.board);
	},
	isPieceSelected (piece) {
		return this.selectedPiece && this.selectedPiece === piece;
	},
	isLegalMove (pos) {
		return this.legalMoves.indexOf(pos) !== -1;
	},
	view (vnode) {
		let state = vnode.state;
		/* Put rows into table-like structure */
		let rows = [];
		/* Create vnodes for the board squares */
		let squares = this.board.getBoard().map((piece, pos) => {
			let mPiece = null;
			let onclick = null;
			if (piece) {
				mPiece = m(Piece, {
					piece,
				});
				onclick = ((e) => {
					this.setSelectedPiece(piece);
				});
			}
			/* Construct class string for this square */
			let classStr = [
				this.isPieceSelected(piece) ? 'board__piece-selected' : '',
				this.isLegalMove(pos) ? 'board__legal-move' : '',
			].join(' ');
			return m('div.board__square', {
				class: classStr,
				piece,
				onclick,
			}, mPiece);
		});
		/* Flip the board orientation for white player */
		if (this.player === COLOR.WHITE) {
			squares.reverse();
		}
		/* Order the squares into correct order */
		for (let i = 0; i < BOARD_SIZE; i += NUM_COLS) {
			let row = squares.slice(i, i+9).reverse();
			rows.push(m('div', row));
		}
		return m('div.board__grid', rows);
	},
	oninit (vnode) {
		this.player = vnode.attrs.player ? vnode.attrs.player : COLOR.BLACK;
		this.board = vnode.attrs.board ? vnode.attrs.board : new Board();
		this.board.initBoard();
	}
};