import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActionCreators from '../state/Home/HomePage.actionCreators';
// Helpers
import { checkLose, checkWin, getNearbyTiles } from '../helpers/Helpers';
// Types
import { BoardType, EGameStatus, ETileStatus, TileType } from '../types/types'

type Props = {
    tile: TileType,
    board: BoardType,
    gameStatus: EGameStatus
};

export default function Tile(props: Props) {
    const { tile, board, gameStatus } = props;

    const dispatch = useDispatch();
    const { revealTile, markTile, setGameWon, setGameLost, revealAllMines } = bindActionCreators(HomePageActionCreators, dispatch);

    const handleClick = () => {
        if(tile.status !== ETileStatus.HIDDEN) return;
        revealTile(tile);

        const adjacentTiles = getNearbyTiles(board, tile);
        const mines = adjacentTiles.filter(t => t.mine);

        if(mines.length === 0) adjacentTiles.forEach(t => revealTile(t));

        const win = checkWin(board);
        const lose = checkLose(board);

        if (win) setGameWon();

        if (lose) {
            setGameLost();
            revealAllMines(board);
        };
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        markTile(tile);
    };

    return (
        <div
            onClick={gameStatus === EGameStatus.PLAYING ? () => handleClick() : () => { }}
            onContextMenu={gameStatus === EGameStatus.PLAYING ? (e) => handleContextMenu(e) : () => { }}
            className={tile.status}
        >
            {tile.text}
        </div>
    );
};