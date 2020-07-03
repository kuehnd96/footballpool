import React from "react"
import {PoolDataContext} from '../dataContext'

class Home extends React.Component {
    
    constructor() {
        super()

        this.state = {
            currentSeason: null,
            userLeagues: [],
            joinableLeagues: [],
            isLoading: true
        }
    }

    //async componentDidMount() {

        
    //}

    /*
    async componentDidUpdate(previous) {

        console.log('Did update')
        const {currentSeason, getCurrentSeasonLeagues, getMatchups} = this.context

        console.log('About to use current season from context.')
        let seasonMatchups = await getMatchups(currentSeason.id)
        let seasonLeagues = getCurrentSeasonLeagues()
    }
    */

    static contextType = PoolDataContext
    
    render() {
        return (
            <>
                <h1>Home</h1>
                <br />
                <h3>My Leagues</h3>
                <div>
                    <ul>
                    </ul> 
                </div>
                <br/>
                <h3>Joinable Leagues</h3>
                <div>
                    <ul>
                    </ul>
                </div>
            </>
        )
    }
}

export default Home