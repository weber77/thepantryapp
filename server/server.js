const app = require('express')();
const port = 4040;
app.use(require('express').urlencoded({ extended: true }));
app.use(require('express').json());
app.use(require('cors')());

(async function () {
    try {
        await require('mongoose').connect('mongodb+srv://purpleinkpen:purpleinkpen@cluster0.ixwji.mongodb.net/thePantryApp?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Connected to the DB");
    } catch (err) {
        console.log("ERROR: Seems like your DB is not running, please start it up !!!");
    }
})();

app.use('/user', require("./routes/userRoutes"));

app.listen(port, () => console.log(`Listening on port: ${port}`));