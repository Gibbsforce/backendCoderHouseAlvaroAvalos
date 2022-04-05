import { userData } from "./redirects/isLogged.js"
import API from "./api.js"

const user = await userData()
if (!user) window.location.href = "/login"

const { orders } = await API.fetchGetOrder(user.username)

const userProfile = document.querySelector(".user-profile")
userProfile.innerHTML = `
    <div class="user-profile-port">
        <h2>Here your orders:</h2>
        <div>
            ${
              orders
                ? orders
                    .map(({ items, status, timestamp }) => {
                      return `
                    <div class="order-item">
                        <div class="order-item-header">
                            <h3><span class="label label-default">Order:</span>  ${timestamp}</h3>
                            <h3>Status: ${status}</h3>
                        </div>
                        <div class="order-item-body">
                            ${items
                              .map(({ title, price, quantity }) => {
                                return `
                                    <div class="order-item-body-item">
                                        <h4>${title}</h4>
                                        <h4>${price}</h4>
                                        <h4>${quantity}</h4>
                                    </div>
                                `
                              })
                              .join("")}
                        </div>
                    </div>
                `
                    })
                    .join("")
                : "Empty"
            }
        </div>
        <span class="label label-default">Total:</span>
        <h1>
        $ ${
          orders
            ? orders
                .reduce((acc, { items }) => {
                  return (
                    acc +
                    items.reduce((acc, { price, quantity }) => {
                      return acc + price * quantity
                    }, 0)
                  )
                }, 0)
                .toFixed(2)
            : "0.00"
        }
        </h1>
        <button class="submit-btn">Purchase</button>
    </div>
    <div class="user-profile-content">
        <h1>Welcome <small>${user.name}</small></h1>
        <img src="${user.avatar}" alt="${user.name}"/>
        <h2>Here your data:</h2>
        <h2><span class="label label-default">Name</span></h2>
        <span>${user.name}</span>
        <h2><span class="label label-default">Last Name</span></h2>
        <span>${user.lastname}</span>
        <h2><span class="label label-default">Email</span></h2>
        <span>${user.username}</span>
        <h2><span class="label label-default">Address</span></h2>
        <span>${user.address}</span>
        <h2><span class="label label-default">Phone</span></h2>
        <span>+${user.phone}</span>
        <h2><span class="label label-default">Age</span></h2>
        <span>${user.age}</span>
    </div>
`
