import { useState, useEffect } from "react";
import "./chatbot.css";
import { botOptions } from "../../data/optionBot"; // Adjust path if needed



export const Chatbot = () => {
	const [messages, setMessages] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [typing, setTyping] = useState(false);

	const showBotMessage = (text, isOption = false, options = []) => {
		setTyping(true);
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{ text, sender: "bot", isOption, options },
			]);
			setTyping(false);
		}, 700);
	};

	const handleOptionClick = (option) => {
		setMessages((prev) => [...prev, { text: option, sender: "user" }]);

		const botResponse = botOptions[option];

		if (botResponse) {
			showBotMessage(botResponse.answer);
			if (botResponse.followUp) {
				setTimeout(() => {
					showBotMessage(botResponse.followUp.question, true, botResponse.followUp.options);
				}, 1000);
			}
		} else {
			showBotMessage("Sorry, I don’t have information on that yet.");
		}
	};

	useEffect(() => {
		if (isOpen) {
			const { question, options } = botOptions.initial;
			showBotMessage(question, true, options);
		} else {
			setMessages([]);
		}
	}, [isOpen]);

	const handleSendMessage = () => {
		if (!userInput.trim()) return;
		setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
		setUserInput("");
		// Optional: handle freeform input logic here
	};

	const togglePopup = () => setIsOpen(!isOpen);

	return (
		<div>
			{!isOpen && (
				<button className="open-chat-btn" onClick={togglePopup}>
					Chat with us
				</button>
			)}

			{isOpen && (
				<div className="chatbot-popup">
					<button className="closebutton" onClick={togglePopup}>
						x
					</button>
					<div className="chat-container">
						{messages.map((message, index) => (
							<div key={index} className={`message-row ${message.sender}-message`}>
								{message.sender === "bot" && (
									<div className="bot-avatar">
										<i className="bot-icon">🤖</i>
									</div>
								)}
								<div className={`message-bubble ${message.sender}-bubble`}>
									<p>{message.text}</p>
									{message.isOption && (
										<div className="options">
											{message.options.map((option, idx) => (
												<button
													key={idx}
													className="option-button"
													onClick={() => handleOptionClick(option)}
												>
													{option}
												</button>
											))}
										</div>
									)}
								</div>
							</div>
						))}
						{typing && (
							<div className="message-row bot-message">
		<div className="bot-avatar">🤖</div>
		<div className="typing-indicator">
			<div className="dot"></div>
			<div className="dot"></div>
			<div className="dot"></div>
		</div>
	</div>
						)}
					</div>

					<div className="input-container">
						<input
							type="text"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							placeholder="Type a message"
						/>
						<button onClick={handleSendMessage}>Send</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chatbot;
