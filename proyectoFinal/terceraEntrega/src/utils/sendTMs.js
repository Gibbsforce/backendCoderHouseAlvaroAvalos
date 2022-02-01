import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

export const client = twilio(accountSid, authToken)

export const options = (name, lastname, email, cart, to) => {
    return {
        body: `Hello ${name} ${lastname}, you have a new order from ${email} with the following products:\n\n${cart.products.map(({ title, price, quantity }) => {
            return `Product: ${title}.\nPrice: $ ${price.toFixed(2)}.\nQuantity: ${quantity}`
        }).join(".\n\n")}.\n\nTotal price: $ ${cart.products.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2)}.\n\nOrdered at: ${new Date()}`,
        from: `whatsapp:+14155238886`,
        to: `whatsapp:${to}`
    }
}