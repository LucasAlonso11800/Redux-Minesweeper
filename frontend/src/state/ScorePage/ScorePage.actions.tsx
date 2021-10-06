import axios from 'axios';
// Const
import { ServerURL } from "../../consts/ServerURL";
// Types
import { Dispatch } from "redux";
import { Score } from "../../types/types";
import { ScorePageActions } from "./types";
import { ScorePageActionTypes } from "./ScorePage.actionTypes";

export function fetchScores(levelId: number) {
    return async (dispatch: Dispatch<ScorePageActions>) => {
        dispatch({
            type: ScorePageActionTypes.FETCH_SCORES_BEGIN
        });
        try {
            const scores: Score[] = await (await axios.get(`${ServerURL}/${levelId}`)).data
            return dispatch({
                type: ScorePageActionTypes.FETCH_SCORES_SUCCESS,
                payload: scores
            })
        }
        catch (err) {
            dispatch({
                type: ScorePageActionTypes.FETCH_SCORES_FAILURE
            });
        }
    };
};