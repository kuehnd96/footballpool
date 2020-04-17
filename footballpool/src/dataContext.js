import React, { Component } from 'react'
import Client from './Contentful'

const PoolDataContext = React.createContext();

class PoolDataProvider extends Component {
    // TODO: Split context up by content type? Can nest contexts
    state = {
        currentSeason: null
    }

    getData = async () => {
        try {
            
            // load current season
            let seasonResponse = await Client.getEntries({
                content_type: 'season'
            })

            let seasons = this.formatSeasons(seasonResponse.items)
            
            this.setState({
                currentSeason: seasons.find(season => season.isCurrent === true)
            })

        }
        catch (error) {
            console.log(error)
        }
    }

    // Seasons
    
    formatSeasons(items) {
        let seasons = items.map(item => {
            return {...item.fields}
        })

        return seasons;
    }

    getLeagueTypes() {
        return [
            {
                text: "Thursday Night",
                value: "ThursdayNight"
            },
            {
                text: "Monday Night",
                value: "MondayNight"
            }];
    }

    // / Seasons

    // League

    formatLeagues(items) {
        let leagues = items.map(item => {
            return {...item.fields}
        })

        return leagues;
    }

    addLeague(newLeague) {
        // FUTURE: Add league
        // Can't add a league with contentful
    }

    getLeague = async (leagueId) => {
        
        // load league by identifier
        let leagueResponse = await Client.getEntries({
            content_type: 'league',
            'fields.id': leagueId
        })

        let leagues = this.formatLeagues(leagueResponse.items)

        if (leagues.length > 0) {
            return leagues[0];
        }
        else {
            return null;
        }
    }

    // / League

    // Matchups

    formatMatchups(items) {
        let matchups = items.map(item => {
            return {...item.fields}
        })

        return matchups;
    }

    getMatchups = async (seasonId) => {
        
        // load matchups for a season
        let matchupResponse = await Client.getEntries({
            content_type: 'matchup',
            'fields.seasonId.sys.contentType.sys.id': 'season',
            'fields.seasonId.fields.id': seasonId
        })

        return this.formatMatchups(matchupResponse.items)
    }

    // / Matchups
 
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <PoolDataContext.Provider value={{ ...this.state, 
                 getLeagueTypes: this.getLeagueTypes, 
                 addLeague: this.addLeague,
                 getLeague: this.getLeague,
                 getMatchups: this.getMatchups }}>
                {this.props.children}
            </PoolDataContext.Provider>
        )
    }
}

const PoolDataConsumer = PoolDataContext.Consumer;

export function withPoolDataConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <PoolDataConsumer>
            { value => <Component {...props} context={value}/>}
        </PoolDataConsumer>
    }
}

export {PoolDataProvider, PoolDataConsumer, PoolDataContext}