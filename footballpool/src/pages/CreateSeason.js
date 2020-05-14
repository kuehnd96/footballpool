import React from 'react'
import {PoolDataContext} from '../dataContext'
import {Redirect} from "react-router-dom";

class CreateSeason extends React.Component {
    constructor() {
        super()

        this.state = {
            seasonYear: 0,
            leagueCreationCutoff: null,
            leagueJoinCutoff: null,
            hasSubmitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.addSeason = this.addSeason.bind(this);
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

    addSeason() {
        const {addSeason} = this.context;
        
        var newSeason = {
            isCurrent: false,
            year: this.state.seasonYear,
            leagueCreationCutoff: this.state.leagueCreationCutoff,
            leagueJoinCutoff: this.state.leagueJoinCutoff
        };

        addSeason(newSeason);
        
        this.setState(() => ({
            hasSubmitted: true
        }), null);
    }
    
    render() {
        // If the user has submitted the new season then go back to main screen
        // Source: https://tylermcginnis.com/react-router-programmatically-navigate/
        if (this.state.hasSubmitted === true) {
            return <Redirect to='/'/>
        }
        
        return (
            <div>
                <h1>Create Next Season</h1>
                <form>
                    { /* Season Year */ }
                    <div>
                        <label htmlfor="seasonYear">Season Year</label>
                        <input type="number" maxLength="4" name="seasonYear" id="seasonYear" value={this.state.seasonYear} onChange={this.handleChange}/>
                    </div>
                    { /* League Creation cutoff date */ }
                    <div>
                        <label htmlfor="leagueCreationCutoff">League Creation Cutoff Date</label>
                        <input type="date" name="leagueCreationCutoff" id="leagueCreationCutoff" value={this.state.leagueCreationCutoff} onChange={this.handleChange}/>
                    </div>
                    { /* League Join cutoff date */ }
                    <div>
                        <label htmlfor="leagueJoinCutoff">League Join Cutoff Date</label>
                        <input type="date" name="leagueJoinCutoff" id="leagueJoinCutoff" value={this.state.leagueJoinCutoff} onChange={this.handleChange}/>
                    </div>
                    { /* Add button */ }
                    <div>
                        <button type="button" onClick={this.addSeason}>Add Season</button>
                    </div>
                </form>
            </div>
            
        )
    }
}

export default CreateSeason