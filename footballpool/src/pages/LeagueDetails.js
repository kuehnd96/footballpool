import React from 'react'
import {PoolDataContext} from '../dataContext'
import LeagueCalculations from '../modules/leagueCalculations'

class LeagueDetails extends React.Component {
    constructor(props) {
        super(props)

        // Coming from react router
        this.state = {
            leagueid: this.props.match.params.leagueid
        }
    }

    async componentDidMount() {
   
        const { dataAccess } = this.context

        let leaguePicks = await dataAccess.getPicksForLeague(this.state.leagueId)
        let userPickHash = new Map() // hash the picks by user

        leaguePicks.forEach(pick => {

            let userId = pick.userid.fields.userid
            let userEntry = userPickHash.get(userId)
            
            // if user isn't in hash yet
            if (userEntry === undefined) {

                userEntry = {

                    userId: userId,
                    firstName: pick.userid.fields.firstName,
                    lastName: pick.userid.fields.lastName,
                    picks: []
                }

                userPickHash.set(userId, userEntry)
            }

            userEntry.picks.push(pick)
        })

        //let calculations = LeagueCalculations()
        //let leagueUserDetails = calculations.calculateLeagueStats(userPickHash.values)
        console.log(userPickHash.keys)
    }

    static contextType = PoolDataContext
    
    render() {
        return (
        <h1>League Details for league {this.state.leagueid}</h1>
        )
    }
}

export default LeagueDetails