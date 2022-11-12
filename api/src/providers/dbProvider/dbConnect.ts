import {DATABASE, DB_HOST, DB_PASSWORD, DB_USER} from "../../config";
import mysql, {Connection, QueryError} from "mysql2"

export namespace DbConnect {
    let db: Connection | undefined

    export async function instance(): Promise<Connection> {
        if (!db) {
            return await new Promise(resolve => {
                let attempts = 1
                db = mysql.createConnection({
                    host: DB_HOST,
                    user: DB_USER,
                    database: DATABASE,
                    password: DB_PASSWORD,
                });

                db.connect(function (err: QueryError | null) {
                    if(!err) {
                        resolve(db!)
                    } else {
                        console.log("Попытка подключения: " + attempts)
                        attempts++
                        return instance()
                    }
                })
            })
        } else {
            return db
        }
    }
}
