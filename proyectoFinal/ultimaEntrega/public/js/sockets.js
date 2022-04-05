import { userData } from "./redirects/isLogged.js"
// user
const user = await userData()
// My Messages Button
document.getElementById("my-messages").addEventListener("click", () => {
  if (!user) return alert("please, log in first")
  return (window.location.href = `/messages?user=${user.username}`)
})
// chat socket
const socket = io.connect()
// Message container
const renderMessages = (messagesData) => {
  const qS = window.location.search
  const uP = new URLSearchParams(qS)
  const userId = uP.get("user")

  if (messagesData === null) return ``
  let messagesContainer
  if (userId && messagesData[0]._doc) {
    messagesContainer = messagesData
      .map(({ _doc }) => _doc)
      .filter(({ author }) => author.id === userId)
      .map(({ author, timestamp, message }) => {
        return `
                    <div class="messages-body">
                        <strong class="msg-email"><p class="msg-txt">${author.id}</p></strong>
                        <small class="msg-date"><p class="msg-txt">[${timestamp}]:</p></small>
                        <em class="msg-text"><p class="msg-txt">${message}</p></em>
                    </div>
                `
      })
      .join("")
  } else if (messagesData[0]._doc) {
    messagesContainer = messagesData
      .map(({ _doc }) => _doc)
      .map(({ author, timestamp, message }) => {
        return `
                    <div class="messages-body">
                        <strong class="msg-email"><p class="msg-txt">${author.id}</p></strong>
                        <small class="msg-date"><p class="msg-txt">[${timestamp}]:</p></small>
                        <em class="msg-text"><p class="msg-txt">${message}</p></em>
                    </div>
                `
      })
      .join("")
  } else if (userId) {
    messagesContainer = messagesData
      .filter(({ author }) => author.id === userId)
      .map(({ author, timestamp, message }) => {
        return `
                  <div class="messages-body">
                      <strong class="msg-email"><p class="msg-txt">${author.id}</p></strong>
                      <small class="msg-date"><p class="msg-txt">[${timestamp}]:</p></small>
                      <em class="msg-text"><p class="msg-txt">${message}</p></em>
                  </div>
                `
      })
      .join("")
  } else {
    messagesContainer = messagesData
      .map(({ author, timestamp, message }) => {
        return `
                  <div class="messages-body">
                      <strong class="msg-email"><p class="msg-txt">${author.id}</p></strong>
                      <small class="msg-date"><p class="msg-txt">[${timestamp}]:</p></small>
                      <em class="msg-text"><p class="msg-txt">${message}</p></em>
                  </div>
                `
      })
      .join("")
  }

  document.getElementById("messages-container").innerHTML = messagesContainer
}
// Adding new message
if (user) {
  document.getElementById("messages-email").value = user.username
  document.getElementById("messages-name").value = user.name
  document.getElementById("messages-lastname").value = user.lastname
  document.getElementById("messages-age").value = user.age
  document.getElementById("messages-username").value = user.name
  document.getElementById("messages-avatar").value = user.avatar
}
const addMessage = async (event) => {
  event.preventDefault()
  const message = {
    author: {
      id: document.getElementById("messages-email").value,
      name: document.getElementById("messages-name").value,
      lastname: document.getElementById("messages-lastname").value,
      age: document.getElementById("messages-age").value,
      username: document.getElementById("messages-username").value,
      avatar: document.getElementById("messages-avatar").value,
    },
    message: document.getElementById("messages-text").value,
  }
  document.getElementById("messages-text").value = ""
  socket.emit("addMessage", message)
}
// Desnormalizing messages
const schemaAuthor = new normalizr.schema.Entity(
  "author",
  {},
  { idAttribute: "id" }
)
const schemaMessage = new normalizr.schema.Entity(
  "message",
  {
    author: schemaAuthor,
  },
  { idAttribute: "_id" }
)
const schemaMessages = new normalizr.schema.Entity("messages", {
  messages: [schemaMessage],
})
// Sending message via socket
socket.on("getMessages", async (data) => {
  const { messages } = normalizr.denormalize(
    data.result,
    schemaMessages,
    data.entities
  )
  if (messages[0]._doc) {
    const normalizedLength = JSON.stringify(data).length
    const denormalizedLength = JSON.stringify(messages).length
    const percentage = ((denormalizedLength / normalizedLength) * 100).toFixed(
      2
    )
    denormalizedLength
    document.getElementById(
      "percentage-nrmlzd-dnrmlzd"
    ).innerHTML = `(Comprension: ${percentage}%)`
    renderMessages(messages)
  } else {
    const normalizedLength = JSON.stringify(data).length
    const denormalizedLength = JSON.stringify(messages).length
    const percentage = ((normalizedLength / denormalizedLength) * 100).toFixed(
      2
    )
    document.getElementById(
      "percentage-nrmlzd-dnrmlzd"
    ).innerHTML = `(Comprension: ${percentage}%)`
    renderMessages(messages)
  }
})
// Running form in order to add new message
const formMessages = document.getElementById("form-messages")
formMessages.addEventListener("submit", addMessage)
