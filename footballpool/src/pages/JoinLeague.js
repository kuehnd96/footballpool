import React from 'react'
import {Link} from 'react-router-dom';
import {PoolDataContext} from '../dataContext'
import AddLeaguePicks from '../components/AddLeaguePicks'

class JoinLeague extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leagueId: this.props.match.params.leagueid, // NOTE: React router is passing this prop
            league: null,
            matchups: null,
            isLoading: true
        }
    }

    static contextType = PoolDataContext

    async componentDidMount() {
        
        const { currentSeason, getLeague, getMatchups } = this.context

        const league = await getLeague(this.state.leagueId)
        const matchups = await getMatchups(currentSeason.id)
        
        this.setState({
            league: league,
            matchups: matchups,
            isLoading: false
        })
    }
    
    render() {
        
        if (!this.state.league) {
            return (
                <div>
                    <h3>No league found for id {this.state.leagueId}.</h3>
                    <br/>
                    <Link to="/">Go Home</Link>
                </div>
            )
        }
        else if (this.state.isLoading)
        {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h1>Join League {this.state.league.name}</h1>
                    <br/>
                    <AddLeaguePicks leagueId={this.state.league.id} matchups={this.state.matchups} />
                </div>
            )
        }
    }
}

export default JoinLeague