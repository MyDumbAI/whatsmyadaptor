require('dotenv').config();
const express = require('express');
const multer = require('multer');
const Anthropic = require('@anthropic-ai/sdk');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait a minute and try again.' }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/analyze', limiter);

app.post('/analyze', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded.' });
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' });
  }

  const base64Image = req.file.buffer.toString('base64');

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: req.file.mimetype,
                data: base64Image
              }
            },
            {
              type: 'text',
              text: 'Please identify this cord or adaptor. Describe what it is, what it is used for, and what devices or standards it is commonly associated with. Be specific and practical — someone is trying to figure out what they are holding.'
            }
          ]
        }
      ]
    });

    res.json({ result: response.content[0].text });
  } catch (err) {
    console.error('Anthropic API error:', err);
    res.status(500).json({ error: 'Failed to analyze the image. Please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
