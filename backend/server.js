const express = require('express');
const cors = require('cors');
const { mockIssuers, mockIssuerDetails } = require('./data/mock-data');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'credit-ratings-analytics-api'
  });
});

app.get('/api/issuers', (_req, res) => {
  res.json(mockIssuers);
});

app.get('/api/issuers/:id', (req, res) => {
  const detail = mockIssuerDetails[req.params.id];

  if (!detail) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Issuer not found'
      }
    });
  }

  return res.json(detail);
});

app.post('/api/feedback', (req, res) => {
  const payload = req.body ?? {};

  if (!payload?.user?.email || !String(payload.user.email).includes('@')) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid email format'
      }
    });
  }

  return res.json({
    success: true,
    feedbackId: 'fb_123456',
    message: 'Thank you for your feedback!'
  });
});

app.listen(port, () => {
  console.log(`Credit Ratings Analytics API running on http://localhost:${port}`);
});
