import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../state/RootReducer';
import { fetchScores } from '../state/ScorePage/ScorePage.actions';
import { DataGrid } from '@material-ui/data-grid';
import { tableColumns } from '../consts/TableColumns';
import { Button, CircularProgress } from '@material-ui/core';

export default function ScorePage() {
    const { loading, scores } = useSelector((state: State) => state.scorePage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchScores(1))
    }, [dispatch]);

    return (
        <main className="container">
            <div className="score-page__container">
                <div className="score-page__buttons">
                    <Button variant="contained" onClick={() => dispatch(fetchScores(1))}>Level 1</Button>
                    <Button variant="contained" onClick={() => dispatch(fetchScores(2))}>Level 2</Button>
                    <Button variant="contained" onClick={() => dispatch(fetchScores(3))}>Level 3</Button>
                </div>
                <div className="score-page__table-container">
                    {loading ? <CircularProgress /> :
                        <DataGrid
                            columns={tableColumns}
                            rows={scores}
                            pagination={true}
                            autoPageSize
                            showCellRightBorder={false}
                            rowHeight={38} />
                    }
                </div>
            </div>
        </main>
    )
};