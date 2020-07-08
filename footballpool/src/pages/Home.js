import React from "react"
import {PoolDataContext} from '../dataContext'

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

        //let seasonMatchups = await dataAccess.getMatchups(currentSeason.id)
        let seasonLeagues = await dataAccess.getCurrentSeasonLeagues(currentSeason.id)
        let userPicks = await dataAccess.getUserPicksForLeagues(currentUser.id, seasonLeagues.map(league => league.id))
        let userLeagues = [], joinableLeagues = []
        
        seasonLeagues.forEach(league => {

            if (userPicks.some((pick) => {
            
                return pick.leagueid.fields.id === league.id
            })) {

                userLeagues.push({

                    name: league.name,
                    id: league.id,
                    type: league.type,
                    place: 99 // TODO
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
            </tr> 
            })

            let joinableLeagueRows = this.state.joinableLeagues.map((league, index) => {

                return <tr key={index}>
                    <td>{league.name}</td>
                    <td>{league.type}</td>
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