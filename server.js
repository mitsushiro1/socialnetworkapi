const express = require("express");
const db = require("./config/connection")

const app = express();

const PORT = process.env.PORT || 3001;

const routes = require("./routes")

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log('Server is running')
    })
})
