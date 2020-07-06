import React, { Component } from 'react'

const PoolDataContext = React.createContext();

class PoolDataProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentSeason: props.currentSeason,
            currentUser: props.currentUser,
            dataAccess: props.dataAccess
        }
    }

    render() {
        return (
            <PoolDataContext.Provider value={{ ...this.state}}>
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