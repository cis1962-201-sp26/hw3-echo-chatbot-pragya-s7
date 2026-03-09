type Message = { role: string; content: string; };

let currentChat : {messages: Message[]} = {messages: []};
const STORAGE_KEY = "echo-chat";

/**
 * Simulates a bot response to a user message
 * @param {string} userMessage - The user's message
 * @returns {string} - The bot's response
 */
function simulateBotResponse(userMessage: Message['content']) {
    // Simulate bot response with a delay
    setTimeout(() => {
        const botReply : string = `Echo: "${userMessage}"`;
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
function sendMessage(role: string, message: string) {
    // TODO: Implement Me!

    const trimmedMessage = message.trim();

    if (trimmedMessage === "") {
        return;
    }

    const newMessage: Message = {
		role,
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
function renderMessages(messages: Message[]) {
    // TODO: Implement Me!

    const chatArea = document.getElementById("chat-area") as HTMLElement;
	chatArea.innerHTML = "";

	for (const message of messages) {
		const messageDiv = document.createElement("div");
		messageDiv.classList.add("message");

		if (message.role === "User") {
			messageDiv.classList.add("user-message");
		} else {
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

    const savedChat = localStorage.getItem(STORAGE_KEY);

	if (savedChat) {
		currentChat = JSON.parse(savedChat) as { messages: Message[] };
		renderMessages(currentChat.messages);
	} else {
		createNewChat();
	}

	const input = document.getElementById("message-input") as HTMLInputElement;
	const sendButton = document.getElementById("send-btn") as HTMLButtonElement;

	sendButton.disabled = input.value.trim() === "";

	input.addEventListener("input", () => {
		sendButton.disabled = input.value.trim() === "";
	});
}

// TODO: Create an event listener to reset the chat messages when the "New Chat" button is clicked
const newChatButton = document.getElementById("new-chat-btn") as HTMLButtonElement;
if (newChatButton) {
	newChatButton.addEventListener("click", () => {
		createNewChat();
	});
}


// TODO: Create an event listener to handle sending messages when the user submits the chat input form
const chatForm = document.getElementById("chat-form") as HTMLFormElement;
if (chatForm) {
	chatForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const input = document.getElementById("message-input") as HTMLInputElement;
		const sendButton = document.getElementById("send-btn") as HTMLButtonElement;
		const userMessage = input.value.trim();

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