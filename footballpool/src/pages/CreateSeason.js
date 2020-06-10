import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Redirect} from "react-router-dom";

class CreateSeason extends React.Component {
    constructor() {
        super()

        let today = new Date();

        this.state = {
            seasonYear: today.year,
            leagueCreationCutoff: null,
            leagueJoinCutoff: null,
            hasSubmitted: false,
            maxWeek: 17,
            newMatchups: [],
            nextMatchupId: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.addSeason = this.addSeason.bind(this)
        this.addBlankMatchup = this.addBlankMatchup.bind(this)
        this.removeNewMatchup = this.removeNewMatchup.bind(this)

        this.addBlankMatchup()
    }

    static contextType = PoolDataContext

    // From last time:
    // 1) implement validation for when a new matchup field is blurred
    //    a) week number can't more than this.state.maxweek
    //    b) home and away team can't be equal
    //    c) ?
    // 2) Find out why season year isn't being rendered in input control

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

    addBlankMatchup() {
        let nextMatchupId = this.state.nextMatchupId + 1

        // TODO: There has to be a cleaner way to add to an array using setState()
        this.state.newMatchups.push({
            id: nextMatchupId,
            homeTeam: 'Green Bay',
            awayTeam: 'Chicago',
            type: 'MondayNight',
            date: new Date(),
            week: 1,
            error: ''
        })

        this.setState(() => ({
            nextMatchupId: nextMatchupId
        }), null)
    }

    removeNewMatchup(obsoleteMatchupId) {
        var obsoleteMatchup = this.state.newMatchups.find(matchup => matchup.id === obsoleteMatchupId)

        if (obsoleteMatchup) {
            let obsoleteIndex = this.state.newMatchups.indexOf(obsoleteMatchup)
            let updatedMatchups = this.state.newMatchups.splice(obsoleteIndex, 1)

            this.setState(() => ({
                newMatchups: updatedMatchups
            }), null)
        }
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

        let newMatchupRows = this.state.newMatchups.map((newMatchup, index) => {
            const dateInputId = 'dateInput' + newMatchup.id
            const weekInputId = 'week' + newMatchup.id
            const homeTeamId = 'homeTeam' + newMatchup.id
            const awayTeamId = 'awayTeam' + newMatchup.id
            const typeId = 'typeId' + newMatchup.id

            return <tr key={index}>
                <td><input type="date" id={dateInputId} name={dateInputId} key={index} value={newMatchup.date} /></td>
                <td><input type="number" id={weekInputId} name={weekInputId} key={index} value={newMatchup.week} /></td>
                <td>
                    <select id={homeTeamId} name={homeTeamId} key={index} value={newMatchup.homeTeam}>
                            {matchupTeams}
                    </select>
                </td>
                <td>
                    <select id={awayTeamId} name={awayTeamId} key={index} value={newMatchup.awayTeam}>
                            {matchupTeams}
                    </select>
                </td>
                <td>
                    <select id={typeId} name={typeId} key={index} value={newMatchup.type}>
                            {matchupTypes}
                    </select>
                </td>
                <td><button type="button" key={index} onClick={() => this.removeNewMatchup(newMatchup.id)}>Remove</button></td>
                <td>{newMatchup.error && 
                       <span key={index}>{newMatchup.error}</span>
                    }</td>
            </tr>
        })
        
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
                                    <td>Home Team</td>
                                    <td>Away Team</td>
                                    <td>Type</td>
                                    <td>Remove</td>
                                    <td>Error?</td>
                                </tr>
                                {newMatchupRows}
                            </tbody>
                        </table>
                    </div>
                    { /* Buttons */ }
                    <div>
                        <button type="button" onClick={this.addBlankMatchup}>Add Matchup</button>
                        <button type="button" onClick={this.addSeason}>Add Season</button>
                    </div>
                    
                </form>
            </div>
            
        )
    }
}

export default CreateSeason