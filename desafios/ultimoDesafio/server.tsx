import { createApp, React, ReactDOMServer } from "./deps.ts"
import App from "./App.tsx"

const app = createApp()

app.handle("/", async (req) => {

    const reversePharse = (): string => {
        const PHRASE_PARAM: string = "phrase"
        const phrase: any = req.query.get(PHRASE_PARAM)
        if (!phrase) return ""
        const words: Array<string> = phrase.split(" ")     
        const invertedPhrase: string = words.reverse().join(" ")
        return invertedPhrase
    }

    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=utf-8"
        }),
        body: ReactDOMServer.renderToString(<App inverted = {reversePharse()} />)
    })
})

app.listen({ port: 3000 })

console.log(`Listening on port 3000: http://localhost:3000`)