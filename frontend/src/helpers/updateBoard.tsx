import { BoardType, ETileStatus, TileType } from "../types/types";
import { getNearbyTiles } from "./Helpers";

const updateTile = (board: BoardType, tile: TileType): TileType => {
    if (tile.mine) return {
        ...tile,
        status: ETileStatus.MINE
    };

    const adjacentTiles = getNearbyTiles(board, tile);
    const mines = adjacentTiles.filter(t => t.mine);

    return {
        ...tile,
        text: mines.length > 0 ? mines.length.toString() : undefined,
        status: ETileStatus.NUMBER
    };
};

export const updateBoard = (board: BoardType, tile: TileType): BoardType => {
    if (tile.status !== ETileStatus.HIDDEN) return board

    const newTile = updateTile(board, tile);

    if (newTile) {
        board[tile.x].splice(tile.y, 1, newTile);

        return board
    };
    return board
};