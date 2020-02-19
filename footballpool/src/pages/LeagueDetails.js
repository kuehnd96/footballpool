import React from 'react'

class LeagueDetails extends React.Component {
    constructor(props) {
        super(props)

        // Coming from react router
        this.state = {
            leagueid: this.props.match.params.leagueid
        }
    }
    
    render() {
        return (
        <h1>League Details for league {this.state.leagueid}</h1>
        )
    }
}

export default LeagueDetails