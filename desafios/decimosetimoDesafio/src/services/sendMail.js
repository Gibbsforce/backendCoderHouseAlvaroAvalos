import { createTransport } from "nodemailer"
// Global constants
import { ADMIN_MAIL, ADMIN_PASS } from "../utils/globalConstants.js"
export const nodemailerTransporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: ADMIN_MAIL,
        pass: ADMIN_PASS
    }
})
export const mailOptionsNewUser = (name, lastname, email, address, age, phone, avatar) => {
    return {
        from: `${name} ${lastname}`,
        to: ADMIN_MAIL,
        subject: "New User",
        html:
            `
                <h1 style="color: blue;">New User Registered</h1>
                <strong>
                    Name: <span style="color: red;">${name}</span>
                </strong>
                <br>
                <strong>
                    Lastname: <span style="color: red;">${lastname}</span>
                </strong>
                <br>
                <strong>
                    Email: <span style="color: red;">${email}</span>
                </strong>
                <br>
                <strong>
                    Address: <span style="color: red;">${address}</span>
                </strong>
                <br>
                <strong>
                    Age: <span style="color: red;">${age}</span>
                </strong>
                <br>
                <strong>
                    Phone: <span style="color: red;">${phone}</span>
                </strong>
                <br>
                <strong>
                    Profile: <span style="color: red;">${avatar}</span>
                </strong>
                <br>
                <strong>
                    Created at: <span style="color: red;">${new Date()}</span>
                </strong>
            `
    }
}
export const mailOptionsNewOrder = (name, lastname, email, cart) => {
    return {
        from: `${name} ${lastname}`,
        to: ADMIN_MAIL,
        subject: `New Order from ${name} ${lastname}`,
        html:
            `
                <h1 style="color: blue;">New Order</h1>
                <strong>
                    New order from: <span style="color: red;">${name} ${lastname}</span>
                    <br>
                    Email: <span style="color: red;">${email}</span>
                </strong>
                <br>
                <br>
                ${cart.products.map(({ title, thumbnail, price, quantity}) => {
                    return `
                        <strong>
                            Product:
                            <br>
                            Name of the product: <span style="color: red;">${title}</span>
                            <br>
                            <img style="width: 100px; height: 100px;" src=${thumbnail} alt=${title}/>
                            <br>
                            Quantity: <span style="color: red;">${quantity}</span>
                            <br>
                            Price: <span style="color: black; font-size: 20px;">$ ${price.toFixed(2)}</span>
                            <br>
                        </strong>
                    `
                }).join("")}
                <br>
                <strong>
                    Total: <span style="color: black; font-size: 24px;">$ ${cart.products.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2)}</span>
                </strong>
                <br>
                <strong>
                    Ordered at: <span style="color: red;">${new Date()}</span>
                </strong>
            `
    }
}