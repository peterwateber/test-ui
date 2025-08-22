import clsx from 'clsx';
import React from 'react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export const TicTacToe: React.FC = ({}) => {
	const size = 3; // 3x3 grid
	const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X');
	const [board, setBoard] = React.useState<Board>(Array(size * size).fill(null));
	const [winner, setWinner] = React.useState<Player | 'Draw' | null>(null);

	const generateWins = (size: number) => {
		const wins: number[][] = [];
		// Rows
		for (let i = 0; i < size; i++) {
			wins.push(Array.from({ length: size }, (_, j) => i * size + j));
		}
		// Columns
		for (let i = 0; i < size; i++) {
			wins.push(Array.from({ length: size }, (_, j) => i + j * size));
		}
		// Diagonals
		wins.push(Array.from({ length: size }, (_, i) => i * (size + 1))); // Top-left to bottom-right
		wins.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1))); // Top-right to bottom-left
		return wins;
	};

	const checkWinner = (board: Board, size: number) => {
		const wins = generateWins(size);

		for (let line of wins) {
			if (line.every((index) => board[index] === currentPlayer)) {
				return currentPlayer;
			}
		}

		return board.every((cell) => cell !== null) ? 'Draw' : null;
	};

	const handleCellClick = React.useCallback(
		(index: number) => {
			if (board[index] && checkWinner(board, size) === null) {
				return;
			}

			const newBoard = [...board];
			newBoard[index] = currentPlayer;

			const maybeWinner = checkWinner(newBoard, size);

			setWinner(maybeWinner);
			setBoard(newBoard);

			if (!maybeWinner) setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
		},
		[board, currentPlayer, size],
	);

	return (
		<section className="section">
			<h2>{winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}</h2>
			<figure className="tic-tac-toe__container">
				{board.map((cell, index) => (
					<div
						className={clsx('tic-tac-toe__cell', {
							rotate: cell === currentPlayer,
						})}
						key={index}
						onClick={() => handleCellClick(index)}
					>
						{cell || ' '}
					</div>
				))}
			</figure>
		</section>
	);
};
