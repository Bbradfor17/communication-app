const express = require('express');
const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Emergency server is working',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});