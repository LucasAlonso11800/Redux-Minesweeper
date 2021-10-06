import { getMinePositions, positionMatch } from './Helpers';
import { TileType, ETileStatus, BoardType } from '../types/types';

export function createBoard(boardSize: number, numberOfMines: number) {
    const board: BoardType = []
    const minePositions = getMinePositions(boardSize, numberOfMines);
    
    for (let x = 0; x < boardSize; x++) {
        const row = []
        for (let y = 0; y < boardSize; y++) {
            const tile: TileType = {
                x,
                y,
                mine: minePositions.some(p => positionMatch(p, { x, y })),
                status: ETileStatus.HIDDEN,
                text: undefined
            };
            row.push(tile)
        }
        board.push(row)
    };

    return board
};