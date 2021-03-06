import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActionCreators from '../state/Home/HomePage.actionCreators';
// styles
import { makeStyles } from '@material-ui/styles';
// Components
import Tile from '../components/Tile';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import SubmitModal from '../components/SubmitModal';
// Types
import { State } from '../state/RootReducer';
// Helpers
import { repeat } from '../helpers/Helpers';
import { EGameStatus } from '../types/types';

const useStyles = makeStyles(() => ({
    button: {
        fontFamily: 'Secular One, sans-serif'
    },
    radio: {
        color: '#FFF'
    }
}));

export default function HomePage() {
    const [difficulty, setDifficulty] = useState(1);

    const { board, boardSize, message, gameStatus } = useSelector((state: State) => state.homePage);
    const dispatch = useDispatch();

    const { startGame, setGameWaiting } = bindActionCreators(HomePageActionCreators, dispatch);

    useEffect(() => {
        setGameWaiting()
    }, []);

    const classes = useStyles();

    return (
        <main className="container">
            <div className="info">
                <h3 className="title">Minesweeper</h3>
                <div className="subtext">
                    {message}
                </div>
                <form className="form">
                    <p className="form-title">Choose difficulty</p>
                    <div className="form-input">
                        <FormControl component="fieldset">
                            <RadioGroup value={difficulty} onChange={(e) => setDifficulty(parseInt(e.currentTarget.value))} >
                                <FormControlLabel
                                    value={1}
                                    control={<Radio color="default" className={classes.radio} />}
                                    label="Easy"
                                    disabled={gameStatus === EGameStatus.PLAYING}
                                />
                                <FormControlLabel
                                    value={2}
                                    control={<Radio color="default" className={classes.radio} />}
                                    label="Medium"
                                    disabled={gameStatus === EGameStatus.PLAYING}
                                />
                                <FormControlLabel
                                    value={3}
                                    control={<Radio color="default" className={classes.radio} />}
                                    label="Hard"
                                    disabled={gameStatus === EGameStatus.PLAYING}
                                />
                            </RadioGroup>
                            <Button
                                type="button"
                                variant="contained"
                                className={classes.button}
                                disabled={gameStatus === EGameStatus.PLAYING}
                                onClick={() => startGame(difficulty)}>
                                Start game
                            </Button>
                        </FormControl>
                    </div>
                </form>
            </div>
            <div className="board-container">
                <div className="board" style={{ gridTemplateColumns: repeat(boardSize), gridTemplateRows: repeat(boardSize) }}>
                    {board.map(row => {
                        return row.map(tile => {
                            return <Tile key={`${tile.x} ${tile.y}`} tile={tile} board={board} gameStatus={gameStatus} />
                        })
                    })}
                </div>
            </div>
            <SubmitModal />
        </main >
    )
};