import Client from './Contentful'

export default function PoolDataAccess() {
    
    // TODO: Break this up into modules by data type

    function getMatchupTypes() {
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
    
    // Season
    
    async function getCurrentSeason() {

        try {
            
            // load current season
            let seasonResponse = await Client.getEntries({
                content_type: 'season',
                'fields.isCurrent': true
            })
            let seasons = formatSeasons(seasonResponse.items)
            
            return seasons[0] // there can only be one current season
        }
        catch (error) {
            console.log(error)
        }
    }

    function formatSeasons(items) {
        let seasons = items.map(item => {
            return {...item.fields}
        })

        return seasons;
    }

    function addSeason(newSeason) {
        // FUTURE: Add for new season
        // Can't add picks with contentful
        console.log('Adding new season: ')
        console.log(newSeason)
    }

    async function getSeasons() {

        let seasonResponse = await Client.getEntries({
            content_type: 'season'
        })

        var seasons = this.formatSeasons(seasonResponse.items)
        return seasons.sort(sortSeasonsByYear)
    }

    function sortSeasonsByYear(a, b) {
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

    // / Season

    // League

    function formatLeagues(items) {
        let leagues = items.map(item => {
            return {...item.fields}
        })

        return leagues;
    }

    function addLeague(newLeague) {
        // FUTURE: Add league
        // Can't add a league with contentful
        console.log(newLeague)
    }

    async function getLeague(leagueId) {
        
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

    async function getCurrentSeasonLeagues(currentSeasonId) {

        // load all leagues for current seasion
        let leagueResponse = await Client.getEntries({
            content_type: 'league',
            'fields.seasonid.sys.contentType.sys.id': 'season',
            'fields.seasonid.fields.id': currentSeasonId,
        })

        return this.formatLeagues(leagueResponse.items)
    }

    // / League

    // Matchups

    function formatMatchups(items) {
        let matchups = items.map(item => {
            return {...item.fields}
        })

        return matchups;
    }

    async function getMatchups(seasonId, type) {
        
        let matchupResponse

        if (type) {
            
            // load matchups for a season with a certain type
            matchupResponse = await Client.getEntries({
                content_type: 'matchup',
                'fields.seasonId.sys.contentType.sys.id': 'season',
                'fields.seasonId.fields.id': seasonId,
                'fields.type': type
            })
        }
        else { 

            // load all matchups for a season regardless of type
            matchupResponse = await Client.getEntries({
                content_type: 'matchup',
                'fields.seasonId.sys.contentType.sys.id': 'season',
                'fields.seasonId.fields.id': seasonId
            })
        }

        return this.formatMatchups(matchupResponse.items).sort(this.sortMatchupsByWeek)
    }

    function sortMatchupsByWeek(a, b) {
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

    function addMatchups(matchups) {
        // FUTURE: Add for new season
        // Can't add data with contentful
        console.log('Adding new matchups for a new season: ')
        console.log(matchups)
    }

    function getMatchupTeams() {
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

    function updateMatchups(matchups) {
        // FUTURE: Add for new season
        // Can't update with contentful
        console.log('Updating matchups for current season: ')
        console.log(matchups)
    }

    // / Matchups

    // Picks

    function addPicks(picks) {
        // FUTURE: Add user picks for joining a league
        // Can't add picks with contentful
        console.log('Adding new picks for joining a new league: ')
        console.log(picks)
    }

    async function getUserPicksForLeagues(userId, leagueIds) {

        let leagueIdList = ''

        for (let i=0; i<leagueIds.length; i++) {
            
            if (leagueIdList !== '') {
                
                leagueIdList += ','
            }

            leagueIdList += leagueIds[i]
        }
        
        // load all picks for user and leagues
        let picksResponse = await Client.getEntries({
            content_type: 'pick',
            'fields.userid.sys.contentType.sys.id': 'user',
            'fields.userid.fields.id': userId,
            'fields.leagueid.sys.contentType.sys.id': 'league',
            'fields.leagueid.fields.id[in]': leagueIdList
        })
        
        return formatPicks(picksResponse.items)
    }

    function formatPicks(items) {
        let picks = items.map(item => {
            return {...item.fields}
        })

        return picks;
    }

    // / Picks

    return  Object.freeze({
        getCurrentSeason,
        getMatchupTypes,
        addSeason,
        getSeasons,
        addLeague,
        getLeague,
        getCurrentSeasonLeagues,
        getMatchups,
        addMatchups,
        getMatchupTeams,
        updateMatchups,
        addPicks,
        getUserPicksForLeagues,
        formatPicks,
        formatLeagues,
        formatMatchups,
        sortMatchupsByWeek,
        sortSeasonsByYear,
        formatSeasons
      });
}