import { ETileStatus, Position, BoardType, TileType } from "../types/types";

export const setNumberOfMines = (difficulty: number): number => {
    switch (difficulty) {
        case 1: return 10;
        case 2: return 20;
        case 3: return 40;
        default: return 10;
    }
};

export const repeat = (boardSize: number): string => {
    let result: string = '60px ';
    for (let i = 1; i < boardSize; i++) {
        result += '60px '
    };
    return result;
};

export const getNearbyTiles = (board: BoardType, tile: TileType): TileType[] => {
    const tiles: TileType[] = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if (xOffset === 0 && yOffset === 0) continue
            const nearbyTile = board[tile.x + xOffset]?.[tile.y + yOffset];
            if (nearbyTile) tiles.push(nearbyTile)
        }
    }
    return tiles
};

export const listMinesLeft = (board: BoardType, initialNumberOfMines: number): number => {
    const markedTiles: number = board.reduce((acc, row) => {
        return acc + row.filter(tile => tile.status === ETileStatus.MARKED).length
    }, 0);

    return initialNumberOfMines - markedTiles
};

const randomNumber = (number: number) => Math.floor(Math.random() * number);

export const positionMatch = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

export const getMinePositions = (boardSize: number, numberOfMines: number) => {
    const positions: Position[] = [];

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize)
        }
        if (!positions.some(p => positionMatch(p, position))) {
            positions.push(position);
        }
    }
    return positions
};

export const checkWin = (board: BoardType) => {
    return board.every(row => {
        return row.every(tile => {
            const isANumber = tile.status === ETileStatus.NUMBER;
            const isAMineNotRevealed = tile.mine && (tile.status === ETileStatus.HIDDEN || tile.status === ETileStatus.MARKED)
            return isANumber || isAMineNotRevealed
        })
    })
};

export const checkLose = (board: BoardType) => {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === ETileStatus.MINE
        })
    })
};