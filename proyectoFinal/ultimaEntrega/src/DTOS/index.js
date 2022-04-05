export class ProductDTO {
  constructor(data, quoters) {
    this.name = data.name
    this.price = data.price
    this.stock = data.stock
    for (const [den, val] of Object.entries(quoters)) {
      this[den] = val
    }
  }
}
export class Quoter {
  static DOLLAR_VALUE = 3.81
  getLocalPrice(price, currency) {
    if (currency === "USD") {
      return price * Quoter.DOLLAR_VALUE
    }
    return price
  }
}
