import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from '../common/with-router';


class UserNavbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand">
                    <div className="navbar-nav m-auto">
                        <li className="nav-item">
                            <Link to={"/events"} className="nav-link ">
                                Events
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/events/add-event"} className="nav-link ">
                                New Event
                            </Link>
                        </li>
                    </div>
                </nav>

            </div>
        )
    }
}

export default withRouter(UserNavbar);