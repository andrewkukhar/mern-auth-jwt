const db = require("../models");
const Event = db.events;


exports.create = (req, res) => {
    if (!req.body.eventName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const event = new Event({
        eventName: req.body.eventName,
        eventPlace: req.body.eventPlace,
        eventDate: req.body.eventDate,
        eventDescription: req.body.eventDescription
    });
    event
        .save(event)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Event."
            });
        });
};

exports.findAll = (req, res) => {
    Event.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving events."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Event.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Event with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Event with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found!`
                });
            } else res.send({ message: "Event was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Event.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                });
            } else {
                res.send({
                    message: "Event was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Event with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Event.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Event were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all events."
            });
        });
};