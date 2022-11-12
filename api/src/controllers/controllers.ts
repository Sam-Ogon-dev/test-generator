import {getSteamUser} from "../providers/apiProvider/apiProvider";
import {BASE_URL} from "../config";
import Service from "../services/Services";
import {UserDto} from "./dto/UserDto";

export interface ControllerData {
    getBody<T>(): T

    getQuery(): { [field: string]: string }

    response<T>(body: T): void

    setHeader(value: { [field: string]: string }): void

    redirect(url: string): void
}

export class Controller {
    constructor(service: Service) {
        this.service = service;
    }

    service: Service

    auth(data: ControllerData): void {
        let query = ""
        const params = {
            ['openid.ns']: 'http://specs.openid.net/auth/2.0',
            ['openid.mode']: 'checkid_setup',
            ['openid.return_to']: BASE_URL + '/api/v1/auth-return',
            ['openid.realm']: BASE_URL,
            ['openid.identity']: 'http://specs.openid.net/auth/2.0/identifier_select',
            ['openid.claimed_id']: 'http://specs.openid.net/auth/2.0/identifier_select',
        } as {
            [field: string]: string
        }

        for (const paramsKey in params) {
            query += paramsKey + "=" + params[paramsKey] + "&"
        }

        data.redirect("https://steamcommunity.com/openid/login?" + query)
    }

    authReturn(data: ControllerData): void {
        const steamIdRow = data.getQuery()["openid.claimed_id"].split("/")
        const steamId = steamIdRow[steamIdRow.length - 1]

        getSteamUser(steamId).then((res) => {
            const userDto = res.response.players[0] as UserDto
            const tokens = this.service.auth(userDto)
            data.response({ token: tokens.token, refresh_token: tokens.refreshToken })
        })
    }

    getRandomNumber(data: ControllerData): void {
        this.service.getRandomNumber().then(number => {
            data.response({ number })
        })
    }
}
