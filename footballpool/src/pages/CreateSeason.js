import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Redirect} from "react-router-dom";

class CreateSeason extends React.Component {
    constructor() {
        super()

        //?: Is there a better way to make class-scoped costants that are the same for all instances of the class?
        // Source: https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
        this.dateInputPrefix = 'dateInput'
        this.weekInputPrefix = 'week'
        this.homeTeamInputPrefix = 'homeTeam'
        this.awayTeamInputPrefix = 'awayTeam'
        this.typeInputPrefix = 'typeId'

        let today = new Date();

        this.state = {
            seasonYear: today.getFullYear(),
            leagueCreationCutoff: today,
            leagueJoinCutoff: today,
            hasSubmitted: false,
            maxWeek: 17,
            newMatchups: [],
            nextMatchupId: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.addSeason = this.addSeason.bind(this)
        this.addBlankMatchup = this.addBlankMatchup.bind(this)
        this.removeNewMatchup = this.removeNewMatchup.bind(this)
        this.handleMatchupChange = this.handleMatchupChange.bind(this)
    }

    componentDidMount() {
        this.addBlankMatchup()
    }

    static contextType = PoolDataContext

    // From last time:

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    addSeason() {

        let isValid = true
        let newMatchups = this.state.newMatchups

        for (let i=0; i< newMatchups.length; i++) {
        
            let newMatchup = this.state.newMatchups[i]
            
            if (newMatchup.homeTeam === newMatchup.awayTeam) {
                isValid = false
                newMatchup.error = "Home and away team can't match"
            }
            
            if (newMatchup.week > this.state.maxWeek) {
                isValid = false
                newMatchup.error = "Week number can't be more than " + this.state.maxWeek
            }
        }

        if (isValid) {
            
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
            }));
        }
        else {
            this.setState(() => ({
                newMatchups: newMatchups // show error text
            }))
        }
    }

    addBlankMatchup() {
        let nextMatchupId = this.state.nextMatchupId + 1

        //?: There has to be a cleaner way to add to an array that is in state
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

    handleMatchupChange(event) {
        
        const target = event.target;
        let value, matchupId, matchup

        if (target !== undefined) {
            
            value = target.value
            console.log('target name: ' + target.name)
            console.log(this.state.newMatchups)
        
            if (target.type === "select-one") {
            
                if (target.name.startsWith(this.homeTeamInputPrefix)) {
                    // home team changed
                    matchupId = parseInt(target.name.replace(this.hometeamInputPrefix, ''))
                    matchup = this.state.newMatchups.find(matchup => matchup.id === matchupId)
                    matchup.homeTeam = value
                }
                else if (target.name.startsWith(this.awayTeamInputPrefix)) {
                    // away team changed
                    matchupId = parseInt(target.name.replace(this.awayTeamInputPrefix, ''))
                    matchup = this.state.newMatchups.find(matchup => matchup.id === matchupId)
                    matchup.awayTeam = value
                }
                else if (target.name.startsWith(this.typeInputPrefix)) {
                    // type changed
                    matchupId = parseInt(target.name.replace(this.typeInputPrefix, ''))
                    matchup = this.state.newMatchups.find(matchup => matchup.id === matchupId)
                    matchup.type = value
                }
            }
            else { // text input changed
                
                if (target.name.startsWith(this.dateInputPrefix)) {
                    matchupId = parseInt(target.name.replace(this.dateInputPrefix, ''))
                    matchup = this.state.newMatchups.find(matchup => matchup.id === matchupId)
                    matchup.date = new Date(value)
                }
                else if (target.name.startsWith(this.weekInputPrefix)) {
                    matchupId = parseInt(target.name.replace(this.weekInputPrefix, ''))
                    matchup = this.state.newMatchups.find(matchup => matchup.id === matchupId)
                    matchup.week = parseInt(value)
                }
            }

            console.log(matchup)
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
            const dateInputId = this.dateInputPrefix + newMatchup.id
            const weekInputId = this.weekInputPrefix + newMatchup.id
            const homeTeamId = this.homeTeamInputPrefix + newMatchup.id
            const awayTeamId = this.awayTeamInputPrefix + newMatchup.id
            const typeId = this.typeInputPrefix + newMatchup.id

            return <tr key={index}>
                <td>
                    <input type="date" id={dateInputId} name={dateInputId} key={index} value={newMatchup.date} onChange={this.handleMatchupChange} />
                </td>
                <td>
                    <input type="number" id={weekInputId} name={weekInputId} key={index} value={newMatchup.week} onChange={this.handleMatchupChange}/>
                </td>
                <td>
                    <select id={homeTeamId} name={homeTeamId} key={index} value={newMatchup.homeTeam} onChange={this.handleMatchupChange}>
                            {matchupTeams}
                    </select>
                </td>
                <td>
                    <select id={awayTeamId} name={awayTeamId} key={index} value={newMatchup.awayTeam} onChange={this.handleMatchupChange}>
                            {matchupTeams}
                    </select>
                </td>
                <td>
                    <select id={typeId} name={typeId} key={index} value={newMatchup.type} onChange={this.handleMatchupChange}>
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
                        <label htmlFor="seasonYear">Season Year</label>
                        <input type="number" maxLength="4" name="seasonYear" id="seasonYear" value={this.state.seasonYear} onChange={this.handleChange}/>
                    </div>
                    { /* League Creation cutoff date */ }
                    <div>
                        <label htmlFor="leagueCreationCutoff">League Creation Cutoff Date</label>
                        <input type="date" name="leagueCreationCutoff" id="leagueCreationCutoff" value={this.state.leagueCreationCutoff} onChange={this.handleChange}/>
                    </div>
                    { /* League Join cutoff date */ }
                    <div>
                        <label htmlFor="leagueJoinCutoff">League Join Cutoff Date</label>
                        <input type="date" name="leagueJoinCutoff" id="leagueJoinCutoff" value={this.state.leagueJoinCutoff} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <h3>{this.state.seasonYear} Season Matchups</h3>
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