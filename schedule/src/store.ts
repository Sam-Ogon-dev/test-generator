export namespace Store {
    export let randomNumber: number = Math.random()

    export function startGenerator() {
        setInterval(() => {
            Store.randomNumber = Math.random()
            console.log("новое число сгенерировано - " + Store.randomNumber)
        }, 5000)
    }
}
