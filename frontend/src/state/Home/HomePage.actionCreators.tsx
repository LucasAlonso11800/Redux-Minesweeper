// Actions
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";
// Types
import { Dispatch } from "redux";
import { BoardType, TileType } from "../../types/types";
import axios from "axios";
import { ServerURL } from "../../consts/ServerURL";

export const startGame = (difficulty: number) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.START_GAME,
            payload: { difficulty }
        });
    };
};

export const revealTile = (tile: TileType) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.REVEAL_TILE,
            payload: { tile }
        });
    };
};

export const markTile = (tile: TileType) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.MARK_TILE,
            payload: { tile }
        });
    };
};

export const revealAllMines = (board: BoardType) => {
    return (dispatch: Dispatch<HomePageAction>) => {
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.mine) dispatch({
                    type: HomePageActionTypes.REVEAL_TILE,
                    payload: { tile }
                });
            });
        });
    };
};

export const setGameLost = () => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.SET_GAME_LOST
        });
    };
};

export const setGameWon = () => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.SET_GAME_WON
        });
    };
};

export const setGameWaiting = () => {
    return (dispatch: Dispatch<HomePageAction>) => {
        dispatch({
            type: HomePageActionTypes.SET_GAME_WAITING
        });
    };
};

export const sendScore = (level_id: number, username: string, time: number) => {
    return async (dispatch: Dispatch<HomePageAction>) => {
        dispatch({ type: HomePageActionTypes.SEND_SCORE_BEGIN });
        try {
            await (await axios.post(ServerURL, { level_id, username, time })).data
            dispatch({ type: HomePageActionTypes.SEND_SCORE_SUCCESS })
        }
        catch (err) {
            dispatch({ type: HomePageActionTypes.SEND_SCORE_FAILURE })
        }
    }
};