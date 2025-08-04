const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root endpoint for testing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚨 Emergency server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    railwayUrl: process.env.RAILWAY_STATIC_URL
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'emergency-backend'
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: 'demo-user-1',
        name: 'Demo User',
        email: 'demo@example.com',
        picture: 'https://ui-avatars.com/api/?name=Demo+User'
      },
      token: 'demo-jwt-token-' + Date.now()
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    user: {
      id: 'demo-user-1', 
      name: 'Demo User',
      email: 'demo@example.com',
      picture: 'https://ui-avatars.com/api/?name=Demo+User'
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

// Teams endpoints
app.get('/api/teams', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Engineering Team',
      description: 'Product development team',
      memberCount: 12,
      unreadCount: 3
    }
  ]);
});

app.post('/api/teams', (req, res) => {
  res.json({
    id: Date.now().toString(),
    name: req.body.name || 'New Team',
    description: req.body.description || '',
    memberCount: 1,
    unreadCount: 0
  });
});

// Analytics
app.get('/api/analytics/overview', (req, res) => {
  res.json({
    totalUsers: 1234,
    activeTeams: 45,
    messagesThisWeek: 5678,
    avgResponseTime: '2m 30s'
  });
});

// Catch all
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Emergency backend running on ${HOST}:${PORT}`);
  console.log(`Health: http://${HOST}:${PORT}/api/health`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Railway URL: ${process.env.RAILWAY_STATIC_URL || 'Not set'}`);
});

module.exports = app;