import {Instance} from "seneca";
import {Store} from "./store";

export default function initGenerator(instance: Instance) {
    instance.add("cmd:generate", (msg, respond) => {
        respond(null, {randomNumber: Store.randomNumber})
    })
}
