const { authJwt } = require("../middleware");
const events = require("../controllers/event.controller");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/test/user/events", events.create);
    app.get("/api/test/user/events", events.findAll);
    app.get("/api/test/user/events/:id", events.findOne);
    app.put("/api/test/user/events/:id", events.update);
    app.delete("/api/test/user/events/:id", events.delete);
    app.delete("/api/test/user/events", events.deleteAll);
};