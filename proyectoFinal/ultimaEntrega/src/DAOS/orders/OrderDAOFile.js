import FileContainer from "../../models/FileContainer.js"
class OrderDAOFile extends FileContainer {
  constructor() {
    super("/orders.json")
  }
}
export default OrderDAOFile
