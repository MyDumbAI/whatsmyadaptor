# What's My Adaptor?

A small web app that lets you upload a photo of a cable or adaptor and tells you what it is. You drag in an image, hit a button, and get a plain-English description of what you're holding — what the connector is, what it's used for, and what devices it works with.

Built with Node/Express on the backend, plain HTML/JS on the frontend, and the Claude API doing the actual image analysis.

# I know what you're thinking

Isn't it just as easy to open literally any LLM, upload the same photo, and type "what is this?"  

Yes.

# So what value does this app add?

Literally nothing. If anything this is worse than that, because it's limited to identifying cord adaptors only.

## How it works

1. User uploads a photo (JPEG, PNG, GIF, or WebP, up to 10MB)
2. The server sends the image to Claude with a prompt asking it to identify the cord or adaptor
3. The result comes back and is displayed on the page

Rate-limited to 10 requests per minute. Requires an `ANTHROPIC_API_KEY` in `.env` or `.env.local`.

```
npm install
echo "ANTHROPIC_API_KEY=your_key_here" > .env
node server.js
```

