import React from 'react'
import {PoolDataContext} from '../dataContext'

class AddLeague extends React.Component {
    constructor() {
        super()

        this.state = {
            leagueType: null,
            leagueName: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.addLeague = this.addLeague.bind(this);
    }

    static contextType = PoolDataContext

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    addLeague() {
        const {addLeague} = this.context;
        
        var newLeague = {
            leagueType: this.state.leagueType,
            leagueName: this.state.leagueName
        };

        addLeague(newLeague);
    }
    
    render() {
        const {currentSeason, getLeagueTypes} = this.context
        // NOTE: Leagues can only be created for the current season

        let leagueTypes = getLeagueTypes()

        // map to JSX
        leagueTypes = leagueTypes.map(leagueType => {
            return <option value={leagueType.value} key={leagueType.value}>{leagueType.text}</option>
        })

        return (
            <div>
                <h1>Add League</h1>
                <form>
                    { /* Season (ready only) */ }
                    <div>
                        <label>Season: {currentSeason.year}</label>
                        <br/>
                        <label>League Creation Cutoff Date: {currentSeason.leagueCreationCutoffDate}</label>
                        <br/>
                        <label>League Join Cutoff Date: {currentSeason.leagueJoinCutoffDate}</label>
                    </div>
                    { /* Season edit */}
                    <div>
                        <label htmlfor="leagueType">League Type</label>
                        <select name="leagueType" id="leagueType" value={this.state.leagueType} onChange={this.handleChange}>
                            {leagueTypes}
                        </select>
                    </div>
                    { /* League Name */ }
                    <div>
                        <label htmlfor="leagueName">League Name</label>
                        <input type="text" name="leagueName" id="leagueName" value={this.state.leagueName} onChange={this.handleChange}/>
                    </div>
                    { /* Add button */ }
                    <div>
                        <button type="button" onClick={this.addLeague}>Add League</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddLeague