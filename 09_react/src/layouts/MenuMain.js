import React from "react";
import {Link} from "react-router-dom";

export default class MenuMain extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/portfolios">Portfolios</Link></li>
                </ul>
            </nav>
        )
    }
}