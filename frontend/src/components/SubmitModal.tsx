import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomePageActionCreators from '../state/Home/HomePage.actionCreators';
import { sendScore } from '../state/Home/HomePage.actionCreators';
// Components
import { Button, Modal, Paper, TextField } from '@material-ui/core';
// Styles
import { makeStyles } from '@material-ui/styles';
// Types
import { State } from '../state/RootReducer';
import { EGameStatus } from '../types/types';

const useStyles = makeStyles(() => ({
    root: {
        width: '60%',
        height: '40%',
        margin: 'auto',
        boxShadow: '0 0 5px 1px #000'
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textShadow: 'none'
    },
    input: {
        width: '100%'
    },
    buttons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        margin: '0 0.5rem'
    }
}));

export default function SubmitModal() {
    const [username, setUsername] = useState<string>('');

    const dispatch = useDispatch();
    const { setGameWaiting } = bindActionCreators(HomePageActionCreators, dispatch);
    
    const { gameStatus, difficulty, sendingScore, sendingScoreSuccess, startTime, endTime } = useSelector((state: State) => state.homePage);
    
    const classes = useStyles();

    return (
        <Modal open={gameStatus === EGameStatus.WON} className={classes.root}>
            <Paper className={classes.paper}>
                <div>
                    <h2>Congratulations!</h2>
                    <p>You have finished level {difficulty} in {(endTime - startTime) / 1000} seconds</p>
                    <TextField
                        label="Username"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={classes.input}
                        disabled={sendingScore}
                    />
                </div>
                <div className={classes.buttons}>
                    <Button
                        className={classes.button}
                        variant='contained'
                        disabled={sendingScore}
                        onClick={() => setGameWaiting()}
                    >
                        Go Back
                    </Button>
                    {sendingScoreSuccess === false && sendingScore === false &&
                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={() => dispatch(sendScore(difficulty, username, (endTime - startTime) / 1000))}
                        >
                            Send score
                        </Button>
                    }
                    {sendingScoreSuccess === true && sendingScore === false &&
                        <Button
                            className={classes.button}
                            variant="contained"
                        >
                            <Link to="/scores">Check scores</Link>
                        </Button>
                    }
                </div>
            </Paper>
        </Modal>
    )
}
