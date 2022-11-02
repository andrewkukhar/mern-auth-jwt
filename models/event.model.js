module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            eventName: String,
            eventPlace: String,
            eventDate: String,
            eventDescription: String,
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Event = mongoose.model("event", schema)

    return Event;
};