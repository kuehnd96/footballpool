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
                content_type: 'season',
                'fields.isCurrent': true
            })

            let seasons = this.formatSeasons(seasonResponse.items)
            
            this.setState({
                currentSeason: seasons[0] // there can only be one (highlander)
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

    addSeason(newSeason) {
        // FUTURE: Add for new season
        // Can't add picks with contentful
        console.log('Adding new season: ')
        console.log(newSeason)
    }

    getSeasons = async () => {

        let seasonResponse = await Client.getEntries({
            content_type: 'season'
        })

        var seasons = this.formatSeasons(seasonResponse.items)
        return seasons.sort(this.sortSeasonsByYear)
    }

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

    getMatchups = async (seasonId, type) => {
        
        // load matchups for a season
        let matchupResponse = await Client.getEntries({
            content_type: 'matchup',
            'fields.seasonId.sys.contentType.sys.id': 'season',
            'fields.seasonId.fields.id': seasonId,
            'fields.type': type
        })

        return this.formatMatchups(matchupResponse.items).sort(this.sortMatchupsByWeek)
    }

    sortMatchupsByWeek(a, b) {
        const weekA = a.week
        const weekB = b.week

        let comparison = 0

        if (weekA > weekB) {
            comparison = 1
        } else if (weekA < weekB) {
            comparison = -1
        }
        
        return comparison
    }

    addMatchups(matchups) {
        // FUTURE: Add for new season
        // Can't add picks with contentful
        console.log('Adding new matchups for a new season: ')
        console.log(matchups.length)
    }

    getMatchupTeams() {
        return [
            {
                city: 'Green Bay'
            },
            {
                city: 'Chicago'
            },
            {
                city: 'Minnesota'
            },
            {
                city: 'Detroit'
            },
            {
                city: 'Carolina'
            },
            {
                city: 'New Orleans'
            },
            {
                city: 'Atlanta'
            },
            {
                city: 'Tampa Bay'
            },
            {
                city: 'Dallas'
            },
            {
                city: 'Washington'
            },
            {
                city: 'Philadelphia'
            },
            {
                city: 'New York Giants'
            },
            {
                city: 'Los Angeles Rams'
            },
            {
                city: 'Seattle'
            },
            {
                city: 'San Francisco'
            },
            {
                city: 'Arizona'
            },
            {
                city: 'Denver'
            },
            {
                city: 'Los Angeles Chargers'
            },
            {
                city: 'Kansas City'
            },
            {
                city: 'Las Vegas'
            },
            {
                city: 'Pittsburgh'
            },
            {
                city: 'Cinncinnati'
            },
            {
                city: 'Cleveland'
            },
            {
                city: 'Baltimore'
            },
            {
                city: 'New England'
            },
            {
                city: 'New York Jets'
            },
            {
                city: 'Miami'
            },
            {
                city: 'Buffalo'
            },
            {
                city: 'Indianapolis'
            },
            {
                city: 'Houston'
            },
            {
                city: 'Jacksonville'
            },
            {
                city: 'Tennessee'
            }
        ]
    }

    // / Matchups

    // Picks

    addPicks(picks) {
        // FUTURE: Add user picks for joining a league
        // Can't add picks with contentful
        console.log('Adding new picks for joining a new league: ')
        console.log(picks)
    }



    // / Picks
 
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <PoolDataContext.Provider value={{ ...this.state, 
                 getLeagueTypes: this.getLeagueTypes, 
                 getMatchupTypes: this.getLeagueTypes,
                 addLeague: this.addLeague,
                 getLeague: this.getLeague,
                 getMatchups: this.getMatchups,
                 addMatchups: this.addMatchups,
                 addPicks: this.addPicks,
                 addSeason: this.addSeason,
                 getSeasons: this.getSeasons,
                 getMatchupTeams: this.getMatchupTeams }}>
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