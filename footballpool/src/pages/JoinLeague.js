import React from 'react'

class JoinLeague extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leagueId: this.props.match.params.leagueid // NOTE: React router is passing this prop
        }
    }
    
    render() {
        return (
            <div>
                <h1>Join League</h1>
                <form>

                </form>
            </div>
        )
    }
}

export default JoinLeague