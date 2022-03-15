// Koa, static, body parser and router
import Koa from "koa"
import serve from "koa-static"
import koaBody from "koa-body"
import router from "./routers/index.js"
// Koa app
const app = new Koa()
// Using staic folder, parsing the body and getting the routes
app.use(serve(`${process.cwd()}/public`))
app.use(koaBody())
app.use(router.routes())
// Exporting the server app
export default app
