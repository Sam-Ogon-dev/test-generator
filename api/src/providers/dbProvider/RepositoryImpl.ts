import Repository from "../../services/Repository";
import {DbConnect} from "./dbConnect";
import User from "../../domain/User";

export default class RepositoryImpl implements Repository{
    async saveRefreshToken(refreshToken: string): Promise<boolean> {
        const db = await DbConnect.instance()
        return !!(await db.promise().execute("INSERT INTO Tokens (token, isBlocked) VALUES (?, false)", [refreshToken]));
    }

    async saveUser(user: User): Promise<boolean> {
        const db = await DbConnect.instance()
        return !!(await db.promise().execute("INSERT INTO Users (steamID, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)", [user.steamID, user.name]));
    }
}
