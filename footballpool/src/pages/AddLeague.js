import React from 'react'
import {PoolDataContext} from '../dataContext'

class AddLeague extends React.Component {
    static contextType = PoolDataContext
    
    render() {
        const {currentSeason, getLeagueTypes} = this.context
        // NOTE: Leagues can only be created for the current season

        let leagueTypes = getLeagueTypes()

        // map to JSX
        leagueTypes = leagueTypes.map(leagueType => {
            return <option value={leagueType.value} key={leagueType.value}>{leagueType.text}</option>
        })

        return (
            <div>
                <h1>Add League</h1>
                <form>
                    { /* Season (ready only) */ }
                    <div>
                        <label>Season: {currentSeason.year}</label>
                        <br/>
                        <label>League Creation Cutoff Date: {currentSeason.leagueCreationCutoffDate}</label>
                        <br/>
                        <label>League Join Cutoff Date: {currentSeason.leagueJoinCutoffDate}</label>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddLeague