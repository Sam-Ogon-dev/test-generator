import MicroServiceClient from "./MicroServiceClient";
import seneca from "seneca";

export default class MicroServiceClientImpl implements MicroServiceClient {
    getRandomNumber(): Promise<number> {
        return new Promise<number>(resolve => {
            seneca().client({port: 10101, host: "schedule"}).act("cmd:generate", (err, res) => {
                resolve(res.randomNumber)
            })
        })
    }
}
