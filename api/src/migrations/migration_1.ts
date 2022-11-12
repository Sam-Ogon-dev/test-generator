const sql = [
    `
CREATE TABLE Version (
    version int,
    date date
);
`
]

export const migration_1 = {sql, version: 1}
