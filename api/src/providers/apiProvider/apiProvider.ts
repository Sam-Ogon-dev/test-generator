import {UserDto} from "../../controllers/dto/UserDto";
import {KEY} from "../../config";

export function getSteamUser(steamId: string): Promise<{ response: { players: UserDto[] } }> {
    console.log("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + KEY + "&steamids=" + steamId);
    return fetch("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + KEY + "&steamids=" + steamId).then(data => {
        return data.json()
    })
}
