import React from 'react'
import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    link: {
        textShadow: '2px 2px 5px #000',
        textDecoration: 'none',
        color: '#FFF'
    }
}));

export default function Navbar() {
    const classes = useStyles()
    return (
        <AppBar position="relative" color="transparent">
            <Toolbar>
                <IconButton><Link className={classes.link} to="/">Play</Link></IconButton>
                <IconButton><Link className={classes.link} to="/scores">Check best scores</Link></IconButton>
            </Toolbar>
        </AppBar>
    )
};