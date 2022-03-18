import { React } from "./deps.ts"

const InvertedPhrase: React.FC<any> = ({ inverted }): React.ReactElement => {

    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <title>Desafio Final</title>
        </head>
        <body>
            {
                inverted
                    ?
                    <>
                        <h1>Displaying the inverted phrase: </h1>
                        <h1>{inverted}</h1>
                    </>
                    :
                    <h1>Please introduce a value for a query param: ?phrase=</h1>
            }
        </body>
    </html>
    )
}

export default InvertedPhrase