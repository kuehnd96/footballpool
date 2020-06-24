import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Link} from 'react-router-dom';

class Seasons extends React.Component {
    constructor() {
        super()

        this.state = {
            seasons: []
        }
    }
    async componentDidMount() {
        
        const { getSeasons } = this.context
        let seasons = await getSeasons()
        
        this.setState({
            seasons: seasons
        })
    }

    static contextType = PoolDataContext

    render() {

        let seasonRows = this.state.seasons.map((season, index) => {
            
            return <tr key={index}>
                <td>{season.year}</td>
                <td>{season.isCurrent ? 'Yes' : 'No'}</td>
                <td>{season.leagueCreationCutoffDate}</td>
                <td>{season.leagueJoinCutoffDate}</td>
                { season.isCurrent && <td><Link to="/seasons/update">Update Matchup Results</Link></td>}
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
                            <th> </th>
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