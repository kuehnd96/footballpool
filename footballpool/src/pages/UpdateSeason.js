import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Redirect} from "react-router-dom";

class UpdateSeason extends React.Component {
     constructor() {
         super()

         this.state = {
             matchups: [],
             seasonYear: '',
             isLoading: true,
             hasSubmitted: false
         }

         this.matchupResultChanged = this.matchupResultChanged.bind(this)
         this.saveMatchups = this.saveMatchups.bind(this)
     }

     async componentDidMount() {
        
        // You can only edit matchups for the current season
        const {currentSeason, dataAccess} = this.context

        var seasonMatchups = await dataAccess.getMatchups(currentSeason.id)

        this.setState({
            matchups : seasonMatchups,
            seasonYear: currentSeason.year,
            isLoading: false
        })
    }

    static contextType = PoolDataContext

    matchupResultChanged = event => {

        const target = event.target;

        let value, matchupId, matchup

        value = target.value
        matchupId = parseInt(event.target.name.replace("resultInput", ""));

        matchup = this.state.matchups.find(matchup => matchup.id === matchupId)

        if (matchup) {
            
            matchup.didHomeTeamWin = value

            this.setState({
                isLoading: false
            })
        }
    }

    saveMatchups() {
        
        const { dataAccess } = this.context

        let updatedMatchups = []
        let matchup

        for (let i =0; i<this.state.matchups.length; i++) {

            matchup = this.state.matchups[i]

            if (matchup.didHomeTeamWin !== 'undefined') {

                updatedMatchups.push(matchup)
            }
        }

        dataAccess.updateMatchups(updatedMatchups)

        this.setState(() => ({
            hasSubmitted: true
        }));
    }

    render() {

        // If the user has submitted the new league then go back to main screen
        // Source: https://tylermcginnis.com/react-router-programmatically-navigate/
        if (this.state.hasSubmitted === true) {
            return <Redirect to='/seasons'/>
        }
        
        if (this.state.isLoading)
        {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        else
        {
            let resultOptions = []
            resultOptions.push(<option value='' key=''> </option>)
            resultOptions.push(<option value='true' key='true'>Yes</option>)
            resultOptions.push(<option value='false' key='false'>No</option>)

            let matchupRows = this.state.matchups.map((matchup, index) => {
                
                const resultInputId = "resultInput" + matchup.id

                return <tr key={index}>
                    <td>{matchup.date}</td>
                    <td>{matchup.week}</td>
                    <td>{matchup.homeTeam}</td>
                    <td>{matchup.awayTeam}</td>
                    <td>{matchup.type.replace('N', ' N')}</td>
                    <td>
                        <select id={resultInputId} name={resultInputId} key={index} value={matchup.didHomeTeamWin} onChange={this.matchupResultChanged}>
                        {resultOptions}
                    </select>
                    </td>
                </tr>
            })
            
            return (
                <div>
                    <h1>Edit {this.state.seasonYear} Season Matchup Results</h1>
                    <br/>
                    <form>
                        <button type="submit" onClick={this.saveMatchups}>Save</button>
                        <br/>
                        <br/>
                        <table cellPadding="3">
                            <tbody>
                                <tr>
                                    <td>Date</td>
                                    <td>Week</td>
                                    <td>Home Team</td>
                                    <td>Away Team</td>
                                    <td>Type</td>
                                    <td>Home Team Won?</td>
                                </tr>
                                {matchupRows}
                            </tbody>
                        </table>
                        <br/>
                        <button type="submit" onClick={this.saveMatchups}>Save</button>
                    </form>
                </div>
            )
        }
    }
}

export default UpdateSeason