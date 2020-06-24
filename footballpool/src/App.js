import React from 'react';
import {Route, Switch} from "react-router-dom";
//import './App.css';
import Home from './pages/Home'
import LeagueDetails from './pages/LeagueDetails'
import JoinLeague from './pages/JoinLeague'
import AddLeague from './pages/AddLeague'
import CreateSeason from './pages/CreateSeason'
import Navbar from './components/Navbar'
import Seasons from './pages/Seasons'
import UpdateSeasons from './pages/UpdateSeason'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/leaguedetails/:leagueid" component={LeagueDetails}/>
        <Route exact path="/joinleague/:leagueid" component={JoinLeague}/>
        <Route exact path="/addleague" component={AddLeague}/>
        <Route exact path="/createseason" component={CreateSeason} />
        <Route exact path="/seasons" component={Seasons}/>
        <Route exact path="/seasons/update" component={UpdateSeasons} />
        <Route component={Error} />
      </Switch> 
    </>
  );
}

export default App;
