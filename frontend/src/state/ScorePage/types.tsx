import { Score } from "../../types/types";
import { ScorePageActionTypes } from "./ScorePage.actionTypes";

export type ScorePageState = {
    scores: Score[],
    loading: boolean,
    error: string | null
};

export type FetchScoresBegin = {
    type: ScorePageActionTypes.FETCH_SCORES_BEGIN
};

export type FetchScoresSuccess = {
    type: ScorePageActionTypes.FETCH_SCORES_SUCCESS,
    payload: Score[]
};

export type FetchScoresFailure = {
    type: ScorePageActionTypes.FETCH_SCORES_FAILURE,
};

export type ScorePageActions = FetchScoresBegin | FetchScoresSuccess | FetchScoresFailure;
