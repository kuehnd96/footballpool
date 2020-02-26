import React, { Component } from 'react'
import Client from 'contentful'

const PoolDataContext = React.createContext();

class PoolDataProvider extends Component {
    state = {
        // TODO: Create state for leagues, matchups, picks, season, and user
    }

    getData = async () => {
        try {
            // TODO: Load all types of data for user
        }
        catch (error) {
            console.log(error)
        }
        
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <PoolDataContext.Provider value={{ ...this.state/*, methods */ }}>
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