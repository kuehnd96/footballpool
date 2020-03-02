import React, { Component } from 'react'
import Client from './Contentful'

const PoolDataContext = React.createContext();

class PoolDataProvider extends Component {
    state = {
        // FUTURE: Split context up by content type? Can nest contexts
        currentSeason: null
    }

    getData = async () => {
        try {
            
            // load current season
            let seasonResponse = await Client.getEntries({
                content_type: 'season'
            })

            let currentSeason = seasonResponse.items.find(season => season.isCurrent === true)
            

            this.setState({
                currentSeason
            })

        }
        catch (error) {
            console.log(error)
        }
        
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
 
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <PoolDataContext.Provider value={{ ...this.state, getLeagueTypes: this.getLeagueTypes }}>
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