import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Link} from 'react-router-dom';

class Seasons extends React.Component {
    constructor() {
        super()
    }

    static contextType = PoolDataContext

    sortSeasonsByYear(a, b) {
        const seasonAYear = parseInt(a.year)
        const seasonBYear = parseInt(b.year)

        let comparison = 0

        if (seasonAYear > seasonBYear) {
            comparison = 1
        } else if (seasonAYear < seasonBYear) {
            comparison = -1
        }
        
        return comparison
    }

    render() {
        
        // TODO: Render a list of all seasons
        const { getSeasons } = this.context
        let seasons = getSeasons()

        let seasonRows = seasons.sort(this.sortSeasonsByYear).map((season, index) => {
        
            return <tr key={index}>
                <td>{season.year}</td>
                <td>{season.leagueCreationCutoffDate}</td>
                <td>{season.leagueJoinCutoffDate}</td>
                <td>{season.isCurrent ? 'Yes' : 'No'}</td>
            </tr>
        })

        return (
            
            <div>
                <h1>Seasons</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Year</th>
                            <th>Is Current</th>
                            <th>League Creation Cutoff Date</th>
                            <th>League Join Cutoff Date</th>
                        </tr>
                        {seasonRows}
                    </tbody>
                </table>
                <br/>
                <Link to="/createseason">Create New Season</Link>
            </div>
        )
    }
}

export default Seasons