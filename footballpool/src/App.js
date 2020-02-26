import React from 'react';
import {Route, Switch} from "react-router-dom";
//import './App.css';
import Home from './pages/Home'
import LeagueDetails from './pages/LeagueDetails'
import JoinLeague from './pages/JoinLeague'
import AddLeague from './pages/AddLeague'
import CreateSeason from './pages/CreateSeason'
import UpdateMatchups from './pages/UpdateMatchups'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <h1>Welcome</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/leaguedetails/:leagueid" component={LeagueDetails}/>
        <Route exact path="/joinleague" component={JoinLeague}/>
        <Route exact path="/addleague" component={AddLeague}/>
        <Route exact path="/createseason" component={CreateSeason} />
        <Route exact path="/updatematchups/:seasonid" component={UpdateMatchups}/>
        <Route component={Error} />
      </Switch> 
    </>
  );
}

export default App;
