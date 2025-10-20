# Medi-aid Backend

Minimal Express + Mongoose backend scaffold for the Medi-aid health care website.

Setup

1. Install dependencies

   npm install

2. Create a `.env` file (a template is already included). Update `MONGODB_URI`.

3. Run

   npm run dev

API

- /api/auth - authentication endpoints (register/login)
- /api/symptoms - CRUD symptoms
- /api/medicines - CRUD medicines
- /api/chatbot - chat endpoint
