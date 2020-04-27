import React from "react"
import {PoolDataContext} from '../dataContext'

class AddLeaguePicks extends React.Component {
    constructor(props) {
        super(props)

        var picks = this.props.matchups.map(matchup => {
            return {
                id: matchup.id,
                isHomePick: false,
                points: 0,
                error: null
            }
        })

        this.state = {
            picks: picks,
            matchupCount: picks.length
        }

        this.addPicks = this.addPicks.bind(this);
        this.pickChanged = this.pickChanged.bind(this);
    }

    static contextType = PoolDataContext

    addPicks() {
        
        var picks = this.state.picks
        
        // Make sure all point values are represented once
        var pickPointMap = new Array(this.state.matchupCount+1)
        var isValid = true

        for (var i=0; i < picks.length; i++) {
            var points = picks[i].points

            if (pickPointMap[points]) { 
                // points have already been picked
                picks[i].isDuplicate = true
                isValid = false
            }
            else {
                pickPointMap[points] = true
            }
        }

        this.setState({
            picks: picks
        })

        if (isValid) {
            // Call data context
        }
    }

    pickChanged = event => {
        const target = event.target;
        let value, pickId, pick
        
        if (target.type === 'checkbox') {
            
            // changed team pick
            value = target.checked
            pickId = parseInt(event.target.name.replace("checkbox", ""));
            
            pick = this.state.picks.find(pick => pick.id === pickId)

            if (pick)
            {
                pick.isHomePick = value
            }
        } else { 
            
            // changed point value
            value = parseInt(target.value)
            pickId = parseInt(event.target.name.replace("input", ""));
            
            pick = this.state.picks.find(pick => pick.id === pickId)

            if (pick)
            {
                pick.points = value
            }
        }
    }

    render() {

        let matchupTableRows = this.props.matchups.map((matchup, index) => {
            const pickInputId = `${matchup.id}checkbox`
            const pointsInputId = `${matchup.id}input`
            const pick = this.state.picks.find(pick => pick.id === matchup.id)
            
            return <tr>
                <td>{matchup.homeTeam}</td>
                <td>{matchup.awayTeam}</td>
                <td>{matchup.date}</td>
                <td>{matchup.week}</td>
                <td><input type="checkbox" id={pickInputId} name={pickInputId} key={index} onChange={this.pickChanged} /></td>
                <td><input type="number" maxLength="2" id={pointsInputId} name={pickInputId} key={index} onChange={this.pickChanged} /></td>
                <td>{pick.error && 
                       <span>{pick.error}</span>
                    }</td>
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
                            <td>Duplicate Points?</td>
                        </tr>
                        {matchupTableRows}
                </table>
                <br />
                <button onClick={this.addPicks}>Save Picks</button>
                </form>
            </div>
        )
    }
}

export default AddLeaguePicks