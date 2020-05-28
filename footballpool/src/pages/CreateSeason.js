import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Redirect} from "react-router-dom";

class CreateSeason extends React.Component {
    constructor() {
        super()

        this.state = {
            seasonYear: 0,
            leagueCreationCutoff: null,
            leagueJoinCutoff: null,
            hasSubmitted: false,
            maxWeek: 17,
            newMatchups: [
                {
                    homeTeam: 'Green Bay',
                    awayTeam: 'Chicago',
                    type: 'MondayNight',
                    date: null,
                    week: 1,
                    error: ''
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.addSeason = this.addSeason.bind(this);
    }

    static contextType = PoolDataContext

    // From last time:
    // 1) Put adding of blank matchup in a function and add a button to call it
    // 2) Rig up the rendering of matchups in HTML table

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    addSeason() {
        const {addSeason} = this.context;
        
        var newSeason = {
            isCurrent: false,
            year: this.state.seasonYear,
            leagueCreationCutoff: this.state.leagueCreationCutoff,
            leagueJoinCutoff: this.state.leagueJoinCutoff
        };

        addSeason(newSeason);
        
        this.setState(() => ({
            hasSubmitted: true
        }), null);
    }
    
    render() {
        // If the user has submitted the new season then go back to main screen
        // Source: https://tylermcginnis.com/react-router-programmatically-navigate/
        if (this.state.hasSubmitted === true) {
            return <Redirect to='/'/>
        }

        const { getMatchupTypes, getMatchupTeams } = this.context

        let matchupTypes = getMatchupTypes()

        // map to JSX
        matchupTypes = matchupTypes.map(matchupType => {
            return <option value={matchupType.value} key={matchupType.value}>{matchupType.text}</option>
        })

        let matchupTeams = getMatchupTeams()
        matchupTeams = matchupTeams.map(matchupTeam => {
            return <option value={matchupTeam.city} key={matchupTeam.city}>{matchupTeam.city}</option>
        })

        //let newMatchupRows = this.state.newMatchups.map((newMatchup, index) => {

        //})
        
        return (
            <div>
                <h1>Create Next Season</h1>
                <form>
                    { /* Season Year */ }
                    <div>
                        <label htmlfor="seasonYear">Season Year</label>
                        <input type="number" maxLength="4" name="seasonYear" id="seasonYear" value={this.state.seasonYear} onChange={this.handleChange}/>
                    </div>
                    { /* League Creation cutoff date */ }
                    <div>
                        <label htmlfor="leagueCreationCutoff">League Creation Cutoff Date</label>
                        <input type="date" name="leagueCreationCutoff" id="leagueCreationCutoff" value={this.state.leagueCreationCutoff} onChange={this.handleChange}/>
                    </div>
                    { /* League Join cutoff date */ }
                    <div>
                        <label htmlfor="leagueJoinCutoff">League Join Cutoff Date</label>
                        <input type="date" name="leagueJoinCutoff" id="leagueJoinCutoff" value={this.state.leagueJoinCutoff} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <h3>{this.state.year} Season Matchups</h3>
                        <br/>
                        <table cellPadding="3">
                            <tbody>
                                <tr>
                                    <td>Date</td>
                                    <td>Week</td>
                                    <td>Away Team</td>
                                    <td>Home Team</td>
                                    <td>Type</td>
                                    <td>Error?</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    { /* Add button */ }
                    <div>
                        <button type="button" onClick={this.addSeason}>Add Season</button>
                    </div>
                    
                </form>
            </div>
            
        )
    }
}

export default CreateSeason