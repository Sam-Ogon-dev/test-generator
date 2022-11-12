import {DbConnect} from "../providers/dbProvider/dbConnect";

const migrationArray: Array<{ sql: Array<string>, version: number }> = []

migrationArray.push(require("./migration_1").migration_1)
migrationArray.push(require("./migration_2").migration_2)

export async function runMigrationScript() {
    const db = await DbConnect.instance()

    let currentVersion: number = await db.promise().execute("SHOW tables").then(async ([result]: Array<any>) => {
        if (result.length === 0) {
            return 0
        }

        return db.promise().execute("SELECT version FROM Version ORDER BY version DESC LIMIT 1").then(([result]: Array<any>) => {
            return result[0].version
        })
    })

    db.beginTransaction(async (err) => {
        if (!err) {
            for (const migration of migrationArray) {
                if (migration.version <= currentVersion) {
                    continue
                }

                for (const sql of migration.sql) {
                    if(!await db.promise().execute(sql)) {
                        await db.promise().rollback()
                        await db.promise().end()
                    }
                }

                if(!db.promise().execute("INSERT INTO Version (version, date) VALUES (?, now())", [migration.version])) {
                    await db.promise().rollback()
                    await db.promise().end()
                }

                currentVersion = migration.version
            }

            db.commit()
        }
    })
}
