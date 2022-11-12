import seneca from "seneca"
import initGenerator from "./generator";
import {Store} from "./store";

const senecaInstance = seneca()

Store.startGenerator()
initGenerator(senecaInstance)

senecaInstance.listen()
