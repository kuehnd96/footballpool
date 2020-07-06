import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import {PoolDataProvider} from './dataContext'
import PoolDataAccess from './poolDataAccess' 

(async function startApplication() {

    const poolDataAccess = PoolDataAccess()
    let currentSeason
    let user

    async function loadGlobalData() {
        
        currentSeason = await poolDataAccess.getCurrentSeason()
        user = {
            id: 1,
            firstName: 'David',
            lastName: 'Kuehn',
            email: 'david@here.com'
        }
    }
    
    function mountPage() {
    
        ReactDOM.render(
    
            <PoolDataProvider currentSeason={currentSeason} currentUser={user} dataAccess={poolDataAccess}>
                <Router>
                    <App />
                </Router>
            </PoolDataProvider>
            , document.getElementById('root'));
    }

    loadGlobalData().then(mountPage)

})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
