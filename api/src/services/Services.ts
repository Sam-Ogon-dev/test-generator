import Repository from "./Repository";
import jwt from "jsonwebtoken";
import {SECRET_JWT} from "../config";
import {UserDto} from "../controllers/dto/UserDto";
import User from "../domain/User";
import MicroServiceClient from "./MicroServiceClient";

export default class Service {
    constructor(repository: Repository, microServiceClient: MicroServiceClient) {
        this.repository = repository
        this.microServiceClient = microServiceClient
    }

    private repository: Repository
    private microServiceClient: MicroServiceClient

    auth(data: UserDto): { token: string, refreshToken: string } {
        const token = jwt.sign({
            data: { steamID: data.steamid }
        }, SECRET_JWT, {expiresIn: "1h"})

        const refreshToken = jwt.sign({
            data: { steamID: data.steamid }
        }, SECRET_JWT, {expiresIn: "3h"})

        this.repository.saveUser(new User(data.steamid, data.personaname))
        this.repository.saveRefreshToken(refreshToken)
        return { token, refreshToken }
    }

    async getRandomNumber(): Promise<number> {
        return this.microServiceClient.getRandomNumber()
    }
}
