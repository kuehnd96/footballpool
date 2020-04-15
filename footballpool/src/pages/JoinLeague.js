import React from 'react'
//import {Link} from 'react-router-dom';
import {PoolDataContext} from '../dataContext'
//import AddLeaguePicks from '../components/AddLeaguePicks'

class JoinLeague extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leagueId: this.props.match.params.leagueid, // NOTE: React router is passing this prop
            league: null,
            matchups: null
        }
    }

    static contextType = PoolDataContext

    async componentDidMount() {
        
        const { currentSeason, getMatchups } = this.context

        //const league = await getLeague(this.state.leagueId)
        const matchups = await getMatchups(currentSeason.id)
        
        if (matchups) {
            this.setState({
                //league: league,
                matchups: matchups
            })
        }
    }
    
    render() {
        /*
        if (!this.state.league) {
            return (
                <div>
                    <h3>No league found for id {this.state.leagueId}.</h3>
                    <br/>
                    <Link to="/">Go Home</Link>
                </div>
            )
        }
        */

        return (
            <div>
                <h1>Join League: {this.state.matchups.length}</h1>
                <br/>
            </div>
        )
    }
}

export default JoinLeague