export const ADMIN_MAIL = process.env.ADMIN_MAIL
export const ADMIN_PASS = process.env.ADMIN_PASS
export const ADMIN_PHONE = process.env.ADMIN_PHONE
export const IS_CLUSTER = process.env.IS_CLUSTER || false
import os from "os"
export const nCPUs = os.cpus().length
export const PORT = process.env.PORT || 8080