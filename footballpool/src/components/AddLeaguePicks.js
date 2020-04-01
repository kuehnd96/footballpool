import React from "react"
import {PoolDataContext} from '../dataContext'

class AddLeaguePicks extends React.Component {
    constructor(props) {
        super(props)

        
    }

    static contextType = PoolDataContext

    render() {
        
        
        return (
            <h1>Picks for league {this.props.leagueId}</h1>
        )
    }
}

export default AddLeaguePicks