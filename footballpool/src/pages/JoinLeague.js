import React from 'react'
import {Link} from 'react-router-dom';
import {PoolDataContext} from '../dataContext'
import AddLeaguePicks from '../components/AddLeaguePicks'

class JoinLeague extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leagueId: this.props.match.params.leagueid, // NOTE: React router is passing this prop
            league: null
        }


    }

    static contextType = PoolDataContext

    async componentDidMount() {
        
        const {getLeague} = this.context

        const league = await getLeague(this.state.leagueId)
        
        if (league) {
            this.setState({
                league: league
            })
        }

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

        return (
            <div>
                <h1>Join League: {this.state.league.name}</h1>
                <form>
                    <AddLeaguePicks leagueId={this.state.leagueId} matchCount={17}/>
                </form>
            </div>
        )
    }
}

export default JoinLeague