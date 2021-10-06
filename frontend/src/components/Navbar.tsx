import React from 'react'
import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <AppBar position="relative" color="transparent">
            <Toolbar>
                <IconButton><Link to="/">Play</Link></IconButton>
                <IconButton><Link to="/scores">Check best scores</Link></IconButton>
            </Toolbar>
        </AppBar>
    )
};