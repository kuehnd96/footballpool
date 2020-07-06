import React from "react"
import {PoolDataContext} from '../dataContext'

class Home extends React.Component {
    
    constructor() {
        super()

        this.state = {
            userLeagues: [],
            joinableLeagues: [],
            isLoading: true
        }
    }

    /*
    async componentDidMount() {

        const {currentSeason, dataAccess} = this.context

        let seasonMatchups = await dataAccess.getMatchups(currentSeason.id)
        let seasonLeagues = await dataAccess.getCurrentSeasonLeagues()
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