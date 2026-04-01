# 🔌 What's My Adaptor?

Upload a photo of a mystery cord or adaptor and instantly find out what it is — powered by Claude AI.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green) ![Express](https://img.shields.io/badge/Express-4.x-lightgrey) ![Anthropic](https://img.shields.io/badge/Anthropic-Claude-blueviolet)

---

## How It Works

1. You upload an image of an adaptor or cable through the web interface.
2. The image is sent to a Node.js/Express backend server.
3. The server passes the image to Claude (via the Anthropic API) with a prompt asking it to identify the adaptor.
4. Claude analyzes the image and returns a description — including the adaptor type, common uses, and any other relevant details.
5. The result is displayed back to you in the browser.

---

## Prerequisites

Before running this project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- An [Anthropic API key](https://console.anthropic.com/) — you can sign up for free

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/andrewvieau/whatsmyadaptor.git
cd whatsmyadaptor
```

### 2. Install dependencies

```bash
npm install
```

This installs all required packages defined in `package.json`, including:
- `express` — the web server framework
- `@anthropic-ai/sdk` — the official Anthropic client for calling Claude
- `multer` — handles image file uploads
- `dotenv` — loads environment variables from your `.env` file
- `express-rate-limit` — prevents abuse by limiting requests per user

### 3. Configure your API key

Open the `.env` file in the root of the project and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
```

> **How to get an API key:**
> 1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
> 2. Sign in or create a free account
> 3. Navigate to **API Keys** and create a new key
> 4. Copy and paste it into your `.env` file

> ⚠️ **Never commit your API key to GitHub.** The `.gitignore` file is already set up to exclude `.env` from being tracked.

### 4. Start the server

```bash
npm start
```

The app will start on [http://localhost:3000](http://localhost:3000) by default.

### 5. Use the app

1. Open your browser and go to `http://localhost:3000`
2. Click the upload button and select an image of your adaptor or cable
3. Submit the image and wait a moment for Claude to analyze it
4. Read the identification result!

---

## Project Structure

```
whatsmyadaptor/
├── public/          # Frontend HTML, CSS, and JS served to the browser
├── server.js        # Express backend — handles uploads and calls the Anthropic API
├── .env             # Your local environment variables (not committed to git)
├── .gitignore       # Files excluded from version control
└── package.json     # Project metadata and dependencies
```

---

## Troubleshooting

**"Invalid API key" error**
Make sure your `.env` file contains a valid key and that you've saved the file before starting the server.

**Port already in use**
If port 3000 is taken, you can change it by adding `PORT=3001` (or any open port) to your `.env` file.

**Image not uploading**
Make sure you're uploading a supported image format (JPG, PNG, GIF, or WebP). Very large files may be rejected by the rate limiter.

---

## License

MIT
