const sql = [
    `
CREATE TABLE Users (
    steamID varchar(30) NOT NULL UNIQUE,
    name varchar(30) NOT NULL UNIQUE
)
`,
    `
CREATE TABLE Tokens (
    token varchar(200),
    isBlocked bool
)
`
]

export const migration_2 = { sql, version: 2 }
