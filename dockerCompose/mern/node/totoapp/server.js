const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();

var corsOptions = {
    origin: 'http://localhost:2323',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");

        // Vérifier si le modèle 'tutorial' a déjà été défini
        let Tutorial;
        if (db.mongoose.models.tutorial) {
            Tutorial = db.mongoose.model('tutorial');
        } else {
            Tutorial = require("./app/models/tutorial.model.js")(db.mongoose);
        }

        // Créer une nouvelle collection 'tutorial' si elle n'existe pas déjà
        const tutorialCollection = db.mongoose.connection.collection('tutorial');

        // Vérifier si la collection 'tutorial' existe déjà
        db.mongoose.connection.db.listCollections({name: 'tutorial'})
            .next(function(err, collinfo) {
                if (!collinfo) {
                    // La collection 'tutorial' n'existe pas, la créer
                    console.log("Collection 'tutorial' created");
                }
            });

        // Créer un nouveau document dans la collection 'tutorial'
        const tutorial = new Tutorial({
            title: "Test Title",
            description: "Test Description",
            published: false
        });

        tutorial.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Document created in 'tutorial' collection");
            }
        });
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        // process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to doan application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 7070;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
