import dotenv from "dotenv"
export default dotenv.config({
  path:
    process.argv[2] === "dev"
      ? "./development.env"
      : process.argv[2] === "prod"
      ? "./production.env"
      : "./production.env",
  silent: true,
})
