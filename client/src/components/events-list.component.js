import React, { Component } from "react";
import EventDataService from "../services/event.service";
import { Link } from "react-router-dom";

export default class EventsList extends Component {
    constructor(props) {
        super(props);
        this.retrieveEvents = this.retrieveEvents.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveEvent = this.setActiveEvent.bind(this);
        this.removeAllEvents = this.removeAllEvents.bind(this);

        this.state = {
            events: [],
            currentEvents: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveEvents();
    }

    retrieveEvents() {
        EventDataService.getAll()
            .then(response => {
                this.setState({
                    events: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveEvents();
        this.setState({
            currentEvent: null,
            currentIndex: -1
        });
    }

    setActiveEvent(event, index) {
        this.setState({
            currentEvent: event,
            currentIndex: index
        });
    }

    removeAllEvents() {
        EventDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { events, currentEvent, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Events List</h4>

                    <ul className="list-group">
                        {events &&
                            events.map((event, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveEvent(event, index)}
                                    key={index}
                                >
                                    {event.eventName}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllEvents}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentEvent ? (
                        <div>
                            <h4>Event</h4>
                            <div>
                                <label>
                                    <strong>Event Name:</strong>
                                </label>{" "}
                                {currentEvent.eventName}
                            </div>
                            <div>
                                <label>
                                    <strong>Event Place:</strong>
                                </label>{" "}
                                {currentEvent.eventPlace}
                            </div>
                            <div>
                                <label>
                                    <strong>Event Date:</strong>
                                </label>{" "}
                                {currentEvent.eventDate}
                            </div>
                            <div>
                                <label>
                                    <strong>Event Description:</strong>
                                </label>{" "}
                                {currentEvent.eventDescription}
                            </div>

                            <Link
                                to={"/events/" + currentEvent.id}
                                className="badge btn btn-success badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Event...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}