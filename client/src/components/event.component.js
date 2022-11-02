import React, { Component } from "react";
import EventDataService from "../services/event.service";
import { withRouter } from '../common/with-router';

class Event extends Component {
    constructor(props) {
        super(props);
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventPlace = this.onChangeEventPlace.bind(this);
        this.onChangeEventDate = this.onChangeEventDate.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            currentEvent: {
                id: null,
                eventName: "",
                eventPlace: "",
                eventDate: "",
                eventDescription: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getEvent(this.props.router.params.id);
    }

    onChangeEventName(e) {
        const eventName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    eventName: eventName
                }
            };
        });
    }
    onChangeEventPlace(e) {
        const eventPlace = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    eventPlace: eventPlace
                }
            };
        });
    }
    onChangeEventDate(e) {
        const eventDate = e.target.value;

        this.setState(function (prevState) {
            return {
                currentEvent: {
                    ...prevState.currentEvent,
                    eventDate: eventDate
                }
            };
        });
    }


    onChangeEventDescription(e) {
        const eventDescription = e.target.value;

        this.setState(prevState => ({
            currentEvent: {
                ...prevState.currentEvent,
                eventDescription: eventDescription
            }
        }));
    }

    getEvent(id) {
        EventDataService.get(id)
            .then(response => {
                this.setState({
                    currentEvent: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateEvent() {
        EventDataService.update(
            this.state.currentEvent.id,
            this.state.currentEvent
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The event was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteEvent() {
        EventDataService.delete(this.state.currentEvent.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/events');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentEvent } = this.state;

        return (
            <div>
                {currentEvent ? (
                    <div className="edit-form">
                        <h4>Event</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="eventName">Event Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="eventName"
                                    value={currentEvent.eventName}
                                    onChange={this.onChangeEventName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventPlace">Event Place</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="eventPlace"
                                    value={currentEvent.eventPlace}
                                    onChange={this.onChangeEventPlace}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventDate">Event Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="eventDate"
                                    value={currentEvent.eventDate}
                                    onChange={this.onChangeEventDate}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventDescription">Event Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="eventDescription"
                                    value={currentEvent.eventDescription}
                                    onChange={this.onChangeEventDescription}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteEvent}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateEvent}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Event...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Event);