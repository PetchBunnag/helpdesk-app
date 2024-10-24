const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const ticketRoutes = require('./routes/tickets');

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());

// Load Swagger JSON
const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);

// Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

// Only start the server if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export app for testing
module.exports = app;
