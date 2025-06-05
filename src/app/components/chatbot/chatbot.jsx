import { useState, useEffect } from "react";
import "./chatbot.css";
import { botOptions } from "../../data/optionBot"; // Adjust path if needed
import { twMerge } from "tailwind-merge";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import mosmos from "../../../assets/mosmos.png";



export const Chatbot = () => {
	const [messages, setMessages] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [typing, setTyping] = useState(false);

const showBotMessage = (text, isOption = false, options = [], link = null) => {
	setTyping(true);
	setTimeout(() => {
		setMessages((prev) => [
			...prev,
			{ text, sender: "bot", isOption, options, link },
		]);
		setTyping(false);
	}, 700);
};


	const handleOptionClick = (option) => {
		setMessages((prev) => [...prev, { text: option, sender: "user" }]);

		const botResponse = botOptions[option];

		if (botResponse) {
	showBotMessage(botResponse.answer, false, [], botResponse.link);
	if (botResponse.followUp) {
		setTimeout(() => {
			showBotMessage(
				botResponse.followUp.question,
				true,
				botResponse.followUp.options
			);
		}, 1000);
	}
}
else {
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

	const input = userInput.trim();
	setMessages((prev) => [...prev, { text: input, sender: "user" }]);
	setUserInput("");

	// Normalize input to match botOptions keys
	const matchKey = Object.keys(botOptions).find(
		(key) => key.toLowerCase() === input.toLowerCase()
	);

	const botResponse = botOptions[matchKey];

	if (botResponse) {
		showBotMessage(botResponse.answer);
		if (botResponse.followUp) {
			setTimeout(() => {
				showBotMessage(
					botResponse.followUp.question,
					true,
					botResponse.followUp.options
				);
			}, 1000);
		}
	} else {
		showBotMessage("Sorry, I don't have information on that yet.");
	}
};

	const togglePopup = () => setIsOpen(!isOpen);

	return (
		<div>
		
					
			{!isOpen && (
			
				
						<div onClick={togglePopup} className="z-50">
						<img
							src={mosmos}
							className={twMerge(
								"fixed top-20 z-50 h-24 rotate-45 object-contain transition hover:scale-110 md:right-0 md:top-auto md:bottom-24 md:-rotate-45 cursor-pointer"
							)}
							alt="mosmos mascot"
						/>
					</div>
			
			
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
										<i className="bot-icon">	<img
					src="../assets/mosmos.png"
					
					alt="mosmos mascot"
				/></i>
									</div>
								)}
					<div className={`message-bubble ${message.sender}-bubble`}>
	<p>{message.text}</p>

	{message.link && (
		<div className="special-link-wrapper">
			<a
				href={message.link}
				target="_blank"
				rel="noopener noreferrer"
				className="special-link"
			>
				🔗 Click here to register !
			</a>
		</div>
	)}

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
		<div className="bot-avatar">		<img
					src="../assets/mosmos.png"
					
					alt="mosmos mascot"
				/></div>
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
