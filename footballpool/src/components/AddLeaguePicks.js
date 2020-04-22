import React from "react"
import {PoolDataContext} from '../dataContext'

class AddLeaguePicks extends React.Component {
    constructor(props) {
        super(props)

        var picks = this.props.matchups.map(matchup => {
            return {
                id: matchup.id,
                isHomePick: false,
                points: 0
            }
        })

        this.state = {
            picks: picks
        }

        //this.addPicks = this.addPicks.bind(this);
        this.pickChanged = this.pickChanged.bind(this);
    }

    static contextType = PoolDataContext

    //addPicks() {
        
        // Validate point values!

        // Call data context
    //}

    pickChanged = event => {
        const target = event.target;
        let value, matchupId, matchup
        
        if (target.type === 'checkbox') {
            
            // changed team pick
            value = target.checked
            matchupId = parseInt(event.target.name.replace("checkbox", ""));
            
            matchup = this.state.picks.find(matchup => matchup.id === matchupId)

            if (matchup)
            {
                matchup.isHomePick = value
            }
        } else { 
            
            // changed point value
            value = parseInt(target.value)
            matchupId = parseInt(event.target.name.replace("input", ""));
            
            matchup = this.state.picks.find(matchup => matchup.id === matchupId)

            if (matchup)
            {
                matchup.points = value
            }
        }
    }

    render() {

        let matchupTableRows = this.props.matchups.map((matchup, index) => {
            const pickInputId = matchup.id + "checkbox"
            const pointsInputId = matchup.id + "input"
            
            return <tr>
                <td>{matchup.homeTeam}</td>
                <td>{matchup.awayTeam}</td>
                <td>{matchup.date}</td>
                <td>{matchup.week}</td>
                <td><input type="checkbox" id={pickInputId} name={pickInputId} key={index} onChange={this.pickChanged} /></td>
                <td><input type="number" maxLength="2" id={pointsInputId} name={pickInputId} key={index} onChange={this.pickChanged} /></td>
            </tr>
        })
        
        return (
            <div>
                <h1>Picks for league {this.props.leagueId}</h1>
                <br/>
                <br/>
                <form>
                    <table cellpadding="3">
                        <tr>
                            <td>Home Team</td>
                            <td>Away Team</td>
                            <td>Date</td>
                            <td>Week</td>
                            <td>Pick Home Team?</td>
                            <td>Points</td>
                        </tr>
                        {matchupTableRows}
                </table>
                </form>
            </div>
        )
    }
}

export default AddLeaguePicks