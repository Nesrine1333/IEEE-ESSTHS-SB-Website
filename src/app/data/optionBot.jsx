export const botOptions = {
	initial: {
		question: "Hello! What do you want to know?",
		options: ["What is IEEE", "IEEE ESSTHS", "Chapters and Affinity group"]
	},
	
	"Hello": {
		answer: "Hello! ."
		,
		followUp: {
			question: "What do you want to know?",
		options: ["What is IEEE", "IEEE ESSTHS", "Chapters and Affinity group"]
		}
	},
	"What is IEEE": {
		answer: "IEEE is the world’s largest technical professional organization dedicated to advancing technology for humanity."
	},
	"IEEE ESSTHS": {
		answer: "IEEE ESSTHS is our student branch at the Higher School of Sciences and Technology of Hammam Sousse.",
		followUp: {
			question: "What would you like to know about IEEE ESSTHS?",
			options: ["Registration & Fees", "Facebook Page", "Events"]
		}
	},
	"Chapters and Affinity group": {
		answer: "Our student branch hosts several chapters and affinity groups.",
		followUp: {
			question: "What would you like to know about them?",
			options: ["Fees"]
		}
	},
	"Registration & Fees": {
		answer: "The IEEE student registration fee is around 50DT annually.",
		link:"https://docs.google.com/forms/d/e/1FAIpQLSfdPiGMgp3xIv9lMfxPXRRKZNO2xJzV1dmvvRLo3_YC3cLyJA/viewform"
	},
	"Facebook Page": {
		answer: "You can follow us here: https://facebook.com/ieeeessths"
	},
	"Events": {
		answer: "We organize technical workshops, seminars, and hackathons regularly."
	},
	"Fees": {
		answer: "Fees depend on the chapter. On average, it's 5–10 USD per year."
	}
};
