import React from 'react'
import {PoolDataContext} from '../dataContext'
import LeagueCalculations from '../modules/leagueCalculations'

class LeagueDetails extends React.Component {
    constructor(props) {
        super(props)

        // Coming from react router
        this.state = {
            leagueId: this.props.match.params.leagueid,
            league: null,
            leagueStandings: null,
            isLoading: true
        }
    }

    async componentDidMount() {
   
        const { dataAccess } = this.context

        let league = await dataAccess.getLeague(this.state.leagueid)
        let leaguePicks = await dataAccess.getPicksForLeague(this.state.leagueId)
        let calculations = LeagueCalculations()
        let leagueUserDetails = calculations.calculateLeagueStats(leaguePicks)

        //console.log(leagueUserDetails.sort(calculations.sortLeagueUserTotalsByTotalPointsDescending))

        this.setState({
            league: league,
            leagueStandings: leagueUserDetails,
            isLoading: false
        })
    }

    static contextType = PoolDataContext
    
    render() {
        
        if (this.state.isLoading)
        {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        else if (this.state.leagueStandings.length === 0) {

            return (

                <div>
                    <h1>No managers were found in this league.</h1>
                </div>
            )
        }
        else {

            let leagueStandingRows = this.state.leagueStandings.map((leagueManager, index) => {

                var weekResults = leagueManager.weekResults.map((result, index) => {
                    return <td key={index}>{result.points}</td>
                })
                
                return <tr key={index}>
                    <td>{leagueManager.userName}</td>
                    <td>{leagueManager.totalPoints}</td>
                    {weekResults}
                </tr>
            })

            let weekResultHeaders = this.state.leagueStandings[0].weekResults.map((result, index) => {

            return <th key={index}>{result.week}</th>
            })
        
            return (
                <>
                <h1>League Details: {this.state.league.name} ({this.state.league.type.replace('Night', ' Night')})</h1>
                <table cellPadding="3" borders="3">
                    <tbody>
                        <tr>
                            <th>Manager</th>
                            <th>Total Points</th>
                            {weekResultHeaders}
                        </tr>
                        {leagueStandingRows}
                    </tbody>
                </table>
                </>
                )
        }
    }
}

export default LeagueDetails