// Actions
import { HomePageAction } from "./HomePage.actions";
import { HomePageActionTypes } from "./HomePage.actionTypes";
// Helpers
import { createBoard } from "../../helpers/createBoard";
import { setNumberOfMines, listMinesLeft } from "../../helpers/Helpers";
import { updateBoard } from "../../helpers/updateBoard";
// Types
import { BoardType, EGameStatus, ETileStatus, TileType } from "../../types/types";

export type HomePageState = {
    message: string
    numberOfMines: number
    initialNumberOfMines: number
    difficulty: number
    boardSize: number
    board: BoardType
    gameStatus: EGameStatus
    sendingScore: boolean
    sendingScoreSuccess: boolean
    startTime: number
    endTime: number
};

const initialState: HomePageState = {
    message: 'Start playing',
    numberOfMines: 10,
    initialNumberOfMines: 10,
    difficulty: 1,
    boardSize: 10,
    board: [],
    gameStatus: EGameStatus.WAITING,
    sendingScore: false,
    sendingScoreSuccess: false,
    startTime: 0,
    endTime: 0
};

export const HomePageReducer = (state: HomePageState = initialState, action: HomePageAction): HomePageState => {
    switch (action.type) {
        case HomePageActionTypes.START_GAME: {
            const { difficulty } = action.payload
            const numberOfMines: number = setNumberOfMines(action.payload.difficulty);

            return {
                ...state,
                gameStatus: EGameStatus.PLAYING,
                difficulty,
                numberOfMines,
                initialNumberOfMines: numberOfMines,
                message: `Mines left: ${numberOfMines}`,
                board: createBoard(state.boardSize, numberOfMines),
                startTime: Date.now()
            };
        };
        case HomePageActionTypes.REVEAL_TILE: {
            const { tile } = action.payload
            return {
                ...state,
                board: updateBoard(state.board, tile)
            }
        };
        case HomePageActionTypes.SET_GAME_WON: return {
            ...state,
            message: 'You win! :)',
            gameStatus: EGameStatus.WON,
            endTime: Date.now()
        };
        case HomePageActionTypes.SET_GAME_LOST: return {
            ...state,
            message: 'You lose! :(',
            gameStatus: EGameStatus.LOST
        };
        case HomePageActionTypes.SET_GAME_WAITING: return {
            ...state,
            message: 'Start playing',
            gameStatus: EGameStatus.WAITING,
            sendingScoreSuccess: false,
            startTime: 0,
            endTime: 0
        };
        case HomePageActionTypes.MARK_TILE: {
            const { tile } = action.payload
            const isNotHiddenOrMarked = tile.status !== ETileStatus.HIDDEN && tile.status !== ETileStatus.MARKED
            if (isNotHiddenOrMarked) return state

            const newTile: TileType = { ...tile, status: tile.status === ETileStatus.MARKED ? ETileStatus.HIDDEN : ETileStatus.MARKED };

            const newBoard = [...state.board]
            newBoard[tile.x].splice(tile.y, 1, newTile);

            return {
                ...state,
                board: newBoard,
                numberOfMines: listMinesLeft(newBoard, state.initialNumberOfMines),
                message: `Mines Left: ${listMinesLeft(newBoard, state.initialNumberOfMines)}`
            };
        };
        case HomePageActionTypes.SEND_SCORE_BEGIN: return {
            ...state,
            sendingScore: true
        };
        case HomePageActionTypes.SEND_SCORE_SUCCESS: return {
            ...state,
            sendingScore: false,
            sendingScoreSuccess: true
        };
        case HomePageActionTypes.SEND_SCORE_FAILURE: return {
            ...state,
            sendingScore: false,
            sendingScoreSuccess: false
        };
        default: return state
    }
};