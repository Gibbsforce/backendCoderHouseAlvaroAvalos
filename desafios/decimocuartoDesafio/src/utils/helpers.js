const PORT = parseInt(process.argv[3]) || 8081;
const numCPUs = require("os").cpus().length;
module.exports = {
    PORT,
    numCPUs
}