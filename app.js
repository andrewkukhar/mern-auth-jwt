const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./models");
const Role = db.role;
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
            new Role({
                name: "staff"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'staff' to roles collection");
            });
            new Role({
                name: "volunteer"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'volunteer' to roles collection");
            });
            new Role({
                name: "company"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'company' to roles collection");
            });
        }
    });
}
db.mongoose
    .connect(`mongodb+srv://MernAuthJwt:MernAuthJwt@cluster0.hty26ll.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
// simple route
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
