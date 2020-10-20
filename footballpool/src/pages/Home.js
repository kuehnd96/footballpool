import React from "react"
import {PoolDataContext} from '../dataContext'
import {Link} from 'react-router-dom';
import LeagueCalculations from '../modules/leagueCalculations'

class Home extends React.Component {
    
    constructor() {
        super()

        this.state = {
            userLeagues: [],
            joinableLeagues: [],
            isLoading: true
        }
    }

    async componentDidMount() {

        const {currentSeason, currentUser, dataAccess} = this.context

        let seasonLeagues = await dataAccess.getCurrentSeasonLeagues(currentSeason.id)
        let userPicks = await dataAccess.getUserPicksForLeagues(currentUser.id, seasonLeagues.map(league => league.id))
        let userLeagues = [], joinableLeagues = []
        
        seasonLeagues.forEach(/*async*/ league => {

            // Is user participating in the league?
            if (userPicks.some((pick) => {
            
                return pick.leagueid.fields.id === league.id
            })) {

                // FUTURE: Calculate weekly standings outside of this application since this won't scale
                //let leaguePicks = await dataAccess.getPicksForLeague(this.state.leagueId)
                //let calculations = LeagueCalculations()
                //let userPlaceInLeague = calculations.calculateUserPlaceInLeague(leaguePicks, currentUser.id)
                
                userLeagues.push({

                    name: league.name,
                    id: league.id,
                    type: league.type,
                    place: 99//userPlaceInLeague
                })
            } else {

                joinableLeagues.push({

                    name: league.name,
                    id: league.id,
                    type: league.type
                })
            }
        })

        this.setState({

            userLeagues: userLeagues,
            joinableLeagues: joinableLeagues,
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
        else {
            
            let userLeagueRows = this.state.userLeagues.map((league, index) => {

                return <tr key={index}>
                <td>{league.name}</td>
                <td>{league.type}</td>
                <td>{league.place}</td>
                <td><Link to={`/leaguedetails/${league.id}`}>Details</Link></td>
            </tr> 
            })

            let joinableLeagueRows = this.state.joinableLeagues.map((league, index) => {

                return <tr key={index}>
                    <td>{league.name}</td>
                    <td>{league.type}</td>
                    <td><Link to={`/joinleague/${league.id}`}>Join League</Link></td>
                </tr>
            })

            return (
                <>
                    <h1>Home</h1>
                    <br />
                    <h3>My Leagues</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>League</th>
                                <th>Type</th>
                                <th>Place</th>
                                <th></th>
                            </tr>
                            {userLeagueRows}
                        </tbody>
                    </table>
                    <br/>
                    <h3>Joinable Leagues</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>League</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                            {joinableLeagueRows}
                        </tbody>
                    </table>
                </>
            )
        }
    }
}

export default Home