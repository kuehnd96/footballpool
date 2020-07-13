import React from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/addleague">Add League</Link>
                    </li>
                    <li>
                        <Link to="/seasons">Seasons</Link>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}