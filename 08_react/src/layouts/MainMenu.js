import React from "react";
import {Link} from "react-router-dom";

export default class MainMenu extends React.Component {
    render() {
        return (
            <nav>
                <Link to="/about">About</Link>
            </nav>
        )
    }
}