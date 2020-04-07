import React from "react"
import {PoolDataContext} from '../dataContext'

class AddLeaguePicks extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            leagueId: props.leagueId,
            matchups: null
        }

        this.addPicks = this.addPicks.bind(this);
    }

    static contextType = PoolDataContext

    async componentDidMount() {
        
        const { getMatchups } = this.context
        let matchups = await getMatchups(this.props.leagueId)
        
        if (matchups) {
            this.setState({
                matchups: matchups
            })
        }

    }

    addPicks() {

    }

    render() {

        let matchupTableRows = this.state.matchups.map(matchup => {
            return <tr>
                <td>{matchup.homeTeam}</td>
                <td>{matchup.awayTeam}</td>
                <td>{matchup.type}</td>
                <td>{matchup.date}</td>
                <td>{matchup.week}</td>
            </tr>
        })
        
        return (
            <div>
                <h1>Picks for league {this.props.leagueId}</h1>
                <br/>
                <br/>
                <form>
                    <table>
                        <tr>
                            <td>Home Team</td>
                            <td>Away Team</td>
                            <td>Type</td>  
                            <td>Date</td>
                            <td>Week</td>
                        </tr>
                        {matchupTableRows}
                </table>
                </form>
            </div>
        )
    }
}

export default AddLeaguePicks