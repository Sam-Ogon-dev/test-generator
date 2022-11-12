export default class User {
    constructor(steamID: string, name: string) {
        this.steamID = steamID;
        this.name = name;
    }

    steamID: string
    name: string
}
