var currentChat = { messages: [] };
var STORAGE_KEY = "echo-chat";
/**
 * Simulates a bot response to a user message
 * @param {string} userMessage - The user's message
 * @returns {string} - The bot's response
 */
function simulateBotResponse(userMessage) {
    // Simulate bot response with a delay
    setTimeout(function () {
        var botReply = "Echo: \"".concat(userMessage, "\"");
        sendMessage('Echo', botReply);
    }, 500);
}
function saveChatToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentChat));
}
/**
 * Sends a message in the current chat
 * @param {string} role - The role of the message sender ('User' or 'Echo')
 * @param {string} message - The message content
 */
function sendMessage(role, message) {
    // TODO: Implement Me!
    var trimmedMessage = message.trim();
    if (trimmedMessage === "") {
        return;
    }
    var newMessage = {
        role: role,
        content: trimmedMessage,
    };
    currentChat.messages.push(newMessage);
    saveChatToLocalStorage();
    renderMessages(currentChat.messages);
}
/**
 * Renders the messages in the chat current selected
 * @param {{role: string, content: string}[]} messages - The messages to render
 */
function renderMessages(messages) {
    // TODO: Implement Me!
    var chatArea = document.getElementById("chat-area");
    chatArea.innerHTML = "";
    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
        var message = messages_1[_i];
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        if (message.role === "User") {
            messageDiv.classList.add("user-message");
        }
        else {
            messageDiv.classList.add("bot-message");
        }
        messageDiv.textContent = message.content;
        chatArea.appendChild(messageDiv);
    }
    chatArea.scrollTop = chatArea.scrollHeight;
}
/**
 * Creates a new chat
 * @requirements
 * - If no chat exists, create a new chat object and stores it in local storage
 * - If a chat exits, delete the old chat object and creates a new one
 * - Always render the chat list and messages after creating a new chat
 */
function createNewChat() {
    // TODO: Implement Me!
    localStorage.removeItem(STORAGE_KEY);
    currentChat = { messages: [] };
    saveChatToLocalStorage();
    renderMessages(currentChat.messages);
}
/**
 * Initializes the app
 * @requirements
 * - Fetch the chat object from local storage
 * - Renders the chat messages from the saved chat
 * - If no chat exists, create a new chat
 */
function initializeApp() {
    // TODO: Implement Me!
    var savedChat = localStorage.getItem(STORAGE_KEY);
    if (savedChat) {
        currentChat = JSON.parse(savedChat);
        renderMessages(currentChat.messages);
    }
    else {
        createNewChat();
    }
    var input = document.getElementById("message-input");
    var sendButton = document.getElementById("send-btn");
    sendButton.disabled = input.value.trim() === "";
    input.addEventListener("input", function () {
        sendButton.disabled = input.value.trim() === "";
    });
}
// TODO: Create an event listener to reset the chat messages when the "New Chat" button is clicked
var newChatButton = document.getElementById("new-chat-btn");
if (newChatButton) {
    newChatButton.addEventListener("click", function () {
        createNewChat();
    });
}
// TODO: Create an event listener to handle sending messages when the user submits the chat input form
var chatForm = document.getElementById("chat-form");
if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = document.getElementById("message-input");
        var sendButton = document.getElementById("send-btn");
        var userMessage = input.value.trim();
        if (userMessage === "") {
            return;
        }
        if (userMessage.length > 300) {
            alert("Message is too long. Please keep it under 300 characters.");
            return;
        }
        sendMessage("User", userMessage);
        input.value = "";
        sendButton.disabled = true;
        simulateBotResponse(userMessage);
    });
}
// Initialize the app upon reload
initializeApp();
export {};
