
export default function LeagueCalculations() {
    
    function calculateLeagueStats(leagueUserPickMap) {

        let leagueUserTotals = []
        
        // Foreach user in the league
        leagueUserPickMap.forEach((value, key) => {
        
            let leagueUserStatus = {
                
                totalPoints: 0,
                weekResults: [],
                userName: value.firstName + value.lastName,
                userId: key
            }
            
            // Foreach of the user's picks
            value.picks.forEach((pick => {

                let points = 0
                
                // Does associated matchup have a result?
                if (pick.matchupid.fields.didHomeTeamWin !== undefined) {
                    
                    // Did the current user guess right?
                    if (pick.matchupid.fields.didHomeTeamWin === pick.ishomepick) {

                        points = pick.points
                    }
                }

                leagueUserStatus.weekResults.push({

                    week: pick.matchupid.fields.week,
                    points: points
                })
                
                leagueUserStatus.totalPoints += points
            }))

            leagueUserTotals.push(leagueUserStatus)
            
        })

        return leagueUserTotals;
    }

    function sortLeagueUserTotalsByTotalPointsDescending(a, b) {
        const totalA = a.totalPoints
        const totalB = b.totalPoints

        let comparison = 0

        if (totalA > totalB) {
            comparison = -1
        } else if (totalA < totalB) {
            comparison = 1
        }
        
        return comparison
    }

    return  Object.freeze({
        calculateLeagueStats,
        sortLeagueUserTotalsByTotalPointsDescending
      });
}