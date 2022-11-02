import React, { Component } from "react";
import EventDataService from "../services/event.service";

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventPlace = this.onChangeEventPlace.bind(this);
        this.onChangeEventDate = this.onChangeEventDate.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);

        this.state = {
            id: null,
            eventName: "",
            eventPlace: "",
            eventDate: "",
            eventDescription: "",

            submitted: false
        };
    }

    onChangeEventName(e) {
        this.setState({
            eventName: e.target.value
        });
    }
    onChangeEventPlace(e) {
        this.setState({
            eventPlace: e.target.value
        });
    }
    onChangeEventDate(e) {
        this.setState({
            eventDate: e.target.value
        });
    }

    onChangeEventDescription(e) {
        this.setState({
            eventDescription: e.target.value
        });
    }

    saveEvent() {
        var data = {
            eventName: this.state.eventName,
            eventPlace: this.state.eventPlace,
            eventDate: this.state.eventDate,
            eventDescription: this.state.eventDescription
        };

        EventDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    eventName: response.data.eventName,
                    eventPlace: response.data.eventPlace,
                    eventDate: response.data.eventDate,
                    eventDescription: response.data.eventDescription,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newEvent() {
        this.setState({
            id: null,
            eventName: "",
            eventPlace: "",
            eventDate: "",
            eventDescription: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newEvent}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="eventName">Event Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="eventName"
                                required
                                value={this.state.eventName}
                                onChange={this.onChangeEventName}
                                name="eventName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventPlace">Event Place</label>
                            <input
                                type="text"
                                className="form-control"
                                id="eventPlace"
                                required
                                value={this.state.eventPlace}
                                onChange={this.onChangeEventPlace}
                                name="eventPlace"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventDate">Event Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="eventDate"
                                required
                                value={this.state.eventDate}
                                onChange={this.onChangeEventDate}
                                name="eventDate"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventDescription">Event Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="eventDescription"
                                required
                                value={this.state.eventDescription}
                                onChange={this.onChangeEventDescription}
                                name="eventDescription"
                            />
                        </div>

                        <button onClick={this.saveEvent} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}