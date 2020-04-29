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

    addPicks(e) {
        e.preventDefault()

        var picks = this.state.picks
        
        // Make sure all point values are represented once
        var pickPointMap = [this.state.matchupCount+1] // not using index 0
        var isValid = true

        pickPointMap = pickPointMap.fill(false)
        pickPointMap[0] = undefined

        for (var i=0; i < picks.length; i++) {
            var pick = picks[i]
            var points = pick.points

            if (points === 0) { 
                // No points specified
                pick.error = "Missing point value"
                isValid = false
            }
            else if ((points < 1) || (points > this.state.matchupCount)) {
                // Pick must be 1 - number of matchups
                pick.error = "Pick must be 1 to " + this.state.matchupCount
                isValid = false
            }
            else if (pickPointMap[points]) { 
                // points have already been picked
                pick.error = "Duplicate"
                isValid = false
            }
            else {
                
                // Mark point value as used
                pickPointMap[points] = true
                pick.error = null
            }
        }

        this.setState({
            picks: picks
        })

        if (!pickPointMap.every(pointValueUsed => {
            return pointValueUsed === true
        })) {
            isValid = false
        }

        if (isValid) {
            alert('Picks valid!')
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
                pick.points = isNaN(value) ? 0 : value
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
                <td><input type="number" maxLength="2" id={pointsInputId} name={pickInputId} key={index} onBlur={this.pickChanged} /></td>
                <td>{pick.error && 
                       <span key={index}>{pick.error}</span>
                    }</td>
            </tr>
        })
        
        return (
            <div>
                <h1>Picks for league {this.props.leagueId}</h1>
                <br/>
                <br/>
                <form>
                    <table cellPadding="3">
                        <tbody>
                            <tr>
                                <td>Home Team</td>
                                <td>Away Team</td>
                                <td>Date</td>
                                <td>Week</td>
                                <td>Pick Home Team?</td>
                                <td>Points</td>
                                <td>Error?</td>
                            </tr>
                            {matchupTableRows}
                        </tbody>
                </table>
                <br />
                <button onClick={this.addPicks}>Save Picks</button>
                </form>
            </div>
        )
    }
}

export default AddLeaguePicks