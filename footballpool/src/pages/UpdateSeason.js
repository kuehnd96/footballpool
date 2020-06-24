import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Redirect} from "react-router-dom";

class UpdateSeason extends React.Component {
     constructor() {
         super()

         this.state = {
             matchups: [],
             seasonYear: '',
             isLoading: true
         }

         this.matchupResultChanged = this.matchupResultChanged.bind(this)
     }

     async componentDidMount() {
        
        // You can only edit matchups for the current season
        const {currentSeason, getMatchups} = this.context

        var seasonMatchups = await getMatchups(currentSeason.id)

        this.setState({
            matchups : seasonMatchups,
            seasonYear: currentSeason.year,
            isLoading: false
        })
    }

    static contextType = PoolDataContext

    matchupResultChanged = event => {

        const target = event.target;

        if (target.type === 'checkbox') {
            
            let value, matchupId, matchup

            value = target.checked
            console.log(value)
            matchupId = parseInt(event.target.name.replace("resultInput", ""));
            console.log(matchupId)

            matchup = this.state.matchups.find(matchup => matchup.id === matchupId)

            if (matchup) {
            
                console.log(matchup)
                matchup.didHomeTeamWin = value
            }
        }
    }

    render() {

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
            let matchupRows = this.state.matchups.map((matchup, index) => {
                
                const resultInputId = "resultInput" + matchup.id

                return <tr key={index}>
                    <td>{matchup.date}</td>
                    <td>{matchup.week}</td>
                    <td>{matchup.homeTeam}</td>
                    <td>{matchup.awayTeam}</td>
                    <td>{matchup.type.replace('N', ' N')}</td>
                    <td><input type="checkbox" id={resultInputId} name={resultInputId} onChange={this.matchupResultChanged} /></td>
                </tr>
            })
            
            return (
                <div>
                    <h1>Edit {this.state.seasonYear} Season Matchup Results</h1>
                    <br/>
                    <form>
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
                    </form>
                </div>
            )
        }
    }
}

export default UpdateSeason