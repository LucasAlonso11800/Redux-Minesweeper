import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ScorePage from './pages/ScorePage';

export default function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Route path="/" exact component={HomePage} />
                <Route path="/scores" component={ScorePage} />
            </Router>
        </>
    );
};