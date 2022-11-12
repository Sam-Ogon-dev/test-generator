// import {AddCallback, MessagePayload} from "seneca";
import express from "express";
import {initRoutes} from "./routes/helpers";
import {PORT} from "./config";
import {runMigrationScript} from "./migrations/migrationScript";

const app = express()

initRoutes(app)

runMigrationScript().then(() => {
    app.listen(PORT)
})
