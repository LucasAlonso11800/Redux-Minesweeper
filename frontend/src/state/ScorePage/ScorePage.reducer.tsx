import { ScorePageActions, ScorePageState } from "./types";
import { ScorePageActionTypes } from "./ScorePage.actionTypes";

const initialState: ScorePageState = {
    scores: [],
    loading: false,
    error: null
}

export const scorePageReducer = (state: ScorePageState = initialState, action: ScorePageActions): ScorePageState => {
    switch (action.type) {
        case ScorePageActionTypes.FETCH_SCORES_BEGIN: return {
            ...state,
            loading: true,
            error: null
        };
        case ScorePageActionTypes.FETCH_SCORES_SUCCESS: return {
            ...state,
            loading: false,
            scores: action.payload
        };
        case ScorePageActionTypes.FETCH_SCORES_FAILURE: return {
            scores: [],
            loading: false,
            error: null,
        }
        default: return state
    }
};