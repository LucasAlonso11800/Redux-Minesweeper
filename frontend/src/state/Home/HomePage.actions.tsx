import { HomePageActionTypes } from "./HomePage.actionTypes";
import { BoardType, TileType } from "../../types/types";

type StartGameAction = {
    type: HomePageActionTypes.START_GAME,
    payload: {
        difficulty: number
    }
};

type RevealTileAction = {
    type: HomePageActionTypes.REVEAL_TILE,
    payload: {
        tile: TileType
    }
};

type MarkTileAction = {
    type: HomePageActionTypes.MARK_TILE,
    payload: {
        tile: TileType
    }
};

type SetGameLostAction = {
    type: HomePageActionTypes.SET_GAME_LOST
};

type SetGameWonAction = {
    type: HomePageActionTypes.SET_GAME_WON
};

type SetGameWaitingAction = {
    type: HomePageActionTypes.SET_GAME_WAITING
};

type SendScoreBeginAction = {
    type: HomePageActionTypes.SEND_SCORE_BEGIN
};

type SendScoreSuccessAction = {
    type: HomePageActionTypes.SEND_SCORE_SUCCESS
};

type SendScoreFailureAction = {
    type: HomePageActionTypes.SEND_SCORE_FAILURE
};

export type HomePageAction = StartGameAction | RevealTileAction | MarkTileAction | SetGameWonAction | SetGameLostAction | SetGameWaitingAction | SendScoreBeginAction | SendScoreSuccessAction | SendScoreFailureAction;