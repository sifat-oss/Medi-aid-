// Minimal chatbot adapter: if CHATBOT_API_KEY is present, this file is the place to wire an external API.
// For now it falls back to a small rule-based responder.

const rules = [
    { pattern: /headache/i, reply: 'For headache, try rest, hydration, and OTC analgesics. If severe or persistent, consult a doctor.' },
    { pattern: /fever/i, reply: 'Fever can be a sign of infection. Monitor temperature and seek care if >39°C or lasting more than 48 hours.' },
];

async function getReply(message, { sessionId, userId } = {}) {
    if (!message) return "I'm here — tell me your symptoms or ask a health question.";

    // simple rule match
    for (const r of rules) {
        if (r.pattern.test(message)) return r.reply;
    }

    // default
    return "I can help with basic symptom guidance and medicine info. Please describe your symptoms in one or two sentences.";
}

module.exports = { getReply };